"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface WebSocketContextType {
  socket: WebSocket | null
  isConnected: boolean
  subscribe: (channel: string, callback: (data: any) => void) => void
  unsubscribe: (channel: string) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Map<string, (data: any) => void>>(new Map())

  useEffect(() => {
    // Simulate WebSocket connection for real-time data
    const mockSocket = {
      send: (data: string) => console.log("Sending:", data),
      close: () => console.log("Closing connection"),
      readyState: 1,
    } as WebSocket

    setSocket(mockSocket)
    setIsConnected(true)

    // Simulate real-time price updates
    const interval = setInterval(() => {
      subscriptions.forEach((callback, channel) => {
        if (channel.includes("ticker")) {
          const symbol = channel.split("@")[0]
          callback({
            symbol,
            price: (Math.random() * 50000 + 20000).toFixed(2),
            change: (Math.random() * 10 - 5).toFixed(2),
            volume: (Math.random() * 1000000).toFixed(0),
          })
        }
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [subscriptions])

  const subscribe = (channel: string, callback: (data: any) => void) => {
    setSubscriptions((prev) => new Map(prev.set(channel, callback)))
  }

  const unsubscribe = (channel: string) => {
    setSubscriptions((prev) => {
      const newMap = new Map(prev)
      newMap.delete(channel)
      return newMap
    })
  }

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        isConnected,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }
  return context
}
