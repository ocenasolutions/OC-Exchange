"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Monitor,
  MapPin,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SecurityPage() {
  const { toast } = useToast()
  const [showApiKey, setShowApiKey] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const apiKeys = [
    {
      id: 1,
      name: "Trading Bot API",
      key: "oc_live_sk_1234567890abcdef",
      permissions: ["read", "trade"],
      lastUsed: "2 hours ago",
      created: "2024-01-10",
    },
    {
      id: 2,
      name: "Portfolio Tracker",
      key: "oc_live_sk_abcdef1234567890",
      permissions: ["read"],
      lastUsed: "1 day ago",
      created: "2024-01-05",
    },
  ]

  const loginHistory = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, US",
      ip: "192.168.1.100",
      time: "2024-01-15 14:30:00",
      status: "success",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, US",
      ip: "192.168.1.101",
      time: "2024-01-15 09:15:00",
      status: "success",
    },
    {
      id: 3,
      device: "Chrome on Android",
      location: "Los Angeles, US",
      ip: "10.0.0.50",
      time: "2024-01-14 22:45:00",
      status: "failed",
    },
    {
      id: 4,
      device: "Firefox on Windows",
      location: "New York, US",
      ip: "192.168.1.100",
      time: "2024-01-14 16:20:00",
      status: "success",
    },
  ]

  const securityRecommendations = [
    {
      id: 1,
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      status: "completed",
      priority: "high",
    },
    {
      id: 2,
      title: "Use Strong Password",
      description: "Your password should be at least 12 characters long",
      status: "completed",
      priority: "high",
    },
    {
      id: 3,
      title: "Review API Keys",
      description: "Remove unused API keys and limit permissions",
      status: "pending",
      priority: "medium",
    },
    {
      id: 4,
      title: "Enable Email Notifications",
      description: "Get notified of important security events",
      status: "completed",
      priority: "medium",
    },
    {
      id: 5,
      title: "Regular Security Checkup",
      description: "Review your security settings monthly",
      status: "pending",
      priority: "low",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    })
  }

  const revokeApiKey = (keyId: number) => {
    toast({
      title: "API Key Revoked",
      description: "The API key has been successfully revoked",
    })
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) {
      return <Smartphone className="h-4 w-4" />
    }
    return <Monitor className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 dark:text-green-400"
      case "failed":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account security settings and monitor activity
        </p>
      </div>

      {/* Security Score */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <span>Security Score</span>
              </CardTitle>
              <CardDescription>Your account security rating</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">85/100</div>
              <Badge variant="default" className="mt-1">
                Good
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Two-Factor Authentication</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Strong Password</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm">API Key Review Needed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="authentication" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="authentication">2FA</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="authentication">
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use an authenticator app to generate verification codes
                      </p>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>

                  {twoFactorEnabled && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Two-factor authentication is enabled. Your account is protected with an additional security
                        layer.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Backup Codes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Save these backup codes in a safe place. You can use them to access your account if you lose your
                      authenticator device.
                    </p>
                    <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
                      <div>1. 123456789</div>
                      <div>2. 987654321</div>
                      <div>3. 456789123</div>
                      <div>4. 789123456</div>
                      <div>5. 321654987</div>
                      <div>6. 654987321</div>
                    </div>
                    <Button variant="outline">Generate New Codes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Your password should be at least 12 characters long and include uppercase, lowercase, numbers, and
                      special characters.
                    </AlertDescription>
                  </Alert>

                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>API Keys</CardTitle>
                      <CardDescription>Manage your API keys for third-party applications</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{apiKey.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Created on {apiKey.created}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(apiKey.key)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => revokeApiKey(apiKey.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Key:</span>
                            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {showApiKey ? apiKey.key : `${apiKey.key.substring(0, 20)}...`}
                            </code>
                            <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-600 dark:text-gray-400">Permissions:</span>
                              <div className="flex space-x-1">
                                {apiKey.permissions.map((permission) => (
                                  <Badge key={permission} variant="secondary" className="text-xs">
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">Last used {apiKey.lastUsed}</span>
                            </div>
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
                  <CardTitle>Login Activity</CardTitle>
                  <CardDescription>Recent login attempts and device access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loginHistory.map((login) => (
                      <div key={login.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                            {getDeviceIcon(login.device)}
                          </div>
                          <div>
                            <p className="font-medium">{login.device}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{login.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Globe className="h-3 w-3" />
                                <span>{login.ip}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={login.status === "success" ? "default" : "destructive"}>{login.status}</Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(login.time).toLocaleString()}
                          </p>
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
          {/* Security Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityRecommendations.map((rec) => (
                  <div key={rec.id} className="p-3 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{rec.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{rec.description}</p>
                      </div>
                      <Badge className={getPriorityColor(rec.priority)} size="sm">
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      {rec.status === "completed" ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs">Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Get notified of security events via email
                    </p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">SMS Notifications</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Get notified of critical events via SMS</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-red-600">Emergency Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                  Revoke All API Keys
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                  Log Out All Devices
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                  Freeze Account
                </Button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                Use these actions only if you suspect unauthorized access to your account.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
