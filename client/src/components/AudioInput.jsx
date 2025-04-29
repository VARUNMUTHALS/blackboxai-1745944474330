import React, { useState, useRef } from 'react'
import axios from 'axios'
import LoadingScreen from './LoadingScreen'
import AnimationOutput from './AnimationOutput'
import { useAppStore } from '../context/appStore'

export default function AudioInput() {
  const [audioFile, setAudioFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)
  const { language } = useAppStore()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 10 * 1024 * 1024) {
      setAudioFile(file)
    } else {
      alert('File size must be less than 10MB')
    }
  }

  const handleUpload = async () => {
    if (!audioFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append('audio', audioFile)
    formData.append('language', language)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/process-audio`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(response.data)
    } catch (error) {
      alert('Error processing audio')
    } finally {
      setLoading(false)
    }
  }

  const handleRecord = () => {
    alert('Recording feature coming soon.')
  }

  return (
    <section>
      <div className="mb-4">
        <button
          onClick={handleRecord}
          className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Record Audio
        </button>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          id="audio-upload"
        />
        <label
          htmlFor="audio-upload"
          className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Upload Audio
        </label>
        <button
          onClick={handleUpload}
          disabled={!audioFile}
          className={`ml-4 px-4 py-2 rounded text-white focus:outline-none focus:ring-2 ${
            audioFile ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Convert to ISL
        </button>
      </div>
      {loading && <LoadingScreen />}
      {result && <AnimationOutput animationUrl={result.animationUrl} transcription={result.transcription} />}
    </section>
  )
}
