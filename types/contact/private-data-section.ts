import { ContactInfo } from "@/types/contact/contact-info"
import { TranslationKey } from "@/lib/i18n/translations"

export interface PrivateDataSectionProps {
  contact: ContactInfo
  isDark: boolean
  t: (key: TranslationKey) => string
}

