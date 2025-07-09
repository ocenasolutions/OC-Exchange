"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  email: string
  name: string
  role: "user" | "admin"
  kycStatus: "pending" | "approved" | "rejected"
  twoFactorEnabled: boolean
  emailVerified: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, twoFactorCode?: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loading: boolean
  enable2FA: () => Promise<string>
  verify2FA: (code: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string, twoFactorCode?: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, twoFactorCode }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Registration failed. Please try again." }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const enable2FA = async (): Promise<string> => {
    // TODO: Implement 2FA setup
    return "otpauth://totp/OC%20Exchange:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=OC%20Exchange"
  }

  const verify2FA = async (code: string): Promise<boolean> => {
    // TODO: Implement 2FA verification
    return code === "123456"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        enable2FA,
        verify2FA,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
