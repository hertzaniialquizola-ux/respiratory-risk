"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CityStatus = "active" | "inactive";

type City = {
  name: string;
  status: CityStatus;
  href?: string;
};

type FetchState =
  | { status: "loading" }
  | { status: "success"; pm10: number }
  | { status: "error" };

const cities: City[] = [
  { name: "Manila", status: "active", href: "/cities/manila" },
  { name: "Quezon City", status: "active", href: "/cities/quezon-city" },
  { name: "Makati", status: "active", href: "/cities/makati" },
  { name: "Angeles City", status: "inactive" },
  { name: "Lucena", status: "inactive" },
];

const activeCities = cities.filter((city) => city.status === "active");

async function fetchPm10(city: string): Promise<FetchState> {
  try {
    const response = await fetch(
      `/api/air-quality?city=${encodeURIComponent(city)}`,
    );
    if (!response.ok) {
      return { status: "error" };
    }
    const data = await response.json();
    if (typeof data?.pm10 !== "number") {
      return { status: "error" };
    }
    return { status: "success", pm10: data.pm10 };
  } catch {
    return { status: "error" };
  }
}

export default function CitiesPage() {
  const [results, setResults] = useState<Record<string, FetchState>>(() =>
    Object.fromEntries(
      activeCities.map((city) => [city.name, { status: "loading" } as const]),
    ),
  );

  useEffect(() => {
    let cancelled = false;

    Promise.all(activeCities.map((city) => fetchPm10(city.name))).then(
      (states) => {
        if (cancelled) {
          return;
        }
        setResults(
          Object.fromEntries(
            activeCities.map((city, index) => [city.name, states[index]]),
          ),
        );
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-margin-mobile md:py-margin-desktop">
      <div className="mb-margin-desktop">
        <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-sm">
          Cities Covered
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          Monitoring air quality and respiratory risk across Philippine cities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {cities.map((city) => {
          const result =
            city.status === "active" ? results[city.name] : undefined;
          const isUnavailable = result?.status === "error";

          return (
            <div
              key={city.name}
              className="bg-surface border border-outline-variant rounded-xl p-gutter shadow-sm"
            >
              <div className="flex items-center justify-between mb-sm">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  {city.name}
                </h2>
                {city.status === "inactive" ? (
                  <span className="px-sm py-xs rounded-full bg-on-surface-variant/10 text-on-surface-variant font-label-sm text-label-sm">
                    Inactive
                  </span>
                ) : isUnavailable ? (
                  <span className="px-sm py-xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">
                    Unavailable
                  </span>
                ) : (
                  <span className="px-sm py-xs rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
                    Active
                  </span>
                )}
              </div>

              {city.status === "inactive" ? (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Inactive
                </p>
              ) : result?.status === "loading" ? (
                <div className="h-5 w-32 rounded bg-on-surface-variant/10 animate-pulse" />
              ) : result?.status === "success" ? (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  PM10: {result.pm10} μg/m³
                </p>
              ) : (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Data unavailable
                </p>
              )}

              {city.href && (
                <Link
                  href={city.href}
                  className="inline-flex items-center gap-xs mt-gutter text-primary font-label-md text-label-md hover:underline"
                >
                  View details
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
