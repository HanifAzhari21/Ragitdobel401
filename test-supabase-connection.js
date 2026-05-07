import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbexsukhqcgmzgqapoii.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZXhzdWtocWNnbXpncWFwb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM5NTAsImV4cCI6MjA4NzQ1OTk1MH0.7N9wIazzZZW5DbQUMMYu34y0alkt6N6tiGE7TNKbBDg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🧪 Testing Supabase Connection untuk Ragit Dobel 4.0\n')
  console.log('=' .repeat(60))
  
  // Test 1: Read external_links
  console.log('\n1️⃣ Testing TABLE: external_links')
  console.log('-'.repeat(60))
  const { data: links, error: linksError } = await supabase
    .from('external_links')
    .select('*')
  
  if (linksError) {
    console.error('❌ Error:', linksError.message)
    console.error('   Code:', linksError.code)
    console.error('   Hint:', linksError.hint || 'Check if table exists and RLS policies are set')
  } else {
    console.log('✅ Success! Found', links.length, 'links')
    links.forEach(link => {
      console.log(`   - ${link.link_key}: ${link.link_url}`)
    })
  }
  
  // Test 2: Read dokumentasi
  console.log('\n2️⃣ Testing TABLE: dokumentasi')
  console.log('-'.repeat(60))
  const { data: docs, error: docsError } = await supabase
    .from('dokumentasi')
    .select('*')
    .eq('is_deleted', false)
  
  if (docsError) {
    console.error('❌ Error:', docsError.message)
    console.error('   Code:', docsError.code)
  } else {
    console.log('✅ Success! Found', docs.length, 'dokumentasi items')
    if (docs.length > 0) {
      console.log('   Sample:')
      console.log(`   - ${docs[0].title}`)
      console.log(`     Category: ${docs[0].category}`)
      console.log(`     Date: ${docs[0].event_date}`)
    }
  }
  
  // Test 3: Read admin_users
  console.log('\n3️⃣ Testing TABLE: admin_users')
  console.log('-'.repeat(60))
  const { data: admins, error: adminsError } = await supabase
    .from('admin_users')
    .select('id, username, created_at')
  
  if (adminsError) {
    console.error('❌ Error:', adminsError.message)
    console.error('   Code:', adminsError.code)
  } else {
    console.log('✅ Success! Found', admins.length, 'admin user(s)')
    admins.forEach(admin => {
      console.log(`   - Username: ${admin.username}`)
    })
  }
  
  // Test 4: Check storage buckets
  console.log('\n4️⃣ Testing STORAGE: Buckets')
  console.log('-'.repeat(60))
  const { data: buckets, error: bucketsError } = await supabase
    .storage
    .listBuckets()
  
  if (bucketsError) {
    console.error('❌ Error:', bucketsError.message)
  } else {
    console.log('✅ Success! Found', buckets.length, 'bucket(s)')
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`)
    })
    
    // Check if dokumentasi-images exists
    const hasDocsImages = buckets.some(b => b.name === 'dokumentasi-images')
    if (hasDocsImages) {
      console.log('\n   ✅ Bucket "dokumentasi-images" found!')
    } else {
      console.log('\n   ⚠️  Bucket "dokumentasi-images" NOT found!')
      console.log('   → Please create it: STEP 2 in SUPABASE_NEXT_STEPS.md')
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SUMMARY')
  console.log('='.repeat(60))
  
  const results = {
    external_links: !linksError,
    dokumentasi: !docsError,
    admin_users: !adminsError,
    storage: !bucketsError
  }
  
  const allPassed = Object.values(results).every(v => v === true)
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test.padEnd(20)} ${passed ? 'PASS' : 'FAIL'}`)
  })
  
  console.log('='.repeat(60))
  
  if (allPassed) {
    console.log('\n🎉 ALL TESTS PASSED!')
    console.log('✅ Supabase connection is working perfectly!')
    console.log('\n📋 Next Steps:')
    console.log('   1. If bucket "dokumentasi-images" not found, create it (STEP 2)')
    console.log('   2. Setup RLS policies (STEP 5)')
    console.log('   3. Test CRUD operations from your app')
    console.log('   4. Deploy to production!')
  } else {
    console.log('\n⚠️  SOME TESTS FAILED')
    console.log('📖 Check SUPABASE_NEXT_STEPS.md for troubleshooting')
    console.log('\nCommon fixes:')
    console.log('   - Run supabase-setup.sql if tables missing')
    console.log('   - Setup RLS policies (STEP 5)')
    console.log('   - Create storage bucket (STEP 2)')
  }
  
  console.log('\n')
}

testConnection().catch(err => {
  console.error('\n❌ FATAL ERROR:', err.message)
  console.error('\nPlease check:')
  console.error('   1. Supabase URL is correct')
  console.error('   2. Supabase Anon Key is correct')
  console.error('   3. Internet connection is working')
  console.error('   4. Supabase project is not paused')
})
