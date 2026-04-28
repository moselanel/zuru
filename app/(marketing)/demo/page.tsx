import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Globe, Sparkles } from "lucide-react"

const demoTenants = [
  {
    name: "South African Tourism",
    slug: "southafrica",
    description: "Discover the Rainbow Nation - from Table Mountain and the Garden Route to Kruger safaris, Cape Winelands, and vibrant cities like Cape Town and Johannesburg.",
    region: "Southern Africa",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
    features: ["Safari & Wildlife", "Cape Town", "Garden Route", "Winelands"],
  },
  {
    name: "Visit Rwanda",
    slug: "visitrwanda",
    description: "Experience the land of a thousand hills with gorilla trekking, vibrant Kigali, and stunning lake views. Rwanda is Africa's most remarkable conservation success story, offering unforgettable wildlife encounters and warm hospitality.",
    region: "East Africa",
    image: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=800",
    features: ["Gorilla Trekking", "Lake Kivu", "Cultural Immersion"],
  },
]

export default function DemoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-zuru-sand/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Live Demos
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-zuru-ink sm:text-5xl">
              See Zuru in action
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              Explore our demo destination portals to see how Zuru can transform your tourism presence.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink">
              What you&apos;ll see
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              Our demo portals showcase the full Zuru experience.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-zuru-sand-dark/20">
              <CardHeader>
                <CardTitle className="text-lg text-zuru-ink">Destination Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Beautiful destination pages with rich media, maps, and detailed information.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-zuru-sand-dark/20">
              <CardHeader>
                <CardTitle className="text-lg text-zuru-ink">AI Trip Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Chat with AI to create personalized itineraries based on visitor preferences.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-zuru-sand-dark/20">
              <CardHeader>
                <CardTitle className="text-lg text-zuru-ink">Booking Enquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Smart enquiry forms that capture leads and sync with your CRM.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Cards */}
      <section className="bg-zuru-sand/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink">
              Explore our demo portals
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              See how real destinations use Zuru to showcase their offerings.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {demoTenants.map((tenant) => (
              <Card key={tenant.slug} className="overflow-hidden border-zuru-sand-dark/30 bg-white">
                <div className="relative h-48 bg-zuru-plum-dark">
                  <Image
                    src={tenant.image}
                    alt={tenant.name}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zuru-plum-dark/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-zuru-sand/80">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{tenant.region}</span>
                    </div>
                    <h3 className="mt-1 text-xl font-semibold text-zuru-sand">
                      {tenant.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-zuru-ink/70">{tenant.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tenant.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-zuru-sand text-zuru-plum">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link href={`/_sites/${tenant.slug}`} className="flex-1">
                      <Button className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset-dark">
                        <Globe className="mr-2 h-4 w-4" />
                        View Portal
                      </Button>
                    </Link>
                    <Link href={`/_sites/${tenant.slug}/plan`} className="flex-1">
                      <Button variant="outline" className="w-full border-zuru-plum text-zuru-plum hover:bg-zuru-plum/5">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Try AI Planner
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zuru-plum-dark py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-sand">
              Ready to build your own?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-sand/80">
              Start your free trial and create your destination portal in minutes.
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg" className="bg-zuru-sunset text-white hover:bg-zuru-sunset-dark">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
