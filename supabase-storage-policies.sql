-- ============================================
-- SUPABASE STORAGE POLICIES
-- Ragit Dobel 4.0 - Kanwil DJPb Sumsel
-- ============================================
-- 
-- File: supabase-storage-policies.sql
-- Purpose: Setup Storage policies untuk bucket dokumentasi-images
-- 
-- PREREQUISITES:
-- 1. Bucket "dokumentasi-images" sudah dibuat
-- 2. Bucket status: Public
--
-- HOW TO RUN:
-- 1. Buka Supabase Dashboard
-- 2. SQL Editor → New Query
-- 3. Copy-paste SQL ini
-- 4. Run
--
-- ============================================

-- Drop existing policies jika ada (untuk re-run)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- ============================================
-- STORAGE POLICIES untuk bucket: dokumentasi-images
-- ============================================

-- Policy 1: Anyone can READ/SELECT (public access)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dokumentasi-images');

-- Policy 2: Authenticated users can UPLOAD/INSERT
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'dokumentasi-images');

-- Policy 3: Authenticated users can UPDATE
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'dokumentasi-images')
WITH CHECK (bucket_id = 'dokumentasi-images');

-- Policy 4: Authenticated users can DELETE
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'dokumentasi-images');

-- ============================================
-- VERIFICATION
-- ============================================

-- Check storage policies
SELECT 
  policyname,
  cmd as operation,
  roles
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;

-- ============================================
-- Expected Output:
-- ============================================
--
-- ┌──────────────────────────────────┬───────────┬────────────────┐
-- │          policyname              │ operation │     roles      │
-- ├──────────────────────────────────┼───────────┼────────────────┤
-- │ Authenticated users can delete   │ DELETE    │{authenticated} │
-- │ Authenticated users can update   │ UPDATE    │{authenticated} │
-- │ Authenticated users can upload   │ INSERT    │{authenticated} │
-- │ Public Access                    │ SELECT    │{public}        │
-- └──────────────────────────────────┴───────────┴────────────────┘
--
-- ✅ If you see 4 policies above, storage is properly configured!
--
-- ============================================

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Storage policies berhasil dibuat!';
  RAISE NOTICE '📦 Bucket: dokumentasi-images';
  RAISE NOTICE '🔓 Public: Can read/view images';
  RAISE NOTICE '🔐 Authenticated: Can upload/update/delete';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next Steps:';
  RAISE NOTICE '   1. Test upload dari aplikasi';
  RAISE NOTICE '   2. Verify image URL accessible';
  RAISE NOTICE '   3. Run test-supabase-connection.js';
END $$;

-- ============================================
-- NOTES
-- ============================================
--
-- Storage URL Format:
-- https://zbexsukhqcgmzgqapoii.supabase.co/storage/v1/object/public/dokumentasi-images/FILENAME
--
-- Example:
-- https://zbexsukhqcgmzgqapoii.supabase.co/storage/v1/object/public/dokumentasi-images/kegiatan-1.jpg
--
-- Upload dari aplikasi:
-- const { data, error } = await supabase.storage
--   .from('dokumentasi-images')
--   .upload('kegiatan-1.jpg', file)
--
-- Get public URL:
-- const { data } = supabase.storage
--   .from('dokumentasi-images')
--   .getPublicUrl('kegiatan-1.jpg')
--
-- Delete:
-- const { data, error } = await supabase.storage
--   .from('dokumentasi-images')
--   .remove(['kegiatan-1.jpg'])
--
-- ============================================
-- ALLOWED FILE TYPES (Optional - bisa ditambahkan)
-- ============================================
--
-- Di Supabase Dashboard:
-- Storage → dokumentasi-images → Settings
--
-- Allowed MIME types:
-- - image/jpeg
-- - image/jpg
-- - image/png
-- - image/webp
-- - image/gif
--
-- Max file size: 5 MB (default sudah OK)
--
-- ============================================
-- SECURITY CONSIDERATIONS
-- ============================================
--
-- ✅ Public bucket - Everyone can VIEW images (expected behavior)
-- ✅ Only authenticated users can UPLOAD
-- ✅ Only authenticated users can DELETE
-- ✅ Prevents spam uploads
-- ✅ Prevents unauthorized deletions
--
-- ⚠️  Images uploaded akan public accessible
--    Jangan upload sensitive/confidential images!
--
-- ============================================
