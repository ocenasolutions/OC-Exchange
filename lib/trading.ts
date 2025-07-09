import { getDatabase } from "./mongodb"

export interface Trade {
  _id?: string
  userId: string
  symbol: string
  side: "buy" | "sell"
  type: "market" | "limit" | "stop-limit"
  amount: number
  price: number
  stopPrice?: number
  status: "open" | "filled" | "cancelled" | "partially_filled"
  filledAmount: number
  remainingAmount: number
  fee: number
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  _id?: string
  userId: string
  symbol: string
  side: "buy" | "sell"
  type: "market" | "limit" | "stop-limit"
  amount: number
  price: number
  stopPrice?: number
  status: "open" | "filled" | "cancelled" | "partially_filled"
  filledAmount: number
  remainingAmount: number
  createdAt: Date
  updatedAt: Date
}

export async function createOrder(
  orderData: Omit<Order, "_id" | "createdAt" | "updatedAt">,
): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const db = await getDatabase()
    const orders = db.collection<Order>("orders")

    const newOrder: Order = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await orders.insertOne(newOrder)

    return {
      success: true,
      order: { ...newOrder, _id: result.insertedId.toString() },
    }
  } catch (error) {
    console.error("Create order error:", error)
    return { success: false, error: "Failed to create order" }
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const db = await getDatabase()
    const orders = db.collection<Order>("orders")

    const userOrders = await orders.find({ userId }).sort({ createdAt: -1 }).toArray()

    return userOrders.map((order) => ({
      ...order,
      _id: order._id!.toString(),
    }))
  } catch (error) {
    console.error("Get user orders error:", error)
    return []
  }
}

export async function cancelOrder(orderId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDatabase()
    const orders = db.collection<Order>("orders")

    const result = await orders.updateOne(
      { _id: orderId as any, userId, status: "open" },
      {
        $set: {
          status: "cancelled",
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return { success: false, error: "Order not found or cannot be cancelled" }
    }

    return { success: true }
  } catch (error) {
    console.error("Cancel order error:", error)
    return { success: false, error: "Failed to cancel order" }
  }
}

export async function getUserTrades(userId: string): Promise<Trade[]> {
  try {
    const db = await getDatabase()
    const trades = db.collection<Trade>("trades")

    const userTrades = await trades.find({ userId }).sort({ createdAt: -1 }).toArray()

    return userTrades.map((trade) => ({
      ...trade,
      _id: trade._id!.toString(),
    }))
  } catch (error) {
    console.error("Get user trades error:", error)
    return []
  }
}
