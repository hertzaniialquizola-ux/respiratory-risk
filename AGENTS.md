# Respiratory Risk — Philippines City Health Dashboard

## What This Is
A public health early-warning tool for LGU (local government unit) 
health officers in the Philippines. It correlates air quality (PM10) 
data with respiratory hospitalization records using a 7-day lag 
Pearson correlation to predict respiratory case spikes.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (database, auth, storage)
- Vercel (deployment)
- Open-Meteo API (air quality, free, no key needed)
- HDX/DOH data (respiratory case data)

## Core User
LGU health officers in Philippine cities. Not developers. 
Interface must be simple, printable, and work on low-bandwidth.

## Key Feature
7-day lag Pearson correlation between PM10 and respiratory cases.
Outputs: risk score per city, printable PDF policy brief.

## Auth Rule
Only .gov.ph email addresses can register.

## Folder Structure
/app              → Next.js App Router pages
/app/dashboard    → Main city dashboard with map
/app/cities       → City-specific risk pages  
/app/api          → API routes
/components       → Reusable UI components
/lib              → Supabase client, correlation logic, data fetchers
/public           → Static assets

## Before Writing Any Code
Read node_modules/next/dist/docs/ for App Router conventions.
This is Next.js 16 — use server components by default, 
client components only when needed (mark with 'use client').

CRITICAL: Always commit directly to main branch.
Never create a new branch. Never create a worktree.
Use: git add . && git commit && git push origin main