"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../app/global.css"
import { Sidebar } from "./ui/sidebar"

export function PracticeForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name_practice: "",
    description_practice: "",
    type_practice: "",
  })

  const practiceTypes = ["COGNITIVA", "AGIL", "COLABORATIVA"]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/practice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/practices")
      } else {
        const errorText = await response.text()
        alert("Error al crear la práctica: " + errorText)
      }
    } catch (error) {
      console.error("Error creando práctica:", error)
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
            <h1>Crear Nueva Práctica</h1>
          </div>
          <p>Completa la información para registrar una nueva práctica</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm space-y-5">
          {/* Nombre */}
          <div className="formRow">
            <label>Nombre de la práctica: *</label>
            <input
              type="text"
              required
              value={formData.name_practice}
              onChange={(e) => setFormData({ ...formData, name_practice: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={formData.description_practice}
              onChange={(e) => setFormData({ ...formData, description_practice: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Tipo de práctica */}
          <div className="formRow">
            <label>Tipo de práctica: *</label>
            <select
              required
              value={formData.type_practice}
              onChange={(e) => setFormData({ ...formData, type_practice: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Selecciona un tipo</option>
              {practiceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="buttonGroup flex justify-between mt-6">
            <Link href="/practices">
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
              {loading ? "Creando..." : "Crear Práctica"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
