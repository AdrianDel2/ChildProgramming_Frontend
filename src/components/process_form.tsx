"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, RefreshCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import "../app/global.css"
import { Sidebar } from "./ui/sidebar"

export function ProcessForm() {
  const router = useRouter()

  // ✅ nombres iguales a los del backend
  const [formData, setFormData] = useState({
    name_process: "",
    description_process: "",
    version_process: "1.0",
    image: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/colaborative_process/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ✅ los nombres ya coinciden
      })

      if (response.ok) {
        router.push("/")
      } else {
        const errorText = await response.text()
        alert("Error al crear el proceso: " + errorText)
      }
    } catch (error) {
      console.error("Error creando proceso:", error)
      alert("No se pudo conectar con el servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="processContainer">
      <Sidebar />

      {/* Main content */}
      <main className="processMain">
        <div className="processHeader">
          <div className="processTitle">
            <RefreshCcw className="refreshIcon" />
            <h1>Crear Nuevo Proceso</h1>
          </div>
          <p>Completa la información para crear un nuevo proceso colaborativo</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm">
          <div className="formRow">
            <label>Nombre del proceso: *</label>
            <input
              type="text"
              required
              value={formData.name_process}
              onChange={(e) => setFormData({ ...formData, name_process: e.target.value })}
            />
          </div>

          <div className="formRow">
            <label>Descripción del proceso: *</label>
            <input
              type="text"
              required
              value={formData.description_process}
              onChange={(e) => setFormData({ ...formData, description_process: e.target.value })}
            />
          </div>

          <div className="formRow">
            <label>Versión:</label>
            <input
              type="text"
              value={formData.version_process}
              onChange={(e) => setFormData({ ...formData, version_process: e.target.value })}
            />
          </div>

          <div className="formRow">
            <label>Imagen:</label>
            <button
              type="button"
              className="uploadBtn"
              onClick={() => alert("Subida de imagen pendiente de implementar")}
            >
              <Upload size={18} />
              Subir imagen
            </button>
          </div>

          <div className="buttonGroup">
            <Link href="/">
              <button type="button" className="btnVolver">
                Volver
              </button>
            </Link>
            <button type="submit" className="btnCrear" disabled={loading}>
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
