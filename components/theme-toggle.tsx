"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()
  const isDark = useDarkMode()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-5 w-5 rotate-0 scale-100 transition-all duration-300",
          isDark ? "text-slate-200" : "text-slate-700",
          isDark && "rotate-90 scale-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300",
          isDark ? "text-slate-200" : "text-slate-700",
          isDark && "rotate-0 scale-100"
        )}
      />
    </Button>
  )
}

