import { Calendar, Users, CreditCard, ArrowUpRight, ArrowDownRight, BedDouble, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stats = [
  {
    name: "Total Bookings",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
    description: "This month",
  },
  {
    name: "Revenue",
    value: "R2.4M",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    description: "This month",
  },
  {
    name: "Occupancy Rate",
    value: "78%",
    change: "-3.1%",
    trend: "down",
    icon: BedDouble,
    description: "Average",
  },
  {
    name: "Active Guests",
    value: "342",
    change: "+5.4%",
    trend: "up",
    icon: Users,
    description: "Currently staying",
  },
]

const recentBookings = [
  {
    id: "MTPA-2026-78294",
    guest: "John Doe",
    property: "Canyon Lodge & Spa",
    checkIn: "Feb 15, 2026",
    nights: 2,
    total: 7550,
    status: "confirmed",
  },
  {
    id: "MTPA-2026-78295",
    guest: "Sarah Mitchell",
    property: "Honeymoon Treehouse Suite",
    checkIn: "Feb 16, 2026",
    nights: 3,
    total: 13500,
    status: "confirmed",
  },
  {
    id: "MTPA-2026-78296",
    guest: "Hans Weber",
    property: "Family Safari Chalet",
    checkIn: "Feb 17, 2026",
    nights: 4,
    total: 7200,
    status: "pending",
  },
  {
    id: "MTPA-2026-78297",
    guest: "Lisa van der Berg",
    property: "Riverside Bush Camp",
    checkIn: "Feb 18, 2026",
    nights: 2,
    total: 1900,
    status: "confirmed",
  },
]

const todayActivity = [
  { type: "checkin", count: 12, label: "Check-ins today" },
  { type: "checkout", count: 8, label: "Check-outs today" },
  { type: "arrivals", count: 15, label: "Expected arrivals" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Thandi. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            Download Report
          </Button>
          <Button>New Booking</Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}
                >
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {todayActivity.map((activity) => (
          <Card key={activity.type} className="bg-primary text-primary-foreground">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-3xl font-bold">{activity.count}</div>
                <div className="text-sm text-primary-foreground/80">{activity.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif">Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="text-left font-medium py-3 px-2">Booking ID</th>
                    <th className="text-left font-medium py-3 px-2">Guest</th>
                    <th className="text-left font-medium py-3 px-2 hidden md:table-cell">Property</th>
                    <th className="text-left font-medium py-3 px-2">Check-in</th>
                    <th className="text-left font-medium py-3 px-2">Total</th>
                    <th className="text-left font-medium py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <span className="font-mono text-sm">{booking.id}</span>
                      </td>
                      <td className="py-3 px-2 font-medium">{booking.guest}</td>
                      <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{booking.property}</td>
                      <td className="py-3 px-2 text-sm">{booking.checkIn}</td>
                      <td className="py-3 px-2 font-medium">R{booking.total.toLocaleString()}</td>
                      <td className="py-3 px-2">
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions & Occupancy */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                New Reservation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Users className="h-4 w-4" />
                Walk-in Guest
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <CreditCard className="h-4 w-4" />
                Process Payment
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <MapPin className="h-4 w-4" />
                Block Dates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Property Occupancy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Canyon Lodge", occupancy: 85 },
                { name: "Kruger Gate", occupancy: 92 },
                { name: "Songimvelo", occupancy: 64 },
                { name: "Loskop Dam", occupancy: 71 },
              ].map((property) => (
                <div key={property.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{property.name}</span>
                    <span className="font-medium">{property.occupancy}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${property.occupancy}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
