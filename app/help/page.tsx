import Link from "next/link"
import { Search, MessageCircle, Book, Shield, CreditCard, TrendingUp } from "lucide-react"

export default function HelpPage() {
  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of cryptocurrency trading",
      articles: [
        "How to create an account",
        "Verifying your identity (KYC)",
        "Making your first deposit",
        "Understanding trading basics",
      ],
    },
    {
      icon: TrendingUp,
      title: "Trading",
      description: "Master advanced trading features",
      articles: [
        "Types of orders explained",
        "Reading charts and indicators",
        "Risk management strategies",
        "Trading fees and limits",
      ],
    },
    {
      icon: CreditCard,
      title: "Deposits & Withdrawals",
      description: "Manage your funds securely",
      articles: [
        "How to deposit cryptocurrency",
        "Withdrawal process and limits",
        "Network fees explained",
        "Transaction confirmations",
      ],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Keep your account safe",
      articles: ["Setting up 2FA", "Recognizing phishing attempts", "API key management", "Account recovery process"],
    },
  ]

  const faqs = [
    {
      question: "How long does account verification take?",
      answer:
        "Account verification typically takes 1-3 business days. During peak periods, it may take up to 5 business days.",
    },
    {
      question: "What are the trading fees?",
      answer:
        "Our trading fees start at 0.1% per trade and decrease based on your 30-day trading volume. VIP users enjoy reduced fees.",
    },
    {
      question: "Is my cryptocurrency safe on OC Exchange?",
      answer:
        "Yes, we use industry-leading security measures including cold storage for 95% of funds, multi-signature wallets, and regular security audits.",
    },
    {
      question: "Can I trade on mobile?",
      answer:
        "Yes, our platform is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android.",
    },
    {
      question: "What cryptocurrencies can I trade?",
      answer:
        "We support over 500 cryptocurrencies including Bitcoin, Ethereum, and many altcoins. New coins are added regularly.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm font-medium mb-2 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Find answers to your questions</p>
            </div>
            <MessageCircle className="h-12 w-12 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <category.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find what you're looking for? Our support team is here to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Support
            </Link>
            <Link
              href="#"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Live Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
