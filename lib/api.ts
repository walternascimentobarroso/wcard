import { ApiContact } from "@/types/contact/api-contact"

const API_URL = process.env.NEXT_PUBLIC_API_URL
const USER_ID = process.env.NEXT_PUBLIC_USER_ID

export const fetchContacts = async (): Promise<ApiContact[]> => {
  try {
    const response = await fetch(`${API_URL}/api/contacts/?user_id=${USER_ID}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.statusText}`)
    }
    
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return []
  }
}

