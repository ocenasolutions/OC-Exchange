"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Trade {
  id: string
  symbol: string
  side: "buy" | "sell"
  amount: number
  price: number
  total: number
  fee: number
  timestamp: string
}

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    // Mock trade history data
    const mockTrades: Trade[] = [
      {
        id: "1",
        symbol: "BTCUSDT",
        side: "buy",
        amount: 0.0234,
        price: 43250.0,
        total: 1012.05,
        fee: 1.01,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "2",
        symbol: "ETHUSDT",
        side: "sell",
        amount: 1.5,
        price: 2650.0,
        total: 3975.0,
        fee: 3.98,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "3",
        symbol: "BNBUSDT",
        side: "buy",
        amount: 10,
        price: 320.5,
        total: 3205.0,
        fee: 3.21,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      },
      {
        id: "4",
        symbol: "ADAUSDT",
        side: "sell",
        amount: 1000,
        price: 0.485,
        total: 485.0,
        fee: 0.49,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      },
      {
        id: "5",
        symbol: "SOLUSDT",
        side: "buy",
        amount: 5,
        price: 98.5,
        total: 492.5,
        fee: 0.49,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ]

    setTrades(mockTrades)
  }, [])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (trades.length === 0) {
    return (
      <div className="text-center py-8">
        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No trade history</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Your completed trades will appear here</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Time</th>
            <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Pair</th>
            <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Side</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Amount</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Price</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Total</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Fee</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr
              key={trade.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{formatTime(trade.timestamp)}</td>
              <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{trade.symbol}</td>
              <td className="py-3 px-2">
                <div className="flex items-center">
                  {trade.side === "buy" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.side === "buy"
                        ? "text-green-700 bg-green-100 dark:bg-green-900/20"
                        : "text-red-700 bg-red-100 dark:bg-red-900/20"
                    }`}
                  >
                    {trade.side.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="py-3 px-2 text-right font-mono text-gray-900 dark:text-white">{trade.amount}</td>
              <td className="py-3 px-2 text-right font-mono text-gray-900 dark:text-white">
                ${trade.price.toLocaleString()}
              </td>
              <td className="py-3 px-2 text-right font-mono text-gray-900 dark:text-white">
                ${trade.total.toLocaleString()}
              </td>
              <td className="py-3 px-2 text-right font-mono text-gray-600 dark:text-gray-400">
                ${trade.fee.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
