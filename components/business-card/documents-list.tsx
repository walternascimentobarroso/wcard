"use client"

import { useState, useRef } from "react"
import { FileText, Download, Trash, Plus, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { ApiDocument } from "@/types/document"
import { downloadDocument } from "@/lib/api"

interface DocumentsListProps {
  documents: ApiDocument[]
  loading: boolean
  onAddDocument: (file: File, name: string) => Promise<void>
  onRemoveDocument: (documentId: number) => Promise<void>
}

const LoadingState = ({ isDark, t }: { isDark: boolean; t: ReturnType<typeof useTranslation> }) => (
  <div className={cn(
    "w-full p-4 rounded-xl text-center",
    isDark ? "text-slate-400" : "text-gray-500"
  )}>
    {t("loading")}
  </div>
)

const EmptyState = ({ isDark, t }: { isDark: boolean; t: ReturnType<typeof useTranslation> }) => (
  <div className={cn(
    "w-full p-4 rounded-xl text-center",
    isDark ? "text-slate-400" : "text-gray-500"
  )}>
    {t("noDocuments") || "Nenhum documento"}
  </div>
)

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
}

export const DocumentsList = ({ documents, loading, onAddDocument, onRemoveDocument }: DocumentsListProps) => {
  const isDark = useDarkMode()
  const t = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)
  const [removingId, setRemovingId] = useState<number | null>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      await onAddDocument(file, file.name)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading document:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleDownload = async (document: ApiDocument) => {
    setDownloadingId(document.id)
    try {
      await downloadDocument(document)
    } catch (error) {
      console.error("Error downloading document:", error)
    } finally {
      setDownloadingId(null)
    }
  }

  const handleRemove = async (documentId: number) => {
    if (!confirm(t("confirmDeleteDocument") || "Tem certeza que deseja remover este documento?")) {
      return
    }

    setRemovingId(documentId)
    try {
      await onRemoveDocument(documentId)
    } catch (error) {
      console.error("Error removing document:", error)
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) {
    return <LoadingState isDark={isDark} t={t} />
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        aria-label="Upload document"
      />
      
      <button
        onClick={handleAddClick}
        disabled={uploading}
        className={cn(
          "w-full flex items-center justify-center gap-2 h-auto py-4 px-4 rounded-xl transition-all duration-200",
          "hover:scale-[1.02] hover:shadow-lg border-2 border-dashed",
          uploading && "opacity-50 cursor-not-allowed",
          isDark
            ? "border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300"
            : "border-slate-300 text-gray-500 hover:border-slate-400 hover:text-gray-700"
        )}
      >
        {uploading ? (
          <>
            <Upload className="h-5 w-5 animate-pulse" />
            <span className="font-medium">{t("uploading") || "Enviando..."}</span>
          </>
        ) : (
          <>
            <Plus className="h-5 w-5" />
            <span className="font-medium">{t("addDocument") || "Adicionar Documento"}</span>
          </>
        )}
      </button>

      {documents.length === 0 ? (
        <EmptyState isDark={isDark} t={t} />
      ) : (
        documents.map((document) => (
          <div
            key={document.id}
            className={cn(
              "w-full flex items-center justify-between gap-3 h-auto py-4 px-4 rounded-xl transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-lg",
              isDark
                ? "bg-slate-800/50 border border-slate-700/50"
                : "bg-white/50 border border-slate-200/50"
            )}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FileText className={cn(
                "h-5 w-5 shrink-0",
                isDark ? "text-slate-400" : "text-gray-600"
              )} />
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "font-medium truncate",
                  isDark ? "text-slate-200" : "text-gray-900"
                )}>
                  {document.name}
                </div>
                <div className={cn(
                  "text-xs mt-0.5",
                  isDark ? "text-slate-400" : "text-gray-500"
                )}>
                  {formatFileSize(document.file_size)} • {document.mime_type}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleDownload(document)}
                disabled={downloadingId === document.id}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  "hover:bg-slate-700/50",
                  downloadingId === document.id && "opacity-50 cursor-not-allowed",
                  isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-gray-600 hover:text-gray-900"
                )}
                aria-label={t("download") || "Baixar"}
                title={t("download") || "Baixar"}
              >
                {downloadingId === document.id ? (
                  <Download className="h-4 w-4 animate-pulse" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => handleRemove(document.id)}
                disabled={removingId === document.id}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  "hover:bg-red-500/20",
                  removingId === document.id && "opacity-50 cursor-not-allowed",
                  isDark
                    ? "text-slate-400 hover:text-red-400"
                    : "text-gray-600 hover:text-red-600"
                )}
                aria-label={t("remove") || "Remover"}
                title={t("remove") || "Remover"}
              >
                {removingId === document.id ? (
                  <Trash className="h-4 w-4 animate-pulse" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

