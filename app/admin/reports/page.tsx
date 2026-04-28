"use client"

import { useState } from "react"
import {
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  BedDouble,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const revenueData = [
  { month: "Jan", revenue: 1250000, bookings: 245 },
  { month: "Feb", revenue: 1480000, bookings: 298 },
  { month: "Mar", revenue: 1320000, bookings: 267 },
  { month: "Apr", revenue: 1650000, bookings: 312 },
  { month: "May", revenue: 1890000, bookings: 356 },
  { month: "Jun", revenue: 2100000, bookings: 402 },
]

const propertyPerformance = [
  { name: "Canyon Lodge & Spa", revenue: 4250000, occupancy: 85, bookings: 456, rating: 4.9 },
  { name: "Kruger Gate Reserve", revenue: 3800000, occupancy: 92, bookings: 512, rating: 4.8 },
  { name: "Honeymoon Treehouse", revenue: 2100000, occupancy: 78, bookings: 234, rating: 5.0 },
  { name: "Songimvelo Camp", revenue: 1450000, occupancy: 64, bookings: 189, rating: 4.7 },
  { name: "Loskop Dam Cottages", revenue: 980000, occupancy: 71, bookings: 156, rating: 4.5 },
]

const channelData = [
  { name: "Direct Website", value: 45, color: "bg-primary" },
  { name: "Booking.com", value: 25, color: "bg-blue-500" },
  { name: "Expedia", value: 15, color: "bg-yellow-500" },
  { name: "Phone/Walk-in", value: 10, color: "bg-green-500" },
  { name: "Other OTAs", value: 5, color: "bg-purple-500" },
]

export default function ReportsPage() {
  const [period, setPeriod] = useState("this-month")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track performance and gain insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            name: "Total Revenue",
            value: "R2.4M",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
          },
          {
            name: "Bookings",
            value: "1,284",
            change: "+8.2%",
            trend: "up",
            icon: Calendar,
          },
          {
            name: "Avg. Occupancy",
            value: "78%",
            change: "-3.1%",
            trend: "down",
            icon: BedDouble,
          },
          {
            name: "Unique Guests",
            value: "892",
            change: "+15.4%",
            trend: "up",
            icon: Users,
          },
        ].map((kpi) => (
          <Card key={kpi.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-500"}`}
                >
                  {kpi.change}
                  {kpi.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
              </div>
              <div className="font-serif text-2xl font-bold">{kpi.value}</div>
              <p className="text-sm text-muted-foreground">{kpi.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {revenueData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                    style={{ height: `${(data.revenue / 2100000) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Booking Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelData.map((channel) => (
                <div key={channel.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{channel.name}</span>
                    <span className="font-medium">{channel.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${channel.color} rounded-full`} style={{ width: `${channel.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Property Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm text-muted-foreground">
                  <th className="text-left font-medium py-3 px-4">Property</th>
                  <th className="text-left font-medium py-3 px-4">Revenue</th>
                  <th className="text-left font-medium py-3 px-4">Occupancy</th>
                  <th className="text-left font-medium py-3 px-4">Bookings</th>
                  <th className="text-left font-medium py-3 px-4">Rating</th>
                  <th className="text-left font-medium py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {propertyPerformance.map((property) => (
                  <tr key={property.name} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">{property.name}</td>
                    <td className="py-4 px-4">R{(property.revenue / 1000000).toFixed(1)}M</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${property.occupancy}%` }} />
                        </div>
                        <span>{property.occupancy}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{property.bookings}</td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1">
                        <span className="text-accent">★</span>
                        {property.rating}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
