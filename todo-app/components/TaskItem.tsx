"use client"

import { useState } from "react"
import { Pencil, Trash2, X, Save } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTasks } from "@/contexts/TaskContext"
import type { Task } from "@/types"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description || "")
  const { updateTask, deleteTask } = useTasks()

  const handleToggleComplete = () => {
    updateTask({
      ...task,
      completed: !task.completed,
    })
  }

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditedTitle(task.title)
    setEditedDescription(task.description || "")
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteTask(task.id!)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 p-4 transition-all duration-300",
        "hover:shadow-md",
        task.completed && "bg-slate-50 dark:bg-slate-800/50",
      )}
    >
      {isEditing ? (
        <div className="space-y-3">
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border-slate-200 dark:border-slate-700 focus:ring-[#6366f1] focus:border-[#6366f1]"
            placeholder="Titre de la tâche"
          />
          <Input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border-slate-200 dark:border-slate-700 focus:ring-[#6366f1] focus:border-[#6366f1]"
            placeholder="Description (optionnelle)"
          />
          <div className="flex space-x-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancelEdit}
              className="text-slate-600 dark:text-slate-400"
            >
              <X className="h-4 w-4 mr-1" />
              Annuler
            </Button>
            <Button size="sm" onClick={handleSaveEdit} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white">
              <Save className="h-4 w-4 mr-1" />
              Enregistrer
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              className={cn(
                "border-2 h-5 w-5 rounded-full transition-colors",
                task.completed ? "border-[#6366f1] bg-[#6366f1]" : "border-slate-300 dark:border-slate-600",
              )}
            />
          </div>
          <div className="ml-3 flex-grow">
            <h3
              className={cn(
                "text-[#1e293b] dark:text-white font-medium transition-all duration-300",
                task.completed && "line-through text-[#64748b] dark:text-slate-500",
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={cn(
                  "text-sm text-[#64748b] dark:text-slate-400 mt-1 transition-all duration-300",
                  task.completed && "line-through text-[#94a3b8] dark:text-slate-600",
                )}
              >
                {task.description}
              </p>
            )}
          </div>
          <div className="flex space-x-1 ml-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-slate-500 hover:text-[#6366f1] hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Modifier la tâche"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              className="h-8 w-8 text-slate-500 hover:text-[#f43f5e] hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Supprimer la tâche"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
