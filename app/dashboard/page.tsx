"use client";

import { useCallback, useEffect, useState } from "react";

interface CityRiskData {
  city: string;
  region: string;
  risk_level: "low" | "moderate" | "high" | "critical";
  coefficient: number;
  current_pm10: number;
  average_pm10: number;
  predicted_spike: boolean;
}

type LoadState = "loading" | "success" | "error";

function pm10Color(value: number): string {
  if (value < 25) return "text-green-700";
  if (value < 50) return "text-yellow-600";
  if (value < 75) return "text-orange-500";
  return "text-red-600";
}

const RISK_BADGE: Record<CityRiskData["risk_level"], string> = {
  low: "bg-green-100 text-green-800 border border-green-300",
  moderate: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  high: "bg-orange-100 text-orange-800 border border-orange-300",
  critical: "bg-red-100 text-red-800 border border-red-300",
};

async function loadScores(): Promise<CityRiskData[]> {
  const response = await fetch("/api/risk-scores");
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape");
  }
  return data as CityRiskData[];
}

export default function DashboardPage() {
  const [cities, setCities] = useState<CityRiskData[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // setState only ever runs inside the promise callbacks (never
  // synchronously), so this is safe to call from an effect.
  const runFetch = useCallback(() => {
    loadScores()
      .then((data) => {
        setCities(data);
        setLastUpdated(new Date().toLocaleString("en-PH"));
        setState("success");
      })
      .catch(() => setState("error"));
  }, []);

  // Retry from the error state: re-show the loading view, then re-fetch.
  const retry = useCallback(() => {
    setState("loading");
    runFetch();
  }, [runFetch]);

  useEffect(() => {
    runFetch();
  }, [runFetch]);

  // ── Summary stats ──────────────────────────────────────────────
  const citiesMonitored = cities.length;
  const highRiskCount = cities.filter(
    (c) => c.risk_level === "high" || c.risk_level === "critical",
  ).length;
  const averagePm10 =
    cities.length > 0
      ? cities.reduce((sum, c) => sum + c.current_pm10, 0) / cities.length
      : 0;
  const spikeAlerts = cities.filter((c) => c.predicted_spike).length;

  // ── Error state ────────────────────────────────────────────────
  if (state === "error") {
    return (
      <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-margin-mobile md:py-margin-desktop bg-background">
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-gutter">
          <span className="material-symbols-outlined text-error text-5xl">
            error
          </span>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Failed to load dashboard data
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
              Check your connection and try again
            </p>
          </div>
          <button
            type="button"
            onClick={retry}
            className="bg-primary text-on-primary rounded-full px-lg py-sm font-label-md text-label-md"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-margin-mobile md:py-margin-desktop bg-background">
      {/* ── Section 1: Page header ── */}
      <div className="mb-margin-desktop">
        <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-sm">
          Respiratory Risk Dashboard
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Real-time PM10 air quality and respiratory risk assessment for
          Philippine cities
        </p>
        <div className="flex flex-wrap items-center gap-gutter mt-gutter">
          <span className="inline-flex items-center gap-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Live Data
            </span>
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Last updated: {lastUpdated || "—"}
          </span>
        </div>
      </div>

      {/* ── Section 2: Summary stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-margin-desktop">
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-gutter">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Cities Monitored
            </span>
            <span className="material-symbols-outlined text-on-surface-variant">
              location_city
            </span>
          </div>
          <p className="font-headline-lg text-headline-lg text-on-surface mt-sm">
            {citiesMonitored}
          </p>
        </div>

        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-gutter">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              High Risk Cities
            </span>
            <span className="material-symbols-outlined text-on-surface-variant">
              warning
            </span>
          </div>
          <p
            className={`font-headline-lg text-headline-lg mt-sm ${
              highRiskCount > 0 ? "text-red-600" : "text-green-700"
            }`}
          >
            {highRiskCount}
          </p>
        </div>

        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-gutter">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Average PM10 Today
            </span>
            <span className="material-symbols-outlined text-on-surface-variant">
              air
            </span>
          </div>
          <p
            className={`font-headline-lg text-headline-lg mt-sm ${
              averagePm10 > 50 ? "text-orange-500" : "text-green-700"
            }`}
          >
            {averagePm10.toFixed(1)}
            <span className="font-body-md text-body-md text-on-surface-variant ml-xs">
              μg/m³
            </span>
          </p>
        </div>

        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-gutter">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Spike Alerts
            </span>
            <span className="material-symbols-outlined text-on-surface-variant">
              notifications_active
            </span>
          </div>
          <p
            className={`font-headline-lg text-headline-lg mt-sm ${
              spikeAlerts > 0 ? "text-red-600" : "text-green-700"
            }`}
          >
            {spikeAlerts}
          </p>
        </div>
      </div>

      {/* ── Section 3: City risk cards ── */}
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-gutter">
        City Risk Overview
      </h2>

      {state === "loading" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-container animate-pulse rounded-xl h-64"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {cities.map((city) => (
            <div
              key={city.city}
              className="bg-surface-container-low border border-outline-variant rounded-xl p-gutter flex flex-col"
            >
              <div className="flex items-start justify-between gap-sm">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    {city.city}
                  </h3>
                  <p className="text-on-surface-variant font-label-sm text-label-sm">
                    {city.region}
                  </p>
                </div>
                <span
                  className={`rounded-full font-label-sm text-label-sm px-3 py-1 whitespace-nowrap ${
                    RISK_BADGE[city.risk_level]
                  }`}
                >
                  {city.risk_level}
                </span>
              </div>

              <div className="mt-gutter">
                <span
                  className={`font-headline-xl text-headline-xl ${pm10Color(
                    city.current_pm10,
                  )}`}
                >
                  {city.current_pm10}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant ml-xs">
                  μg/m³
                </span>
              </div>

              <p className="font-label-sm text-label-sm text-on-surface-variant mt-sm">
                Pearson r: {city.coefficient.toFixed(2)}
              </p>

              {city.predicted_spike && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-sm mt-gutter">
                  <p className="font-label-sm text-label-sm text-red-700">
                    ⚠ Spike predicted in ~7 days
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => alert("Policy brief coming soon")}
                className="w-full bg-primary text-on-primary rounded-full font-label-md text-label-md py-sm mt-gutter"
              >
                View Policy Brief
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
