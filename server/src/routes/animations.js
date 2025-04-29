import express from 'express'
import { getAnimationUrl } from '../services/supabase.js'

const router = express.Router()

router.get('/:word', async (req, res) => {
  try {
    const word = req.params.word
    const animationUrl = await getAnimationUrl(word)
    if (!animationUrl) {
      return res.status(404).json({ error: 'Animation not found' })
    }
    res.json({ animationUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch animation' })
  }
})

export default router
