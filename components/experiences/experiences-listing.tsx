"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Star, Clock, Zap, Users, ChevronDown, X, Plus } from "lucide-react"
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
import { experiences } from "@/lib/data"

const categories = ["Safari", "Adventure", "Culture", "Water"]
const intensities = ["Easy", "Moderate", "Challenging"]
const durations = ["Under 2 hours", "2-4 hours", "4-6 hours", "Full day"]

export function ExperiencesListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>("Any")
  const [priceRange, setPriceRange] = useState<string | null>("Any price")

  const filteredExperiences = useMemo(() => {
    let filtered = [...experiences]

    if (searchQuery) {
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((e) => selectedCategories.includes(e.category))
    }

    if (selectedIntensity !== "Any") {
      filtered = filtered.filter((e) => e.intensity === selectedIntensity)
    }

    if (priceRange !== "Any price") {
      filtered = filtered.filter((e) => {
        switch (priceRange) {
          case "budget":
            return e.price < 500
          case "mid":
            return e.price >= 500 && e.price < 1500
          case "premium":
            return e.price >= 1500
          default:
            return true
        }
      })
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "duration":
        filtered.sort((a, b) => {
          const getHours = (d: string) => Number.parseInt(d.split(" ")[0]) || 0
          return getHours(a.duration) - getHours(b.duration)
        })
        break
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return filtered
  }, [searchQuery, selectedCategories, selectedIntensity, priceRange, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedIntensity("Any")
    setPriceRange("Any price")
  }

  const activeFiltersCount = [
    selectedCategories.length > 0,
    selectedIntensity !== "Any",
    priceRange !== "Any price",
  ].filter(Boolean).length

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Category
                  {selectedCategories.length > 0 && <Badge variant="secondary">{selectedCategories.length}</Badge>}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories(
                        checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category),
                      )
                    }}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={selectedIntensity || ""} onValueChange={(v) => setSelectedIntensity(v || "Any")}>
              <SelectTrigger className="w-32">
                <Zap className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                {intensities.map((intensity) => (
                  <SelectItem key={intensity} value={intensity}>
                    {intensity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange || ""} onValueChange={(v) => setPriceRange(v || "Any price")}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any price">Any price</SelectItem>
                <SelectItem value="budget">Under R500</SelectItem>
                <SelectItem value="mid">R500 - R1,500</SelectItem>
                <SelectItem value="premium">R1,500+</SelectItem>
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
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="gap-1 pl-3">
                {category}
                <button
                  onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedIntensity !== "Any" && (
              <Badge variant="secondary" className="gap-1 pl-3">
                {selectedIntensity}
                <button onClick={() => setSelectedIntensity("Any")} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {priceRange !== "Any price" && (
              <Badge variant="secondary" className="gap-1 pl-3">
                {priceRange === "budget" ? "Under R500" : priceRange === "mid" ? "R500-R1,500" : "R1,500+"}
                <button onClick={() => setPriceRange("Any price")} className="ml-1 hover:text-destructive">
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
          {filteredExperiences.length} {filteredExperiences.length === 1 ? "experience" : "experiences"} found
        </p>

        {filteredExperiences.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No experiences match your filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <Link
                key={experience.id}
                href={`/experiences/${experience.slug}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                    {experience.category}
                  </Badge>
                  <button
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      // Add to trip functionality
                    }}
                  >
                    <Plus className="h-4 w-4 text-foreground" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {experience.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{experience.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      {experience.intensity}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Max {experience.maxParticipants}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{experience.rating}</span>
                      <span className="text-muted-foreground text-sm">({experience.reviewCount})</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-semibold text-primary">R{experience.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">per person</span>
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
