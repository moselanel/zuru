"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Star,
  MapPin,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Users,
  Clock,
  Camera,
  Wifi,
  Car,
  Coffee,
  Waves,
  X,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { type reserves, accommodations } from "@/lib/data"

type Reserve = (typeof reserves)[0]

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Restaurant: Coffee,
  "Swimming Pool": Waves,
  Parking: Car,
  WiFi: Wifi,
  "Curio Shop": Camera,
}

export function ReserveDetail({ reserve }: { reserve: Reserve }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("january")
  const [guests, setGuests] = useState("2")

  const allImages = [reserve.image, ...reserve.gallery]
  const reserveAccommodations = accommodations.filter((a) => a.reserveId === reserve.id)

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % allImages.length)
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + allImages.length) % allImages.length)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/reserves" className="text-muted-foreground hover:text-foreground">
              Nature Reserves
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{reserve.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[500px]">
            {/* Main Image */}
            <div
              className="md:col-span-2 md:row-span-2 relative rounded-l-2xl overflow-hidden cursor-pointer group"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={allImages[0] || "/placeholder.svg"}
                alt={reserve.name}
                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>

            {/* Side Images */}
            {allImages.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className={`hidden md:block relative overflow-hidden cursor-pointer group ${
                  index === 1 ? "rounded-tr-2xl" : index === 3 ? "rounded-br-2xl" : ""
                }`}
                onClick={() => {
                  setCurrentImageIndex(index + 1)
                  setShowGallery(true)
                }}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${reserve.name} ${index + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {index === 3 && allImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">+{allImages.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Gallery Button */}
          <Button
            variant="outline"
            className="md:hidden mt-4 w-full gap-2 bg-transparent"
            onClick={() => setShowGallery(true)}
          >
            <Camera className="h-4 w-4" />
            View all {allImages.length} photos
          </Button>
        </div>
      </section>

      {/* Full Screen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setShowGallery(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <img
            src={allImages[currentImageIndex] || "/placeholder.svg"}
            alt={`${reserve.name} ${currentImageIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {reserve.location} • {reserve.region}
                      </span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{reserve.name}</h1>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{reserve.rating}</span>
                    <span className="text-muted-foreground">({reserve.reviewCount} reviews)</span>
                  </div>
                  {reserve.familyFriendly && (
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      Family Friendly
                    </Badge>
                  )}
                  {reserve.accessible && (
                    <Badge variant="secondary" className="gap-1">
                      <Check className="h-3 w-3" />
                      Accessible
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-4">About {reserve.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">{reserve.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {reserve.wildlife.slice(0, 4).map((animal) => (
                        <div key={animal} className="bg-muted/50 rounded-xl p-4 text-center">
                          <div className="text-3xl mb-2">🦁</div>
                          <span className="text-sm font-medium">{animal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Wildlife</h3>
                    <div className="flex flex-wrap gap-2">
                      {reserve.wildlife.map((animal) => (
                        <Badge key={animal} variant="outline" className="py-1.5 px-3">
                          {animal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Activities Available</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {reserve.activities.map((activity) => (
                        <div key={activity} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="accommodation" className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold">Accommodation Options</h2>
                  {reserveAccommodations.length > 0 ? (
                    <div className="grid gap-6">
                      {reserveAccommodations.map((acc) => (
                        <div
                          key={acc.id}
                          className="bg-card border rounded-2xl overflow-hidden flex flex-col md:flex-row"
                        >
                          <div className="w-full md:w-64 h-48 md:h-auto">
                            <img
                              src={acc.image || "/placeholder.svg"}
                              alt={acc.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  {acc.type}
                                </Badge>
                                <h3 className="font-semibold text-lg">{acc.name}</h3>
                              </div>
                              <div className="text-right">
                                <span className="block text-xl font-bold text-primary">
                                  R{acc.pricePerNight.toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground">per night</span>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">{acc.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <span>
                                {acc.bedrooms} Bedroom{acc.bedrooms > 1 ? "s" : ""}
                              </span>
                              <span>
                                {acc.bathrooms} Bathroom{acc.bathrooms > 1 ? "s" : ""}
                              </span>
                              <span>Sleeps {acc.maxCapacity}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {acc.amenities.slice(0, 4).map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                            <Button>View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No accommodation data available for this reserve.</p>
                  )}
                </TabsContent>

                <TabsContent value="activities" className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold">Things To Do</h2>
                  <div className="grid gap-4">
                    {reserve.activities.map((activity) => (
                      <div key={activity} className="bg-card border rounded-xl p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{activity}</h3>
                            <p className="text-sm text-muted-foreground">Duration varies • All skill levels</p>
                          </div>
                        </div>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="facilities" className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold">Facilities & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {reserve.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Check
                      return (
                        <div key={amenity} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                          <Icon className="h-5 w-5 text-primary" />
                          <span>{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold">Guest Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 fill-accent text-accent" />
                      <span className="text-2xl font-bold">{reserve.rating}</span>
                      <span className="text-muted-foreground">({reserve.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Sample reviews */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-card border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-muted" />
                          <div>
                            <p className="font-medium">Guest Reviewer</p>
                            <p className="text-sm text-muted-foreground">December 2025</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-muted-foreground">
                          Amazing experience! The views were breathtaking and the staff were incredibly helpful. Would
                          definitely recommend to anyone visiting Mpumalanga.
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Load More Reviews
                  </Button>
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <h2 className="font-serif text-2xl font-bold">Location</h2>
                  <div className="bg-muted rounded-2xl h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                      <p className="font-medium mt-2">{reserve.location}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Getting There</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• 4 hours drive from Johannesburg</li>
                        <li>• 1 hour from Kruger Mpumalanga International Airport</li>
                        <li>• Shuttle services available on request</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Contact</h3>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          +27 13 759 5300
                        </p>
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          info@mtpa.co.za
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-lg">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-sm text-muted-foreground">From</span>
                    <p className="text-3xl font-bold text-primary">R{reserve.priceFrom.toLocaleString()}</p>
                  </div>
                  <span className="text-muted-foreground">per night</span>
                </div>

                <Separator className="mb-6" />

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Check-in / Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Select dates"
                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Guests</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full mb-4" size="lg">
                  Check Availability
                </Button>

                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Phone className="h-4 w-4" />
                  Contact Reserve
                </Button>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">R{reserve.priceFrom.toLocaleString()} x 2 nights</span>
                    <span>R{(reserve.priceFrom * 2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conservation levy</span>
                    <span>R150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span>R250</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>R{(reserve.priceFrom * 2 + 400).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
