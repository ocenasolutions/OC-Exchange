import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
