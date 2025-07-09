"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, TrendingUp, Clock, Eye, MessageCircle, Share2, Bookmark, Filter, Zap } from "lucide-react"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All News", count: 156 },
    { id: "bitcoin", name: "Bitcoin", count: 45 },
    { id: "ethereum", name: "Ethereum", count: 32 },
    { id: "defi", name: "DeFi", count: 28 },
    { id: "nft", name: "NFTs", count: 19 },
    { id: "regulation", name: "Regulation", count: 24 },
    { id: "market", name: "Market Analysis", count: 38 },
  ]

  const featuredNews = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High as Institutional Adoption Surges",
      excerpt:
        "Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented demand and price discovery.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Bitcoin",
      author: "Sarah Johnson",
      publishedAt: "2 hours ago",
      readTime: "5 min read",
      views: 12500,
      comments: 89,
      trending: true,
    },
    {
      id: 2,
      title: "Ethereum 2.0 Staking Rewards Hit Record Levels",
      excerpt:
        "The latest network upgrade has significantly improved staking yields, attracting more validators to secure the network.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Ethereum",
      author: "Michael Chen",
      publishedAt: "4 hours ago",
      readTime: "3 min read",
      views: 8900,
      comments: 56,
      trending: false,
    },
    {
      id: 3,
      title: "DeFi Protocol Launches Revolutionary Yield Farming Strategy",
      excerpt:
        "New automated market maker introduces innovative liquidity mining mechanisms with enhanced capital efficiency.",
      image: "/placeholder.svg?height=200&width=400",
      category: "DeFi",
      author: "Alex Rodriguez",
      publishedAt: "6 hours ago",
      readTime: "4 min read",
      views: 6700,
      comments: 34,
      trending: true,
    },
  ]

  const regularNews = [
    {
      id: 4,
      title: "Central Bank Digital Currencies Gain Momentum Globally",
      excerpt: "Multiple countries accelerate CBDC development as digital payment adoption increases worldwide.",
      category: "Regulation",
      author: "Emma Thompson",
      publishedAt: "8 hours ago",
      readTime: "6 min read",
      views: 5400,
      comments: 23,
    },
    {
      id: 5,
      title: "NFT Marketplace Introduces Creator Royalty Protection",
      excerpt: "New smart contract standards ensure artists receive fair compensation from secondary sales.",
      category: "NFTs",
      author: "David Kim",
      publishedAt: "12 hours ago",
      readTime: "3 min read",
      views: 4200,
      comments: 18,
    },
    {
      id: 6,
      title: "Crypto Exchange Security Measures Reach New Standards",
      excerpt: "Industry-wide adoption of advanced security protocols reduces risk of breaches and theft.",
      category: "Market Analysis",
      author: "Lisa Wang",
      publishedAt: "1 day ago",
      readTime: "7 min read",
      views: 7800,
      comments: 45,
    },
    {
      id: 7,
      title: "Layer 2 Solutions Show Massive Growth in Transaction Volume",
      excerpt: "Scaling solutions process record number of transactions while maintaining low fees.",
      category: "Ethereum",
      author: "James Wilson",
      publishedAt: "1 day ago",
      readTime: "5 min read",
      views: 6100,
      comments: 29,
    },
    {
      id: 8,
      title: "Institutional Investment in Crypto Reaches $50 Billion",
      excerpt: "Pension funds and endowments increase allocation to digital assets amid growing acceptance.",
      category: "Market Analysis",
      author: "Rachel Green",
      publishedAt: "2 days ago",
      readTime: "4 min read",
      views: 9200,
      comments: 67,
    },
  ]

  const trendingTopics = [
    { name: "Bitcoin ETF", posts: 1250 },
    { name: "Ethereum Merge", posts: 890 },
    { name: "DeFi Yields", posts: 670 },
    { name: "NFT Gaming", posts: 540 },
    { name: "Web3 Adoption", posts: 420 },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      Bitcoin: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Ethereum: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      DeFi: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      NFTs: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Regulation: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Market Analysis": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crypto News</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Stay updated with the latest cryptocurrency and blockchain news
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Featured News */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    {article.trending && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                        <Zap className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Badge className={`absolute top-3 right-3 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" />
                          <AvatarFallback>
                            {article.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.publishedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{article.comments}</span>
                        </div>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Bookmark className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Regular News */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <div className="space-y-4">
              {regularNews.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{article.publishedAt}</span>
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{article.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" />
                              <AvatarFallback>
                                {article.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{article.comments}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Bookmark className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Trending Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm">#{topic.name}</p>
                      <p className="text-xs text-gray-500">{topic.posts} posts</p>
                    </div>
                    <div className="text-xs text-gray-400">#{index + 1}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stay Updated</CardTitle>
              <CardDescription>Get the latest crypto news delivered to your inbox</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="Enter your email" type="email" />
                <Button className="w-full">Subscribe to Newsletter</Button>
                <p className="text-xs text-gray-500 text-center">Join 50,000+ subscribers. Unsubscribe anytime.</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bitcoin</span>
                  <div className="text-right">
                    <div className="font-medium">$43,250</div>
                    <div className="text-xs text-green-600">+2.5%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ethereum</span>
                  <div className="text-right">
                    <div className="font-medium">$2,650</div>
                    <div className="text-xs text-green-600">+1.8%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Market Cap</span>
                  <div className="text-right">
                    <div className="font-medium">$1.65T</div>
                    <div className="text-xs text-red-600">-0.3%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
