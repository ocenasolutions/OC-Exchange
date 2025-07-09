"use client"

import { useState } from "react"
import { X, AlertTriangle, Shield } from "lucide-react"

interface WithdrawModalProps {
  asset: string
  onClose: () => void
}

export function WithdrawModal({ asset, onClose }: WithdrawModalProps) {
  const [formData, setFormData] = useState({
    network: "",
    address: "",
    amount: "",
    twoFactorCode: "",
  })
  const [step, setStep] = useState<"form" | "confirm" | "success">("form")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const networks = {
    BTC: [{ name: "Bitcoin", symbol: "BTC", fee: "0.0005 BTC", minWithdraw: "0.001" }],
    ETH: [
      { name: "Ethereum", symbol: "ETH", fee: "0.005 ETH", minWithdraw: "0.01" },
      { name: "BNB Smart Chain", symbol: "BSC", fee: "0.001 ETH", minWithdraw: "0.01" },
    ],
    USDT: [
      { name: "Ethereum", symbol: "ERC20", fee: "15 USDT", minWithdraw: "20" },
      { name: "Tron", symbol: "TRC20", fee: "1 USDT", minWithdraw: "10" },
      { name: "BNB Smart Chain", symbol: "BSC", fee: "0.8 USDT", minWithdraw: "10" },
    ],
    BNB: [
      { name: "BNB Smart Chain", symbol: "BSC", fee: "0.0005 BNB", minWithdraw: "0.01" },
      { name: "BNB Beacon Chain", symbol: "BEP2", fee: "0.000375 BNB", minWithdraw: "0.01" },
    ],
    ADA: [{ name: "Cardano", symbol: "ADA", fee: "0.17 ADA", minWithdraw: "1" }],
  }

  const currentNetworks = networks[asset as keyof typeof networks] || []
  const selectedNetworkData = currentNetworks.find((n) => n.symbol === formData.network)
  const availableBalance = 1.5432 // Mock available balance

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.network) newErrors.network = "Please select a network"
    if (!formData.address) newErrors.address = "Please enter withdrawal address"
    if (!formData.amount) newErrors.amount = "Please enter amount"
    if (!formData.twoFactorCode) newErrors.twoFactorCode = "Please enter 2FA code"

    if (formData.amount && selectedNetworkData) {
      const amount = Number.parseFloat(formData.amount)
      const minWithdraw = Number.parseFloat(selectedNetworkData.minWithdraw)
      const fee = Number.parseFloat(selectedNetworkData.fee.split(" ")[0])

      if (amount < minWithdraw) {
        newErrors.amount = `Minimum withdrawal: ${selectedNetworkData.minWithdraw} ${asset}`
      } else if (amount + fee > availableBalance) {
        newErrors.amount = "Insufficient balance including fees"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setStep("confirm")
    }
  }

  const handleConfirm = () => {
    // Mock withdrawal processing
    setStep("success")
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  const calculateReceiveAmount = () => {
    if (!formData.amount || !selectedNetworkData) return "0"
    const amount = Number.parseFloat(formData.amount)
    const fee = Number.parseFloat(selectedNetworkData.fee.split(" ")[0])
    return Math.max(0, amount - fee).toFixed(6)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {step === "success" ? "Withdrawal Submitted" : `Withdraw ${asset}`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {step === "form" && (
            <div className="space-y-6">
              {/* Available Balance */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800 dark:text-blue-200">Available Balance:</span>
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    {availableBalance} {asset}
                  </span>
                </div>
              </div>

              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Network
                </label>
                <select
                  value={formData.network}
                  onChange={(e) => handleInputChange("network", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select network...</option>
                  {currentNetworks.map((network) => (
                    <option key={network.symbol} value={network.symbol}>
                      {network.name} ({network.symbol}) - Fee: {network.fee}
                    </option>
                  ))}
                </select>
                {errors.network && <p className="text-red-600 text-sm mt-1">{errors.network}</p>}
              </div>

              {/* Withdrawal Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Withdrawal Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder={`Enter ${asset} address`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 pr-16 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 text-sm">{asset}</span>
                  </div>
                </div>
                {selectedNetworkData && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Min: {selectedNetworkData.minWithdraw} {asset} • Fee: {selectedNetworkData.fee}
                  </div>
                )}
                {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
              </div>

              {/* 2FA Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Shield className="inline h-4 w-4 mr-1" />
                  2FA Code
                </label>
                <input
                  type="text"
                  value={formData.twoFactorCode}
                  onChange={(e) => handleInputChange("twoFactorCode", e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.twoFactorCode && <p className="text-red-600 text-sm mt-1">{errors.twoFactorCode}</p>}
              </div>

              {/* Warning */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-red-800 dark:text-red-200">
                    <p className="font-medium mb-1">Important:</p>
                    <p>
                      Ensure the withdrawal address is correct. Transactions cannot be reversed once confirmed on the
                      blockchain.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Withdrawal</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Asset:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{asset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Network:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Address:</span>
                  <span className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                    {formData.address.slice(0, 10)}...{formData.address.slice(-10)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formData.amount} {asset}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Network Fee:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedNetworkData?.fee}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span className="text-gray-900 dark:text-white font-medium">You will receive:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {calculateReceiveAmount()} {asset}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Withdrawal Submitted</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your withdrawal request has been submitted successfully. You will receive an email confirmation
                  shortly.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Transaction ID: WD{Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
                  <p className="mt-1">Processing time: 10-30 minutes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
