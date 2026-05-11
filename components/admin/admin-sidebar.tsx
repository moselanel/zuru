"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Building,
  MapPin,
  Compass,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  PieChart,
  TrendingUp,
  Activity,
  Megaphone,
  Smile,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MTPALogo } from "@/components/mtpa-logo"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "Dashboards",
    href: "/admin/dashboards",
    icon: PieChart,
    children: [
      { name: "Executive Overview", href: "/admin/dashboards/executive" },
      { name: "Finance & Audit", href: "/admin/dashboards/finance" },
      { name: "Operations", href: "/admin/dashboards/operations" },
      { name: "Marketing", href: "/admin/dashboards/marketing" },
      { name: "Visitor Experience", href: "/admin/dashboards/experience" },
      { name: "Community Impact", href: "/admin/dashboards/community" },
    ],
  },
  {
    name: "Reservations",
    href: "/admin/reservations",
    icon: Calendar,
    children: [
      { name: "All Bookings", href: "/admin/reservations" },
      { name: "Check-ins Today", href: "/admin/reservations/checkins" },
      { name: "Check-outs Today", href: "/admin/reservations/checkouts" },
      { name: "Calendar View", href: "/admin/reservations/calendar" },
    ],
  },
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: Building,
    children: [
      { name: "Accommodations", href: "/admin/inventory/accommodations" },
      { name: "Experiences", href: "/admin/inventory/experiences" },
      { name: "Rate Plans", href: "/admin/inventory/rates" },
    ],
  },
  { name: "Reserves", href: "/admin/reserves", icon: MapPin },
  { name: "Experiences", href: "/admin/experiences", icon: Compass },
  { name: "Guests", href: "/admin/guests", icon: Users },
  { name: "Point of Sale", href: "/admin/pos", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Reservations"])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-6 border-b">
        <MTPALogo size="md" />
        <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expandedItems.includes(item.name)

          return (
            <div key={item.name}>
              {hasChildren ? (
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1 font-medium">{item.name}</span>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}

              {hasChildren && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        pathname === child.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Help */}
      <div className="p-4 border-t">
        <Link
          href="/admin/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-card border rounded-lg shadow-lg"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r flex flex-col">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex-col bg-card border-r">
        <SidebarContent />
      </div>
    </>
  )
}
