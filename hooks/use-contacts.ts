import { useState, useEffect } from "react"
import { fetchContacts } from "@/lib/api"
import { ApiContact } from "@/types/contact/api-contact"

export const useContacts = () => {
  const [contacts, setContacts] = useState<ApiContact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedContacts = await fetchContacts()
        const sortedContacts = fetchedContacts.sort((a, b) => a.order_index - b.order_index)
        setContacts(sortedContacts)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to load contacts")
        setError(error)
        console.error("Error loading contacts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContacts()
  }, [])

  return { contacts, loading, error }
}

