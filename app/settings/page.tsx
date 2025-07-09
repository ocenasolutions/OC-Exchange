"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { User, Shield, Bell, Key, Globe, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showApiSecret, setShowApiSecret] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    trading: true,
    security: true,
    marketing: false,
  })

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "api", name: "API Keys", icon: Key },
    { id: "preferences", name: "Preferences", icon: Globe },
  ]

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your account preferences and security settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Password</h2>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Two-Factor Authentication
                    </h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Authenticator App</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Use an authenticator app to generate verification codes
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Delivery Methods</h3>
                      <div className="space-y-3">
                        {Object.entries({
                          email: "Email notifications",
                          push: "Push notifications",
                          sms: "SMS notifications",
                        }).map(([key, label]) => (
                          <label key={key} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications[key as keyof typeof notifications]}
                              onChange={() => handleNotificationChange(key)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Types</h3>
                      <div className="space-y-3">
                        {Object.entries({
                          trading: "Trading alerts and order updates",
                          security: "Security and account alerts",
                          marketing: "Marketing and promotional emails",
                        }).map(([key, label]) => (
                          <label key={key} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={notifications[key as keyof typeof notifications]}
                              onChange={() => handleNotificationChange(key)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Create New Key
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900 dark:text-white">Trading Bot Key</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded">
                          Active
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Key:</span>
                          <code className="font-mono text-gray-900 dark:text-white">ak_live_1234567890abcdef</code>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Secret:</span>
                          <div className="flex items-center">
                            <code className="font-mono text-gray-900 dark:text-white mr-2">
                              {showApiSecret ? "sk_live_abcdef1234567890" : "••••••••••••••••"}
                            </code>
                            <button
                              onClick={() => setShowApiSecret(!showApiSecret)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showApiSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Permissions:</span>
                          <span className="text-gray-900 dark:text-white">Read, Trade</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 w-20">Created:</span>
                          <span className="text-gray-900 dark:text-white">2024-01-15</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm border border-red-300 text-red-700 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Preferences</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Chinese</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                        <option>UTC</option>
                        <option>EST (UTC-5)</option>
                        <option>PST (UTC-8)</option>
                        <option>GMT (UTC+0)</option>
                        <option>JST (UTC+9)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default Currency
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>JPY</option>
                        <option>BTC</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Enable dark mode</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Preferences
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
