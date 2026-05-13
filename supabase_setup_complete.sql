-- ===============================================
-- SUPABASE SETUP LENGKAP - RAGIT DOBEL 4.0
-- Copy-paste semua SQL ini ke Supabase SQL Editor
-- ===============================================

-- 1. BUAT TABEL dashboard_links
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

-- 2. INSERT DATA DEFAULT (3 DASHBOARD)
-- ===============================================
INSERT INTO dashboard_links (url, label, dashboard_index, is_active) VALUES
  ('#', 'Dashboard Ekonomi Regional', 0, true),
  ('#', 'Dashboard Realisasi Belanja', 1, true),
  ('#', 'Dashboard Monitoring Kinerja', 2, true)
ON CONFLICT DO NOTHING;

-- 3. ENABLE ROW LEVEL SECURITY
-- ===============================================
ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;

-- 4. DROP OLD POLICIES (JIKA ADA)
-- ===============================================
DROP POLICY IF EXISTS "Public can read dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Public can insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Public can update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Admin can update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Admin can insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public read dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public delete dashboard links" ON dashboard_links;

-- 5. CREATE NEW POLICIES (ALLOW PUBLIC ACCESS)
-- ===============================================
-- IMPORTANT: Ini mengizinkan public access karena belum ada auth
-- Di production, ganti dengan proper authentication

-- Allow PUBLIC READ
CREATE POLICY "Allow public read dashboard links"
  ON dashboard_links
  FOR SELECT
  USING (true);

-- Allow PUBLIC INSERT
CREATE POLICY "Allow public insert dashboard links"
  ON dashboard_links
  FOR INSERT
  WITH CHECK (true);

-- Allow PUBLIC UPDATE
CREATE POLICY "Allow public update dashboard links"
  ON dashboard_links
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow PUBLIC DELETE
CREATE POLICY "Allow public delete dashboard links"
  ON dashboard_links
  FOR DELETE
  USING (true);

-- 6. BUAT TABEL lms_links
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

-- Insert data default LMS
INSERT INTO lms_links (url, label, is_active)
VALUES ('/lms.html', 'Masuk ke LMS', true)
ON CONFLICT DO NOTHING;

-- Enable RLS untuk lms_links
ALTER TABLE lms_links ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Public can read lms links" ON lms_links;
DROP POLICY IF EXISTS "Public can insert lms links" ON lms_links;
DROP POLICY IF EXISTS "Public can update lms links" ON lms_links;
DROP POLICY IF EXISTS "Allow public read lms links" ON lms_links;
DROP POLICY IF EXISTS "Allow public insert lms links" ON lms_links;
DROP POLICY IF EXISTS "Allow public update lms links" ON lms_links;

-- Create new policies for lms_links
CREATE POLICY "Allow public read lms links"
  ON lms_links
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert lms links"
  ON lms_links
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update lms links"
  ON lms_links
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 7. BUAT TABEL dokumentasi_kegiatan
-- ===============================================
CREATE TABLE IF NOT EXISTS dokumentasi_kegiatan (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  kategori TEXT NOT NULL,
  image_url TEXT NOT NULL,
  dokumentasi_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT
);

-- Enable RLS untuk dokumentasi_kegiatan
ALTER TABLE dokumentasi_kegiatan ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Public can read dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Admin can manage dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Allow public read dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Allow public insert dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Allow public update dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Allow public delete dokumentasi" ON dokumentasi_kegiatan;

-- Create new policies for dokumentasi_kegiatan
CREATE POLICY "Allow public read dokumentasi"
  ON dokumentasi_kegiatan
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow public insert dokumentasi"
  ON dokumentasi_kegiatan
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update dokumentasi"
  ON dokumentasi_kegiatan
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete dokumentasi"
  ON dokumentasi_kegiatan
  FOR DELETE
  USING (true);

-- 8. VERIFY - LIHAT SEMUA DATA
-- ===============================================
SELECT
  'dashboard_links' as table_name,
  id,
  label,
  dashboard_index,
  url,
  is_active
FROM dashboard_links
ORDER BY dashboard_index;

SELECT
  'lms_links' as table_name,
  id,
  label,
  url,
  is_active
FROM lms_links;

-- ===============================================
-- SETUP SELESAI!
-- ===============================================
-- NEXT STEPS:
-- 1. Enable Realtime di Database > Replication untuk:
--    - dashboard_links
--    - lms_links
--    - dokumentasi_kegiatan
--
-- 2. Test save dari website
-- 3. Verify data tersimpan di table
-- ===============================================
