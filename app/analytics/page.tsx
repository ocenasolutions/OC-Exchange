"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Target,
  Award,
  Activity,
  Zap,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("portfolio")

  const portfolioMetrics = {
    totalValue: 125000,
    totalChange: 8.5,
    totalChangeValue: 9800,
    dayChange: 2.3,
    dayChangeValue: 2875,
    bestPerformer: "BTC",
    worstPerformer: "ADA",
  }

  const tradingStats = {
    totalTrades: 247,
    winRate: 68.4,
    avgProfit: 245,
    totalProfit: 18500,
    bestTrade: 2400,
    worstTrade: -850,
    avgHoldTime: "3.2 days",
  }

  const assetAllocation = [
    { name: "Bitcoin", symbol: "BTC", percentage: 45, value: 56250, change: 3.2 },
    { name: "Ethereum", symbol: "ETH", percentage: 30, value: 37500, change: 1.8 },
    { name: "Cardano", symbol: "ADA", percentage: 15, value: 18750, change: -2.1 },
    { name: "Solana", symbol: "SOL", percentage: 10, value: 12500, change: 5.7 },
  ]

  const recentTrades = [
    {
      id: 1,
      pair: "BTC/USDT",
      type: "Buy",
      amount: 0.25,
      price: 43200,
      profit: 450,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      pair: "ETH/USDT",
      type: "Sell",
      amount: 5.0,
      price: 2650,
      profit: -120,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      pair: "SOL/USDT",
      type: "Buy",
      amount: 100,
      price: 125,
      profit: 280,
      date: "2024-01-13",
      status: "completed",
    },
    {
      id: 4,
      pair: "ADA/USDT",
      type: "Sell",
      amount: 1000,
      price: 0.52,
      profit: -85,
      date: "2024-01-12",
      status: "completed",
    },
  ]

  const performanceGoals = [
    { name: "Monthly Profit Target", current: 18500, target: 25000, progress: 74 },
    { name: "Win Rate Goal", current: 68.4, target: 75, progress: 91 },
    { name: "Portfolio Diversification", current: 4, target: 6, progress: 67 },
    { name: "Risk Management", current: 85, target: 90, progress: 94 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your trading performance and portfolio metrics
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioMetrics.totalValue)}</p>
                <div className="flex items-center mt-1">
                  {portfolioMetrics.totalChange > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      portfolioMetrics.totalChange > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatPercentage(portfolioMetrics.totalChange)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Trades</p>
                <p className="text-2xl font-bold">{tradingStats.totalTrades}</p>
                <div className="flex items-center mt-1">
                  <Activity className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">This month</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Win Rate</p>
                <p className="text-2xl font-bold">{tradingStats.winRate}%</p>
                <div className="flex items-center mt-1">
                  <Target className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Above average</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Profit</p>
                <p className="text-2xl font-bold">{formatCurrency(tradingStats.totalProfit)}</p>
                <div className="flex items-center mt-1">
                  <Zap className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">+12% vs last month</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio">
              <div className="space-y-6">
                {/* Asset Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5" />
                      <span>Asset Allocation</span>
                    </CardTitle>
                    <CardDescription>Current portfolio distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assetAllocation.map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="font-bold text-blue-600 dark:text-blue-400">{asset.symbol}</span>
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(asset.value)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{asset.percentage}%</p>
                            <p className={`text-sm ${asset.change > 0 ? "text-green-600" : "text-red-600"}`}>
                              {formatPercentage(asset.change)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Portfolio Performance Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Value over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Portfolio performance chart would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trading">
              <div className="space-y-6">
                {/* Trading Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Statistics</CardTitle>
                    <CardDescription>Detailed trading performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(tradingStats.bestTrade)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Best Trade</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(tradingStats.worstTrade)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Worst Trade</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(tradingStats.avgProfit)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Profit</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-purple-600">{tradingStats.avgHoldTime}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Hold Time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Trades */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Trades</CardTitle>
                    <CardDescription>Your latest trading activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentTrades.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center space-x-4">
                            <Badge variant={trade.type === "Buy" ? "default" : "secondary"}>{trade.type}</Badge>
                            <div>
                              <p className="font-medium">{trade.pair}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {trade.amount} @ {formatCurrency(trade.price)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${trade.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                              {formatCurrency(trade.profit)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{trade.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-6">
                {/* Performance Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Goals</CardTitle>
                    <CardDescription>Track your progress towards trading goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {performanceGoals.map((goal, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{goal.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {goal.name.includes("Rate") || goal.name.includes("Management")
                                ? `${goal.current}%`
                                : goal.name.includes("Profit")
                                  ? formatCurrency(goal.current)
                                  : goal.current}{" "}
                              /{" "}
                              {goal.name.includes("Rate") || goal.name.includes("Management")
                                ? `${goal.target}%`
                                : goal.name.includes("Profit")
                                  ? formatCurrency(goal.target)
                                  : goal.target}
                            </span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                          <p className="text-xs text-gray-500">{goal.progress}% complete</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Monthly performance comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Performance trends chart would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Today's P&L</span>
                  <span className="font-medium text-green-600">+{formatCurrency(portfolioMetrics.dayChangeValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Best Performer</span>
                  <Badge variant="default">{portfolioMetrics.bestPerformer}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Worst Performer</span>
                  <Badge variant="destructive">{portfolioMetrics.worstPerformer}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Positions</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Portfolio Risk</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Diversification</span>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Volatility</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-green-600">Bullish</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Market sentiment is positive with strong buying pressure across major cryptocurrencies.
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-green-600">72%</div>
                    <div className="text-gray-500">Bulls</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-red-600">28%</div>
                    <div className="text-gray-500">Bears</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
