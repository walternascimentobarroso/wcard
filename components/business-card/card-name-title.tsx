"use client"

import { cn } from "@/lib/utils"
import { ContactInfo } from "@/types/contact/contact-info"

interface CardNameTitleProps {
  contact: ContactInfo
  isDark: boolean
  isVisible: boolean
}

export const CardNameTitle = ({ contact, isDark, isVisible }: CardNameTitleProps) => {
  return (
    <div className={cn(
      "text-center mb-4 transition-all duration-700 delay-200",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <h1 className={cn(
        "text-3xl font-bold mb-3",
        isDark ? "text-white" : "text-gray-900"
      )}>
        {contact.name}
      </h1>
      <div className={cn(
        "inline-block px-4 py-1.5 rounded-full text-white text-sm font-medium mb-3 shadow-sm",
        isDark ? "bg-blue-700" : "bg-blue-500/90"
      )}>
        {contact.title.toUpperCase()}
      </div>
    </div>
  )
}

