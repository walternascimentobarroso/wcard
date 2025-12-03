import { getTranslation, TranslationKey } from "@/lib/i18n/translations"
import { useLanguage } from "@/contexts/language-context"

/**
 * Hook para obter a função de tradução baseada no idioma atual
 * @returns Função de tradução que recebe uma chave e retorna o texto traduzido
 */
export const useTranslation = () => {
  const { language } = useLanguage()
  
  const t = (key: TranslationKey) => getTranslation(language, key)
  
  return t
}

