"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Mail, Phone, Globe, Linkedin, Github, MessageCircle, MapPin } from "lucide-react"
import { cn, copyToClipboard } from "@/lib/utils"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { ContactButtonProps, ContactButtonType } from "@/types/contact/contact-button"

const iconMap: Record<ContactButtonType, typeof Mail> = {
  email: Mail,
  phone: Phone,
  website: Globe,
  linkedin: Linkedin,
  github: Github,
  whatsapp: MessageCircle,
  address: MapPin,
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
    address: isDark
      ? "bg-slate-700/90 hover:bg-slate-600 text-white shadow-md"
      : "bg-slate-600/90 hover:bg-slate-500 text-white shadow-md",
  }
  return styles[type] || styles.email
}

const getButtonLabel = (type: ContactButtonType, t: ReturnType<typeof useTranslation>, customLabel?: string) => {
  if (customLabel) return customLabel
  
  const labels = {
    email: t("emailMe"),
    phone: t("callWhatsApp"),
    whatsapp: t("callWhatsApp"),
    website: t("visitWebsite"),
    linkedin: "LinkedIn",
    github: "GitHub",
    address: t("address"),
  }
  return labels[type] || type
}

export function ContactButton({ type, value, label, className }: ContactButtonProps) {
  const [copied, setCopied] = useState(false)
  const isDark = useDarkMode()
  const t = useTranslation()
  const Icon = iconMap[type]

  const handleClick = () => {
    if (type === "email") {
      window.location.href = `mailto:${value}`
      return
    }

    if (type === "phone" || type === "whatsapp") {
      window.location.href = `${type === "whatsapp" ? "https://wa.me/" : "tel:"}${value.replace(/\D/g, "")}`
      return
    }

    if (type === "address") {
      const encodedAddress = encodeURIComponent(value)
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank", "noopener,noreferrer")
      return
    }

    window.open(value, "_blank", "noopener,noreferrer")
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const success = await copyToClipboard(value)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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
          <div className="font-medium text-white">{getButtonLabel(type, t, label)}</div>
          <div className="text-xs text-white/80 mt-0.5">{value}</div>
        </div>
      </button>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all duration-200",
          "opacity-100 hover:bg-white/20",
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

