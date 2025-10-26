import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

async function getProcess(id: string) {
  try {
    const response = await fetch(`http://localhost:8080/api/colaborative_process/${id}`, {
      cache: "no-store",
    })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Error fetching process:", error)
    return null
  }
}

export default async function ProcessDetailPage({ params }: { params: { id: string } }) {
  const process = await getProcess(params.id)

  if (!process) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la lista
          </Button>
        </Link>

        <Card className="border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{process.name}</CardTitle>
                <CardDescription className="text-lg">Detalles del proceso colaborativo</CardDescription>
              </div>
              <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-2">ID: {process.id}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Objetivo</h3>
              <p className="text-foreground leading-relaxed">{process.goal}</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href={`/procesos/${process.id}/editar`} className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">Editar Proceso</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
