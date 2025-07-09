export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }

    // Update user email verification status
    const db = await getDatabase()
    const users = db.collection("users")

    const result = await users.updateOne(
      { emailVerificationToken: token },
      {
        $set: {
          emailVerified: true,
          updatedAt: new Date(),
        },
        $unset: { emailVerificationToken: 1 },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    // Redirect to login page with success message
    return NextResponse.redirect(new URL("/auth/login?verified=true", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
