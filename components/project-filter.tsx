"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

export function ProjectFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    setActiveFilter(categoryParam || "all")
  }, [searchParams])

  const filters = [
    { id: "all", label: "All" },
    { id: "design", label: "Design" },
    { id: "networking", label: "Networking" },
    { id: "data", label: "Data" },
    { id: "programming", label: "Programming" },
  ]

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
    console.log("Filter diklik:", filterId)
    
    // Update URL dengan category yang dipilih
    const params = new URLSearchParams(searchParams.toString())
    if (filterId === "all") {
      params.delete("category")
    } else {
      params.set("category", filterId)
    }
    
    const url = `/projects${params.toString() ? `?${params.toString()}` : ""}`
    console.log("Navigasi ke:", url)
    router.push(url)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="outline"
          onClick={() => handleFilterChange(filter.id)}
          className={cn(
            "border-purple-500/20 hover:bg-purple-500/10 cursor-pointer",
            activeFilter === filter.id && "bg-purple-500/20 border-purple-500/50",
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
