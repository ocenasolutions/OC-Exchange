"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Users, Award } from "lucide-react"

export function LandingPage() {
  const [cryptoPrices, setCryptoPrices] = useState<any[]>([])

  useEffect(() => {
    // Fetch real crypto prices from CoinGecko API
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana&vs_currencies=usd&include_24hr_change=true",
        )
        const data = await response.json()

        const prices = [
          { symbol: "BTC", name: "Bitcoin", price: data.bitcoin?.usd || 0, change: data.bitcoin?.usd_24h_change || 0 },
          {
            symbol: "ETH",
            name: "Ethereum",
            price: data.ethereum?.usd || 0,
            change: data.ethereum?.usd_24h_change || 0,
          },
          {
            symbol: "BNB",
            name: "BNB",
            price: data.binancecoin?.usd || 0,
            change: data.binancecoin?.usd_24h_change || 0,
          },
          { symbol: "ADA", name: "Cardano", price: data.cardano?.usd || 0, change: data.cardano?.usd_24h_change || 0 },
          { symbol: "SOL", name: "Solana", price: data.solana?.usd || 0, change: data.solana?.usd_24h_change || 0 },
        ]

        setCryptoPrices(prices)
      } catch (error) {
        console.error("Failed to fetch crypto prices:", error)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">OC Exchange</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/markets"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Markets
              </Link>
              <Link
                href="/trade"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Trade
              </Link>
              <Link
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Trade Crypto with
            <span className="text-blue-600 dark:text-blue-400"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join millions of traders on the world's leading cryptocurrency exchange. Advanced trading tools,
            institutional-grade security, and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Start Trading Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/markets"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Live Prices Ticker */}
      <section className="py-8 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto">
            {cryptoPrices.map((crypto) => (
              <div key={crypto.symbol} className="flex items-center space-x-4 min-w-0 flex-shrink-0 mr-8">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{crypto.symbol}/USD</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">${crypto.price.toLocaleString()}</div>
                <div className={`text-sm font-medium ${crypto.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {crypto.change >= 0 ? "+" : ""}
                  {crypto.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose OC Exchange?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built for traders, by traders. Experience the difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Bank-Grade Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Multi-layer security with cold storage, 2FA, and advanced encryption to protect your assets.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Execute trades in milliseconds with our high-performance matching engine.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trade 24/7 from anywhere in the world with our mobile-optimized platform.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advanced Tools</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional charting, technical indicators, and algorithmic trading support.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get help when you need it with our round-the-clock customer support team.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Low Fees</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Competitive trading fees with volume discounts and zero deposit fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2.5B+</div>
              <div className="text-blue-100">24h Trading Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Trading Pairs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join millions of traders and start your crypto journey today.
          </p>
          <Link
            href="/auth/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OC Exchange</h3>
              <p className="text-gray-400">The world's leading cryptocurrency exchange platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/trade" className="hover:text-white">
                    Spot Trading
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="hover:text-white">
                    Wallet
                  </Link>
                </li>
                <li>
                  <Link href="/markets" className="hover:text-white">
                    Markets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-white">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OC Exchange. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
