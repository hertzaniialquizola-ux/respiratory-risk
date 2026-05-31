'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

type AccessRequest = {
  id: string
  full_name: string
  lgu_city: string
  email: string
  created_at: string
  status: string
}

type RowState = {
  loading: boolean
  error: string | null
}

const supabase = createClient()

const headingFont = "'Bricolage Grotesque', sans-serif"
const bodyFont = "'Inter', sans-serif"

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [pinError, setPinError] = useState('')
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [rowStates, setRowStates] = useState<Record<string, RowState>>({})

  function handlePinSubmit() {
    if (pin === 'admin2026') {
      setUnlocked(true)
      setPinError('')
    } else {
      setPinError('Incorrect PIN. Try again.')
    }
  }

  useEffect(() => {
    if (!unlocked) return

    let active = true

    async function loadRequests() {
      setFetching(true)
      setFetchError('')

      const { data, error } = await supabase
        .from('access_requests')
        .select('id, full_name, lgu_city, email, created_at, status')
        .order('created_at', { ascending: false })

      if (!active) return

      if (error) {
        setFetchError(error.message)
      } else {
        setRequests((data as AccessRequest[]) ?? [])
      }

      setFetching(false)
    }

    loadRequests()

    return () => {
      active = false
    }
  }, [unlocked])

  async function handleApprove(id: string, email: string) {
    setRowStates((prev) => ({ ...prev, [id]: { loading: true, error: null } }))

    const { error: inviteError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })

    if (inviteError) {
      setRowStates((prev) => ({
        ...prev,
        [id]: { loading: false, error: inviteError.message },
      }))
      return
    }

    const { error: updateError } = await supabase
      .from('access_requests')
      .update({ status: 'approved' })
      .eq('id', id)

    if (updateError) {
      setRowStates((prev) => ({
        ...prev,
        [id]: { loading: false, error: updateError.message },
      }))
      return
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)),
    )
    setRowStates((prev) => ({ ...prev, [id]: { loading: false, error: null } }))
  }

  async function handleReject(id: string) {
    setRowStates((prev) => ({ ...prev, [id]: { loading: true, error: null } }))

    const { error } = await supabase
      .from('access_requests')
      .update({ status: 'rejected' })
      .eq('id', id)

    if (error) {
      setRowStates((prev) => ({
        ...prev,
        [id]: { loading: false, error: error.message },
      }))
      return
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)),
    )
    setRowStates((prev) => ({ ...prev, [id]: { loading: false, error: null } }))
  }

  if (!unlocked) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background)',
          padding: '2rem',
          fontFamily: bodyFont,
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--color-outline-variant)',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          <h1
            style={{
              fontFamily: headingFont,
              fontSize: '1.5rem',
              margin: '0 0 1rem',
              color: 'var(--color-primary)',
            }}
          >
            Admin Access
          </h1>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePinSubmit()
            }}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--color-outline-variant)',
              fontFamily: bodyFont,
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
          {pinError && (
            <p style={{ color: '#b91c1c', fontSize: '13px', margin: '0.5rem 0 0' }}>
              {pinError}
            </p>
          )}
          <button
            onClick={handlePinSubmit}
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '0.625rem 0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--color-primary)',
              color: '#ffffff',
              fontFamily: bodyFont,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Unlock
          </button>
        </div>
      </main>
    )
  }

  const pendingCount = requests.filter((r) => r.status === 'pending').length
  const approvedCount = requests.filter((r) => r.status === 'approved').length
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length

  const statCardStyle: React.CSSProperties = {
    background: 'var(--color-surface-container-low)',
    padding: '1rem',
    borderRadius: '8px',
    flex: '1',
    minWidth: '120px',
  }

  const thStyle: React.CSSProperties = {
    background: 'var(--color-surface-container-low)',
    textAlign: 'left',
    padding: '12px',
  }

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid var(--color-outline-variant)',
  }

  function statusBadge(status: string) {
    const palette: Record<string, { bg: string; color: string }> = {
      pending: { bg: '#FEF9C3', color: '#854D0E' },
      approved: { bg: '#DCFCE7', color: '#166534' },
      rejected: { bg: '#F3F4F6', color: '#374151' },
    }
    const { bg, color } = palette[status] ?? palette.rejected
    return (
      <span
        style={{
          background: bg,
          color,
          borderRadius: '999px',
          padding: '2px 10px',
          fontSize: '12px',
        }}
      >
        {status}
      </span>
    )
  }

  return (
    <main
      style={{
        background: 'var(--color-background)',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: bodyFont,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: headingFont,
            color: 'var(--color-primary)',
            margin: '0 0 0.25rem',
          }}
        >
          Access Request Admin
        </h1>
        <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>
          Respiratory Risk Assessment — LGU Health Officer Portal
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={statCardStyle}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Pending</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pendingCount}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Approved</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{approvedCount}</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Rejected</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{rejectedCount}</div>
          </div>
        </div>

        {fetching && (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading requests...</p>
        )}

        {fetchError && (
          <p style={{ color: '#b91c1c' }}>{fetchError}</p>
        )}

        {!fetching && requests.length === 0 && (
          <p style={{ color: '#6b7280' }}>No access requests yet.</p>
        )}

        {requests.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Full Name</th>
                  <th style={thStyle}>City</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((row) => {
                  const rowState = rowStates[row.id]
                  return (
                    <tr key={row.id}>
                      <td style={tdStyle}>{row.full_name}</td>
                      <td style={tdStyle}>{row.lgu_city}</td>
                      <td style={tdStyle}>{row.email}</td>
                      <td style={tdStyle}>
                        {new Date(row.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td style={tdStyle}>{statusBadge(row.status)}</td>
                      <td style={tdStyle}>
                        {row.status === 'pending' ? (
                          rowState?.loading ? (
                            <span style={{ color: '#6b7280' }}>Processing...</span>
                          ) : (
                            <>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                  onClick={() => handleApprove(row.id, row.email)}
                                  style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: 'var(--color-primary)',
                                    color: '#ffffff',
                                    fontFamily: bodyFont,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(row.id)}
                                  style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--color-outline-variant)',
                                    background: 'transparent',
                                    color: '#374151',
                                    fontFamily: bodyFont,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Reject
                                </button>
                              </div>
                              {rowState?.error && (
                                <p
                                  style={{
                                    color: '#b91c1c',
                                    fontSize: '12px',
                                    margin: '0.5rem 0 0',
                                  }}
                                >
                                  {rowState.error}
                                </p>
                              )}
                            </>
                          )
                        ) : (
                          <span style={{ color: '#9ca3af' }}>—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
