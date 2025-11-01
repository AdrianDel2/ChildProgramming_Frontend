"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../../../global.css"
import { Sidebar } from "@/components/ui/sidebar"

export default function PracticeEditPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name_practice: "",
    description_practice: "",
    type_practice: "",
  })

  // Enum del backend (tipos de práctica)
  const practiceTypes = ["COGNITIVA", "AGIL", "COLABORATIVA"]

  // 🧩 Cargar práctica por ID
  useEffect(() => {
    const fetchPractice = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/practice/${id}`)
        if (!res.ok) throw new Error("Error al obtener la práctica")

        const data = await res.json()
        setFormData({
          name_practice: data.name_practice,
          description_practice: data.description_practice || "",
          type_practice: data.type_practice || "",
        })
      } catch (error) {
        console.error("Error cargando práctica:", error)
        alert("No se pudo cargar la información de la práctica.")
      }
    }

    if (id) fetchPractice()
  }, [id])

  // 🧩 Actualizar práctica
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`http://localhost:8080/api/practice/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Práctica actualizada correctamente.")
        router.push("/practices/list")
      } else {
        const errorText = await res.text()
        alert("Error al actualizar la práctica: " + errorText)
      }
    } catch (error) {
      console.error("Error actualizando práctica:", error)
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
            <h1>Editar Práctica</h1>
          </div>
          <p>Modifica los datos de la práctica seleccionada</p>
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
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={formData.description_practice}
              onChange={(e) => setFormData({ ...formData, description_practice: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Tipo */}
          <div className="formRow">
            <label>Tipo de práctica:</label>
            <select
              required
              value={formData.type_practice}
              onChange={(e) => setFormData({ ...formData, type_practice: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
            <Link href="/practices/list">
              <button
                type="button"
                className="btnVolver border-2 border-blue-600 text-blue-600 font-semibold 
                  px-6 py-2 rounded-2xl hover:bg-blue-50 transition"
              >
                Cancelar
              </button>
            </Link>

            <button
              type="submit"
              className="btnCrear bg-blue-600 text-white font-semibold px-6 py-2 rounded-2xl 
                hover:bg-blue-700 transition"
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
