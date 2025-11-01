import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "fixed right-4 top-4 z-50 flex w-auto items-center rounded-lg border bg-white p-4 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "border-gray-300 text-gray-900",
        success: "border-green-500 bg-green-50 text-green-700",
        error: "border-red-500 bg-red-50 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
  }
)
Toast.displayName = "Toast"
