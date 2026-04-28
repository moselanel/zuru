import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  CreditCard,
  Activity,
  Megaphone,
  Smile,
  Heart,
  ArrowRight,
  BarChart3,
  Shield,
  Users,
  Globe,
  MapPin,
} from "lucide-react"

const dashboards = [
  {
    title: "Executive Overview",
    description: "Top level tourism performance, revenue, conversion, and operational health",
    href: "/admin/dashboards/executive",
    icon: TrendingUp,
    color: "bg-blue-500",
    users: ["CEO", "Board", "Directors"],
    cadence: "Daily/Weekly",
    metrics: ["Total Revenue", "Bookings", "Conversion Rate", "Occupancy"],
  },
  {
    title: "Finance & Audit Readiness",
    description: "Revenue integrity, reconciliation, and audit compliance tracking",
    href: "/admin/dashboards/finance",
    icon: CreditCard,
    color: "bg-green-500",
    users: ["CFO", "Finance Team", "Auditors"],
    cadence: "Daily",
    metrics: ["Online vs POS Revenue", "Settlement Status", "Reconciliation", "Audit Trail"],
  },
  {
    title: "Operations & Park Management",
    description: "Real-time visitation, capacity, and operational insights",
    href: "/admin/dashboards/operations",
    icon: Activity,
    color: "bg-amber-500",
    users: ["Operations Manager", "Park Managers"],
    cadence: "Real-time",
    metrics: ["Visitor Count", "Capacity", "Access Control", "Incidents"],
  },
  {
    title: "Marketing & Conversion",
    description: "Demand generation, campaign ROI, and conversion optimization",
    href: "/admin/dashboards/marketing",
    icon: Megaphone,
    color: "bg-purple-500",
    users: ["Marketing Team", "Digital Manager"],
    cadence: "Weekly",
    metrics: ["Traffic Sources", "Campaign ROAS", "Funnel Analysis", "Search Terms"],
  },
  {
    title: "Visitor Experience",
    description: "Usability insights, support operations, and visitor satisfaction",
    href: "/admin/dashboards/experience",
    icon: Smile,
    color: "bg-pink-500",
    users: ["Customer Service", "UX Team"],
    cadence: "Weekly",
    metrics: ["Search Success", "NPS Score", "Support Tickets", "Friction Points"],
  },
  {
    title: "Community Impact",
    description: "Guide participation, community offerings, and economic impact",
    href: "/admin/dashboards/community",
    icon: Heart,
    color: "bg-red-500",
    users: ["Community Manager", "Stakeholders"],
    cadence: "Monthly",
    metrics: ["Registered Guides", "Community Revenue", "Training", "Geographic Spread"],
  },
]

export default function DashboardsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold">Analytics Dashboards</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights for tourism growth, revenue, operations, and community impact
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dashboard) => (
          <Link key={dashboard.href} href={dashboard.href}>
            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 ${dashboard.color} rounded-xl flex items-center justify-center text-white`}
                  >
                    <dashboard.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="font-serif mt-4">{dashboard.title}</CardTitle>
                <CardDescription>{dashboard.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">KEY METRICS</p>
                    <div className="flex flex-wrap gap-1">
                      {dashboard.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {dashboard.users.join(", ")}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {dashboard.cadence}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Data Sources & Governance */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Sources & Governance
          </CardTitle>
          <CardDescription>
            All dashboards are built with privacy-safe aggregated views and audit traceability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Website Analytics", icon: Globe, status: "Connected" },
              { name: "Booking System", icon: BarChart3, status: "Connected" },
              { name: "Payment Gateway", icon: CreditCard, status: "Connected" },
              { name: "Access Control", icon: MapPin, status: "Connected" },
            ].map((source) => (
              <div key={source.name} className="flex items-center gap-3 p-3 border rounded-lg">
                <source.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{source.name}</p>
                  <p className="text-xs text-green-600">{source.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
