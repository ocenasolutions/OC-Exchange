"use client"
import { useState } from "react"

export function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [tradingEnabled, setTradingEnabled] = useState(true)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 max-w-xl">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Settings</h3>

      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Maintenance&nbsp;Mode</span>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Enable Trading</span>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={tradingEnabled}
            onChange={(e) => setTradingEnabled(e.target.checked)}
          />
        </label>
      </div>

      <button
        onClick={() => (window as any).toast?.({ type: "success", title: "Settings saved" })}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  )
}
