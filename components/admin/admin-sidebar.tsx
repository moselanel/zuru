"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Building2,
  Ticket,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Globe,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Tenant {
  id: string
  name: string
  slug: string
  logo_url: string | null
  subscription_tier: string
}

interface AdminSidebarProps {
  tenant: Tenant
  userRole: string
}

const contentNavigation = [
  { name: "Destinations", href: "/admin/destinations", icon: MapPin },
  { name: "Experiences", href: "/admin/experiences", icon: Compass },
  { name: "Accommodations", href: "/admin/accommodations", icon: Building2 },
  { name: "Attractions", href: "/admin/attractions", icon: Ticket },
]

const managementNavigation = [
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Team", href: "/admin/team", icon: Users, adminOnly: true },
]

const settingsNavigation = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Branding", href: "/admin/settings/branding", icon: Palette },
  { name: "Domain", href: "/admin/settings/domain", icon: Globe },
]

export function AdminSidebar({ tenant, userRole }: AdminSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const canManageTeam = userRole === "owner" || userRole === "admin"
  const canManageSettings = userRole === "owner" || userRole === "admin"
  const hasAnalytics = tenant.subscription_tier !== "tembea"

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 border-b px-4 py-6">
        {tenant.logo_url ? (
          <Image
            src={tenant.logo_url}
            alt={tenant.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-contain"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zuru-sunset text-white font-semibold">
            {tenant.name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{tenant.name}</span>
          <span className="text-xs capitalize text-muted-foreground">{tenant.subscription_tier} plan</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {/* Dashboard */}
        <div>
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
              pathname === "/admin"
                ? "bg-zuru-sunset text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            onClick={() => setMobileOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5 shrink-0" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>

        {/* Content */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Content
          </p>
          <div className="space-y-1">
            {contentNavigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                    isActive
                      ? "bg-zuru-sunset text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Management */}
        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Management
          </p>
          <div className="space-y-1">
            {managementNavigation.map((item) => {
              if (item.adminOnly && !canManageTeam) return null
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                    isActive
                      ? "bg-zuru-sunset text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
            {hasAnalytics && (
              <Link
                href="/admin/analytics"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                  pathname === "/admin/analytics"
                    ? "bg-zuru-sunset text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <BarChart3 className="h-5 w-5 shrink-0" />
                <span className="font-medium">Analytics</span>
              </Link>
            )}
          </div>
        </div>

        {/* Settings */}
        {canManageSettings && (
          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Settings
            </p>
            <div className="space-y-1">
              {settingsNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                      isActive
                        ? "bg-zuru-sunset text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <Link
          href={`https://${tenant.slug}.zuru.africa`}
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Globe className="h-5 w-5" />
          <span className="font-medium">View Live Portal</span>
        </Link>
        <Link
          href="/admin/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="font-medium">Help & Support</span>
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-card p-2 shadow-lg lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 top-0 flex w-64 flex-col border-r bg-card">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r bg-card">
        <SidebarContent />
      </div>
    </>
  )
}
