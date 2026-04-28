"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import { ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = createClient()
    
    console.log("[v0] Attempting login for:", email)
    
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("[v0] Auth response:", { user: data?.user?.id, session: !!data?.session, error: authError?.message })

    if (authError) {
      console.log("[v0] Auth error:", authError.message)
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (!data.session) {
      console.log("[v0] No session returned despite no error")
      setError("Login failed - no session created. Please try again.")
      setIsLoading(false)
      return
    }

    console.log("[v0] Session created, fetching tenant for user:", data.user.id)

    // Get user's tenant
    const { data: tenantUser, error: tenantError } = await supabase
      .from("tenant_users")
      .select("tenant_id, tenants(slug)")
      .eq("user_id", data.user.id)
      .single()

    console.log("[v0] Tenant lookup:", { tenantUser, error: tenantError?.message })

    if (tenantUser?.tenants) {
      console.log("[v0] Redirecting to /admin")
      // Redirect to tenant admin dashboard using window.location for full page reload
      // This ensures cookies are properly set before navigating
      window.location.href = "/admin"
    } else {
      console.log("[v0] No tenant found, redirecting to /")
      window.location.href = "/"
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-zuru-sand-dark/30">
        <CardHeader className="text-center">
          <Link href="/" className="mb-4 inline-block">
            <Image
              src="/zuru-logo-dark.svg"
              alt="Zuru"
              width={120}
              height={40}
              className="mx-auto h-8 w-auto"
            />
          </Link>
          <CardTitle className="text-zuru-ink">Welcome back</CardTitle>
          <CardDescription>
            Log in to your Zuru account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-zuru-sunset hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-zuru-sunset hover:underline">
                Start free trial
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
