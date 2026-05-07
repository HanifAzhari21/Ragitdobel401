# ⚡ Quick Start - Supabase Setup

## 🎯 Setup dalam 10 Menit

### Step 1: Buat Project Supabase (2 menit)
1. Buka https://supabase.com
2. Sign up/Login
3. Klik "New Project"
4. Isi:
   - Name: `ragit-dobel-4-sumsel`
   - Database Password: (buat password kuat)
   - Region: **Southeast Asia (Singapore)**
5. Klik "Create new project"
6. ⏳ Tunggu 2-3 menit

### Step 2: Jalankan SQL Setup (1 menit)
1. Klik **"SQL Editor"** di menu kiri
2. Klik **"New Query"**
3. Copy SEMUA isi file `supabase-setup.sql`
4. Paste di editor
5. Klik **"Run"** (Ctrl+Enter)
6. ✅ Lihat pesan sukses

### Step 3: Buat Storage Bucket (1 menit)
1. Klik **"Storage"** di menu kiri
2. Klik **"Create a new bucket"**
3. Name: `dokumentasi-images`
4. ✅ Centang **"Public bucket"**
5. Klik "Create bucket"

### Step 4: Copy Credentials (1 menit)
1. Klik **"Settings"** (icon gear di bawah)
2. Klik **"API"**
3. Copy **Project URL**
4. Copy **anon public** key

### Step 5: Setup Environment Variables (1 menit)
1. Copy file `.env.example` jadi `.env`
   ```bash
   cp .env.example .env
   ```
2. Buka `.env`
3. Paste credentials dari Step 4
4. Save

### Step 6: Install Dependencies (2 menit)
```bash
npm install @supabase/supabase-js
```

### Step 7: Restart Server (1 menit)
```bash
npm run dev
```

---

## ✅ Verification

Buka browser, cek:
- [ ] Homepage load tanpa error
- [ ] Dokumentasi kegiatan terlihat (3 sample data)
- [ ] Klik dokumentasi, modal buka
- [ ] Login admin: `RagitAdmin1` / `SayaAdmin1234`
- [ ] Tombol admin muncul setelah login

---

## 🎉 Done!

**Total waktu: ~10 menit**

Next: Baca `SUPABASE_DEPLOYMENT_GUIDE.md` untuk detail lengkap.

---

## 🆘 Ada Error?

### Error: "Failed to fetch"
→ Cek `.env` apakah URL & key sudah benar

### Error: "Bucket not found"
→ Pastikan bucket `dokumentasi-images` sudah dibuat di Storage

### Error: Login gagal
→ Pastikan SQL script sudah dijalankan (cek Table Editor → admin_users)

### Masih error?
→ Baca troubleshooting di `SUPABASE_DEPLOYMENT_GUIDE.md` section 7
