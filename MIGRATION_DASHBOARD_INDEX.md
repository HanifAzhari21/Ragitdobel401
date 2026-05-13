# 🔄 Migration: Menambahkan Kolom `dashboard_index` 

## Masalah

Sebelumnya, **hanya Dashboard pertama** yang bisa disimpan dan sync ke Supabase. Dashboard kedua dan ketiga tidak tersimpan.

## Solusi

Menambahkan kolom `dashboard_index` agar **semua 3 dashboard** bisa disimpan dan sync secara terpisah.

---

## 📋 Langkah Migrasi

### Opsi 1: Jika Tabel Belum Ada (Setup Baru)

Jalankan SQL dari `SUPABASE_SETUP.md` yang sudah include kolom `dashboard_index`.

### Opsi 2: Jika Tabel Sudah Ada (Migrasi)

Jalankan SQL berikut di **Supabase SQL Editor**:

```sql
-- 1. Tambahkan kolom dashboard_index
ALTER TABLE dashboard_links 
ADD COLUMN IF NOT EXISTS dashboard_index INTEGER DEFAULT 0;

-- 2. Update existing row menjadi dashboard index 0
UPDATE dashboard_links 
SET dashboard_index = 0 
WHERE dashboard_index IS NULL;

-- 3. Insert default untuk dashboard 2 dan 3
INSERT INTO dashboard_links (url, label, dashboard_index, is_active) 
VALUES 
  ('#', 'Dashboard Realisasi Belanja', 1, true),
  ('#', 'Dashboard Monitoring Kinerja', 2, true)
ON CONFLICT DO NOTHING;

-- 4. Verify data
SELECT id, label, dashboard_index, url, is_active 
FROM dashboard_links 
ORDER BY dashboard_index;
```

### Expected Result:

| id | label | dashboard_index | url | is_active |
|----|-------|-----------------|-----|-----------|
| 1  | Dashboard Ekonomi Regional | 0 | (your_url) | true |
| 2  | Dashboard Realisasi Belanja | 1 | # | true |
| 3  | Dashboard Monitoring Kinerja | 2 | # | true |

---

## ✅ Verifikasi

Setelah migrasi:

1. **Refresh website** di semua device
2. **Login sebagai admin**
3. **Edit link** di Dashboard 2 atau 3
4. **Cek di device lain** - link harus otomatis berubah!

---

## 🔄 Realtime Subscription

Pastikan **Realtime tetap enabled** untuk tabel `dashboard_links` setelah migrasi:

1. Buka **Supabase Dashboard** > **Database** > **Replication**
2. Centang **dashboard_links** untuk enable Realtime

---

## 📊 Struktur Data Baru

**Sebelum:**
- Hanya 1 row untuk Dashboard Ekonomi Regional
- Dashboard 2 & 3 tidak tersimpan

**Setelah:**
- 3 rows terpisah untuk 3 dashboard berbeda
- Semua dashboard bisa sync antar device
- Menggunakan `dashboard_index` (0, 1, 2) sebagai identifier

---

## ⚠️ Important Notes

- **localStorage keys berubah** dari `dashboardUrl` menjadi `dashboardUrl_0`, `dashboardUrl_1`, `dashboardUrl_2`
- Jika sudah ada link tersimpan di localStorage lama, akan otomatis fallback ke link lama untuk dashboard pertama
- Setelah migrasi, clear localStorage browser jika ada masalah: `localStorage.clear()`

---

## 🐛 Troubleshooting

### Link dashboard 2 & 3 tidak tersimpan?

1. ✅ Cek kolom `dashboard_index` sudah ada di tabel
2. ✅ Cek ada 3 rows di tabel dengan `dashboard_index` 0, 1, 2
3. ✅ Clear localStorage: `localStorage.clear()` di Console browser
4. ✅ Refresh halaman dan coba edit link lagi

### Error "PGRST116" atau "no rows found"?

Ini normal! Kode akan otomatis insert row baru jika belum ada.

---

## 🎯 Summary

**Before:** Dashboard 2 & 3 tidak sync ❌  
**After:** Semua 3 dashboard bisa sync antar device ✅

**Action Required:** Jalankan migration SQL di atas di Supabase SQL Editor.
