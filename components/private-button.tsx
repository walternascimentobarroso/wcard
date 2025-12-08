"use client"

import { useState } from "react"
import { Check, Copy, Pencil, Lock, FileText, Eye, EyeOff } from "lucide-react"
import { cn, copyToClipboard } from "@/lib/utils"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { PrivateButtonProps, PrivateButtonType } from "@/types/contact/private-button"

const iconMap: Record<PrivateButtonType, typeof Lock> = {
  password: Lock,
  privateNotes: FileText,
}

const getButtonStyles = (type: PrivateButtonType, isDark: boolean) => {
  const styles = {
    password: isDark
      ? "bg-red-800 hover:bg-red-700 text-white shadow-md"
      : "bg-red-600 hover:bg-red-700 text-white shadow-md",
    privateNotes: isDark
      ? "bg-slate-700 hover:bg-slate-600 text-white shadow-md"
      : "bg-slate-600 hover:bg-slate-700 text-white shadow-md",
  }
  return styles[type] || styles.password
}

const getButtonLabel = (type: PrivateButtonType, t: ReturnType<typeof useTranslation>, customLabel?: string) => {
  if (customLabel) return customLabel
  
  const labels = {
    password: t("password"),
    privateNotes: t("privateNotes"),
  }
  return labels[type] || type
}

export function PrivateButton({ type, value, label, className, displayValue, contactId, onEdit }: PrivateButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showValue, setShowValue] = useState(false)
  const isDark = useDarkMode()
  const t = useTranslation()
  const Icon = iconMap[type]

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const success = await copyToClipboard(value)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowValue(!showValue)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (contactId && onEdit) {
      onEdit(contactId)
    }
  }

  const displayedValue = displayValue !== undefined 
    ? (showValue ? value : displayValue)
    : value

  return (
    <div className="relative group">
      <div
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
          <div className={cn(
            "text-xs text-white/80 mt-0.5",
            type === "password" && "font-mono"
          )}>
            {displayedValue}
          </div>
        </div>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-100 transition-all duration-200">
        {displayValue !== undefined && (
          <button
            onClick={handleToggleVisibility}
            className={cn(
              "p-1.5 rounded-md transition-all duration-200",
              "hover:bg-white/20",
              "flex items-center justify-center text-white"
            )}
            aria-label={showValue ? t("hideValue") : t("showValue")}
          >
            {showValue ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
        {contactId && onEdit && (
          <button
            onClick={handleEdit}
            className={cn(
              "p-1.5 rounded-md transition-all duration-200",
              "hover:bg-white/20",
              "flex items-center justify-center text-white"
            )}
            aria-label="Edit contact"
            title={t("editContact") || "Editar"}
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={handleCopy}
          className={cn(
            "p-1.5 rounded-md transition-all duration-200",
            "hover:bg-white/20",
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
    </div>
  )
}

