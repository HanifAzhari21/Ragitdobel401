# ✅ Deployment Checklist - Ragit Dobel 4.0

Print atau bookmark halaman ini untuk tracking progress deployment.

---

## 📅 Tanggal Deployment: ___________________

## 👤 PIC Deployment: ___________________

---

## Phase 1: Supabase Setup

### 1.1 Akun & Project
- [ ] Buat akun di https://supabase.com
- [ ] Login berhasil
- [ ] Buat project baru: `ragit-dobel-4-sumsel`
- [ ] Pilih region: Southeast Asia (Singapore)
- [ ] Database password disimpan dengan aman
- [ ] Project berhasil dibuat (tunggu 2-3 menit)

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 1.2 Database Setup
- [ ] Buka SQL Editor di Supabase Dashboard
- [ ] Copy isi file `supabase-setup.sql`
- [ ] Paste di SQL Editor
- [ ] Run query (Ctrl+Enter)
- [ ] Pesan "Tables created successfully!" muncul
- [ ] Verifikasi di Table Editor (5 tabel ada)

**Tabel yang harus ada:**
- [ ] `admin_users` (1 row - RagitAdmin1)
- [ ] `dashboard_links` (1 row)
- [ ] `lms_links` (1 row)
- [ ] `dokumentasi_kegiatan` (3 rows)
- [ ] `dokumentasi_links` (1+ rows)

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 1.3 Storage Setup
- [ ] Klik Storage di menu kiri
- [ ] Klik "Create a new bucket"
- [ ] Name: `dokumentasi-images`
- [ ] ✅ Centang "Public bucket"
- [ ] Bucket berhasil dibuat
- [ ] Verifikasi policies (3 policies ada)

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 1.4 Credentials
- [ ] Klik Settings → API
- [ ] Copy Project URL
- [ ] Copy Anon Public Key
- [ ] Credentials disimpan dengan aman

**Project URL**: `https://__________________.supabase.co`

**Anon Key**: `eyJhbG...` (copied ✅)

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## Phase 2: Application Setup

### 2.1 Environment Variables
- [ ] Copy `.env.example` → `.env`
- [ ] Paste Project URL ke `VITE_SUPABASE_URL`
- [ ] Paste Anon Key ke `VITE_SUPABASE_ANON_KEY`
- [ ] Save file `.env`
- [ ] Verifikasi `.env` tidak di-commit (cek .gitignore)

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 2.2 Dependencies
- [ ] Run: `npm install @supabase/supabase-js`
- [ ] Install berhasil
- [ ] Verifikasi di `package.json`

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 2.3 Development Server
- [ ] Run: `npm run dev`
- [ ] Server start tanpa error
- [ ] Buka di browser
- [ ] Homepage load berhasil

**Dev URL**: `http://localhost:____`

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## Phase 3: Testing

### 3.1 Public Access (Tanpa Login)
- [ ] Homepage load dengan benar
- [ ] Hero section terlihat
- [ ] Dashboard section terlihat
- [ ] LMS section terlihat
- [ ] Dokumentasi section terlihat (carousel)
- [ ] Klik dokumentasi → Modal buka
- [ ] Detail dokumentasi terlihat lengkap
- [ ] Link dokumentasi terlihat & bisa diklik
- [ ] Cover images load dengan benar
- [ ] Responsive di mobile ✅
- [ ] Dark mode berfungsi ✅

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.2 Admin Authentication
- [ ] Klik tombol "Login" di header
- [ ] Modal login muncul
- [ ] Input username: `RagitAdmin1`
- [ ] Input password: `SayaAdmin1234`
- [ ] Klik "Masuk"
- [ ] Login berhasil ✅
- [ ] Tombol admin muncul
- [ ] Welcome message muncul

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.3 Admin - Edit Dashboard Link
- [ ] Tombol "Edit Link Dashboard" terlihat
- [ ] Klik tombol → Modal buka
- [ ] Edit URL
- [ ] Klik "Simpan"
- [ ] Berhasil tersimpan
- [ ] Refresh page → URL baru terlihat
- [ ] Klik tombol "Lihat Dashboard Lengkap" → Redirect benar

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.4 Admin - Edit LMS Link
- [ ] Tombol "Edit Link LMS" terlihat
- [ ] Klik tombol → Modal buka
- [ ] Edit URL
- [ ] Klik "Simpan"
- [ ] Berhasil tersimpan
- [ ] Refresh page → URL baru terlihat
- [ ] Klik tombol "Masuk ke LMS" → Redirect benar

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.5 Admin - Tambah Dokumentasi
- [ ] Klik tombol "Tambah Dokumentasi"
- [ ] Modal form terbuka
- [ ] Pilih/upload cover image
- [ ] Isi judul
- [ ] Isi deskripsi
- [ ] Isi tanggal
- [ ] Isi PIC (optional)
- [ ] Isi unit (optional)
- [ ] Tambah link dokumentasi (label + URL)
- [ ] Link berhasil ditambahkan ke list
- [ ] Klik "Simpan"
- [ ] Dokumentasi baru muncul di carousel
- [ ] Klik dokumentasi → Data benar
- [ ] Link dokumentasi terlihat & bisa diklik

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.6 Admin - Edit Dokumentasi
- [ ] Klik salah satu dokumentasi
- [ ] Modal detail terbuka
- [ ] Klik tombol "Edit Dokumentasi"
- [ ] Modal edit terbuka dengan data existing
- [ ] Edit cover image
- [ ] Edit judul
- [ ] Edit deskripsi
- [ ] Tambah link baru
- [ ] Hapus link existing
- [ ] Klik "Simpan Perubahan"
- [ ] Perubahan tersimpan
- [ ] Refresh → Data terupdate

**Status**: ⬜ Not Started | ⏳ In Progress | ��� Done

**Notes**: _________________________________

---

### 3.7 Admin - Hapus Dokumentasi
- [ ] Klik salah satu dokumentasi
- [ ] Modal detail terbuka
- [ ] Klik tombol "Hapus"
- [ ] Konfirmasi hapus muncul
- [ ] Klik "Ya, Hapus"
- [ ] Dokumentasi terhapus dari list
- [ ] Refresh → Dokumentasi tidak ada

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.8 Admin - Upload Image
- [ ] Tambah/edit dokumentasi
- [ ] Pilih "Upload Custom Image"
- [ ] Upload gambar dari komputer
- [ ] Upload berhasil
- [ ] Preview gambar muncul
- [ ] Simpan dokumentasi
- [ ] Gambar terlihat di carousel
- [ ] Verifikasi di Supabase Storage → Gambar ada

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

**Notes**: _________________________________

---

### 3.9 Logout & Re-login
- [ ] Klik tombol "Logout"
- [ ] Berhasil logout
- [ ] Tombol admin hilang
- [ ] Login lagi dengan credentials yang sama
- [ ] Login berhasil
- [ ] Tombol admin muncul kembali

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## Phase 4: Production Deployment

### 4.1 Code Repository
- [ ] Commit semua changes ke Git
- [ ] Push ke GitHub/GitLab
- [ ] Verifikasi `.env` TIDAK di-commit
- [ ] Verifikasi `.gitignore` ada

**Repository URL**: _________________________________

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

### 4.2 Deploy Platform (Vercel/Netlify)
- [ ] Pilih platform: ⬜ Vercel | ⬜ Netlify | ⬜ Lainnya
- [ ] Connect repository
- [ ] Set environment variables:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Deploy berhasil
- [ ] Site URL aktif

**Production URL**: _________________________________

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

### 4.3 Production Testing
- [ ] Buka production URL
- [ ] Homepage load dengan benar
- [ ] Test public access (sama seperti local)
- [ ] Test admin login
- [ ] Test CRUD dokumentasi
- [ ] Test responsive mobile
- [ ] Test dark mode
- [ ] Test semua links eksternal

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

### 4.4 Custom Domain (Optional)
- [ ] Beli domain: _________________________________
- [ ] Setup DNS records
- [ ] Point ke Vercel/Netlify
- [ ] Verifikasi domain aktif
- [ ] Enable HTTPS/SSL
- [ ] Test dengan custom domain

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done | ⬜ Skip

---

### 4.5 Integrasi dengan Joomla
- [ ] Login ke website Joomla existing
- [ ] Tambah link/redirect ke Ragit Dobel 4.0
- [ ] Test redirect dari Joomla
- [ ] Verifikasi tracking/analytics (jika ada)

**Joomla URL**: https://djpb.kemenkeu.go.id/kanwil/sumsel/id/

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

## Phase 5: Handover & Documentation

### 5.1 User Documentation
- [ ] Buat user manual untuk admin
- [ ] Screenshot step-by-step
- [ ] Video tutorial (optional)
- [ ] Share dengan tim admin

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done | ⬜ Skip

---

### 5.2 Credentials Handover
- [ ] Share Supabase credentials dengan PIC
- [ ] Share admin username/password
- [ ] Share deployment platform access
- [ ] Share repository access

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done

---

### 5.3 Monitoring Setup
- [ ] Setup Supabase usage alerts
- [ ] Setup uptime monitoring (optional)
- [ ] Setup error tracking (Sentry, optional)
- [ ] Dokumentasi maintenance rutin

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Done | ⬜ Skip

---

## 📊 Overall Progress

**Phase 1 - Supabase Setup**: ___% Complete

**Phase 2 - Application Setup**: ___% Complete

**Phase 3 - Testing**: ___% Complete

**Phase 4 - Production Deployment**: ___% Complete

**Phase 5 - Handover**: ___% Complete

---

## 🎯 **TOTAL PROGRESS: ____%**

---

## 📝 Issues & Blockers

| # | Issue | Status | Resolution | Date |
|---|-------|--------|------------|------|
| 1 | | ⬜ Open / ✅ Resolved | | |
| 2 | | ⬜ Open / ✅ Resolved | | |
| 3 | | ⬜ Open / ✅ Resolved | | |

---

## ✅ Sign-off

**Deployment Completed By**: _________________________________

**Date**: _________________________________

**Signature**: _________________________________

---

**Verified By**: _________________________________

**Date**: _________________________________

**Signature**: _________________________________

---

## 🎉 Deployment Status

⬜ **Not Started**

⬜ **In Progress**

⬜ **Testing**

⬜ **Completed - Development**

⬜ **Completed - Production**

⬜ **Live & Operational** ✅

---

**🚀 Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan**
