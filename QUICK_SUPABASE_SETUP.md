# ⚡ Quick Supabase Setup - 5 Langkah

**Status Saat Ini**: ✅ OAuth user created + SQL setup done  
**Waktu Setup**: ~10 menit  
**Target**: Supabase fully operational

---

## 📋 Checklist (Centang setelah selesai)

- [x] **Step 0**: OAuth user created ✅
- [x] **Step 1**: Run `supabase-setup.sql` ✅
- [ ] **Step 2**: Create storage bucket
- [ ] **Step 3**: Setup RLS policies
- [ ] **Step 4**: Setup storage policies
- [ ] **Step 5**: Test connection

---

## 🚀 STEP 2: Create Storage Bucket (2 menit)

### Quick Actions:

1. **Buka**: https://app.supabase.com/project/zbexsukhqcgmzgqapoii/storage/buckets

2. **Klik**: "New bucket" (tombol hijau)

3. **Fill form**:
   ```
   Name: dokumentasi-images
   Public bucket: ✅ (CENTANG INI!)
   ```

4. **Klik**: "Create bucket"

5. **Verify**: Bucket `dokumentasi-images` muncul di list

✅ **Done! Lanjut Step 3**

---

## 🚀 STEP 3: Setup RLS Policies (2 menit)

### Quick Actions:

1. **Buka**: https://app.supabase.com/project/zbexsukhqcgmzgqapoii/editor

2. **Klik**: "SQL Editor" (sidebar kiri)

3. **Klik**: "New query"

4. **Copy-paste** isi file `supabase-rls-policies.sql`

5. **Klik**: "Run" (atau Ctrl+Enter)

6. **Verify**: Lihat output, harus ada:
   - Table 1: RLS enabled untuk 3 tables
   - Table 2: List 8 policies

✅ **Done! Lanjut Step 4**

---

## 🚀 STEP 4: Setup Storage Policies (2 menit)

### Quick Actions:

1. **Masih di SQL Editor**

2. **New query**

3. **Copy-paste** isi file `supabase-storage-policies.sql`

4. **Run**

5. **Verify**: Output menunjukkan 4 policies created

✅ **Done! Lanjut Step 5**

---

## 🚀 STEP 5: Test Connection (3 menit)

### Quick Actions:

1. **Buka terminal** di project folder

2. **Run test**:
   ```bash
   node test-supabase-connection.js
   ```

3. **Expected output**:
   ```
   🧪 Testing Supabase Connection...
   
   1️⃣ Testing TABLE: external_links
   ✅ Success! Found 2 links
   
   2️⃣ Testing TABLE: dokumentasi
   ✅ Success! Found 5 dokumentasi items
   
   3️⃣ Testing TABLE: admin_users
   ✅ Success! Found 1 admin user(s)
   
   4️⃣ Testing STORAGE: Buckets
   ✅ Success! Found 1 bucket(s)
   ✅ Bucket "dokumentasi-images" found!
   
   🎉 ALL TESTS PASSED!
   ```

4. **Jika ada error**: Check `SUPABASE_NEXT_STEPS.md` → Troubleshooting

✅ **Done! Supabase READY!**

---

## 🎉 Setelah Semua Steps Selesai

**Supabase Status**: ✅ FULLY OPERATIONAL

**Anda bisa**:
- ✅ CRUD data dari aplikasi
- ✅ Upload images ke storage
- ✅ Sync data across devices
- ✅ Deploy ke production

**Next Actions**:
1. Test di aplikasi lokal: `npm run dev`
2. Test login admin & CRUD operations
3. Deploy ke Vercel: Buka `START_DEPLOYMENT.md`

---

## 📁 Files Reference

| File | Purpose | When to Use |
|------|---------|-------------|
| `SUPABASE_NEXT_STEPS.md` | Detailed step-by-step guide | Jika perlu penjelasan lengkap |
| `supabase-rls-policies.sql` | RLS policies untuk tables | STEP 3 |
| `supabase-storage-policies.sql` | Storage policies untuk images | STEP 4 |
| `test-supabase-connection.js` | Test script | STEP 5 |
| `supabase-setup.sql` | Initial setup (already done ✅) | - |

---

## 🆘 Troubleshooting Quick Fix

### ❌ Test failed: "permission denied"
**Fix**: Run `supabase-rls-policies.sql` lagi

### ❌ Test failed: "table does not exist"
**Fix**: Run `supabase-setup.sql` lagi

### ❌ Test failed: "bucket not found"
**Fix**: Create bucket di STEP 2

### ❌ Node error: "Cannot find module"
**Fix**: 
```bash
npm install @supabase/supabase-js
node test-supabase-connection.js
```

---

## 🎯 Current Status

**Completed**:
- [x] Supabase project created
- [x] OAuth configured
- [x] Database tables created
- [x] Sample data inserted

**Remaining** (10 menit):
- [ ] Storage bucket (2 min)
- [ ] RLS policies (2 min)
- [ ] Storage policies (2 min)
- [ ] Test connection (3 min)

**Total**: ~10 minutes to complete! 🚀

---

## 📞 Next Step

**ACTION NOW**: Lanjut ke **STEP 2** di atas! ⬆️

Atau buka `SUPABASE_NEXT_STEPS.md` untuk detailed guide.

---

**Last Updated**: 5 Maret 2026
