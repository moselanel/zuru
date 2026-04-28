"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const reservations = [
  {
    id: "MTPA-2026-78294",
    guest: { name: "John Doe", email: "john.doe@email.com", phone: "+27 82 123 4567" },
    property: "Canyon Lodge & Spa",
    unit: "Suite 101",
    checkIn: "2026-02-15",
    checkOut: "2026-02-17",
    nights: 2,
    guests: 2,
    total: 7550,
    paid: 7550,
    balance: 0,
    status: "confirmed",
    source: "website",
    createdAt: "2026-01-28",
  },
  {
    id: "MTPA-2026-78295",
    guest: { name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "+44 20 7946 0958" },
    property: "Honeymoon Treehouse Suite",
    unit: "Treehouse 1",
    checkIn: "2026-02-16",
    checkOut: "2026-02-19",
    nights: 3,
    guests: 2,
    total: 13500,
    paid: 6750,
    balance: 6750,
    status: "confirmed",
    source: "booking.com",
    createdAt: "2026-01-25",
  },
  {
    id: "MTPA-2026-78296",
    guest: { name: "Hans Weber", email: "hans.w@email.de", phone: "+49 89 123 456" },
    property: "Family Safari Chalet",
    unit: "Chalet 3",
    checkIn: "2026-02-17",
    checkOut: "2026-02-21",
    nights: 4,
    guests: 4,
    total: 7200,
    paid: 0,
    balance: 7200,
    status: "pending",
    source: "phone",
    createdAt: "2026-01-30",
  },
  {
    id: "MTPA-2026-78297",
    guest: { name: "Lisa van der Berg", email: "lisa.vdb@email.co.za", phone: "+27 83 456 7890" },
    property: "Riverside Bush Camp",
    unit: "Tent 5",
    checkIn: "2026-02-18",
    checkOut: "2026-02-20",
    nights: 2,
    guests: 2,
    total: 1900,
    paid: 1900,
    balance: 0,
    status: "confirmed",
    source: "website",
    createdAt: "2026-01-29",
  },
  {
    id: "MTPA-2026-78298",
    guest: { name: "Mike Johnson", email: "mike.j@email.com", phone: "+1 555 123 4567" },
    property: "Canyon Lodge & Spa",
    unit: "Suite 102",
    checkIn: "2026-02-20",
    checkOut: "2026-02-23",
    nights: 3,
    guests: 2,
    total: 8400,
    paid: 8400,
    balance: 0,
    status: "checked-in",
    source: "expedia",
    createdAt: "2026-01-20",
  },
  {
    id: "MTPA-2026-78299",
    guest: { name: "Emma Thompson", email: "emma.t@email.co.uk", phone: "+44 7911 123456" },
    property: "Luxury Safari Tent",
    unit: "Tent 2",
    checkIn: "2026-02-14",
    checkOut: "2026-02-16",
    nights: 2,
    guests: 2,
    total: 2400,
    paid: 2400,
    balance: 0,
    status: "checked-out",
    source: "website",
    createdAt: "2026-01-15",
  },
  {
    id: "MTPA-2026-78300",
    guest: { name: "David Chen", email: "david.c@email.cn", phone: "+86 138 1234 5678" },
    property: "Waterfront Cottage",
    unit: "Cottage 1",
    checkIn: "2026-02-22",
    checkOut: "2026-02-25",
    nights: 3,
    guests: 4,
    total: 2550,
    paid: 0,
    balance: 2550,
    status: "cancelled",
    source: "booking.com",
    createdAt: "2026-01-18",
  },
]

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "checked-in": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "checked-out": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

export default function ReservationsPage() {
  const [selectedReservations, setSelectedReservations] = useState<string[]>([])
  const [viewReservation, setViewReservation] = useState<(typeof reservations)[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [propertyFilter, setPropertyFilter] = useState("all")

  const toggleAll = () => {
    if (selectedReservations.length === reservations.length) {
      setSelectedReservations([])
    } else {
      setSelectedReservations(reservations.map((r) => r.id))
    }
  }

  const toggleOne = (id: string) => {
    setSelectedReservations((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const filteredReservations = reservations.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false
    if (propertyFilter !== "all" && r.property !== propertyFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Reservations</h1>
          <p className="text-muted-foreground">Manage all bookings across properties</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            New Reservation
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID, guest name, or email..." className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="checked-in">Checked In</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={propertyFilter} onValueChange={setPropertyFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="Canyon Lodge & Spa">Canyon Lodge & Spa</SelectItem>
            <SelectItem value="Honeymoon Treehouse Suite">Honeymoon Treehouse</SelectItem>
            <SelectItem value="Family Safari Chalet">Family Safari Chalet</SelectItem>
            <SelectItem value="Riverside Bush Camp">Riverside Bush Camp</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="text-sm text-muted-foreground">
                <th className="text-left font-medium py-4 px-4">
                  <Checkbox checked={selectedReservations.length === reservations.length} onCheckedChange={toggleAll} />
                </th>
                <th className="text-left font-medium py-4 px-4">Booking ID</th>
                <th className="text-left font-medium py-4 px-4">Guest</th>
                <th className="text-left font-medium py-4 px-4">Property / Unit</th>
                <th className="text-left font-medium py-4 px-4">Dates</th>
                <th className="text-left font-medium py-4 px-4">Total</th>
                <th className="text-left font-medium py-4 px-4">Balance</th>
                <th className="text-left font-medium py-4 px-4">Status</th>
                <th className="text-left font-medium py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="border-t hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <Checkbox
                      checked={selectedReservations.includes(reservation.id)}
                      onCheckedChange={() => toggleOne(reservation.id)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{reservation.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{reservation.guest.name}</p>
                      <p className="text-sm text-muted-foreground">{reservation.guest.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{reservation.property}</p>
                      <p className="text-sm text-muted-foreground">{reservation.unit}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm">
                        {reservation.checkIn} - {reservation.checkOut}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.nights} nights, {reservation.guests} guests
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">R{reservation.total.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span
                      className={reservation.balance > 0 ? "text-destructive font-medium" : "text-muted-foreground"}
                    >
                      {reservation.balance > 0 ? `R${reservation.balance.toLocaleString()}` : "Paid"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className={statusColors[reservation.status]}>
                      {reservation.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewReservation(reservation)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {reservation.status === "confirmed" && (
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Check In
                          </DropdownMenuItem>
                        )}
                        {reservation.status === "checked-in" && (
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Check Out
                          </DropdownMenuItem>
                        )}
                        {reservation.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {filteredReservations.length} of {reservations.length} reservations
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="bg-transparent">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* View Reservation Dialog */}
      <Dialog open={!!viewReservation} onOpenChange={() => setViewReservation(null)}>
        <DialogContent className="max-w-2xl">
          {viewReservation && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">Reservation {viewReservation.id}</DialogTitle>
                <DialogDescription>
                  Created on {viewReservation.createdAt} via {viewReservation.source}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 py-4">
                <div>
                  <h4 className="font-semibold mb-3">Guest Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium">{viewReservation.guest.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{viewReservation.guest.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{viewReservation.guest.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Stay Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property</span>
                      <span className="font-medium">{viewReservation.property}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unit</span>
                      <span>{viewReservation.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dates</span>
                      <span>
                        {viewReservation.checkIn} to {viewReservation.checkOut}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span>{viewReservation.guests} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="py-4">
                <h4 className="font-semibold mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">R{viewReservation.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="text-green-600">R{viewReservation.paid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Balance Due</span>
                    <span className={viewReservation.balance > 0 ? "text-destructive font-medium" : ""}>
                      R{viewReservation.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" className="bg-transparent" onClick={() => setViewReservation(null)}>
                  Close
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Edit Booking
                </Button>
                {viewReservation.status === "confirmed" && <Button>Check In Guest</Button>}
                {viewReservation.status === "checked-in" && <Button>Check Out Guest</Button>}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
