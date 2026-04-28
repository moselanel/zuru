import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AccountDashboard } from "@/components/account/account-dashboard"

export const metadata = {
  title: "My Account | MTPA",
  description: "Manage your bookings, profile, and preferences.",
}

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 pb-16 bg-muted/30 min-h-screen">
        <AccountDashboard />
      </main>
      <SiteFooter />
    </>
  )
}
