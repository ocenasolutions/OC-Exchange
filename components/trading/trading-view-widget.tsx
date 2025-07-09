"use client"

import { useEffect, useRef } from "react"

interface TradingViewWidgetProps {
  symbol: string
  height?: number
}

export function TradingViewWidget({ symbol, height = 400 }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous widget
    containerRef.current.innerHTML = ""

    // Create TradingView widget script
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: "15",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [symbol])

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div ref={containerRef} className="tradingview-widget-container w-full h-full">
        <div className="tradingview-widget-container__widget w-full h-full"></div>
      </div>
    </div>
  )
}
