import { ApiContact } from "@/types/contact/api-contact"
import { UpdateContactPayload } from "@/types/contact/update-contact"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
const USER_ID = process.env.NEXT_PUBLIC_USER_ID || "70ded02d-7ee1-4322-91d4-4dee07d95537"

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

export const updateContact = async (
  contactId: number,
  payload: UpdateContactPayload
): Promise<ApiContact> => {
  try {
    const response = await fetch(`${API_URL}/api/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to update contact: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error updating contact:", error)
    throw error
  }
}

