"use client"

import Link from "next/link"
import { Star, MapPin, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { reserves } from "@/lib/data"
import { useTranslation } from "@/lib/translation-context"

export function FeaturedReserves() {
  const { t } = useTranslation()
  const featuredReserves = reserves.filter((r) => r.featured)

  return (
    <section className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-3">
              {t("featured.title")}
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{t("featured.title")}</h2>
            <p className="text-muted-foreground max-w-xl">{t("featured.subtitle")}</p>
          </div>
          <Link href="/reserves">
            <Button variant="outline" className="gap-2 bg-transparent">
              {t("featured.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredReserves.map((reserve) => (
            <Link
              key={reserve.id}
              href={`/reserves/${reserve.slug}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={reserve.image || "/placeholder.svg"}
                  alt={reserve.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-foreground" />
                </button>
                {reserve.familyFriendly && (
                  <Badge className="absolute top-3 left-3 bg-primary">{t("common.popular")}</Badge>
                )}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{reserve.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({reserve.reviewCount} {t("common.reviews")})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{t("featured.from")}</span>
                    <span className="block font-semibold text-primary">R{reserve.priceFrom.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
