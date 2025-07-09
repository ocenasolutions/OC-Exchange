"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownLeft, ArrowUpDown, Clock, CheckCircle, XCircle, Filter } from "lucide-react"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "trade" | "transfer"
  asset: string
  amount: number
  status: "completed" | "pending" | "failed" | "cancelled"
  timestamp: string
  txHash?: string
  fee?: number
  fromAddress?: string
  toAddress?: string
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal" | "trade" | "transfer">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  useEffect(() => {
    // Mock transaction data
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        type: "deposit",
        asset: "BTC",
        amount: 0.5,
        status: "completed",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        txHash: "0x1234567890abcdef",
        fromAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      },
      {
        id: "2",
        type: "withdrawal",
        asset: "ETH",
        amount: 2.5,
        status: "pending",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        fee: 0.005,
        toAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
      },
      {
        id: "3",
        type: "trade",
        asset: "USDT",
        amount: 1000,
        status: "completed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        fee: 1.0,
      },
      {
        id: "4",
        type: "transfer",
        asset: "BNB",
        amount: 10,
        status: "completed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        toAddress: "user@example.com",
      },
      {
        id: "5",
        type: "withdrawal",
        asset: "ADA",
        amount: 500,
        status: "failed",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        fee: 0.17,
      },
    ]

    setTransactions(mockTransactions)
  }, [])

  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch = filter === "all" || tx.type === filter
    const statusMatch = statusFilter === "all" || tx.status === statusFilter
    return typeMatch && statusMatch
  })

  const getTransactionIcon = (type: string, status: string) => {
    if (status === "pending") return <Clock className="h-5 w-5 text-yellow-500" />
    if (status === "failed" || status === "cancelled") return <XCircle className="h-5 w-5 text-red-500" />
    if (status === "completed") {
      switch (type) {
        case "deposit":
          return <ArrowDownLeft className="h-5 w-5 text-green-500" />
        case "withdrawal":
          return <ArrowUpRight className="h-5 w-5 text-red-500" />
        case "transfer":
          return <ArrowUpDown className="h-5 w-5 text-blue-500" />
        case "trade":
          return <CheckCircle className="h-5 w-5 text-green-500" />
        default:
          return <CheckCircle className="h-5 w-5 text-gray-500" />
      }
    }
    return <Clock className="h-5 w-5 text-gray-400" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "failed":
      case "cancelled":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const truncateAddress = (address: string) => {
    if (address.includes("@")) return address // Email address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction History</h2>
          <Filter className="h-5 w-5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="trade">Trades</option>
              <option value="transfer">Transfers</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Time</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Type</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Asset</th>
              <th className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Amount</th>
              <th className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Fee</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{formatTime(tx.timestamp)}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {getTransactionIcon(tx.type, tx.status)}
                    <span className="ml-2 capitalize text-gray-900 dark:text-white">{tx.type}</span>
                  </div>
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{tx.asset}</td>
                <td className="py-4 px-6 text-right font-mono text-gray-900 dark:text-white">
                  {tx.type === "withdrawal" || tx.type === "trade" ? "-" : "+"}
                  {tx.amount}
                </td>
                <td className="py-4 px-6 text-right font-mono text-gray-600 dark:text-gray-400">
                  {tx.fee ? `${tx.fee} ${tx.asset}` : "-"}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-mono text-xs">
                  {tx.txHash && (
                    <div>
                      <span className="text-gray-500">TX: </span>
                      <button className="text-blue-600 hover:text-blue-700">{truncateAddress(tx.txHash)}</button>
                    </div>
                  )}
                  {tx.fromAddress && (
                    <div>
                      <span className="text-gray-500">From: </span>
                      {truncateAddress(tx.fromAddress)}
                    </div>
                  )}
                  {tx.toAddress && (
                    <div>
                      <span className="text-gray-500">To: </span>
                      {truncateAddress(tx.toAddress)}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
