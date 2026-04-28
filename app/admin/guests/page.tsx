"use client"

import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Mail, Phone, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"

const guests = [
  {
    id: "G001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+27 82 123 4567",
    country: "South Africa",
    avatar: "/avatar-hans.jpg",
    totalBookings: 5,
    totalSpent: 45000,
    lastVisit: "2026-02-15",
    tier: "Gold",
    notes: "Prefers quiet rooms, allergic to feathers",
  },
  {
    id: "G002",
    name: "Sarah Mitchell",
    email: "sarah.m@email.com",
    phone: "+44 20 7946 0958",
    country: "United Kingdom",
    avatar: "/avatar-sarah.jpg",
    totalBookings: 3,
    totalSpent: 28500,
    lastVisit: "2026-01-20",
    tier: "Silver",
    notes: "",
  },
  {
    id: "G003",
    name: "Hans Weber",
    email: "hans.w@email.de",
    phone: "+49 89 123 456",
    country: "Germany",
    avatar: "/avatar-hans.jpg",
    totalBookings: 2,
    totalSpent: 15200,
    lastVisit: "2025-12-10",
    tier: "Bronze",
    notes: "Photography enthusiast",
  },
  {
    id: "G004",
    name: "Thandi Nkosi",
    email: "thandi.n@email.co.za",
    phone: "+27 83 456 7890",
    country: "South Africa",
    avatar: "/avatar-thandi.jpg",
    totalBookings: 12,
    totalSpent: 95000,
    lastVisit: "2026-02-10",
    tier: "Platinum",
    notes: "VIP customer, anniversary in March",
  },
  {
    id: "G005",
    name: "Lisa van der Berg",
    email: "lisa.vdb@email.co.za",
    phone: "+27 84 567 8901",
    country: "South Africa",
    avatar: "",
    totalBookings: 1,
    totalSpent: 1900,
    lastVisit: "2026-02-18",
    tier: "Bronze",
    notes: "",
  },
]

const tierColors: Record<string, string> = {
  Bronze: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  Silver: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  Gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Platinum: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
}

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Guest Management</h1>
          <p className="text-muted-foreground">Manage guest profiles and history</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Guest
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Guest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuests.map((guest) => (
          <Card key={guest.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={guest.avatar || "/placeholder.svg"} alt={guest.name} />
                    <AvatarFallback>
                      {guest.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{guest.name}</h3>
                    <Badge variant="secondary" className={tierColors[guest.tier]}>
                      {guest.tier}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      View Bookings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{guest.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{guest.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{guest.country}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                <div className="text-center">
                  <p className="font-semibold">{guest.totalBookings}</p>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">R{(guest.totalSpent / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-muted-foreground">Spent</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xs">{guest.lastVisit}</p>
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                </div>
              </div>

              {guest.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground italic">{guest.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
