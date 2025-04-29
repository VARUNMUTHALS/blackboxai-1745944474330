import create from 'zustand'

export const useAppStore = create((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  highContrast: false,
  setHighContrast: (value) => set({ highContrast: value }),

  fontSize: 'text-base',
  setFontSize: (size) => set({ fontSize: size }),
}))
