export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getUserTransactions, createTransaction } from "@/lib/wallet"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const transactions = await getUserTransactions(decoded.userId)
    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Get transactions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const transactionData = await request.json()

    const result = await createTransaction({
      userId: decoded.userId,
      ...transactionData,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, transaction: result.transaction })
  } catch (error) {
    console.error("Create transaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
