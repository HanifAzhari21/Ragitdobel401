-- ============================================
-- SUPABASE DATABASE CHECKER
-- Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan
-- ============================================
-- Jalankan script ini di Supabase SQL Editor
-- untuk mengecek status database Anda
-- ============================================

-- ============================================
-- 1. CEK KONEKSI DATABASE
-- ============================================

SELECT '1. CEK KONEKSI DATABASE' as "SECTION";

SELECT 
    current_database() as "Nama Database",
    current_user as "User Saat Ini",
    version() as "PostgreSQL Version",
    NOW() as "Waktu Check";

-- ============================================
-- 2. CEK TABEL YANG ADA
-- ============================================

SELECT '2. CEK TABEL YANG ADA' as "SECTION";

SELECT 
    table_name as "Nama Tabel",
    table_type as "Tipe"
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ============================================
-- 3. CEK TABEL YANG DIPERLUKAN (MUST HAVE)
-- ============================================

SELECT '3. CEK TABEL YANG DIPERLUKAN (MUST HAVE)' as "SECTION";

WITH required_tables AS (
    SELECT unnest(ARRAY[
        'admin_users',
        'dashboard_links', 
        'lms_links',
        'dokumentasi_kegiatan',
        'dokumentasi_links'
    ]) AS table_name
),
existing_tables AS (
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
)
SELECT 
    rt.table_name as "Tabel yang Diperlukan",
    CASE 
        WHEN et.table_name IS NOT NULL THEN '✅ ADA'
        ELSE '❌ TIDAK ADA'
    END as "Status"
FROM required_tables rt
LEFT JOIN existing_tables et ON rt.table_name = et.table_name
ORDER BY rt.table_name;

-- ============================================
-- 4. CEK STRUKTUR TABEL: admin_users
-- ============================================

SELECT '4. CEK STRUKTUR TABEL: admin_users' as "SECTION";

SELECT 
    column_name as "Kolom",
    data_type as "Tipe Data",
    is_nullable as "Nullable",
    column_default as "Default Value"
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'admin_users'
ORDER BY ordinal_position;

-- Cek jumlah data
SELECT COUNT(*) as "Jumlah Admin Users" FROM admin_users;

-- ============================================
-- 5. CEK STRUKTUR TABEL: dashboard_links
-- ============================================

SELECT '5. CEK STRUKTUR TABEL: dashboard_links' as "SECTION";

SELECT 
    column_name as "Kolom",
    data_type as "Tipe Data",
    is_nullable as "Nullable",
    column_default as "Default Value"
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'dashboard_links'
ORDER BY ordinal_position;

-- Cek data
SELECT 
    id as "ID",
    url as "URL",
    label as "Label",
    is_active as "Aktif",
    updated_at as "Update Terakhir"
FROM dashboard_links
ORDER BY updated_at DESC;

-- ============================================
-- 6. CEK STRUKTUR TABEL: lms_links
-- ============================================

SELECT '6. CEK STRUKTUR TABEL: lms_links' as "SECTION";

SELECT 
    column_name as "Kolom",
    data_type as "Tipe Data",
    is_nullable as "Nullable",
    column_default as "Default Value"
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'lms_links'
ORDER BY ordinal_position;

-- Cek data
SELECT 
    id as "ID",
    url as "URL",
    label as "Label",
    is_active as "Aktif",
    updated_at as "Update Terakhir"
FROM lms_links
ORDER BY updated_at DESC;

-- ============================================
-- 7. CEK STRUKTUR TABEL: dokumentasi_kegiatan
-- ============================================

SELECT '7. CEK STRUKTUR TABEL: dokumentasi_kegiatan' as "SECTION";

SELECT 
    column_name as "Kolom",
    data_type as "Tipe Data",
    is_nullable as "Nullable",
    column_default as "Default Value"
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'dokumentasi_kegiatan'
ORDER BY ordinal_position;

-- Cek jumlah data
SELECT COUNT(*) as "Jumlah Dokumentasi" FROM dokumentasi_kegiatan;

-- ============================================
-- 8. CEK STRUKTUR TABEL: dokumentasi_links
-- ============================================

SELECT '8. CEK STRUKTUR TABEL: dokumentasi_links' as "SECTION";

SELECT 
    column_name as "Kolom",
    data_type as "Tipe Data",
    is_nullable as "Nullable",
    column_default as "Default Value"
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'dokumentasi_links'
ORDER BY ordinal_position;

-- Cek jumlah data
SELECT COUNT(*) as "Jumlah Dokumentasi Links" FROM dokumentasi_links;

-- ============================================
-- 9. CEK ROW LEVEL SECURITY (RLS)
-- ============================================

SELECT '9. CEK ROW LEVEL SECURITY (RLS)' as "SECTION";

SELECT 
    schemaname as "Schema",
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

-- ============================================
-- 10. CEK RLS POLICIES
-- ============================================

SELECT '10. CEK RLS POLICIES' as "SECTION";

SELECT 
    tablename as "Tabel",
    policyname as "Nama Policy",
    permissive as "Permissive",
    roles as "Roles",
    cmd as "Command"
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================
-- 11. CEK INDEX
-- ============================================

SELECT '11. CEK INDEX' as "SECTION";

SELECT 
    tablename as "Tabel",
    indexname as "Nama Index",
    indexdef as "Definisi Index"
FROM pg_indexes
WHERE schemaname = 'public'
    AND tablename IN (
        'admin_users',
        'dashboard_links',
        'lms_links',
        'dokumentasi_kegiatan',
        'dokumentasi_links'
    )
ORDER BY tablename, indexname;

-- ============================================
-- 12. CEK TRIGGERS
-- ============================================

SELECT '12. CEK TRIGGERS' as "SECTION";

SELECT 
    event_object_table as "Tabel",
    trigger_name as "Nama Trigger",
    event_manipulation as "Event",
    action_timing as "Timing"
FROM information_schema.triggers
WHERE event_object_schema = 'public'
    AND event_object_table IN (
        'admin_users',
        'dashboard_links',
        'lms_links',
        'dokumentasi_kegiatan',
        'dokumentasi_links'
    )
ORDER BY event_object_table, trigger_name;

-- ============================================
-- 13. CEK VIEWS
-- ============================================

SELECT '13. CEK VIEWS' as "SECTION";

SELECT 
    table_name as "Nama View"
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- ============================================
-- 14. CEK STORAGE BUCKETS
-- ============================================

SELECT '14. CEK STORAGE BUCKETS' as "SECTION";

SELECT 
    id as "Bucket ID",
    name as "Nama Bucket",
    public as "Public",
    created_at as "Dibuat"
FROM storage.buckets
ORDER BY name;

-- ============================================
-- 15. CEK STORAGE POLICIES
-- ============================================

SELECT '15. CEK STORAGE POLICIES' as "SECTION";

SELECT 
    tablename as "Tabel",
    policyname as "Nama Policy",
    roles as "Roles",
    cmd as "Command"
FROM pg_policies
WHERE schemaname = 'storage'
ORDER BY tablename, policyname;

-- ============================================
-- 16. CEK EXTENSIONS
-- ============================================

SELECT '16. CEK EXTENSIONS' as "SECTION";

SELECT 
    extname as "Extension Name",
    extversion as "Version"
FROM pg_extension
ORDER BY extname;

-- ============================================
-- 17. CEK SAMPLE DATA (jika ada)
-- ============================================

SELECT '17. CEK SAMPLE DATA - Dashboard Links' as "SECTION";
SELECT * FROM dashboard_links LIMIT 3;

SELECT '17. CEK SAMPLE DATA - LMS Links' as "SECTION";
SELECT * FROM lms_links LIMIT 3;

SELECT '17. CEK SAMPLE DATA - Dokumentasi Kegiatan' as "SECTION";
SELECT 
    id,
    title,
    date,
    pic_name,
    unit,
    is_published,
    created_at
FROM dokumentasi_kegiatan 
ORDER BY created_at DESC 
LIMIT 5;

-- ============================================
-- 18. SUMMARY STATUS
-- ============================================

SELECT '18. SUMMARY STATUS' as "SECTION";

WITH 
table_check AS (
    SELECT COUNT(*) as total
    FROM information_schema.tables
    WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND table_name IN (
            'admin_users',
            'dashboard_links',
            'lms_links',
            'dokumentasi_kegiatan',
            'dokumentasi_links'
        )
),
rls_check AS (
    SELECT COUNT(*) as total
    FROM pg_tables
    WHERE schemaname = 'public'
        AND rowsecurity = true
        AND tablename IN (
            'admin_users',
            'dashboard_links',
            'lms_links',
            'dokumentasi_kegiatan',
            'dokumentasi_links'
        )
),
policy_check AS (
    SELECT COUNT(*) as total
    FROM pg_policies
    WHERE schemaname = 'public'
),
trigger_check AS (
    SELECT COUNT(*) as total
    FROM information_schema.triggers
    WHERE event_object_schema = 'public'
        AND event_object_table IN (
            'admin_users',
            'dashboard_links',
            'lms_links',
            'dokumentasi_kegiatan',
            'dokumentasi_links'
        )
)
SELECT 
    (SELECT total FROM table_check) as "Tabel Dibuat (dari 5)",
    (SELECT total FROM rls_check) as "Tabel dengan RLS (dari 5)",
    (SELECT total FROM policy_check) as "Total Policies",
    (SELECT total FROM trigger_check) as "Total Triggers";

-- ============================================
-- CATATAN
-- ============================================
SELECT '
CATATAN:
- Jika ada tabel yang TIDAK ADA, jalankan supabase-setup.sql
- Jika RLS belum enabled, jalankan supabase-rls-policies.sql  
- Jika data default belum ada, insert manual atau re-run setup
' as "INFO";
