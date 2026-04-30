"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") ?? ""

  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)

  async function handleResend() {
    if (!email) return

    setIsResending(true)
    setResendError(null)
    setResendSuccess(false)

    const supabase = createClient()
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo:
          `${window.location.origin}/auth/callback`,
      },
    })

    setIsResending(false)

    if (error) {
      setResendError(error.message)
    } else {
      setResendSuccess(true)
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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zuru-sunset/10">
            <Mail className="h-7 w-7 text-zuru-sunset" />
          </div>
          <CardTitle className="text-zuru-ink">Check your inbox</CardTitle>
          <CardDescription>
            {email ? (
              <>
                We sent a verification link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Click the link to activate your account.
              </>
            ) : (
              "Click the verification link we emailed you to activate your account."
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {resendSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Verification email resent. Check your inbox (and spam folder).
              </AlertDescription>
            </Alert>
          )}

          {resendError && (
            <Alert variant="destructive">
              <AlertDescription>{resendError}</AlertDescription>
            </Alert>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder, or:
          </p>

          <Button
            onClick={handleResend}
            variant="outline"
            className="w-full"
            disabled={isResending || !email}
          >
            {isResending ? (
              <>
                <Spinner className="mr-2" />
                Sending...
              </>
            ) : (
              "Resend verification email"
            )}
          </Button>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Link href="/login" className="block">
            <Button
              variant="ghost"
              className="w-full text-zuru-sunset hover:text-zuru-sunset-dark"
            >
              Back to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
