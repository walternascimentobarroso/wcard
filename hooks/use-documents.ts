import { useState, useEffect } from "react"
import { fetchDocuments, createDocument, deleteDocument } from "@/lib/api"
import { ApiDocument, CreateDocumentPayload } from "@/types/document"

export const useDocuments = () => {
  const [documents, setDocuments] = useState<ApiDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedDocuments = await fetchDocuments()
      setDocuments(fetchedDocuments)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load documents")
      setError(error)
      console.error("Error loading documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const addDocument = async (payload: CreateDocumentPayload) => {
    try {
      const newDocument = await createDocument(payload)
      setDocuments((prev) => [...prev, newDocument])
      return newDocument
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create document")
      setError(error)
      throw error
    }
  }

  const removeDocument = async (documentId: number) => {
    try {
      await deleteDocument(documentId)
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete document")
      setError(error)
      throw error
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  return { documents, loading, error, refresh: loadDocuments, addDocument, removeDocument }
}

