"use client"

import { useTasks } from "@/contexts/TaskContext"

export default function Stats() {
  const { tasks } = useTasks()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = totalTasks - completedTasks

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="flex flex-wrap gap-3">
      <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-xs font-medium text-[#1e293b] dark:text-white shadow-sm border border-slate-100 dark:border-slate-700">
        Total: {totalTasks}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-xs font-medium text-[#6366f1] shadow-sm border border-slate-100 dark:border-slate-700">
        Actives: {activeTasks}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-xs font-medium text-[#f43f5e] shadow-sm border border-slate-100 dark:border-slate-700">
        Complétées: {completedTasks}
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-xs font-medium text-emerald-500 shadow-sm border border-slate-100 dark:border-slate-700">
        Progression: {completionPercentage}%
      </div>
    </div>
  )
}
