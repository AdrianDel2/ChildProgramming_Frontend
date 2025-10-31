"use client"

import "../../global.css"
import { Sidebar } from "@/components/ui/sidebar"
import { PracticeList } from "@/components/practices_list"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PracticesListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="processContainer">
      <Sidebar />
      <main className="processMain">
        <div className="processHeader">
          <h1 className="heroTitle">Prácticas</h1>
          <p>Consulta, busca o crea nuevas prácticas colaborativas.</p>
        </div>

        <div className="actionBar">
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar prácticas..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/practices/new" className="createButton">
            <Plus className="createButtonIcon" />
            Nueva Práctica
          </Link>
        </div>

        <PracticeList searchTerm={searchTerm} />
      </main>
    </div>
  )
}
