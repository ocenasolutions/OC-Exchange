import Link from "next/link"
import { Code, Key, Book, Shield, Zap, Globe } from "lucide-react"

export default function APIPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/market/data",
      description: "Get real-time market data for all trading pairs",
      auth: false,
    },
    {
      method: "GET",
      path: "/api/trading/orders",
      description: "Get user's trading orders",
      auth: true,
    },
    {
      method: "POST",
      path: "/api/trading/orders",
      description: "Create a new trading order",
      auth: true,
    },
    {
      method: "GET",
      path: "/api/wallet/balances",
      description: "Get user's wallet balances",
      auth: true,
    },
    {
      method: "GET",
      path: "/api/wallet/transactions",
      description: "Get user's transaction history",
      auth: true,
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "High Performance",
      description: "Low latency API with 99.9% uptime guarantee",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "API keys with configurable permissions and IP restrictions",
    },
    {
      icon: Globe,
      title: "RESTful Design",
      description: "Clean, intuitive REST API following industry standards",
    },
    {
      icon: Book,
      title: "Comprehensive Docs",
      description: "Detailed documentation with code examples",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm font-medium mb-2 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-center">
            <Code className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Documentation</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Build powerful trading applications with our API</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The OC Exchange API allows you to integrate our trading platform into your applications. Access real-time
              market data, manage orders, and build sophisticated trading strategies.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Base URL</h3>
              <code className="text-blue-800 dark:text-blue-200 font-mono">https://api.ocexchange.com/v1</code>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">API Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <feature.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Authentication */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Authentication</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">API Keys</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To access protected endpoints, you need to create API keys in your account settings. Each API key can
                  be configured with specific permissions.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Headers</h4>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {`X-API-Key: your-api-key
X-API-Secret: your-api-secret
X-API-Timestamp: 1640995200000
X-API-Signature: calculated-signature`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Rate Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Public Endpoints</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">1000 requests/minute</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Private Endpoints</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">100 requests/minute</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Trading Endpoints</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">10 requests/second</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-gray-900 dark:text-white">{endpoint.path}</code>
                    </div>
                    {endpoint.auth && (
                      <div className="flex items-center">
                        <Key className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-xs text-yellow-600 dark:text-yellow-400">Auth Required</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Code Examples</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Get Market Data</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    {`// JavaScript
const response = await fetch('https://api.ocexchange.com/v1/market/data');
const marketData = await response.json();
console.log(marketData);

// Python
import requests
response = requests.get('https://api.ocexchange.com/v1/market/data')
market_data = response.json()
print(market_data)

// cURL
curl -X GET "https://api.ocexchange.com/v1/market/data"`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Create Order (Authenticated)
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    {`// JavaScript
const order = await fetch('https://api.ocexchange.com/v1/trading/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key',
    'X-API-Secret': 'your-api-secret',
    'X-API-Timestamp': Date.now().toString(),
    'X-API-Signature': 'calculated-signature'
  },
  body: JSON.stringify({
    symbol: 'BTCUSDT',
    side: 'buy',
    type: 'limit',
    amount: 0.001,
    price: 45000
  })
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SDKs and Tools */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">SDKs and Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">JavaScript SDK</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Official JavaScript/TypeScript SDK for Node.js and browsers
                </p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  npm install @ocexchange/sdk
                </code>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Python SDK</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Python library for algorithmic trading and data analysis
                </p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">pip install ocexchange</code>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Postman Collection</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Ready-to-use Postman collection for API testing
                </p>
                <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">Download Collection</button>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our developer support team is here to help you integrate with our API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Developer Support
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
