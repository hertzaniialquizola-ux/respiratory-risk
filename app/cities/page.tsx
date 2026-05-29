import { Fragment } from "react";
import Link from "next/link";

export const metadata = {
  title: "Cities Covered - Respiratory Risk Assessment",
};

type CityRow = {
  name: string;
  region: string;
  live: boolean;
  lastSync: string;
  muted?: boolean;
};

type CityGroup = {
  label: string;
  cities: CityRow[];
};

const cityGroups: CityGroup[] = [
  {
    label: "National Capital Region (NCR)",
    cities: [
      { name: "Manila", region: "Metro Manila", live: true, lastSync: "2 min ago" },
      {
        name: "Quezon City",
        region: "Metro Manila",
        live: true,
        lastSync: "Just now",
      },
      {
        name: "Makati City",
        region: "Metro Manila",
        live: true,
        lastSync: "5 min ago",
      },
    ],
  },
  {
    label: "Region III (Central Luzon)",
    cities: [
      {
        name: "San Fernando",
        region: "Pampanga",
        live: true,
        lastSync: "12 min ago",
      },
      {
        name: "Angeles City",
        region: "Pampanga",
        live: false,
        lastSync: "Offline",
        muted: true,
      },
    ],
  },
  {
    label: "Region IV-A (CALABARZON)",
    cities: [
      { name: "Antipolo", region: "Rizal", live: true, lastSync: "1 min ago" },
      { name: "Calamba", region: "Laguna", live: true, lastSync: "8 min ago" },
      {
        name: "Lucena",
        region: "Quezon",
        live: false,
        lastSync: "Offline",
        muted: true,
      },
    ],
  },
];

function StatusBadge({ live }: { live: boolean }) {
  if (live) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-primary/30 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm">
        <span
          className="material-symbols-outlined text-[16px] text-primary icon-fill"
        >
          sensors
        </span>
        Live
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-outline-variant rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
      <span className="material-symbols-outlined text-[16px]">sensors_off</span>
      Inactive
    </span>
  );
}

export default function CitiesPage() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col gap-8 md:gap-12 relative">
      <div className="absolute top-0 right-0 w-full h-full max-h-[600px] bg-gradient-to-bl from-primary-container/10 to-transparent pointer-events-none -z-10 rounded-bl-[100px] opacity-70 blur-3xl" />

      <section className="flex flex-col gap-4 border-b border-outline-variant pb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background">
          Supported Coverage Areas
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[800px]">
          Review the active deployment zones for the Respiratory Risk Assessment
          Dashboard across the Philippines. Cities with a &apos;Live&apos; status
          are currently transmitting real-time Air Quality Index (AQI)
          telemetry to our central monitoring systems.
        </p>
      </section>

      <section className="w-full bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-lg">
        <div className="w-full bg-surface-container-low flex items-center justify-between p-4 border-b border-outline-variant">
          <div className="flex items-center gap-2 px-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none font-body-md text-body-md w-64 placeholder-on-surface-variant/70 focus:ring-0 text-on-surface"
              placeholder="Filter by city or region..."
              type="text"
              aria-label="Filter cities"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-bright transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              filter_list
            </span>
            Filter
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-primary-container/10 border-b border-outline-variant">
              <tr>
                <th className="py-4 px-6 font-label-md text-label-md text-primary uppercase tracking-wider w-1/3">
                  City / Municipality
                </th>
                <th className="py-4 px-6 font-label-md text-label-md text-primary uppercase tracking-wider w-1/3">
                  Region
                </th>
                <th className="py-4 px-6 font-label-md text-label-md text-primary uppercase tracking-wider w-1/6">
                  Telemetry Status
                </th>
                <th className="py-4 px-6 font-label-md text-label-md text-primary uppercase tracking-wider w-1/6 text-right">
                  Last Sync
                </th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              {cityGroups.map((group) => (
                <Fragment key={group.label}>
                  <tr
                    className="bg-surface-container-high border-b border-outline-variant"
                  >
                    <td
                      colSpan={4}
                      className="py-2 px-6 font-label-md text-label-md text-on-surface-variant uppercase"
                    >
                      {group.label}
                    </td>
                  </tr>
                  {group.cities.map((city, index) => (
                    <tr
                      key={city.name}
                      className={`${
                        index % 2 === 0
                          ? "bg-surface-container-lowest"
                          : "bg-surface-container"
                      } hover:bg-surface-container-highest transition-colors border-b border-outline-variant`}
                    >
                      <td
                        className={`py-4 px-6 font-semibold ${
                          city.muted
                            ? "text-on-surface-variant"
                            : "text-on-background"
                        }`}
                      >
                        <Link
                          href={`/cities/${encodeURIComponent(city.name.toLowerCase().replace(/\s+/g, "-"))}`}
                          className="hover:text-primary transition-colors"
                        >
                          {city.name}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant">
                        {city.region}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge live={city.live} />
                      </td>
                      <td className="py-4 px-6 text-right text-on-surface-variant font-label-sm text-label-sm">
                        {city.lastSync}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-surface-container-low border-t border-outline-variant p-4 flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
          <span>Showing 8 of 45 supported cities</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-1.5 border border-outline-variant rounded-lg bg-surface-container hover:bg-surface-container-highest disabled:opacity-50 font-label-md text-label-md"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="px-3 py-1.5 border border-outline-variant rounded-lg bg-surface-container hover:bg-surface-container-highest font-label-md text-label-md text-on-surface"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
