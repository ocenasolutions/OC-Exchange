"use client"

import { useState, useEffect } from "react"
import { X, Clock } from "lucide-react"

interface Order {
  id: string
  symbol: string
  side: "buy" | "sell"
  type: "limit" | "market" | "stop-limit"
  amount: number
  price: number
  filled: number
  remaining: number
  status: "open" | "partially_filled" | "cancelled"
  timestamp: string
}

export function OpenOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Mock open orders data
    const mockOrders: Order[] = [
      {
        id: "1",
        symbol: "BTCUSDT",
        side: "buy",
        type: "limit",
        amount: 0.5,
        price: 42000,
        filled: 0.2,
        remaining: 0.3,
        status: "partially_filled",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: "2",
        symbol: "ETHUSDT",
        side: "sell",
        type: "limit",
        amount: 2.0,
        price: 2700,
        filled: 0,
        remaining: 2.0,
        status: "open",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: "3",
        symbol: "BNBUSDT",
        side: "buy",
        type: "stop-limit",
        amount: 10,
        price: 315,
        filled: 0,
        remaining: 10,
        status: "open",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ]

    setOrders(mockOrders)
  }, [])

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId))
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "partially_filled":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "cancelled":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No open orders</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Your active orders will appear here</p>
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
            <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Type</th>
            <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Side</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Amount</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Price</th>
            <th className="text-right py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Filled</th>
            <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Status</th>
            <th className="text-center py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{formatTime(order.timestamp)}</td>
              <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{order.symbol}</td>
              <td className="py-3 px-2 text-gray-600 dark:text-gray-400 capitalize">{order.type}</td>
              <td className="py-3 px-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    order.side === "buy"
                      ? "text-green-700 bg-green-100 dark:bg-green-900/20"
                      : "text-red-700 bg-red-100 dark:bg-red-900/20"
                  }`}
                >
                  {order.side.toUpperCase()}
                </span>
              </td>
              <td className="py-3 px-2 text-right font-mono text-gray-900 dark:text-white">{order.amount}</td>
              <td className="py-3 px-2 text-right font-mono text-gray-900 dark:text-white">
                ${order.price.toLocaleString()}
              </td>
              <td className="py-3 px-2 text-right font-mono text-gray-600 dark:text-gray-400">
                {((order.filled / order.amount) * 100).toFixed(1)}%
              </td>
              <td className="py-3 px-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.replace("_", " ")}
                </span>
              </td>
              <td className="py-3 px-2 text-center">
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  title="Cancel Order"
                >
                  <X className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
