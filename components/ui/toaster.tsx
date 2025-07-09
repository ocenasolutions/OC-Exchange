"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  description?: string
  duration?: number
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newToast = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)
  }

  // Global toast function
  useEffect(() => {
    ;(window as any).toast = addToast
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
      case "error":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
      case "warning":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
      case "info":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
      default:
        return "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getColors(toast.type)}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon(toast.type)}</div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{toast.description}</p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => removeToast(toast.id)}
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
