"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { Download, Share2, User, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactButton } from "@/components/contact-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { BusinessCardProps } from "@/types/contact/business-card"

export function BusinessCard({ contact }: BusinessCardProps) {
  const [mounted, setMounted] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const generateVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${contact.name}`,
      `TITLE:${contact.title}`,
      contact.email && `EMAIL:${contact.email}`,
      contact.phone && `TEL:${contact.phone}`,
      contact.website && `URL:${contact.website}`,
      contact.linkedin && `URL:${contact.linkedin}`,
      contact.github && `URL:${contact.github}`,
      `NOTE:${contact.bio}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n")

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${contact.name.replace(/\s+/g, "_")}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    const shareData = {
      title: `${contact.name} - ${contact.title}`,
      text: contact.bio,
      url: currentUrl,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div
        className={cn(
          "w-full max-w-md glass rounded-3xl p-8 shadow-2xl",
          "border transition-all duration-500",
          "border-white/80 dark:border-white/20",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        {/* Header with theme toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Avatar */}
        <div className={cn(
          "flex justify-center mb-6 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}>
          <div className="relative">
            {contact.avatar ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/80 dark:ring-white/20 shadow-xl">
                <Image
                  src={contact.avatar}
                  alt={contact.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ring-4 ring-white/80 dark:ring-white/20 shadow-xl">
                <User className="h-16 w-16 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Name and Title */}
        <div className={cn(
          "text-center mb-4 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {contact.name}
          </h1>
          <p className="text-lg text-muted-foreground">{contact.title}</p>
        </div>

        {/* Bio */}
        <p className={cn(
          "text-center text-sm text-muted-foreground mb-6 transition-opacity duration-700 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          {contact.bio}
        </p>

        {/* Location and Languages */}
        <div className={cn(
          "flex flex-col gap-2 mb-6 text-sm text-muted-foreground transition-opacity duration-700 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex items-center justify-center gap-2">
            <span>📍</span>
            <span>{contact.location}</span>
          </div>
          {contact.languages.length > 0 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>🌐</span>
              <span>{contact.languages.join(" • ")}</span>
            </div>
          )}
        </div>

        {/* Contact Buttons */}
        <div className={cn(
          "space-y-3 mb-6 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {contact.email && (
            <ContactButton type="email" value={contact.email} label="Email" />
          )}
          {contact.phone && (
            <ContactButton type="phone" value={contact.phone} label="Telefone" />
          )}
          {contact.whatsapp && (
            <ContactButton type="whatsapp" value={contact.whatsapp} label="WhatsApp" />
          )}
          {contact.website && (
            <ContactButton type="website" value={contact.website} label="Website" />
          )}
          {contact.linkedin && (
            <ContactButton type="linkedin" value={contact.linkedin} label="LinkedIn" />
          )}
          {contact.github && (
            <ContactButton type="github" value={contact.github} label="GitHub" />
          )}
        </div>

        {/* Action Buttons */}
        <div className={cn(
          "flex gap-3 transition-opacity duration-700 delay-700",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <Button
            onClick={generateVCard}
            className="flex-1 glass border-white/70 dark:border-white/20 hover:border-white/90 dark:hover:border-white/40 bg-white/90 dark:bg-transparent transition-all duration-200 hover:scale-105"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            vCard
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 glass border-white/70 dark:border-white/20 hover:border-white/90 dark:hover:border-white/40 bg-white/90 dark:bg-transparent transition-all duration-200 hover:scale-105"
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            {copied ? "Copiado!" : "Partilhar"}
          </Button>
          <Button
            onClick={() => setShowQR(!showQR)}
            className="glass border-white/50 dark:border-white/20 hover:border-white/70 dark:hover:border-white/40 bg-white/50 dark:bg-transparent transition-all duration-200 hover:scale-105"
            variant="outline"
            size="icon"
            aria-label="Mostrar QR Code"
          >
            <QrCode className="h-4 w-4" />
          </Button>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={() => setShowQR(false)}
          >
            <div
              className="glass rounded-2xl p-8 border border-white/80 dark:border-white/20 bg-white/95 dark:bg-black/30 transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                QR Code
              </h3>
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={currentUrl} size={256} />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Escaneie para aceder ao cartão
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

