export type ContactButtonType = "email" | "phone" | "website" | "linkedin" | "github" | "whatsapp" | "address"

export interface ContactButtonProps {
  type: ContactButtonType
  value: string
  label?: string
  className?: string
}

