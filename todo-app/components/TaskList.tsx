"use client"

import { useTasks } from "@/contexts/TaskContext"
import TaskItem from "@/components/TaskItem"
import { Loader2 } from "lucide-react"

interface TaskListProps {
  filter: string
  searchQuery: string
}

export default function TaskList({ filter, searchQuery }: TaskListProps) {
  const { tasks, isLoading, error } = useTasks()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-[#6366f1] animate-spin" />
        <span className="ml-2 text-[#64748b] dark:text-slate-400">Chargement des tâches...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
        <p>Une erreur est survenue lors du chargement des tâches.</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
        <p className="text-[#64748b] dark:text-slate-400">Aucune tâche pour le moment. Ajoutez-en une !</p>
      </div>
    )
  }

  const filteredTasks = tasks.filter((task) => {
    // Filtre par statut
    if (filter === "completed" && !task.completed) return false
    if (filter === "active" && task.completed) return false

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        task.title.toLowerCase().includes(query) || (task.description && task.description.toLowerCase().includes(query))
      )
    }

    return true
  })

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
        <p className="text-[#64748b] dark:text-slate-400">Aucune tâche ne correspond à vos critères de recherche.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
