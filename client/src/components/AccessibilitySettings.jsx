import React from 'react'
import { useAppStore } from '../context/appStore'

export default function AccessibilitySettings() {
  const { highContrast, setHighContrast, fontSize, setFontSize } = useAppStore()

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Accessibility Settings</h2>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={highContrast}
            onChange={() => setHighContrast(!highContrast)}
            aria-label="Toggle high contrast mode"
          />
          <span>High Contrast Mode</span>
        </label>
        <label>
          <span className="mr-2">Font Size:</span>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            aria-label="Select font size"
            className="border rounded p-1"
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
        </label>
      </div>
    </section>
  )
}
