import { ApiContact } from "@/types/contact/api-contact"
import { UpdateContactPayload } from "@/types/contact/update-contact"
import { ApiDocument, CreateDocumentPayload } from "@/types/document"

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

export const createContact = async (
  payload: UpdateContactPayload
): Promise<ApiContact> => {
  try {
    const response = await fetch(`${API_URL}/api/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error creating contact:", error)
    throw error
  }
}

export const fetchDocuments = async (): Promise<ApiDocument[]> => {
  try {
    const response = await fetch(`${API_URL}/api/documents/?user_id=${USER_ID}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch documents: ${response.statusText}`)
    }
    
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching documents:", error)
    return []
  }
}

export const createDocument = async (
  payload: CreateDocumentPayload
): Promise<ApiDocument> => {
  try {
    const formData = new FormData()
    formData.append("name", payload.name)
    formData.append("file", payload.file)
    formData.append("user_id", USER_ID)
    
    const response = await fetch(`${API_URL}/api/documents/`, {
      method: "POST",
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create document: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error creating document:", error)
    throw error
  }
}

export const deleteDocument = async (documentId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/documents/${documentId}`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      throw new Error(`Failed to delete document: ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error deleting document:", error)
    throw error
  }
}

export const downloadDocument = async (doc: ApiDocument): Promise<void> => {
  try {
    const response = await fetch(doc.file_url)
    
    if (!response.ok) {
      throw new Error(`Failed to download document: ${response.statusText}`)
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = doc.file_name
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error("Error downloading document:", error)
    throw error
  }
}

