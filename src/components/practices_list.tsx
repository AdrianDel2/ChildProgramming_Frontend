"use client"

import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"
import { ScrollArea } from "../components/ui/scroll-area"
import { Badge } from "../components/ui/badge"

interface Practice {
  id: number
  name: string
  description: string
}

export function Practice_list() {
  const [practices, setPractices] = useState<Practice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPractices()
  }, [])

  const fetchPractices = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/practice/list")
      const data = await response.json()
      setPractices(data)
    } catch (error) {
      console.error("Error fetching practices:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Prácticas</h3>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : practices.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay prácticas</p>
      ) : (
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {practices.map((practice) => (
              <div
                key={practice.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{practice.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{practice.description}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {practice.id}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
