"use client"

import { useState } from "react"
import Header from "@/components/Header"
import AddTask from "@/components/AddTask"
import TaskList from "@/components/TaskList"
import Filters from "@/components/Filters"
import Stats from "@/components/Stats"
import { TaskProvider } from "@/contexts/TaskContext"
import { Toaster } from "@/components/ui/toaster"

export default function TodoApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <TaskProvider>
      <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Header setSearchQuery={setSearchQuery} />
          <main className="mt-8">
            <AddTask />
            <div className="mt-6">
              <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>
            <div className="mt-4">
              <Stats />
            </div>
            <div className="mt-6">
              <TaskList filter={activeFilter} searchQuery={searchQuery} />
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </TaskProvider>
  )
}
