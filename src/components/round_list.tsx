"use client"

import { useEffect, useState } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Round {
  id_round: number
  name_round: string
  description_round: string
}

export function RoundList({ searchTerm }: { searchTerm?: string }) {
  const [rounds, setRounds] = useState<Round[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { fetchRounds() }, [])

  const fetchRounds = async () => {
    try {
      const response = await fetch("/api/rounds/list", { cache: "no-store" })
      if (!response.ok) throw new Error("Error al obtener rondas")
      const data = await response.json()
      setRounds(data)
    } catch {
      setError("Error al cargar las rondas")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta ronda?")) return
    await fetch(`http://localhost:8080/api/round/delete/${id}`, { method: "DELETE" })
    fetchRounds()
  }

  const normalize = (t?: string) => (t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  const filtered = rounds.filter(r => normalize(r.name_round).includes(normalize(searchTerm)) || normalize(r.description_round).includes(normalize(searchTerm)))

  if (loading) return <p className="text-center py-10 text-blue-600">Cargando rondas...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>
  if (rounds.length === 0) return <p className="text-center py-10 text-gray-500">No existen rondas todavía.</p>

  return (
    <div className="grid gap-6 mt-6">
      {filtered.map(round => (
        <div key={round.id_round} className="processCardContainer">
          <div className="flex flex-col items-center p-6">
            <h2 className="text-lg font-semibold">{round.name_round}</h2>
            <p className="text-gray-600 mb-4">{round.description_round}</p>
            <div className="processButtonGroup">
              <Link href={`/rounds/${round.id_round}`}><button className="processButton view"><Eye className="h-4 w-4"/>Ver</button></Link>
              <Link href={`/rounds/${round.id_round}/edit`}><button className="processButton edit"><Edit className="h-4 w-4"/>Editar</button></Link>
              <button className="processButton delete" onClick={() => handleDelete(round.id_round)}><Trash2 className="h-4 w-4"/>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
