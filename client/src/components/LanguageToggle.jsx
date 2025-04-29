import React from 'react'
import { useAppStore } from '../context/appStore'

export default function LanguageToggle() {
  const { language, setLanguage } = useAppStore()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="px-3 py-1 border rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {language === 'en' ? 'English' : 'हिन्दी'}
    </button>
  )
}
