# Kode Lengkap Website Ragit Dobel 4.0 - Kanwil DJPb Sumatera Selatan

## 📋 Informasi Proyek

**Nama Proyek:** Ragit Dobel 4.0 - Landing Page Website Resmi  
**Organisasi:** Kanwil DJPb Sumatera Selatan  
**Teknologi:** React 18.3.1 + TypeScript + Tailwind CSS v4  
**Tipe:** Single Page Application (SPA) dengan routing

---

## 🏗️ Struktur Proyek

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                        # Komponen utama aplikasi
│   │   ├── components/
│   │   │   ├── BackgroundPattern.tsx      # Pola dekoratif background
│   │   │   ├── DashboardEkonomi.tsx       # Halaman dashboard ekonomi penuh
│   │   │   ├── DashboardSection.tsx       # Seksi dashboard di landing page
│   │   │   ├── DetailModal.tsx            # Modal detail layanan
│   │   │   ├── DokumentasiSection.tsx     # Carousel dokumentasi kegiatan
│   │   │   ├── Footer.tsx                 # Footer website
│   │   │   ├── Header.tsx                 # Header dengan login & dark mode
│   │   │   ├── HeroSection.tsx            # Hero section dengan watermark logo
│   │   │   ├── InternalSection.tsx        # Seksi internal (opsional)
│   │   │   ├── LMSMockup.tsx             # Mockup LMS
│   │   │   ├── LMSSection.tsx             # Seksi Learning Management System
│   │   │   ├── LayananSection.tsx         # Seksi layanan Kanwil
│   │   │   ├── TematikSection.tsx         # Seksi tematik (opsional)
│   │   │   └── ui/                        # Komponen UI library (Shadcn)
│   │   └── contexts/
│   │       └── DarkModeContext.tsx        # Context untuk dark mode & auth
│   ├── styles/
│   │   ├── index.css                      # Import semua stylesheet
│   │   ├── tailwind.css                   # Konfigurasi Tailwind
│   │   ├── theme.css                      # Theme CSS Variables
│   │   └── fonts.css                      # Font imports
│   ├── main.tsx                           # Entry point aplikasi
│   ├── dashboard-ekonomi.tsx              # Entry dashboard standalone
│   └── lms-mockup.tsx                     # Entry LMS standalone
├── public/
│   ├── dashboard-ekonomi.html             # HTML untuk dashboard
│   └── lms.html                           # HTML untuk LMS
├── package.json                           # Dependencies & scripts
├── vite.config.ts                         # Konfigurasi Vite
└── postcss.config.mjs                     # Konfigurasi PostCSS

```

---

## 📦 Dependencies Utama

### Production Dependencies:
```json
{
  "@mui/material": "7.3.5",                    // Material UI components
  "@radix-ui/react-*": "latest",               // Radix UI primitives
  "lucide-react": "0.487.0",                   // Icon library
  "react-router-dom": "7.11.0",                // Routing
  "react-slick": "0.31.0",                     // Carousel untuk dokumentasi
  "slick-carousel": "1.8.1",                   // Carousel core
  "recharts": "2.15.2",                        // Charts untuk dashboard
  "motion": "12.23.24",                        // Animasi (Framer Motion)
  "next-themes": "0.4.6",                      // Dark mode utility
  "sonner": "2.0.3",                           // Toast notifications
  "class-variance-authority": "0.7.1",         // CVA untuk variants
  "clsx": "2.1.1",                             // Utility classes
  "tailwind-merge": "3.2.0"                    // Merge Tailwind classes
}
```

### Dev Dependencies:
```json
{
  "@tailwindcss/vite": "4.1.12",               // Tailwind v4 untuk Vite
  "@vitejs/plugin-react": "4.7.0",             // React plugin untuk Vite
  "tailwindcss": "4.1.12",                     // Tailwind CSS
  "vite": "6.3.5"                              // Build tool
}
```

---

## 🎨 Skema Warna

### Light Mode:
- **Primary:** Navy Blue (#1e3a8a) - Blue-900
- **Secondary:** Blue (#1e40af) - Blue-800  
- **Accent:** Yellow (#eab308) - Yellow-600
- **Background:** White (#ffffff)
- **Text:** Gray-900 (#111827)

### Dark Mode:
- **Primary:** Yellow (#facc15) - Yellow-400
- **Secondary:** Gray-700 (#374151)
- **Accent:** Yellow (#f59e0b) - Yellow-500
- **Background:** Gray-800 (#1f2937)
- **Text:** White (#ffffff)

---

## 🚀 Fitur Utama

### 1. **Hero Section**
- Logo DJPb sebagai background watermark besar (700x700px)
- Gradient biru harmonis (from-blue-600 via-blue-700 to-blue-900)
- Call-to-action buttons ke Dashboard dan Layanan
- Fully responsive

### 2. **Dashboard Ekonomi Regional**
- 3 Dashboard cards:
  - Dashboard Ekonomi (PDRB, pertumbuhan ekonomi)
  - Kredit Usaha Rakyat (KUR & UMKM)
  - IKPA (Indikator Kinerja Pelaksana Anggaran)
- Preview statistik real-time
- Link ke dashboard detail (dapat dibuka di tab baru)

### 3. **Layanan Kanwil**
- 6 Layanan utama dengan modal detail:
  - Konsultasi & Asistensi
  - Layanan Administrasi
  - Informasi Fiskal & Keuangan Daerah
  - Publikasi & Edukasi Keuangan Negara
  - Akses PPID
  - Kontak & Helpdesk
- Setiap layanan memiliki info kontak lengkap (telepon, email, WhatsApp)

### 4. **Learning Management System (LMS)**
- 6 Kategori pembelajaran:
  - Kebijakan Fiskal & Keuangan Daerah
  - Akuntansi & Perbendaharaan
  - Sistem Pembayaran & Digitalisasi Keuangan
  - Jabatan Fungsional Perbendaharaan
  - Pengembangan SDM & Organisasi
  - Digitalisasi & Inovasi
- Statistik: 100+ materi pembelajaran
- Link ke LMS page terpisah

### 5. **Dokumentasi Kegiatan**
- React Slick Carousel dengan 3 items visible (responsive)
- 6 Dokumentasi kegiatan default
- Popup modal dengan blur effect untuk detail file
- Fitur admin:
  - Tambah dokumentasi baru
  - Edit dokumentasi existing
  - Hapus dokumentasi
- Setiap item memiliki:
  - Gambar (dari Unsplash)
  - Judul, deskripsi, tanggal
  - Nama PIC, unit/bidang
  - Daftar file dokumentasi (PDF, DOC, XLS, PPT)

### 6. **Autentikasi Admin**
- Login modal dengan blur background
- Username: `RagitAdmin1`
- Password: `SayaAdmin1234`
- Session-based authentication (sessionStorage)
- Status admin ditampilkan di header
- Fitur:
  - Show/hide password
  - Remember me checkbox
  - Forgot password link
  - Logout button

### 7. **Dark Mode**
- Toggle dark mode di header
- Persistent mode (disimpan di localStorage)
- Smooth transition 300ms
- Support penuh di semua komponen
- Icon: Sun (dark mode aktif) / Moon (light mode)

### 8. **Footer**
- Informasi kontak lengkap Kanwil DJPb Sumsel
- Quick links ke semua section
- Link ke website pemerintah terkait
- Copyright & credits
- Rencana pengembangan platform

---

## 🔐 Kredensial Admin

**Username:** `RagitAdmin1`  
**Password:** `SayaAdmin1234`

Autentikasi ini tersimpan di `/src/app/contexts/DarkModeContext.tsx` baris 48-54.

---

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (lg, xl, 2xl)

Semua komponen fully responsive dengan grid system yang adaptif.

---

## 🔄 Routing

```tsx
/ → Landing Page (App.tsx)
/dashboard-ekonomi → Dashboard Ekonomi Lengkap (DashboardEkonomi.tsx)
/lms → Learning Management System (LMSMockup.tsx)
```

Router dikonfigurasi di `/src/main.tsx`.

---

## 🌐 Integrasi ke Joomla

### Opsi yang Direkomendasikan: **Subfolder dengan Menu Link**

**Cara:**
1. Upload seluruh hasil build ke subfolder di server Joomla:
   ```
   https://djpb.kemenkeu.go.id/kanwil/sumsel/id/ragit-dobel-4-0/
   ```

2. Tambahkan menu link di Joomla header (di bawah menu "Inovasi"):
   ```
   Nama Menu: Ragit Dobel 4.0
   URL: /ragit-dobel-4-0/
   Target: New Tab (opsional)
   ```

3. Tidak perlu konfigurasi khusus di Joomla, cukup upload dan link

**Keuntungan:**
- ✅ Tidak mengganggu struktur Joomla existing
- ✅ Mudah maintenance dan update
- ✅ Performa optimal (tidak ada iframe overhead)
- ✅ Dark mode dan session storage berfungsi sempurna
- ✅ Bisa dikembangkan secara independen

---

## 🛠️ Build & Deploy

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

File output akan ada di folder `/dist`:
```
dist/
├── index.html
├── dashboard-ekonomi.html
├── lms.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
```

### Deploy ke Server
1. Upload semua isi folder `dist/` ke server
2. Pastikan server support SPA routing (configure .htaccess atau nginx)
3. Test semua fitur termasuk dark mode dan admin login

---

## 📝 Catatan Penting

### Session Storage (Admin Login)
- Session admin tersimpan di `sessionStorage`
- Akan hilang saat tab browser ditutup
- Jika perlu persistent login, ubah ke `localStorage`

### Dark Mode Preference
- Tersimpan di `localStorage`
- Persistent across sessions
- Key: `darkMode` dengan value `'true'` atau `'false'`

### Image Sources
- Hero logo: Dari CDN DJPb official
- Dokumentasi images: Dari Unsplash API (dynamic)
- LMS preview: Static Unsplash URL

### File Dokumentasi
- Saat ini menggunakan URL placeholder
- Pada implementasi production, ganti dengan URL file server actual
- Support tipe: PDF, DOC, XLS, PPT, IMG

---

## 🎯 Rencana Pengembangan

1. **Integrasi Backend Real:**
   - Koneksi ke database untuk dokumentasi
   - Upload file dokumentasi langsung dari admin panel
   - User management system

2. **Dashboard Interaktif:**
   - Real-time data dari API DJPB
   - Filter dan export data
   - Visualisasi data lebih kompleks

3. **LMS Fully Functional:**
   - Video pembelajaran embedded
   - Quiz dan assessment
   - Progress tracking

4. **Notification System:**
   - Toast notifications untuk action berhasil/gagal
   - Email notification untuk admin activities

5. **Analytics:**
   - Google Analytics integration
   - User behavior tracking
   - Dashboard usage statistics

---

## 📞 Kontak & Support

**Kanwil DJPb Sumatera Selatan**  
📍 Jl. Kapten A. Rivai No. 4, Palembang, Sumatera Selatan 30129  
📞 (0711) 355430  
✉️ kanwilpalembang@djpb.kemenkeu.go.id

**Developer:**  
IT Magang Kemnaker DJPb Sumsel

---

## 📄 Lisensi

© 2026 Kanwil Direktorat Jenderal Perbendaharaan Sumatera Selatan  
All Rights Reserved

---

**Dibuat dengan ❤️ untuk modernisasi layanan publik DJPb Sumatera Selatan**
