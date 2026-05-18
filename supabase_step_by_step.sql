-- ===============================================
-- STEP 1: BUAT TABEL dashboard_links
-- Copy dan Run satu per satu
-- ===============================================

CREATE TABLE IF NOT EXISTS dashboard_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Lihat Dashboard Lengkap',
  dashboard_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- ===============================================
-- STEP 2: INSERT DATA (3 DASHBOARD)
-- ===============================================

DELETE FROM dashboard_links WHERE dashboard_index IN (0, 1, 2);

INSERT INTO dashboard_links (url, label, dashboard_index, is_active) VALUES
  ('#', 'Dashboard Ekonomi Regional', 0, true),
  ('#', 'Dashboard Realisasi Belanja', 1, true),
  ('#', 'Dashboard Monitoring Kinerja', 2, true);

-- ===============================================
-- STEP 3: ENABLE RLS & CREATE POLICIES
-- ===============================================

ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Allow public read dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public delete dashboard links" ON dashboard_links;

-- Create new policies
CREATE POLICY "Allow public read dashboard links"
  ON dashboard_links FOR SELECT USING (true);

CREATE POLICY "Allow public insert dashboard links"
  ON dashboard_links FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update dashboard links"
  ON dashboard_links FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete dashboard links"
  ON dashboard_links FOR DELETE USING (true);

-- ===============================================
-- STEP 4: BUAT TABEL lms_links
-- ===============================================

CREATE TABLE IF NOT EXISTS lms_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Masuk ke LMS',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

DELETE FROM lms_links;

INSERT INTO lms_links (url, label, is_active)
VALUES ('/lms.html', 'Masuk ke LMS', true);

ALTER TABLE lms_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read lms links" ON lms_links;
DROP POLICY IF EXISTS "Allow public insert lms links" ON lms_links;
DROP POLICY IF EXISTS "Allow public update lms links" ON lms_links;

CREATE POLICY "Allow public read lms links"
  ON lms_links FOR SELECT USING (true);

CREATE POLICY "Allow public insert lms links"
  ON lms_links FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update lms links"
  ON lms_links FOR UPDATE USING (true) WITH CHECK (true);

-- ===============================================
-- STEP 5: VERIFY DATA (RUN TERPISAH)
-- ===============================================

SELECT * FROM dashboard_links ORDER BY dashboard_index;

-- Harusnya ada 3 rows:
-- id | url | label                          | dashboard_index | is_active
-- 1  | #   | Dashboard Ekonomi Regional     | 0               | true
-- 2  | #   | Dashboard Realisasi Belanja    | 1               | true
-- 3  | #   | Dashboard Monitoring Kinerja   | 2               | true
