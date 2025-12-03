import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Copia texto para a área de transferência com fallback para dispositivos móveis
 * @param text - Texto a ser copiado
 * @returns Promise que resolve quando o texto é copiado com sucesso
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Detectar se é mobile/iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)
  const isMobile = isIOS || isAndroid

  // Método 1: Tentar usar a API moderna do Clipboard
  // Em mobile, mesmo que a API esteja disponível, pode falhar silenciosamente
  if (navigator.clipboard) {
    try {
      // Para mobile, verificar se está em contexto seguro (HTTPS)
      if (window.isSecureContext || location.protocol === "https:" || location.hostname === "localhost") {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch (err) {
      // Se falhar, tentar o método fallback
      console.warn("Clipboard API failed, trying fallback:", err)
    }
  }

  // Método 2: Fallback usando execCommand (necessário para alguns dispositivos móveis)
  return new Promise<boolean>((resolve) => {
    try {
      // Criar um elemento de textarea
      const textArea = document.createElement("textarea")
      textArea.value = text
      
      // Configurar estilos baseado na plataforma
      if (isIOS) {
        // Para iOS, o elemento precisa estar visível (mesmo que quase invisível)
        // e editável para funcionar corretamente
        textArea.style.position = "fixed"
        textArea.style.top = "0"
        textArea.style.left = "0"
        textArea.style.width = "2px"
        textArea.style.height = "2px"
        textArea.style.padding = "0"
        textArea.style.border = "none"
        textArea.style.outline = "none"
        textArea.style.boxShadow = "none"
        textArea.style.background = "transparent"
        textArea.style.opacity = "0"
        textArea.style.zIndex = "-1"
        textArea.contentEditable = "true"
        textArea.readOnly = false
      } else {
        // Para Android e desktop
        textArea.style.position = "fixed"
        textArea.style.left = "-9999px"
        textArea.style.top = "0"
        textArea.style.width = "1px"
        textArea.style.height = "1px"
        textArea.style.opacity = "0"
        textArea.style.pointerEvents = "none"
      }
      
      document.body.appendChild(textArea)

      // Focar e selecionar o texto
      if (isIOS) {
        // Para iOS, usar uma abordagem específica
        textArea.focus()
        // Aguardar um frame para garantir que o foco foi aplicado
        requestAnimationFrame(() => {
          try {
            textArea.setSelectionRange(0, text.length)
            const successful = document.execCommand("copy")
            
            // Limpar seleção
            const selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
              selection.removeAllRanges()
            }
            
            // Remover elemento
            setTimeout(() => {
              if (textArea.parentNode) {
                document.body.removeChild(textArea)
              }
              resolve(successful)
            }, 100)
          } catch (err) {
            console.error("iOS copy failed:", err)
            if (textArea.parentNode) {
              document.body.removeChild(textArea)
            }
            resolve(false)
          }
        })
      } else {
        // Para Android e desktop
        textArea.focus()
        textArea.select()
        textArea.setSelectionRange(0, text.length)

        // Tentar copiar
        let successful = false
        try {
          successful = document.execCommand("copy")
        } catch (execErr) {
          console.warn("execCommand failed:", execErr)
        }

        // Limpar seleção
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          selection.removeAllRanges()
        }

        // Remover elemento
        setTimeout(() => {
          if (textArea.parentNode) {
            document.body.removeChild(textArea)
          }
          resolve(successful)
        }, 100)
      }
    } catch (err) {
      console.error("Failed to copy text:", err)
      resolve(false)
    }
  })
}

