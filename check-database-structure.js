import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbexsukhqcgmzgqapoii.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg'

const supabase = createClient(supabaseUrl, supabaseKey)

const requiredTables = [
  'admin_users',
  'dashboard_links',
  'lms_links',
  'dokumentasi_kegiatan',
  'dokumentasi_links'
]

async function checkDatabase() {
  console.log('🔍 CEK DATABASE SUPABASE - RAGIT DOBEL 4.0\n')
  console.log('=' .repeat(70))
  console.log(`📊 Database: ${supabaseUrl}`)
  console.log('=' .repeat(70))
  
  const results = {
    tables: {},
    data: {},
    storage: null
  }
  
  // Check each required table
  console.log('\n📋 MENGECEK TABEL YANG DIPERLUKAN...\n')
  console.log('-'.repeat(70))
  
  for (const tableName of requiredTables) {
    try {
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: false })
        .limit(5)
      
      if (error) {
        console.log(`❌ ${tableName.padEnd(30)} TIDAK ADA / ERROR`)
        console.log(`   Error: ${error.message}`)
        console.log(`   Code: ${error.code}`)
        results.tables[tableName] = { exists: false, error: error.message }
      } else {
        console.log(`✅ ${tableName.padEnd(30)} ADA (${count || 0} baris data)`)
        results.tables[tableName] = { 
          exists: true, 
          count: count || 0,
          sample: data || []
        }
        results.data[tableName] = data || []
      }
    } catch (e) {
      console.log(`❌ ${tableName.padEnd(30)} ERROR`)
      console.log(`   ${e.message}`)
      results.tables[tableName] = { exists: false, error: e.message }
    }
  }
  
  // Check specific data
  console.log('\n' + '-'.repeat(70))
  console.log('📊 DETAIL DATA\n')
  console.log('-'.repeat(70))
  
  // Check dashboard_links
  if (results.tables.dashboard_links?.exists) {
    console.log('\n🔗 DASHBOARD LINKS:')
    const dashboardData = results.data.dashboard_links
    if (dashboardData && dashboardData.length > 0) {
      dashboardData.forEach(link => {
        console.log(`   ID: ${link.id} | URL: ${link.url}`)
        console.log(`   Label: ${link.label} | Active: ${link.is_active}`)
        console.log(`   Updated: ${link.updated_at}`)
      })
    } else {
      console.log('   ⚠️  Tidak ada data')
    }
  }
  
  // Check lms_links
  if (results.tables.lms_links?.exists) {
    console.log('\n📚 LMS LINKS:')
    const lmsData = results.data.lms_links
    if (lmsData && lmsData.length > 0) {
      lmsData.forEach(link => {
        console.log(`   ID: ${link.id} | URL: ${link.url}`)
        console.log(`   Label: ${link.label} | Active: ${link.is_active}`)
        console.log(`   Updated: ${link.updated_at}`)
      })
    } else {
      console.log('   ⚠️  Tidak ada data')
    }
  }
  
  // Check dokumentasi_kegiatan
  if (results.tables.dokumentasi_kegiatan?.exists) {
    console.log('\n📸 DOKUMENTASI KEGIATAN:')
    const docsData = results.data.dokumentasi_kegiatan
    if (docsData && docsData.length > 0) {
      docsData.forEach(doc => {
        console.log(`   ID: ${doc.id} | ${doc.title}`)
        console.log(`   Date: ${doc.date} | PIC: ${doc.pic_name} | Unit: ${doc.unit}`)
        console.log(`   Published: ${doc.is_published}`)
      })
      if (docsData.length >= 5) {
        console.log(`   ... (showing 5 of ${results.tables.dokumentasi_kegiatan.count})`)
      }
    } else {
      console.log('   ⚠️  Tidak ada data')
    }
  }
  
  // Check storage buckets
  console.log('\n' + '-'.repeat(70))
  console.log('💾 STORAGE BUCKETS\n')
  console.log('-'.repeat(70))
  
  try {
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      console.log('❌ Error checking storage:', bucketsError.message)
      results.storage = { error: bucketsError.message }
    } else {
      console.log(`✅ Found ${buckets.length} bucket(s):`)
      buckets.forEach(bucket => {
        console.log(`   - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`)
      })
      
      const hasDocsImages = buckets.some(b => b.name === 'dokumentasi-images')
      if (hasDocsImages) {
        console.log('\n   ✅ Bucket "dokumentasi-images" sudah ada!')
      } else {
        console.log('\n   ⚠️  Bucket "dokumentasi-images" BELUM dibuat')
        console.log('   → Buat di: Supabase Dashboard → Storage → New Bucket')
      }
      
      results.storage = { buckets, hasDocsImages }
    }
  } catch (e) {
    console.log('❌ Error checking storage:', e.message)
    results.storage = { error: e.message }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70))
  console.log('📊 SUMMARY\n')
  console.log('='.repeat(70))
  
  const existingTables = Object.entries(results.tables)
    .filter(([_, info]) => info.exists)
  const missingTables = Object.entries(results.tables)
    .filter(([_, info]) => !info.exists)
  
  console.log(`✅ Tabel yang sudah ada: ${existingTables.length} dari ${requiredTables.length}`)
  existingTables.forEach(([name, info]) => {
    console.log(`   - ${name} (${info.count} baris)`)
  })
  
  if (missingTables.length > 0) {
    console.log(`\n❌ Tabel yang belum ada: ${missingTables.length}`)
    missingTables.forEach(([name, info]) => {
      console.log(`   - ${name}`)
      console.log(`     Error: ${info.error}`)
    })
  }
  
  // Storage summary
  if (results.storage?.hasDocsImages) {
    console.log(`\n✅ Storage bucket "dokumentasi-images" sudah ada`)
  } else if (results.storage?.buckets) {
    console.log(`\n⚠️  Storage bucket "dokumentasi-images" belum ada`)
  }
  
  console.log('\n' + '='.repeat(70))
  
  // Final verdict
  const allTablesExist = missingTables.length === 0
  const hasStorage = results.storage?.hasDocsImages || false
  
  if (allTablesExist && hasStorage) {
    console.log('\n🎉 DATABASE SUDAH LENGKAP & SIAP DIGUNAKAN!\n')
    console.log('✅ Semua tabel berhasil dibuat')
    console.log('✅ Storage bucket sudah dikonfigurasi')
    console.log('✅ Ready untuk production!')
  } else if (allTablesExist && !hasStorage) {
    console.log('\n⚠️  DATABASE HAMPIR LENGKAP\n')
    console.log('✅ Semua tabel berhasil dibuat')
    console.log('⚠️  Storage bucket belum dibuat (opsional)')
    console.log('\nUntuk membuat bucket:')
    console.log('1. Buka Supabase Dashboard → Storage')
    console.log('2. Klik "New Bucket"')
    console.log('3. Nama: dokumentasi-images')
    console.log('4. Public: Yes')
  } else {
    console.log('\n❌ DATABASE BELUM LENGKAP\n')
    console.log('🛠️  CARA MEMPERBAIKI:')
    console.log('1. Buka Supabase Dashboard:')
    console.log('   https://app.supabase.com/project/zbexsukhqcgmzgqapoii/editor')
    console.log('2. Pilih SQL Editor di sidebar')
    console.log('3. Klik "New Query"')
    console.log('4. Copy isi file "supabase-setup.sql"')
    console.log('5. Paste dan klik "Run"')
    console.log('6. Tunggu hingga selesai (10-30 detik)')
    console.log('7. Jalankan script ini lagi untuk verify')
  }
  
  console.log('\n' + '='.repeat(70))
  console.log('')
  
  return results
}

checkDatabase().catch(err => {
  console.error('\n❌ FATAL ERROR:', err.message)
  console.error('\nKemungkinan masalah:')
  console.error('   1. Supabase URL salah')
  console.error('   2. Supabase Anon Key salah')
  console.error('   3. Tidak ada koneksi internet')
  console.error('   4. Supabase project di-pause')
  console.error('')
})
