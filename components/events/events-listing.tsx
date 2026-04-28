"use client"

import Image from "next/image"
import { Calendar, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { events } from "@/lib/data"
import { useTranslation } from "@/lib/translation-context"

export function EventsListing() {
  const { t } = useTranslation()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-muted">
                <Image 
                  src={event.image || "/placeholder.svg"} 
                  alt={event.name} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{event.category}</Badge>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString("en-ZA", { dateStyle: "long" })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>
                      {t("featured.from")} R{event.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button className="w-full">{t("common.bookNow")}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
