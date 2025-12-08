import { ContactButtonType } from "@/types/contact/contact-button"
import { ApiContact } from "@/types/contact/api-contact"

export const mapApiTypeToContactType = (type: string): ContactButtonType | null => {
  const typeMap: Record<string, ContactButtonType> = {
    email: "email",
    phone: "phone",
    website: "website",
    linkedin: "linkedin",
    github: "github",
    whatsapp: "whatsapp",
    address: "address",
  }
  return typeMap[type.toLowerCase()] || null
}

export const isPrivateType = (type: string): boolean => {
  const typeLower = type.toLowerCase()
  return typeLower === "password" || typeLower === "privatenotes" || typeLower === "private_notes"
}

export const getPrivateButtonType = (type: string): "password" | "privateNotes" => {
  return type.toLowerCase() === "password" ? "password" : "privateNotes"
}

