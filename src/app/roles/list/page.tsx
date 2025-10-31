// src/app/roles/list/page.tsx
"use client"

import "../../global.css"
import { Sidebar } from "@/components/ui/sidebar"
import { RoleList } from "@/components/role_list" // ✅ correcto
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RolesListPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="processContainer">
      <Sidebar />

      <main className="processMain">
        <div className="processHeader">
          <h1 className="heroTitle">Roles</h1>
          <p>Consulta, busca o crea nuevos roles colaborativos.</p>
        </div>

        <div className="actionBar">
          <div className="searchContainer">
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar roles..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/roles/new" className="createButton">
            <Plus className="createButtonIcon" />
            Nuevo Rol
          </Link>
        </div>

        <RoleList searchTerm={searchTerm} /> {/* ✅ ya coincide */}
      </main>
    </div>
  )
}
