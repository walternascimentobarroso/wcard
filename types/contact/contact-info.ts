export interface ContactInfo {
  name: string
  title: string
  bio: string
  location: string
  languages: string[]
  avatar?: string
  // Public data
  email?: string
  phone?: string
  website?: string
  address?: string
  // Private data
  password?: string
  privateNotes?: string
  // Social (can be public or private)
  linkedin?: string
  github?: string
  whatsapp?: string
}

