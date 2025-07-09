"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/layout/navigation"
import { TradingViewWidget } from "@/components/trading/trading-view-widget"
import { Search, Star, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import Link from "next/link"

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
  marketCap?: number
}

export function MarketsPage() {
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("All")
  const [sortBy, setSortBy] = useState<"symbol" | "price" | "change" | "volume">("volume")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedMarket, setSelectedMarket] = useState("BTCUSDT")

  useEffect(() => {
    // Fetch real market data from CoinGecko API
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h",
        )
        const data = await response.json()

        const marketData: MarketData[] = data.map((coin: any) => ({
          symbol: `${coin.symbol.toUpperCase()}USDT`,
          baseAsset: coin.symbol.toUpperCase(),
          quoteAsset: "USDT",
          price: coin.current_price,
          change: coin.price_change_24h || 0,
          changePercent: coin.price_change_percentage_24h || 0,
          volume: coin.total_volume || 0,
          high: coin.high_24h || coin.current_price,
          low: coin.low_24h || coin.current_price,
          marketCap: coin.market_cap,
        }))

        setMarkets(marketData)
      } catch (error) {
        console.error("Failed to fetch market data:", error)
        // Fallback to mock data
        setMarkets([
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
            marketCap: 850000000000,
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
            marketCap: 320000000000,
          },
        ])
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredMarkets = markets
    .filter((market) => {
      const matchesSearch =
        market.baseAsset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.symbol.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Favorites" && favorites.includes(market.symbol)) ||
        market.quoteAsset === activeTab

      return matchesSearch && matchesTab
    })
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      const multiplier = sortOrder === "asc" ? 1 : -1

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * multiplier
      }

      return ((aValue as number) - (bValue as number)) * multiplier
    })

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Markets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore cryptocurrency markets and start trading</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedMarket} Chart</h2>
                <Link
                  href={`/trade?pair=${selectedMarket}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Trade Now
                </Link>
              </div>
              <TradingViewWidget symbol={selectedMarket} height={500} />
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">24h Volume</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  ${(markets.reduce((sum, m) => sum + m.volume, 0) / 1000000000).toFixed(2)}B
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Markets</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{markets.length}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Gainers</div>
                <div className="text-xl font-bold text-green-600">
                  {markets.filter((m) => m.changePercent > 0).length}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">Losers</div>
                <div className="text-xl font-bold text-red-600">
                  {markets.filter((m) => m.changePercent < 0).length}
                </div>
              </div>
            </div>
          </div>

          {/* Markets List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Markets</h2>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {["All", "Favorites", "USDT", "BTC", "ETH"].map((tab) => (
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
            </div>

            {/* Market List Header */}
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => handleSort("symbol")}
                  className="text-left hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Pair {sortBy === "symbol" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("price")}
                  className="text-right hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("change")}
                  className="text-right hover:text-gray-700 dark:hover:text-gray-300"
                >
                  24h Change {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("volume")}
                  className="text-right hover:text-gray-700 dark:hover:text-gray-300"
                >
                  24h Volume {sortBy === "volume" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <div></div>
              </div>
            </div>

            {/* Market List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredMarkets.map((market) => (
                <div
                  key={market.symbol}
                  onClick={() => setSelectedMarket(market.symbol)}
                  className={`grid grid-cols-5 gap-2 text-sm px-6 py-3 cursor-pointer transition-colors ${
                    selectedMarket === market.symbol
                      ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white">{market.baseAsset}</span>
                    <span className="text-gray-500 dark:text-gray-400">/{market.quoteAsset}</span>
                  </div>
                  <div className="text-right font-mono text-gray-900 dark:text-white">
                    ${market.price.toLocaleString()}
                  </div>
                  <div className="text-right">
                    <div
                      className={`flex items-center justify-end ${
                        market.changePercent >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {market.changePercent >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="font-mono">
                        {market.changePercent >= 0 ? "+" : ""}
                        {market.changePercent.toFixed(2)}%
                      </span>
                    </div>
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

            {filteredMarkets.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No markets found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
