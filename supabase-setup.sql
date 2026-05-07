-- ============================================
-- SUPABASE SETUP SQL
-- Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan
-- ============================================
-- Jalankan file ini di Supabase SQL Editor
-- Dashboard: https://app.supabase.com → SQL Editor → New Query
-- ============================================

-- Enable UUID extension (jika belum ada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TABEL: admin_users
-- Menyimpan data admin untuk authentication
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Tambah index untuk performance
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Insert default admin (Password: SayaAdmin1234)
-- Note: Password sudah di-hash dengan bcrypt
-- Anda perlu generate hash yang benar di aplikasi atau gunakan Supabase Auth
INSERT INTO admin_users (username, password_hash, full_name) 
VALUES (
  'RagitAdmin1', 
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- Hash untuk "SayaAdmin1234"
  'Administrator Ragit Dobel 4.0'
) 
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- 2. TABEL: dashboard_links
-- Menyimpan URL untuk tombol "Lihat Dashboard Lengkap"
-- ============================================

CREATE TABLE IF NOT EXISTS dashboard_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Lihat Dashboard Lengkap',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default dashboard link
INSERT INTO dashboard_links (url, label) 
VALUES (
  'https://lookerstudio.google.com/reporting/example-dashboard',
  'Lihat Dashboard Lengkap'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. TABEL: lms_links
-- Menyimpan URL untuk tombol "Masuk ke LMS"
-- ============================================

CREATE TABLE IF NOT EXISTS lms_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Masuk ke LMS',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default LMS link
INSERT INTO lms_links (url, label) 
VALUES (
  'https://learning.kemenkeu.go.id',
  'Masuk ke LMS'
)
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. TABEL: dokumentasi_kegiatan
-- Menyimpan dokumentasi kegiatan/acara
-- ============================================

CREATE TABLE IF NOT EXISTS dokumentasi_kegiatan (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  pic_name TEXT,
  unit TEXT,
  cover_image TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Index untuk performance
CREATE INDEX IF NOT EXISTS idx_dokumentasi_created_at ON dokumentasi_kegiatan(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dokumentasi_is_published ON dokumentasi_kegiatan(is_published);

-- ============================================
-- 5. TABEL: dokumentasi_links
-- Menyimpan link dokumentasi per kegiatan
-- (Google Drive, artikel, berita, dll)
-- ============================================

CREATE TABLE IF NOT EXISTS dokumentasi_links (
  id SERIAL PRIMARY KEY,
  dokumentasi_id INTEGER NOT NULL REFERENCES dokumentasi_kegiatan(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performance
CREATE INDEX IF NOT EXISTS idx_dokumentasi_links_dokumentasi_id ON dokumentasi_links(dokumentasi_id);
CREATE INDEX IF NOT EXISTS idx_dokumentasi_links_order ON dokumentasi_links(dokumentasi_id, display_order);

-- ============================================
-- 6. INSERT SAMPLE DATA (Dokumentasi Kegiatan)
-- Sesuai dengan data default di aplikasi
-- ============================================

-- Dokumentasi 1: Workshop Digitalisasi APBN
INSERT INTO dokumentasi_kegiatan (title, description, date, pic_name, unit, cover_image) 
VALUES (
  'Workshop Digitalisasi APBN',
  'Kegiatan workshop dan sosialisasi sistem digitalisasi APBN untuk seluruh K/L di wilayah Sumatera Selatan dengan fokus pada implementasi SPAN dan SAKTI.',
  '15 Desember 2025',
  'Tim Digitalisasi',
  'Bidang PPA I',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'
)
RETURNING id;

-- Ambil ID dokumentasi yang baru dibuat, lalu insert links
-- Note: Sesuaikan ID setelah data diinsert
WITH last_dok AS (
  SELECT id FROM dokumentasi_kegiatan WHERE title = 'Workshop Digitalisasi APBN' LIMIT 1
)
INSERT INTO dokumentasi_links (dokumentasi_id, label, url, display_order)
SELECT id, 'Google Drive - Foto Kegiatan', 'https://drive.google.com/example', 1
FROM last_dok;

-- Dokumentasi 2: Rapat Koordinasi Transfer ke Daerah
INSERT INTO dokumentasi_kegiatan (title, description, date, pic_name, unit, cover_image) 
VALUES (
  'Rapat Koordinasi Transfer ke Daerah',
  'Koordinasi intensif dengan pemerintah daerah terkait optimalisasi penyaluran Dana Alokasi Umum (DAU), Dana Alokasi Khusus (DAK), dan Dana Bagi Hasil (DBH).',
  '10 Desember 2025',
  'Kepala Seksi TKD',
  'Bidang PPA II',
  'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=600&fit=crop'
);

-- Dokumentasi 3: Monev Pelaksanaan APBD
INSERT INTO dokumentasi_kegiatan (title, description, date, pic_name, unit, cover_image) 
VALUES (
  'Monev Pelaksanaan APBD',
  'Monitoring dan evaluasi pelaksanaan Anggaran Pendapatan dan Belanja Daerah (APBD) Provinsi Sumatera Selatan dan kabupaten/kota se-Sumsel untuk semester II tahun anggaran 2025.',
  '5 Desember 2025',
  'Tim Monev',
  'Bidang PPA II',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'
);

-- ============================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS untuk semua tabel
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumentasi_kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumentasi_links ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7.1 POLICIES: admin_users
-- Hanya authenticated users yang bisa query (untuk login)
-- ============================================

DROP POLICY IF EXISTS "Service role can manage admin users" ON admin_users;
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can read admin users" ON admin_users;
CREATE POLICY "Authenticated can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 7.2 POLICIES: dashboard_links
-- Public dapat read, Authenticated dapat manage
-- ============================================

DROP POLICY IF EXISTS "Public can view dashboard links" ON dashboard_links;
CREATE POLICY "Public can view dashboard links"
  ON dashboard_links
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated can manage dashboard links" ON dashboard_links;
CREATE POLICY "Authenticated can manage dashboard links"
  ON dashboard_links
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 7.3 POLICIES: lms_links
-- Public dapat read, Authenticated dapat manage
-- ============================================

DROP POLICY IF EXISTS "Public can view lms links" ON lms_links;
CREATE POLICY "Public can view lms links"
  ON lms_links
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated can manage lms links" ON lms_links;
CREATE POLICY "Authenticated can manage lms links"
  ON lms_links
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 7.4 POLICIES: dokumentasi_kegiatan
-- Public dapat read published, Authenticated dapat manage semua
-- ============================================

DROP POLICY IF EXISTS "Public can view published dokumentasi" ON dokumentasi_kegiatan;
CREATE POLICY "Public can view published dokumentasi"
  ON dokumentasi_kegiatan
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated can manage dokumentasi" ON dokumentasi_kegiatan;
CREATE POLICY "Authenticated can manage dokumentasi"
  ON dokumentasi_kegiatan
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 7.5 POLICIES: dokumentasi_links
-- Public dapat read, Authenticated dapat manage
-- ============================================

DROP POLICY IF EXISTS "Public can view dokumentasi links" ON dokumentasi_links;
CREATE POLICY "Public can view dokumentasi links"
  ON dokumentasi_links
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM dokumentasi_kegiatan
      WHERE dokumentasi_kegiatan.id = dokumentasi_links.dokumentasi_id
      AND dokumentasi_kegiatan.is_published = true
    )
  );

DROP POLICY IF EXISTS "Authenticated can manage dokumentasi links" ON dokumentasi_links;
CREATE POLICY "Authenticated can manage dokumentasi links"
  ON dokumentasi_links
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 8. STORAGE BUCKET POLICIES
-- Untuk menyimpan cover images dokumentasi
-- ============================================

-- Note: Bucket harus dibuat manual di Supabase Dashboard terlebih dahulu
-- Dashboard → Storage → Create Bucket
-- Bucket name: 'dokumentasi-images'
-- Public: true

-- Jalankan policies ini SETELAH bucket dibuat:

-- Public dapat view images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dokumentasi-images', 'dokumentasi-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'dokumentasi-images');

DROP POLICY IF EXISTS "Authenticated can upload images" ON storage.objects;
CREATE POLICY "Authenticated can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'dokumentasi-images');

DROP POLICY IF EXISTS "Authenticated can update images" ON storage.objects;
CREATE POLICY "Authenticated can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'dokumentasi-images')
  WITH CHECK (bucket_id = 'dokumentasi-images');

DROP POLICY IF EXISTS "Authenticated can delete images" ON storage.objects;
CREATE POLICY "Authenticated can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'dokumentasi-images');

-- ============================================
-- 9. FUNCTIONS & TRIGGERS
-- Auto-update updated_at timestamp
-- ============================================

-- Function untuk auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk dokumentasi_kegiatan
DROP TRIGGER IF EXISTS update_dokumentasi_kegiatan_updated_at ON dokumentasi_kegiatan;
CREATE TRIGGER update_dokumentasi_kegiatan_updated_at
  BEFORE UPDATE ON dokumentasi_kegiatan
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk dashboard_links
DROP TRIGGER IF EXISTS update_dashboard_links_updated_at ON dashboard_links;
CREATE TRIGGER update_dashboard_links_updated_at
  BEFORE UPDATE ON dashboard_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk lms_links
DROP TRIGGER IF EXISTS update_lms_links_updated_at ON lms_links;
CREATE TRIGGER update_lms_links_updated_at
  BEFORE UPDATE ON lms_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk admin_users
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. VIEWS (untuk kemudahan query)
-- ============================================

-- View: Dokumentasi dengan jumlah links
CREATE OR REPLACE VIEW v_dokumentasi_with_links AS
SELECT 
  dk.*,
  COUNT(dl.id) as total_links
FROM dokumentasi_kegiatan dk
LEFT JOIN dokumentasi_links dl ON dk.id = dl.dokumentasi_id
GROUP BY dk.id
ORDER BY dk.created_at DESC;

-- View: Active dashboard link
CREATE OR REPLACE VIEW v_active_dashboard_link AS
SELECT * FROM dashboard_links 
WHERE is_active = true 
ORDER BY updated_at DESC 
LIMIT 1;

-- View: Active LMS link
CREATE OR REPLACE VIEW v_active_lms_link AS
SELECT * FROM lms_links 
WHERE is_active = true 
ORDER BY updated_at DESC 
LIMIT 1;

-- ============================================
-- 11. GRANT PERMISSIONS
-- ============================================

-- Grant permissions untuk anon users (public access)
GRANT SELECT ON dokumentasi_kegiatan TO anon;
GRANT SELECT ON dokumentasi_links TO anon;
GRANT SELECT ON dashboard_links TO anon;
GRANT SELECT ON lms_links TO anon;
GRANT SELECT ON v_dokumentasi_with_links TO anon;
GRANT SELECT ON v_active_dashboard_link TO anon;
GRANT SELECT ON v_active_lms_link TO anon;

-- Grant permissions untuk authenticated users
GRANT ALL ON dokumentasi_kegiatan TO authenticated;
GRANT ALL ON dokumentasi_links TO authenticated;
GRANT ALL ON dashboard_links TO authenticated;
GRANT ALL ON lms_links TO authenticated;
GRANT ALL ON admin_users TO authenticated;
GRANT SELECT ON v_dokumentasi_with_links TO authenticated;
GRANT SELECT ON v_active_dashboard_link TO authenticated;
GRANT SELECT ON v_active_lms_link TO authenticated;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================
-- SETUP SELESAI! ✅
-- ============================================
-- Next Steps:
-- 1. Jalankan SQL ini di Supabase SQL Editor
-- 2. Buat bucket 'dokumentasi-images' di Storage (jika belum)
-- 3. Copy Project URL dan Anon Key dari Settings → API
-- 4. Update file .env di aplikasi dengan credentials
-- 5. Install @supabase/supabase-js di aplikasi
-- 6. Update components untuk fetch data dari Supabase
-- ============================================

-- Verify setup dengan query ini:
SELECT 'Tables created successfully!' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
