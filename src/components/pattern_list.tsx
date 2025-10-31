"use client"

import { useEffect, useState } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Pattern {
  id_pattern: number
  name_pattern: string
  description_pattern: string
}

export function PatternList({ searchTerm }: { searchTerm?: string }) {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPatterns()
  }, [])

  const fetchPatterns = async () => {
    try {
      const response = await fetch("/api/patterns/list", { cache: "no-store" })
      if (!response.ok) throw new Error("Error al obtener patrones")
      const data = await response.json()
      setPatterns(data)
      setError(null)
    } catch {
      setError("Error al cargar los patrones")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este patrón?")) return
    try {
      await fetch(`http://localhost:8080/api/pattern/delete/${id}`, { method: "DELETE" })
      fetchPatterns()
    } catch {
      alert("Error al eliminar el patrón")
    }
  }

  const normalize = (t?: string) =>
    (t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  const filtered = patterns.filter((p) =>
    normalize(p.name_pattern).includes(normalize(searchTerm)) ||
    normalize(p.description_pattern).includes(normalize(searchTerm))
  )

  if (loading)
    return <div className="text-center py-10 text-blue-600 text-lg">Cargando patrones...</div>
  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        {error}
        <button className="processButton view ml-4" onClick={fetchPatterns}>
          Reintentar
        </button>
      </div>
    )
  if (patterns.length === 0)
    return <div className="text-center py-10 text-gray-500">No existen patrones todavía.</div>

  return (
    <div className="grid gap-6 mt-6">
      {filtered.map((pattern) => (
        <div key={pattern.id_pattern} className="processCardContainer">
          <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {pattern.name_pattern}
            </h2>
            <p className="text-gray-600 mb-3">{pattern.description_pattern}</p>
            <div className="processButtonGroup">
              <Link href={`/patterns/${pattern.id_pattern}`}>
                <button className="processButton view">
                  <Eye className="h-4 w-4" />
                  Ver
                </button>
              </Link>
              <Link href={`/patterns/${pattern.id_pattern}/edit`}>
                <button className="processButton edit">
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
              </Link>
              <button
                className="processButton delete"
                onClick={() => handleDelete(pattern.id_pattern)}
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
