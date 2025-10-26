import "./global.css"
import { Sidebar } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div style={{ display: "flex" }}>
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  )
}
