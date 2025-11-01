import "./global.css"
import { Sidebar } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

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
        <Toaster />
      </body>
    </html>
  )
}
