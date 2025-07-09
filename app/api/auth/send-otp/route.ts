import { type NextRequest, NextResponse } from "next/server"
import { generateOTP, saveOTP } from "@/lib/otp"
import { sendOTPEmail } from "@/lib/email"
import { connectToDatabase } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user already exists
    const { db } = await connectToDatabase()
    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Generate and save OTP
    const otp = await generateOTP()
    await saveOTP(email, otp)

    // Send OTP email
    await sendOTPEmail(email, otp)

    return NextResponse.json({ message: "OTP sent successfully" })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
