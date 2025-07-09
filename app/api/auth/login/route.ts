export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, twoFactorCode } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Authenticate user
    const result = await authenticateUser(email, password, twoFactorCode)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: result.user,
    })

    response.cookies.set("auth-token", result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
