import React from 'react'
import LanguageToggle from '../components/LanguageToggle'
import AccessibilitySettings from '../components/AccessibilitySettings'

export default function Settings() {
  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>
      <LanguageToggle />
      <AccessibilitySettings />
    </div>
  )
}
