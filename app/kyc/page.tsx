"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Camera,
  User,
  CreditCard,
  MapPin,
  Star,
  Lock,
  Zap,
} from "lucide-react"

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [kycStatus, setKycStatus] = useState("pending") // pending, approved, rejected
  const [uploadedDocs, setUploadedDocs] = useState({
    identity: false,
    address: false,
    selfie: false,
  })

  const steps = [
    { id: 1, title: "Personal Information", completed: true },
    { id: 2, title: "Document Upload", completed: false },
    { id: 3, title: "Verification", completed: false },
  ]

  const benefits = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Higher Limits",
      description: "Increase daily withdrawal limits to $100,000",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Enhanced Security",
      description: "Additional account protection and monitoring",
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Premium Features",
      description: "Access to advanced trading tools and analytics",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Fiat Deposits",
      description: "Direct bank transfers and credit card deposits",
    },
  ]

  const handleFileUpload = (docType: string) => {
    // Simulate file upload
    setUploadedDocs((prev) => ({ ...prev, [docType]: true }))
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed"
    if (stepId === currentStep) return "current"
    return "upcoming"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 dark:text-green-400"
      case "pending":
        return "text-yellow-600 dark:text-yellow-400"
      case "rejected":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KYC Verification</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete your identity verification to unlock all features
        </p>
      </div>

      {/* Status Overview */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6" />
                <span>Verification Status</span>
              </CardTitle>
              <CardDescription>Current status of your KYC verification</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(kycStatus)}
              <Badge
                variant={kycStatus === "approved" ? "default" : kycStatus === "pending" ? "secondary" : "destructive"}
              >
                {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Verification Progress</span>
              <span>{Math.round((currentStep / steps.length) * 100)}%</span>
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />

            {kycStatus === "pending" && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Your documents are being reviewed. This process typically takes 1-3 business days.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Steps */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verification Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        getStepStatus(step.id) === "completed"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : getStepStatus(step.id) === "current"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                            : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                      }`}
                    >
                      {getStepStatus(step.id) === "completed" ? <CheckCircle className="h-4 w-4" /> : step.id}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          getStepStatus(step.id) === "current" ? "text-blue-600 dark:text-blue-400" : ""
                        }`}
                      >
                        {step.title}
                      </p>
                      {index < steps.length - 1 && <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 ml-4 mt-2" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Verification Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{benefit.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please provide your personal details for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" placeholder="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" placeholder="NY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>Continue to Document Upload</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>Upload the required documents for identity verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Identity Document */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Identity Document</h3>
                    {uploadedDocs.identity && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload a clear photo of your government-issued ID (passport, driver's license, or national ID)
                  </p>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    {uploadedDocs.identity ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                        <p className="text-sm font-medium text-green-600">Identity document uploaded</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileUpload("identity")}>
                          Replace Document
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                        <Button onClick={() => handleFileUpload("identity")}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Identity Document
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Address Proof */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Proof of Address</h3>
                    {uploadedDocs.address && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload a recent utility bill, bank statement, or official document showing your address (not older
                    than 3 months)
                  </p>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    {uploadedDocs.address ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                        <p className="text-sm font-medium text-green-600">Address proof uploaded</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileUpload("address")}>
                          Replace Document
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                        <Button onClick={() => handleFileUpload("address")}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Address Proof
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Selfie */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Selfie Verification</h3>
                    {uploadedDocs.selfie && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Take a clear selfie holding your identity document next to your face
                  </p>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    {uploadedDocs.selfie ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                        <p className="text-sm font-medium text-green-600">Selfie uploaded</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileUpload("selfie")}>
                          Retake Selfie
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Take a selfie with your ID</p>
                        <Button onClick={() => handleFileUpload("selfie")}>
                          <Camera className="h-4 w-4 mr-2" />
                          Take Selfie
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!uploadedDocs.identity || !uploadedDocs.address || !uploadedDocs.selfie}
                  >
                    Submit for Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Verification Complete</CardTitle>
                <CardDescription>Your documents have been submitted for review</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Documents Submitted Successfully!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for completing the KYC verification process. Our team will review your documents within
                    1-3 business days.
                  </p>
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    You will receive an email notification once your verification is complete. In the meantime, you can
                    continue using the platform with current limits.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h4 className="font-semibold">What happens next?</h4>
                  <div className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Our compliance team reviews your documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>You'll receive an email with the verification result</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span>Once approved, all premium features will be unlocked</span>
                    </div>
                  </div>
                </div>

                <Button onClick={() => (window.location.href = "/dashboard")}>Return to Dashboard</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
