# 🚀 DEPLOY NOW - Panduan Deployment Cepat

**Status**: ✅ READY TO DEPLOY  
**Estimasi Waktu**: 10-15 menit  
**Target Platform**: Vercel (Recommended) atau Netlify

---

## 📋 Pre-Deployment Checklist

Sebelum deploy, pastikan:
- [x] Aplikasi berjalan di localhost tanpa error
- [x] Supabase credentials sudah dikonfigurasi
- [x] File `.env` sudah ada (jangan di-commit!)
- [x] `vercel.json` dan `netlify.toml` sudah dibuat ✅

---

## 🎯 Pilih Platform Deployment

### Option 1: Vercel (RECOMMENDED - Termudah)
✅ **Keuntungan**:
- Deploy otomatis dari Git
- Free SSL/HTTPS
- CDN global
- Auto-preview untuk setiap push
- Dashboard bagus

👉 **Pilih ini jika**: Anda ingin deploy paling cepat dan mudah

### Option 2: Netlify (Alternatif Bagus)
✅ **Keuntungan**:
- Mirip dengan Vercel
- Free tier generous
- Form handling built-in
- Identity management

👉 **Pilih ini jika**: Anda sudah familiar dengan Netlify

### Option 3: Manual (VPS/cPanel)
✅ **Keuntungan**:
- Full control
- Bisa custom server config
- Cocok jika sudah punya hosting

👉 **Pilih ini jika**: Anda punya hosting sendiri

---

## 🚀 METODE 1: Deploy ke Vercel (10 menit)

### A. Via Web Interface (PALING MUDAH)

#### Step 1: Buat Akun Vercel
1. Buka: https://vercel.com/signup
2. Sign up dengan GitHub (RECOMMENDED) atau Email
3. ✅ Authorize Vercel untuk akses GitHub

#### Step 2: Upload Project ke GitHub (Jika belum)

**Jika belum ada di GitHub:**
```bash
# Inisialisasi git (jika belum)
git init

# Add semua file (kecuali .env)
git add .

# Commit
git commit -m "Initial commit - Ragit Dobel 4.0 ready for deployment"

# Create repository di GitHub.com terlebih dahulu
# Kemudian:
git remote add origin https://github.com/USERNAME/ragit-dobel-4.git
git branch -M main
git push -u origin main
```

**PENTING**: Pastikan `.env` TIDAK ter-commit! Check file `.gitignore`:
```
# .gitignore harus punya:
.env
.env.local
.env.production
node_modules/
dist/
```

#### Step 3: Import Project ke Vercel

1. Login ke https://vercel.com
2. Klik **"Add New..."** → **"Project"**
3. Pilih repository GitHub Anda: `ragit-dobel-4`
4. Klik **"Import"**

#### Step 4: Configure Build Settings

Vercel biasanya auto-detect, tapi pastikan:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 5: Environment Variables (PENTING!)

Sebelum deploy, tambahkan environment variables:

1. Klik **"Environment Variables"**
2. Tambahkan 2 variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://zbexsukhqcgmzgqapoii.supabase.co
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg
```

3. Environment: **Production, Preview, Development** (pilih semua)

#### Step 6: Deploy!

1. Klik **"Deploy"**
2. ⏳ Tunggu 2-3 menit
3. ✅ Deployment selesai!

#### Step 7: Test Website

1. Klik URL yang diberikan (contoh: `ragit-dobel-4.vercel.app`)
2. Test:
   - [ ] Homepage load
   - [ ] Dark mode toggle
   - [ ] Login admin (RagitAdmin1 / SayaAdmin1234)
   - [ ] Dokumentasi carousel
   - [ ] Responsive di mobile

---

### B. Via Vercel CLI (Alternative - Untuk Developer)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Ikuti prompts:
# - Set up and deploy? Y
# - Which scope? (pilih akun Anda)
# - Link to existing project? N
# - Project name? ragit-dobel-4
# - Directory? ./
# - Override settings? N

# Set environment variables
vercel env add VITE_SUPABASE_URL
# Paste: https://zbexsukhqcgmzgqapoii.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Deploy to production
vercel --prod
```

---

## 🌐 METODE 2: Deploy ke Netlify (10 menit)

### Via Netlify UI

#### Step 1: Buat Akun
1. Buka: https://app.netlify.com/signup
2. Sign up dengan GitHub

#### Step 2: New Site from Git
1. Klik **"Add new site"** → **"Import an existing project"**
2. Choose **GitHub**
3. Authorize Netlify
4. Pilih repository: `ragit-dobel-4`

#### Step 3: Build Settings
- **Branch to deploy**: main
- **Build command**: `npm run build`
- **Publish directory**: `dist`

#### Step 4: Environment Variables
1. Klik **"Show advanced"**
2. Klik **"New variable"**

**Variable 1:**
```
Key: VITE_SUPABASE_URL
Value: https://zbexsukhqcgmzgqapoii.supabase.co
```

**Variable 2:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg
```

#### Step 5: Deploy
1. Klik **"Deploy site"**
2. ⏳ Tunggu 2-3 menit
3. ✅ Site live!

URL: `https://ragit-dobel-4.netlify.app` (atau random subdomain)

---

## 🖥️ METODE 3: Deploy Manual (VPS/cPanel)

### Step 1: Build Locally

```bash
# Install dependencies
npm install

# Build production
npm run build

# Folder /dist akan terbentuk
```

### Step 2: Upload ke Server

**Via FTP/SFTP:**
1. Connect ke server dengan FileZilla/WinSCP
2. Upload SEMUA isi folder `/dist` ke folder web root:
   - cPanel: `/public_html/`
   - VPS Nginx: `/var/www/html/`
   - VPS Apache: `/var/www/html/` atau `/home/user/public_html/`

### Step 3: Configure Server

**Apache (.htaccess)** - Buat file di root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

**Nginx (nginx.conf)** - Tambahkan di server block:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Security headers
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
```

### Step 4: Environment Variables

**PENTING**: Karena build static, environment variables sudah "baked in" saat build.

Jadi pastikan SEBELUM `npm run build`, file `.env` sudah berisi:
```env
VITE_SUPABASE_URL=https://zbexsukhqcgmzgqapoii.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 5: SSL/HTTPS

**cPanel:**
1. cPanel → SSL/TLS Status
2. Install Let's Encrypt (free)
3. ✅ Auto-renew

**VPS:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL
sudo certbot --nginx -d yourdomain.com

# Auto-renew sudah setup otomatis
```

---

## ✅ Post-Deployment Checklist

Setelah deploy berhasil, verify:

### Functionality Test
- [ ] **Homepage** load dengan cepat (< 3 detik)
- [ ] **Images** semua muncul
- [ ] **Dark mode** toggle berfungsi
- [ ] **Responsive** design di mobile (test dengan DevTools)
- [ ] **Carousel** dokumentasi berfungsi
- [ ] **Modal** popup berfungsi

### Admin Features Test
- [ ] **Login** dengan `RagitAdmin1` / `SayaAdmin1234`
- [ ] **Logout** berfungsi
- [ ] **Edit Dashboard Link** berfungsi (jika sudah integrasi Supabase)
- [ ] **Edit LMS Link** berfungsi
- [ ] **CRUD Dokumentasi** berfungsi (jika sudah integrasi Supabase)

### Performance Test
- [ ] Lighthouse Score (Chrome DevTools):
  - Performance: > 80
  - Accessibility: > 90
  - Best Practices: > 80
  - SEO: > 80
- [ ] No console errors
- [ ] Fast loading time

### Security Test
- [ ] **HTTPS** aktif (green padlock di browser)
- [ ] **No `.env` exposed** (check source code, pastikan credentials tidak kelihatan)
- [ ] Admin password akan diganti setelah testing

---

## 🔧 Troubleshooting

### Error: "Build failed"
**Solusi:**
```bash
# Test build locally dulu
npm install
npm run build

# Jika error, fix dulu sebelum deploy
```

### Error: "Page not found" saat reload
**Solusi:**
- Pastikan `vercel.json` atau `netlify.toml` sudah ada
- Atau tambahkan rewrite rules di server config

### Error: "Failed to fetch" di production
**Solusi:**
- Check environment variables sudah benar
- Verify Supabase URL bisa diakses dari browser
- Check browser console untuk error detail

### Images tidak muncul
**Solusi:**
- Check Network tab di DevTools
- Verify image URLs valid
- Check jika ada CORS issues

---

## 🎉 Deployment Selesai!

### 📝 Catat Informasi Ini:

**Production URL**: _________________________________

**Admin Login**:
- Username: `RagitAdmin1`
- Password: `SayaAdmin1234`

**Supabase Dashboard**: https://app.supabase.com/project/zbexsukhqcgmzgqapoii

**Deployment Platform**: Vercel / Netlify / Manual (pilih salah satu)

**Deployment Date**: 5 Maret 2026

---

## 🔄 Auto-Deploy Setup (Bonus)

Jika deploy via Vercel/Netlify dengan Git:

**Setiap kali Anda push ke GitHub:**
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

**Otomatis:**
- ✅ Vercel/Netlify detect push
- ✅ Build otomatis
- ✅ Deploy otomatis
- ✅ URL langsung update
- 🎉 Zero downtime!

---

## 📞 Next Steps

1. **Share URL** dengan team/stakeholders
2. **Setup Custom Domain** (optional):
   - Vercel: Settings → Domains → Add
   - Contoh: `ragit.djpb-sumsel.id`
3. **Setup Monitoring**:
   - Google Analytics
   - Vercel Analytics (built-in)
4. **Ganti Admin Password** (PENTING untuk production!)
5. **Setup Supabase Database** (jika belum):
   - Run `supabase-setup.sql`
   - Create storage bucket
   - Migrate dari localStorage

---

## 🚀 Quick Deploy Commands

### Test Build Locally
```bash
npm run build
npx vite preview
```

### Deploy to Vercel (CLI)
```bash
vercel --prod
```

### Deploy to Netlify (CLI)
```bash
netlify deploy --prod
```

---

**🎊 SELAMAT! Website Ragit Dobel 4.0 Sudah Live! 🎊**

Share URL Anda dan mulai gunakan! 🚀
