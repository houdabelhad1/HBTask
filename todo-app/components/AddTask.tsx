"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTasks } from "@/contexts/TaskContext"
import { useToast } from "@/components/ui/use-toast"

export default function AddTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { addTask } = useTasks()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la tâche ne peut pas être vide",
        variant: "destructive",
      })
      return
    }

    addTask({
      title,
      description,
      completed: false,
    })

    toast({
      title: "Tâche ajoutée",
      description: "Votre nouvelle tâche a été créée avec succès",
    })

    setTitle("")
    setDescription("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-all duration-300"
    >
      <h2 className="text-lg font-semibold text-[#1e293b] dark:text-white mb-4">Ajouter une nouvelle tâche</h2>
      <div className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Titre de la tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-slate-200 dark:border-slate-700 focus:ring-[#6366f1] focus:border-[#6366f1]"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Description (optionnelle)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-slate-200 dark:border-slate-700 focus:ring-[#6366f1] focus:border-[#6366f1]"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white transition-colors duration-300"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter la tâche
        </Button>
      </div>
    </form>
  )
}
