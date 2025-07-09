"use client"
import { useState, useEffect } from "react"
import { ShieldCheck, ShieldX } from "lucide-react"

interface KYCRequest {
  id: string
  user: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
}

export function KYCManagement() {
  const [requests, setRequests] = useState<KYCRequest[]>([])

  useEffect(() => {
    // TODO: Replace with real fetch
    setRequests([
      {
        id: "req_1",
        user: "alice@example.com",
        submittedAt: new Date().toISOString(),
        status: "pending",
      },
    ])
  }, [])

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">KYC Verification</h3>

      {requests.length === 0 && <p className="text-gray-500 dark:text-gray-400">No pending requests</p>}

      {requests.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 py-3"
        >
          <div>
            <p className="font-medium">{r.user}</p>
            <p className="text-xs text-gray-500">Submitted {new Date(r.submittedAt).toLocaleString()}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => updateStatus(r.id, "approved")}
              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
              title="Approve"
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateStatus(r.id, "rejected")}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              title="Reject"
            >
              <ShieldX className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
