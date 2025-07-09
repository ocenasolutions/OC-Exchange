"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { useWebSocket } from "@/components/providers/websocket-provider"
import { Navigation } from "@/components/layout/navigation"
import { PortfolioOverview } from "./portfolio-overview"
import { MarketSummary } from "./market-summary"
import { RecentTransactions } from "./recent-transactions"
import { TradingViewWidget } from "@/components/trading/trading-view-widget"

export function Dashboard() {
  const { user } = useAuth()
  const { subscribe, unsubscribe } = useWebSocket()
  const [marketData, setMarketData] = useState<any[]>([])

  useEffect(() => {
    // Subscribe to market data updates
    const handleMarketUpdate = (data: any) => {
      setMarketData((prev) => {
        const existing = prev.find((item) => item.symbol === data.symbol)
        if (existing) {
          return prev.map((item) => (item.symbol === data.symbol ? { ...item, ...data } : item))
        }
        return [...prev, data]
      })
    }

    subscribe("btcusdt@ticker", handleMarketUpdate)
    subscribe("ethusdt@ticker", handleMarketUpdate)
    subscribe("bnbusdt@ticker", handleMarketUpdate)

    return () => {
      unsubscribe("btcusdt@ticker")
      unsubscribe("ethusdt@ticker")
      unsubscribe("bnbusdt@ticker")
    }
  }, [subscribe, unsubscribe])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your portfolio today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <PortfolioOverview />
          </div>
          <div>
            <MarketSummary data={marketData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">BTC/USDT Chart</h2>
              <TradingViewWidget symbol="BTCUSDT" />
            </div>
          </div>
          <div>
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  )
}
