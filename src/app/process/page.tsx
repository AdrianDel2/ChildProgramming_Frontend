import { Process_list } from "@/components/process/process_list"
import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Image src="/Logo-azul.jpg" alt="Logo" width={150} height={50} className="object-contain" />
            <h1 className="text-3xl font-bold text-gray-800">Procesos Colaborativos</h1>
          </div>

          <Link href="/crear-proceso">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Crear proceso
            </button>
          </Link>
        </div>

        {/* Search bar placeholder - you can add search functionality here */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar procesos..."
            className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Process List */}
      <div className="max-w-6xl mx-auto">
        <Process_list />
      </div>
    </div>
  )
}