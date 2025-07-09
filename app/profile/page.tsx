"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Shield, TrendingUp, Activity, Edit, Camera, CheckCircle, Clock } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Cryptocurrency enthusiast and active trader with 3+ years of experience in digital assets.",
    joinDate: "January 2022",
  })

  const profileCompletion = 85
  const tradingLevel = "Advanced"
  const totalTrades = 1247
  const successRate = 78.5
  const totalVolume = "$2,450,000"

  const achievements = [
    { id: 1, title: "First Trade", description: "Completed your first trade", earned: true, date: "Jan 2022" },
    { id: 2, title: "Volume Trader", description: "Traded over $1M in volume", earned: true, date: "Mar 2022" },
    {
      id: 3,
      title: "Consistent Trader",
      description: "100 consecutive days of trading",
      earned: true,
      date: "Jun 2022",
    },
    { id: 4, title: "Risk Manager", description: "Maintained 80%+ success rate", earned: false, date: null },
    { id: 5, title: "Diamond Hands", description: "Held position for 6+ months", earned: true, date: "Dec 2022" },
    { id: 6, title: "Whale Trader", description: "Single trade over $100K", earned: false, date: null },
  ]

  const recentActivity = [
    { id: 1, type: "trade", description: "Bought 0.5 BTC at $43,250", time: "2 hours ago", status: "completed" },
    { id: 2, type: "withdrawal", description: "Withdrew $5,000 to bank account", time: "1 day ago", status: "pending" },
    {
      id: 3,
      type: "deposit",
      description: "Deposited $10,000 via wire transfer",
      time: "2 days ago",
      status: "completed",
    },
    { id: 4, type: "trade", description: "Sold 100 ETH at $2,650", time: "3 days ago", status: "completed" },
    { id: 5, type: "kyc", description: "KYC verification approved", time: "1 week ago", status: "completed" },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-4 w-4" />
      case "withdrawal":
        return <Activity className="h-4 w-4" />
      case "deposit":
        return <Activity className="h-4 w-4" />
      case "kyc":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400"
      case "pending":
        return "text-yellow-600 dark:text-yellow-400"
      case "failed":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account information and trading preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription>{profileData.email}</CardDescription>
              <Badge variant="secondary" className="mt-2">
                {tradingLevel} Trader
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completion</span>
                    <span>{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    <span>KYC Verified</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Trading Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTrades}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Trades</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{successRate}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalVolume}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Volume</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details and preferences</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                      {isEditing ? (
                        "Save Changes"
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your trading milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${
                          achievement.earned
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              achievement.earned ? "bg-green-100 dark:bg-green-800" : "bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            {achievement.earned ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                                Earned {achievement.date}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest account and trading activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500">{activity.time}</span>
                            <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
