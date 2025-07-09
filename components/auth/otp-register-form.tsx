"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, User, Lock, Shield } from "lucide-react"

export function OTPRegisterForm() {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP + Details
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    otp: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [canResend, setCanResend] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  const startCountdown = () => {
    setCanResend(false)
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP")
      }

      setStep(2)
      startCountdown()
      ;(window as any).toast?.({
        type: "success",
        title: "OTP Sent",
        description: "Please check your email for the verification code",
      })
    } catch (error: any) {
      setError(error.message)
      ;(window as any).toast?.({
        type: "error",
        title: "Error",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (!canResend) return

    setLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      if (response.ok) {
        startCountdown()
        ;(window as any).toast?.({
          type: "success",
          title: "OTP Resent",
          description: "A new verification code has been sent to your email",
        })
      }
    } catch (error) {
      ;(window as any).toast?.({
        type: "error",
        title: "Error",
        description: "Failed to resend OTP",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          name: formData.name,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }
      ;(window as any).toast?.({
        type: "success",
        title: "Registration Successful",
        description: "Your account has been created successfully",
      })

      router.push("/auth/login?message=Registration successful, please login")
    } catch (error: any) {
      setError(error.message)
      ;(window as any).toast?.({
        type: "error",
        title: "Registration Failed",
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          {step === 1 ? "Enter your email to get started" : "Verify your email and complete registration"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  className="pl-10"
                  maxLength={6}
                  required
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Code sent to {formData.email}</span>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || loading}
                  className="text-blue-600 hover:text-blue-500 disabled:text-gray-400"
                >
                  {canResend ? "Resend Code" : `Resend in ${countdown}s`}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)}>
              Back to Email
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
