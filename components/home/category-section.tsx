"use client"

import type React from "react"
import Link from "next/link"
import { Trees, Home, Compass, Calendar, Briefcase, Users } from "lucide-react"
import { useTranslation } from "@/lib/translation-context"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees,
  Home,
  Compass,
  Calendar,
  Briefcase,
  Users,
}

export function CategorySection() {
  const { t } = useTranslation()

  const categories = [
    {
      id: "reserves",
      icon: "Trees",
      nameKey: "categories.natureReserves",
      descKey: "categories.natureReservesDesc",
      count: 12,
    },
    {
      id: "accommodation",
      icon: "Home",
      nameKey: "categories.accommodation",
      descKey: "categories.accommodationDesc",
      count: 45,
    },
    {
      id: "experiences",
      icon: "Compass",
      nameKey: "categories.experiences",
      descKey: "categories.experiencesDesc",
      count: 38,
    },
    { id: "events", icon: "Calendar", nameKey: "categories.events", descKey: "categories.eventsDesc", count: 15 },
    {
      id: "business",
      icon: "Briefcase",
      nameKey: "categories.businessTourism",
      descKey: "categories.businessTourismDesc",
      count: 8,
    },
    { id: "trade", icon: "Users", nameKey: "categories.travelTrade", descKey: "categories.travelTradeDesc", count: 20 },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("categories.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("categories.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Trees
            return (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className="group relative bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{t(category.nameKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(category.descKey)}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
