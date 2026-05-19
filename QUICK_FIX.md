# ⚡ QUICK FIX - Data Tidak Tersimpan

## 🚀 Solusi Cepat (3 Langkah)

### **LANGKAH 1: Login Supabase**
1. Buka: https://supabase.com/dashboard
2. Login dengan akun Anda
3. Pilih project: **zbexsukhqcgmzgqapoii**

---

### **LANGKAH 2: Run SQL**

1. Klik menu **SQL Editor** di sidebar kiri
2. Klik **New query**
3. Copy-paste SQL ini:

```sql
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

DELETE FROM dashboard_links WHERE dashboard_index IN (0, 1, 2);

INSERT INTO dashboard_links (url, label, dashboard_index, is_active) VALUES
  ('#', 'Dashboard Ekonomi Regional', 0, true),
  ('#', 'Kredit Usaha Rakyat', 1, true),
  ('#', 'Indikator Kinerja Pelaksanaan Anggaran (IKPA)', 2, true);

ALTER TABLE dashboard_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public insert dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public update dashboard links" ON dashboard_links;
DROP POLICY IF EXISTS "Allow public delete dashboard links" ON dashboard_links;

CREATE POLICY "Allow public read dashboard links"
  ON dashboard_links FOR SELECT USING (true);

CREATE POLICY "Allow public insert dashboard links"
  ON dashboard_links FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update dashboard links"
  ON dashboard_links FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete dashboard links"
  ON dashboard_links FOR DELETE USING (true);
```

4. Klik **Run** (atau Ctrl+Enter)
5. Tunggu sampai muncul **Success**

---

### **LANGKAH 3: Enable Realtime**

1. Klik menu **Database** > **Replication**
2. Scroll cari tabel **dashboard_links**
3. **Toggle ON** switch di kolom "Realtime"
4. Pastikan muncul indikator hijau

---

## ✅ TEST

1. Buka website Anda
2. Tekan **F12**, ketik di Console:
   ```javascript
   localStorage.clear()
   ```
3. Refresh halaman
4. Login admin, edit Dashboard 1 dengan URL: `https://test.com`
5. **Refresh halaman** → URL harus tetap `https://test.com` ✅
6. **Buka tab baru** → URL harus sama ✅

---

## 🔍 CEK DI SUPABASE

1. **Database** > **Tables** > **dashboard_links**
2. Klik tab **Data**
3. Harus ada **3 rows**
4. Row pertama URL-nya harus berubah jadi `https://test.com`

---

## ❌ Jika Masih Error

### Error saat run SQL:
**Sudah pernah run sebelumnya?** Itu normal, abaikan error dan lanjut ke LANGKAH 3.

### Data tidak tersimpan:
1. Pastikan **Realtime sudah ON** (LANGKAH 3)
2. Clear localStorage: `localStorage.clear()`
3. Refresh halaman
4. Coba edit lagi

### Link tidak sync antar device:
- Pastikan **Realtime enabled**
- Clear localStorage di **SEMUA** device
- Refresh semua tab

---

## 🎯 DONE!

Setelah 3 langkah di atas:
- ✅ Data tersimpan ke Supabase
- ✅ Sync antar device otomatis
- ✅ Setelah refresh tetap tersimpan

**SELESAI!** 🎉
