"use client"

import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { generateVCard } from "@/lib/vcard"
import { ContactInfo } from "@/types/contact/contact-info"

interface CardActionsProps {
  contact: ContactInfo
  copied: boolean
  onShare: () => void
  isVisible: boolean
}

export const CardActions = ({ contact, copied, onShare, isVisible }: CardActionsProps) => {
  const isDark = useDarkMode()
  const t = useTranslation()

  const buttonClassName = cn(
    "flex-1 glass border transition-all duration-200 font-medium",
    isDark
      ? "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
      : "bg-white/70 border-slate-300/50 text-gray-900 hover:bg-white/90"
  )

  return (
    <div className={cn(
      "flex gap-3 transition-opacity duration-700 delay-700",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <Button
        onClick={() => generateVCard(contact)}
        className={buttonClassName}
        variant="outline"
      >
        <Download className={cn("h-4 w-4 mr-2", isDark ? "text-slate-200" : "text-gray-900")} />
        {t("saveContact")}
      </Button>
      <Button
        onClick={onShare}
        className={buttonClassName}
      >
        <Share2 className="h-4 w-4 mr-2" />
        {copied ? t("copied") : t("share")}
      </Button>
    </div>
  )
}

