# 🔧 PERBAIKAN DATABASE - STEP BY STEP

## 📋 Masalah yang Ditemukan

1. ❌ **RLS (Row Level Security) belum diaktifkan**
   - File RLS lama masih pakai tabel yang salah
   - Sudah diperbaiki di `supabase-rls-policies.sql`

2. ❌ **Dashboard/LMS Link tidak sync antar device**
   - Masih pakai localStorage, bukan Supabase
   - Sudah diperbaiki di `DashboardSection.tsx` dan `LMSSection.tsx`

3. ⚠️ **Security Issues dari Supabase Advisor**
   - Views dengan SECURITY DEFINER
   - Function Search Path Mutable
   - RLS Policy Always True
   - kv_store tanpa policies
   - Sudah diperbaiki di `supabase-security-fixes.sql`

---

## ✅ SOLUSI - Jalankan 3 Langkah Ini

### 🚀 **STEP 1: Setup Database Tables** (Jika Belum)

1. Buka Supabase Dashboard:
   ```
   https://app.supabase.com/project/zbexsukhqcgmzgqapoii/sql
   ```

2. Klik **SQL Editor** di sidebar

3. Klik **New Query**

4. Copy **SEMUA ISI** file `supabase-setup.sql`

5. Paste ke SQL Editor

6. Klik **Run** (atau Ctrl+Enter)

7. Tunggu sampai muncul:
   ```
   Success. No rows returned
   ```

✅ Ini akan membuat 5 tabel:
- `admin_users`
- `dashboard_links`
- `lms_links`
- `dokumentasi_kegiatan`
- `dokumentasi_links`

---

### 🔒 **STEP 2: Aktifkan RLS Policies**

1. Masih di **SQL Editor**

2. Klik **New Query** lagi

3. Copy **SEMUA ISI** file `supabase-rls-policies.sql` (yang sudah diperbaiki)

4. Paste ke SQL Editor

5. Klik **Run**

6. Cek hasilnya di bagian **Results** di bawah:

   **✅ Section "RLS STATUS"** - Semua tabel harus `RLS Enabled = true`
   
   **✅ Section "POLICIES YANG DIBUAT"** - Harus ada 15+ policies
   
   **✅ Section "TEST"** - Semua test harus berhasil

---

### 🛡️ **STEP 3: Perbaiki Security Issues**

1. Masih di **SQL Editor**

2. Klik **New Query** lagi

3. Copy **SEMUA ISI** file `supabase-security-fixes.sql`

4. Paste ke SQL Editor

5. Klik **Run**

6. Cek hasilnya:

   **✅ VIEWS** - Semua harus "✅ SECURITY INVOKER"
   
   **✅ FUNCTION** - Search Path harus ada
   
   **✅ ADMIN_USERS POLICIES** - Tidak lagi "Always True"
   
   **✅ KV_STORE POLICIES** - Harus ada 4 policies

---

## 🧪 STEP 4: Verifikasi Database

### Opsi A: Jalankan Script Node.js

```bash
node check-database-structure.js
```

Hasilnya harus:
```
✅ Tabel yang sudah ada: 5 dari 5
   - admin_users (1 baris)
   - dashboard_links (1 baris)
   - lms_links (1 baris)
   - dokumentasi_kegiatan (3 baris)
   - dokumentasi_links (1 baris)

✅ Storage bucket "dokumentasi-images" sudah ada

🎉 DATABASE SUDAH LENGKAP & SIAP DIGUNAKAN!
```

### Opsi B: Buka HTML Checker

Buka file `check-database-structure.html` di browser

Atau akses:
```
http://localhost:5173/check-database-structure.html
```

---

## 🎯 STEP 5: Test Fitur Sync

1. **Login sebagai Admin**
   - Username: `RagitAdmin1`
   - Password: `SayaAdmin1234`

2. **Edit Dashboard Link**
   - Klik tombol kuning "Edit Link" di Dashboard Ekonomi
   - Masukkan URL baru (misal: `https://google.com`)
   - Klik **Simpan**
   - Harus muncul alert: "✅ Link berhasil disimpan dan akan sync ke semua device!"

3. **Test Sync Cross-Device**
   - Buka website di browser lain / tab incognito
   - Link Dashboard harus sudah berubah (tidak perlu login)
   - Ini membuktikan data tersimpan di Supabase, bukan localStorage

4. **Test LMS Link**
   - Sama seperti Dashboard Link
   - Edit, simpan, dan cek di device lain

---

## 📊 Struktur RLS Policies yang Benar

### **Public Users (Tanpa Login)**
✅ Bisa READ:
- `dashboard_links` (yang `is_active = true`)
- `lms_links` (yang `is_active = true`)
- `dokumentasi_kegiatan` (yang `is_published = true`)
- `dokumentasi_links` (untuk dokumentasi published)
- `admin_users` (hanya untuk login verification)

❌ Tidak bisa WRITE/UPDATE/DELETE

### **Authenticated Users (Setelah Login)**
✅ Bisa READ semua
✅ Bisa INSERT, UPDATE, DELETE semua

---

## 🐛 Troubleshooting

### Error: "Could not find table 'dashboard_links'"
**Solusi:** Jalankan `supabase-setup.sql` (STEP 1)

### Error: "new row violates row-level security policy"
**Solusi:** Jalankan `supabase-rls-policies.sql` (STEP 2)

### Link tidak sync antar device
**Solusi:** 
1. Cek apakah RLS sudah aktif (STEP 2)
2. Cek browser console untuk error
3. Pastikan tidak ada error saat save (F12 → Console)

### Error: "PGRST301: JWT expired"
**Solusi:** Refresh halaman (Supabase anon key valid sampai 2087)

---

## ✅ Checklist Final

Sebelum deploy, pastikan semua ini **PASS**:

- [ ] 5 tabel sudah dibuat (`admin_users`, `dashboard_links`, `lms_links`, `dokumentasi_kegiatan`, `dokumentasi_links`)
- [ ] RLS sudah enabled untuk semua tabel
- [ ] Total policies: 15+ policies
- [ ] Admin bisa login dengan `RagitAdmin1` / `SayaAdmin1234`
- [ ] Admin bisa edit Dashboard link
- [ ] Admin bisa edit LMS link
- [ ] Link berhasil disimpan ke Supabase (muncul alert success)
- [ ] Link sync ke device lain (test di incognito)
- [ ] Public users bisa lihat link tanpa login
- [ ] Script `check-database-structure.js` menampilkan: "DATABASE SUDAH LENGKAP"

---

## 📞 Jika Masih Ada Error

Screenshot error yang muncul di:
1. Supabase SQL Editor
2. Browser Console (F12)
3. Network tab (F12 → Network)

Lalu kirim ke developer untuk debugging lebih lanjut.

---

## 🎉 Setelah Selesai

Database Anda sudah:
- ✅ Fully configured dengan RLS
- ✅ Public-first (semua orang bisa lihat tanpa login)
- ✅ Admin-protected (hanya admin bisa edit)
- ✅ Cross-device sync enabled
- ✅ Ready untuk production deployment!

**Next:** Deploy ke Netlify atau hosting lainnya! 🚀