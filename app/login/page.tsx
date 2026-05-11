import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Sign In | MTPA",
  description: "Sign in to your MTPA account to manage bookings and preferences.",
}

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 pb-16 bg-muted/30 min-h-screen flex items-center justify-center">
        <LoginForm />
      </main>
      <SiteFooter />
    </>
  )
}
