"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Task } from "@/types"
import { api } from "@/services/api"
import { useToast } from "@/components/ui/use-toast"

interface TaskContextType {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  addTask: (task: Omit<Task, "id">) => Promise<void>
  updateTask: (task: Task) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Charger les tâches au démarrage
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/tasks")
      setTasks(response.data)
      setError(null)
    } catch (err) {
      console.error("Erreur lors du chargement des tâches:", err)
      setError("Impossible de charger les tâches. Veuillez réessayer plus tard.")

      // Fallback: charger depuis localStorage
      const storedTasks = localStorage.getItem("tasks")
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
        toast({
          title: "Mode hors ligne",
          description: "Utilisation des données locales. Certaines fonctionnalités peuvent être limitées.",
          variant: "default",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await api.post("/tasks", task)
      setTasks((prev) => [...prev, response.data])

      // Sauvegarder dans localStorage
      localStorage.setItem("tasks", JSON.stringify([...tasks, response.data]))
    } catch (err) {
      console.error("Erreur lors de l'ajout de la tâche:", err)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la tâche. Veuillez réessayer.",
        variant: "destructive",
      })

      // Fallback: ajouter localement avec un ID temporaire
      const tempTask = {
        ...task,
        id: Date.now(), // ID temporaire
        _offline: true, // Marquer comme hors ligne
      }
      setTasks((prev) => [...prev, tempTask as Task])
      localStorage.setItem("tasks", JSON.stringify([...tasks, tempTask]))
    }
  }

  const updateTask = async (task: Task) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: task.completed,
      })

      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))

      // Mettre à jour localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks.map((t) => (t.id === task.id ? task : t))))
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la tâche:", err)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la tâche. Veuillez réessayer.",
        variant: "destructive",
      })

      // Fallback: mettre à jour localement
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...task, _offline: true } : t)))
      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks.map((t) => (t.id === task.id ? { ...task, _offline: true } : t))),
      )
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))

      // Mettre à jour localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks.filter((t) => t.id !== id)))
    } catch (err) {
      console.error("Erreur lors de la suppression de la tâche:", err)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la tâche. Veuillez réessayer.",
        variant: "destructive",
      })

      // Fallback: supprimer localement
      setTasks((prev) => prev.filter((t) => t.id !== id))
      localStorage.setItem("tasks", JSON.stringify(tasks.filter((t) => t.id !== id)))
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
