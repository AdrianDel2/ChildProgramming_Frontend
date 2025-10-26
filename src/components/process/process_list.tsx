"use client"

import { useEffect, useState } from "react"
import { Eye, Edit, Trash2, Download } from "lucide-react"
import Link from "next/link"
import { getProcesses, deleteProcess } from "../../lib/api/processes"
import { generateProcessPDF } from "../../lib/pdf_generator"
import type { Process } from "../../lib/types"

export function Process_list({ searchTerm }: { searchTerm?: string }) {
  const [processes, setProcesses] = useState<Process[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProcesses()
  }, [])

  const fetchProcesses = async () => {
    try {
      const data = await getProcesses()
      setProcesses(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching processes:", error)
      setError("Error al cargar los procesos")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este proceso?")) return
    try {
      await deleteProcess(id)
      fetchProcesses()
    } catch (error) {
      console.error("Error deleting process:", error)
      alert("Error al eliminar el proceso")
    }
  }

  const handleDownload = async (process: Process) => {
    try {
      await generateProcessPDF(process)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error al generar el PDF")
    }
  }

  const normalizeText = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()

  const filteredProcesses = processes.filter((process) => {
    const name = normalizeText(process.name_process || "")
    const description = normalizeText(process.description_process || "")
    const query = normalizeText(searchTerm || "")
    return name.includes(query) || description.includes(query)
  })

  if (loading) return <div className="text-center py-10 text-blue-600 text-lg">Cargando procesos...</div>

  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        {error}
        <button className="processButton view ml-4" onClick={fetchProcesses}>
          Reintentar
        </button>
      </div>
    )

  if (processes.length === 0) return <div className="text-center py-10 text-gray-500">No hay procesos registrados.</div>

  return (
    <div className="grid gap-6 mt-6">
      {filteredProcesses.map((process) => (
        <div key={process.id_process} className="processCardContainer">
          <div className="flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="catIconCircle">
                <img src="/caticon.svg" alt="Cat Icon" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{process.name_process}</h2>
            </div>

            <p className="text-gray-600">{process.facilitator ? process.facilitator.name_role : "Sin facilitador"}</p>

            <p className="text-gray-700 mt-2 mb-4">{process.description_process}</p>

            <div className="processButtonGroup">
              <Link href={`/procesos/${process.id_process}`}>
                <button className="processButton view">
                  <Eye className="h-4 w-4" />
                  Ver
                </button>
              </Link>

              <Link href={`/procesos/${process.id_process}/editar`}>
                <button className="processButton edit">
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
              </Link>

              <button className="processButton pdf" onClick={() => handleDownload(process)}>
                <Download className="h-4 w-4" />
                PDF
              </button>

              <button className="processButton delete" onClick={() => handleDelete(process.id_process)}>
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
