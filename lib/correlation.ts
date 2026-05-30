// 7-day lag Pearson correlation between PM10 and respiratory cases; computes per-city risk scores.

const LAG_DAYS = 7;

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export type RiskScore = {
  risk_level: RiskLevel;
  coefficient: number;
  predicted_spike: boolean;
};

// Standard Pearson correlation coefficient. Returns 0 when undefined
// (empty input or zero variance in either series).
function pearson(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n === 0) return 0;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumXX += x[i] * x[i];
    sumYY += y[i] * y[i];
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
  );
  if (denominator === 0) return 0;

  return numerator / denominator;
}

// Correlates each day's PM10 against respiratory cases LAG_DAYS later,
// then maps the resulting coefficient onto a risk level. A strong
// positive correlation means today's air quality predicts a case rise.
export function calculateRiskScore(
  pm10_values: number[],
  cases: number[],
): RiskScore {
  const laggedPm10: number[] = [];
  const laggedCases: number[] = [];
  const limit = Math.min(pm10_values.length, cases.length);
  for (let i = 0; i + LAG_DAYS < limit; i++) {
    laggedPm10.push(pm10_values[i]);
    laggedCases.push(cases[i + LAG_DAYS]);
  }

  const coefficient = Math.round(pearson(laggedPm10, laggedCases) * 100) / 100;

  let risk_level: RiskLevel;
  if (coefficient >= 0.6) risk_level = "critical";
  else if (coefficient >= 0.4) risk_level = "high";
  else if (coefficient >= 0.2) risk_level = "moderate";
  else risk_level = "low";

  const predicted_spike = coefficient >= 0.5;

  return { risk_level, coefficient, predicted_spike };
}
