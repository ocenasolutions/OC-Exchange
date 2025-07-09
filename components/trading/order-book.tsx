"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "@/components/providers/websocket-provider"

interface OrderBookEntry {
  price: number
  quantity: number
  total: number
}

interface OrderBookProps {
  pair: string
}

export function OrderBook({ pair }: OrderBookProps) {
  const [bids, setBids] = useState<OrderBookEntry[]>([])
  const [asks, setAsks] = useState<OrderBookEntry[]>([])
  const { subscribe, unsubscribe } = useWebSocket()

  useEffect(() => {
    // Generate mock order book data
    const generateOrderBook = () => {
      const basePrice = 43250 // Mock BTC price
      const bidData: OrderBookEntry[] = []
      const askData: OrderBookEntry[] = []

      // Generate bids (buy orders) - prices below current price
      for (let i = 0; i < 15; i++) {
        const price = basePrice - (i + 1) * 10
        const quantity = Math.random() * 2 + 0.1
        const total = price * quantity
        bidData.push({ price, quantity, total })
      }

      // Generate asks (sell orders) - prices above current price
      for (let i = 0; i < 15; i++) {
        const price = basePrice + (i + 1) * 10
        const quantity = Math.random() * 2 + 0.1
        const total = price * quantity
        askData.push({ price, quantity, total })
      }

      setBids(bidData)
      setAsks(askData.reverse()) // Reverse to show lowest ask first
    }

    generateOrderBook()
    const interval = setInterval(generateOrderBook, 3000)

    return () => clearInterval(interval)
  }, [pair])

  const formatPrice = (price: number) => price.toFixed(2)
  const formatQuantity = (quantity: number) => quantity.toFixed(4)

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Book</h3>
        <div className="text-sm text-gray-500">{pair}</div>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          <div>Price (USDT)</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Total</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="space-y-1 mb-4 max-h-48 overflow-y-auto">
          {asks.map((ask, index) => (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-3 gap-2 text-xs px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer order-book-sell"
            >
              <div className="text-red-600 dark:text-red-400 font-mono">{formatPrice(ask.price)}</div>
              <div className="text-right text-gray-900 dark:text-gray-100 font-mono">
                {formatQuantity(ask.quantity)}
              </div>
              <div className="text-right text-gray-600 dark:text-gray-400 font-mono">{ask.total.toFixed(0)}</div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="text-center py-2 border-y border-gray-200 dark:border-gray-700 mb-4">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(43250)}</div>
          <div className="text-xs text-green-600">≈ $43,250.00</div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {bids.map((bid, index) => (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-3 gap-2 text-xs px-2 py-1 hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer order-book-buy"
            >
              <div className="text-green-600 dark:text-green-400 font-mono">{formatPrice(bid.price)}</div>
              <div className="text-right text-gray-900 dark:text-gray-100 font-mono">
                {formatQuantity(bid.quantity)}
              </div>
              <div className="text-right text-gray-600 dark:text-gray-400 font-mono">{bid.total.toFixed(0)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
