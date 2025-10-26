"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import React, { useState } from "react"
import "../../app/global.css"

interface NavLink {
  name: string
  href: string
}

export function Sidebar(): JSX.Element {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links: NavLink[] = [
    { name: "Procesos", href: "/process/new" },
    { name: "Actividades", href: "/activities/list" },
    { name: "Roles", href: "/roles" },
    { name: "Rondas", href: "/rounds" },
    { name: "Prácticas", href: "/practices" },
    { name: "Thinklets", href: "/thinklets" },
    { name: "Patrones", href: "/patterns" },
  ]

  // Cerrar al hacer clic en un enlace
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) setOpen(false)
  }

  return (
    <>
      {/* Botón móvil flotante */}
      <button 
        className="mobileMenuButton"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay al abrir sidebar */}
      {open && <div className="sidebarOverlay" onClick={() => setOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebarHeader">
          {/* Icono que también abre/cierra */}
          <Menu
            size={20}
            className="menuIcon"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          />
          <h2>Elementos del Proceso</h2>
        </div>

        <nav className="sidebarNav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="navLinkWrapper"
              onClick={handleLinkClick}
            >
              <span
                className={`navItem ${
                  pathname.startsWith(link.href) ? "active" : ""
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
