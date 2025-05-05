"use client"

import { ThemeProvider } from "@/contexts/ThemeContext"
import TodoApp from "@/components/TodoApp"

export default function Home() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  )
}
