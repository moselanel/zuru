"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Star, MapPin, Heart, Users, Bed, Bath, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { accommodations, reserves } from "@/lib/data"

const accommodationTypes = ["Lodge", "Camp", "Chalet", "Suite", "Tent", "Cottage"]

export function AccommodationListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedReserve, setSelectedReserve] = useState<string | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [guestCount, setGuestCount] = useState<number | null>(null)

  const filteredAccommodations = useMemo(() => {
    let filtered = [...accommodations]

    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.reserveName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedReserve) {
      filtered = filtered.filter((a) => a.reserveId === selectedReserve)
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((a) => selectedTypes.includes(a.type))
    }

    if (guestCount) {
      filtered = filtered.filter((a) => a.maxCapacity >= guestCount)
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight)
        break
      case "price-high":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return filtered
  }, [searchQuery, selectedReserve, selectedTypes, guestCount, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedReserve(null)
    setSelectedTypes([])
    setGuestCount(null)
  }

  const activeFiltersCount = [selectedReserve, selectedTypes.length > 0, guestCount].filter(Boolean).length

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accommodation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Reserve
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem checked={!selectedReserve} onCheckedChange={() => setSelectedReserve(null)}>
                  All Reserves
                </DropdownMenuCheckboxItem>
                {reserves.map((reserve) => (
                  <DropdownMenuCheckboxItem
                    key={reserve.id}
                    checked={selectedReserve === reserve.id}
                    onCheckedChange={() => setSelectedReserve(reserve.id)}
                  >
                    {reserve.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Type
                  {selectedTypes.length > 0 && <Badge variant="secondary">{selectedTypes.length}</Badge>}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {accommodationTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      setSelectedTypes(checked ? [...selectedTypes, type] : selectedTypes.filter((t) => t !== type))
                    }}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={guestCount?.toString() || "any"} onValueChange={(v) => setGuestCount(v ? Number(v) : null)}>
              <SelectTrigger className="w-32">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="6">6+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedReserve && (
              <Badge variant="secondary" className="gap-1 pl-3">
                {reserves.find((r) => r.id === selectedReserve)?.name}
                <button onClick={() => setSelectedReserve(null)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTypes.map((type) => (
              <Badge key={type} variant="secondary" className="gap-1 pl-3">
                {type}
                <button
                  onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {guestCount && (
              <Badge variant="secondary" className="gap-1 pl-3">
                {guestCount}+ Guests
                <button onClick={() => setGuestCount(null)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              Clear all
            </Button>
          </div>
        )}

        {/* Results */}
        <p className="text-muted-foreground mb-6">
          {filteredAccommodations.length} {filteredAccommodations.length === 1 ? "property" : "properties"} found
        </p>

        {filteredAccommodations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No accommodation matches your filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccommodations.map((acc) => (
              <Link
                key={acc.id}
                href={`/accommodation/${acc.slug}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={acc.image || "/placeholder.svg"}
                    alt={acc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4 text-foreground" />
                  </button>
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">{acc.type}</Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {acc.reserveName}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {acc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{acc.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {acc.bedrooms} Bed
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {acc.bathrooms} Bath
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {acc.maxCapacity} Guests
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{acc.rating}</span>
                      <span className="text-muted-foreground text-sm">({acc.reviewCount})</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-semibold text-primary">R{acc.pricePerNight.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">per night</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
