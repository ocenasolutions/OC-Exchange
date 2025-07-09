export const dynamic = "force-dynamic"
import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { createOrder, getUserOrders } from "@/lib/trading"

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

    const orders = await getUserOrders(decoded.userId)
    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Get orders error:", error)
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

    const orderData = await request.json()

    // Validate order data
    if (!orderData.symbol || !orderData.side || !orderData.type || !orderData.amount) {
      return NextResponse.json({ error: "Missing required order fields" }, { status: 400 })
    }

    const result = await createOrder({
      userId: decoded.userId,
      ...orderData,
      status: "open",
      filledAmount: 0,
      remainingAmount: orderData.amount,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, order: result.order })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
