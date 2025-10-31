"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { ActivityList } from "@/components/activity/activity_list"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import "../../global.css" 

export default function ActivitiesListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="processContainer">
      <Sidebar />

      <main className="processMain">
        <div className="processHeader">
          <h1 className="text-2xl font-bold text-gray-900">Actividades</h1>
          <p className="text-gray-600">
            Consulta, busca o crea nuevas actividades colaborativas.
          </p>
        </div>

        <div className="actionBar">
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar actividades..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/activities/new" className="createButton">
            <Plus className="createButtonIcon" />
            Nueva Actividad
          </Link>
        </div>

        <ActivityList searchTerm={searchTerm} />
      </main>
    </div>
  )
}
