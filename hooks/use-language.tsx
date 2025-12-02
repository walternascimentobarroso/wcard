"use client"

import { useState, useEffect } from "react"
import { Language } from "@/types/common/language"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("pt")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("language") as Language | null
    if (stored && (stored === "pt" || stored === "en")) {
      setLanguage(stored)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0]
      setLanguage(browserLang === "pt" ? "pt" : "en")
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("language", language)
  }, [language, mounted])

  return { language, setLanguage, mounted }
}

