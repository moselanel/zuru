"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, Users, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/lib/translation-context"

export function HeroSection() {
  const [searchType, setSearchType] = useState("all")
  const { t } = useTranslation()

  const searchTabs = [
    { id: "all", label: t("hero.search") },
    { id: "reserves", label: t("nav.natureReserves") },
    { id: "accommodation", label: t("nav.accommodation") },
    { id: "experiences", label: t("nav.thingsToDo") },
  ]

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/blyde-river-canyon-south-africa-dramatic-green-can.jpg"
          alt="Blyde River Canyon scenic view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-pretty">{t("hero.subtitle")}</p>
        </div>

        {/* Search Bar */}
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6 max-w-5xl mx-auto">
          {/* Search Type Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {searchTabs.map((type) => (
              <button
                key={type.id}
                onClick={() => setSearchType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  searchType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">{t("common.location")}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t("hero.searchPlaceholder")} className="pl-10" />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">{t("common.duration")}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t("common.duration")} className="pl-10" />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                {t("checkout.guestDetails")}
              </label>
              <Select defaultValue="2">
                <SelectTrigger className="h-10">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={t("checkout.guestDetails")} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1 flex items-end">
              <Button className="w-full h-10 gap-2" size="lg">
                <Search className="h-4 w-4" />
                {t("hero.search")}
              </Button>
            </div>
          </div>

          {/* AI Trip Planner CTA */}
          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Not sure where to start? Let AI plan your perfect trip.
            </p>
            <Link href="/itinerary">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Sparkles className="h-4 w-4" />
                AI Trip Planner
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats - translated labels */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 text-white">
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold">12+</div>
            <div className="text-sm text-white/70">{t("nav.natureReserves")}</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold">45+</div>
            <div className="text-sm text-white/70">{t("nav.accommodation")}</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold">38+</div>
            <div className="text-sm text-white/70">{t("nav.thingsToDo")}</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold">50K+</div>
            <div className="text-sm text-white/70">{t("testimonials.subtitle")}</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
