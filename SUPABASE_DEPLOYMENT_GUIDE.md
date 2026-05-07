# 🚀 Panduan Deploy Ragit Dobel 4.0 ke Supabase

## 📋 Daftar Isi
1. [Setup Akun Supabase](#1-setup-akun-supabase)
2. [Jalankan SQL Setup](#2-jalankan-sql-setup)
3. [Setup Storage Bucket](#3-setup-storage-bucket)
4. [Copy Credentials](#4-copy-credentials)
5. [Update Aplikasi](#5-update-aplikasi)
6. [Testing](#6-testing)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Setup Akun Supabase

### 1.1 Buat Akun
1. Kunjungi [supabase.com](https://supabase.com)
2. Klik **"Start your project"** atau **"Sign Up"**
3. Login dengan GitHub/Google/Email

### 1.2 Buat Project Baru
1. Klik **"New Project"**
2. Pilih **Organization** (atau buat baru)
3. Isi detail project:
   - **Name**: `ragit-dobel-4-sumsel` (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan di tempat aman!)
   - **Region**: Pilih **Southeast Asia (Singapore)** (terdekat dengan Indonesia)
   - **Pricing Plan**: Pilih **Free** (cukup untuk landing page)
4. Klik **"Create new project"**
5. Tunggu 2-3 menit sampai project siap ✅

---

## 2. Jalankan SQL Setup

### 2.1 Buka SQL Editor
1. Di Supabase Dashboard, klik **"SQL Editor"** di menu kiri
2. Klik **"New Query"**

### 2.2 Copy & Paste SQL
1. Buka file `supabase-setup.sql` yang sudah dibuat
2. **Copy SEMUA isi file** (Ctrl+A, Ctrl+C)
3. **Paste** di SQL Editor (Ctrl+V)
4. Klik **"Run"** atau tekan **Ctrl+Enter**

### 2.3 Verifikasi
Jika berhasil, Anda akan melihat:
```
✅ Tables created successfully!
✅ admin_users
✅ dashboard_links
✅ dokumentasi_kegiatan
✅ dokumentasi_links
✅ lms_links
```

### 2.4 Cek Data
Klik **"Table Editor"** di menu kiri, Anda akan melihat tabel:
- `admin_users` - Ada 1 admin default
- `dashboard_links` - Ada 1 link default
- `lms_links` - Ada 1 link default
- `dokumentasi_kegiatan` - Ada 3 dokumentasi sample
- `dokumentasi_links` - Ada link untuk dokumentasi pertama

---

## 3. Setup Storage Bucket

### 3.1 Buat Bucket untuk Images
1. Klik **"Storage"** di menu kiri
2. Klik **"Create a new bucket"**
3. Isi detail:
   - **Name**: `dokumentasi-images`
   - **Public bucket**: ✅ **CENTANG** (penting!)
   - **File size limit**: 5 MB (atau sesuai kebutuhan)
4. Klik **"Create bucket"**

### 3.2 Verifikasi Storage Policies
1. Klik bucket `dokumentasi-images`
2. Klik tab **"Policies"**
3. Pastikan ada policies:
   - ✅ Public can view images
   - ✅ Authenticated can upload images
   - ✅ Authenticated can delete images

*Note: Policies sudah otomatis dibuat oleh SQL script*

---

## 4. Copy Credentials

### 4.1 Ambil Project URL & API Keys
1. Klik **"Settings"** (icon gear) di menu kiri bawah
2. Klik **"API"**
3. Copy 2 nilai ini:

**A. Project URL**
```
https://xxxxxxxxxxxxx.supabase.co
```

**B. Anon Public Key** (anon key)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

⚠️ **JANGAN COPY Service Role Key** - ini secret key yang berbahaya jika bocor!

### 4.2 Simpan ke File .env
Buat/update file `.env` di root project:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

Ganti dengan nilai yang Anda copy tadi.

---

## 5. Update Aplikasi

### 5.1 Install Supabase Client
Jalankan di terminal:
```bash
npm install @supabase/supabase-js
```

### 5.2 File-file yang Perlu Dibuat/Update

Berikut file yang perlu saya buatkan untuk integrasi Supabase:

#### ✅ File Baru:
- `/src/lib/supabase.ts` - Config & client Supabase
- `/src/hooks/useSupabase.ts` - Custom hooks untuk data fetching

#### ✅ File yang Perlu Update:
- `/src/app/contexts/AuthContext.tsx` - Auth dengan Supabase
- `/src/app/components/HeroSection.tsx` - Fetch dashboard/LMS links
- `/src/app/components/DokumentasiSection.tsx` - CRUD dokumentasi
- `/src/app/components/AdminPanel.tsx` - Admin CRUD operations

**Apakah Anda ingin saya buatkan semua file ini sekarang?** 
Beri tahu saya, dan saya akan generate kodenya.

---

## 6. Testing

### 6.1 Testing Checklist

#### A. Public Access (Tanpa Login)
- [ ] Buka homepage
- [ ] Dashboard data terlihat (chart dummy)
- [ ] LMS section terlihat
- [ ] Dokumentasi Kegiatan terlihat (3 sample data)
- [ ] Klik dokumentasi, modal terbuka dengan links

#### B. Admin Login
- [ ] Klik tombol Login
- [ ] Username: `RagitAdmin1`
- [ ] Password: `SayaAdmin1234`
- [ ] Login berhasil ✅

#### C. Admin - Edit Dashboard Link
- [ ] Tombol "Edit Link Dashboard" muncul
- [ ] Klik, modal terbuka
- [ ] Ganti URL
- [ ] Simpan, berhasil ✅

#### D. Admin - Edit LMS Link
- [ ] Tombol "Edit Link LMS" muncul
- [ ] Klik, modal terbuka
- [ ] Ganti URL
- [ ] Simpan, berhasil ✅

#### E. Admin - Tambah Dokumentasi
- [ ] Klik "Tambah Dokumentasi"
- [ ] Upload gambar (atau pilih stock image)
- [ ] Isi form (judul, deskripsi, tanggal, PIC, unit)
- [ ] Tambah link dokumentasi (Google Drive, dll)
- [ ] Simpan, muncul di list ✅

#### F. Admin - Edit Dokumentasi
- [ ] Klik dokumentasi
- [ ] Klik "Edit Dokumentasi"
- [ ] Update data
- [ ] Tambah/hapus links
- [ ] Simpan perubahan ✅

#### G. Admin - Hapus Dokumentasi
- [ ] Klik dokumentasi
- [ ] Klik "Hapus"
- [ ] Konfirmasi
- [ ] Data terhapus ✅

---

## 7. Troubleshooting

### ❌ Error: "Failed to fetch"
**Penyebab**: CORS atau URL salah
**Solusi**:
1. Cek `.env` apakah URL benar
2. Cek apakah API keys benar
3. Restart development server (`npm run dev`)

### ❌ Error: "Row Level Security policy violation"
**Penyebab**: RLS policies belum setup
**Solusi**:
1. Jalankan ulang `supabase-setup.sql`
2. Pastikan semua policies ada di Dashboard → Authentication → Policies

### ❌ Error: "Bucket not found"
**Penyebab**: Bucket storage belum dibuat
**Solusi**:
1. Buat bucket manual: Storage → Create bucket
2. Nama: `dokumentasi-images`
3. Public: ✅ CENTANG

### ❌ Error: "Invalid login credentials"
**Penyebab**: Password hash tidak cocok atau auth belum setup
**Solusi**:
1. Cek tabel `admin_users` ada data
2. Pastikan password hash benar
3. Jika masih error, reset password manual di Table Editor

### ❌ Images tidak muncul
**Penyebab**: Bucket tidak public atau URL salah
**Solusi**:
1. Pastikan bucket public (Storage → bucket → Settings)
2. Cek policies: "Public can view images" ada
3. Refresh page

### ❌ Data tidak tersimpan
**Penyebab**: RLS policies terlalu ketat
**Solusi**:
1. Cek apakah user authenticated (login dulu)
2. Cek Network tab di DevTools untuk error detail
3. Verifikasi policies di Supabase Dashboard

---

## 8. Production Deployment

### 8.1 Deploy ke Vercel/Netlify
1. Push kode ke GitHub
2. Connect repository ke Vercel/Netlify
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy ✅

### 8.2 Custom Domain
1. Beli domain (misalnya: ragit-sumsel.com)
2. Setup DNS records
3. Point ke Vercel/Netlify
4. Enable SSL/HTTPS

### 8.3 Redirect dari Joomla
Di website Joomla existing:
```html
<a href="https://ragit-sumsel.com">
  Lihat Dashboard Ragit Dobel 4.0
</a>
```

---

## 9. Maintenance

### 9.1 Backup Database
1. Dashboard → Database → Backups
2. Enable automatic backups (free plan: 7 days retention)
3. Manual backup: Download dump via SQL Editor

### 9.2 Monitor Usage
1. Dashboard → Settings → Usage
2. Cek storage, bandwidth, dan database size
3. Free tier limits:
   - Database: 500 MB
   - Storage: 1 GB
   - Bandwidth: 2 GB/month

### 9.3 Update Data
- Admin bisa update via UI (tidak perlu SQL)
- Untuk bulk update, gunakan SQL Editor
- Backup sebelum update besar

---

## 📞 Support

### Supabase Resources:
- 📚 Docs: https://supabase.com/docs
- 💬 Discord: https://discord.supabase.com
- 🐦 Twitter: @supabase

### Ragit Dobel 4.0:
- 👨‍💻 Developer: [Your Contact]
- 🏢 Kanwil DJPb Sumsel
- 📧 Email: [Your Email]

---

## ✅ Checklist Deploy

Tandai setelah selesai:

- [ ] Akun Supabase dibuat
- [ ] Project Supabase dibuat
- [ ] SQL script dijalankan (semua tabel ada)
- [ ] Storage bucket dibuat (`dokumentasi-images`)
- [ ] Credentials di-copy ke `.env`
- [ ] `@supabase/supabase-js` terinstall
- [ ] File integrasi dibuat (lib, hooks, contexts)
- [ ] Testing public access ✅
- [ ] Testing admin login ✅
- [ ] Testing CRUD dokumentasi ✅
- [ ] Deploy ke production
- [ ] Custom domain setup (optional)

---

**🎉 Selamat! Aplikasi Ragit Dobel 4.0 sudah siap production!**
