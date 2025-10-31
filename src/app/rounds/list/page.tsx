"use client"

import "../../global.css"
import { Sidebar } from "@/components/ui/sidebar"
import { RoundList } from "@/components/round_list"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RoundsListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="processContainer">
      <Sidebar />
      <main className="processMain">
        <div className="processHeader">
          <h1 className="heroTitle">Rondas</h1>
          <p>Consulta, busca o crea nuevas rondas colaborativas.</p>
        </div>

        <div className="actionBar">
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar rondas..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/rounds/new" className="createButton">
            <Plus className="createButtonIcon" />
            Nueva Ronda
          </Link>
        </div>

        <RoundList searchTerm={searchTerm} />
      </main>
    </div>
  )
}
