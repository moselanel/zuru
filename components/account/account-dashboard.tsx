"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Calendar,
  Heart,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  MapPin,
  Download,
  Star,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+27 82 123 4567",
  country: "South Africa",
  memberSince: "2023",
  tier: "Gold",
  points: 4250,
  avatar: "/avatar-hans.jpg",
}

const bookings = [
  {
    id: "MTPA-2026-78294",
    property: "Canyon Lodge & Spa",
    location: "Blyde River Canyon",
    image: "/canyon-lodge.jpg",
    checkIn: "2026-02-15",
    checkOut: "2026-02-17",
    status: "confirmed",
    total: 7550,
    guests: 2,
  },
  {
    id: "MTPA-2026-78102",
    property: "Sunrise Game Drive",
    location: "Kruger Gate Reserve",
    image: "/sunrise-safari.jpg",
    checkIn: "2026-02-16",
    checkOut: "2026-02-16",
    status: "confirmed",
    total: 1700,
    guests: 2,
  },
  {
    id: "MTPA-2025-65432",
    property: "Family Safari Chalet",
    location: "Kruger Gate Reserve",
    image: "/safari-chalet.jpg",
    checkIn: "2025-12-20",
    checkOut: "2025-12-23",
    status: "completed",
    total: 5400,
    guests: 4,
  },
]

const favorites = [
  {
    id: "blyde-river",
    name: "Blyde River Canyon Nature Reserve",
    image: "/blyde-river-canyon-south-africa-dramatic-green-can.jpg",
    rating: 4.9,
    type: "Reserve",
  },
  {
    id: "canyon-lodge",
    name: "Canyon Lodge & Spa",
    image: "/canyon-lodge.jpg",
    rating: 4.9,
    type: "Accommodation",
  },
  {
    id: "balloon-safari",
    name: "Hot Air Balloon Safari",
    image: "/balloon-safari.jpg",
    rating: 5.0,
    type: "Experience",
  },
]

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("bookings")

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 sticky top-24">
            {/* Profile Summary */}
            <div className="text-center mb-6">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              <h2 className="font-serif text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <Badge className="mt-2 bg-accent text-accent-foreground">{userData.tier} Member</Badge>
            </div>

            {/* Points */}
            <div className="bg-primary/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Reward Points</span>
                <Star className="h-4 w-4 text-accent" />
              </div>
              <div className="font-serif text-2xl font-bold text-primary">{userData.points.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">750 points to Platinum tier</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {[
                { id: "bookings", label: "My Bookings", icon: Calendar },
                { id: "favorites", label: "Favorites", icon: Heart },
                { id: "profile", label: "Profile", icon: User },
                { id: "payments", label: "Payment Methods", icon: CreditCard },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <Separator className="my-4" />

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl font-bold">My Bookings</h1>
                <Tabs defaultValue="upcoming" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-card border rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4"
                  >
                    <img
                      src={booking.image || "/placeholder.svg"}
                      alt={booking.property}
                      className="w-full md:w-40 h-32 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className={booking.status === "confirmed" ? "bg-primary" : ""}
                          >
                            {booking.status === "confirmed" ? "Confirmed" : "Completed"}
                          </Badge>
                          <h3 className="font-semibold text-lg mt-2">{booking.property}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {booking.location}
                          </p>
                        </div>
                        <span className="font-mono text-sm text-muted-foreground">{booking.id}</span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {booking.checkIn} - {booking.checkOut}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {booking.guests} guests
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <span className="font-semibold text-primary text-lg">R{booking.total.toLocaleString()}</span>
                        <div className="flex gap-2">
                          {booking.status === "completed" && (
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <MessageSquare className="h-4 w-4" />
                              Review
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <Download className="h-4 w-4" />
                            Voucher
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">My Favorites</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.type.toLowerCase()}s/${item.id}`}
                    className="group bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                        {item.type}
                      </Badge>
                      <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center">
                        <Heart className="h-4 w-4 text-destructive fill-destructive" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{item.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">Profile Settings</h1>
              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={userData.email} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={userData.phone} className="mt-1.5" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue={userData.country} className="mt-1.5" />
                  </div>
                </div>
                <Button className="mt-6">Save Changes</Button>
              </div>

              <div className="bg-card border rounded-2xl p-6">
                <h2 className="font-semibold mb-4">Change Password</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="mt-1.5" />
                  </div>
                </div>
                <Button variant="outline" className="mt-6 bg-transparent">
                  Update Password
                </Button>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl font-bold">Payment Methods</h1>
                <Button>Add New Card</Button>
              </div>
              <div className="space-y-4">
                <div className="bg-card border rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 4532</p>
                      <p className="text-sm text-muted-foreground">Expires 08/26</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Default</Badge>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="bg-card border rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">
                      MC
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 8901</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">Notification Preferences</h1>
              <div className="bg-card border rounded-2xl p-6 space-y-6">
                {[
                  { id: "booking", label: "Booking Confirmations", desc: "Receive notifications for booking updates" },
                  { id: "promo", label: "Promotions & Offers", desc: "Get notified about special deals and discounts" },
                  { id: "reminder", label: "Trip Reminders", desc: "Reminders before your scheduled trips" },
                  { id: "newsletter", label: "Newsletter", desc: "Monthly newsletter with travel inspiration" },
                  { id: "review", label: "Review Requests", desc: "Reminders to review your completed trips" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.id !== "newsletter"} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold">Account Settings</h1>
              <div className="bg-card border rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                  </div>
                  <select className="px-3 py-2 border rounded-lg bg-background">
                    <option>English</option>
                    <option>Afrikaans</option>
                    <option>Zulu</option>
                  </select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Currency</p>
                    <p className="text-sm text-muted-foreground">Select your preferred currency</p>
                  </div>
                  <select className="px-3 py-2 border rounded-lg bg-background">
                    <option>ZAR (R)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" className="bg-transparent">
                    Enable
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
