"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/translation-context"

export function CampaignBanner() {
  const { t } = useTranslation()

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="/summer-safari-promo.jpg"
            alt="Summer safari campaign"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-12 max-w-xl">
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
                {t("campaign.title")}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">{t("campaign.subtitle")}</h2>
              <p className="text-white/80 mb-6">{t("campaign.terms")}</p>
              <Link href="/offers">
                <Button size="lg" className="gap-2">
                  {t("campaign.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
