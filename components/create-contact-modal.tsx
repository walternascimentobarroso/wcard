"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { UpdateContactPayload } from "@/types/contact/update-contact"

interface CreateContactModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (payload: UpdateContactPayload) => Promise<void>
}

const CONTACT_TYPES = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Telefone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Website" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "address", label: "Endereço" },
  { value: "password", label: "Senha" },
  { value: "privateNotes", label: "Notas Privadas" },
] as const

export const CreateContactModal = ({ isOpen, onClose, onCreate }: CreateContactModalProps) => {
  const [formData, setFormData] = useState<UpdateContactPayload>({
    type: "",
    label: "",
    value: "",
    icon: "",
    order_index: 0,
    is_public: true,
  })
  const [loading, setLoading] = useState(false)
  const isDark = useDarkMode()
  const t = useTranslation()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onCreate(formData)
      // Reset form
      setFormData({
        type: "",
        label: "",
        value: "",
        icon: "",
        order_index: 0,
        is_public: true,
      })
      onClose()
    } catch (error) {
      console.error("Error creating contact:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof UpdateContactPayload, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={cn(
          "rounded-2xl p-6 border-2 transition-all duration-300 scale-100 w-full max-w-md mx-4",
          isDark
            ? "border-slate-600 bg-slate-800"
            : "border-slate-300 bg-white"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn(
            "text-xl font-semibold flex items-center gap-2",
            isDark ? "text-white" : "text-gray-900"
          )}>
            <Plus className="h-5 w-5" />
            {t("createContact") || "Criar Contato"}
          </h3>
          <button
            onClick={onClose}
            className={cn(
              "p-1 rounded-md transition-all duration-200",
              "hover:bg-slate-200/50",
              isDark ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
            )}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={cn(
              "block text-sm font-medium mb-1",
              isDark ? "text-slate-300" : "text-gray-700"
            )}>
              {t("type") || "Tipo"}
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-all",
                isDark
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-slate-300 text-gray-900"
              )}
              required
            >
              <option value="">{t("selectType") || "Selecione um tipo"}</option>
              {CONTACT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={cn(
              "block text-sm font-medium mb-1",
              isDark ? "text-slate-300" : "text-gray-700"
            )}>
              {t("label") || "Rótulo"}
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => handleChange("label", e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-all",
                isDark
                  ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  : "bg-white border-slate-300 text-gray-900 placeholder-gray-400"
              )}
              required
            />
          </div>

          <div>
            <label className={cn(
              "block text-sm font-medium mb-1",
              isDark ? "text-slate-300" : "text-gray-700"
            )}>
              {t("value") || "Valor"}
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => handleChange("value", e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-all",
                isDark
                  ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  : "bg-white border-slate-300 text-gray-900 placeholder-gray-400"
              )}
              required
            />
          </div>

          <div>
            <label className={cn(
              "block text-sm font-medium mb-1",
              isDark ? "text-slate-300" : "text-gray-700"
            )}>
              {t("icon") || "Ícone"}
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => handleChange("icon", e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-all",
                isDark
                  ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  : "bg-white border-slate-300 text-gray-900 placeholder-gray-400"
              )}
            />
          </div>

          <div>
            <label className={cn(
              "block text-sm font-medium mb-1",
              isDark ? "text-slate-300" : "text-gray-700"
            )}>
              {t("orderIndex") || "Ordem"}
            </label>
            <input
              type="number"
              value={formData.order_index}
              onChange={(e) => handleChange("order_index", parseInt(e.target.value) || 0)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border transition-all",
                isDark
                  ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  : "bg-white border-slate-300 text-gray-900 placeholder-gray-400"
              )}
              required
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_public_create"
                checked={formData.is_public}
                onChange={(e) => handleChange("is_public", e.target.checked)}
                className={cn(
                  "w-4 h-4 rounded border-slate-300 cursor-pointer",
                  isDark ? "accent-blue-600" : "accent-blue-600"
                )}
              />
              <label
                htmlFor="is_public_create"
                className={cn(
                  "text-sm font-medium cursor-pointer",
                  isDark ? "text-slate-300" : "text-gray-700"
                )}
              >
                {formData.is_public ? t("public") : t("private")}
              </label>
            </div>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              formData.is_public
                ? isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"
                : isDark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
            )}>
              {formData.is_public ? t("public") : t("private")}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className={cn(
                "flex-1",
                isDark
                  ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                  : "border-slate-300 text-gray-700 hover:bg-slate-100"
              )}
            >
              {t("cancel") || "Cancelar"}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "flex-1",
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              {loading ? (t("creating") || "Criando...") : (t("create") || "Criar")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

