"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Copy,
  Share2,
  TrendingUp,
  DollarSign,
  Star,
  Crown,
  Zap,
  Calendar,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReferralsPage() {
  const { toast } = useToast()
  const [referralCode] = useState("OC-REF-ABC123")
  const [referralLink] = useState(`https://ocexchange.com/register?ref=${referralCode}`)

  const referralStats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: 2450,
    monthlyEarnings: 680,
    currentTier: "Gold",
    nextTier: "Platinum",
    progressToNext: 75,
  }

  const tierBenefits = [
    {
      tier: "Bronze",
      minReferrals: 0,
      commission: 20,
      bonus: 0,
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      icon: <Star className="h-4 w-4" />,
    },
    {
      tier: "Silver",
      minReferrals: 5,
      commission: 25,
      bonus: 50,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      icon: <Star className="h-4 w-4" />,
    },
    {
      tier: "Gold",
      minReferrals: 15,
      commission: 30,
      bonus: 100,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      icon: <Crown className="h-4 w-4" />,
    },
    {
      tier: "Platinum",
      minReferrals: 30,
      commission: 35,
      bonus: 200,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      icon: <Crown className="h-4 w-4" />,
    },
    {
      tier: "Diamond",
      minReferrals: 50,
      commission: 40,
      bonus: 500,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      icon: <Zap className="h-4 w-4" />,
    },
  ]

  const recentReferrals = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      joinDate: "2024-01-15",
      status: "active",
      earnings: 125,
      tradingVolume: 15000,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      joinDate: "2024-01-12",
      status: "active",
      earnings: 89,
      tradingVolume: 8900,
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.w@email.com",
      joinDate: "2024-01-10",
      status: "pending",
      earnings: 0,
      tradingVolume: 0,
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.d@email.com",
      joinDate: "2024-01-08",
      status: "active",
      earnings: 156,
      tradingVolume: 22000,
    },
  ]

  const earningsHistory = [
    { month: "January 2024", amount: 680, referrals: 6 },
    { month: "December 2023", amount: 520, referrals: 4 },
    { month: "November 2023", amount: 450, referrals: 3 },
    { month: "October 2023", amount: 380, referrals: 5 },
    { month: "September 2023", amount: 420, referrals: 6 },
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join OC Exchange",
        text: "Start trading cryptocurrencies with OC Exchange",
        url: referralLink,
      })
    } else {
      copyToClipboard(referralLink, "Referral link")
    }
  }

  const getCurrentTierInfo = () => {
    return tierBenefits.find((tier) => tier.tier === referralStats.currentTier)
  }

  const getNextTierInfo = () => {
    return tierBenefits.find((tier) => tier.tier === referralStats.nextTier)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Referral Program</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Earn rewards by inviting friends to trade on OC Exchange
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Referrals</p>
                <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
                <p className="text-xs text-green-600 mt-1">{referralStats.activeReferrals} active</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Earnings</p>
                <p className="text-2xl font-bold">${referralStats.totalEarnings}</p>
                <p className="text-xs text-green-600 mt-1">+${referralStats.monthlyEarnings} this month</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Tier</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getCurrentTierInfo()?.color}>
                    {getCurrentTierInfo()?.icon}
                    <span className="ml-1">{referralStats.currentTier}</span>
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {getCurrentTierInfo()?.commission}% commission
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Tier Progress</p>
                <p className="text-lg font-bold">{referralStats.progressToNext}%</p>
                <Progress value={referralStats.progressToNext} className="h-2 mt-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">to {referralStats.nextTier}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="referrals">My Referrals</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                {/* Referral Link */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Referral Link</CardTitle>
                    <CardDescription>
                      Share this link to earn commissions from your referrals' trading activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input value={referralLink} readOnly className="flex-1" />
                      <Button onClick={() => copyToClipboard(referralLink, "Referral link")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button onClick={shareReferral} variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <label className="text-sm font-medium">Referral Code</label>
                        <div className="flex space-x-2 mt-1">
                          <Input value={referralCode} readOnly />
                          <Button onClick={() => copyToClipboard(referralCode, "Referral code")}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tier Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tier Benefits</CardTitle>
                    <CardDescription>Unlock higher commissions and bonuses as you refer more users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tierBenefits.map((tier, index) => (
                        <div
                          key={tier.tier}
                          className={`p-4 rounded-lg border-2 ${
                            tier.tier === referralStats.currentTier
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Badge className={tier.color}>
                                {tier.icon}
                                <span className="ml-1">{tier.tier}</span>
                              </Badge>
                              {tier.tier === referralStats.currentTier && <Badge variant="outline">Current</Badge>}
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{tier.commission}% Commission</p>
                              {tier.bonus > 0 && <p className="text-sm text-green-600">${tier.bonus} Tier Bonus</p>}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Requires {tier.minReferrals}+ active referrals
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="referrals">
              <Card>
                <CardHeader>
                  <CardTitle>My Referrals</CardTitle>
                  <CardDescription>Track your referred users and their activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReferrals.map((referral) => (
                      <div key={referral.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>
                              {referral.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{referral.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{referral.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Joined {referral.joinDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={referral.status === "active" ? "default" : "secondary"}>
                            {referral.status === "active" ? <CheckCircle className="h-3 w-3 mr-1" /> : null}
                            {referral.status}
                          </Badge>
                          <p className="text-sm font-medium mt-1">${referral.earnings} earned</p>
                          <p className="text-xs text-gray-500">${referral.tradingVolume.toLocaleString()} volume</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings History</CardTitle>
                  <CardDescription>Your monthly referral earnings breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {earningsHistory.map((earning, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div>
                          <p className="font-medium">{earning.month}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{earning.referrals} new referrals</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">${earning.amount}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Commission earned</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Share Your Link</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Send your referral link to friends and family
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">They Sign Up</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Your referrals create an account and verify their identity
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">Start Trading</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      When they trade, you earn commission on their fees
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm">Get Paid</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Receive your earnings directly to your wallet
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Program Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Commissions are paid monthly</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Minimum payout is $50</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Self-referrals are not allowed</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <p>Tier status is reviewed monthly</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Full Terms & Conditions
              </Button>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Have questions about the referral program? Our support team is here to help.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
