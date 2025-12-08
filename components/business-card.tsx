"use client"

import { useState, useEffect } from "react"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { cn, copyToClipboard } from "@/lib/utils"
import { BusinessCardProps } from "@/types/contact"
import { useContacts } from "@/hooks/use-contacts"
import { CardHeader } from "./business-card/card-header"
import { CardAvatar } from "./business-card/card-avatar"
import { CardNameTitle } from "./business-card/card-name-title"
import { CardBio } from "./business-card/card-bio"
import { CardLocationLanguages } from "./business-card/card-location-languages"
import { CardTabs } from "./business-card/card-tabs"
import { CardActions } from "./business-card/card-actions"
import { QRCodeModal } from "./business-card/qr-code-modal"

export function BusinessCard({ contact }: BusinessCardProps) {
  const [mounted, setMounted] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { contacts: apiContacts, loading } = useContacts()
  const isDark = useDarkMode()

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    const shareData = {
      title: `${contact.name} - ${contact.title}`,
      text: contact.bio,
      url: currentUrl,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
        }
        return
      }
    }

    const success = await copyToClipboard(currentUrl)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4",
      isDark && "bg-transparent"
    )}>
      <div
        className={cn(
          "w-full max-w-md rounded-3xl p-8 shadow-2xl transition-all duration-500",
          "glass",
          isDark ? "bg-slate-900/80 border-slate-700/50" : "",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <CardHeader onQRClick={() => setShowQR(!showQR)} />
        <CardAvatar contact={contact} isDark={isDark} isVisible={isVisible} />
        <CardNameTitle contact={contact} isDark={isDark} isVisible={isVisible} />
        <CardBio contact={contact} isDark={isDark} isVisible={isVisible} />
        <CardLocationLanguages contact={contact} isDark={isDark} isVisible={isVisible} />
        <CardTabs 
          contact={contact} 
          apiContacts={apiContacts} 
          loading={loading} 
          isVisible={isVisible} 
        />
        <CardActions 
          contact={contact} 
          copied={copied} 
          onShare={handleShare} 
          isVisible={isVisible} 
        />
        <QRCodeModal 
          isOpen={showQR} 
          url={currentUrl} 
          onClose={() => setShowQR(false)} 
        />
      </div>
    </div>
  )
}
