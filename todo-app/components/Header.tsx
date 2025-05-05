"use client"

import type React from "react"

import { useState } from "react"
import { Search, Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  setSearchQuery: (query: string) => void
}

export default function Header({ setSearchQuery }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setSearchQuery(value)
  }

  return (
    <header className="pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#1e293b] dark:text-white">
          <span className="text-[#6366f1]">HB</span>
          <span className="text-[#f43f5e]">Task</span>
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher des tâches..."
          className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-[#6366f1] focus:border-[#6366f1]"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </header>
  )
}
