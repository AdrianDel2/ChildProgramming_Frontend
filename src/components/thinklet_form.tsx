"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../app/global.css"
import { Sidebar } from "./ui/sidebar"

export function ThinkletForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // ✅ Estructura igual al DTO del backend
  const [formData, setFormData] = useState({
    name_thinklet: "",
    description_thinklet: "",
    id_pattern: "",
  })

  // Lista de patrones para el select
  const [patterns, setPatterns] = useState<any[]>([])

  // Cargar patrones colaborativos
  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/pattern/list")
        const data = await response.json()
        setPatterns(data)
      } catch (error) {
        console.error("Error cargando patrones:", error)
      }
    }
    fetchPatterns()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/thinklet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_thinklet: formData.name_thinklet,
          description_thinklet: formData.description_thinklet,
          id_pattern: Number(formData.id_pattern),
        }),
      })

      if (response.ok) {
        router.push("/thinklets/list")
      } else {
        const errorText = await response.text()
        alert("Error al crear el thinklet: " + errorText)
      }
    } catch (error) {
      console.error("Error creando thinklet:", error)
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
            <h1>Crear Nuevo Thinklet</h1>
          </div>
          <p>Completa la información para registrar un nuevo thinklet</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm">
          {/* Nombre */}
          <div className="formRow">
            <label>Nombre del thinklet: *</label>
            <input
              type="text"
              required
              value={formData.name_thinklet}
              onChange={(e) => setFormData({ ...formData, name_thinklet: e.target.value })}
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={formData.description_thinklet}
              onChange={(e) => setFormData({ ...formData, description_thinklet: e.target.value })}
            />
          </div>

          {/* Patrón colaborativo */}
          <div className="formRow">
            <label>Patrón colaborativo asociado: *</label>
            <select
              required
              value={formData.id_pattern}
              onChange={(e) => setFormData({ ...formData, id_pattern: e.target.value })}
            >
              <option value="">Selecciona un patrón</option>
              {patterns.map((p) => (
                <option key={p.id_pattern} value={p.id_pattern}>
                  {p.name_pattern}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="buttonGroup">
            <Link href="/thinklets">
              <button type="button" className="btnVolver">
                Volver
              </button>
            </Link>
            <button type="submit" className="btnCrear" disabled={loading}>
              {loading ? "Creando..." : "Crear Thinklet"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
