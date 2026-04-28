"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { type Language, languageNames, getTranslation } from "./translations"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  languageNames: Record<Language, string>
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback((key: string) => getTranslation(language, key), [language])

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, languageNames }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
