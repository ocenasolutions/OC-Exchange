import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  _id: ObjectId
  name: string
  email: string
  password: string
  role: "user" | "admin"
  isEmailVerified: boolean
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  kycStatus: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  console.log("Verifying password...")
  console.log("Plain password length:", password.length)
  console.log("Hashed password length:", hashedPassword.length)

  try {
    const isValid = await bcrypt.compare(password, hashedPassword)
    console.log("Password verification result:", isValid)
    return isValid
  } catch (error) {
    console.error("Password verification error:", error)
    return false
  }
}

export async function generateToken(userId: string): Promise<string> {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()
    console.log("Looking up user with ID:", userId)

    const user = (await db.collection("users").findOne({
      _id: new ObjectId(userId),
    })) as User | null

    console.log("Found user:", user ? "Yes" : "No")
    return user
  } catch (error) {
    console.error("Get user by ID error:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()
    console.log("Looking up user with email:", email)

    const user = (await db.collection("users").findOne({ email })) as User | null
    console.log("Found user:", user ? "Yes" : "No")

    if (user) {
      console.log("User details:", {
        id: user._id,
        email: user.email,
        name: user.name,
        hasPassword: !!user.password,
        passwordLength: user.password?.length,
      })
    }

    return user
  } catch (error) {
    console.error("Get user by email error:", error)
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    console.log("Authenticating user:", email)

    const user = await getUserByEmail(email)
    if (!user) {
      console.log("User not found")
      return null
    }

    console.log("User found, verifying password...")
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      console.log("Password verification failed")
      return null
    }

    console.log("Authentication successful")
    return user
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

// Dynamic import for speakeasy to avoid SSR issues
export async function generateTwoFactorSecret(): Promise<{ secret: string; qrCode: string }> {
  try {
    const speakeasy = await import("speakeasy")

    const secret = speakeasy.generateSecret({
      name: "OC Exchange",
      length: 32,
    })

    return {
      secret: secret.base32,
      qrCode: secret.otpauth_url || "",
    }
  } catch (error) {
    console.error("Error generating 2FA secret:", error)
    throw new Error("Failed to generate 2FA secret")
  }
}

export async function verifyTwoFactorToken(secret: string, token: string): Promise<boolean> {
  try {
    const speakeasy = await import("speakeasy")

    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 2,
    })
  } catch (error) {
    console.error("Error verifying 2FA token:", error)
    return false
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  // This function is imported and used by other modules
  const { sendEmail } = await import("./email")

  const subject = "Welcome to OC Exchange!"
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Welcome to OC Exchange, ${name}!</h1>
      <p>Thank you for joining OC Exchange, the professional cryptocurrency trading platform.</p>
      <p>Your account has been successfully created and verified. You can now:</p>
      <ul>
        <li>Trade cryptocurrencies with advanced tools</li>
        <li>Manage your digital wallet</li>
        <li>Access real-time market data</li>
        <li>Use our professional trading interface</li>
      </ul>
      <p>Get started by logging into your account and exploring our platform.</p>
      <p>If you have any questions, our support team is here to help.</p>
      <p>Happy trading!</p>
      <p><strong>The OC Exchange Team</strong></p>
    </div>
  `

  await sendEmail(email, subject, html)
}
