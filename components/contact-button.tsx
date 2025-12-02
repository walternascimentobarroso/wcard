"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Mail, Phone, Globe, Linkedin, Github, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n/translations"
import { ContactButtonProps, ContactButtonType } from "@/types/contact/contact-button"

const iconMap: Record<ContactButtonType, typeof Mail> = {
  email: Mail,
  phone: Phone,
  website: Globe,
  linkedin: Linkedin,
  github: Github,
  whatsapp: MessageCircle,
}

const getButtonStyles = (type: ContactButtonType, isDark: boolean) => {
  const styles = {
    email: isDark 
      ? "bg-blue-800 hover:bg-blue-700 text-white shadow-md"
      : "bg-blue-600 hover:bg-blue-700 text-white shadow-md",
    phone: isDark
      ? "bg-green-800 hover:bg-green-700 text-white shadow-md"
      : "bg-green-600 hover:bg-green-700 text-white shadow-md",
    whatsapp: isDark
      ? "bg-green-800 hover:bg-green-700 text-white shadow-md"
      : "bg-green-600 hover:bg-green-700 text-white shadow-md",
    website: isDark
      ? "bg-purple-800 hover:bg-purple-700 text-white shadow-md"
      : "bg-purple-600 hover:bg-purple-700 text-white shadow-md",
    linkedin: isDark
      ? "bg-blue-700 hover:bg-blue-600 text-white shadow-md"
      : "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
    github: isDark
      ? "bg-slate-700 hover:bg-slate-600 text-white shadow-md"
      : "bg-slate-700 hover:bg-slate-800 text-white shadow-md",
  }
  return styles[type] || styles.email
}

const getButtonLabel = (type: ContactButtonType, language: "pt" | "en", customLabel?: string) => {
  if (customLabel) return customLabel
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)
  
  const labels = {
    email: t("emailMe"),
    phone: t("callWhatsApp"),
    whatsapp: t("callWhatsApp"),
    website: t("visitWebsite"),
    linkedin: "LinkedIn",
    github: "GitHub",
  }
  return labels[type] || type
}

export function ContactButton({ type, value, label, className }: ContactButtonProps) {
  const [copied, setCopied] = useState(false)
  const isDark = useDarkMode()
  const { language } = useLanguage()
  const Icon = iconMap[type]

  const handleClick = () => {
    if (type === "email") {
      window.location.href = `mailto:${value}`
    } else if (type === "phone" || type === "whatsapp") {
      window.location.href = `${type === "whatsapp" ? "https://wa.me/" : "tel:"}${value.replace(/\D/g, "")}`
    } else {
      window.open(value, "_blank", "noopener,noreferrer")
    }
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center justify-start gap-3 h-auto py-4 px-4 rounded-xl transition-all duration-200",
          "hover:scale-[1.02] hover:shadow-lg",
          getButtonStyles(type, isDark),
          className
        )}
      >
        <Icon className="h-5 w-5 shrink-0 text-white" />
        <div className="flex-1 text-left">
          <div className="font-medium text-white">{getButtonLabel(type, language, label)}</div>
          <div className="text-xs text-white/80 mt-0.5">{value}</div>
        </div>
      </button>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all duration-200",
          "opacity-0 group-hover:opacity-100 hover:bg-white/20",
          "flex items-center justify-center text-white"
        )}
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-300" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

