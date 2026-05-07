# ✅ CHECKLIST DEPLOYMENT - Ragit Dobel 4.0

**Status**: 🚀 SIAP DEPLOY SEKARANG  
**Platform Target**: Vercel (Recommended)  
**Estimasi**: 10 menit

---

## 📦 PRE-DEPLOYMENT (Sudah Selesai ✅)

- [x] Semua komponen sudah dibuat
- [x] Dark mode berfungsi
- [x] Responsive design complete
- [x] Admin features ready
- [x] Carousel + modal working
- [x] Supabase credentials configured
- [x] `@supabase/supabase-js` installed
- [x] `.gitignore` created
- [x] `vercel.json` created
- [x] `netlify.toml` created
- [x] Documentation lengkap

---

## 🚀 DEPLOYMENT STEPS

### ⭐ REKOMENDASI: Deploy via Vercel Web Interface

#### 1️⃣ Persiapan (2 menit)

**A. Upload ke GitHub (Jika belum):**

```bash
# Di terminal, jalankan command ini:
git init
git add .
git commit -m "Initial commit - Ragit Dobel 4.0"

# Buat repository baru di GitHub.com:
# - Buka https://github.com/new
# - Nama: ragit-dobel-4-sumsel
# - Public/Private: Terserah Anda
# - Jangan centang "Initialize with README"
# - Create repository

# Kemudian link ke GitHub:
git remote add origin https://github.com/USERNAME/ragit-dobel-4-sumsel.git
git branch -M main
git push -u origin main
```

**PENTING**: Pastikan `.env` TIDAK ter-upload! Check dengan:
```bash
git status
# Pastikan .env berwarna merah (ignored) bukan hijau
```

**B. Siapkan Credentials Supabase:**
- URL: `https://zbexsukhqcgmzgqapoii.supabase.co`
- Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg`

Copy ke notepad, akan dipakai di Step 3.

---

#### 2️⃣ Import ke Vercel (3 menit)

1. **Buka**: https://vercel.com/signup
2. **Sign up** dengan GitHub
3. **Authorize** Vercel untuk akses GitHub
4. Klik **"Add New..."** → **"Project"**
5. Pilih repository: **ragit-dobel-4-sumsel**
6. Klik **"Import"**

---

#### 3️⃣ Configure Project (3 menit)

**Framework Preset**: Vite (auto-detect)

**Build Settings** (biasanya auto-fill):
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables** (PENTING!):

Klik **"Environment Variables"**, tambahkan 2 variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://zbexsukhqcgmzgqapoii.supabase.co
Environment: Production, Preview, Development (pilih semua)
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg
Environment: Production, Preview, Development (pilih semua)
```

---

#### 4️⃣ Deploy! (2 menit)

1. Klik **"Deploy"**
2. ⏳ Tunggu build process (1-2 menit)
3. ✅ **Deployment Complete!**
4. Klik **"Visit"** untuk lihat website live

**URL Anda**: `https://ragit-dobel-4-sumsel.vercel.app`

---

#### 5️⃣ Verification (2 menit)

Test website production:

**Basic Functionality:**
- [ ] Homepage load dengan cepat
- [ ] Tidak ada error di console (F12)
- [ ] Semua images muncul
- [ ] Dark mode toggle berfungsi
- [ ] Responsive di mobile (test dengan DevTools)

**Carousel & Modal:**
- [ ] Carousel dokumentasi berfungsi
- [ ] Klik dokumentasi → modal popup
- [ ] Modal bisa ditutup

**Admin Features:**
- [ ] Klik "Login" di header
- [ ] Login dengan:
  - Username: `RagitAdmin1`
  - Password: `SayaAdmin1234`
- [ ] Tombol admin muncul setelah login
- [ ] Logout berfungsi

---

## 🎯 ALTERNATIVE: Deploy via Vercel CLI

Jika Anda lebih suka pakai command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login
# Pilih GitHub dan authorize

# Deploy
vercel

# Jawab prompts:
# ? Set up and deploy? Y
# ? Which scope? (pilih username Anda)
# ? Link to existing project? N
# ? Project name? ragit-dobel-4-sumsel
# ? In which directory? ./ (tekan Enter)
# ? Override settings? N

# Tambah environment variables
vercel env add VITE_SUPABASE_URL production
# Paste: https://zbexsukhqcgmzgqapoii.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Deploy to production
vercel --prod
```

---

## 🌐 ALTERNATIVE: Deploy ke Netlify

Jika Anda prefer Netlify:

1. **Buka**: https://app.netlify.com/signup
2. Sign up dengan GitHub
3. **"Add new site"** → **"Import an existing project"**
4. Pilih GitHub → Authorize → Pilih repository
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Environment variables** (Advanced settings):
   - `VITE_SUPABASE_URL` = `https://zbexsukhqcgmzgqapoii.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
7. **Deploy site**

URL: `https://ragit-dobel-4-sumsel.netlify.app`

---

## 📊 POST-DEPLOYMENT

### ✅ Testing Checklist

Setelah deploy berhasil, test semua fitur:

**Public Access (No Login):**
- [ ] Hero section tampil dengan watermark DJPb
- [ ] Dashboard section dengan 4 cards
- [ ] LMS section
- [ ] Dokumentasi carousel (slide kiri-kanan)
- [ ] Footer dengan links
- [ ] Dark mode persistence (toggle → refresh → masih dark)
- [ ] Responsive:
  - [ ] Desktop (1920px)
  - [ ] Tablet (768px)
  - [ ] Mobile (375px)

**Admin Access (Login Required):**
- [ ] Login modal muncul
- [ ] Show/hide password berfungsi
- [ ] Wrong credentials → error message
- [ ] Correct credentials → login berhasil
- [ ] Admin badge muncul di header
- [ ] Tombol "Edit Link" muncul (Dashboard & LMS)
- [ ] Tombol "Tambah Dokumentasi" muncul
- [ ] Tombol edit/delete pada setiap dokumentasi
- [ ] Logout berfungsi

**Performance:**
```
Buka Chrome DevTools (F12) → Lighthouse

Target Score:
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 80
- SEO: > 80
```

---

## 🔄 Auto-Deploy Setup

Setelah deploy pertama kali via GitHub:

**Setiap update:**
```bash
# 1. Edit code
# 2. Test locally: npm run dev

# 3. Commit & push
git add .
git commit -m "feat: add new feature"
git push origin main

# 4. Vercel/Netlify auto-deploy! 🚀
# 5. Check email for deploy notification
# 6. Click URL to verify
```

**Zero downtime, automatic deployment!**

---

## 🎨 Custom Domain (Optional)

### Setup Custom Domain di Vercel

1. Beli domain (contoh: `ragit-sumsel.id`)
2. Vercel Dashboard → Project → Settings → **Domains**
3. Add domain: `ragit-sumsel.id`
4. Vercel kasih DNS instructions
5. Update DNS di domain provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
6. ⏳ Tunggu DNS propagation (1-48 jam)
7. ✅ SSL auto-generated oleh Vercel

**Result**: `https://ragit-sumsel.id` 🎉

---

## 🔐 Security Post-Deploy

### 1. Ganti Admin Password (PENTING!)

**Setelah testing selesai**, ganti password admin:

1. Login ke Supabase: https://app.supabase.com/project/zbexsukhqcgmzgqapoii
2. SQL Editor → New Query
3. Paste SQL dari file `supabase-update-admin-password.sql`
4. Generate bcrypt hash baru untuk password baru
5. Update query dengan hash baru
6. Run query
7. Test login dengan password baru

### 2. Verify .env Tidak Ter-expose

1. Buka website production
2. F12 → Sources tab
3. Check file-file JavaScript
4. **Pastikan TIDAK ADA string**: 
   - Raw Supabase URL & Key (ini OK, karena memang public anon key)
   - Password admin dalam plaintext (harus sudah di-hash)

### 3. Setup Monitoring

**Vercel Analytics** (Recommended):
1. Vercel Dashboard → Project → Analytics
2. Enable Analytics
3. ✅ Free tier sudah cukup

**Google Analytics** (Optional):
1. Buat property di Google Analytics
2. Dapat Tracking ID: `G-XXXXXXXXXX`
3. Tambahkan di `index.html` atau environment variable

---

## 📞 DEPLOYMENT INFO

Isi info ini setelah deploy selesai:

**Production URL**: ______________________________________

**Deployment Platform**: Vercel / Netlify (pilih salah satu)

**Deployment Date**: 5 Maret 2026

**Deployment Time**: ___:___

**Build Status**: Success / Failed (pilih salah satu)

**Build Time**: ___ seconds

**Admin Credentials**:
- Username: `RagitAdmin1`
- Password: `SayaAdmin1234` (⚠️ GANTI SETELAH TESTING!)

**Custom Domain**: (jika ada) ______________________________

**Supabase Status**: 
- [ ] Database setup complete (run `supabase-setup.sql`)
- [ ] Storage bucket created (`dokumentasi-images`)
- [ ] Sample data inserted

**Notes**: ________________________________________________

---

## 🆘 Troubleshooting

### Build Failed

**Error**: `npm install failed`
```bash
# Solution: Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error**: `Module not found`
```bash
# Check import paths
# Pastikan semua imports pakai relative path yang benar
```

### Website Error 404

**Problem**: Page refresh → 404 error

**Solution**: 
- `vercel.json` sudah ada ✅ (rewrites configured)
- `netlify.toml` sudah ada ✅ (redirects configured)
- Jika masih error, check Vercel/Netlify dashboard → Settings → Rewrites

### Environment Variables Not Working

**Problem**: `undefined` saat akses Supabase

**Check**:
1. Vercel/Netlify Dashboard → Settings → Environment Variables
2. Verify variables exist
3. Verify environment selected: Production ✅
4. **Redeploy** setelah add env vars (penting!)

### Images Not Loading

**Problem**: Images broken atau 404

**Check**:
1. Browser console → Network tab
2. Check image URLs
3. Verify Unsplash URLs masih valid
4. Check localStorage data (jika pakai localStorage)

---

## 🎉 SUCCESS CRITERIA

Deploy dianggap **SUKSES** jika:

- [x] Website accessible via public URL
- [x] No build errors
- [x] All pages load correctly
- [x] Images displayed
- [x] Dark mode works
- [x] Responsive on mobile
- [x] Admin login works
- [x] No console errors (critical)
- [x] Lighthouse score > 80 (performance)
- [x] HTTPS enabled (green padlock)

---

## 📋 NEXT ACTIONS AFTER DEPLOY

1. **Share URL** dengan stakeholders
2. **Test dengan users** (internal team)
3. **Setup Supabase Database**:
   - Run `supabase-setup.sql`
   - Create storage bucket
   - Insert sample data
4. **Migrate dari localStorage** (opsional):
   - Follow `migrate-localstorage-to-supabase.md`
5. **Ganti admin password**
6. **Setup custom domain** (jika diperlukan)
7. **Setup monitoring & analytics**
8. **Create backup plan**
9. **Document deployment process** untuk team

---

## 🚀 QUICK COMMAND REFERENCE

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run build && npx vite preview

# Deploy to Vercel (CLI)
vercel --prod

# Check build logs
# → Vercel/Netlify dashboard → Deployments → Select deployment → View logs
```

---

**🎊 ANDA SIAP DEPLOY! PILIH METODE DAN MULAI! 🎊**

**Rekomendasi**: Vercel Web Interface (paling mudah, 10 menit)

**Buka**: https://vercel.com/signup dan ikuti Step 1-5 di atas! 🚀
