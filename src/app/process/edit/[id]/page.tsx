"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { RefreshCcw } from "lucide-react"
import Link from "next/link"
import "../../../global.css"
import { Sidebar } from "@/components/ui/sidebar"

export default function ProcessEditPage() {
  const router = useRouter()
  const { id } = useParams() // obtiene el ID de la URL
  const [loading, setLoading] = useState(false)
  const [processData, setProcessData] = useState({
    name_process: "",
    description_process: "",
    version_process: "",
    image: "",
  })

  // Cargar datos del proceso al montar la vista
  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/colaborative_process/${id}`)
        if (!response.ok) throw new Error("Error al obtener el proceso")
        const data = await response.json()
        setProcessData({
          name_process: data.name_process,
          description_process: data.description_process,
          version_process: data.version_process,
          image: data.image,
        })
      } catch (error) {
        console.error("Error cargando el proceso:", error)
        alert("No se pudo cargar la información del proceso.")
      }
    }
    if (id) fetchProcess()
  }, [id])

  // Enviar los cambios al backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/api/colaborative_process/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processData),
      })

      if (response.ok) {
        alert("Proceso actualizado correctamente.")
        router.push("/") // redirigir al listado o home
      } else {
        const errorText = await response.text()
        alert("Error al actualizar el proceso: " + errorText)
      }
    } catch (error) {
      console.error("Error actualizando proceso:", error)
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
            <h1>Editar Proceso</h1>
          </div>
          <p>Modifica la información del proceso colaborativo</p>
        </div>

        <form onSubmit={handleSubmit} className="processForm">
          {/* Nombre */}
          <div className="formRow">
            <label>Nombre del proceso: *</label>
            <input
              type="text"
              required
              value={processData.name_process}
              onChange={(e) => setProcessData({ ...processData, name_process: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Descripción */}
          <div className="formRow">
            <label>Descripción:</label>
            <input
              type="text"
              value={processData.description_process}
              onChange={(e) => setProcessData({ ...processData, description_process: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Versión */}
          <div className="formRow">
            <label>Versión:</label>
            <input
              type="text"
              value={processData.version_process}
              onChange={(e) => setProcessData({ ...processData, version_process: e.target.value })}
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Imagen */}
          <div className="formRow">
            <label>Imagen:</label>
            <input
              type="text"
              value={processData.image}
              onChange={(e) => setProcessData({ ...processData, image: e.target.value })}
              placeholder="URL o nombre del archivo"
              className="w-full border-2 border-blue-600 rounded-2xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Botones */}
          <div className="buttonGroup flex justify-between mt-6">
            <Link href="/">
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