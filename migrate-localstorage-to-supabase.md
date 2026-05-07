# 📦 Migration Guide: localStorage → Supabase

Panduan untuk memindahkan data existing dari localStorage ke Supabase database.

---

## ⚠️ Kapan Menggunakan Migration Ini?

Migration ini diperlukan jika:
- ✅ Sudah ada data dokumentasi di localStorage (dari development)
- ✅ Ingin memindahkan data admin/links yang sudah diedit
- ✅ Ingin preserve data existing saat switch ke Supabase

Jika fresh install (tidak ada data), **SKIP migration ini**.

---

## 📋 Pre-Migration Checklist

- [ ] Supabase sudah setup (`supabase-setup.sql` sudah dijalankan)
- [ ] Aplikasi sudah bisa connect ke Supabase
- [ ] `.env` sudah dikonfigurasi dengan benar
- [ ] Backup localStorage data (export dari DevTools)

---

## 🔍 Step 1: Cek Data di localStorage

### 1.1 Buka Browser DevTools
1. Buka aplikasi di browser
2. Tekan `F12` atau `Ctrl+Shift+I`
3. Klik tab **"Application"** (Chrome) atau **"Storage"** (Firefox)
4. Klik **"Local Storage"** → pilih domain aplikasi

### 1.2 Identifikasi Keys yang Perlu di-Migrate

Cari keys berikut:
- `ragit_admin_user` - Data admin yang login
- `ragit_dokumentasi_items` - Array dokumentasi kegiatan
- `ragit_dashboard_url` - URL dashboard (jika pernah diedit)
- `ragit_lms_url` - URL LMS (jika pernah diedit)

### 1.3 Export Data

Untuk setiap key:
1. Klik key
2. Copy value (JSON string)
3. Paste ke text editor
4. Save sebagai backup

**Contoh:**
```json
// File: backup-localStorage.json
{
  "ragit_admin_user": {...},
  "ragit_dokumentasi_items": [...],
  "ragit_dashboard_url": "https://...",
  "ragit_lms_url": "https://..."
}
```

---

## 🔄 Step 2: Migration Scripts

### Option A: Manual Migration via SQL

#### 2.1 Migrate Dashboard URL
Jika ada custom dashboard URL:

```sql
UPDATE dashboard_links
SET 
  url = 'YOUR_CUSTOM_DASHBOARD_URL',
  updated_at = NOW()
WHERE id = 1;
```

#### 2.2 Migrate LMS URL
Jika ada custom LMS URL:

```sql
UPDATE lms_links
SET 
  url = 'YOUR_CUSTOM_LMS_URL',
  updated_at = NOW()
WHERE id = 1;
```

#### 2.3 Migrate Dokumentasi
Untuk setiap dokumentasi di localStorage:

```sql
-- Insert dokumentasi
INSERT INTO dokumentasi_kegiatan (
  title,
  description,
  date,
  pic_name,
  unit,
  cover_image,
  is_published
) VALUES (
  'Judul Kegiatan',
  'Deskripsi lengkap...',
  '15 Desember 2025',
  'Nama PIC',
  'Nama Unit',
  'https://images.unsplash.com/...',
  true
) RETURNING id;

-- Catat ID yang di-return (misal: 10)
-- Lalu insert links untuk dokumentasi tersebut:

INSERT INTO dokumentasi_links (dokumentasi_id, label, url, display_order)
VALUES 
  (10, 'Google Drive - Foto', 'https://drive.google.com/...', 1),
  (10, 'Artikel Berita', 'https://berita.com/...', 2);
```

---

### Option B: Migration via Application Code

Jika banyak data, gunakan kode JavaScript di browser console.

#### 2.1 Setup

1. Pastikan sudah login sebagai admin
2. Buka DevTools → Console
3. Paste kode berikut:

```javascript
// Migration Script - localStorage to Supabase
// RUN THIS IN BROWSER CONSOLE

(async function migrateToSupabase() {
  console.log('🚀 Starting migration...');
  
  // Get Supabase client (asumsi sudah ada di window)
  // Note: Adjust sesuai struktur aplikasi Anda
  const supabase = window.supabase; 
  
  if (!supabase) {
    console.error('❌ Supabase client not found!');
    return;
  }
  
  // 1. Migrate Dashboard URL
  const dashboardUrl = localStorage.getItem('ragit_dashboard_url');
  if (dashboardUrl) {
    console.log('📊 Migrating dashboard URL...');
    const { error: dashError } = await supabase
      .from('dashboard_links')
      .update({ url: dashboardUrl })
      .eq('id', 1);
    
    if (dashError) console.error('❌ Dashboard URL error:', dashError);
    else console.log('✅ Dashboard URL migrated');
  }
  
  // 2. Migrate LMS URL
  const lmsUrl = localStorage.getItem('ragit_lms_url');
  if (lmsUrl) {
    console.log('📚 Migrating LMS URL...');
    const { error: lmsError } = await supabase
      .from('lms_links')
      .update({ url: lmsUrl })
      .eq('id', 1);
    
    if (lmsError) console.error('❌ LMS URL error:', lmsError);
    else console.log('✅ LMS URL migrated');
  }
  
  // 3. Migrate Dokumentasi
  const dokumentasiJson = localStorage.getItem('ragit_dokumentasi_items');
  if (dokumentasiJson) {
    console.log('📁 Migrating dokumentasi...');
    const dokumentasi = JSON.parse(dokumentasiJson);
    
    for (const dok of dokumentasi) {
      // Insert dokumentasi
      const { data: newDok, error: dokError } = await supabase
        .from('dokumentasi_kegiatan')
        .insert({
          title: dok.title,
          description: dok.description,
          date: dok.date,
          pic_name: dok.picName || null,
          unit: dok.unit || null,
          cover_image: dok.coverImage,
          is_published: true
        })
        .select()
        .single();
      
      if (dokError) {
        console.error(`❌ Error inserting "${dok.title}":`, dokError);
        continue;
      }
      
      console.log(`✅ Inserted: ${dok.title} (ID: ${newDok.id})`);
      
      // Insert links jika ada
      if (dok.links && dok.links.length > 0) {
        const linksToInsert = dok.links.map((link, index) => ({
          dokumentasi_id: newDok.id,
          label: link.label,
          url: link.url,
          display_order: index + 1
        }));
        
        const { error: linksError } = await supabase
          .from('dokumentasi_links')
          .insert(linksToInsert);
        
        if (linksError) {
          console.error(`❌ Error inserting links for "${dok.title}":`, linksError);
        } else {
          console.log(`  ✅ Inserted ${dok.links.length} link(s)`);
        }
      }
    }
  }
  
  console.log('🎉 Migration completed!');
  console.log('📝 Please verify data in Supabase Dashboard');
})();
```

#### 2.2 Run Migration

1. Copy seluruh kode di atas
2. Paste di Console
3. Tekan Enter
4. Tunggu sampai selesai
5. Cek log untuk errors

---

## ✅ Step 3: Verification

### 3.1 Cek di Supabase Dashboard

1. Login ke Supabase Dashboard
2. Klik **"Table Editor"**
3. Verifikasi data:

**dashboard_links:**
- [ ] URL sesuai dengan localStorage

**lms_links:**
- [ ] URL sesuai dengan localStorage

**dokumentasi_kegiatan:**
- [ ] Jumlah rows sesuai
- [ ] Data lengkap (title, description, date, etc)

**dokumentasi_links:**
- [ ] Jumlah rows sesuai
- [ ] dokumentasi_id correct
- [ ] URL valid

### 3.2 Cek di Aplikasi

1. Refresh aplikasi
2. Verifikasi:
   - [ ] Dokumentasi muncul di carousel
   - [ ] Klik dokumentasi → Detail benar
   - [ ] Links dokumentasi terlihat
   - [ ] Dashboard URL benar
   - [ ] LMS URL benar

---

## 🧹 Step 4: Cleanup localStorage

**⚠️ HANYA jalankan setelah verifikasi berhasil!**

### 4.1 Backup Sekali Lagi

Export localStorage data sekali lagi sebagai backup final.

### 4.2 Clear localStorage

Di Console, jalankan:

```javascript
// Hapus keys yang sudah dimigrate
localStorage.removeItem('ragit_dokumentasi_items');
localStorage.removeItem('ragit_dashboard_url');
localStorage.removeItem('ragit_lms_url');

// Optional: Clear semua localStorage (hati-hati!)
// localStorage.clear();

console.log('✅ localStorage cleaned');
```

### 4.3 Test Aplikasi

1. Refresh page
2. Verifikasi data masih muncul (sekarang dari Supabase)
3. Test CRUD operations
4. Verifikasi perubahan tersimpan di Supabase

---

## 🔙 Rollback Plan

Jika migration gagal:

### Plan A: Restore dari Backup localStorage

```javascript
// Di Console
const backup = {
  "ragit_dokumentasi_items": [...], // paste data backup
  "ragit_dashboard_url": "...",
  "ragit_lms_url": "..."
};

for (const [key, value] of Object.entries(backup)) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}

console.log('✅ localStorage restored');
location.reload();
```

### Plan B: Restore Supabase dari SQL Backup

```sql
-- Hapus data yang salah
DELETE FROM dokumentasi_links;
DELETE FROM dokumentasi_kegiatan WHERE id > 3; -- Keep sample data

-- Restore dari backup
-- (paste SQL backup Anda)
```

---

## 📊 Migration Checklist

**Pre-Migration:**
- [ ] Supabase setup complete
- [ ] localStorage data backed up
- [ ] Connection tested

**Migration:**
- [ ] Dashboard URL migrated
- [ ] LMS URL migrated
- [ ] Dokumentasi migrated
- [ ] Links migrated
- [ ] No errors in console

**Verification:**
- [ ] Data in Supabase verified
- [ ] Data in app verified
- [ ] CRUD operations working
- [ ] All links clickable

**Post-Migration:**
- [ ] localStorage cleaned
- [ ] Final backup created
- [ ] Rollback plan ready (if needed)

---

## 🎯 Migration Status

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Completed

**Data Migrated:**
- Dashboard URL: ⬜
- LMS URL: ⬜
- Dokumentasi: ___ / ___ items
- Links: ___ / ___ items

**Issues**: _________________________________

**Notes**: _________________________________

---

## 💡 Tips

1. **Migrate in stages** - Test dengan 1-2 dokumentasi dulu
2. **Keep backup** - Jangan hapus localStorage sampai 100% yakin
3. **Verify images** - Pastikan URL cover images masih valid
4. **Test thoroughly** - Test semua fitur setelah migration
5. **Document issues** - Catat error untuk troubleshooting

---

## 🆘 Troubleshooting

### Error: "Supabase client not found"
**Solution**: Migration script perlu disesuaikan dengan struktur kode Anda.
Pastikan Supabase client accessible di browser console.

### Error: "Foreign key violation"
**Solution**: Insert dokumentasi_kegiatan dulu, baru dokumentasi_links.
Jangan insert links tanpa parent dokumentasi.

### Error: "Duplicate key value"
**Solution**: Data sudah ada di Supabase. 
Cek dengan query: `SELECT * FROM dokumentasi_kegiatan`

### Images tidak muncul setelah migration
**Solution**: Cek apakah URL cover_image masih valid.
Jika menggunakan Unsplash, URL bisa berubah. Upload ulang jika perlu.

---

**🎉 Migration Complete! Data Anda sekarang tersimpan di Supabase cloud database.**
