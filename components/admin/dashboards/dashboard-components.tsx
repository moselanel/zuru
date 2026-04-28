"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon,
  Download,
  FileText,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import type { ReactNode } from "react"

// Types for dashboard components
export interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: "up" | "down" | "neutral"
  icon?: ReactNode
  description?: string
  format?: "currency" | "percentage" | "number"
  loading?: boolean
}

export interface FilterConfig {
  dateRange: { from: Date; to: Date }
  park?: string
  channel?: string
  region?: string
}

export interface AlertThreshold {
  metric: string
  threshold: number
  operator: ">" | "<" | ">=" | "<=" | "="
  severity: "warning" | "critical" | "info"
  message: string
}

export interface ReconciliationRow {
  id: string
  date: string
  bookingRef: string
  channel: string
  bookingAmount: number
  paymentAmount: number
  accessUsage: string
  status: "matched" | "mismatch" | "pending" | "exception"
  notes?: string
}

export interface AuditTrailRow {
  id: string
  timestamp: string
  user: string
  action: string
  entity: string
  entityId: string
  oldValue?: string
  newValue?: string
  ipAddress?: string
}

// KPI Card Component
export function KPICard({
  title,
  value,
  change,
  changeLabel,
  trend,
  icon,
  description,
  format: valueFormat = "number",
  loading = false,
}: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val
    switch (valueFormat) {
      case "currency":
        return `R${val.toLocaleString()}`
      case "percentage":
        return `${val}%`
      default:
        return val.toLocaleString()
    }
  }

  const getTrendIcon = () => {
    if (!trend) return null
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />
      case "down":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground"
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-4" />
            <div className="h-8 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/3" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {description && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="font-serif text-2xl font-bold">{formatValue(value)}</p>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm mt-1", getTrendColor())}>
                {getTrendIcon()}
                <span className="font-medium">
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
                {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
              </div>
            )}
          </div>
          {icon && (
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Dashboard Filter Bar Component
export function DashboardFilters({
  filters,
  onFiltersChange,
  parks = [],
  channels = [],
  showDateRange = true,
  showParkFilter = true,
  showChannelFilter = true,
  showExport = true,
}: {
  filters: FilterConfig
  onFiltersChange: (filters: FilterConfig) => void
  parks?: { id: string; name: string }[]
  channels?: { id: string; name: string }[]
  showDateRange?: boolean
  showParkFilter?: boolean
  showChannelFilter?: boolean
  showExport?: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/50 rounded-lg border">
      {showDateRange && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 bg-background">
              <CalendarIcon className="h-4 w-4" />
              {filters.dateRange.from && filters.dateRange.to ? (
                <>
                  {format(filters.dateRange.from, "MMM d")} - {format(filters.dateRange.to, "MMM d, yyyy")}
                </>
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: filters.dateRange.from, to: filters.dateRange.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onFiltersChange({ ...filters, dateRange: { from: range.from, to: range.to } })
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}

      {showParkFilter && parks.length > 0 && (
        <Select
          value={filters.park || "all"}
          onValueChange={(value) => onFiltersChange({ ...filters, park: value === "all" ? undefined : value })}
        >
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Parks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parks</SelectItem>
            {parks.map((park) => (
              <SelectItem key={park.id} value={park.id}>
                {park.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {showChannelFilter && channels.length > 0 && (
        <Select
          value={filters.channel || "all"}
          onValueChange={(value) => onFiltersChange({ ...filters, channel: value === "all" ? undefined : value })}
        >
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder="All Channels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            {channels.map((channel) => (
              <SelectItem key={channel.id} value={channel.id}>
                {channel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {showExport && (
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            PDF
          </Button>
        </div>
      )}
    </div>
  )
}

// Alert Card Component
export function AlertCard({
  alerts,
}: {
  alerts: { severity: "warning" | "critical" | "info"; message: string; timestamp: string }[]
}) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50 dark:bg-red-950/30",
          border: "border-red-200 dark:border-red-900",
          icon: <XCircle className="h-4 w-4 text-red-500" />,
          badge: "destructive" as const,
        }
      case "warning":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/30",
          border: "border-amber-200 dark:border-amber-900",
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
          badge: "secondary" as const,
        }
      default:
        return {
          bg: "bg-blue-50 dark:bg-blue-950/30",
          border: "border-blue-200 dark:border-blue-900",
          icon: <Info className="h-4 w-4 text-blue-500" />,
          badge: "outline" as const,
        }
    }
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No active alerts</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Active Alerts ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert, index) => {
          const styles = getSeverityStyles(alert.severity)
          return (
            <div key={index} className={cn("p-3 rounded-lg border flex items-start gap-3", styles.bg, styles.border)}>
              {styles.icon}
              <div className="flex-1 min-w-0">
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
              </div>
              <Badge variant={styles.badge} className="text-xs">
                {alert.severity}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// Reconciliation Table Component
export function ReconciliationTable({ rows }: { rows: ReconciliationRow[] }) {
  const getStatusBadge = (status: ReconciliationRow["status"]) => {
    switch (status) {
      case "matched":
        return (
          <Badge variant="default" className="bg-green-600">
            Matched
          </Badge>
        )
      case "mismatch":
        return <Badge variant="destructive">Mismatch</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "exception":
        return (
          <Badge variant="destructive" className="bg-amber-600">
            Exception
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Reconciliation Status</CardTitle>
        <CardDescription>Booking to payment to access usage reconciliation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium py-3 px-2">Date</th>
                <th className="text-left font-medium py-3 px-2">Booking Ref</th>
                <th className="text-left font-medium py-3 px-2">Channel</th>
                <th className="text-right font-medium py-3 px-2">Booking Amt</th>
                <th className="text-right font-medium py-3 px-2">Payment Amt</th>
                <th className="text-left font-medium py-3 px-2">Access</th>
                <th className="text-left font-medium py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-2">{row.date}</td>
                  <td className="py-3 px-2 font-mono text-xs">{row.bookingRef}</td>
                  <td className="py-3 px-2">{row.channel}</td>
                  <td className="py-3 px-2 text-right">R{row.bookingAmount.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">R{row.paymentAmount.toLocaleString()}</td>
                  <td className="py-3 px-2">{row.accessUsage}</td>
                  <td className="py-3 px-2">{getStatusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Audit Trail Table Component
export function AuditTrailTable({ rows }: { rows: AuditTrailRow[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-serif">Audit Trail</CardTitle>
          <CardDescription>Complete history of system changes</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium py-3 px-2">Timestamp</th>
                <th className="text-left font-medium py-3 px-2">User</th>
                <th className="text-left font-medium py-3 px-2">Action</th>
                <th className="text-left font-medium py-3 px-2">Entity</th>
                <th className="text-left font-medium py-3 px-2">Changes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-2 text-xs">{row.timestamp}</td>
                  <td className="py-3 px-2">{row.user}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline">{row.action}</Badge>
                  </td>
                  <td className="py-3 px-2">
                    <span className="font-medium">{row.entity}</span>
                    <span className="text-muted-foreground ml-1 text-xs">#{row.entityId}</span>
                  </td>
                  <td className="py-3 px-2">
                    {row.oldValue && row.newValue && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-500 line-through">{row.oldValue}</span>
                        <ArrowUpRight className="h-3 w-3" />
                        <span className="text-green-600">{row.newValue}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Top List Component
export function TopList({
  title,
  items,
  valueLabel = "Value",
  showProgress = true,
}: {
  title: string
  items: { name: string; value: number; change?: number }[]
  valueLabel?: string
  showProgress?: boolean
}) {
  const maxValue = Math.max(...items.map((i) => i.value))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.name}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                {item.name}
              </span>
              <span className="font-medium flex items-center gap-2">
                {valueLabel === "Revenue" ? `R${item.value.toLocaleString()}` : item.value.toLocaleString()}
                {item.change !== undefined && (
                  <span className={cn("text-xs", item.change >= 0 ? "text-green-600" : "text-red-500")}>
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </span>
                )}
              </span>
            </div>
            {showProgress && (
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Trend Chart Placeholder Component
export function TrendChart({
  title,
  description,
  data,
}: {
  title: string
  description?: string
  data: { label: string; value: number }[]
}) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-end gap-2">
          {data.map((item) => (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Heatmap Component (for engagement visualization)
export function EngagementHeatmap({
  title,
  data,
}: {
  title: string
  data: { region: string; value: number }[]
}) {
  const maxValue = Math.max(...data.map((d) => d.value))

  const getIntensity = (value: number) => {
    const ratio = value / maxValue
    if (ratio > 0.8) return "bg-primary"
    if (ratio > 0.6) return "bg-primary/80"
    if (ratio > 0.4) return "bg-primary/60"
    if (ratio > 0.2) return "bg-primary/40"
    return "bg-primary/20"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.map((item) => (
            <div
              key={item.region}
              className={cn("p-3 rounded-lg text-center", getIntensity(item.value))}
            >
              <p className="text-sm font-medium text-primary-foreground">{item.region}</p>
              <p className="text-xs text-primary-foreground/80">{item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <div className="w-4 h-4 rounded bg-primary/40" />
            <div className="w-4 h-4 rounded bg-primary/60" />
            <div className="w-4 h-4 rounded bg-primary/80" />
            <div className="w-4 h-4 rounded bg-primary" />
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Dashboard Section Header
export function DashboardSection({
  title,
  description,
  children,
  action,
}: {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
