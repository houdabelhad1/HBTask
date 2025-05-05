"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    // Vérifier si le thème est stocké dans localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null

    // Vérifier la préférence système
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Appliquer le thème stocké ou la préférence système
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)

    // Appliquer la classe au document
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light"

      // Sauvegarder dans localStorage
      localStorage.setItem("theme", newTheme)

      // Appliquer la classe au document
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      return newTheme
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
