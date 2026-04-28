"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Sparkles, Heart, Globe, Coffee, MapPin, Mail } from "lucide-react"

const perks = [
  {
    icon: Globe,
    title: "Work From Anywhere",
    description: "We're a remote-first company. Work from your favorite coffee shop, home office, or beach.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical aid and wellness programs to keep you at your best.",
  },
  {
    icon: Coffee,
    title: "Learning Budget",
    description: "Annual learning stipend for courses, conferences, and books to grow your skills.",
  },
  {
    icon: MapPin,
    title: "Travel Perks",
    description: "Experience the destinations we serve with travel credits and familiarization trips.",
  },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Join Our Team
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zuru-sand md:text-5xl lg:text-6xl">
              Help us put Africa on the{" "}
              <span className="text-zuru-sunset">world map</span>
            </h1>
            <p className="text-lg text-zuru-sand/80 md:text-xl">
              We&apos;re building the future of African tourism technology. 
              Come join us on this exciting journey.
            </p>
          </div>
        </div>
      </section>

      {/* No Openings - Fun Message */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="border-zuru-ink/10 bg-gradient-to-br from-zuru-sunset/5 to-zuru-amber/5">
              <CardContent className="p-12 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zuru-sunset/10">
                  <Sparkles className="h-10 w-10 text-zuru-sunset" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-zuru-ink">
                  Great Things Are Brewing!
                </h2>
                <p className="mb-6 text-lg text-zuru-ink/70">
                  We don&apos;t have any open positions right now, but we&apos;re growing fast 
                  and new opportunities are always around the corner.
                </p>
                <p className="mb-8 text-zuru-ink/70">
                  If you&apos;re passionate about African tourism, technology, and making 
                  a real impact — we&apos;d love to hear from you. Drop us a line and tell 
                  us what makes you tick. We keep all applications on file and reach 
                  out when the right role opens up.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <a href="mailto:info@azizes.co.za?subject=Career Inquiry at Zuru">
                    <Button size="lg" className="bg-zuru-sunset text-white hover:bg-zuru-sunset/90">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Us Your CV
                    </Button>
                  </a>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="border-zuru-ink/20 text-zuru-ink hover:bg-zuru-ink/5">
                      Learn About Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-zuru-ink">Why You&apos;ll Love Working Here</h2>
            <p className="mx-auto max-w-2xl text-zuru-ink/70">
              When we do have openings, here&apos;s what you can look forward to.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {perks.map((perk) => (
              <Card key={perk.title} className="border-zuru-ink/10">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zuru-sunset/10">
                    <perk.icon className="h-6 w-6 text-zuru-sunset" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-zuru-ink">
                    {perk.title}
                  </h3>
                  <p className="text-zuru-ink/70">{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-zuru-ink">Stay Connected</h2>
            <p className="mb-6 text-zuru-ink/70">
              Follow us on LinkedIn to be the first to know when new positions open up. 
              We post behind-the-scenes content, team updates, and of course, job openings!
            </p>
            <p className="text-sm text-zuru-ink/50">
              Zuru is an equal opportunity employer. We celebrate diversity and are 
              committed to creating an inclusive environment for all team members.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
