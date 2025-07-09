"use client"

import { useState, useEffect } from "react"
import { X, Copy, AlertTriangle } from "lucide-react"

interface DepositModalProps {
  asset: string
  onClose: () => void
}

export function DepositModal({ asset, onClose }: DepositModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [depositAddress, setDepositAddress] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const networks = {
    BTC: [{ name: "Bitcoin", symbol: "BTC", fee: "0.0005 BTC" }],
    ETH: [
      { name: "Ethereum", symbol: "ETH", fee: "0.005 ETH" },
      { name: "BNB Smart Chain", symbol: "BSC", fee: "0.001 ETH" },
    ],
    USDT: [
      { name: "Ethereum", symbol: "ERC20", fee: "15 USDT" },
      { name: "Tron", symbol: "TRC20", fee: "1 USDT" },
      { name: "BNB Smart Chain", symbol: "BSC", fee: "0.8 USDT" },
    ],
    BNB: [
      { name: "BNB Smart Chain", symbol: "BSC", fee: "0.0005 BNB" },
      { name: "BNB Beacon Chain", symbol: "BEP2", fee: "0.000375 BNB" },
    ],
    ADA: [{ name: "Cardano", symbol: "ADA", fee: "0.17 ADA" }],
  }

  useEffect(() => {
    if (asset && networks[asset as keyof typeof networks]) {
      setSelectedNetwork(networks[asset as keyof typeof networks][0].symbol)
    }
  }, [asset])

  useEffect(() => {
    if (selectedNetwork) {
      // Generate mock deposit address
      const mockAddress = `${asset}${Math.random().toString(36).substring(2, 15)}${Math.random()
        .toString(36)
        .substring(2, 15)}`
      setDepositAddress(mockAddress)

      // Generate QR code URL (using a QR code service)
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${mockAddress}`)
    }
  }, [selectedNetwork, asset])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const currentNetworks = networks[asset as keyof typeof networks] || []

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Deposit {asset}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Network Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Network</label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
              {currentNetworks.map((network) => (
                <option key={network.symbol} value={network.symbol}>
                  {network.name} ({network.symbol}) - Fee: {network.fee}
                </option>
              ))}
            </select>
          </div>

          {/* Deposit Address */}
          {depositAddress && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deposit Address</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={depositAddress}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">QR Code</label>
              <div className="inline-block p-4 bg-white rounded-lg">
                <img src={qrCodeUrl || "/placeholder.svg"} alt="Deposit QR Code" className="w-48 h-48" />
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-medium mb-2">Important Notes:</p>
                <ul className="space-y-1 text-xs">
                  <li>
                    • Only send {asset} to this address on the {selectedNetwork} network
                  </li>
                  <li>• Minimum deposit: 0.001 {asset}</li>
                  <li>• Deposits require network confirmations before being credited</li>
                  <li>• Do not send other cryptocurrencies to this address</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deposit History Link */}
          <div className="text-center">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Deposit History →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
