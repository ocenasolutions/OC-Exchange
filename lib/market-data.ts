interface CoinGeckoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
}

export interface MarketData {
  symbol: string
  baseAsset: string
  quoteAsset: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  marketCap?: number
}

export async function fetchMarketData(): Promise<MarketData[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h",
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: CoinGeckoPrice[] = await response.json()

    return data.map((coin) => ({
      symbol: `${coin.symbol.toUpperCase()}USDT`,
      baseAsset: coin.symbol.toUpperCase(),
      quoteAsset: "USDT",
      price: coin.current_price,
      change: coin.price_change_24h || 0,
      changePercent: coin.price_change_percentage_24h || 0,
      volume: coin.total_volume || 0,
      high: coin.high_24h || coin.current_price,
      low: coin.low_24h || coin.current_price,
      marketCap: coin.market_cap,
    }))
  } catch (error) {
    console.error("Failed to fetch market data:", error)
    return []
  }
}

export async function fetchCoinPrice(coinId: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data[coinId]?.usd || null
  } catch (error) {
    console.error("Failed to fetch coin price:", error)
    return null
  }
}

export async function fetchHistoricalData(coinId: string, days = 30): Promise<Array<[number, number]>> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.prices || []
  } catch (error) {
    console.error("Failed to fetch historical data:", error)
    return []
  }
}
