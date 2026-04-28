"use client"

import Image from "next/image"
import { useTranslation } from "@/lib/translation-context"

export function EventsHero() {
  const { t } = useTranslation()

  return (
    <section className="relative h-80 md:h-96 -mt-20 pt-20 flex items-center justify-center">
      <div className="absolute inset-0">
        <Image src="/events-festival-hero.jpg" alt="Events in Mpumalanga" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t("events.hero.title")}</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">{t("events.hero.subtitle")}</p>
      </div>
    </section>
  )
}
