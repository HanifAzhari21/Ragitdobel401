# 🚀 Deployment Guide - Ragit Dobel 4.0

## Panduan Deployment Lengkap ke Production

---

## 📋 Pre-Deployment Checklist

### ✅ Verifikasi Lokal
- [ ] Aplikasi berjalan dengan baik di `localhost`
- [ ] Semua fitur telah ditest (CRUD, Login, Dark Mode, Links)
- [ ] Tidak ada error di browser console
- [ ] Responsive design berfungsi di mobile & desktop
- [ ] Dark mode toggle bekerja dengan baik

### ✅ Supabase Configuration
- [ ] Database setup sudah selesai (`supabase-setup.sql` dijalankan)
- [ ] Storage bucket `dokumentasi-images` sudah dibuat (public)
- [ ] RLS Policies sudah aktif
- [ ] Sample data sudah terisi (3 dokumentasi default)
- [ ] Admin credentials ditest (`RagitAdmin1` / `SayaAdmin1234`)

### ✅ Environment Variables
- [ ] `.env` file sudah dikonfigurasi dengan credentials Supabase
- [ ] `VITE_SUPABASE_URL` sudah benar
- [ ] `VITE_SUPABASE_ANON_KEY` sudah benar
- [ ] File `/utils/supabase/info.tsx` sudah terupdate otomatis

---

## 🏗️ Build Process

### Step 1: Install Dependencies

```bash
npm install
```

Pastikan semua dependencies terinstall, termasuk:
- `@supabase/supabase-js` ✅
- `react-slick` & `slick-carousel`
- `lucide-react`
- `recharts`
- `motion`

### Step 2: Build Production

```bash
npm run build
```

Output akan tersimpan di folder `/dist`

**Verifikasi build:**
- [ ] Folder `/dist` terbentuk
- [ ] File `index.html` ada
- [ ] Folder `assets/` berisi CSS & JS chunks
- [ ] Size bundle reasonable (< 2MB total)

### Step 3: Test Build Locally (Optional)

```bash
npx vite preview
```

Buka `http://localhost:4173` dan test:
- [ ] Homepage load dengan cepat
- [ ] Images muncul
- [ ] Supabase connection bekerja
- [ ] Login admin berfungsi

---

## 🌐 Deployment Options

### Option A: Vercel (Recommended - Easiest)

#### A1. Setup Vercel Account
1. Login ke [vercel.com](https://vercel.com)
2. Connect GitHub repository (atau upload manual)

#### A2. Configure Project
1. Import repository
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Install Command: `npm install`

#### A3. Environment Variables
Di Vercel Dashboard → Settings → Environment Variables, tambahkan:

```env
VITE_SUPABASE_URL=https://zbexsukhqcgmzgqapoii.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ PENTING**: Gunakan credentials PRODUCTION Supabase, bukan development!

#### A4. Deploy
1. Klik **Deploy**
2. ⏳ Tunggu 2-3 menit
3. ✅ Deploy selesai
4. Buka URL production: `https://ragit-dobel-4-sumsel.vercel.app`

#### A5. Custom Domain (Optional)
1. Di Vercel → Settings → Domains
2. Tambah domain: `ragit.djpb-sumsel.id` (contoh)
3. Setup DNS sesuai instruksi Vercel
4. ✅ Domain ready dalam 24 jam

---

### Option B: Netlify

#### B1. Setup Netlify
1. Login ke [netlify.com](https://netlify.com)
2. Klik **Add new site** → **Import an existing project**

#### B2. Deploy Settings
- Build command: `npm run build`
- Publish directory: `dist`

#### B3. Environment Variables
Settings → Build & deploy → Environment → Add variables:
```env
VITE_SUPABASE_URL=https://zbexsukhqcgmzgqapoii.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### B4. Deploy
Deploy selesai otomatis. URL: `https://ragit-dobel-4-sumsel.netlify.app`

---

### Option C: Supabase Hosting (Experimental)

Supabase juga menyediakan static hosting via Edge Functions.

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref zbexsukhqcgmzgqapoii

# Deploy
supabase functions deploy
```

---

### Option D: Manual Hosting (VPS/Shared Hosting)

#### D1. Build
```bash
npm run build
```

#### D2. Upload `/dist` folder
Upload semua file di `/dist` ke server via FTP/SFTP:
- Folder tujuan: `/public_html` atau `/www`
- Pastikan `index.html` ada di root

#### D3. Configure Server
**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx (nginx.conf):**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 🔗 Post-Deployment: Integration dengan Joomla

### Redirect dari Joomla ke Ragit Dobel 4.0

Tambahkan link/redirect di website Joomla existing:
```
https://djpb.kemenkeu.go.id/kanwil/sumsel/id/
→ https://ragit-dobel-4-sumsel.vercel.app
```

**Cara implementasi:**
1. Login ke Joomla Admin
2. Buat Menu Item baru atau Edit existing
3. Link Type: **External URL**
4. URL: `https://ragit-dobel-4-sumsel.vercel.app`
5. Title: "Ragit Dobel 4.0"

---

## 🔐 Security Considerations

### ✅ Checklist Keamanan

- [ ] **Environment Variables**: NEVER commit `.env` ke Git
- [ ] **Supabase RLS**: Pastikan Row Level Security aktif
- [ ] **Admin Password**: Ganti password default setelah deploy
- [ ] **HTTPS**: Pastikan site menggunakan SSL/TLS
- [ ] **CORS**: Supabase CORS sudah dikonfigurasi untuk domain production

### Update Admin Password

Jalankan SQL di Supabase SQL Editor:

```sql
-- File: supabase-update-admin-password.sql
UPDATE admin_users
SET 
  password_hash = '$2a$10$NEW_HASH_HERE',
  updated_at = NOW()
WHERE username = 'RagitAdmin1';
```

Generate hash baru dengan bcrypt (rounds: 10).

---

## 📊 Monitoring & Analytics

### Supabase Dashboard
Monitor di: https://app.supabase.com/project/zbexsukhqcgmzgqapoii

**Metrics yang perlu dimonitor:**
- Database size
- Storage usage (bucket `dokumentasi-images`)
- Active connections
- Request rate

### Application Monitoring
Integrate dengan tools:
- **Google Analytics** - untuk tracking visitors
- **Sentry** - untuk error monitoring
- **Vercel Analytics** - built-in jika deploy di Vercel

---

## 🧪 Post-Deployment Testing

### ✅ Testing Checklist

#### Basic Functionality
- [ ] Homepage load < 3 detik
- [ ] All images load properly
- [ ] Dark mode toggle works
- [ ] Responsive design di mobile
- [ ] Carousel dokumentasi berfungsi

#### Database Operations (Admin)
- [ ] Login admin berhasil
- [ ] Edit Dashboard Link berhasil
- [ ] Edit LMS Link berhasil
- [ ] Add Dokumentasi berhasil
- [ ] Edit Dokumentasi berhasil
- [ ] Delete Dokumentasi berhasil (soft delete)

#### Links & Navigation
- [ ] "Lihat Dashboard Lengkap" → redirect benar
- [ ] "Masuk ke LMS" → redirect benar
- [ ] Link Dokumentasi → open di tab baru
- [ ] Footer links → berfungsi

#### Performance
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Core Web Vitals: Good
- [ ] No console errors
- [ ] No memory leaks

---

## 🔄 Continuous Deployment

### Auto-Deploy dengan Git

**Setup (Vercel/Netlify):**
1. Connect GitHub repo
2. Enable auto-deploy on `main` branch
3. Setiap `git push` → auto-deploy

**Workflow:**
```bash
# Development
git checkout develop
# ... make changes
git commit -m "feat: add new feature"
git push origin develop

# Testing in staging
# ... test thoroughly

# Production
git checkout main
git merge develop
git push origin main
# 🚀 Auto-deploy triggered
```

---

## 📝 Maintenance Guide

### Regular Tasks

**Weekly:**
- [ ] Check Supabase database size
- [ ] Review error logs
- [ ] Test critical paths (login, CRUD)

**Monthly:**
- [ ] Update dependencies (`npm update`)
- [ ] Review security patches
- [ ] Backup database (Supabase auto-backup aktif)
- [ ] Review analytics & metrics

**Quarterly:**
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Update documentation

---

## 🆘 Troubleshooting

### Issue: "Failed to fetch" error
**Cause**: Supabase connection issue  
**Solution**: 
1. Cek environment variables di hosting
2. Verify Supabase project masih aktif
3. Check CORS settings di Supabase

### Issue: Images not loading
**Cause**: Storage bucket configuration  
**Solution**:
1. Pastikan bucket `dokumentasi-images` adalah **public**
2. Check RLS policies di Storage

### Issue: Admin login tidak berfungsi
**Cause**: Credentials tidak match  
**Solution**:
1. Verify di Supabase: `SELECT * FROM admin_users`
2. Check password hash
3. Reset password via SQL

### Issue: Build gagal
**Cause**: Dependencies issue  
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📞 Support & Contact

**Developer**: Kanwil DJPb Sumatera Selatan  
**Tech Stack**: React + TypeScript + Tailwind + Supabase  
**Documentation**: `/README.md`, `/QUICK_START.md`, `/SUPABASE_DEPLOYMENT_GUIDE.md`

---

## ✅ Deployment Checklist - Final

- [ ] Build production berhasil
- [ ] Deploy ke hosting (Vercel/Netlify/VPS)
- [ ] Environment variables dikonfigurasi
- [ ] Custom domain setup (optional)
- [ ] SSL/HTTPS aktif
- [ ] Supabase connection tested
- [ ] Admin login tested
- [ ] All features tested di production
- [ ] Performance acceptable
- [ ] Monitoring setup
- [ ] Documentation updated
- [ ] Team informed about new URL

---

**🎉 Deployment Complete!**

**Production URL**: `___________________________________`

**Admin Panel**: Login dengan `RagitAdmin1` untuk akses fitur admin

**Next Steps**: 
1. Share URL dengan stakeholders
2. Setup monitoring alerts
3. Plan regular maintenance schedule
