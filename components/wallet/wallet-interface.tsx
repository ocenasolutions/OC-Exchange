"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"
import { WalletOverview } from "./wallet-overview"
import { DepositModal } from "./deposit-modal"
import { WithdrawModal } from "./withdraw-modal"
import { TransactionHistory } from "./transaction-history"
import { Plus, Minus, ArrowUpDown } from "lucide-react"

export function WalletInterface() {
  const [activeModal, setActiveModal] = useState<"deposit" | "withdraw" | "transfer" | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<string>("")

  const handleDeposit = (asset: string) => {
    setSelectedAsset(asset)
    setActiveModal("deposit")
  }

  const handleWithdraw = (asset: string) => {
    setSelectedAsset(asset)
    setActiveModal("withdraw")
  }

  const handleTransfer = (asset: string) => {
    setSelectedAsset(asset)
    setActiveModal("transfer")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your cryptocurrency assets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WalletOverview onDeposit={handleDeposit} onWithdraw={handleWithdraw} onTransfer={handleTransfer} />
          </div>
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveModal("deposit")}
                  className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Deposit Crypto
                </button>
                <button
                  onClick={() => setActiveModal("withdraw")}
                  className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Minus className="h-5 w-5 mr-2" />
                  Withdraw Crypto
                </button>
                <button
                  onClick={() => setActiveModal("transfer")}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5 mr-2" />
                  Internal Transfer
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Tips</h2>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Always verify withdrawal addresses before confirming transactions</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Enable 2FA for additional account security</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Keep your private keys and seed phrases secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <TransactionHistory />
        </div>
      </main>

      {/* Modals */}
      {activeModal === "deposit" && <DepositModal asset={selectedAsset} onClose={() => setActiveModal(null)} />}

      {activeModal === "withdraw" && <WithdrawModal asset={selectedAsset} onClose={() => setActiveModal(null)} />}
    </div>
  )
}
