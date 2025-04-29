import express from 'express'
import multer from 'multer'
import { processAudio } from '../services/whisper.js'

const router = express.Router()
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }) // 10MB limit

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' })
    }
    const language = req.body.language || 'en'
    const transcription = await processAudio(req.file.buffer, language)
    // TODO: Query Supabase for animation URL based on transcription
    // For now, return dummy animation URL and transcription
    const animationUrl = 'https://supabase.co/storage/animations/hello.json'
    res.json({ transcription, animationUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process audio' })
  }
})

export default router
