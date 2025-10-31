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
    { name: "Procesos", href: "/" },
    { name: "Actividades", href: "/activities/list" },
    { name: "Roles", href: "/roles/list" },
    { name: "Rondas", href: "/rounds/list" },
    { name: "Prácticas", href: "/practices/list" },
    { name: "Thinklets", href: "/thinklets/list" },
    { name: "Patrones", href: "/patterns/list" },
  ]

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) setOpen(false)
  }

  return (
    <>
      {/* Botón móvil */}
      <button className="mobileMenuButton" onClick={() => setOpen(!open)}>
        <Menu size={24} />
      </button>

      {/* Overlay móvil */}
      {open && <div className="sidebarOverlay" onClick={() => setOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebarHeader">
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
