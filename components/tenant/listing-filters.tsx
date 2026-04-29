"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterConfig {
  search?: string
  category?: string
  priceRange?: [number, number]
  sortBy?: string
}

interface ListingFiltersProps {
  filters: FilterConfig
  onFilterChange: (filters: FilterConfig) => void
  categories: string[]
  showPrice?: boolean
  maxPrice?: number
  className?: string
  accentColor?: string
}

export function ListingFilters({
  filters,
  onFilterChange,
  categories,
  showPrice = true,
  maxPrice = 10000,
  className,
  accentColor,
}: ListingFiltersProps) {
  const hasActiveFilters =
    filters.search ||
    filters.category ||
    (filters.priceRange && filters.priceRange[0] > 0) ||
    (filters.priceRange && filters.priceRange[1] < maxPrice)

  const clearFilters = () => {
    onFilterChange({
      search: "",
      category: undefined,
      priceRange: undefined,
      sortBy: filters.sortBy,
    })
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            className="pl-9"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                category: value === "all" ? undefined : value,
              })
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Price Filter */}
        {showPrice && (
          <Select
            value={
              filters.priceRange
                ? `${filters.priceRange[0]}-${filters.priceRange[1]}`
                : "all"
            }
            onValueChange={(value) => {
              if (value === "all") {
                onFilterChange({ ...filters, priceRange: undefined })
              } else {
                const [min, max] = value.split("-").map(Number)
                onFilterChange({ ...filters, priceRange: [min, max] })
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-500">Under $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
              <SelectItem value={`5000-${maxPrice}`}>$5,000+</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Sort */}
        <Select
          value={filters.sortBy || "default"}
          onValueChange={(value) =>
            onFilterChange({
              ...filters,
              sortBy: value === "default" ? undefined : value,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}

// Utility function to filter items
export function applyFilters<
  T extends {
    name: string
    short_description?: string
    category?: string
    price_from?: number
  }
>(items: T[], filters: FilterConfig): T[] {
  let filtered = [...items]

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.short_description?.toLowerCase().includes(searchLower)
    )
  }

  // Category filter
  if (filters.category) {
    filtered = filtered.filter((item) => item.category === filters.category)
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange
    filtered = filtered.filter(
      (item) =>
        item.price_from !== undefined &&
        item.price_from >= min &&
        item.price_from <= max
    )
  }

  // Sort
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.price_from || 0) - (b.price_from || 0))
        break
      case "price-desc":
        filtered.sort((a, b) => (b.price_from || 0) - (a.price_from || 0))
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
  }

  return filtered
}
