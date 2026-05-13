# 🚀 Cara Setup Supabase - Panduan Super Simpel

## 🎯 Yang Harus Dilakukan

Notifikasi "Link berhasil disimpan" muncul tapi data tidak tersimpan? **RLS Policies belum dibuat!**

---

## 📋 LANGKAH MUDAH (5 Menit)

### **1️⃣ Login ke Supabase**

1. Buka: https://supabase.com/dashboard
2. Login dengan akun Anda
3. Pilih project: **zbexsukhqcgmzgqapoii**

### **2️⃣ Buka SQL Editor**

1. Klik menu **SQL Editor** di sidebar kiri
2. Klik tombol **New query**

### **3️⃣ Copy-Paste SQL**

1. Buka file `supabase_setup_complete.sql` yang saya buat
2. **Copy SEMUA isinya** (Ctrl+A, Ctrl+C)
3. **Paste** ke SQL Editor di Supabase (Ctrl+V)
4. Klik tombol **Run** (atau Ctrl+Enter)
5. Tunggu sampai muncul **Success** ✅

### **4️⃣ Enable Realtime**

1. Klik menu **Database** > **Replication**
2. Cari tabel **dashboard_links**
3. **Toggle ON** switch di kolom "Realtime"
4. Lakukan juga untuk **lms_links**

### **5️⃣ Test Website**

1. Buka website Anda
2. Tekan **F12**, ketik di Console: `localStorage.clear()`
3. **Refresh** halaman
4. **Login admin**, edit link Dashboard 1
5. **Refresh** halaman → link harus tetap tersimpan ✅
6. **Buka di tab baru** → link harus sama ✅

---

## ✅ Checklist Cepat

- [ ] SQL sudah di-run di Supabase (STEP 3)
- [ ] Realtime sudah enabled (STEP 4)
- [ ] Test save berhasil (STEP 5)
- [ ] Setelah refresh, link tetap tersimpan
- [ ] Di device lain, link sync otomatis

---

## ❌ Jika Masih Error

### Error: "permission denied"

**Solusi:** Ulangi STEP 3 - paste dan run SQL lagi

### Link tidak sync antar device

**Solusi:** 
1. Pastikan Realtime sudah ON (STEP 4)
2. Clear localStorage: `localStorage.clear()`
3. Refresh semua tab

### Data tidak tersimpan setelah refresh

**Solusi:**
1. Cek di Supabase: **Database** > **Tables** > **dashboard_links**
2. Lihat apakah ada 3 rows data
3. Jika tidak ada, ulangi STEP 3

---

## 🔍 Cara Cek Berhasil atau Tidak

### Di Supabase:

1. **Database** > **Tables** > **dashboard_links**
2. Klik tab **Data**
3. Harus ada **3 rows** seperti ini:

```
id | url | label                          | dashboard_index | is_active
1  | #   | Dashboard Ekonomi Regional     | 0               | true
2  | #   | Dashboard Realisasi Belanja    | 1               | true
3  | #   | Dashboard Monitoring Kinerja   | 2               | true
```

### Di Website:

1. Edit link Dashboard 1 dengan URL: `https://test123.com`
2. Refresh halaman
3. Link harus tetap `https://test123.com` (tidak kembali ke `#`)
4. Cek di Supabase Tables - URL di row 1 harus berubah jadi `https://test123.com`

---

## 📞 Masih Bingung?

Ikuti panduan detail di file:
- `SUPABASE_TROUBLESHOOTING.md` - Troubleshooting lengkap
- `supabase_setup_complete.sql` - SQL yang harus di-run

---

## 🎯 Summary

**Masalah:** Data tidak tersimpan ke Supabase  
**Penyebab:** RLS Policies belum dibuat  
**Solusi:** Run SQL file `supabase_setup_complete.sql` di Supabase SQL Editor  
**Waktu:** 5 menit  

**MULAI DARI STEP 1 SEKARANG!** 🚀
