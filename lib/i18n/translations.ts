import { Language } from "@/types/common/language"

export const translations = {
  pt: {
    email: "Email",
    phone: "Telefone",
    whatsapp: "WhatsApp",
    website: "Website",
    linkedin: "LinkedIn",
    github: "GitHub",
    address: "Endereço",
    password: "Senha",
    privateNotes: "Notas Privadas",
    public: "Público",
    private: "Privado",
    saveContact: "Guardar Contacto",
    share: "Partilhar",
    copied: "Copiado!",
    qrCode: "QR Code",
    scanToAccess: "Escaneie para aceder ao cartão",
    emailMe: "Enviar Email",
    callWhatsApp: "Ligar / WhatsApp",
    visitWebsite: "Visitar Website",
    showValue: "Mostrar valor",
    hideValue: "Ocultar valor",
  },
  en: {
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    website: "Website",
    linkedin: "LinkedIn",
    github: "GitHub",
    address: "Address",
    password: "Password",
    privateNotes: "Private Notes",
    public: "Public",
    private: "Private",
    saveContact: "Save Contact",
    share: "Share",
    copied: "Copied!",
    qrCode: "QR Code",
    scanToAccess: "Scan to access the card",
    emailMe: "Email Me",
    callWhatsApp: "Call / WhatsApp",
    visitWebsite: "Visit Website",
    showValue: "Show value",
    hideValue: "Hide value",
  },
} as const

export type TranslationKey = keyof typeof translations.pt

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key]
}

