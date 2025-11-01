export function useToast() {
  return {
    toast: (title: string, variant?: "default" | "success" | "error") => {
      const event = new CustomEvent("app:toast", { detail: { title, variant } })
      window.dispatchEvent(event)
    },
  }
}
