# 🔍 Troubleshooting: Data Tidak Tersimpan di Supabase

## ❌ Masalah

- ✅ Notifikasi "Link berhasil disimpan" muncul
- ❌ Setelah refresh, link kembali ke default
- ❌ Di device lain, link tidak berubah

**Penyebab:** Data tidak benar-benar tersimpan ke Supabase database.

---

## 🔧 SOLUSI LENGKAP - IKUTI STEP BY STEP

### **STEP 1: Login ke Supabase Dashboard**

1. Buka https://supabase.com/dashboard
2. Login dengan akun Supabase Anda
3. Pilih project: **zbexsukhqcgmzgqapoii**
4. Jika tidak bisa akses, kemungkinan project ini milik akun lain

---

### **STEP 2: Cek Apakah Tabel Sudah Ada**

1. Klik menu **Database** di sidebar kiri
2. Klik tab **Tables**
3. Cari tabel bernama **`dashboard_links`**

#### ✅ Jika Tabel SUDAH ADA:
Lanjut ke **STEP 3**

#### ❌ Jika Tabel BELUM ADA:
Lanjut ke **STEP 2A**

---

### **STEP 2A: Buat Tabel `dashboard_links`**

1. Klik menu **SQL Editor** di sidebar
2. Klik **New query**
3. Copy-paste SQL ini:

```sql
-- Buat tabel dashboard_links
CREATE TABLE IF NOT EXISTS dashboard_links (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  label TEXT DEFAULT 'Lihat Dashboard Lengkap',
  dashboard_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Insert data default untuk 3 dashboard
INSERT INTO dashboard_links (url, label, dashboard_index, is_active) VALUES
  ('#', 'Dashboard Ekonomi Regional', 0, true),
  ('#', 'Dashboard Realisasi Belanja', 1, true),
  ('#', 'Dashboard Monitoring Kinerja', 2, true)
ON CONFLICT DO NOTHING;
```

4. Klik **Run** atau tekan **Ctrl + Enter**
5. Pastikan muncul pesan **Success**

---

### **STEP 3: Setup Row Level Security (RLS) Policies**

**PENTING:** Tanpa RLS policies yang benar, data tidak bisa disimpan atau dibaca!

1. Tetap di **SQL Editor**
2. Klik **New query**
3. Copy-paste SQL ini:

```sql
-- 1. Enable RLS
ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies jika ada (untuk reset)
DROP POLICY IF EXISTS "Public can read dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Public can insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Public can update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Admin can update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Admin can insert dashboard links" ON dashboard_links;

-- 3. Create new policies yang BENAR
-- Allow PUBLIC READ (tanpa login)
CREATE POLICY "Allow public read dashboard links"
  ON dashboard_links
  FOR SELECT
  USING (true);

-- Allow PUBLIC INSERT (untuk admin yang belum implement auth)
CREATE POLICY "Allow public insert dashboard links"
  ON dashboard_links
  FOR INSERT
  WITH CHECK (true);

-- Allow PUBLIC UPDATE (untuk admin yang belum implement auth)
CREATE POLICY "Allow public update dashboard links"
  ON dashboard_links
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow PUBLIC DELETE (untuk admin yang belum implement auth)
CREATE POLICY "Allow public delete dashboard links"
  ON dashboard_links
  FOR DELETE
  USING (true);
```

4. Klik **Run**
5. Pastikan muncul **Success**

**⚠️ CATATAN KEAMANAN:**
Policies di atas mengizinkan public access karena website ini belum implement authentication. Di production, sebaiknya gunakan proper auth atau API keys.

---

### **STEP 4: Verifikasi Data di Table**

1. Klik menu **Database** > **Tables**
2. Klik tabel **dashboard_links**
3. Lihat tab **Data**
4. Pastikan ada **3 rows** dengan dashboard_index 0, 1, 2

**Expected data:**

| id | url | label | dashboard_index | is_active |
|----|-----|-------|-----------------|-----------|
| 1  | #   | Dashboard Ekonomi Regional | 0 | true |
| 2  | #   | Dashboard Realisasi Belanja | 1 | true |
| 3  | #   | Dashboard Monitoring Kinerja | 2 | true |

---

### **STEP 5: Enable Realtime (untuk sync antar device)**

1. Klik menu **Database** > **Replication**
2. Scroll cari tabel **dashboard_links**
3. **Toggle ON** switch di kolom "Realtime"
4. Pastikan muncul indikator hijau/enabled

---

### **STEP 6: Test Save dari Website**

1. Buka website Anda
2. **Clear localStorage** dulu:
   - Tekan **F12** untuk buka Console
   - Ketik: `localStorage.clear()`
   - Tekan Enter
3. **Refresh** halaman
4. **Login sebagai admin**
5. **Edit link Dashboard 1** dengan URL test: `https://test.com`
6. **Save**
7. Buka **Supabase** > **Database** > **Tables** > **dashboard_links**
8. **Refresh** table
9. **Cek kolom URL** - harus berubah jadi `https://test.com`

---

### **STEP 7: Test Sync Antar Device**

1. **Buka website di 2 tab berbeda**
2. **Tab 1:** Login admin, edit link
3. **Tab 2:** Tunggu 2-3 detik
4. **Tab 2:** Link harus **otomatis berubah** tanpa refresh

Jika tidak berubah otomatis, cek:
- ✅ Realtime sudah enabled di STEP 5
- ✅ Tidak ada error di Console browser (F12)

---

## 🔍 Cara Cek Error

### Di Console Browser:

1. Tekan **F12**
2. Buka tab **Console**
3. Edit link di website
4. Lihat log yang muncul

**Good logs (sukses):**
```
✅ Using new schema with dashboard_index
✅ Dashboard 1 saved (new schema)
```

**Bad logs (error):**
```
Supabase save failed: { code: "42501", message: "permission denied" }
```

**Error code 42501 = RLS policies salah** → Ulangi STEP 3

---

## 🔧 Troubleshooting by Error

### Error: "permission denied for table dashboard_links"

**Fix:** Ulangi **STEP 3** untuk setup RLS policies yang benar.

### Error: "relation dashboard_links does not exist"

**Fix:** Ulangi **STEP 2A** untuk buat tabel.

### Error: "column dashboard_index does not exist"

**Fix:** Jalankan SQL ini di SQL Editor:

```sql
ALTER TABLE dashboard_links 
ADD COLUMN IF NOT EXISTS dashboard_index INTEGER DEFAULT 0;

UPDATE dashboard_links 
SET dashboard_index = 0 
WHERE dashboard_index IS NULL;
```

### Data tidak sync antar device

**Fix:** 
1. Pastikan Realtime enabled (STEP 5)
2. Clear localStorage di semua device
3. Refresh semua tab

---

## 📋 Quick Checklist

Centang semua ini:

- [ ] Tabel `dashboard_links` sudah dibuat (STEP 2A)
- [ ] RLS policies sudah dibuat (STEP 3)
- [ ] Ada 3 rows data di table (STEP 4)
- [ ] Realtime sudah enabled (STEP 5)
- [ ] Test save berhasil update di Supabase (STEP 6)
- [ ] Test sync antar device berhasil (STEP 7)

---

## 🎯 Summary

**Masalah utama:** RLS policies belum dibuat atau salah.

**Solusi:** Jalankan STEP 1-5 di atas dengan teliti.

**Hasil akhir:**
- ✅ Data tersimpan ke Supabase
- ✅ Sync antar device otomatis
- ✅ Setelah refresh, link tetap tersimpan

---

## ❓ Masih Bermasalah?

1. Screenshot **Supabase Tables** yang menunjukkan data `dashboard_links`
2. Screenshot **Console browser** yang menunjukkan error
3. Pastikan project ID benar: `zbexsukhqcgmzgqapoii`

---

**MULAI DARI STEP 1 SEKARANG!** 🚀
