import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Building2, Palette, Globe, Bell, CreditCard, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Settings | Zuru Admin",
}

const settingsLinks = [
  {
    title: "General",
    description: "Organization name, contact details, and basic info",
    href: "/admin/settings/general",
    icon: Building2,
  },
  {
    title: "Branding",
    description: "Logo, colors, and visual identity for your portal",
    href: "/admin/settings/branding",
    icon: Palette,
  },
  {
    title: "Domain",
    description: "Custom domain settings for your portal",
    href: "/admin/settings/domain",
    icon: Globe,
    badge: "Pro",
  },
  {
    title: "Notifications",
    description: "Email alerts and notification preferences",
    href: "/admin/settings/notifications",
    icon: Bell,
  },
  {
    title: "Billing",
    description: "Subscription plan and payment information",
    href: "/admin/settings/billing",
    icon: CreditCard,
  },
]

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select(`
      role,
      tenant:tenants(
        id,
        name,
        slug,
        subscription_tier
      )
    `)
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  
  const tenant = tenantUser.tenant as {
    id: string
    name: string
    slug: string
    subscription_tier: string
  }
  const isOwnerOrAdmin = tenantUser.role === "owner" || tenantUser.role === "admin"

  if (!isOwnerOrAdmin) {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your organization settings and preferences.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {settingsLinks.map((link) => {
          const isPro = link.badge === "Pro" && tenant.subscription_tier === "tembea"
          
          return (
            <Link
              key={link.href}
              href={isPro ? "#" : link.href}
              className={isPro ? "cursor-not-allowed" : ""}
            >
              <Card className={`transition-shadow ${isPro ? "opacity-60" : "hover:shadow-md"}`}>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{link.title}</CardTitle>
                      {link.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">{link.description}</CardDescription>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are on the {tenant.subscription_tier} plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-zuru-sunset text-white capitalize">
                {tenant.subscription_tier}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {tenant.subscription_tier === "tembea" && "Free tier - Basic features"}
                {tenant.subscription_tier === "safari" && "Growth tier - Advanced features"}
                {tenant.subscription_tier === "enterprise" && "Enterprise - Full features + support"}
              </span>
            </div>
            {tenant.subscription_tier !== "enterprise" && (
              <Link
                href="/admin/settings/billing"
                className="text-sm font-medium text-zuru-sunset hover:underline"
              >
                Upgrade Plan
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
