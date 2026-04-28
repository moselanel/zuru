"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Star, Clock, Trees as Tree, Home, Compass, Mountain, Camera, Waves, Building2, Flower2, ChevronRight, Navigation, Accessibility } from "lucide-react"
import type { reserves, accommodations, experiences, attractions } from "@/lib/data"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type Reserve = (typeof reserves)[number]
type Accommodation = (typeof accommodations)[number]
type Experience = (typeof experiences)[number]
type Attraction = (typeof attractions)[number]

type MapItem = {
  id: string
  name: string
  type: "reserve" | "accommodation" | "experience" | "attraction"
  coordinates: { lat: number; lng: number }
  image: string
  description?: string
  shortDescription?: string
  priceFrom?: number
  price?: number
  pricePerNight?: number
  rating?: number
  reviewCount?: number
  location?: string
  region?: string
  slug?: string
  duration?: string
  accessible?: boolean
  attractionType?: string
}

interface InteractiveMapProps {
  reserves: Reserve[]
  accommodations: Accommodation[]
  experiences: Experience[]
  attractions: Attraction[]
  filters: {
    types: string[]
    regions: string[]
    priceRange: [number, number]
    accessible: boolean
  }
}

export function InteractiveMap({
  reserves,
  accommodations,
  experiences,
  attractions,
  filters,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Combine all items with coordinates
  const allItems: MapItem[] = [
    ...reserves.map((r) => ({
      ...r,
      type: "reserve" as const,
      coordinates: r.coordinates || { lat: -25.0, lng: 30.5 },
    })),
    ...accommodations.map((a) => {
      const reserve = reserves.find((r) => r.id === a.reserveId)
      return {
        ...a,
        type: "accommodation" as const,
        coordinates: (a as any).coordinates || reserve?.coordinates || { lat: -25.0, lng: 30.5 },
        priceFrom: a.pricePerNight,
      }
    }),
    ...experiences.map((e) => ({
      ...e,
      type: "experience" as const,
      coordinates: (e as any).coordinates || { lat: -25.2, lng: 31.0 },
      priceFrom: e.price,
    })),
    ...attractions.map((a) => ({
      ...a,
      type: "attraction" as const,
      attractionType: a.type,
      priceFrom: a.priceFrom,
    })),
  ]

  // Filter items
  const filteredItems = allItems.filter((item) => {
    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(item.type)) {
      return false
    }

    // Region filter
    if (filters.regions.length > 0 && item.region && !filters.regions.includes(item.region)) {
      return false
    }

    // Price filter
    const price = item.priceFrom || item.price || item.pricePerNight || 0
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false
    }

    // Accessibility filter
    if (filters.accessible && item.accessible === false) {
      return false
    }

    return true
  })

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Initialize map centered on Mpumalanga
    mapInstanceRef.current = L.map(mapRef.current!, {
      center: [-25.0, 30.5],
      zoom: 8,
      scrollWheelZoom: true,
    })

    // Add tile layer (using OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current)

    setMapLoaded(true)

    // Add markers for filtered items
    filteredItems.forEach((item) => {
      if (!item.coordinates) return

      // Create custom icon based on type
      const iconHtml = getMarkerIcon(item.type, item.attractionType)
      const icon = L.divIcon({
        html: iconHtml,
        className: "custom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })

      const marker = L.marker([item.coordinates.lat, item.coordinates.lng], { icon }).addTo(
        mapInstanceRef.current!
      )

      marker.on("click", () => {
        setSelectedItem(item)
      })

      markersRef.current.push(marker)
    })

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [filteredItems])

  const getMarkerIcon = (type: string, attractionType?: string) => {
    let bgColor = "bg-primary"
    let icon = "tree"

    switch (type) {
      case "reserve":
        bgColor = "bg-green-600"
        icon = "🌲"
        break
      case "accommodation":
        bgColor = "bg-amber-600"
        icon = "🏠"
        break
      case "experience":
        bgColor = "bg-blue-600"
        icon = "🧭"
        break
      case "attraction":
        bgColor = "bg-purple-600"
        switch (attractionType) {
          case "viewpoint":
            icon = "👁"
            break
          case "waterfall":
            icon = "💧"
            break
          case "heritage":
            icon = "🏛"
            break
          case "natural":
            icon = "⛰"
            break
          case "garden":
            icon = "🌸"
            break
          case "sanctuary":
            icon = "🐒"
            break
          default:
            icon = "📍"
        }
        break
    }

    return `<div class="w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white text-lg">${icon}</div>`
  }

  const getTypeIcon = (type: string, attractionType?: string) => {
    switch (type) {
      case "reserve":
        return <Tree className="h-4 w-4" />
      case "accommodation":
        return <Home className="h-4 w-4" />
      case "experience":
        return <Compass className="h-4 w-4" />
      case "attraction":
        switch (attractionType) {
          case "viewpoint":
            return <Camera className="h-4 w-4" />
          case "waterfall":
            return <Waves className="h-4 w-4" />
          case "heritage":
            return <Building2 className="h-4 w-4" />
          case "natural":
            return <Mountain className="h-4 w-4" />
          case "garden":
            return <Flower2 className="h-4 w-4" />
          default:
            return <MapPin className="h-4 w-4" />
        }
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getDetailLink = (item: MapItem) => {
    switch (item.type) {
      case "reserve":
        return `/reserves/${item.slug}`
      case "accommodation":
        return `/accommodation/${item.slug}`
      case "experience":
        return `/experiences/${item.slug}`
      default:
        return `/explore`
    }
  }

  const getBookingLink = (item: MapItem) => {
    switch (item.type) {
      case "reserve":
        return `/reserves/${item.slug}#booking`
      case "accommodation":
        return `/checkout?type=accommodation&id=${item.id}`
      case "experience":
        return `/checkout?type=experience&id=${item.id}`
      default:
        return `/explore`
    }
  }

  return (
    <div className="relative h-full w-full">
      {/* Map container */}
      <div ref={mapRef} className="h-full w-full z-0" />

      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Selected item popup */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card rounded-xl shadow-2xl border z-[1000] overflow-hidden">
          <div className="relative">
            <div className="relative h-40 w-full">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge
                className="absolute top-3 left-3"
                variant={selectedItem.type === "reserve" ? "default" : "secondary"}
              >
                <span className="flex items-center gap-1">
                  {getTypeIcon(selectedItem.type, selectedItem.attractionType)}
                  {selectedItem.type === "attraction"
                    ? selectedItem.attractionType
                    : selectedItem.type}
                </span>
              </Badge>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-serif text-lg font-bold mb-1">{selectedItem.name}</h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3" />
                <span>{selectedItem.location || selectedItem.region}</span>
              </div>

              {selectedItem.rating && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{selectedItem.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({selectedItem.reviewCount} reviews)
                  </span>
                </div>
              )}

              {selectedItem.duration && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" />
                  <span>{selectedItem.duration}</span>
                </div>
              )}

              {selectedItem.accessible && (
                <div className="flex items-center gap-1 text-sm text-green-600 mb-2">
                  <Accessibility className="h-3 w-3" />
                  <span>Accessible</span>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {selectedItem.shortDescription || selectedItem.description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  {(selectedItem.priceFrom || selectedItem.price || selectedItem.pricePerNight) && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">From </span>
                      <span className="font-bold text-primary">
                        R{selectedItem.priceFrom || selectedItem.price || selectedItem.pricePerNight}
                      </span>
                      {selectedItem.type === "accommodation" && (
                        <span className="text-muted-foreground">/night</span>
                      )}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={getDetailLink(selectedItem)}>
                    <Button variant="outline" size="sm">
                      Details
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                  {selectedItem.type !== "attraction" && (
                    <Link href={getBookingLink(selectedItem)}>
                      <Button size="sm">Book</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur rounded-lg p-3 shadow-lg border z-[1000]">
        <p className="text-xs font-medium mb-2">Legend</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full" />
            <span>Nature Reserves</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-600 rounded-full" />
            <span>Accommodation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full" />
            <span>Experiences</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full" />
            <span>Attractions</span>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur rounded-lg px-3 py-2 shadow-lg border z-[1000]">
        <p className="text-sm">
          <span className="font-bold">{filteredItems.length}</span> places found
        </p>
      </div>

      {/* Custom marker styles */}
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  )
}
