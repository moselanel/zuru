"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, Languages, Award, MapPin, Calendar } from "lucide-react"
import { useTranslation } from "@/lib/translation-context"

const guides = [
  {
    slug: "themba-mkhize",
    name: "Themba Mkhize",
    specialty: "Wildlife Safari",
    languages: ["English", "Zulu", "Swati"],
    rating: 4.9,
    reviews: 234,
    image: "/guide-themba.jpg",
    location: "Kruger National Park Area",
    experience: "15",
    bio: "Born and raised near Kruger, Themba has an unmatched knowledge of wildlife behavior and tracking.",
  },
  {
    slug: "lindiwe-dlamini",
    name: "Lindiwe Dlamini",
    specialty: "Cultural Tours",
    languages: ["English", "Swati", "Tsonga"],
    rating: 4.8,
    reviews: 189,
    image: "/guide-lindiwe.jpg",
    location: "Panorama Route",
    experience: "12",
    bio: "Lindiwe shares the rich cultural heritage of Mpumalanga through storytelling and community visits.",
  },
  {
    slug: "johan-van-der-berg",
    name: "Johan van der Berg",
    specialty: "Adventure & Hiking",
    languages: ["English", "Afrikaans"],
    rating: 4.9,
    reviews: 312,
    image: "/guide-johan.jpg",
    location: "Blyde River Canyon",
    experience: "18",
    bio: "An expert mountaineer and naturalist, Johan leads unforgettable hikes through Mpumalanga's dramatic landscapes.",
  },
  {
    slug: "nomsa-nkosi",
    name: "Nomsa Nkosi",
    specialty: "Bird Watching",
    languages: ["English", "Zulu", "Ndebele"],
    rating: 4.7,
    reviews: 156,
    image: "/guide-nomsa.jpg",
    location: "Lowveld Region",
    experience: "10",
    bio: "A passionate ornithologist, Nomsa has documented over 400 bird species across the region.",
  },
  {
    slug: "pieter-botha",
    name: "Pieter Botha",
    specialty: "Photography Safari",
    languages: ["English", "Afrikaans", "German"],
    rating: 4.9,
    reviews: 278,
    image: "/guide-pieter.jpg",
    location: "Greater Kruger Area",
    experience: "20",
    bio: "Award-winning wildlife photographer who helps guests capture stunning images of African wildlife.",
  },
  {
    slug: "thandi-mokoena",
    name: "Thandi Mokoena",
    specialty: "Historical Tours",
    languages: ["English", "Sotho", "Zulu"],
    rating: 4.8,
    reviews: 198,
    image: "/guide-thandi.jpg",
    location: "Barberton & Pilgrim's Rest",
    experience: "14",
    bio: "Thandi brings history to life with tours of gold rush towns and ancient geological sites.",
  },
]

export function GuidesListing() {
  const { t } = useTranslation()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {guides.map((guide) => (
            <div
              key={guide.slug}
              className="bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-bold mb-1">{guide.name}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{guide.specialty}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{guide.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{guide.bio}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold">{guide.rating}</span>
                    <span className="text-muted-foreground text-sm">({guide.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {guide.experience} {t("guides.experience")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <Languages className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{guide.languages.join(", ")}</span>
                </div>

                <Button className="w-full" asChild>
                  <Link href={`/guides/${guide.slug}`}>{t("guides.viewProfile")}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-4">Become a Registered Guide</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Are you a certified tour guide? Join our network and connect with visitors from around the world.
          </p>
          <Button size="lg" asChild>
            <Link href="/guides/register">Register as Guide</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
