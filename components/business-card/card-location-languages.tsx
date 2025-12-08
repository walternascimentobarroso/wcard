"use client"

import { cn } from "@/lib/utils"
import { ContactInfo } from "@/types/contact/contact-info"

interface CardLocationLanguagesProps {
  contact: ContactInfo
  isDark: boolean
  isVisible: boolean
}

export const CardLocationLanguages = ({ contact, isDark, isVisible }: CardLocationLanguagesProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center gap-6 mb-6 text-sm transition-opacity duration-700 delay-300",
      isDark ? "text-slate-400" : "text-gray-700",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="flex items-center gap-2">
        <span>📍</span>
        <span>{contact.location}</span>
      </div>
      {contact.languages.length > 0 && (
        <div className="flex items-center gap-2">
          <span>🌐</span>
          <span>{contact.languages[0]}</span>
        </div>
      )}
    </div>
  )
}

