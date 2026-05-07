# 🔧 PANDUAN FIX ERROR - Ragit Dobel 4.0

## ❌ Error yang Muncul:
```
Could not find the table 'public.external_links' in the schema cache
Could not find the table 'public.dashboard_links' in the schema cache
Could not find the table 'public.lms_links' in the schema cache
```

## ✅ SOLUSI: Jalankan Setup SQL

Error ini terjadi karena **table belum dibuat** di Supabase database. Ikuti langkah berikut:

---

## 📋 LANGKAH LENGKAP:

### **STEP 1: Buka Supabase SQL Editor**

1. Buka browser, kunjungi: **https://app.supabase.com/project/zbexsukhqcgmzgqapoii/sql**
2. Atau navigasi manual:
   - Login ke Supabase Dashboard
   - Pilih project **"Ragit Dobel 4.0"**
   - Klik **"SQL Editor"** di sidebar kiri (icon ⚡)

---

### **STEP 2: Buat Query Baru**

1. Klik tombol **"+ New query"** di pojok kanan atas
2. Akan muncul editor SQL kosong

---

### **STEP 3: Copy-Paste SQL Setup**

1. Buka file `/supabase-setup.sql` di project Anda
2. **COPY SEMUA ISI FILE** (dari baris 1 sampai akhir - sekitar 280 baris)
3. **PASTE** ke SQL Editor

---

### **STEP 4: Jalankan Query**

1. Klik tombol **"Run"** (pojok kanan bawah)
2. Atau tekan **Ctrl + Enter** (Windows) / **Cmd + Enter** (Mac)
3. Tunggu 3-5 detik

---

### **STEP 5: Verifikasi Hasil**

Jika berhasil, Anda akan melihat output seperti ini di bagian bawah:

```
✅ Success. No rows returned
```

Atau ada message seperti:
```
CREATE TABLE
INSERT 0 1
CREATE POLICY
...
```

---

### **STEP 6: Cek Table Sudah Terbuat**

1. Klik **"Table Editor"** di sidebar kiri
2. Anda harus melihat **5 tables baru**:
   - ✅ `admin_users`
   - ✅ `dashboard_links`
   - ✅ `lms_links`
   - ✅ `dokumentasi_kegiatan`
   - ✅ `dokumentasi_links`

---

### **STEP 7: Test Aplikasi**

1. Refresh halaman website Anda
2. Buka **Console** (F12) di browser
3. **Error seharusnya HILANG!** ✅

Kalau masih ada error, lihat di Console dan laporkan ke saya.

---

## 📊 CARA CEK DATA DI TABLE:

### **Cek Dashboard Links:**
```sql
SELECT * FROM dashboard_links;
```
Expected output:
```
| id | url                                    | label                      | is_active |
|----|----------------------------------------|----------------------------|-----------|
| 1  | https://lookerstudio.google.com/...    | Lihat Dashboard Lengkap   | true      |
```

### **Cek LMS Links:**
```sql
SELECT * FROM lms_links;
```
Expected output:
```
| id | url                     | label          | is_active |
|----|-------------------------|----------------|-----------|
| 1  | https://lms.example.com | Masuk ke LMS  | true      |
```

### **Cek Admin Users:**
```sql
SELECT username, full_name, created_at FROM admin_users;
```
Expected output:
```
| username      | full_name                      | created_at               |
|---------------|--------------------------------|--------------------------|
| RagitAdmin1   | Administrator Ragit Dobel 4.0  | 2025-03-27 10:30:00+00   |
```

---

## 🆘 TROUBLESHOOTING:

### **Error: "syntax error at or near..."**
**Penyebab**: Copy SQL tidak lengkap atau terpotong

**Solusi**:
1. Pastikan Anda copy SELURUH isi file `supabase-setup.sql`
2. Jangan copy sebagian-sebagian
3. Paste ulang dan Run lagi

---

### **Error: "relation already exists"**
**Penyebab**: Table sudah pernah dibuat sebelumnya

**Solusi**: 
- Ini **BUKAN error!** ✅
- SQL menggunakan `CREATE TABLE IF NOT EXISTS`
- Table yang sudah ada tidak akan di-replace
- Query tetap berhasil!

---

### **Error: "permission denied"**
**Penyebab**: Akun Anda tidak punya akses ke project

**Solusi**:
1. Pastikan Anda login dengan akun yang benar
2. Pastikan Anda owner/admin dari project ini
3. Coba logout dan login ulang

---

### **Setelah Run SQL, Website Masih Error**
**Solusi**:
1. **Refresh browser** (Ctrl + F5 / Cmd + Shift + R)
2. **Clear cache** browser
3. Buka **Console** (F12) dan lihat error message terbaru
4. Cek apakah ada error lain selain "table not found"

---

## ✅ CHECKLIST SETELAH FIX:

- [ ] SQL setup sudah dijalankan tanpa error
- [ ] 5 tables terlihat di Table Editor
- [ ] Error "table not found" hilang dari Console
- [ ] Website bisa dibuka tanpa error
- [ ] Login admin berhasil (RagitAdmin1 / SayaAdmin1234)
- [ ] Bisa edit link Dashboard
- [ ] Bisa edit link LMS
- [ ] Data tersimpan dan terlihat di device lain

---

## 🎯 NEXT STEPS SETELAH FIX:

Setelah error fix, lanjutkan dengan:

1. **STEP 2**: Create Storage Bucket `dokumentasi-images`
   - Buka: Storage → New Bucket
   - Name: `dokumentasi-images`
   - Public: ✅ Yes

2. **STEP 3**: Run `supabase-rls-policies.sql`
   - Untuk security policies

3. **STEP 4**: Run `supabase-storage-policies.sql`
   - Untuk storage bucket policies

4. **STEP 5**: Test Connection
   - Run: `node test-supabase-connection.js`

---

## 💡 TIPS:

- **Simpan output SQL** untuk dokumentasi
- **Screenshot success message** jika berhasil
- **Jangan hapus file SQL** - Anda mungkin perlu run lagi
- **Backup data** sebelum run SQL di production

---

## 📞 BANTUAN:

Jika masih ada error setelah mengikuti panduan ini:

1. Screenshot error di Console (F12)
2. Screenshot output SQL Editor
3. Screenshot Table Editor (list tables)
4. Kirim ke saya untuk troubleshooting

---

**Status Update:** ⬜ Belum Fix | ⏳ Sedang Fix | ✅ Sudah Fix

**Tanggal Fix:** _____________

**Catatan:** _____________________________________________

---

**🎉 Selamat! Setelah fix, data link Dashboard & LMS akan tersimpan di cloud dan bisa diakses dari semua device!**
