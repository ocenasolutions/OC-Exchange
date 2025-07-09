"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TradingFormProps {
  pair: string
}

export function TradingForm({ pair }: TradingFormProps) {
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop-limit">("limit")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [stopPrice, setStopPrice] = useState("")
  const [total, setTotal] = useState("")

  const handleQuantityChange = (value: string) => {
    setQuantity(value)
    if (price && value) {
      setTotal((Number.parseFloat(price) * Number.parseFloat(value)).toFixed(2))
    }
  }

  const handlePriceChange = (value: string) => {
    setPrice(value)
    if (quantity && value) {
      setTotal((Number.parseFloat(value) * Number.parseFloat(quantity)).toFixed(2))
    }
  }

  const handleTotalChange = (value: string) => {
    setTotal(value)
    if (price && value) {
      setQuantity((Number.parseFloat(value) / Number.parseFloat(price)).toFixed(6))
    }
  }

  const handleSubmitOrder = () => {
    // Mock order submission
    console.log("Order submitted:", {
      pair,
      side,
      orderType,
      price: orderType === "market" ? "market" : price,
      quantity,
      stopPrice: orderType === "stop-limit" ? stopPrice : undefined,
      total,
    })

    // Reset form
    setPrice("")
    setQuantity("")
    setTotal("")
    setStopPrice("")
  }

  const getBalanceLabel = () => {
    const [base, quote] = pair.split("USDT")
    return side === "buy" ? "USDT" : base
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trade</h3>
        <div className="text-sm text-gray-500">{pair}</div>
      </div>

      {/* Buy/Sell Toggle */}
      <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            side === "buy"
              ? "bg-green-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <TrendingUp className="h-4 w-4 inline mr-1" />
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            side === "sell"
              ? "bg-red-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <TrendingDown className="h-4 w-4 inline mr-1" />
          Sell
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Type</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as any)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="limit">Limit</option>
          <option value="market">Market</option>
          <option value="stop-limit">Stop-Limit</option>
        </select>
      </div>

      {/* Price Input */}
      {orderType !== "market" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (USDT)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Stop Price Input */}
      {orderType === "stop-limit" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stop Price (USDT)</label>
          <input
            type="number"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Quantity Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amount ({pair.replace("USDT", "")})
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Total Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total (USDT)</label>
        <input
          type="number"
          value={total}
          onChange={(e) => handleTotalChange(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Balance Info */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Available {getBalanceLabel()}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{side === "buy" ? "10,000.00" : "0.5432"}</span>
        </div>
      </div>

      {/* Percentage Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {["25%", "50%", "75%", "100%"].map((percent) => (
          <button
            key={percent}
            className="py-1 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {percent}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitOrder}
        disabled={!quantity || (orderType !== "market" && !price)}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
          side === "buy"
            ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400"
            : "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
        } disabled:cursor-not-allowed`}
      >
        {side === "buy" ? "Buy" : "Sell"} {pair.replace("USDT", "")}
      </button>

      {/* Fee Info */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Trading fee: 0.1% • Est. fee: ${total ? (Number.parseFloat(total) * 0.001).toFixed(2) : "0.00"}
      </div>
    </div>
  )
}
