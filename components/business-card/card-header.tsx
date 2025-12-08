"use client"

import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

interface CardHeaderProps {
  onQRClick: () => void
}

export const CardHeader = ({ onQRClick }: CardHeaderProps) => {
  const isDark = useDarkMode()
  const t = useTranslation()

  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button
        onClick={onQRClick}
        className={cn(
          "relative transition-all duration-300 hover:scale-110",
          isDark ? "text-slate-200" : "text-gray-700"
        )}
        variant="ghost"
        size="icon"
        aria-label={t("qrCode")}
        title={t("qrCode")}
      >
        <QrCode className="h-5 w-5" />
      </Button>
      <LanguageToggle />
      <ThemeToggle />
    </div>
  )
}

