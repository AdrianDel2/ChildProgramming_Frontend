"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../../../global.css"
import { Sidebar } from "@/components/ui/sidebar"

export default function ActivityEditPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name_activity: "",
    description_activity: "",
    iterative: false,
    id_process: "",
    id_practice: "",
    id_thinklet: "",
  })

  const [processes, setProcesses] = useState<any[]>([])
  const [practices, setPractices] = useState<any[]>([])
  const [thinklets, setThinklets] = useState<any[]>([])

  // 🧩 Cargar datos
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [procRes, pracRes, thinkRes] = await Promise.all([
          fetch("http://localhost:8080/api/colaborative_process/list"),
          fetch("http://localhost:8080/api/practice/list"),
          fetch("http://localhost:8080/api/thinklet/list"),
        ])

        setProcesses(await procRes.json())
        setPractices(await pracRes.json())
        setThinklets(await thinkRes.json())

        // ✅ Cargar la actividad específica
        const actRes = await fetch(`http://localhost:8080/api/child_activity/${id}`)
        if (!actRes.ok) throw new Error("Error al obtener la actividad")
        const data = await actRes.json()
        setFormData({
          name_activity: data.name_activity,
          description_activity: data.description_activity,
          iterative: data.iterative,
          id_process: data.id_process ? data.id_process.toString() : "",
          id_practice: data.id_practice ? data.id_practice.toString() : "",
          id_thinklet: data.id_thinklet ? data.id_thinklet.toString() : "",
        })
      } catch (error) {
        console.error("Error cargando datos:", error)
        alert("No se pudo cargar la información de la actividad.")
      }
    }
    if (id) fetchAll()
  }, [id])

  // 🧩 Enviar actualización
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/child_activity/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_activity: formData.name_activity,
          description_activity: formData.description_activity,
          iterative: formData.iterative,
          id_process: Number(formData.id_process),
          id_practice: formData.id_practice ? Number(formData.id_practice) : null,
          id_thinklet: formData.id_thinklet ? Number(formData.id_thinklet) : null,
        }),
      })

      if (response.ok) {
        alert("Actividad actualizada correctamente.")
        router.push("/activities/list")
      } else {
        const errorText = await response.text()
        alert("Error al actualizar la actividad: " + errorText)
      }
    } catch (error) {
      console.error("Error actualizando actividad:", error)
      alert("No se pudo conectar con el servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="processContainer">
      <Sidebar />

      <main className="processMain">
        <div className="processHeader">
          <div className="processTitle">
            <RefreshCcw className="refreshIcon" />
            <h1>Editar Actividad</h1>
          </div>
          <p>Modifica los datos de la actividad seleccionada</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm space-y-5">
          {/* Nombre */}
          <div className="formRow">
            <label>Nombre de la actividad: *</label>
            <input
              type="text"
              required
              value={formData.name_activity}
              onChange={(e) => setFormData({ ...formData, name_activity: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={formData.description_activity}
              onChange={(e) => setFormData({ ...formData, description_activity: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Iterativa */}
          <div className="formRow flex items-center">
            <label className="text-gray-800 font-medium mr-3">Iterativa:</label>
            <input
            type="checkbox"
            checked={formData.iterative}
            disabled
            readOnly
            className="w-6 h-6 accent-blue-600 cursor-default"
            />
          </div>

          {/* Proceso */}
          <div className="formRow">
            <label>Proceso:</label>
            <select
              value={formData.id_process}
              onChange={(e) => setFormData({ ...formData, id_process: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Selecciona un proceso</option>
              {processes.map((p) => (
                <option key={p.id_process} value={p.id_process}>
                  {p.name_process}
                </option>
              ))}
            </select>
          </div>

          {/* Práctica */}
          <div className="formRow">
            <label>Práctica:</label>
            <select
              value={formData.id_practice}
              onChange={(e) => setFormData({ ...formData, id_practice: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Selecciona una práctica</option>
              {practices.map((pr) => (
                <option key={pr.id_practice} value={pr.id_practice}>
                  {pr.name_practice}
                </option>
              ))}
            </select>
          </div>

          {/* Thinklet */}
          <div className="formRow">
            <label>Thinklet:</label>
            <select
              value={formData.id_thinklet}
              onChange={(e) => setFormData({ ...formData, id_thinklet: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Selecciona un thinklet</option>
              {thinklets.map((th) => (
                <option key={th.id_thinklet} value={th.id_thinklet}>
                  {th.name_thinklet}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="buttonGroup flex justify-between mt-6">
            <Link href="/activities/list">
              <button
                type="button"
                className="btnVolver border-2 border-blue-600 text-blue-600 font-semibold px-6 py-2 rounded-2xl hover:bg-blue-50 transition"
              >
                Cancelar
              </button>
            </Link>

            <button
              type="submit"
              className="btnCrear bg-blue-600 text-white font-semibold px-6 py-2 rounded-2xl hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
