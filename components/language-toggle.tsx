"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { language, setLanguage, mounted } = useLanguage()
  const isDark = useDarkMode()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Globe className="h-5 w-5" />
      </Button>
    )
  }

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className={cn(
        "relative transition-all duration-300 hover:scale-110",
        isDark ? "text-slate-200" : "text-gray-700"
      )}
      aria-label="Toggle language"
      title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <Globe className="h-5 w-5" />
      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
        {language.toUpperCase()}
      </span>
    </Button>
  )
}

