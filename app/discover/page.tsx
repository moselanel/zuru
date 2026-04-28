"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MapFilters } from "@/components/discover/map-filters"
import { ListView } from "@/components/discover/list-view"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { reserves, accommodations, experiences, attractions } from "@/lib/data"
import { Map, List, SlidersHorizontal, ArrowLeft, Home } from "lucide-react"
import { MTPALogo } from "@/components/mtpa-logo"

// Dynamically import the map component to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(
  () => import("@/components/discover/interactive-map").then((mod) => mod.InteractiveMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    ),
  }
)

export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState({
    types: [] as string[],
    regions: [] as string[],
    priceRange: [0, 5000] as [number, number],
    accessible: false,
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Custom header for Discover page */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back button and logo */}
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <Link href="/" className="flex items-center gap-2">
                <MTPALogo className="h-8 w-8" />
                <span className="font-serif font-bold text-lg hidden md:inline">MTPA</span>
              </Link>
            </div>

            {/* Center: Title */}
            <div className="flex-1 text-center">
              <h1 className="font-serif text-lg md:text-xl font-bold">Discover Mpumalanga</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Explore parks, attractions, accommodation and experiences
              </p>
            </div>

            {/* Right: View toggle and filters */}
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="flex rounded-lg border bg-muted p-1">
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  className="px-2 sm:px-3"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Map</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="px-2 sm:px-3"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">List</span>
                </Button>
              </div>

              {/* Mobile filter button */}
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4" />
                    {(filters.types.length > 0 ||
                      filters.regions.length > 0 ||
                      filters.accessible ||
                      filters.priceRange[0] > 0 ||
                      filters.priceRange[1] < 5000) && (
                      <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {filters.types.length +
                          filters.regions.length +
                          (filters.accessible ? 1 : 0) +
                          (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <MapFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClose={() => setShowMobileFilters(false)}
                    isMobile
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

{/* Main content */}
        <div className="flex h-[calc(100vh-73px)]">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-80 border-r bg-card overflow-y-auto">
          <div className="p-4">
            <MapFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </aside>

        {/* Map or List view */}
        <div className="flex-1 relative">
          {viewMode === "map" ? (
            <InteractiveMap
              reserves={reserves}
              accommodations={accommodations}
              experiences={experiences}
              attractions={attractions}
              filters={filters}
            />
          ) : (
            <div className="h-full overflow-y-auto">
              <ListView
                reserves={reserves}
                accommodations={accommodations}
                experiences={experiences}
                attractions={attractions}
                filters={filters}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
