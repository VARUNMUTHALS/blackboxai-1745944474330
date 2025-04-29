import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import csvParser from 'csv-parser'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key not set in environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const animationsDir = path.join(__dirname, '..', 'data', 'animations', 'INDIAN SIGN LANGUAGE ANIMATED VIDEOS')
const metadataFile = path.join(__dirname, '..', 'data', 'metadata.csv')

async function uploadAnimation(filename) {
  const filePath = path.join(animationsDir, filename)
  const fileContent = fs.readFileSync(filePath)

  const { data, error } = await supabase.storage
    .from('animations')
    .upload(filename, fileContent, { upsert: true })

  if (error) {
    console.error(`Failed to upload ${filename}:`, error)
    return null
  }
  return data
}

async function importMetadata() {
  const records = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(metadataFile)
      .pipe(csvParser())
      .on('data', (row) => {
        records.push(row)
      })
      .on('end', () => {
        resolve(records)
      })
      .on('error', reject)
  })
}

async function main() {
  console.log('Starting upload of animations...')
  const metadata = await importMetadata()

  for (const record of metadata) {
    const { word, filename } = record
    console.log(`Uploading animation for word: ${word}, file: ${filename}`)
    const uploadResult = await uploadAnimation(filename)
    if (!uploadResult) {
      console.error(`Skipping database insert for ${word} due to upload failure.`)
      continue
    }

    // Insert or update metadata in Supabase PostgreSQL
    const { error } = await supabase
      .from('signs')
      .upsert({ word, animation_url: `${supabaseUrl}/storage/v1/object/public/animations/${filename}` }, { onConflict: 'word' })

    if (error) {
      console.error(`Failed to upsert metadata for ${word}:`, error)
    } else {
      console.log(`Metadata upserted for ${word}`)
    }
  }
  console.log('Upload and import completed.')
}

main().catch((err) => {
  console.error('Error in upload script:', err)
})
