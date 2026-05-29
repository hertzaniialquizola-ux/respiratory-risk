import { NextRequest, NextResponse } from "next/server";

const OPEN_METEO_AIR_QUALITY_URL =
  "https://air-quality-api.open-meteo.com/v1/air-quality";

const DEFAULT_CITY = "Manila";
const DEFAULT_LATITUDE = 14.5995;
const DEFAULT_LONGITUDE = 120.9842;
const PAST_DAYS = 30;

type OpenMeteoAirQualityResponse = {
  hourly?: {
    time?: string[];
    pm10?: (number | null)[];
  };
  error?: boolean;
  reason?: string;
};

export async function GET(request: NextRequest) {
  const city =
    request.nextUrl.searchParams.get("city")?.trim() || DEFAULT_CITY;

  const params = new URLSearchParams({
    latitude: String(DEFAULT_LATITUDE),
    longitude: String(DEFAULT_LONGITUDE),
    hourly: "pm10",
    past_days: String(PAST_DAYS),
    forecast_days: "0",
    timezone: "Asia/Manila",
  });

  let response: Response;
  try {
    response = await fetch(`${OPEN_METEO_AIR_QUALITY_URL}?${params}`, {
      next: { revalidate: 3600 },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the air quality service." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Air quality service returned an error." },
      { status: 502 },
    );
  }

  const data = (await response.json()) as OpenMeteoAirQualityResponse;

  if (data.error) {
    return NextResponse.json(
      { error: data.reason ?? "Invalid request to air quality service." },
      { status: 400 },
    );
  }

  const dates = data.hourly?.time ?? [];
  const pm10_values = data.hourly?.pm10 ?? [];

  if (dates.length === 0 || pm10_values.length === 0) {
    return NextResponse.json(
      { error: "No PM10 data available for this location." },
      { status: 404 },
    );
  }

  const validPm10 = pm10_values.filter(
    (value): value is number => value !== null && value !== undefined,
  );

  const average_pm10 =
    validPm10.length > 0
      ? validPm10.reduce((sum, value) => sum + value, 0) / validPm10.length
      : null;

  return NextResponse.json({
    city,
    dates,
    pm10_values,
    average_pm10:
      average_pm10 !== null ? Math.round(average_pm10 * 100) / 100 : null,
  });
}
