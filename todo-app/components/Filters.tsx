"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FiltersProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export default function Filters({ activeFilter, setActiveFilter }: FiltersProps) {
  const filters = [
    { id: "all", label: "Toutes" },
    { id: "active", label: "Actives" },
    { id: "completed", label: "Complétées" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="outline"
          size="sm"
          onClick={() => setActiveFilter(filter.id)}
          className={cn(
            "transition-all duration-300",
            activeFilter === filter.id
              ? "bg-[#6366f1] text-white border-[#6366f1] hover:bg-[#4f46e5] hover:text-white"
              : "text-[#64748b] dark:text-slate-400 hover:text-[#1e293b] dark:hover:text-white",
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
