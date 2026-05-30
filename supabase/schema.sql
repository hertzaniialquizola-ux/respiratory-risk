CREATE TABLE access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  lgu_city text NOT NULL,
  email text NOT NULL,
  created_at timestamp DEFAULT now()
);
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit request"
  ON access_requests FOR INSERT
  WITH CHECK (email LIKE '%.gov.ph');
