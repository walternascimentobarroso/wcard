"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { Download, Share2, User, QrCode, MapPin, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactButton } from "@/components/contact-button"
import { PrivateButton } from "@/components/private-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useLanguage } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n/translations"
import { cn } from "@/lib/utils"
import { BusinessCardProps } from "@/types/contact/business-card"

interface PrivateDataSectionProps {
  contact: BusinessCardProps["contact"]
  isDark: boolean
  t: (key: Parameters<typeof getTranslation>[1]) => string
}

function PrivateDataSection({ contact, isDark, t }: PrivateDataSectionProps) {
  return (
    <div className="space-y-3">
      {contact.password && (
        <PrivateButton
          type="password"
          value={contact.password}
          displayValue="••••••••"
        />
      )}
      {contact.privateNotes && (
        <PrivateButton
          type="privateNotes"
          value={contact.privateNotes}
        />
      )}
      {!contact.password && !contact.privateNotes && (
        <div className={cn(
          "w-full p-4 rounded-xl text-center",
          isDark ? "text-slate-400" : "text-gray-500"
        )}>
          {t("private")} {t("privateNotes").toLowerCase()}
        </div>
      )}
    </div>
  )
}

export function BusinessCard({ contact }: BusinessCardProps) {
  const [mounted, setMounted] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isDark = useDarkMode()
  const { language } = useLanguage()
  
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key)

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
        {/* Header with theme, language and QR code toggles */}
        <div className="flex justify-end gap-2 mb-4">
          <Button
            onClick={() => setShowQR(!showQR)}
            className={cn(
              "relative transition-all duration-300 hover:scale-110",
              isDark ? "text-slate-200" : "text-gray-700"
            )}
            variant="ghost"
            size="icon"
            aria-label="Mostrar QR Code"
            title={t("qrCode")}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Avatar */}
        <div className={cn(
          "flex justify-center mb-6 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}>
          <div className="relative w-32 h-32">
            {/* Anel colorido brilhante */}
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
            {/* Status online */}
            <div className={cn(
              "absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] z-20 shadow-lg",
              isDark ? "border-slate-900" : "border-white"
            )}></div>
          </div>
        </div>

        {/* Name and Title */}
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

        {/* Bio */}
        <p className={cn(
          "text-center text-sm mb-6 transition-opacity duration-700 delay-300",
          isDark ? "text-slate-300" : "text-gray-800",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          {contact.bio}
        </p>

        {/* Location and Languages */}
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

        {/* Tabs for Public and Private data */}
        <Tabs defaultValue="public" className={cn(
          "mb-6 transition-all duration-700 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <TabsList className={cn(
            "w-full grid grid-cols-2 p-1",
            isDark ? "bg-slate-800/50" : "bg-slate-100/50"
          )}>
            <TabsTrigger 
              value="public" 
              className={cn(
                "transition-all",
                isDark 
                  ? "data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400" 
                  : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
              )}
            >
              {t("public")}
            </TabsTrigger>
            <TabsTrigger 
              value="private" 
              className={cn(
                "transition-all",
                isDark 
                  ? "data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400" 
                  : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
              )}
            >
              <Lock className="h-4 w-4 mr-2" />
              {t("private")}
            </TabsTrigger>
          </TabsList>

          {/* Public Tab */}
          <TabsContent value="public" className="mt-4">
            <div className="space-y-3">
              {contact.email && (
                <ContactButton type="email" value={contact.email} />
              )}
              {(contact.phone || contact.whatsapp) && (
                <ContactButton type={contact.whatsapp ? "whatsapp" : "phone"} value={contact.whatsapp || contact.phone || ""} />
              )}
              {contact.website && (
                <ContactButton type="website" value={contact.website} />
              )}
              {contact.address && (
                <div className={cn(
                  "w-full flex items-center justify-start gap-3 h-auto py-4 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg text-white shadow-md border",
                  isDark
                    ? "bg-slate-700/90 hover:bg-slate-600 border-slate-600/30"
                    : "bg-slate-600/90 hover:bg-slate-500 border-slate-500/30"
                )}>
                  <MapPin className="h-5 w-5 shrink-0 text-white" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{t("address")}</div>
                    <div className="text-xs text-white/80 mt-0.5">{contact.address}</div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Private Tab */}
          <TabsContent value="private" className="mt-4">
            <PrivateDataSection contact={contact} isDark={isDark} t={t} />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className={cn(
          "flex gap-3 transition-opacity duration-700 delay-700",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <Button
            onClick={generateVCard}
            className={cn(
              "flex-1 glass border transition-all duration-200 font-medium",
              isDark
                ? "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                : "bg-white/70 border-slate-300/50 text-gray-900 hover:bg-white/90"
            )}
            variant="outline"
          >
            <Download className={cn("h-4 w-4 mr-2", isDark ? "text-slate-200" : "text-gray-900")} />
            {t("saveContact")}
          </Button>
          <Button
            onClick={handleShare}
            className={cn(
              "flex-1 glass border text-white transition-all duration-200 font-medium",
              isDark
                ? "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
                : "bg-white/70 border-slate-300/50 text-gray-900 hover:bg-white/90"
            )}
          >
            <Share2 className="h-4 w-4 mr-2" />
            {copied ? t("copied") : t("share")}
          </Button>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={() => setShowQR(false)}
          >
            <div
              className={cn(
                "rounded-2xl p-8 border-2 transition-all duration-300 scale-100",
                isDark
                  ? "border-slate-600 bg-slate-800"
                  : "border-slate-300 bg-white"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={cn(
                "text-xl font-semibold mb-4 text-center",
                isDark ? "text-white" : "text-gray-900"
              )}>
                {t("qrCode")}
              </h3>
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={currentUrl} size={256} />
              </div>
              <p className={cn(
                "text-sm text-center mt-4",
                isDark ? "text-slate-400" : "text-gray-800"
              )}>
                {t("scanToAccess")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

