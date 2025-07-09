"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

interface Transaction {
  id: string
  type: "buy" | "sell" | "deposit" | "withdrawal"
  symbol: string
  amount: number
  price: number
  total: number
  timestamp: string
  status: "completed" | "pending" | "failed"
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Mock transaction data - in real app, fetch from API
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "buy",
        symbol: "BTC",
        amount: 0.0234,
        price: 43250.0,
        total: 1012.05,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: "completed",
      },
      {
        id: "2",
        type: "sell",
        symbol: "ETH",
        amount: 1.5,
        price: 2650.0,
        total: 3975.0,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        status: "completed",
      },
      {
        id: "3",
        type: "deposit",
        symbol: "USDT",
        amount: 5000,
        price: 1.0,
        total: 5000.0,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        status: "pending",
      },
      {
        id: "4",
        type: "buy",
        symbol: "BNB",
        amount: 10,
        price: 320.5,
        total: 3205.0,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        status: "completed",
      },
    ]

    setTransactions(mockTransactions)
  }, [])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "sell":
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "failed":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getTransactionIcon(transaction.type)}
              <div>
                <div className="font-medium text-gray-900 dark:text-white capitalize">
                  {transaction.type} {transaction.symbol}
                </div>
                <div className="text-sm text-gray-500">{formatTime(transaction.timestamp)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900 dark:text-white">
                {transaction.amount} {transaction.symbol}
              </div>
              <div className="text-sm text-gray-500">${transaction.total.toLocaleString()}</div>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
