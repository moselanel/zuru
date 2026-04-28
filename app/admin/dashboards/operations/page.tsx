"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Car,
  Ticket,
  CalendarDays,
  Gauge,
  Activity,
  Sun,
  Moon,
  Sunrise,
} from "lucide-react"

// Mock data
const parks = [
  { id: "blyde", name: "Blyde River Canyon" },
  { id: "kruger", name: "Kruger Gate Camps" },
  { id: "songimvelo", name: "Songimvelo Game Reserve" },
  { id: "loskop", name: "Loskop Dam Nature Reserve" },
]

export default function OperationsDashboard() {
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date(),
    },
  })

  // Mock KPI data
  const kpiData = {
    totalVisitors: 4287,
    visitorsChange: 8.5,
    currentOccupancy: 78,
    peakCapacity: 92,
    avgStayDuration: 2.4,
    accessScans: 3842,
    vehiclesEntered: 1247,
  }

  // Mock alerts
  const alerts = [
    {
      severity: "warning" as const,
      message: "Kruger Gate reaching 90% capacity - consider traffic management",
      timestamp: "30 minutes ago",
    },
    {
      severity: "info" as const,
      message: "Road maintenance scheduled for Blyde access road tomorrow 6AM-8AM",
      timestamp: "2 hours ago",
    },
  ]

  // Park capacity data
  const parkCapacity = [
    {
      name: "Blyde River Canyon",
      current: 342,
      capacity: 500,
      percentage: 68,
      trend: "stable",
      vehicles: 124,
    },
    {
      name: "Kruger Gate Camps",
      current: 460,
      capacity: 500,
      percentage: 92,
      trend: "increasing",
      vehicles: 187,
    },
    {
      name: "Songimvelo Reserve",
      current: 89,
      capacity: 200,
      percentage: 45,
      trend: "decreasing",
      vehicles: 34,
    },
    {
      name: "Loskop Dam",
      current: 156,
      capacity: 300,
      percentage: 52,
      trend: "stable",
      vehicles: 67,
    },
  ]

  // Hourly visitation pattern
  const hourlyPattern = [
    { label: "6AM", value: 120 },
    { label: "8AM", value: 380 },
    { label: "10AM", value: 520 },
    { label: "12PM", value: 450 },
    { label: "2PM", value: 380 },
    { label: "4PM", value: 420 },
    { label: "6PM", value: 280 },
  ]

  // Top products by usage
  const topProducts = [
    { name: "Day Visit Pass", value: 2150, change: 12 },
    { name: "Safari Drive", value: 487, change: 18 },
    { name: "Accommodation Stay", value: 342, change: 5 },
    { name: "Boat Cruise", value: 198, change: -3 },
    { name: "Guided Walk", value: 156, change: 22 },
  ]

  // Operational incidents
  const incidents = [
    {
      id: "INC-001",
      type: "Infrastructure",
      description: "Gate barrier malfunction at Kruger entrance",
      park: "Kruger Gate",
      status: "resolved",
      resolvedAt: "2 hours ago",
      impact: "15 min delay",
    },
    {
      id: "INC-002",
      type: "Weather",
      description: "Flash flood warning for river crossing",
      park: "Blyde River",
      status: "active",
      impact: "Route closed",
    },
    {
      id: "INC-003",
      type: "System",
      description: "POS terminal offline at Songimvelo gate",
      park: "Songimvelo",
      status: "investigating",
      impact: "Manual processing",
    },
  ]

  // Service continuity metrics
  const serviceMetrics = [
    { name: "Gate Systems", uptime: 99.2, status: "operational" },
    { name: "Booking Platform", uptime: 99.8, status: "operational" },
    { name: "POS Systems", uptime: 97.5, status: "degraded" },
    { name: "Access Control", uptime: 99.9, status: "operational" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Operations & Park Management</h1>
          <p className="text-muted-foreground">
            Real-time visitation, capacity, and operational insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4 text-green-500 animate-pulse" />
            Live monitoring
          </div>
        </div>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFiltersChange={setFilters}
        parks={parks}
        showChannelFilter={false}
      />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Visitors Today"
          value={kpiData.totalVisitors}
          change={kpiData.visitorsChange}
          changeLabel="vs last week"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Unique visitors across all parks"
        />
        <KPICard
          title="Current Occupancy"
          value={kpiData.currentOccupancy}
          icon={<Gauge className="h-5 w-5" />}
          format="percentage"
          description="Average occupancy across all accommodation"
        />
        <KPICard
          title="Access Scans"
          value={kpiData.accessScans}
          icon={<Ticket className="h-5 w-5" />}
          description="Gate entries and exits today"
        />
        <KPICard
          title="Vehicles Entered"
          value={kpiData.vehiclesEntered}
          icon={<Car className="h-5 w-5" />}
          description="Vehicle count today"
        />
      </div>

      {/* Alerts */}
      <AlertCard alerts={alerts} />

      {/* Park Capacity Overview */}
      <DashboardSection
        title="Park Capacity"
        description="Real-time visitor counts and capacity utilization"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parkCapacity.map((park) => (
            <Card key={park.name}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{park.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {park.current} / {park.capacity} visitors
                    </p>
                  </div>
                  <Badge
                    variant={
                      park.percentage >= 90
                        ? "destructive"
                        : park.percentage >= 70
                          ? "secondary"
                          : "default"
                    }
                  >
                    {park.percentage}%
                  </Badge>
                </div>
                <Progress
                  value={park.percentage}
                  className={
                    park.percentage >= 90
                      ? "[&>div]:bg-red-500"
                      : park.percentage >= 70
                        ? "[&>div]:bg-amber-500"
                        : ""
                  }
                />
                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Car className="h-3 w-3" />
                    {park.vehicles} vehicles
                  </div>
                  <div className="flex items-center gap-1">
                    {park.trend === "increasing" ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-amber-500" />
                        <span className="text-amber-500">Increasing</span>
                      </>
                    ) : park.trend === "decreasing" ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                        <span className="text-green-500">Decreasing</span>
                      </>
                    ) : (
                      <>
                        <Activity className="h-3 w-3" />
                        <span>Stable</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Visitation Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart
            title="Hourly Visitation Pattern"
            description="Visitor arrivals throughout the day"
            data={hourlyPattern}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Busiest Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
                <Sunrise className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Morning Peak</p>
                <p className="text-sm text-muted-foreground">8:00 AM - 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                <Sun className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Afternoon Rush</p>
                <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <Moon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Quiet Period</p>
                <p className="text-sm text-muted-foreground">12:00 PM - 2:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopList title="Product Usage Today" items={topProducts} valueLabel="Usage" />

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Access Usage by Park</CardTitle>
            <CardDescription>Gate scans and entry patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Blyde River Canyon", entries: 1240, exits: 1180, active: 60 },
              { name: "Kruger Gate Camps", entries: 1580, exits: 1120, active: 460 },
              { name: "Songimvelo Reserve", entries: 520, exits: 431, active: 89 },
              { name: "Loskop Dam", entries: 502, exits: 346, active: 156 },
            ].map((park) => (
              <div key={park.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{park.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {park.entries} in / {park.exits} out
                  </p>
                </div>
                <Badge variant="outline">{park.active} active</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Operational Incidents */}
      <DashboardSection
        title="Operational Incidents"
        description="Issues affecting revenue collection and service"
      >
        <div className="space-y-4">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              className={
                incident.status === "active"
                  ? "border-red-200 dark:border-red-900"
                  : incident.status === "investigating"
                    ? "border-amber-200 dark:border-amber-900"
                    : ""
              }
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        incident.status === "active"
                          ? "bg-red-100 dark:bg-red-900/50"
                          : incident.status === "investigating"
                            ? "bg-amber-100 dark:bg-amber-900/50"
                            : "bg-green-100 dark:bg-green-900/50"
                      }`}
                    >
                      {incident.status === "resolved" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle
                          className={`h-4 w-4 ${incident.status === "active" ? "text-red-600" : "text-amber-600"}`}
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {incident.id}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {incident.type}
                        </Badge>
                      </div>
                      <p className="font-medium mt-1">{incident.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {incident.park}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        incident.status === "active"
                          ? "destructive"
                          : incident.status === "investigating"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {incident.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Impact: {incident.impact}
                    </p>
                    {incident.resolvedAt && (
                      <p className="text-xs text-green-600 mt-1">Resolved {incident.resolvedAt}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Service Continuity */}
      <DashboardSection title="Service Continuity" description="System health and uptime monitoring">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceMetrics.map((service) => (
            <Card key={service.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{service.name}</span>
                  <Badge
                    variant={service.status === "operational" ? "default" : "secondary"}
                    className={
                      service.status === "operational" ? "bg-green-600" : "bg-amber-600"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{service.uptime}%</span>
                  <span className="text-sm text-muted-foreground">uptime</span>
                </div>
                <Progress
                  value={service.uptime}
                  className="mt-2 h-1.5"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </div>
  )
}
