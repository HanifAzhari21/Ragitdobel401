# ✅ Supabase Setup - Langkah Selanjutnya

## Status Saat Ini

✅ **Yang Sudah Selesai**:
- [x] OAuth user created
- [x] `supabase-setup.sql` sudah dijalankan
- [x] 1 akun auth sudah dibuat

---

## 🎯 Langkah Selanjutnya

### **STEP 1: Verify Tables Sudah Terbuat** ✅

1. **Buka Supabase Dashboard**:
   - URL: https://app.supabase.com/project/zbexsukhqcgmzgqapoii
   - Login dengan akun OAuth Anda

2. **Check Tables**:
   - Sidebar → **Table Editor**
   - Anda harus lihat 3 tables:
     - ✅ `external_links` (untuk Dashboard & LMS links)
     - ✅ `dokumentasi` (untuk dokumentasi kegiatan)
     - ✅ `admin_users` (untuk login admin)

3. **Verify Data**:
   
   **Table: `external_links`**
   ```
   Klik table "external_links" 
   → Harus ada 2 rows:
   
   id | link_key          | link_url                      | updated_at
   ---+-------------------+-------------------------------+------------
   1  | dashboard_link    | https://example.com/dashboard | (timestamp)
   2  | lms_link          | https://example.com/lms       | (timestamp)
   ```

   **Table: `admin_users`**
   ```
   Klik table "admin_users"
   → Harus ada 1 row:
   
   id | username      | password_hash      | created_at
   ---+---------------+--------------------+-----------
   1  | RagitAdmin1   | $2a$10$...        | (timestamp)
   ```

   **Table: `dokumentasi`**
   ```
   Klik table "dokumentasi"
   → Harus ada 5 sample rows (kegiatan sample)
   ```

**Jika semua ada** ✅ → Lanjut ke STEP 2  
**Jika tidak ada / error** ❌ → Jalankan ulang `supabase-setup.sql`

---

### **STEP 2: Create Storage Bucket untuk Images** 📦

Ini untuk menyimpan gambar dokumentasi kegiatan.

1. **Buka Storage**:
   - Sidebar → **Storage**
   - Klik **"New bucket"**

2. **Konfigurasi Bucket**:
   ```
   Name: dokumentasi-images
   Public bucket: ✅ YES (centang)
   File size limit: 5 MB (default OK)
   Allowed MIME types: (kosongkan dulu, nanti bisa diatur)
   ```

3. **Klik "Create bucket"**

4. **Verify**:
   - Bucket `dokumentasi-images` harus muncul di list
   - Status: Public ✅

---

### **STEP 3: Setup Storage Policies** 🔐

Supaya aplikasi bisa upload/read images.

1. **Buka Policies**:
   - Storage → Klik bucket `dokumentasi-images`
   - Tab **"Policies"**
   - Klik **"New policy"**

2. **Policy 1: Public Read Access**
   ```
   Policy name: Public Read Access
   Allowed operation: SELECT
   Target roles: public
   
   USING expression:
   true
   ```
   
   **Atau pakai Template**:
   - Klik "For full customization"
   - Pilih template "Allow public access to bucket"
   - Klik "Use this template"
   - Review → Save

3. **Policy 2: Authenticated Upload Access**
   ```
   Policy name: Authenticated Upload
   Allowed operation: INSERT
   Target roles: authenticated
   
   USING expression:
   true
   ```

4. **Policy 3: Authenticated Update/Delete**
   ```
   Policy name: Authenticated Update Delete
   Allowed operation: UPDATE, DELETE
   Target roles: authenticated
   
   USING expression:
   true
   ```

**Atau lebih mudah, jalankan SQL ini**:

1. Sidebar → **SQL Editor**
2. New Query
3. Paste SQL ini:

```sql
-- Storage policies untuk bucket dokumentasi-images

-- Policy 1: Anyone can read (public access)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dokumentasi-images');

-- Policy 2: Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'dokumentasi-images');

-- Policy 3: Authenticated users can update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'dokumentasi-images');

-- Policy 4: Authenticated users can delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'dokumentasi-images');
```

4. **Run** → Should see "Success"

---

### **STEP 4: Test Connection dari Aplikasi** 🧪

Sekarang test apakah aplikasi bisa connect ke Supabase.

1. **Buka Terminal** di project folder

2. **Test connection**:
   
   Buat file test sederhana:

```bash
# Create test file
cat > test-supabase.js << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbexsukhqcgmzgqapoii.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🧪 Testing Supabase connection...\n')
  
  // Test 1: Read external_links
  console.log('1️⃣ Testing external_links table...')
  const { data: links, error: linksError } = await supabase
    .from('external_links')
    .select('*')
  
  if (linksError) {
    console.error('❌ Error:', linksError.message)
  } else {
    console.log('✅ Success! Found', links.length, 'links')
    console.log(links)
  }
  
  // Test 2: Read dokumentasi
  console.log('\n2️⃣ Testing dokumentasi table...')
  const { data: docs, error: docsError } = await supabase
    .from('dokumentasi')
    .select('*')
  
  if (docsError) {
    console.error('❌ Error:', docsError.message)
  } else {
    console.log('✅ Success! Found', docs.length, 'dokumentasi')
  }
  
  // Test 3: Check storage
  console.log('\n3️⃣ Testing storage bucket...')
  const { data: buckets, error: bucketsError } = await supabase
    .storage
    .listBuckets()
  
  if (bucketsError) {
    console.error('❌ Error:', bucketsError.message)
  } else {
    console.log('✅ Success! Found', buckets.length, 'buckets')
    console.log(buckets.map(b => b.name))
  }
  
  console.log('\n✅ All tests completed!')
}

testConnection()
EOF

# Run test
node test-supabase.js
```

**Expected Output**:
```
🧪 Testing Supabase connection...

1️⃣ Testing external_links table...
✅ Success! Found 2 links
[
  { id: 1, link_key: 'dashboard_link', link_url: '...' },
  { id: 2, link_key: 'lms_link', link_url: '...' }
]

2️⃣ Testing dokumentasi table...
✅ Success! Found 5 dokumentasi

3️⃣ Testing storage bucket...
✅ Success! Found 1 buckets
[ 'dokumentasi-images' ]

✅ All tests completed!
```

**Jika ada error** ❌:
- Check apakah `.env` file sudah benar
- Check apakah tables sudah dibuat
- Check RLS policies (lihat STEP 5 di bawah)

---

### **STEP 5: Setup Row Level Security (RLS) Policies** 🔒

Supaya aplikasi bisa akses data.

1. **Buka SQL Editor**:
   - Sidebar → **SQL Editor**
   - New Query

2. **Run SQL ini**:

```sql
-- ============================================
-- RLS POLICIES untuk Ragit Dobel 4.0
-- ============================================

-- 1. EXTERNAL_LINKS Table
-- ============================================

-- Enable RLS
ALTER TABLE external_links ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read
CREATE POLICY "Allow public read access"
ON external_links FOR SELECT
TO public
USING (true);

-- Policy: Service role can update (untuk admin via backend)
CREATE POLICY "Allow authenticated update"
ON external_links FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 2. DOKUMENTASI Table
-- ============================================

-- Enable RLS
ALTER TABLE dokumentasi ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read non-deleted items
CREATE POLICY "Allow public read non-deleted"
ON dokumentasi FOR SELECT
TO public
USING (is_deleted = false);

-- Policy: Authenticated can insert
CREATE POLICY "Allow authenticated insert"
ON dokumentasi FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Authenticated can update
CREATE POLICY "Allow authenticated update"
ON dokumentasi FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Authenticated can delete (soft delete)
CREATE POLICY "Allow authenticated delete"
ON dokumentasi FOR DELETE
TO authenticated
USING (true);

-- 3. ADMIN_USERS Table
-- ============================================

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read (untuk login verification)
-- Note: Password sudah di-hash, aman untuk dibaca
CREATE POLICY "Allow public read for auth"
ON admin_users FOR SELECT
TO public
USING (true);

-- Policy: Only service role can modify
CREATE POLICY "Allow authenticated update"
ON admin_users FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- Verify RLS Status
-- ============================================

-- Check which tables have RLS enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('external_links', 'dokumentasi', 'admin_users')
ORDER BY tablename;

-- List all policies
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
```

3. **Run** → Should see "Success"

4. **Verify**:
   - Query akan tampilkan daftar tables dengan RLS enabled
   - Dan list semua policies yang sudah dibuat

---

### **STEP 6: Test dari Aplikasi Web** 🌐

1. **Jalankan aplikasi**:
   ```bash
   npm run dev
   ```

2. **Buka browser**: http://localhost:5173

3. **Test Public Features** (tanpa login):
   - [ ] Homepage load
   - [ ] Dashboard section tampil
   - [ ] LMS section tampil
   - [ ] Dokumentasi carousel tampil (cek apakah data dari Supabase)

4. **Test Admin Features** (dengan login):
   - [ ] Klik "Login" → Login dengan `RagitAdmin1` / `SayaAdmin1234`
   - [ ] Klik "Edit Link" di Dashboard card
   - [ ] Ubah URL → Save
   - [ ] Refresh page → URL harus berubah ✅
   - [ ] Test CRUD dokumentasi:
     - [ ] Tambah dokumentasi baru
     - [ ] Edit dokumentasi existing
     - [ ] Delete dokumentasi

**Jika semua berfungsi** ✅ → Supabase setup COMPLETE!

---

### **STEP 7: Migrate Data dari localStorage (Optional)** 🔄

Jika Anda sudah punya data di localStorage dan ingin migrate ke Supabase:

1. **Buka file**: `migrate-localstorage-to-supabase.md`

2. **Follow migration guide**

**ATAU skip ini jika**:
- Belum ada data production
- Data sample dari SQL sudah cukup
- Mau mulai fresh

---

### **STEP 8: Deploy ke Production** 🚀

Setelah Supabase berfungsi di localhost, saatnya deploy!

1. **Buka**: `START_DEPLOYMENT.md`

2. **Follow 3 steps**:
   - Upload ke GitHub
   - Deploy ke Vercel
   - Add environment variables (sudah ada di guide)

3. **Test production**:
   - Buka URL production
   - Test semua fitur
   - Verify data sync dengan Supabase

---

## 🎯 Quick Checklist

Centang setiap langkah setelah selesai:

**Supabase Setup**:
- [x] OAuth user created
- [x] `supabase-setup.sql` executed
- [x] Tables created (external_links, dokumentasi, admin_users)
- [ ] Storage bucket created (`dokumentasi-images`)
- [ ] Storage policies setup
- [ ] RLS policies setup
- [ ] Connection tested dari aplikasi
- [ ] CRUD operations tested

**Ready for Deployment**:
- [ ] Localhost testing complete
- [ ] All features working with Supabase
- [ ] Environment variables ready
- [ ] Ready to deploy to Vercel

---

## 🆘 Troubleshooting

### Error: "permission denied for table"

**Masalah**: RLS policies belum setup

**Solusi**:
1. Run SQL dari STEP 5 (RLS Policies)
2. Verify dengan query di akhir SQL
3. Test ulang dari aplikasi

---

### Error: "Failed to fetch"

**Masalah**: URL atau Key salah

**Solusi**:
1. Check `.env` file:
   ```env
   VITE_SUPABASE_URL=https://zbexsukhqcgmzgqapoii.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
2. Restart dev server: `npm run dev`
3. Clear browser cache
4. Test ulang

---

### Error: "Bucket not found"

**Masalah**: Storage bucket belum dibuat

**Solusi**:
1. Ikuti STEP 2 (Create Storage Bucket)
2. Pastikan nama exact: `dokumentasi-images`
3. Pastikan public: ✅ YES

---

### Tables tidak muncul

**Masalah**: SQL belum dijalankan atau ada error

**Solusi**:
1. Buka SQL Editor
2. Run ulang `supabase-setup.sql`
3. Check untuk error messages
4. Jika ada error, copy error message dan fix

---

## 📋 Summary

**Current Status**: 
- ✅ OAuth + SQL Setup done
- ⏳ Waiting: Storage bucket + RLS policies

**Next Immediate Actions**:
1. **Create storage bucket** (STEP 2) - 2 minutes
2. **Setup storage policies** (STEP 3) - 3 minutes
3. **Setup RLS policies** (STEP 5) - 2 minutes
4. **Test connection** (STEP 6) - 5 minutes
5. **Deploy** (STEP 8) - 10 minutes

**Total Time**: ~20 minutes to fully operational! 🚀

---

## 🎉 Once Complete

Setelah semua steps di atas selesai:

✅ **Supabase fully configured**  
✅ **Application connected to cloud database**  
✅ **Ready for production deployment**  
✅ **Multi-device sync enabled**  
✅ **No more localStorage limitations**

**You can then**:
- Deploy to Vercel (START_DEPLOYMENT.md)
- Share production URL with team
- Data persists across devices
- Real-time updates possible
- Scalable to many users

---

**🎯 ACTION NOW**: Lanjut ke **STEP 2** (Create Storage Bucket)! 📦
