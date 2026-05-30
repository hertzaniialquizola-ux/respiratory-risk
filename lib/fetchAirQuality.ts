// Fetches PM10 air quality data for a coordinate from the Open-Meteo
// air quality API (free, no key needed) and reduces it to the daily
// series and summary figures the risk model and dashboard consume.

const OPEN_METEO_AIR_QUALITY_URL =
  "https://air-quality-api.open-meteo.com/v1/air-quality";
const PAST_DAYS = 30;

export type AirQualityResult = {
  // Daily-averaged PM10, oldest → newest (one value per day).
  pm10_values: number[];
  // Most recent hourly PM10 reading.
  current_pm10: number;
  // Mean PM10 across the whole period.
  average_pm10: number;
};

type OpenMeteoAirQualityResponse = {
  hourly?: {
    time?: string[];
    pm10?: (number | null)[];
  };
  error?: boolean;
  reason?: string;
};

export async function fetchAirQuality(
  lat: number,
  lon: number,
): Promise<AirQualityResult> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: "pm10",
    past_days: String(PAST_DAYS),
    forecast_days: "0",
    timezone: "Asia/Manila",
  });

  const response = await fetch(`${OPEN_METEO_AIR_QUALITY_URL}?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Air quality request failed: ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoAirQualityResponse;

  if (data.error) {
    throw new Error(data.reason ?? "Air quality service error");
  }

  const times = data.hourly?.time ?? [];
  const pm10 = data.hourly?.pm10 ?? [];

  // Group hourly readings into daily buckets keyed by YYYY-MM-DD.
  const buckets = new Map<string, number[]>();
  for (let i = 0; i < times.length; i++) {
    const value = pm10[i];
    if (value === null || value === undefined) continue;
    const day = times[i].slice(0, 10);
    const bucket = buckets.get(day);
    if (bucket) bucket.push(value);
    else buckets.set(day, [value]);
  }

  const days = [...buckets.keys()].sort();
  const pm10_values = days.map((day) => {
    const values = buckets.get(day)!;
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    return Math.round(mean * 10) / 10;
  });

  const valid = pm10.filter(
    (v): v is number => v !== null && v !== undefined,
  );
  const average_pm10 =
    valid.length > 0
      ? valid.reduce((sum, v) => sum + v, 0) / valid.length
      : 0;

  // Most recent non-null hourly reading.
  let current_pm10 = 0;
  for (let i = pm10.length - 1; i >= 0; i--) {
    const v = pm10[i];
    if (v !== null && v !== undefined) {
      current_pm10 = v;
      break;
    }
  }

  return {
    pm10_values,
    current_pm10: Math.round(current_pm10 * 10) / 10,
    average_pm10: Math.round(average_pm10 * 10) / 10,
  };
}
