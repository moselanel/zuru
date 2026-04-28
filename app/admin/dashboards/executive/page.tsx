"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  KPICard,
  DashboardFilters,
  AlertCard,
  TopList,
  TrendChart,
  DashboardSection,
  type FilterConfig,
} from "@/components/admin/dashboards/dashboard-components"
import {
  TrendingUp,
  Users,
  CreditCard,
  Calendar,
  Globe,
  Home,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"

// Mock data - In production, this would come from your data sources
const parks = [
  { id: "blyde", name: "Blyde River Canyon" },
  { id: "kruger", name: "Kruger National Park" },
  { id: "songimvelo", name: "Songimvelo Game Reserve" },
  { id: "loskop", name: "Loskop Dam Nature Reserve" },
]

const channels = [
  { id: "website", name: "Website" },
  { id: "booking_com", name: "Booking.com" },
  { id: "airbnb", name: "Airbnb" },
  { id: "direct", name: "Direct/Phone" },
  { id: "agent", name: "Travel Agent" },
]

export default function ExecutiveDashboard() {
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  })

  // Mock KPI data
  const kpiData = {
    totalRevenue: 4850000,
    revenueChange: 12.5,
    totalBookings: 2847,
    bookingsChange: 8.3,
    conversionRate: 3.2,
    conversionChange: 0.4,
    avgBookingValue: 1703,
    avgBookingChange: 4.1,
    occupancyRate: 78,
    occupancyChange: -2.1,
    activeGuests: 1284,
    systemUptime: 99.7,
  }

  // Mock alerts
  const alerts = [
    {
      severity: "warning" as const,
      message: "Kruger Gate capacity at 92% for peak weekend",
      timestamp: "2 hours ago",
    },
    {
      severity: "info" as const,
      message: "Monthly revenue target 85% achieved",
      timestamp: "5 hours ago",
    },
  ]

  // Mock top parks data
  const topParks = [
    { name: "Blyde River Canyon", value: 1250000, change: 15 },
    { name: "Kruger Gate Camps", value: 980000, change: 8 },
    { name: "Songimvelo Reserve", value: 720000, change: 22 },
    { name: "Loskop Dam", value: 540000, change: -3 },
    { name: "Barberton Reserve", value: 380000, change: 12 },
  ]

  // Mock product performance
  const topProducts = [
    { name: "Safari Experience", value: 842, change: 18 },
    { name: "Canyon Lodge Stay", value: 654, change: 12 },
    { name: "Treehouse Suite", value: 423, change: 25 },
    { name: "Bush Camp", value: 312, change: 5 },
    { name: "Boat Cruise", value: 287, change: -2 },
  ]

  // Mock monthly trend
  const monthlyTrend = [
    { label: "Aug", value: 3200000 },
    { label: "Sep", value: 3800000 },
    { label: "Oct", value: 4100000 },
    { label: "Nov", value: 4500000 },
    { label: "Dec", value: 5200000 },
    { label: "Jan", value: 4850000 },
  ]

  // Mock visitor mix
  const visitorMix = {
    domestic: 68,
    international: 32,
    topMarkets: [
      { name: "Gauteng", value: 42 },
      { name: "Western Cape", value: 18 },
      { name: "Germany", value: 12 },
      { name: "UK", value: 8 },
      { name: "Netherlands", value: 6 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Executive Overview</h1>
          <p className="text-muted-foreground">
            Top level tourism performance, revenue, and operational health
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          <Activity className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFiltersChange={setFilters}
        parks={parks}
        channels={channels}
      />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value={kpiData.totalRevenue}
          change={kpiData.revenueChange}
          changeLabel="vs last period"
          trend="up"
          icon={<CreditCard className="h-5 w-5" />}
          format="currency"
          description="Total revenue from all channels including bookings, experiences, and POS"
        />
        <KPICard
          title="Total Bookings"
          value={kpiData.totalBookings}
          change={kpiData.bookingsChange}
          changeLabel="vs last period"
          trend="up"
          icon={<Calendar className="h-5 w-5" />}
          description="Confirmed bookings across all properties and experiences"
        />
        <KPICard
          title="Conversion Rate"
          value={kpiData.conversionRate}
          change={kpiData.conversionChange}
          changeLabel="vs last period"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          format="percentage"
          description="Percentage of website visitors who complete a booking"
        />
        <KPICard
          title="Avg. Booking Value"
          value={kpiData.avgBookingValue}
          change={kpiData.avgBookingChange}
          changeLabel="vs last period"
          trend="up"
          icon={<CreditCard className="h-5 w-5" />}
          format="currency"
          description="Average revenue per booking"
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Occupancy Rate"
          value={kpiData.occupancyRate}
          change={kpiData.occupancyChange}
          trend="down"
          icon={<Home className="h-5 w-5" />}
          format="percentage"
          description="Average occupancy across all accommodation"
        />
        <KPICard
          title="Active Guests"
          value={kpiData.activeGuests}
          icon={<Users className="h-5 w-5" />}
          description="Currently checked-in guests across all properties"
        />
        <KPICard
          title="System Uptime"
          value={kpiData.systemUptime}
          icon={<CheckCircle2 className="h-5 w-5" />}
          format="percentage"
          description="Booking system availability this month"
        />
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-foreground/80">International Mix</p>
                <p className="font-serif text-2xl font-bold">{visitorMix.international}%</p>
                <p className="text-sm text-primary-foreground/70 mt-1">
                  {visitorMix.domestic}% domestic visitors
                </p>
              </div>
              <Globe className="h-8 w-8 text-primary-foreground/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <AlertCard alerts={alerts} />

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart
            title="Revenue Trend"
            description="Monthly revenue over the last 6 months"
            data={monthlyTrend}
          />
        </div>
        <TopList title="Top Parks by Revenue" items={topParks} valueLabel="Revenue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopList title="Top Products by Bookings" items={topProducts} valueLabel="Bookings" />

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Visitor Source Markets</CardTitle>
            <CardDescription>Top markets by booking volume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {visitorMix.topMarkets.map((market, index) => (
              <div key={market.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">{market.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${market.value * 2}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{market.value}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Peak vs Off-Peak Analysis */}
      <DashboardSection title="Demand Patterns" description="Peak vs off-peak booking analysis">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peak Season</p>
                  <p className="font-serif text-xl font-bold">R3.2M</p>
                  <p className="text-xs text-muted-foreground">Dec - Jan</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Off-Peak Season</p>
                  <p className="font-serif text-xl font-bold">R1.65M</p>
                  <p className="text-xs text-muted-foreground">May - Aug</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekend Premium</p>
                  <p className="font-serif text-xl font-bold">+24%</p>
                  <p className="text-xs text-muted-foreground">vs weekday avg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>

      {/* Key Risks */}
      <DashboardSection title="Key Risks & Opportunities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-amber-200 dark:border-amber-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Risks to Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                <p>Kruger Gate approaching capacity limits for Easter weekend</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                <p>International bookings down 5% from Germany market</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                <p>Payment gateway maintenance scheduled for Feb 15</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <p>Treehouse Suite showing 25% growth - consider expansion</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <p>Safari experience conversion up - increase marketing spend</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <p>UK market growing 15% - opportunity for targeted campaign</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardSection>
    </div>
  )
}
