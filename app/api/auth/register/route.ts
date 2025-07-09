import { type NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { sendWelcomeEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isEmailVerified: false,
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
      message: "User created successfully",
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
