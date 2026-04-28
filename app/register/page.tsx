import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata = {
  title: "Create Account | MTPA",
  description: "Create your MTPA account to book experiences and manage your trips.",
}

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 pb-16 bg-muted/30 min-h-screen flex items-center justify-center">
        <RegisterForm />
      </main>
      <SiteFooter />
    </>
  )
}
