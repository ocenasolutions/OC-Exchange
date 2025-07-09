"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("Login attempt for:", email)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log("Login response:", { status: response.status, data })

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Update auth context
      await login(data.user, data.token)
      ;(window as any).toast?.({
        type: "success",
        title: "Login Successful",
        description: "Welcome back to OC Exchange",
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message)
      ;(window as any).toast?.({
        type: "error",
        title: "Login Failed",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">Sign in to your OC Exchange account</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
