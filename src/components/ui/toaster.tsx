"use client"

import * as React from "react"
import { Toast } from "./toast"

interface ToastMessage {
  id: string
  title: string
  variant?: "default" | "success" | "error"
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  React.useEffect(() => {
    const handler = (e: CustomEvent<ToastMessage>) => {
      setToasts((prev) => [...prev, { ...e.detail, id: crypto.randomUUID() }])
      setTimeout(() => {
        setToasts((prev) => prev.slice(1))
      }, 3000)
    }
    window.addEventListener("app:toast", handler as EventListener)
    return () => window.removeEventListener("app:toast", handler as EventListener)
  }, [])

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant}>
          {toast.title}
        </Toast>
      ))}
    </>
  )
}
