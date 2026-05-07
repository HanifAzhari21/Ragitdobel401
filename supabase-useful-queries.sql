-- ============================================
-- USEFUL QUERIES - SUPABASE
-- Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan
-- ============================================
-- Kumpulan query yang berguna untuk maintenance
-- dan troubleshooting
-- ============================================

-- ============================================
-- 1. MONITORING & STATISTICS
-- ============================================

-- Total dokumentasi kegiatan
SELECT COUNT(*) as total_dokumentasi FROM dokumentasi_kegiatan;

-- Total links per dokumentasi
SELECT 
  dk.id,
  dk.title,
  COUNT(dl.id) as total_links
FROM dokumentasi_kegiatan dk
LEFT JOIN dokumentasi_links dl ON dk.id = dl.dokumentasi_id
GROUP BY dk.id, dk.title
ORDER BY total_links DESC;

-- Dokumentasi terbaru (10 terakhir)
SELECT 
  id,
  title,
  date,
  pic_name,
  unit,
  created_at
FROM dokumentasi_kegiatan
ORDER BY created_at DESC
LIMIT 10;

-- Statistik per unit
SELECT 
  unit,
  COUNT(*) as total_kegiatan
FROM dokumentasi_kegiatan
WHERE unit IS NOT NULL
GROUP BY unit
ORDER BY total_kegiatan DESC;

-- ============================================
-- 2. DATA VALIDATION
-- ============================================

-- Cek dokumentasi tanpa links
SELECT 
  dk.id,
  dk.title,
  dk.date
FROM dokumentasi_kegiatan dk
LEFT JOIN dokumentasi_links dl ON dk.id = dl.dokumentasi_id
WHERE dl.id IS NULL;

-- Cek dokumentasi tanpa PIC
SELECT 
  id,
  title,
  date
FROM dokumentasi_kegiatan
WHERE pic_name IS NULL OR pic_name = '';

-- Cek links dengan URL kosong/invalid
SELECT 
  id,
  dokumentasi_id,
  label,
  url
FROM dokumentasi_links
WHERE url IS NULL OR url = '' OR url NOT LIKE 'http%';

-- ============================================
-- 3. BULK OPERATIONS
-- ============================================

-- Update semua dokumentasi tanpa unit
UPDATE dokumentasi_kegiatan
SET unit = 'Umum'
WHERE unit IS NULL OR unit = '';

-- Set semua dokumentasi sebagai published
UPDATE dokumentasi_kegiatan
SET is_published = true;

-- Unpublish dokumentasi lama (lebih dari 2 tahun)
UPDATE dokumentasi_kegiatan
SET is_published = false
WHERE created_at < NOW() - INTERVAL '2 years';

-- ============================================
-- 4. SEARCH & FILTER
-- ============================================

-- Cari dokumentasi berdasarkan keyword di title/description
SELECT * FROM dokumentasi_kegiatan
WHERE 
  title ILIKE '%workshop%' 
  OR description ILIKE '%workshop%'
ORDER BY created_at DESC;

-- Cari dokumentasi berdasarkan tanggal
SELECT * FROM dokumentasi_kegiatan
WHERE date LIKE '%Desember 2025%'
ORDER BY date DESC;

-- Cari dokumentasi berdasarkan PIC
SELECT * FROM dokumentasi_kegiatan
WHERE pic_name ILIKE '%Tim%'
ORDER BY created_at DESC;

-- ============================================
-- 5. ADMIN MANAGEMENT
-- ============================================

-- Lihat semua admin dengan last login
SELECT 
  username,
  full_name,
  last_login,
  created_at,
  CASE 
    WHEN last_login IS NULL THEN 'Belum pernah login'
    WHEN last_login > NOW() - INTERVAL '7 days' THEN 'Aktif'
    WHEN last_login > NOW() - INTERVAL '30 days' THEN 'Kurang aktif'
    ELSE 'Tidak aktif'
  END as status
FROM admin_users
ORDER BY last_login DESC NULLS LAST;

-- Update last login admin (manual)
UPDATE admin_users
SET last_login = NOW()
WHERE username = 'RagitAdmin1';

-- ============================================
-- 6. LINK MANAGEMENT
-- ============================================

-- Lihat dashboard link yang aktif
SELECT * FROM dashboard_links 
WHERE is_active = true 
ORDER BY updated_at DESC;

-- Lihat LMS link yang aktif
SELECT * FROM lms_links 
WHERE is_active = true 
ORDER BY updated_at DESC;

-- Update dashboard link
UPDATE dashboard_links
SET 
  url = 'https://lookerstudio.google.com/new-dashboard-url',
  updated_at = NOW(),
  updated_by = 'RagitAdmin1'
WHERE id = 1;

-- Update LMS link
UPDATE lms_links
SET 
  url = 'https://learning.kemenkeu.go.id/new-url',
  updated_at = NOW(),
  updated_by = 'RagitAdmin1'
WHERE id = 1;

-- ============================================
-- 7. CLEANUP & MAINTENANCE
-- ============================================

-- Hapus dokumentasi beserta links-nya (CASCADE otomatis hapus links)
-- DELETE FROM dokumentasi_kegiatan WHERE id = 999;

-- Hapus dokumentasi yang tidak published lebih dari 1 tahun
-- DELETE FROM dokumentasi_kegiatan 
-- WHERE is_published = false 
-- AND created_at < NOW() - INTERVAL '1 year';

-- Hapus orphaned links (links tanpa dokumentasi parent)
-- Note: Seharusnya tidak terjadi karena ON DELETE CASCADE
DELETE FROM dokumentasi_links
WHERE dokumentasi_id NOT IN (SELECT id FROM dokumentasi_kegiatan);

-- ============================================
-- 8. EXPORT DATA
-- ============================================

-- Export dokumentasi ke CSV format (copy results)
SELECT 
  id,
  title,
  description,
  date,
  pic_name,
  unit,
  cover_image,
  created_at,
  is_published
FROM dokumentasi_kegiatan
ORDER BY created_at DESC;

-- Export links dengan dokumentasi title
SELECT 
  dk.title as dokumentasi_title,
  dk.date,
  dl.label as link_label,
  dl.url as link_url
FROM dokumentasi_links dl
JOIN dokumentasi_kegiatan dk ON dl.dokumentasi_id = dk.id
ORDER BY dk.created_at DESC, dl.display_order;

-- ============================================
-- 9. ANALYTICS
-- ============================================

-- Dokumentasi per bulan (tahun 2025)
SELECT 
  TO_CHAR(created_at, 'YYYY-MM') as bulan,
  COUNT(*) as total_dokumentasi
FROM dokumentasi_kegiatan
WHERE EXTRACT(YEAR FROM created_at) = 2025
GROUP BY bulan
ORDER BY bulan;

-- Dokumentasi per PIC
SELECT 
  COALESCE(pic_name, 'Tidak ada PIC') as pic_name,
  COUNT(*) as total_kegiatan
FROM dokumentasi_kegiatan
GROUP BY pic_name
ORDER BY total_kegiatan DESC;

-- Rata-rata jumlah links per dokumentasi
SELECT 
  AVG(link_count) as rata_rata_links
FROM (
  SELECT 
    dk.id,
    COUNT(dl.id) as link_count
  FROM dokumentasi_kegiatan dk
  LEFT JOIN dokumentasi_links dl ON dk.id = dl.dokumentasi_id
  GROUP BY dk.id
) as subquery;

-- ============================================
-- 10. BACKUP & RESTORE
-- ============================================

-- Backup semua dokumentasi ke temporary table
CREATE TEMP TABLE backup_dokumentasi AS
SELECT * FROM dokumentasi_kegiatan;

-- Backup semua links ke temporary table
CREATE TEMP TABLE backup_links AS
SELECT * FROM dokumentasi_links;

-- Restore dari backup (jika diperlukan)
-- INSERT INTO dokumentasi_kegiatan 
-- SELECT * FROM backup_dokumentasi
-- ON CONFLICT (id) DO NOTHING;

-- INSERT INTO dokumentasi_links
-- SELECT * FROM backup_links
-- ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 11. PERFORMANCE OPTIMIZATION
-- ============================================

-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM dokumentasi_kegiatan
WHERE is_published = true
ORDER BY created_at DESC
LIMIT 10;

-- Reindex tables (jika perlu)
REINDEX TABLE dokumentasi_kegiatan;
REINDEX TABLE dokumentasi_links;

-- Vacuum tables (cleanup)
VACUUM ANALYZE dokumentasi_kegiatan;
VACUUM ANALYZE dokumentasi_links;

-- ============================================
-- 12. TESTING & DEVELOPMENT
-- ============================================

-- Insert test data
INSERT INTO dokumentasi_kegiatan (
  title, 
  description, 
  date, 
  pic_name, 
  unit, 
  cover_image,
  is_published
) VALUES (
  'Test Kegiatan - ' || TO_CHAR(NOW(), 'YYYY-MM-DD HH24:MI:SS'),
  'Ini adalah test data untuk development',
  TO_CHAR(NOW(), 'DD Month YYYY'),
  'Test PIC',
  'Test Unit',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop',
  false  -- Tidak published agar tidak muncul di public
)
RETURNING id, title;

-- Hapus semua test data
DELETE FROM dokumentasi_kegiatan 
WHERE title LIKE 'Test Kegiatan%' 
OR description LIKE '%test data%';

-- ============================================
-- 13. SECURITY CHECKS
-- ============================================

-- Cek RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Cek table permissions
SELECT 
  grantee,
  table_schema,
  table_name,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
ORDER BY table_name, grantee;

-- ============================================
-- END OF USEFUL QUERIES
-- ============================================

-- Simpan file ini untuk referensi!
-- Jalankan query sesuai kebutuhan di Supabase SQL Editor
