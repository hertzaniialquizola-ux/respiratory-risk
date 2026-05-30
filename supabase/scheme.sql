-- Cities table
CREATE TABLE cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  latitude float NOT NULL,
  longitude float NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

-- Air quality table
CREATE TABLE air_quality (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  measured_at timestamp NOT NULL,
  pm10 float,
  pm25 float,
  aqi integer,
  source text DEFAULT 'open-meteo'
);

-- Respiratory cases table
CREATE TABLE respiratory_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  week_start date NOT NULL,
  case_count integer NOT NULL,
  data_source text
);

-- Risk scores table
CREATE TABLE risk_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  calculated_at timestamp DEFAULT now(),
  correlation_coefficient float,
  risk_level text CHECK (risk_level IN ('low','moderate','high','critical')),
  lag_days integer DEFAULT 7,
  pm10_average float,
  predicted_case_spike boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE air_quality ENABLE ROW LEVEL SECURITY;
ALTER TABLE respiratory_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_scores ENABLE ROW LEVEL SECURITY;

-- Public read: cities and risk_scores
CREATE POLICY "Public read cities"
  ON cities FOR SELECT USING (true);

CREATE POLICY "Public read risk_scores"
  ON risk_scores FOR SELECT USING (true);

-- Authenticated .gov.ph users only for sensitive tables
CREATE POLICY "Gov users read air_quality"
  ON air_quality FOR SELECT
  USING (auth.jwt() ->> 'email' LIKE '%.gov.ph');

CREATE POLICY "Gov users write air_quality"
  ON air_quality FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' LIKE '%.gov.ph');

CREATE POLICY "Gov users read cases"
  ON respiratory_cases FOR SELECT
  USING (auth.jwt() ->> 'email' LIKE '%.gov.ph');

CREATE POLICY "Gov users write cases"
  ON respiratory_cases FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' LIKE '%.gov.ph');

-- Seed cities
INSERT INTO cities (name, region, latitude, longitude) VALUES
  ('Manila', 'Metro Manila', 14.5995, 120.9842),
  ('Quezon City', 'Metro Manila', 14.6760, 121.0437),
  ('Makati', 'Metro Manila', 14.5547, 121.0244),
  ('Pasig', 'Metro Manila', 14.5764, 121.0851),
  ('Taguig', 'Metro Manila', 14.5243, 121.0792),
  ('Cebu', 'Region VII', 10.3157, 123.8854),
  ('Davao', 'Region XI', 7.1907, 125.4553),
  ('Cagayan de Oro', 'Region X', 8.4542, 124.6319),
  ('Iloilo', 'Region VI', 10.7202, 122.5621),
  ('Zamboanga', 'Region IX', 6.9214, 122.0790),
  ('San Fernando', 'Region III', 15.0286, 120.6899),
  ('Antipolo', 'Region IV-A', 14.5865, 121.1760),
  ('Calamba', 'Region IV-A', 14.2115, 121.1653);
