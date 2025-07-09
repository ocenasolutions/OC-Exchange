"use client"

import { useState, useEffect } from "react"
import { Search, Star } from "lucide-react"

interface MarketData {
  symbol: string
  baseAsset: string
  quoteAsset: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
}

interface MarketSelectorProps {
  selectedPair: string
  onPairChange: (pair: string) => void
}

export function MarketSelector({ selectedPair, onPairChange }: MarketSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("USDT")
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Mock market data - in real app, fetch from API
    const mockMarkets: MarketData[] = [
      {
        symbol: "BTCUSDT",
        baseAsset: "BTC",
        quoteAsset: "USDT",
        price: 43250.0,
        change: 1250.5,
        changePercent: 2.98,
        volume: 125000000,
        high: 44100.0,
        low: 42800.0,
      },
      {
        symbol: "ETHUSDT",
        baseAsset: "ETH",
        quoteAsset: "USDT",
        price: 2650.0,
        change: -45.2,
        changePercent: -1.68,
        volume: 89000000,
        high: 2720.0,
        low: 2620.0,
      },
      {
        symbol: "BNBUSDT",
        baseAsset: "BNB",
        quoteAsset: "USDT",
        price: 320.5,
        change: 8.7,
        changePercent: 2.79,
        volume: 45000000,
        high: 325.0,
        low: 315.0,
      },
      {
        symbol: "ADAUSDT",
        baseAsset: "ADA",
        quoteAsset: "USDT",
        price: 0.485,
        change: 0.012,
        changePercent: 2.54,
        volume: 12000000,
        high: 0.492,
        low: 0.471,
      },
      {
        symbol: "SOLUSDT",
        baseAsset: "SOL",
        quoteAsset: "USDT",
        price: 98.5,
        change: -2.3,
        changePercent: -2.28,
        volume: 67000000,
        high: 102.1,
        low: 96.8,
      },
    ]

    setMarkets(mockMarkets)
  }, [])

  const filteredMarkets = markets.filter(
    (market) =>
      market.quoteAsset === activeTab &&
      (market.baseAsset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.symbol.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Markets</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {["Favorites", "USDT", "BTC", "ETH"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Market List Header */}
      <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
        <div>Pair</div>
        <div className="text-right">Price</div>
        <div className="text-right">24h Change</div>
        <div className="text-right">24h Volume</div>
        <div></div>
      </div>

      {/* Market List */}
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {filteredMarkets.map((market) => (
          <div
            key={market.symbol}
            onClick={() => onPairChange(market.symbol)}
            className={`grid grid-cols-5 gap-2 text-sm px-2 py-2 rounded-md cursor-pointer transition-colors ${
              selectedPair === market.symbol
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center">
              <span className="font-medium text-gray-900 dark:text-white">{market.baseAsset}</span>
              <span className="text-gray-500 dark:text-gray-400">/{market.quoteAsset}</span>
            </div>
            <div className="text-right font-mono text-gray-900 dark:text-white">${market.price.toLocaleString()}</div>
            <div
              className={`text-right font-mono ${
                market.changePercent >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {market.changePercent >= 0 ? "+" : ""}
              {market.changePercent.toFixed(2)}%
            </div>
            <div className="text-right font-mono text-gray-600 dark:text-gray-400">
              ${(market.volume / 1000000).toFixed(1)}M
            </div>
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(market.symbol)
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <Star
                  className={`h-3 w-3 ${
                    favorites.includes(market.symbol)
                      ? "text-yellow-500 fill-current"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
