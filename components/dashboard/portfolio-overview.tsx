"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

interface PortfolioData {
  totalBalance: number
  totalChange: number
  totalChangePercent: number
  assets: Array<{
    symbol: string
    name: string
    balance: number
    value: number
    change: number
    changePercent: number
  }>
}

export function PortfolioOverview() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalBalance: 0,
    totalChange: 0,
    totalChangePercent: 0,
    assets: [],
  })

  useEffect(() => {
    // Simulate portfolio data - in real app, fetch from API
    const mockPortfolio: PortfolioData = {
      totalBalance: 45678.9,
      totalChange: 2345.67,
      totalChangePercent: 5.42,
      assets: [
        {
          symbol: "BTC",
          name: "Bitcoin",
          balance: 0.5432,
          value: 27890.45,
          change: 1234.56,
          changePercent: 4.63,
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          balance: 8.7654,
          value: 15432.1,
          change: 876.54,
          changePercent: 6.02,
        },
        {
          symbol: "USDT",
          name: "Tether",
          balance: 2356.35,
          value: 2356.35,
          change: 0,
          changePercent: 0,
        },
      ],
    }

    setPortfolio(mockPortfolio)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Overview</h2>
        <PieChart className="h-5 w-5 text-gray-400" />
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="h-6 w-6 text-gray-400" />
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${portfolio.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {portfolio.totalChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${portfolio.totalChange >= 0 ? "text-green-600" : "text-red-600"}`}>
            {portfolio.totalChange >= 0 ? "+" : ""}$
            {portfolio.totalChange.toLocaleString("en-US", { minimumFractionDigits: 2 })}(
            {portfolio.totalChange >= 0 ? "+" : ""}
            {portfolio.totalChangePercent.toFixed(2)}%)
          </span>
          <span className="text-sm text-gray-500">24h</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assets</h3>
        {portfolio.assets.map((asset) => (
          <div
            key={asset.symbol}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{asset.symbol}</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
                <div className="text-sm text-gray-500">
                  {asset.balance.toFixed(4)} {asset.symbol}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900 dark:text-white">
                ${asset.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-sm ${asset.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {asset.change >= 0 ? "+" : ""}${asset.change.toFixed(2)} ({asset.change >= 0 ? "+" : ""}
                {asset.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
