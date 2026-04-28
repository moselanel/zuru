"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  MapPin,
  Heart,
  ChevronDown,
  X,
  Users,
  Accessibility,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { reserves, regions } from "@/lib/data"

const activities = ["Hiking", "Game Drives", "Bird Watching", "Boat Cruises", "4x4 Trails", "Fishing", "Photography"]
const wildlife = ["Big Five", "Lions", "Elephants", "Rhinos", "Hippos", "Zebras", "Giraffes"]

export function ReservesListing() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [familyFriendly, setFamilyFriendly] = useState(false)
  const [accessible, setAccessible] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  const filteredReserves = useMemo(() => {
    let filtered = [...reserves]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Region filter
    if (selectedRegion) {
      filtered = filtered.filter((r) => r.region.toLowerCase().includes(selectedRegion.toLowerCase()))
    }

    // Activities filter
    if (selectedActivities.length > 0) {
      filtered = filtered.filter((r) =>
        selectedActivities.some((activity) =>
          r.activities.some((a) => a.toLowerCase().includes(activity.toLowerCase())),
        ),
      )
    }

    // Family friendly filter
    if (familyFriendly) {
      filtered = filtered.filter((r) => r.familyFriendly)
    }

    // Accessible filter
    if (accessible) {
      filtered = filtered.filter((r) => r.accessible)
    }

    // Price filter
    filtered = filtered.filter((r) => r.priceFrom >= priceRange[0] && r.priceFrom <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.priceFrom - b.priceFrom)
        break
      case "price-high":
        filtered.sort((a, b) => b.priceFrom - a.priceFrom)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popularity":
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return filtered
  }, [searchQuery, selectedRegion, selectedActivities, familyFriendly, accessible, priceRange, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedRegion(null)
    setSelectedActivities([])
    setFamilyFriendly(false)
    setAccessible(false)
    setPriceRange([0, 5000])
  }

  const activeFiltersCount = [
    selectedRegion,
    selectedActivities.length > 0,
    familyFriendly,
    accessible,
    priceRange[0] > 0 || priceRange[1] < 5000,
  ].filter(Boolean).length

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reserves..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden gap-2 bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <FilterContent
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedActivities={selectedActivities}
                    setSelectedActivities={setSelectedActivities}
                    familyFriendly={familyFriendly}
                    setFamilyFriendly={setFamilyFriendly}
                    accessible={accessible}
                    setAccessible={setAccessible}
                  />
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
                    Clear All
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-1">Apply</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    Region
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuCheckboxItem checked={!selectedRegion} onCheckedChange={() => setSelectedRegion(null)}>
                    All Regions
                  </DropdownMenuCheckboxItem>
                  {regions.map((region) => (
                    <DropdownMenuCheckboxItem
                      key={region.id}
                      checked={selectedRegion === region.name}
                      onCheckedChange={() => setSelectedRegion(region.name)}
                    >
                      {region.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    Activities
                    {selectedActivities.length > 0 && <Badge variant="secondary">{selectedActivities.length}</Badge>}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {activities.map((activity) => (
                    <DropdownMenuCheckboxItem
                      key={activity}
                      checked={selectedActivities.includes(activity)}
                      onCheckedChange={(checked) => {
                        setSelectedActivities(
                          checked
                            ? [...selectedActivities, activity]
                            : selectedActivities.filter((a) => a !== activity),
                        )
                      }}
                    >
                      {activity}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={familyFriendly ? "default" : "outline"}
                className="gap-2"
                onClick={() => setFamilyFriendly(!familyFriendly)}
              >
                <Users className="h-4 w-4" />
                Family Friendly
              </Button>

              <Button
                variant={accessible ? "default" : "outline"}
                className="gap-2"
                onClick={() => setAccessible(!accessible)}
              >
                <Accessibility className="h-4 w-4" />
                Accessible
              </Button>
            </div>

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

            <div className="hidden sm:flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedRegion && (
              <Badge variant="secondary" className="gap-1 pl-3">
                {selectedRegion}
                <button onClick={() => setSelectedRegion(null)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedActivities.map((activity) => (
              <Badge key={activity} variant="secondary" className="gap-1 pl-3">
                {activity}
                <button
                  onClick={() => setSelectedActivities(selectedActivities.filter((a) => a !== activity))}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {familyFriendly && (
              <Badge variant="secondary" className="gap-1 pl-3">
                Family Friendly
                <button onClick={() => setFamilyFriendly(false)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {accessible && (
              <Badge variant="secondary" className="gap-1 pl-3">
                Accessible
                <button onClick={() => setAccessible(false)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              Clear all
            </Button>
          </div>
        )}

        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          {filteredReserves.length} {filteredReserves.length === 1 ? "reserve" : "reserves"} found
        </p>

        {/* Results Grid/List */}
        {filteredReserves.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No reserves match your filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReserves.map((reserve) => (
              <ReserveCard key={reserve.id} reserve={reserve} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredReserves.map((reserve) => (
              <ReserveListItem key={reserve.id} reserve={reserve} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FilterContent({
  selectedRegion,
  setSelectedRegion,
  selectedActivities,
  setSelectedActivities,
  familyFriendly,
  setFamilyFriendly,
  accessible,
  setAccessible,
}: {
  selectedRegion: string | null
  setSelectedRegion: (value: string | null) => void
  selectedActivities: string[]
  setSelectedActivities: (value: string[]) => void
  familyFriendly: boolean
  setFamilyFriendly: (value: boolean) => void
  accessible: boolean
  setAccessible: (value: boolean) => void
}) {
  return (
    <>
      <div>
        <h3 className="font-semibold mb-3">Region</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <label key={region.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedRegion === region.name}
                onCheckedChange={(checked) => setSelectedRegion(checked ? region.name : null)}
              />
              <span className="text-sm">{region.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Activities</h3>
        <div className="space-y-2">
          {activities.map((activity) => (
            <label key={activity} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedActivities.includes(activity)}
                onCheckedChange={(checked) => {
                  setSelectedActivities(
                    checked ? [...selectedActivities, activity] : selectedActivities.filter((a) => a !== activity),
                  )
                }}
              />
              <span className="text-sm">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Amenities</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={familyFriendly} onCheckedChange={(c) => setFamilyFriendly(!!c)} />
            <span className="text-sm">Family Friendly</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={accessible} onCheckedChange={(c) => setAccessible(!!c)} />
            <span className="text-sm">Wheelchair Accessible</span>
          </label>
        </div>
      </div>
    </>
  )
}

function ReserveCard({ reserve }: { reserve: (typeof reserves)[0] }) {
  return (
    <Link
      href={`/reserves/${reserve.slug}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={reserve.image || "/placeholder.svg"}
          alt={reserve.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4 text-foreground" />
        </button>
        {reserve.familyFriendly && <Badge className="absolute top-3 left-3 bg-primary">Family Friendly</Badge>}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5" />
          {reserve.location}
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {reserve.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{reserve.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {reserve.activities.slice(0, 3).map((activity) => (
            <Badge key={activity} variant="outline" className="text-xs">
              {activity}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{reserve.rating}</span>
            <span className="text-muted-foreground text-sm">({reserve.reviewCount})</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="block font-semibold text-primary">R{reserve.priceFrom.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ReserveListItem({ reserve }: { reserve: (typeof reserves)[0] }) {
  return (
    <Link
      href={`/reserves/${reserve.slug}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-80 aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0">
        <img
          src={reserve.image || "/placeholder.svg"}
          alt={reserve.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4 text-foreground" />
        </button>
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <MapPin className="h-3.5 w-3.5" />
              {reserve.location} • {reserve.region}
            </div>
            <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
              {reserve.name}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="block text-xl font-semibold text-primary">R{reserve.priceFrom.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">{reserve.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {reserve.activities.map((activity) => (
            <Badge key={activity} variant="outline" className="text-xs">
              {activity}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{reserve.rating}</span>
              <span className="text-muted-foreground text-sm">({reserve.reviewCount} reviews)</span>
            </div>
            {reserve.familyFriendly && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Family Friendly
              </div>
            )}
            {reserve.accessible && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Accessibility className="h-4 w-4" />
                Accessible
              </div>
            )}
          </div>
          <Button>Book Now</Button>
        </div>
      </div>
    </Link>
  )
}
