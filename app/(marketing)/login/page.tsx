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

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (!data.session) {
      setError("Login failed — please try again.")
      setIsLoading(false)
      return
    }

    // Check email verification before proceeding
    if (!data.user.email_confirmed_at) {
      window.location.href = `/verify-email?email=${encodeURIComponent(email)}`
      return
    }

    // Get user's tenant and redirect accordingly
    const { data: tenantUser } = await supabase
      .from("tenant_users")
      .select("tenant_id, tenants(slug)")
      .eq("user_id", data.user.id)
      .single()

    if (tenantUser?.tenants) {
      window.location.href = "/admin"
    } else {
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
