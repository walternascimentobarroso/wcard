"use client"

import { cn } from "@/lib/utils"
import { ContactInfo } from "@/types/contact/contact-info"

interface CardBioProps {
  contact: ContactInfo
  isDark: boolean
  isVisible: boolean
}

export const CardBio = ({ contact, isDark, isVisible }: CardBioProps) => {
  return (
    <p className={cn(
      "text-center text-sm mb-6 transition-opacity duration-700 delay-300",
      isDark ? "text-slate-300" : "text-gray-800",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      {contact.bio}
    </p>
  )
}

