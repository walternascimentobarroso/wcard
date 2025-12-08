"use client"

import Image from "next/image"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactInfo } from "@/types/contact/contact-info"

interface CardAvatarProps {
  contact: ContactInfo
  isDark: boolean
  isVisible: boolean
}

export const CardAvatar = ({ contact, isDark, isVisible }: CardAvatarProps) => {
  return (
    <div className={cn(
      "flex justify-center mb-6 transition-all duration-700 delay-100",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
    )}>
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-[3px] animate-pulse">
          <div className={cn("w-full h-full rounded-full", isDark ? "bg-slate-900" : "bg-slate-50")}></div>
        </div>
        {contact.avatar ? (
          <div className="relative w-full h-full rounded-full overflow-hidden z-10">
            <Image
              src={contact.avatar}
              alt={contact.name}
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center z-10">
            <User className="h-16 w-16 text-white" />
          </div>
        )}
        <div className={cn(
          "absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] z-20 shadow-lg",
          isDark ? "border-slate-900" : "border-white"
        )}></div>
      </div>
    </div>
  )
}

