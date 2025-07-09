"use client"

import type React from "react"

import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login")
        return
      }

      if (adminOnly && user.role !== "admin") {
        router.push("/dashboard")
        return
      }
    }
  }, [user, loading, router, adminOnly])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || (adminOnly && user.role !== "admin")) {
    return null
  }

  return <>{children}</>
}
