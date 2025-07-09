import { type NextRequest, NextResponse } from "next/server"
import { fetchMarketData } from "@/lib/market-data"

export async function GET(request: NextRequest) {
  try {
    const marketData = await fetchMarketData()

    return NextResponse.json({
      success: true,
      data: marketData,
    })
  } catch (error) {
    console.error("Market data error:", error)
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 })
  }
}
