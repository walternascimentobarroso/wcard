"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./use-theme"

export function useDarkMode() {
  const { theme, mounted: themeMounted } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (!themeMounted) return

    const checkDarkMode = () => {
      const root = document.documentElement
      const isDarkMode = root.classList.contains("dark")
      setIsDark(isDarkMode)
    }

    // Check initially
    checkDarkMode()

    // Watch for class changes on documentElement
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [theme, themeMounted])

  return isDark
}

