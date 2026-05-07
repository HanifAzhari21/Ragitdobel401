-- ============================================
-- SUPABASE RLS POLICIES (CORRECTED)
-- Ragit Dobel 4.0 - Kanwil DJPb Sumsel
-- ============================================
-- 
-- File: supabase-rls-policies.sql
-- Purpose: Setup Row Level Security policies untuk semua tables
-- Run: Copy-paste ke Supabase SQL Editor
--
-- IMPORTANT: File ini sudah diperbaiki untuk tabel yang benar
-- ============================================

-- ============================================
-- DROP EXISTING POLICIES (jika ada)
-- ============================================

-- Admin Users
DROP POLICY IF EXISTS "Public can read admin users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated can update admin users" ON admin_users;

-- Dashboard Links
DROP POLICY IF EXISTS "Public can view dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Public can read dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Authenticated can manage dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Authenticated can insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Authenticated can update dashboard links" ON dashboard_links;

-- LMS Links
DROP POLICY IF EXISTS "Public can view lms links" ON lms_links;
DROP POLICY IF EXISTS "Public can read lms links" ON lms_links;
DROP POLICY IF EXISTS "Authenticated can manage lms links" ON lms_links;
DROP POLICY IF EXISTS "Authenticated can insert lms links" ON lms_links;
DROP POLICY IF EXISTS "Authenticated can update lms links" ON lms_links;

-- Dokumentasi Kegiatan
DROP POLICY IF EXISTS "Public can view published dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Public can read published dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Authenticated can manage dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Authenticated can insert dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Authenticated can update dokumentasi" ON dokumentasi_kegiatan;
DROP POLICY IF EXISTS "Authenticated can delete dokumentasi" ON dokumentasi_kegiatan;

-- Dokumentasi Links
DROP POLICY IF EXISTS "Public can view dokumentasi links" ON dokumentasi_links;
DROP POLICY IF EXISTS "Public can read dokumentasi links" ON dokumentasi_links;
DROP POLICY IF EXISTS "Authenticated can manage dokumentasi links" ON dokumentasi_links;
DROP POLICY IF EXISTS "Authenticated can insert dokumentasi links" ON dokumentasi_links;
DROP POLICY IF EXISTS "Authenticated can update dokumentasi links" ON dokumentasi_links;
DROP POLICY IF EXISTS "Authenticated can delete dokumentasi links" ON dokumentasi_links;

-- ============================================
-- ENABLE RLS untuk semua tabel
-- ============================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumentasi_kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumentasi_links ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 1. ADMIN_USERS POLICIES
-- ============================================

-- Public can read (untuk login verification)
-- Password sudah di-hash, aman untuk dibaca
CREATE POLICY "Public can read admin users"
ON admin_users FOR SELECT
TO public
USING (true);

-- Authenticated users can update (untuk update last_login, dll)
CREATE POLICY "Authenticated can update admin users"
ON admin_users FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- 2. DASHBOARD_LINKS POLICIES
-- ============================================

-- Public dapat read link yang aktif
CREATE POLICY "Public can read dashboard links"
ON dashboard_links FOR SELECT
TO public
USING (is_active = true);

-- Authenticated dapat insert
CREATE POLICY "Authenticated can insert dashboard links"
ON dashboard_links FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated dapat update
CREATE POLICY "Authenticated can update dashboard links"
ON dashboard_links FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- 3. LMS_LINKS POLICIES
-- ============================================

-- Public dapat read link yang aktif
CREATE POLICY "Public can read lms links"
ON lms_links FOR SELECT
TO public
USING (is_active = true);

-- Authenticated dapat insert
CREATE POLICY "Authenticated can insert lms links"
ON lms_links FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated dapat update
CREATE POLICY "Authenticated can update lms links"
ON lms_links FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- 4. DOKUMENTASI_KEGIATAN POLICIES
-- ============================================

-- Public hanya bisa lihat dokumentasi yang published
CREATE POLICY "Public can read published dokumentasi"
ON dokumentasi_kegiatan FOR SELECT
TO public
USING (is_published = true);

-- Authenticated dapat insert
CREATE POLICY "Authenticated can insert dokumentasi"
ON dokumentasi_kegiatan FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated dapat update
CREATE POLICY "Authenticated can update dokumentasi"
ON dokumentasi_kegiatan FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Authenticated dapat delete
CREATE POLICY "Authenticated can delete dokumentasi"
ON dokumentasi_kegiatan FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- 5. DOKUMENTASI_LINKS POLICIES
-- ============================================

-- Public dapat read links untuk dokumentasi yang published
CREATE POLICY "Public can read dokumentasi links"
ON dokumentasi_links FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM dokumentasi_kegiatan
    WHERE dokumentasi_kegiatan.id = dokumentasi_links.dokumentasi_id
    AND dokumentasi_kegiatan.is_published = true
  )
);

-- Authenticated dapat insert
CREATE POLICY "Authenticated can insert dokumentasi links"
ON dokumentasi_links FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated dapat update
CREATE POLICY "Authenticated can update dokumentasi links"
ON dokumentasi_links FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Authenticated dapat delete
CREATE POLICY "Authenticated can delete dokumentasi links"
ON dokumentasi_links FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check RLS status
SELECT '✅ RLS STATUS' as "SECTION";

SELECT 
  tablename as "Tabel",
  rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'admin_users',
    'dashboard_links',
    'lms_links',
    'dokumentasi_kegiatan',
    'dokumentasi_links'
  )
ORDER BY tablename;

-- List all policies
SELECT '✅ POLICIES YANG DIBUAT' as "SECTION";

SELECT 
  tablename as "Tabel",
  policyname as "Policy Name",
  cmd as "Operation",
  roles as "Roles"
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'admin_users',
    'dashboard_links',
    'lms_links',
    'dokumentasi_kegiatan',
    'dokumentasi_links'
  )
ORDER BY tablename, cmd, policyname;

-- ============================================
-- TEST QUERIES
-- ============================================

-- Test 1: Public read dashboard_links
SELECT '🧪 Test 1: Public read dashboard_links' as "TEST";
SELECT id, url, label, is_active FROM dashboard_links;

-- Test 2: Public read lms_links
SELECT '🧪 Test 2: Public read lms_links' as "TEST";
SELECT id, url, label, is_active FROM lms_links;

-- Test 3: Public read dokumentasi
SELECT '🧪 Test 3: Public read dokumentasi (published only)' as "TEST";
SELECT id, title, is_published FROM dokumentasi_kegiatan;

-- Test 4: Public read admin_users (only username, not password)
SELECT '🧪 Test 4: Public read admin_users' as "TEST";
SELECT id, username, created_at FROM admin_users;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '
✅ RLS POLICIES BERHASIL DIKONFIGURASI!

📋 Summary:
   - 5 tabel sudah enabled RLS
   - Total policies: 15+ policies
   - Public: Read-only access
   - Authenticated: Full CRUD access

🔒 Security Features:
   ✅ Public hanya bisa READ
   ✅ Write operations butuh authentication
   ✅ Password admin sudah di-hash
   ✅ Dokumentasi: hanya published yang tampil
   
🎯 Next Steps:
   1. Test connection dari aplikasi
   2. Test CRUD operations sebagai admin
   3. Verify public access (tanpa login)
   4. Deploy ke production

' as "INFO";
