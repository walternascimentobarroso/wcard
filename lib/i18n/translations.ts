import { Language } from "@/types/common/language"

export const translations = {
  pt: {
    email: "Email",
    phone: "Telefone",
    whatsapp: "WhatsApp",
    website: "Website",
    linkedin: "LinkedIn",
    github: "GitHub",
    saveContact: "Guardar Contacto",
    share: "Partilhar",
    copied: "Copiado!",
    qrCode: "QR Code",
    scanToAccess: "Escaneie para aceder ao cartão",
    emailMe: "Enviar Email",
    callWhatsApp: "Ligar / WhatsApp",
    visitWebsite: "Visitar Website",
  },
  en: {
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    website: "Website",
    linkedin: "LinkedIn",
    github: "GitHub",
    saveContact: "Save Contact",
    share: "Share",
    copied: "Copied!",
    qrCode: "QR Code",
    scanToAccess: "Scan to access the card",
    emailMe: "Email Me",
    callWhatsApp: "Call / WhatsApp",
    visitWebsite: "Visit Website",
  },
} as const

export type TranslationKey = keyof typeof translations.pt

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key]
}

