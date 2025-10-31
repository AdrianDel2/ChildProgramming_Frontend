"use client"

import "../../global.css"
import { Sidebar } from "@/components/ui/sidebar"
import { ThinkletList } from "@/components/thinklet_list"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ThinkletsListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="processContainer">
      <Sidebar />
      <main className="processMain">
        <div className="processHeader">
          <h1 className="heroTitle">Thinklets</h1>
          <p>Consulta, busca o crea nuevos thinklets colaborativos.</p>
        </div>

        <div className="actionBar">
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar thinklets..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/thinklets/new" className="createButton">
            <Plus className="createButtonIcon" />
            Nuevo Thinklet
          </Link>
        </div>

        <ThinkletList searchTerm={searchTerm} />
      </main>
    </div>
  )
}
