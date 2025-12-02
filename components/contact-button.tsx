"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Mail, Phone, Globe, Linkedin, Github, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactButtonProps {
  type: "email" | "phone" | "website" | "linkedin" | "github" | "whatsapp"
  value: string
  label?: string
  className?: string
}

const iconMap = {
  email: Mail,
  phone: Phone,
  website: Globe,
  linkedin: Linkedin,
  github: Github,
  whatsapp: MessageCircle,
}

export function ContactButton({ type, value, label, className }: ContactButtonProps) {
  const [copied, setCopied] = useState(false)
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
      <Button
        variant="outline"
        onClick={handleClick}
        className={cn(
          "w-full justify-start gap-3 h-auto py-3 px-4 transition-all duration-200 hover:scale-105 hover:shadow-lg",
          "glass border-white/70 dark:border-white/20 hover:border-white/90 dark:hover:border-white/40",
          "bg-white/90 dark:bg-transparent",
          className
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span className="flex-1 text-left">{label || value}</span>
      </Button>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all duration-200",
          "opacity-0 group-hover:opacity-100 hover:bg-accent/50",
          "flex items-center justify-center"
        )}
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

