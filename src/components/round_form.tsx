"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../app/global.css"
import { Sidebar } from "./ui/sidebar"

export function RoundForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // ✅ Estructura igual al DTO del backend
  const [formData, setFormData] = useState({
    name_activity: "",
    description_activity: "",
    iterative: true, // Siempre iterativa
    id_process: "",
    id_practice: "",
    id_thinklet: "",
    round_status: "",
  })

  // Opciones de selects
  const [processes, setProcesses] = useState<any[]>([])
  const [practices, setPractices] = useState<any[]>([])
  const [thinklets, setThinklets] = useState<any[]>([])

  // Enum RoundStatus (ajústalo a los valores reales del backend)
  const roundStatusOptions = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]

  // Cargar datos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [procRes, pracRes, thinkRes] = await Promise.all([
          fetch("http://localhost:8080/api/colaborative_process/all"),
          fetch("http://localhost:8080/api/practice/all"),
          fetch("http://localhost:8080/api/thinklet/all"),
        ])
        setProcesses(await procRes.json())
        setPractices(await pracRes.json())
        setThinklets(await thinkRes.json())
      } catch (error) {
        console.error("Error cargando datos:", error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/round/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_activity: formData.name_activity,
          description_activity: formData.description_activity,
          iterative: true, // 🔒 Siempre iterativa
          id_process: Number(formData.id_process),
          id_practice: formData.id_practice ? Number(formData.id_practice) : null,
          id_thinklet: formData.id_thinklet ? Number(formData.id_thinklet) : null,
          round_status: formData.round_status,
        }),
      })

      if (response.ok) {
        router.push("/rounds")
      } else {
        const errorText = await response.text()
        alert("Error al crear la ronda: " + errorText)
      }
    } catch (error) {
      console.error("Error creando ronda:", error)
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
            <h1>Crear Nueva Ronda</h1>
          </div>
          <p>Completa la información para registrar una nueva ronda colaborativa</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm">
          {/* Nombre */}
          <div className="formRow">
            <label>Nombre de la ronda: *</label>
            <input
              type="text"
              required
              value={formData.name_activity}
              onChange={(e) => setFormData({ ...formData, name_activity: e.target.value })}
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={formData.description_activity}
              onChange={(e) => setFormData({ ...formData, description_activity: e.target.value })}
            />
          </div>

          {/* Estado */}
          <div className="formRow">
            <label>Estado de la ronda: *</label>
            <select
              required
              value={formData.round_status}
              onChange={(e) => setFormData({ ...formData, round_status: e.target.value })}
            >
              <option value="">Selecciona un estado</option>
              {roundStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Proceso */}
          <div className="formRow">
            <label>Proceso asociado: *</label>
            <select
              required
              value={formData.id_process}
              onChange={(e) => setFormData({ ...formData, id_process: e.target.value })}
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
            >
              <option value="">Selecciona un thinklet</option>
              {thinklets.map((th) => (
                <option key={th.id_thinklet} value={th.id_thinklet}>
                  {th.name_thinklet}
                </option>
              ))}
            </select>
          </div>

          {/* Campo iterativo (bloqueado) */}
          <div className="formRow">
            <label>Iterativa:</label>
            <input type="checkbox" checked disabled />
            <small>(Siempre es iterativa)</small>
          </div>

          {/* Botones */}
          <div className="buttonGroup">
            <Link href="/rounds">
              <button type="button" className="btnVolver">
                Volver
              </button>
            </Link>
            <button type="submit" className="btnCrear" disabled={loading}>
              {loading ? "Creando..." : "Crear Ronda"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
