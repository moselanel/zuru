"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, Clock, Trees as Tree, Home, Compass, Mountain, Camera, Waves, Building2, Flower2, Accessibility, ChevronRight } from "lucide-react"
import type { reserves, accommodations, experiences, attractions } from "@/lib/data"

type Reserve = (typeof reserves)[number]
type Accommodation = (typeof accommodations)[number]
type Experience = (typeof experiences)[number]
type Attraction = (typeof attractions)[number]

interface ListViewProps {
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

type ListItem = {
  id: string
  name: string
  type: "reserve" | "accommodation" | "experience" | "attraction"
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

export function ListView({
  reserves,
  accommodations,
  experiences,
  attractions,
  filters,
}: ListViewProps) {
  // Combine all items
  const allItems: ListItem[] = [
    ...reserves.map((r) => ({
      ...r,
      type: "reserve" as const,
    })),
    ...accommodations.map((a) => ({
      ...a,
      type: "accommodation" as const,
      priceFrom: a.pricePerNight,
    })),
    ...experiences.map((e) => ({
      ...e,
      type: "experience" as const,
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
    if (filters.types.length > 0 && !filters.types.includes(item.type)) {
      return false
    }
    if (filters.regions.length > 0 && item.region && !filters.regions.includes(item.region)) {
      return false
    }
    const price = item.priceFrom || item.price || item.pricePerNight || 0
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false
    }
    if (filters.accessible && item.accessible === false) {
      return false
    }
    return true
  })

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

  const getDetailLink = (item: ListItem) => {
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

  const getBookingLink = (item: ListItem) => {
    switch (item.type) {
      case "accommodation":
        return `/checkout?type=accommodation&id=${item.id}`
      case "experience":
        return `/checkout?type=experience&id=${item.id}`
      default:
        return `/reserves/${item.slug}#booking`
    }
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your filters to find more places to explore in Mpumalanga.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{filteredItems.length}</span> results
      </p>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={`${item.type}-${item.id}`} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <Badge
                    className="absolute top-2 left-2"
                    variant={item.type === "reserve" ? "default" : "secondary"}
                  >
                    <span className="flex items-center gap-1">
                      {getTypeIcon(item.type, item.attractionType)}
                      {item.type === "attraction" ? item.attractionType : item.type}
                    </span>
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location || item.region}</span>
                        {item.accessible && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="flex items-center gap-1 text-green-600">
                              <Accessibility className="h-3 w-3" />
                              Accessible
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-sm">{item.rating}</span>
                            <span className="text-muted-foreground text-xs">
                              ({item.reviewCount})
                            </span>
                          </div>
                        )}
                        {item.duration && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{item.duration}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.shortDescription || item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div>
                        {(item.priceFrom || item.price || item.pricePerNight) && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">From </span>
                            <span className="font-bold text-lg text-primary">
                              R{item.priceFrom || item.price || item.pricePerNight}
                            </span>
                            {item.type === "accommodation" && (
                              <span className="text-muted-foreground">/night</span>
                            )}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link href={getDetailLink(item)}>
                          <Button variant="outline" size="sm">
                            View Details
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                        {item.type !== "attraction" && (
                          <Link href={getBookingLink(item)}>
                            <Button size="sm">Book Now</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
