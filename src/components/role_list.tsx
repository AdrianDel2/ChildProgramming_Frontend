"use client"

import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"
import { ScrollArea } from "../components/ui/scroll-area"
import { Badge } from "../components/ui/badge"

interface Role {
  id: number
  name: string
  description: string
}

export function Role_list() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/role/list")
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error("Error fetching roles:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Roles</h3>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : roles.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay roles</p>
      ) : (
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {roles.map((role) => (
              <div
                key={role.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{role.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{role.description}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {role.id}
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
