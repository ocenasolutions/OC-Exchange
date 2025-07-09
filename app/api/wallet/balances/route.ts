export const dynamic = "force-dynamic"
import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getUserBalances } from "@/lib/wallet"

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

    const balances = await getUserBalances(decoded.userId)
    return NextResponse.json({ balances })
  } catch (error) {
    console.error("Get balances error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
