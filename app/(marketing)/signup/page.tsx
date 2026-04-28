"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { provisionTenant } from "@/app/actions/provision-tenant"
import { Check, ArrowRight, Eye, EyeOff } from "lucide-react"

const benefits = [
  "14-day free trial, no credit card required",
  "Full access to all features",
  "AI-powered trip planning",
  "Your own branded destination portal",
]

// Password strength calculation
function calculatePasswordStrength(password: string): {
  score: number
  label: string
  color: string
  requirements: { met: boolean; text: string }[]
} {
  const requirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
    { met: /[^A-Za-z0-9]/.test(password), text: "One special character" },
  ]

  const score = requirements.filter((r) => r.met).length

  let label = "Very weak"
  let color = "bg-red-500"

  if (score === 5) {
    label = "Strong"
    color = "bg-green-500"
  } else if (score === 4) {
    label = "Good"
    color = "bg-yellow-500"
  } else if (score === 3) {
    label = "Fair"
    color = "bg-orange-500"
  } else if (score === 2) {
    label = "Weak"
    color = "bg-red-400"
  }

  return { score, label, color, requirements }
}

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Password state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordStrength = useMemo(() => calculatePasswordStrength(password), [password])
  const passwordsMatch = password === confirmPassword
  const canSubmit = passwordStrength.score >= 3 && passwordsMatch && confirmPassword.length > 0

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!canSubmit) {
      if (passwordStrength.score < 3) {
        setError("Please create a stronger password")
        return
      }
      if (!passwordsMatch) {
        setError("Passwords do not match")
        return
      }
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    const result = await provisionTenant({
      email: formData.get("email") as string,
      password: password,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      organizationName: formData.get("organizationName") as string,
    })

    setIsLoading(false)

    if (result.success && result.tenantSlug) {
      setSuccess(true)
    } else {
      setError(result.error || "Something went wrong. Please try again.")
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md border-zuru-sand-dark/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-zuru-ink">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a confirmation link. Click the link to activate your account and access your new destination portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/login">
              <Button variant="outline" className="mt-4">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        {/* Left: Benefits */}
        <div className="hidden flex-col justify-center lg:flex">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
              <circle cx="20" cy="20" r="20" fill="#FF6B35"/>
              <path d="M12 14L20 10L28 14V22L20 30L12 22V14Z" fill="#F5F0E8"/>
              <path d="M20 10V30M12 14L28 22M28 14L12 22" stroke="#4A2C4A" strokeWidth="1.5"/>
            </svg>
            <span className="text-2xl font-bold text-zuru-ink">Zuru</span>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-zuru-ink">
            Start your free trial
          </h1>
          <p className="mt-2 text-lg text-zuru-ink/70">
            Create your destination portal in minutes.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zuru-sunset/10">
                  <Check className="h-3.5 w-3.5 text-zuru-sunset" />
                </div>
                <span className="text-zuru-ink/80">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <Card className="border-zuru-sand-dark/30">
          <CardHeader>
            <div className="mb-4 lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                  <circle cx="20" cy="20" r="20" fill="#FF6B35"/>
                  <path d="M12 14L20 10L28 14V22L20 30L12 22V14Z" fill="#F5F0E8"/>
                  <path d="M20 10V30M12 14L28 22M28 14L12 22" stroke="#4A2C4A" strokeWidth="1.5"/>
                </svg>
                <span className="text-xl font-bold text-zuru-ink">Zuru</span>
              </Link>
            </div>
            <CardTitle className="text-zuru-ink">Create your account</CardTitle>
            <CardDescription>
              Already have an account?{" "}
              <Link href="/login" className="text-zuru-sunset hover:underline">
                Log in
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization name</Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  placeholder="Rwanda Tourism Board"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  This will be used to create your portal URL
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@rwandatourism.rw"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password with strength meter */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Password strength meter */}
                {password.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-1.5 flex-1 gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-full flex-1 rounded-full transition-colors ${
                              level <= passwordStrength.score
                                ? passwordStrength.color
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength.score >= 4 ? "text-green-600" : 
                        passwordStrength.score >= 3 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <ul className="grid grid-cols-2 gap-1 text-xs">
                      {passwordStrength.requirements.map((req) => (
                        <li
                          key={req.text}
                          className={`flex items-center gap-1 ${
                            req.met ? "text-green-600" : "text-muted-foreground"
                          }`}
                        >
                          <Check className={`h-3 w-3 ${req.met ? "opacity-100" : "opacity-30"}`} />
                          {req.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    required
                    disabled={isLoading}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <p className={`text-xs ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                    {passwordsMatch ? (
                      <span className="flex items-center gap-1">
                        <Check className="h-3 w-3" /> Passwords match
                      </span>
                    ) : (
                      "Passwords do not match"
                    )}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset-dark disabled:opacity-50"
                disabled={isLoading || !canSubmit}
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Creating your portal...
                  </>
                ) : (
                  <>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-zuru-sunset hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-zuru-sunset hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
