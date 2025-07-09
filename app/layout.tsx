import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { WebSocketProvider } from "@/components/providers/websocket-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OC Exchange - Professional Cryptocurrency Trading Platform",
  description: "Trade Bitcoin, Ethereum and other cryptocurrencies with advanced tools and security",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <WebSocketProvider>
              {children}
              <Toaster />
            </WebSocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
