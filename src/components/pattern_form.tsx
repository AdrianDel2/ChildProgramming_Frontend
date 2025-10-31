"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../app/global.css"
import { Sidebar } from "./ui/sidebar"

export function CollaborativePatternForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // ✅ Campos iguales al DTO del backend
  const [formData, setFormData] = useState({
    name_pattern: "",
    description_pattern: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/pattern/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/patterns") // redirige al listado de patrones
      } else {
        const errorText = await response.text()
        alert("Error al crear el patrón: " + errorText)
      }
    } catch (error) {
      console.error("Error creando patrón:", error)
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
            <h1>Crear Nuevo Patrón Colaborativo</h1>
          </div>
          <p>Completa la información para registrar un nuevo patrón colaborativo</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm">
          {/* Nombre */}
          <div className="formRow">
            <label>Nombre del patrón: *</label>
            <input
              type="text"
              required
              value={formData.name_pattern}
              onChange={(e) => setFormData({ ...formData, name_pattern: e.target.value })}
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <textarea
              rows={4}
              value={formData.description_pattern}
              onChange={(e) => setFormData({ ...formData, description_pattern: e.target.value })}
            />
          </div>

          {/* Botones */}
          <div className="buttonGroup">
            <Link href="/patterns">
              <button type="button" className="btnVolver">
                Volver
              </button>
            </Link>
            <button type="submit" className="btnCrear" disabled={loading}>
              {loading ? "Creando..." : "Crear Patrón"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
