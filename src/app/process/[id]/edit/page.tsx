"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Textarea } from "../../../../components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getProcess, updateProcess } from "../../../../lib/api/processes"
import type { Process } from "../../../../lib/types"

export default function EditProcessPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [process, setProcess] = useState<Process | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name_process: "",
    description_process: "",
    version_process: "",
    image: "",
    id_facilitator: 0,
  })

  useEffect(() => {
    fetchProcess()
  }, [])

  const fetchProcess = async () => {
    try {
      const data = await getProcess(Number(params.id))
      setProcess(data)
      setFormData({
        name_process: data.name_process ?? "",
        description_process: data.description_process ?? "",
        version_process: data.version_process ?? "",
        image: data.image ?? "",
        id_facilitator: data.facilitator?.id_role ?? 0, // si el DTO trae objeto facilitator
      })
    } catch (error) {
      console.error("Error fetching process:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateProcess(Number(params.id), formData)
      router.push(`/procesos/${params.id}`)
    } catch (error) {
      console.error("Error updating process:", error)
      alert("Error al actualizar el proceso")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto text-center">Cargando...</div>
      </div>
    )
  }

  if (!process) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto text-center">Proceso no encontrado</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Link href={`/procesos/${params.id}`}>
          <Button variant="outline" className="mb-6 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Editar Proceso</CardTitle>
            <CardDescription>Modifica la información del proceso colaborativo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name_process">Nombre del Proceso</Label>
                <Input
                  id="name_process"
                  value={formData.name_process}
                  onChange={(e) => setFormData({ ...formData, name_process: e.target.value })}
                  required
                  placeholder="Ej: Introducción a Scratch"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_process">Descripción</Label>
                <Textarea
                  id="description_process"
                  value={formData.description_process}
                  onChange={(e) => setFormData({ ...formData, description_process: e.target.value })}
                  required
                  placeholder="Describe el proceso colaborativo..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version_process">Versión</Label>
                <Input
                  id="version_process"
                  value={formData.version_process}
                  onChange={(e) => setFormData({ ...formData, version_process: e.target.value })}
                  placeholder="v1.0"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={saving} className="flex-1 bg-primary hover:bg-primary/90">
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Link href={`/procesos/${params.id}`} className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
