import React from 'react'
import LanguageToggle from '../components/LanguageToggle'
import AccessibilitySettings from '../components/AccessibilitySettings'
import AudioInput from '../components/AudioInput'

export default function Home() {
  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audio to ISL Converter</h1>
        <LanguageToggle />
      </header>
      <AccessibilitySettings />
      <main>
        <AudioInput />
      </main>
    </div>
  )
}
