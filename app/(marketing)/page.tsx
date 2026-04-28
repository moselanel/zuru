import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Map,
  Sparkles,
  Users,
  BarChart3,
  Palette,
  ArrowRight,
  Check,
  Play,
} from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Destination CMS",
    description: "Manage destinations, experiences, and accommodations with an intuitive content management system.",
  },
  {
    icon: Sparkles,
    title: "AI Trip Planner",
    description: "Let AI create personalized itineraries for your visitors based on their preferences and interests.",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description: "Showcase your destinations with beautiful, interactive maps that visitors can explore.",
  },
  {
    icon: Users,
    title: "Lead Capture",
    description: "Convert website visitors into qualified leads with smart enquiry forms and tracking.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Understand your visitors with comprehensive analytics and reporting tools.",
  },
  {
    icon: Palette,
    title: "White-Label",
    description: "Your brand, your domain. Fully customizable to match your organization&apos;s identity.",
  },
]

const plans = [
  {
    name: "Tembea",
    meaning: "Swahili: to explore",
    price: "450",
    description: "For smaller tourism boards and destination-specialist DMCs getting started.",
    features: [
      "Single destination",
      "Up to 50 listings",
      "AI trip planner",
      "3 languages",
      "Enquiry capture",
      "Zuru subdomain",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Safari",
    meaning: "Swahili: journey",
    price: "995",
    description: "For established DMOs and DMCs who need full destination ownership.",
    features: [
      "Unlimited listings",
      "Booking enquiry flow",
      "6 languages",
      "Analytics dashboard",
      "Custom subdomain",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Indaba",
    meaning: "Zulu: a gathering of leaders",
    price: "Custom",
    description: "For national tourism boards and large DMC groups needing full white-label control.",
    features: [
      "Full white-label + custom domain",
      "API access",
      "Multi-destination",
      "SLA + dedicated support",
      "Onboarding included",
      "From $2,500/month",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const testimonials = [
  {
    quote: "Zuru transformed how we showcase Rwanda to the world. The AI trip planner alone has increased our enquiries by 40%.",
    author: "Marie Uwimana",
    role: "Digital Director, Rwanda Tourism Board",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
  {
    quote: "Finally, a platform built for African tourism. The multilingual support and local currency handling is exactly what we needed.",
    author: "Themba Ndlovu",
    role: "CEO, Safari Dreams DMC",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    quote: "We launched our new destination portal in just two weeks. The white-label experience is seamless.",
    author: "Johan van der Berg",
    role: "Managing Director, Cape Tours",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
]

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zuru-plum-dark">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Now available for African destinations
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zuru-sand sm:text-5xl lg:text-6xl">
              The platform for{" "}
              <span className="text-zuru-sunset">African tourism</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-zuru-sand/80 sm:text-xl">
              Empower your DMC, tourism board, or tour operator with an all-in-one 
              destination management platform. AI-powered. Multilingual. Built for Africa.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset-dark sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full border-zuru-sand bg-zuru-sand/10 text-zuru-sand hover:bg-zuru-sand/20 sm:w-auto">
                  <Play className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink sm:text-4xl">
              Everything you need to showcase your destination
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              From content management to AI-powered trip planning, Zuru gives you the tools to attract and convert visitors.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-zuru-sand-dark/20 bg-zuru-sand/30">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-zuru-sunset/10">
                    <feature.icon className="h-5 w-5 text-zuru-sunset" />
                  </div>
                  <CardTitle className="text-zuru-ink">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zuru-ink/70">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-zuru-sand/50 py-24 sm:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              Choose the plan that fits your organization. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular
                    ? "border-2 border-zuru-sunset shadow-lg"
                    : "border-zuru-sand-dark/30"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zuru-sunset text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-zuru-ink">{plan.name}</CardTitle>
                  <p className="text-xs italic text-zuru-plum">{plan.meaning}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-4">
                    {plan.price === "Custom" ? (
                      <span className="text-3xl font-semibold text-zuru-ink">Custom</span>
                    ) : (
                      <>
                        <span className="text-sm text-zuru-ink/70">$</span>
                        <span className="text-3xl font-semibold text-zuru-ink">{plan.price}</span>
                        <span className="text-sm text-zuru-ink/70">/month</span>
                      </>
                    )}
                  </div>
                  <p className="mb-6 text-sm text-zuru-ink/70">{plan.description}</p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-zuru-sunset" />
                        <span className="text-sm text-zuru-ink/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.cta === "Contact Sales" ? "/contact" : "/signup"}>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-zuru-sunset text-white hover:bg-zuru-sunset-dark"
                          : "bg-zuru-plum-dark text-white hover:bg-zuru-plum"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-ink sm:text-4xl">
              Trusted by tourism leaders across Africa
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="border-zuru-sand-dark/20">
                <CardContent className="pt-6">
                  <blockquote className="text-zuru-ink/80">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-zuru-ink">{testimonial.author}</p>
                      <p className="text-xs text-zuru-ink/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zuru-plum-dark py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-sand sm:text-4xl">
              Ready to transform your destination?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-sand/80">
              Join the growing community of African tourism leaders using Zuru. Start your free trial today.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset-dark sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full border-zuru-sand bg-zuru-sand/10 text-zuru-sand hover:bg-zuru-sand/20 sm:w-auto">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
