"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Users, Globe, Heart, Lightbulb, Target } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Africa First",
    description: "We build for African destinations, understanding the unique challenges and opportunities of our continent.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Tourism should benefit local communities. We help destinations tell authentic stories that drive sustainable travel.",
  },
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    description: "We leverage AI and modern technology to solve real problems, not just follow trends.",
  },
  {
    icon: Target,
    title: "Results Focused",
    description: "Every feature we build is designed to drive more visitors, more enquiries, and more bookings.",
  },
]

const stats = [
  { value: "15+", label: "African Countries Targeted" },
  { value: "2026", label: "Founded" },
  { value: "100%", label: "Africa Focused" },
  { value: "1", label: "Big Mission" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Our Story
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zuru-sand md:text-5xl lg:text-6xl">
              Built in Africa,{" "}
              <span className="text-zuru-sunset">for Africa</span>
            </h1>
            <p className="text-lg text-zuru-sand/80 md:text-xl">
              We started Zuru because we saw world-class African destinations struggling 
              with outdated websites and fragmented tools. Our mission is to give every 
              tourism board and DMC the technology they need to compete globally.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-zuru-ink/10 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-zuru-sunset md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-zuru-ink/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-zuru-ink">Our Mission</h2>
              <p className="text-lg text-zuru-ink/70">
                To empower African destinations with world-class digital tools that 
                showcase their unique beauty, connect them with global travelers, and 
                drive sustainable tourism growth.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zuru-sunset/10">
                  <Globe className="h-6 w-6 text-zuru-sunset" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-zuru-ink">
                    Why We Exist
                  </h3>
                  <p className="text-zuru-ink/70">
                    Africa receives only 5% of global tourism despite having some of the 
                    world&apos;s most incredible destinations. A big part of this gap is digital — 
                    travelers can&apos;t find, explore, or book African experiences as easily as 
                    they can elsewhere. We&apos;re changing that.
                  </p>
                  <p className="mt-4 text-zuru-ink/70">
                    By giving tourism boards and DMCs the same caliber of technology used by 
                    leading global destinations, we&apos;re leveling the playing field and helping 
                    Africa claim its rightful place on the world tourism stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-zuru-ink">Our Values</h2>
            <p className="mx-auto max-w-2xl text-zuru-ink/70">
              These principles guide everything we build and every partnership we form.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title} className="border-zuru-ink/10">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zuru-sunset/10">
                    <value.icon className="h-6 w-6 text-zuru-sunset" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-zuru-ink">
                    {value.title}
                  </h3>
                  <p className="text-zuru-ink/70">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-zuru-ink">Our Team</h2>
            <p className="mx-auto max-w-2xl text-zuru-ink/70">
              We&apos;re building a passionate team of tourism experts, engineers, and designers 
              who share our vision for African travel. Our team is growing — check back soon 
              to meet the people behind Zuru.
            </p>
          </div>

          <div className="mx-auto max-w-xl">
            <Card className="border-zuru-ink/10 bg-gradient-to-br from-zuru-sunset/5 to-zuru-amber/5">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zuru-sunset/10">
                  <Users className="h-8 w-8 text-zuru-sunset" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-zuru-ink">
                  Growing Our Team
                </h3>
                <p className="text-zuru-ink/70">
                  We&apos;re on an exciting journey and looking for talented individuals who are 
                  passionate about African tourism and technology. Visit our careers page to 
                  see upcoming opportunities.
                </p>
                <Link href="/careers" className="mt-4 inline-block">
                  <Button variant="outline" className="border-zuru-sunset text-zuru-sunset hover:bg-zuru-sunset/10">
                    View Careers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zuru-sunset/10">
                <MapPin className="h-8 w-8 text-zuru-sunset" />
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-zuru-ink">
              Headquartered in Johannesburg
            </h2>
            <p className="mb-8 text-zuru-ink/70">
              Based in the heart of South Africa&apos;s economic hub, we&apos;re perfectly positioned 
              to serve destinations across the continent. We&apos;re actively expanding our presence 
              to other African countries soon — building a network of local teams who understand 
              the unique tourism landscape of each region.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-zuru-sand">
              Ready to transform your destination?
            </h2>
            <p className="mb-8 text-zuru-sand/80">
              Join the growing community of African tourism leaders using Zuru to 
              showcase their destinations to the world.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset/90 sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full border-zuru-sand bg-zuru-sand/10 text-zuru-sand hover:bg-zuru-sand/20 sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
