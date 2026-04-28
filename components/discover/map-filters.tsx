"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Trees as Tree, Home, Compass, MapPin, Filter, X, Accessibility, DollarSign, Map } from "lucide-react"

interface MapFiltersProps {
  filters: {
    types: string[]
    regions: string[]
    priceRange: [number, number]
    accessible: boolean
  }
  onFiltersChange: (filters: MapFiltersProps["filters"]) => void
  onClose?: () => void
  isMobile?: boolean
}

const itemTypes = [
  { id: "reserve", label: "Nature Reserves", icon: Tree },
  { id: "accommodation", label: "Accommodation", icon: Home },
  { id: "experience", label: "Experiences", icon: Compass },
  { id: "attraction", label: "Attractions", icon: MapPin },
]

const regions = [
  { id: "Panorama Route", label: "Panorama Route" },
  { id: "Lowveld", label: "Lowveld" },
  { id: "Highveld", label: "Highveld" },
  { id: "Barberton Valley", label: "Barberton Valley" },
]

export function MapFilters({ filters, onFiltersChange, onClose, isMobile }: MapFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleTypeToggle = (typeId: string) => {
    const newTypes = localFilters.types.includes(typeId)
      ? localFilters.types.filter((t) => t !== typeId)
      : [...localFilters.types, typeId]

    const newFilters = { ...localFilters, types: newTypes }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRegionToggle = (regionId: string) => {
    const newRegions = localFilters.regions.includes(regionId)
      ? localFilters.regions.filter((r) => r !== regionId)
      : [...localFilters.regions, regionId]

    const newFilters = { ...localFilters, regions: newRegions }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...localFilters, priceRange: [value[0], value[1]] as [number, number] }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleAccessibleToggle = () => {
    const newFilters = { ...localFilters, accessible: !localFilters.accessible }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters = {
      types: [],
      regions: [],
      priceRange: [0, 5000] as [number, number],
      accessible: false,
    }
    setLocalFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const activeFilterCount =
    localFilters.types.length +
    localFilters.regions.length +
    (localFilters.accessible ? 1 : 0) +
    (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 5000 ? 1 : 0)

  return (
    <div className={`h-full flex flex-col ${isMobile ? "p-4" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={["types", "regions", "price", "accessibility"]} className="space-y-2">
          {/* Interest Type */}
          <AccordionItem value="types" className="border rounded-lg px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="text-sm font-medium">Interest Type</span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-3">
                {itemTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={type.id}
                      checked={localFilters.types.includes(type.id)}
                      onCheckedChange={() => handleTypeToggle(type.id)}
                    />
                    <Label
                      htmlFor={type.id}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <type.icon className="h-4 w-4 text-muted-foreground" />
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Region */}
          <AccordionItem value="regions" className="border rounded-lg px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="text-sm font-medium flex items-center gap-2">
                <Map className="h-4 w-4" />
                Region
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-3">
                {regions.map((region) => (
                  <div key={region.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={region.id}
                      checked={localFilters.regions.includes(region.id)}
                      onCheckedChange={() => handleRegionToggle(region.id)}
                    />
                    <Label htmlFor={region.id} className="text-sm cursor-pointer">
                      {region.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Budget/Price */}
          <AccordionItem value="price" className="border rounded-lg px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={5000}
                  step={100}
                  value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R{localFilters.priceRange[0]}</span>
                  <span>R{localFilters.priceRange[1]}+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Accessibility */}
          <AccordionItem value="accessibility" className="border rounded-lg px-3">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="text-sm font-medium flex items-center gap-2">
                <Accessibility className="h-4 w-4" />
                Accessibility
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="accessible"
                  checked={localFilters.accessible}
                  onCheckedChange={handleAccessibleToggle}
                />
                <Label htmlFor="accessible" className="text-sm cursor-pointer">
                  Show only accessible locations
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer */}
      {activeFilterCount > 0 && (
        <div className="pt-4 mt-4 border-t">
          <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
