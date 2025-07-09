import { WalletInterface } from "@/components/wallet/wallet-interface"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function WalletPage() {
  return (
    <ProtectedRoute>
      <WalletInterface />
    </ProtectedRoute>
  )
}
