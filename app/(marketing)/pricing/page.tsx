import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const plans = [
  {
    name: "Tembea",
    meaning: "Swahili: to explore",
    price: "450",
    description: "For smaller tourism boards and destination-specialist DMCs getting started.",
    features: [
      { name: "Single destination", included: true },
      { name: "Up to 50 listings", included: true },
      { name: "AI trip planner", included: true },
      { name: "3 languages", included: true },
      { name: "Enquiry capture", included: true },
      { name: "Zuru subdomain", included: true },
      { name: "Analytics dashboard", included: false },
      { name: "Custom subdomain", included: false },
      { name: "Priority support", included: false },
      { name: "Custom domain", included: false },
      { name: "API access", included: false },
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
      { name: "Multiple destinations (up to 3)", included: true },
      { name: "Unlimited listings", included: true },
      { name: "AI trip planner", included: true },
      { name: "6 languages", included: true },
      { name: "Booking enquiry flow", included: true },
      { name: "Custom subdomain", included: true },
      { name: "Analytics dashboard", included: true },
      { name: "Priority support", included: true },
      { name: "Custom domain", included: false },
      { name: "API access", included: false },
      { name: "SLA", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Indaba",
    meaning: "Zulu: a gathering of leaders",
    price: "2,500+",
    description: "For national tourism boards and large DMC groups needing full white-label control.",
    features: [
      { name: "Unlimited destinations", included: true },
      { name: "Unlimited listings", included: true },
      { name: "AI trip planner", included: true },
      { name: "Unlimited languages", included: true },
      { name: "Full booking flow", included: true },
      { name: "Custom domain", included: true },
      { name: "Full white-label", included: true },
      { name: "API access", included: true },
      { name: "Dedicated support", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Onboarding included", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    question: "What is included in the free trial?",
    answer: "All plans include a 14-day free trial with full access to features. No credit card required to start. You can upgrade, downgrade, or cancel at any time during or after your trial.",
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you&apos;ll have immediate access to new features. When downgrading, changes take effect at the end of your current billing period.",
  },
  {
    question: "What languages are supported?",
    answer: "Zuru supports all major African and European languages. The Tembea plan includes 3 languages, Safari includes 6, and Indaba offers unlimited languages. We can add new languages on request.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes, we offer a 20% discount when you pay annually instead of monthly. Contact our sales team for details or select annual billing during signup.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, debit cards, and bank transfers. For enterprise clients on the Indaba plan, we can arrange custom invoicing and payment terms.",
  },
  {
    question: "Can I use my own domain?",
    answer: "Custom domains are available on the Indaba plan. Safari plan users get a custom subdomain (yourname.zuru.africa), and Tembea users get a standard Zuru subdomain.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-zuru-sand/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-zuru-ink sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zuru-ink/70">
              Choose the plan that fits your organization. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
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
                    <span className="text-sm text-zuru-ink/70">$</span>
                    <span className="text-4xl font-semibold text-zuru-ink">{plan.price}</span>
                    <span className="text-sm text-zuru-ink/70">/month</span>
                  </div>
                  <p className="mb-6 text-sm text-zuru-ink/70">{plan.description}</p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-2">
                        <Check
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                            feature.included ? "text-zuru-sunset" : "text-zuru-sand-dark"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            feature.included ? "text-zuru-ink/80" : "text-zuru-ink/40 line-through"
                          }`}
                        >
                          {feature.name}
                        </span>
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

      {/* FAQs */}
      <section className="bg-zuru-sand/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-center gap-2 text-center">
            <HelpCircle className="h-5 w-5 text-zuru-plum" />
            <h2 className="text-2xl font-semibold text-zuru-ink">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-zuru-ink">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zuru-ink/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zuru-plum-dark py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zuru-sand">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zuru-sand/80">
              Start your 14-day free trial today. No credit card required.
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
