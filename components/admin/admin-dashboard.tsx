"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/layout/navigation"
import { UserManagement } from "./user-management"
import { KYCManagement } from "./kyc-management"
import { TradingStats } from "./trading-stats"
import { SystemSettings } from "./system-settings"
import { Users, Shield, BarChart3, Settings, AlertTriangle, TrendingUp } from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingKYC: 0,
    totalVolume: 0,
    totalTrades: 0,
    systemHealth: 0,
  })

  useEffect(() => {
    // Mock admin stats
    setStats({
      totalUsers: 125430,
      activeUsers: 45230,
      pendingKYC: 234,
      totalVolume: 2500000000,
      totalTrades: 1250000,
      systemHealth: 99.9,
    })
  }, [])

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "users", name: "Users", icon: Users },
    { id: "kyc", name: "KYC", icon: Shield },
    { id: "trading", name: "Trading", icon: TrendingUp },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage users, monitor system performance, and configure platform settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingKYC}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pending KYC</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(stats.totalVolume / 1000000000).toFixed(1)}B
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">24h Volume</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health Alert */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div className="text-sm text-green-800 dark:text-green-200">
              System Status: All services operational ({stats.systemHealth}% uptime)
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">New user registrations</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">+1,234 today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">KYC approvals</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">+89 today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total trades</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">+12,456 today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Support tickets</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">23 open</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                    <div className="text-sm">
                      <div className="text-gray-900 dark:text-white">High trading volume detected</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        BTC/USDT pair experiencing unusual activity
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 mr-2"></div>
                    <div className="text-sm">
                      <div className="text-gray-900 dark:text-white">System backup completed</div>
                      <div className="text-gray-500 dark:text-gray-400">Daily backup finished successfully</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && <UserManagement />}
          {activeTab === "kyc" && <KYCManagement />}
          {activeTab === "trading" && <TradingStats />}
          {activeTab === "settings" && <SystemSettings />}
        </div>
      </main>
    </div>
  )
}
