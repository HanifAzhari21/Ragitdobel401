# 🏛️ Ragit Dobel 4.0 — Website Resmi Kanwil DJPb Sumatera Selatan

> **RAGIT DOBEL 4.0** — *Dashboard Ekonomi Regional & Portal Layanan Terpadu*  
> Dikembangkan oleh **Kanwil Direktorat Jenderal Perbendaharaan (DJPb) Sumatera Selatan**

---

## 📌 Tentang Proyek

Website ini merupakan **landing page resmi** Ragit Dobel 4.0 yang menggantikan Google Sites sebelumnya. Dibangun dengan pendekatan **public-first modern dan profesional**, website ini menampilkan Dashboard Ekonomi Regional yang dapat diakses publik tanpa login, terintegrasi dengan sistem Joomla existing melalui redirect link.

🔗 **Integrasi Joomla**: [https://djpb.kemenkeu.go.id/kanwil/sumsel/id/](https://djpb.kemenkeu.go.id/kanwil/sumsel/id/)

---

## 🎨 Desain & Identitas Visual

| Elemen          | Keterangan                                      |
|-----------------|-------------------------------------------------|
| **Warna Utama** | Navy & Biru Tua (`blue-900`, `blue-700`)        |
| **Aksen**       | Kuning Emas (`yellow-500`, `yellow-600`)        |
| **Tipografi**   | Inter / System Font                             |
| **Ikon**        | Lucide React                                    |
| **Dark Mode**   | Penuh (toggle di header, simpan ke localStorage)|
| **Responsive**  | Mobile-first, fully responsive                  |
| **Watermark**   | Logo DJPb sebagai background hero section       |

---

## 🚀 Tech Stack

| Teknologi          | Versi     | Kegunaan                              |
|--------------------|-----------|---------------------------------------|
| React              | 18.3.1    | UI Framework                          |
| TypeScript         | Latest    | Type Safety                           |
| Tailwind CSS       | v4        | Utility-first styling                 |
| Vite               | 6.3.5     | Build tool & dev server               |
| Supabase           | Latest    | Database (PostgreSQL) + Storage       |
| React Slick        | 0.31.0    | Carousel dokumentasi kegiatan         |
| Recharts           | 2.15.2    | Chart & grafik data ekonomi           |
| Lucide React       | 0.487.0   | Icon library                          |
| Motion             | 12.23.24  | Animasi UI                            |
| MUI                | 7.3.5     | Material UI components                |
| Radix UI           | Various   | Accessible UI primitives (via Shadcn) |

---

## 🗂️ Struktur Proyek

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                        # Root komponen aplikasi
│   │   ├── components/
│   │   │   ├── BackgroundPattern.tsx      # Pola dekoratif background
│   │   │   ├── DashboardEkonomi.tsx       # Halaman dashboard ekonomi lengkap
│   │   │   ├── DashboardSection.tsx       # Seksi dashboard di landing page
│   │   │   ├── DetailModal.tsx            # Modal detail layanan
│   │   │   ├── DokumentasiSection.tsx     # Carousel + CRUD dokumentasi kegiatan
│   │   │   ├── Footer.tsx                 # Footer website
│   │   │   ├── Header.tsx                 # Header: login, dark mode, navigasi
│   │   │   ├── HeroSection.tsx            # Hero section dengan watermark logo DJPb
│   │   │   ├── InternalSection.tsx        # Seksi internal (opsional)
│   │   │   ├── LMSMockup.tsx             # Mockup tampilan LMS
│   │   │   ├── LMSSection.tsx             # Seksi Learning Management System
│   │   │   ├── LayananSection.tsx         # Seksi layanan Kanwil
│   │   │   ├── TematikSection.tsx         # Seksi tematik (opsional)
│   │   │   └── ui/                        # Komponen UI library (Shadcn/Radix)
│   │   └── contexts/
│   │       └── DarkModeContext.tsx        # Context: dark mode + auth state
│   ├── styles/
│   │   ├── index.css                      # Entrypoint CSS
│   │   ├── tailwind.css                   # Konfigurasi Tailwind
│   │   ├── theme.css                      # CSS Variables & theme tokens
│   │   └── fonts.css                      # Google Fonts imports
│   ├── dashboard-ekonomi.tsx              # Halaman standalone dashboard
│   ├── lms-mockup.tsx                     # Halaman standalone LMS
│   └── main.tsx                           # Entry point React
├── public/
│   ├── dashboard-ekonomi.html             # HTML standalone dashboard
│   └── lms.html                           # HTML standalone LMS
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx                  # Hono web server (Edge Function)
│           └── kv_store.tsx               # KV store utility (protected)
├── utils/
│   └── supabase/
│       └── info.tsx                       # Supabase project config
├── supabase-setup.sql                     # ⭐ Script setup database (WAJIB)
├── supabase-update-admin-password.sql     # Script update password admin
├── supabase-useful-queries.sql            # Kumpulan query maintenance
├── QUICK_START.md                         # Panduan setup cepat (10 menit)
├── SUPABASE_DEPLOYMENT_GUIDE.md           # Panduan deployment lengkap
├── DEPLOYMENT_CHECKLIST.md               # Checklist deployment
├── SUPABASE_FILES_SUMMARY.md             # Ringkasan semua file Supabase
├── README_SUPABASE.md                     # Navigasi dokumentasi Supabase
├── migrate-localstorage-to-supabase.md   # Panduan migrasi data
├── package.json
└── vite.config.ts
```

---

## 📄 Halaman & Seksi Website

### 1. 🏠 Hero Section
- Judul besar: **"Ragit Dobel 4.0"**
- Deskripsi layanan: Dashboard monitoring dan layanan terpadu untuk K/L, Pemda, dan Publik
- Background gradient Navy-Biru dengan watermark logo DJPb (opacity 35%)
- Tombol CTA: **"Lihat Dashboard"** (anchor ke seksi dashboard)
- Elemen dekoratif: Blur circle kuning & biru

### 2. 📊 Dashboard Section (Dashboard Ekonomi Regional)
- Monitoring data ekonomi regional Sumatera Selatan
- Tombol **"Lihat Dashboard Lengkap"** → link eksternal (dapat diedit oleh Admin)
- Data visualisasi menggunakan Recharts
- Akses publik tanpa perlu login

### 3. 🎓 LMS Section (Learning Management System)
- Informasi dan preview LMS Kanwil DJPb Sumsel
- Tombol **"Masuk ke LMS"** → link eksternal (dapat diedit oleh Admin)
- Tampilan mockup LMS yang profesional

### 4. 📸 Dokumentasi Kegiatan
- Carousel horizontal menggunakan **react-slick**
- Setiap card menampilkan: foto cover, judul, tanggal, PIC, unit kerja
- Klik card → **popup modal detail** dengan layout:
  1. Header (judul, tanggal, PIC, unit)
  2. Foto cover (full width)
  3. Deskripsi kegiatan
  4. Link dokumentasi (Google Drive, dll)
- Admin dapat melakukan CRUD lengkap

### 5. 🦶 Footer
- Informasi organisasi Kanwil DJPb Sumatera Selatan
- Link navigasi & kontak

---

## 🔐 Sistem Autentikasi Admin

### Login
- Tombol **"Login"** di pojok kanan header
- Modal login dengan username/password
- Kredensial default: `RagitAdmin1` / `SayaAdmin1234`
- Session disimpan di `sessionStorage`

### Fitur Eksklusif Admin (setelah login)
| Fitur | Deskripsi |
|-------|-----------|
| ✏️ Edit Link Dashboard | Mengubah URL tombol "Lihat Dashboard Lengkap" |
| ✏️ Edit Link LMS | Mengubah URL tombol "Masuk ke LMS" |
| ➕ Tambah Dokumentasi | Form lengkap: judul, deskripsi, tanggal, PIC, unit, foto cover, link |
| 📝 Edit Dokumentasi | Update semua field termasuk foto dan link |
| 🗑️ Hapus Dokumentasi | Hapus dengan konfirmasi |
| 🔗 Kelola Link Dokumentasi | Tambah, edit, hapus link per kegiatan |
| 🖼️ Stock Images Gallery | 12 gambar profesional siap pakai (dari Unsplash) |
| 🔗 Custom URL Upload | Input URL gambar eksternal (hemat storage) |

### Stock Images Gallery (12 Gambar)
Kategori gambar tersedia untuk admin:
- Workshop/Seminar
- Rapat Formal
- Pelatihan Kantor
- Presentasi Laporan
- Koordinasi Tim
- Kunjungan Kerja
- Konferensi
- Diskusi Grup
- Audit Keuangan
- Penandatanganan MOU
- Sosialisasi Kebijakan
- Rapat Evaluasi

---

## 🗄️ Database — Supabase (PostgreSQL)

### Tabel Database

| Tabel | Fungsi | Baris Default |
|-------|--------|---------------|
| `admin_users` | Autentikasi admin | 1 (RagitAdmin1) |
| `dashboard_links` | URL dashboard eksternal | 1 |
| `lms_links` | URL LMS eksternal | 1 |
| `dokumentasi_kegiatan` | Data dokumentasi kegiatan | 3 (sample) |
| `dokumentasi_links` | Link per dokumentasi | 1+ |

### Storage Bucket

| Bucket | Akses | Fungsi |
|--------|-------|--------|
| `dokumentasi-images` | Public | Foto cover kegiatan |

### Keamanan
- **Row Level Security (RLS)**: Publik hanya bisa read, admin bisa write
- Auto-timestamps pada setiap data
- Cascade delete (hapus kegiatan → otomatis hapus link terkait)
- Index untuk query yang optimal

---

## ⚡ Cara Menjalankan Lokal

### Prerequisites
- Node.js >= 18
- pnpm (direkomendasikan) atau npm
- Akun Supabase (gratis)

### Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd ragit-dobel-4

# 2. Install dependencies
pnpm install
# atau: npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env: isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY

# 4. Jalankan dev server
pnpm dev
# atau: npm run dev

# 5. Buka browser
# http://localhost:5173
```

### Setup Supabase (Wajib untuk data persisten)
1. Buat project baru di [supabase.com](https://supabase.com)
2. Jalankan `supabase-setup.sql` di SQL Editor
3. Buat bucket `dokumentasi-images` di Storage
4. Copy Project URL & Anon Key ke `.env`

> 📖 Lihat panduan lengkap: [QUICK_START.md](./QUICK_START.md) atau [SUPABASE_DEPLOYMENT_GUIDE.md](./SUPABASE_DEPLOYMENT_GUIDE.md)

---

## 🚀 Deployment

### Vercel (Direkomendasikan)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di dashboard Vercel:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```

### Netlify
1. Push ke GitHub
2. Connect repo di [netlify.com](https://netlify.com)
3. Build command: `pnpm build` / `npm run build`
4. Publish directory: `dist`
5. Set environment variables di Settings → Environment

### Build Manual
```bash
pnpm build
# Output ada di folder /dist
```

---

## 🔗 Integrasi Joomla

Website ini dirancang untuk terintegrasi dengan sistem Joomla existing:

```html
<!-- Di website Joomla, tambahkan link ke website ini -->
<a href="https://ragit-dobel-4.vercel.app">
  Ragit Dobel 4.0 — Dashboard Ekonomi
</a>
```

**URL Production**: _[Akan diisi setelah deployment]_  
**Joomla Base**: [https://djpb.kemenkeu.go.id/kanwil/sumsel/id/](https://djpb.kemenkeu.go.id/kanwil/sumsel/id/)

---

## 📚 Dokumentasi File

| File | Deskripsi |
|------|-----------|
| [README.md](./README.md) | Dokumentasi utama proyek (file ini) |
| [README_SUPABASE.md](./README_SUPABASE.md) | Navigasi lengkap file-file Supabase |
| [QUICK_START.md](./QUICK_START.md) | Setup Supabase dalam 10 menit |
| [SUPABASE_DEPLOYMENT_GUIDE.md](./SUPABASE_DEPLOYMENT_GUIDE.md) | Panduan deployment detail |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Checklist tracking deployment |
| [SUPABASE_FILES_SUMMARY.md](./SUPABASE_FILES_SUMMARY.md) | Ringkasan semua file Supabase |
| [migrate-localstorage-to-supabase.md](./migrate-localstorage-to-supabase.md) | Panduan migrasi data localStorage |
| [supabase-setup.sql](./supabase-setup.sql) | ⭐ Script SQL setup database (WAJIB) |
| [supabase-update-admin-password.sql](./supabase-update-admin-password.sql) | Script update/reset password admin |
| [supabase-useful-queries.sql](./supabase-useful-queries.sql) | Query maintenance & monitoring |

---

## ✅ Fitur Lengkap

### 🌐 Fitur Publik
- [x] Hero Section dengan watermark logo DJPb
- [x] Dashboard Ekonomi Regional (publik, tanpa login)
- [x] LMS Section dengan mockup preview
- [x] Dokumentasi Kegiatan (carousel react-slick)
- [x] Popup modal detail kegiatan (Foto → Deskripsi → Link)
- [x] Dark mode (toggle di header, persisten)
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Footer dengan info organisasi

### 🔐 Fitur Admin
- [x] Login modal (username + password)
- [x] Edit URL tombol "Lihat Dashboard Lengkap"
- [x] Edit URL tombol "Masuk ke LMS"
- [x] Tambah dokumentasi kegiatan (CRUD penuh)
- [x] Upload foto cover (custom URL atau stock gallery)
- [x] Stock images gallery (12 gambar profesional)
- [x] Kelola link dokumentasi per kegiatan
- [x] Hapus dokumentasi dengan konfirmasi
- [x] Logout session

### 🛠️ Fitur Teknis
- [x] React 18 + TypeScript (type-safe)
- [x] Tailwind CSS v4 (utility-first)
- [x] Supabase PostgreSQL (database)
- [x] Supabase Storage (file storage)
- [x] Row Level Security (RLS)
- [x] Auto-timestamps & cascade delete
- [x] Optimized query dengan indexes
- [x] Hono Edge Function server
- [x] KV Store utility

---

## 🆘 Troubleshooting

| Error | Solusi |
|-------|--------|
| `Failed to fetch` | Cek `.env`: URL & Anon Key sudah benar |
| `Row Level Security policy violation` | Jalankan ulang `supabase-setup.sql` |
| `Bucket not found` | Buat bucket `dokumentasi-images` di Supabase Storage |
| `Invalid login credentials` | Cek tabel `admin_users` di Table Editor |
| Images tidak muncul | Pastikan bucket Storage diset **public** |
| Data tidak tersimpan | Pastikan sudah login sebagai Admin |

📖 Troubleshooting lengkap → [SUPABASE_DEPLOYMENT_GUIDE.md](./SUPABASE_DEPLOYMENT_GUIDE.md) Section 7

---

## 📞 Kontak & Support

| | |
|-|-|
| 🏢 **Organisasi** | Kanwil Direktorat Jenderal Perbendaharaan (DJPb) Sumatera Selatan |
| 🌐 **Website Joomla** | https://djpb.kemenkeu.go.id/kanwil/sumsel/id/ |
| 🏛️ **Instansi Induk** | Direktorat Jenderal Perbendaharaan — Kemenkeu RI |

---

## 📝 Versi & Credits

| | |
|-|-|
| **Versi Aplikasi** | Ragit Dobel **4.0** |
| **Tanggal Rilis** | Maret 2026 |
| **Framework** | React 18.3.1 + TypeScript + Tailwind CSS v4 |
| **Database** | Supabase (PostgreSQL) |
| **Build Tool** | Vite 6.3.5 |
| **Ikon** | Lucide React |
| **Foto** | Unsplash (via ImageWithFallback component) |
| **Carousel** | React Slick |
| **Charts** | Recharts |
| **UI Primitives** | Radix UI (via Shadcn) |
| **Lisensi** | MIT (untuk komponen Shadcn) & Unsplash License (untuk foto) |

---

> 💡 **Catatan**: Website ini menggantikan Google Sites sebelumnya dan berfungsi sebagai portal publik resmi Ragit Dobel 4.0. Untuk akses admin, gunakan tombol **Login** di header dengan kredensial yang telah ditetapkan.

---

*Dikembangkan untuk Kanwil DJPb Sumatera Selatan — Direktorat Jenderal Perbendaharaan, Kementerian Keuangan RI* 🇮🇩
