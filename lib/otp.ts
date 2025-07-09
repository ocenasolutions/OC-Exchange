import { connectToDatabase } from "./mongodb"
import type { ObjectId } from "mongodb"

export interface OTPRecord {
  _id?: ObjectId
  email: string
  otp: string
  expiresAt: Date
  attempts: number
  createdAt: Date
}

export async function generateOTP(): Promise<string> {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function saveOTP(email: string, otp: string): Promise<void> {
  const { db } = await connectToDatabase()

  // Delete any existing OTP for this email
  await db.collection("otps").deleteMany({ email })

  // Save new OTP with 10 minute expiry
  await db.collection("otps").insertOne({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    attempts: 0,
    createdAt: new Date(),
  })
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const { db } = await connectToDatabase()

  const otpRecord = (await db.collection("otps").findOne({
    email,
    expiresAt: { $gt: new Date() },
  })) as OTPRecord | null

  if (!otpRecord) {
    return false
  }

  // Increment attempts
  await db.collection("otps").updateOne({ _id: otpRecord._id }, { $inc: { attempts: 1 } })

  // Check if too many attempts
  if (otpRecord.attempts >= 5) {
    await db.collection("otps").deleteOne({ _id: otpRecord._id })
    return false
  }

  // Verify OTP
  if (otpRecord.otp === otp) {
    // Delete OTP after successful verification
    await db.collection("otps").deleteOne({ _id: otpRecord._id })
    return true
  }

  return false
}

export async function deleteOTP(email: string): Promise<void> {
  const { db } = await connectToDatabase()
  await db.collection("otps").deleteMany({ email })
}
