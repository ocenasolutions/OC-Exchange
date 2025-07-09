"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"
import { TradingViewWidget } from "./trading-view-widget"
import { OrderBook } from "./order-book"
import { TradingForm } from "./trading-form"
import { OpenOrders } from "./open-orders"
import { TradeHistory } from "./trade-history"
import { MarketSelector } from "./market-selector"

export function TradingInterface() {
  const [selectedPair, setSelectedPair] = useState("BTCUSDT")
  const [activeTab, setActiveTab] = useState<"orders" | "history">("orders")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4">
          <MarketSelector selectedPair={selectedPair} onPairChange={setSelectedPair} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <TradingViewWidget symbol={selectedPair} />
          </div>

          {/* Order Book */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <OrderBook pair={selectedPair} />
          </div>

          {/* Trading Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <TradingForm pair={selectedPair} />
          </div>

          {/* Orders and History */}
          <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-4">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "orders"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Open Orders
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "history"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Trade History
                </button>
              </nav>
            </div>
            <div className="p-4">{activeTab === "orders" ? <OpenOrders /> : <TradeHistory />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
