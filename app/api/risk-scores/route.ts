import { NextResponse } from "next/server";
import { fetchAirQuality } from "@/lib/fetchAirQuality";
import { calculateRiskScore } from "@/lib/correlation";

// Random placeholder case data is generated per request, so this route
// must not be statically cached.
export const dynamic = "force-dynamic";

type CitySeed = {
  city: string;
  region: string;
  lat: number;
  lon: number;
};

const CITIES: CitySeed[] = [
  { city: "Manila", region: "Metro Manila (NCR)", lat: 14.5995, lon: 120.9842 },
  { city: "Quezon City", region: "Metro Manila (NCR)", lat: 14.676, lon: 121.0437 },
  { city: "Makati", region: "Metro Manila (NCR)", lat: 14.5547, lon: 121.0244 },
  { city: "Pasig", region: "Metro Manila (NCR)", lat: 14.5764, lon: 121.0851 },
  { city: "Cebu", region: "Central Visayas (Region VII)", lat: 10.3157, lon: 123.8854 },
  { city: "Davao", region: "Davao Region (Region XI)", lat: 7.1907, lon: 125.4553 },
  { city: "Cagayan de Oro", region: "Northern Mindanao (Region X)", lat: 8.4542, lon: 124.6319 },
  { city: "Iloilo", region: "Western Visayas (Region VI)", lat: 10.7202, lon: 122.5621 },
  { city: "Zamboanga", region: "Zamboanga Peninsula (Region IX)", lat: 6.9214, lon: 122.079 },
];

// Placeholder respiratory case data: 30 random integers in [10, 80].
function randomCases(count = 30): number[] {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * 71) + 10,
  );
}

export async function GET() {
  const results = await Promise.all(
    CITIES.map(async (seed) => {
      try {
        const air = await fetchAirQuality(seed.lat, seed.lon);
        const cases = randomCases(30);
        const risk = calculateRiskScore(air.pm10_values, cases);

        return {
          city: seed.city,
          region: seed.region,
          risk_level: risk.risk_level,
          coefficient: risk.coefficient,
          current_pm10: air.current_pm10,
          average_pm10: air.average_pm10,
          predicted_spike: risk.predicted_spike,
        };
      } catch {
        // Skip cities whose air quality fetch fails rather than failing
        // the whole dashboard.
        return null;
      }
    }),
  );

  return NextResponse.json(results.filter((result) => result !== null));
}
