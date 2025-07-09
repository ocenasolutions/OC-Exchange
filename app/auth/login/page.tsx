import { LoginForm } from "@/components/auth/login-form"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">OC Exchange</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </Suspense>
  )
}
