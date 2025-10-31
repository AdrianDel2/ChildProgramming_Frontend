"use client"

import "../../global.css"
import { Sidebar } from "@/components/ui/sidebar"
import { PatternList } from "@/components/pattern_list"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PatternsListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="processContainer">
      <Sidebar />
      <main className="processMain">
        <div className="processHeader">
          <h1 className="heroTitle">Patrones</h1>
          <p>Consulta, busca o crea nuevos patrones colaborativos.</p>
        </div>

        <div className="actionBar">
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar patrones..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/patterns/new" className="createButton">
            <Plus className="createButtonIcon" />
            Nuevo Patrón
          </Link>
        </div>

        <PatternList searchTerm={searchTerm} />
      </main>
    </div>
  )
}
