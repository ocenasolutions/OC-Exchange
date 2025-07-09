"use client"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  kycStatus: "pending" | "approved" | "rejected"
  createdAt: string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    // TODO: Replace with real fetch
    setUsers([
      {
        id: "1",
        email: "user@example.com",
        name: "Alice",
        role: "user",
        kycStatus: "approved",
        createdAt: new Date().toISOString(),
      },
    ])
  }, [])

  const filtered = users.filter(
    (u) => u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Management</h3>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-2 text-left">Email</th>
              <th className="py-3 px-2 text-left">Name</th>
              <th className="py-3 px-2 text-left">Role</th>
              <th className="py-3 px-2 text-left">KYC</th>
              <th className="py-3 px-2 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr
                key={u.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-3 px-2">{u.email}</td>
                <td className="py-3 px-2">{u.name}</td>
                <td className="py-3 px-2 capitalize">{u.role}</td>
                <td className="py-3 px-2 capitalize">{u.kycStatus}</td>
                <td className="py-3 px-2">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
