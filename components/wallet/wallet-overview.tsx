"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Plus, Minus, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"

interface WalletAsset {
  symbol: string
  name: string
  balance: number
  availableBalance: number
  lockedBalance: number
  usdValue: number
  change24h: number
  changePercent24h: number
}

interface WalletOverviewProps {
  onDeposit: (asset: string) => void
  onWithdraw: (asset: string) => void
  onTransfer: (asset: string) => void
}

export function WalletOverview({ onDeposit, onWithdraw, onTransfer }: WalletOverviewProps) {
  const [assets, setAssets] = useState<WalletAsset[]>([])
  const [hideSmallBalances, setHideSmallBalances] = useState(false)
  const [showBalances, setShowBalances] = useState(true)

  useEffect(() => {
    // Mock wallet data
    const mockAssets: WalletAsset[] = [
      {
        symbol: "BTC",
        name: "Bitcoin",
        balance: 0.5432,
        availableBalance: 0.5432,
        lockedBalance: 0,
        usdValue: 23456.78,
        change24h: 1234.56,
        changePercent24h: 5.56,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: 8.7654,
        availableBalance: 6.7654,
        lockedBalance: 2.0,
        usdValue: 23234.31,
        change24h: -456.78,
        changePercent24h: -1.93,
      },
      {
        symbol: "USDT",
        name: "Tether",
        balance: 5000.0,
        availableBalance: 5000.0,
        lockedBalance: 0,
        usdValue: 5000.0,
        change24h: 0,
        changePercent24h: 0,
      },
      {
        symbol: "BNB",
        name: "BNB",
        balance: 15.234,
        availableBalance: 15.234,
        lockedBalance: 0,
        usdValue: 4879.89,
        change24h: 123.45,
        changePercent24h: 2.59,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        balance: 1000.0,
        availableBalance: 1000.0,
        lockedBalance: 0,
        usdValue: 485.0,
        change24h: 12.34,
        changePercent24h: 2.61,
      },
    ]

    setAssets(mockAssets)
  }, [])

  const totalBalance = assets.reduce((sum, asset) => sum + asset.usdValue, 0)
  const totalChange24h = assets.reduce((sum, asset) => sum + asset.change24h, 0)
  const totalChangePercent24h = totalBalance > 0 ? (totalChange24h / (totalBalance - totalChange24h)) * 100 : 0

  const filteredAssets = hideSmallBalances ? assets.filter((asset) => asset.usdValue >= 1) : assets

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Total Balance</h2>
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="mb-4">
          <div className="text-3xl font-bold mb-2">
            {showBalances ? `$${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "****"}
          </div>
          <div className="flex items-center space-x-2">
            {totalChange24h >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-300" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-300" />
            )}
            <span className={`text-sm ${totalChange24h >= 0 ? "text-green-300" : "text-red-300"}`}>
              {totalChange24h >= 0 ? "+" : ""}$
              {showBalances ? totalChange24h.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "****"} (
              {totalChange24h >= 0 ? "+" : ""}
              {showBalances ? totalChangePercent24h.toFixed(2) : "**"}%) 24h
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm opacity-80">Available</div>
            <div className="font-semibold">
              {showBalances
                ? `$${assets
                    .reduce((sum, asset) => sum + (asset.availableBalance / asset.balance) * asset.usdValue, 0)
                    .toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                : "****"}
            </div>
          </div>
          <div>
            <div className="text-sm opacity-80">In Orders</div>
            <div className="font-semibold">
              {showBalances
                ? `$${assets
                    .reduce((sum, asset) => sum + (asset.lockedBalance / asset.balance) * asset.usdValue, 0)
                    .toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                : "****"}
            </div>
          </div>
          <div>
            <div className="text-sm opacity-80">Assets</div>
            <div className="font-semibold">{assets.length}</div>
          </div>
        </div>
      </div>

      {/* Assets List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assets</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={hideSmallBalances}
                  onChange={(e) => setHideSmallBalances(e.target.checked)}
                  className="mr-2 rounded"
                />
                Hide small balances
              </label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Asset</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Total Balance</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Available</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-300">In Orders</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-300">USD Value</th>
                <th className="text-center py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.symbol}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{asset.symbol}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-mono text-gray-900 dark:text-white">
                      {showBalances ? asset.balance.toFixed(6) : "****"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-mono text-gray-900 dark:text-white">
                      {showBalances ? asset.availableBalance.toFixed(6) : "****"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-mono text-gray-600 dark:text-gray-400">
                      {showBalances ? asset.lockedBalance.toFixed(6) : "****"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-mono text-gray-900 dark:text-white">
                      {showBalances
                        ? `$${asset.usdValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                        : "****"}
                    </div>
                    <div
                      className={`text-sm font-mono ${asset.changePercent24h >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {showBalances
                        ? `${asset.changePercent24h >= 0 ? "+" : ""}${asset.changePercent24h.toFixed(2)}%`
                        : "**%"}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onDeposit(asset.symbol)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Deposit"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onWithdraw(asset.symbol)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Withdraw"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onTransfer(asset.symbol)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Transfer"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
