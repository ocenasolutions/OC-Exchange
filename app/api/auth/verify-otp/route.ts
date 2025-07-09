import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp"
import { hashPassword } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { sendWelcomeEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email, otp, name, password } = await request.json()

    if (!email || !otp || !name || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(email, otp)
    if (!isValidOTP) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const { db } = await connectToDatabase()
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      twoFactorEnabled: false,
      kycStatus: "pending",
    })

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail registration if email fails
    }

    return NextResponse.json({
      message: "Registration successful",
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
