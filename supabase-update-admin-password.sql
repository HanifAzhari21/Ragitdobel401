-- ============================================
-- UPDATE ADMIN PASSWORD
-- Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan
-- ============================================
-- Jalankan SQL ini jika ingin mengganti password admin
-- atau menambah admin baru
-- ============================================

-- ============================================
-- OPSI 1: Update Password Admin Existing
-- ============================================
-- Catatan: Hash password perlu di-generate di aplikasi
-- karena Supabase tidak memiliki bcrypt function built-in

-- Untuk sementara, gunakan plain text password
-- (Nanti akan di-hash di aplikasi saat login pertama kali)

-- Reset password admin default
UPDATE admin_users 
SET password_hash = 'SayaAdmin1234'  -- Akan di-hash oleh aplikasi
WHERE username = 'RagitAdmin1';

-- ============================================
-- OPSI 2: Tambah Admin Baru
-- ============================================

-- Tambah admin baru (password akan di-hash oleh aplikasi)
INSERT INTO admin_users (username, password_hash, full_name)
VALUES 
  ('admin2', 'Password123', 'Admin Kedua'),
  ('superadmin', 'SuperPass456', 'Super Administrator')
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- OPSI 3: Lihat Semua Admin
-- ============================================

SELECT 
  id,
  username,
  full_name,
  created_at,
  last_login
FROM admin_users
ORDER BY created_at;

-- ============================================
-- OPSI 4: Hapus Admin
-- ============================================

-- Hapus admin berdasarkan username
-- DELETE FROM admin_users WHERE username = 'admin2';

-- ============================================
-- OPSI 5: Reset Last Login
-- ============================================

-- Reset last login semua admin
UPDATE admin_users SET last_login = NULL;

-- ============================================
-- CATATAN KEAMANAN
-- ============================================
-- 1. Password plain text hanya untuk development/testing
-- 2. Di production, HARUS menggunakan bcrypt hash
-- 3. Generate hash di aplikasi React sebelum insert ke database
-- 4. Jangan pernah tampilkan password_hash ke client
-- 5. Gunakan HTTPS untuk production deployment
-- ============================================

-- ============================================
-- CARA GENERATE BCRYPT HASH
-- ============================================
-- Gunakan online tool (hanya untuk testing!):
-- https://bcrypt-generator.com/
-- 
-- Atau di aplikasi Node.js:
-- const bcrypt = require('bcrypt');
-- const hash = await bcrypt.hash('SayaAdmin1234', 10);
-- console.log(hash);
-- 
-- Contoh hash untuk "SayaAdmin1234":
-- $2b$10$rQFkzWJxJqJYU.V5p9h3rOqHvN0xK5L.KjPr8YjGQ3NW9LZH2nF0G
-- ============================================
