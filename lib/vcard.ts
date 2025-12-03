import { ContactInfo } from "@/types/contact/contact-info"

/**
 * Gera um arquivo vCard (.vcf) a partir das informações de contato
 * @param contact - Informações do contato
 */
export const generateVCard = (contact: ContactInfo): void => {
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

