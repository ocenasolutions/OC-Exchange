"use client"
import { useState, useEffect } from "react"
import { BarChart3 } from "lucide-react"

export function TradingStats() {
  const [stats, setStats] = useState({
    volume24h: 0,
    trades24h: 0,
    peakUsers: 0,
  })

  useEffect(() => {
    // TODO: Replace with real fetch
    setStats({
      volume24h: 2500000000,
      trades24h: 1450000,
      peakUsers: 4823,
    })
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trading Statistics (Last 24h)</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ${(stats.volume24h / 1_000_000_000).toFixed(2)}B
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Volume</div>
          </div>
        </div>
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.trades24h.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Trades</div>
          </div>
        </div>
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.peakUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Peak Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}
