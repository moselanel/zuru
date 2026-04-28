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
  ReconciliationTable,
  AuditTrailTable,
  TopList,
  DashboardSection,
  type FilterConfig,
  type ReconciliationRow,
  type AuditTrailRow,
} from "@/components/admin/dashboards/dashboard-components"
import {
  CreditCard,
  Building2,
  RefreshCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Download,
  Scale,
  Receipt,
  ArrowRightLeft,
  Shield,
} from "lucide-react"

// Mock data
const parks = [
  { id: "blyde", name: "Blyde River Canyon" },
  { id: "kruger", name: "Kruger National Park" },
  { id: "songimvelo", name: "Songimvelo Game Reserve" },
  { id: "loskop", name: "Loskop Dam Nature Reserve" },
]

const channels = [
  { id: "website", name: "Website" },
  { id: "pos", name: "Point of Sale" },
  { id: "booking_com", name: "Booking.com" },
  { id: "airbnb", name: "Airbnb" },
]

export default function FinanceDashboard() {
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  })

  // Mock KPI data
  const kpiData = {
    onlineRevenue: 3250000,
    posRevenue: 1600000,
    pendingSettlement: 245000,
    settledAmount: 4605000,
    refunds: 48500,
    refundRate: 1.0,
    chargebacks: 12400,
    chargebackRate: 0.26,
    reconciled: 96.8,
    exceptions: 23,
  }

  // Mock alerts
  const alerts = [
    {
      severity: "critical" as const,
      message: "3 payment settlements overdue by 48+ hours",
      timestamp: "1 hour ago",
    },
    {
      severity: "warning" as const,
      message: "Price change pending approval: Canyon Lodge peak rate",
      timestamp: "3 hours ago",
    },
    {
      severity: "info" as const,
      message: "Monthly reconciliation report ready for review",
      timestamp: "5 hours ago",
    },
  ]

  // Mock reconciliation data
  const reconciliationRows: ReconciliationRow[] = [
    {
      id: "1",
      date: "2026-02-03",
      bookingRef: "MTPA-2026-78294",
      channel: "Website",
      bookingAmount: 7550,
      paymentAmount: 7550,
      accessUsage: "Completed",
      status: "matched",
    },
    {
      id: "2",
      date: "2026-02-03",
      bookingRef: "MTPA-2026-78295",
      channel: "Booking.com",
      bookingAmount: 13500,
      paymentAmount: 13500,
      accessUsage: "Checked In",
      status: "matched",
    },
    {
      id: "3",
      date: "2026-02-02",
      bookingRef: "MTPA-2026-78290",
      channel: "Website",
      bookingAmount: 4200,
      paymentAmount: 4200,
      accessUsage: "No Show",
      status: "exception",
      notes: "Payment received but guest did not arrive",
    },
    {
      id: "4",
      date: "2026-02-02",
      bookingRef: "MTPA-2026-78288",
      channel: "POS",
      bookingAmount: 1900,
      paymentAmount: 1850,
      accessUsage: "Completed",
      status: "mismatch",
      notes: "R50 discount applied at POS not recorded",
    },
    {
      id: "5",
      date: "2026-02-01",
      bookingRef: "MTPA-2026-78280",
      channel: "Airbnb",
      bookingAmount: 8400,
      paymentAmount: 0,
      accessUsage: "Pending",
      status: "pending",
      notes: "Awaiting OTA settlement",
    },
  ]

  // Mock audit trail data
  const auditTrailRows: AuditTrailRow[] = [
    {
      id: "1",
      timestamp: "2026-02-04 09:15:23",
      user: "Thandi M.",
      action: "UPDATE",
      entity: "Pricing",
      entityId: "PRC-001",
      oldValue: "R1,800",
      newValue: "R2,100",
      ipAddress: "192.168.1.45",
    },
    {
      id: "2",
      timestamp: "2026-02-04 08:42:11",
      user: "System",
      action: "REFUND",
      entity: "Booking",
      entityId: "MTPA-78291",
      oldValue: "R4,500",
      newValue: "R0",
      ipAddress: "-",
    },
    {
      id: "3",
      timestamp: "2026-02-03 16:30:45",
      user: "Johan V.",
      action: "APPROVE",
      entity: "Discount",
      entityId: "DSC-042",
      oldValue: "Pending",
      newValue: "Approved",
      ipAddress: "192.168.1.22",
    },
    {
      id: "4",
      timestamp: "2026-02-03 14:22:18",
      user: "Sarah K.",
      action: "CREATE",
      entity: "Booking",
      entityId: "MTPA-78295",
      ipAddress: "192.168.1.33",
    },
  ]

  // Mock channel revenue breakdown
  const channelRevenue = [
    { name: "Website Direct", value: 2450000, change: 15 },
    { name: "Point of Sale", value: 1600000, change: 8 },
    { name: "Booking.com", value: 520000, change: 22 },
    { name: "Airbnb", value: 180000, change: 12 },
    { name: "Travel Agents", value: 100000, change: -5 },
  ]

  // Settlement status
  const settlementStatus = [
    { gateway: "Stripe", pending: 145000, settled: 2800000, status: "healthy" },
    { gateway: "PayFast", pending: 85000, settled: 1200000, status: "healthy" },
    { gateway: "OTA Payments", pending: 15000, settled: 605000, status: "delayed" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Finance & Audit Readiness</h1>
          <p className="text-muted-foreground">
            Revenue integrity, reconciliation, and audit compliance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Audit Report
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFiltersChange={setFilters}
        parks={parks}
        channels={channels}
      />

      {/* Revenue KPIs */}
      <DashboardSection title="Revenue Overview" description="Online and POS revenue breakdown">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Online Revenue"
            value={kpiData.onlineRevenue}
            icon={<CreditCard className="h-5 w-5" />}
            format="currency"
            description="Revenue from website, OTAs, and online channels"
          />
          <KPICard
            title="POS Revenue"
            value={kpiData.posRevenue}
            icon={<Building2 className="h-5 w-5" />}
            format="currency"
            description="Point of sale transactions at parks"
          />
          <KPICard
            title="Pending Settlement"
            value={kpiData.pendingSettlement}
            icon={<Clock className="h-5 w-5" />}
            format="currency"
            description="Payments awaiting gateway settlement"
          />
          <KPICard
            title="Total Settled"
            value={kpiData.settledAmount}
            icon={<CheckCircle2 className="h-5 w-5" />}
            format="currency"
            description="Confirmed settled payments this period"
          />
        </div>
      </DashboardSection>

      {/* Alerts */}
      <AlertCard alerts={alerts} />

      {/* Settlement Status */}
      <DashboardSection title="Payment Gateway Status" description="Real-time settlement tracking">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {settlementStatus.map((gateway) => (
            <Card key={gateway.gateway}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{gateway.gateway}</h3>
                  <Badge variant={gateway.status === "healthy" ? "default" : "destructive"}>
                    {gateway.status === "healthy" ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {gateway.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">R{gateway.pending.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Settled</span>
                    <span className="font-medium text-green-600">
                      R{gateway.settled.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>

      {/* Refunds and Chargebacks */}
      <DashboardSection
        title="Refunds & Chargebacks"
        description="Monitor refund rates and dispute management"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Refunds"
            value={kpiData.refunds}
            icon={<RefreshCcw className="h-5 w-5" />}
            format="currency"
            description="Refunds processed this period"
          />
          <KPICard
            title="Refund Rate"
            value={kpiData.refundRate}
            icon={<RefreshCcw className="h-5 w-5" />}
            format="percentage"
            description="Percentage of bookings refunded"
          />
          <KPICard
            title="Chargebacks"
            value={kpiData.chargebacks}
            icon={<XCircle className="h-5 w-5" />}
            format="currency"
            description="Disputed transactions this period"
          />
          <KPICard
            title="Chargeback Rate"
            value={kpiData.chargebackRate}
            icon={<AlertTriangle className="h-5 w-5" />}
            format="percentage"
            description="Percentage of transactions disputed"
          />
        </div>
      </DashboardSection>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="reconciliation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reconciliation" className="gap-2">
            <Scale className="h-4 w-4" />
            Reconciliation
          </TabsTrigger>
          <TabsTrigger value="exceptions" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Exceptions ({kpiData.exceptions})
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <Shield className="h-4 w-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <Receipt className="h-4 w-4" />
            Pricing Changes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reconciliation">
          <div className="space-y-4">
            {/* Reconciliation Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
                <CardContent className="p-4 flex items-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      {kpiData.reconciled}%
                    </p>
                    <p className="text-sm text-green-600">Fully Reconciled</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                <CardContent className="p-4 flex items-center gap-4">
                  <Clock className="h-8 w-8 text-amber-600" />
                  <div>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">18</p>
                    <p className="text-sm text-amber-600">Pending Review</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
                <CardContent className="p-4 flex items-center gap-4">
                  <XCircle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                      {kpiData.exceptions}
                    </p>
                    <p className="text-sm text-red-600">Exceptions</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ReconciliationTable rows={reconciliationRows} />
          </div>
        </TabsContent>

        <TabsContent value="exceptions">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Exception List</CardTitle>
              <CardDescription>
                Transactions requiring manual review and resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reconciliationRows
                  .filter((r) => r.status === "exception" || r.status === "mismatch")
                  .map((row) => (
                    <div
                      key={row.id}
                      className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-mono text-sm font-medium">{row.bookingRef}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {row.date} via {row.channel}
                          </p>
                        </div>
                        <Badge variant="destructive">{row.status}</Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Booking</p>
                          <p className="font-medium">R{row.bookingAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Payment</p>
                          <p className="font-medium">R{row.paymentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Access</p>
                          <p className="font-medium">{row.accessUsage}</p>
                        </div>
                      </div>
                      {row.notes && (
                        <p className="mt-3 text-sm text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-2 rounded">
                          {row.notes}
                        </p>
                      )}
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <AuditTrailTable rows={auditTrailRows} />
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Pricing & Discount Changes</CardTitle>
              <CardDescription>All pricing modifications with approval status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-2">Date</th>
                      <th className="text-left font-medium py-3 px-2">Item</th>
                      <th className="text-left font-medium py-3 px-2">Change Type</th>
                      <th className="text-right font-medium py-3 px-2">Old Value</th>
                      <th className="text-right font-medium py-3 px-2">New Value</th>
                      <th className="text-left font-medium py-3 px-2">Requested By</th>
                      <th className="text-left font-medium py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">2026-02-04</td>
                      <td className="py-3 px-2">Canyon Lodge - Peak Rate</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">Price Increase</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">R1,800</td>
                      <td className="py-3 px-2 text-right font-medium">R2,100</td>
                      <td className="py-3 px-2">Thandi M.</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">2026-02-03</td>
                      <td className="py-3 px-2">Early Bird Discount</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">New Discount</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">-</td>
                      <td className="py-3 px-2 text-right font-medium">15%</td>
                      <td className="py-3 px-2">Sarah K.</td>
                      <td className="py-3 px-2">
                        <Badge variant="default">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">2026-02-01</td>
                      <td className="py-3 px-2">Safari Experience</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">Price Decrease</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">R1,200</td>
                      <td className="py-3 px-2 text-right font-medium">R950</td>
                      <td className="py-3 px-2">Johan V.</td>
                      <td className="py-3 px-2">
                        <Badge variant="default">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Channel Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopList title="Revenue by Channel" items={channelRevenue} valueLabel="Revenue" />

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Reconciliation Status by Park</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Blyde River Canyon", reconciled: 98, pending: 5, exceptions: 2 },
              { name: "Kruger Gate Camps", reconciled: 96, pending: 8, exceptions: 4 },
              { name: "Songimvelo Reserve", reconciled: 99, pending: 2, exceptions: 1 },
              { name: "Loskop Dam", reconciled: 94, pending: 12, exceptions: 8 },
            ].map((park) => (
              <div key={park.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{park.name}</span>
                  <span className="font-medium">{park.reconciled}% reconciled</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${park.reconciled}%` }}
                  />
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(park.pending / (park.reconciled + park.pending + park.exceptions)) * 100}%` }}
                  />
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${(park.exceptions / (park.reconciled + park.pending + park.exceptions)) * 100}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                  <span>{park.pending} pending</span>
                  <span>{park.exceptions} exceptions</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
