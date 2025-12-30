export interface ApiDocument {
  id: number
  name: string
  file_name: string
  file_url: string
  file_size: number
  mime_type: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface CreateDocumentPayload {
  name: string
  file: File
}

