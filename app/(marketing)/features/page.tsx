import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Globe,
  Map,
  Sparkles,
  Users,
  BarChart3,
  Palette,
  Languages,
  CreditCard,
  Shield,
  Zap,
  MessageSquare,
  Calendar,
  ArrowRight,
} from "lucide-react"

const featureCategories = [
  {
    title: "Content Management",
    description: "Everything you need to showcase your destination beautifully.",
    features: [
      {
        icon: Globe,
        title: "Destination CMS",
        description: "Manage destinations, experiences, accommodations, and attractions with an intuitive drag-and-drop interface. Rich media support including galleries, videos, and 360° tours.",
      },
      {
        icon: Map,
        title: "Interactive Maps",
        description: "Showcase your destinations with beautiful, interactive maps. Visitors can explore regions, find nearby attractions, and plan their routes visually.",
      },
      {
        icon: Languages,
        title: "Multilingual Support",
        description: "Reach global audiences with built-in translation support for up to 12 languages. AI-assisted translations help you localize content quickly.",
      },
    ],
  },
  {
    title: "AI & Automation",
    description: "Let AI do the heavy lifting so you can focus on what matters.",
    features: [
      {
        icon: Sparkles,
        title: "AI Trip Planner",
        description: "Let visitors chat with AI to create personalized itineraries based on their preferences, budget, and travel dates. Increases engagement and conversion.",
      },
      {
        icon: MessageSquare,
        title: "AI Concierge",
        description: "24/7 AI-powered chat assistant that answers visitor questions, provides recommendations, and captures leads even when you're offline.",
      },
      {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "AI suggests optimal visit times based on seasons, events, and crowd predictions. Helps visitors plan the perfect trip.",
      },
    ],
  },
  {
    title: "Lead Generation",
    description: "Convert website visitors into qualified leads and bookings.",
    features: [
      {
        icon: Users,
        title: "Enquiry Management",
        description: "Smart enquiry forms that capture visitor details and preferences. Track leads from first contact to booking with built-in CRM features.",
      },
      {
        icon: CreditCard,
        title: "Booking Integration",
        description: "Connect with popular booking systems or use our built-in enquiry-to-booking flow. Support for deposits and payment plans.",
      },
      {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Understand your visitors with comprehensive analytics. Track page views, popular destinations, conversion rates, and more.",
      },
    ],
  },
  {
    title: "Platform & Security",
    description: "Enterprise-grade infrastructure built for African tourism.",
    features: [
      {
        icon: Palette,
        title: "White-Label Branding",
        description: "Your brand, your domain. Fully customizable colors, logos, and styling to match your organization's identity perfectly.",
      },
      {
        icon: Zap,
        title: "Lightning Fast",
        description: "Global CDN with edge locations in Africa ensures fast load times for visitors anywhere in the world. Mobile-optimized by default.",
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "SOC 2 compliant infrastructure with automatic backups, SSL certificates, and role-based access control for your team.",
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-zuru-sand/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Platform Features
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-zuru-ink sm:text-5xl">
              Everything you need to{" "}
              <span className="text-zuru-sunset">showcase Africa</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zuru-ink/70">
              From content management to AI-powered trip planning, Zuru gives tourism boards 
              and DMCs the complete toolkit to attract and convert visitors.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section
          key={category.title}
          className={`py-16 sm:py-24 ${categoryIndex % 2 === 0 ? "bg-white" : "bg-zuru-sand/30"}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink">
                {category.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
                {category.description}
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
              {category.features.map((feature) => (
                <Card key={feature.title} className="border-zuru-sand-dark/20 bg-white">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zuru-sunset/10">
                      <feature.icon className="h-6 w-6 text-zuru-sunset" />
                    </div>
                    <CardTitle className="text-lg text-zuru-ink">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-zuru-ink/70">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table Preview */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink">
              Built for African tourism, by Africans
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              Unlike generic website builders, Zuru understands the unique needs of 
              African tourism organizations.
            </p>
            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
              <Card className="border-zuru-sand-dark/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-zuru-ink">Local Currency Support</h3>
                  <p className="mt-2 text-sm text-zuru-ink/70">
                    Display prices in ZAR, KES, RWF, TZS, and more. No more confusing currency conversions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-zuru-sand-dark/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-zuru-ink">African Language Support</h3>
                  <p className="mt-2 text-sm text-zuru-ink/70">
                    Built-in support for Swahili, Zulu, Afrikaans, French, Portuguese, and more.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-zuru-sand-dark/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-zuru-ink">Offline-First Mobile</h3>
                  <p className="mt-2 text-sm text-zuru-ink/70">
                    Progressive web app that works even in areas with limited connectivity.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-zuru-sand-dark/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-zuru-ink">Local Payment Integration</h3>
                  <p className="mt-2 text-sm text-zuru-ink/70">
                    Support for M-Pesa, Paystack, Flutterwave, and traditional bank transfers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zuru-plum-dark py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-sand">
              Ready to see it in action?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-sand/80">
              Explore our demo portals or start your free trial today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo">
                <Button size="lg" className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset-dark sm:w-auto">
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full border-zuru-sand bg-zuru-sand/10 text-zuru-sand hover:bg-zuru-sand/20 sm:w-auto">
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
