"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Circle, Clock, Rocket, Globe, Sparkles, Zap, Users } from "lucide-react"

const phases = [
  {
    name: "Phase 1: Foundation",
    status: "completed",
    quarter: "Q1 2024",
    description: "Core platform infrastructure and essential features for destination management.",
    items: [
      { text: "Multi-tenant architecture", done: true },
      { text: "Destination content management", done: true },
      { text: "Experiences & accommodations listings", done: true },
      { text: "Lead capture & enquiry management", done: true },
      { text: "Responsive tenant websites", done: true },
      { text: "Admin dashboard", done: true },
    ],
  },
  {
    name: "Phase 2: Engagement",
    status: "current",
    quarter: "Q2 2024",
    description: "Enhanced visitor engagement and conversion optimization tools.",
    items: [
      { text: "AI-powered trip planner", done: true },
      { text: "Interactive maps integration", done: true },
      { text: "Multi-language support (6 languages)", done: false },
      { text: "Newsletter & email marketing", done: false },
      { text: "Social media integrations", done: false },
      { text: "Analytics dashboard", done: false },
    ],
  },
  {
    name: "Phase 3: Commerce",
    status: "upcoming",
    quarter: "Q3 2024",
    description: "Direct booking capabilities and payment processing.",
    items: [
      { text: "Online booking engine", done: false },
      { text: "Multi-currency payments (ZAR, USD, EUR, GBP)", done: false },
      { text: "Availability calendar management", done: false },
      { text: "Booking confirmations & reminders", done: false },
      { text: "Commission tracking for partners", done: false },
      { text: "Mobile app for travelers", done: false },
    ],
  },
  {
    name: "Phase 4: Intelligence",
    status: "upcoming",
    quarter: "Q4 2024",
    description: "Advanced AI and data-driven insights for destinations.",
    items: [
      { text: "AI content generation for listings", done: false },
      { text: "Predictive analytics for demand", done: false },
      { text: "Competitor benchmarking", done: false },
      { text: "Sentiment analysis from reviews", done: false },
      { text: "Dynamic pricing recommendations", done: false },
      { text: "Custom AI chatbot for each tenant", done: false },
    ],
  },
  {
    name: "Phase 5: Ecosystem",
    status: "future",
    quarter: "2025",
    description: "Building the African tourism technology ecosystem.",
    items: [
      { text: "API marketplace for integrations", done: false },
      { text: "Partner network & cross-promotion", done: false },
      { text: "White-label mobile apps", done: false },
      { text: "B2B tour operator portal", done: false },
      { text: "Virtual & AR experiences", done: false },
      { text: "Carbon offset tracking", done: false },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-6 w-6 text-green-500" />
    case "current":
      return <Clock className="h-6 w-6 text-zuru-sunset" />
    default:
      return <Circle className="h-6 w-6 text-zuru-ink/30" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700">Completed</Badge>
    case "current":
      return <Badge className="bg-zuru-sunset/10 text-zuru-sunset">In Progress</Badge>
    case "upcoming":
      return <Badge className="bg-zuru-ink/10 text-zuru-ink/70">Upcoming</Badge>
    default:
      return <Badge className="bg-zuru-plum/10 text-zuru-plum">Future</Badge>
  }
}

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Product Roadmap
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zuru-sand md:text-5xl">
              Where we&apos;re{" "}
              <span className="text-zuru-sunset">headed</span>
            </h1>
            <p className="text-lg text-zuru-sand/80">
              Our vision for transforming African tourism technology, one phase at a time. 
              Here&apos;s what we&apos;re building and when you can expect it.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Cards */}
      <section className="border-b border-zuru-ink/10 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zuru-sunset/10">
                <Rocket className="h-6 w-6 text-zuru-sunset" />
              </div>
              <div>
                <div className="font-semibold text-zuru-ink">Launch Fast</div>
                <div className="text-sm text-zuru-ink/70">Go live in weeks</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zuru-sunset/10">
                <Globe className="h-6 w-6 text-zuru-sunset" />
              </div>
              <div>
                <div className="font-semibold text-zuru-ink">Africa-First</div>
                <div className="text-sm text-zuru-ink/70">Built for our markets</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zuru-sunset/10">
                <Sparkles className="h-6 w-6 text-zuru-sunset" />
              </div>
              <div>
                <div className="font-semibold text-zuru-ink">AI-Powered</div>
                <div className="text-sm text-zuru-ink/70">Smart automation</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zuru-sunset/10">
                <Users className="h-6 w-6 text-zuru-sunset" />
              </div>
              <div>
                <div className="font-semibold text-zuru-ink">Community</div>
                <div className="text-sm text-zuru-ink/70">Partner network</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <Card 
                  key={phase.name} 
                  className={`border-zuru-ink/10 ${
                    phase.status === "current" ? "ring-2 ring-zuru-sunset ring-offset-2" : ""
                  }`}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(phase.status)}
                        <div>
                          <h3 className="text-xl font-semibold text-zuru-ink">
                            {phase.name}
                          </h3>
                          <p className="text-sm text-zuru-ink/50">{phase.quarter}</p>
                        </div>
                      </div>
                      {getStatusBadge(phase.status)}
                    </div>

                    <p className="mb-6 text-zuru-ink/70">{phase.description}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {phase.items.map((item) => (
                        <div 
                          key={item.text} 
                          className="flex items-center gap-3"
                        >
                          {item.done ? (
                            <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 text-zuru-ink/20" />
                          )}
                          <span className={item.done ? "text-zuru-ink" : "text-zuru-ink/50"}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-zuru-ink">
              Have a Feature Request?
            </h2>
            <p className="mb-6 text-zuru-ink/70">
              We build Zuru based on what our partners need. If there&apos;s something 
              missing from our roadmap that would help your destination succeed, 
              we want to hear about it.
            </p>
            <a href="mailto:info@azizes.co.za?subject=Feature Request for Zuru">
              <Badge className="cursor-pointer bg-zuru-sunset/10 px-4 py-2 text-zuru-sunset hover:bg-zuru-sunset/20">
                <Zap className="mr-2 inline h-4 w-4" />
                Submit a Feature Request
              </Badge>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
