export type PrivateButtonType = "password" | "privateNotes"

export interface PrivateButtonProps {
  type: PrivateButtonType
  value: string
  label?: string
  className?: string
  displayValue?: string // Para senha, pode mostrar "••••••••" enquanto o value real é copiado
  contactId?: number
  onEdit?: (contactId: number) => void
}

