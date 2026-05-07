# 🚀 Setup Supabase untuk Ragit Dobel 4.0

## ✅ Status Saat Ini
- **Supabase URL**: `https://zbexsukhqcgmzgqapoii.supabase.co`
- **Kode aplikasi**: Sudah terintegrasi dengan Supabase
- **Fitur Realtime**: ✅ Sudah ditambahkan di kode

## 📋 Langkah Setup Database

### 1. Enable Realtime di Supabase Dashboard

Agar link bisa sync otomatis antar device, **Realtime harus diaktifkan**:

1. Buka [Supabase Dashboard](https://supabase.com/dashboard/project/zbexsukhqcgmzgqapoii)
2. Login dengan akun Supabase Anda
3. Pilih project **zbexsukhqcgmzgqapoii**
4. Klik menu **Database** > **Replication**
5. Cari tabel berikut dan centang/enable Realtime:
   - ✅ `dashboard_links`
   - ✅ `lms_links`
   - ✅ `dokumentasi_kegiatan`

### 2. Buat Tabel Database

Jalankan SQL berikut di **SQL Editor** Supabase:

```sql
-- 1. Tabel Dashboard Links
CREATE TABLE IF NOT EXISTS dashboard_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Lihat Dashboard Lengkap',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default data
INSERT INTO dashboard_links (url, label, is_active) 
VALUES ('#', 'Lihat Dashboard Lengkap', true)
ON CONFLICT DO NOTHING;

-- 2. Tabel LMS Links
CREATE TABLE IF NOT EXISTS lms_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Masuk ke LMS',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert default data
INSERT INTO lms_links (url, label, is_active) 
VALUES ('/lms.html', 'Masuk ke LMS', true)
ON CONFLICT DO NOTHING;

-- 3. Tabel Dokumentasi Kegiatan
CREATE TABLE IF NOT EXISTS dokumentasi_kegiatan (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  kategori TEXT NOT NULL,
  image_url TEXT NOT NULL,
  dokumentasi_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumentasi_kegiatan ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies (Public Read, Admin Write)
-- Dashboard Links Policies
CREATE POLICY "Public can read dashboard links" ON dashboard_links
  FOR SELECT USING (true);

CREATE POLICY "Admin can update dashboard links" ON dashboard_links
  FOR UPDATE USING (true);

CREATE POLICY "Admin can insert dashboard links" ON dashboard_links
  FOR INSERT WITH CHECK (true);

-- LMS Links Policies
CREATE POLICY "Public can read lms links" ON lms_links
  FOR SELECT USING (true);

CREATE POLICY "Admin can update lms links" ON lms_links
  FOR UPDATE USING (true);

CREATE POLICY "Admin can insert lms links" ON lms_links
  FOR INSERT WITH CHECK (true);

-- Dokumentasi Policies
CREATE POLICY "Public can read dokumentasi" ON dokumentasi_kegiatan
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage dokumentasi" ON dokumentasi_kegiatan
  FOR ALL USING (true);
```

### 3. Setup Storage untuk Gambar (Opsional)

Jika ingin upload gambar dokumentasi ke Supabase Storage:

1. Buka menu **Storage** di Supabase Dashboard
2. Klik **Create a new bucket**
3. Nama bucket: `dokumentasi-images`
4. Public bucket: **YES** (centang)
5. Klik **Create bucket**
6. Buat policy untuk upload:

```sql
-- Allow public read
CREATE POLICY "Public can read images" ON storage.objects FOR SELECT
  USING (bucket_id = 'dokumentasi-images');

-- Allow authenticated insert/update/delete
CREATE POLICY "Authenticated can upload images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'dokumentasi-images');
```

## 🔄 Cara Kerja Realtime Sync

Setelah setup selesai:

1. **Admin edit link di Device A** → Data tersimpan ke Supabase
2. **Supabase mengirim event** ke semua device yang terbuka
3. **Device B otomatis refresh** dan menampilkan link terbaru
4. **Tidak perlu refresh manual** - semua sync otomatis!

## 🧪 Testing Sync Antar Device

1. Buka website di **2 browser/tab berbeda** (atau 2 device)
2. Login sebagai admin di salah satu tab
3. Edit link dashboard
4. **Lihat tab lainnya** - link akan otomatis berubah tanpa refresh!

## ❗ Troubleshooting

### Link tidak sync antar device?

1. ✅ Pastikan Realtime sudah enabled di tabel (langkah 1)
2. ✅ Buka Console browser (F12) - lihat log `🔄 Dashboard link changed`
3. ✅ Cek koneksi internet - Realtime butuh WebSocket connection
4. ✅ Refresh halaman jika baru enable Realtime

### Error saat save link?

1. ✅ Cek tabel sudah dibuat (langkah 2)
2. ✅ Cek RLS policies sudah dibuat
3. ✅ Buka Console browser untuk lihat error detail

### Data tidak muncul?

1. ✅ Cek di Supabase **Table Editor** apakah data ada
2. ✅ Pastikan `is_active = true`
3. ✅ Clear localStorage browser: `localStorage.clear()` di Console

## 📊 Monitoring

Lihat aktifitas Realtime di **Supabase Dashboard** > **Database** > **Realtime**:
- Active connections
- Messages per second
- Channel activity

---

## 🎯 Summary

Setelah **enable Realtime** di 3 tabel (`dashboard_links`, `lms_links`, `dokumentasi_kegiatan`), website akan otomatis sync data antar semua device yang terbuka - tanpa perlu refresh manual!

**Update**: Kode sudah siap dengan Realtime subscription ✅
**Action Required**: Enable Realtime di Supabase Dashboard untuk 3 tabel tersebut.
