"use client"

import { QRCodeSVG } from "qrcode.react"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

interface QRCodeModalProps {
  isOpen: boolean
  url: string
  onClose: () => void
}

export const QRCodeModal = ({ isOpen, url, onClose }: QRCodeModalProps) => {
  const isDark = useDarkMode()
  const t = useTranslation()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
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
          <QRCodeSVG value={url} size={256} />
        </div>
        <p className={cn(
          "text-sm text-center mt-4",
          isDark ? "text-slate-400" : "text-gray-800"
        )}>
          {t("scanToAccess")}
        </p>
      </div>
    </div>
  )
}

