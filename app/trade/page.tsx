import { TradingInterface } from "@/components/trading/trading-interface"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function TradePage() {
  return (
    <ProtectedRoute>
      <TradingInterface />
    </ProtectedRoute>
  )
}
