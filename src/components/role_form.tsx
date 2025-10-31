"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../app/global.css"
import { Sidebar } from "./ui/sidebar"

export function RoleForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // ✅ Estructura igual al DTO del backend
  const [formData, setFormData] = useState({
    name_role: "",
    description_role: "",
    skills_role: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/role/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/roles") // redirigir al listado
      } else {
        const errorText = await response.text()
        alert("Error al crear el rol: " + errorText)
      }
    } catch (error) {
      console.error("Error creando rol:", error)
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
            <h1>Crear Nuevo Rol</h1>
          </div>
          <p>Completa la información para registrar un nuevo rol colaborativo</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm space-y-5">
          {/* Nombre del rol */}
          <div className="formRow">
            <label>Nombre del rol: *</label>
            <input
              type="text"
              required
              value={formData.name_role}
              onChange={(e) => setFormData({ ...formData, name_role: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={formData.description_role}
              onChange={(e) => setFormData({ ...formData, description_role: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Habilidades */}
          <div className="formRow">
            <label>Habilidades:</label>
            <input
              type="text"
              value={formData.skills_role}
              onChange={(e) => setFormData({ ...formData, skills_role: e.target.value })}
              placeholder="Ejemplo: Comunicación, liderazgo, planificación..."
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Botones */}
          <div className="buttonGroup flex justify-between mt-6">
            <Link href="/roles">
              <button
                type="button"
                className="btnVolver border-2 border-blue-600 text-blue-600 font-semibold px-6 py-2 rounded-2xl hover:bg-blue-50 transition"
              >
                Volver
              </button>
            </Link>

            <button
              type="submit"
              className="btnCrear bg-blue-600 text-white font-semibold px-6 py-2 rounded-2xl hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Rol"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
