"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface MarketSummaryProps {
  data: Array<{
    symbol: string
    price: string
    change: string
    volume: string
  }>
}

export function MarketSummary({ data }: MarketSummaryProps) {
  const defaultData = [
    { symbol: "BTCUSDT", price: "43250.00", change: "2.45", volume: "1234567" },
    { symbol: "ETHUSDT", price: "2650.00", change: "-1.23", volume: "987654" },
    { symbol: "BNBUSDT", price: "320.50", change: "0.87", volume: "456789" },
  ]

  const marketData = data.length > 0 ? data : defaultData

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Market Summary</h2>
        <Link href="/markets" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {marketData.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{item.symbol}</div>
              <div className="text-sm text-gray-500">Vol: {Number.parseFloat(item.volume).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900 dark:text-white">
                ${Number.parseFloat(item.price).toLocaleString()}
              </div>
              <div
                className={`text-sm flex items-center ${
                  Number.parseFloat(item.change) >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Number.parseFloat(item.change) >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Number.parseFloat(item.change) >= 0 ? "+" : ""}
                {item.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
