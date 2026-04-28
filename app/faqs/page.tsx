import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FAQs | MTPA",
  description: "Frequently asked questions about visiting Mpumalanga.",
}

const faqs = [
  {
    q: "What is the best time to visit Mpumalanga?",
    a: "The dry season (May-September) is ideal for wildlife viewing, while the wet season (October-April) offers lush landscapes and bird watching. The Panorama Route is beautiful year-round.",
  },
  {
    q: "Do I need a visa to visit South Africa?",
    a: "Visa requirements depend on your nationality. Citizens of many countries can visit visa-free for up to 90 days. Check with your local South African embassy for specific requirements.",
  },
  {
    q: "Is it safe to travel in Mpumalanga?",
    a: "Mpumalanga is generally safe for tourists. Like anywhere, take standard precautions, stay on marked paths in reserves, and follow your guide's instructions during safaris.",
  },
  {
    q: "What should I pack for a safari?",
    a: "Neutral-colored clothing (khaki, brown, olive), comfortable walking shoes, hat, sunscreen, binoculars, camera, and warm layers for early morning game drives.",
  },
  {
    q: "Can I self-drive through the reserves?",
    a: "Some reserves allow self-drive, while others require guided tours. Blyde River Canyon and Kruger National Park offer excellent self-drive options.",
  },
  {
    q: "How do I book accommodation?",
    a: "You can book directly through our website, or contact our reservations team. We recommend booking well in advance, especially during peak season (June-October).",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), bank transfers, and selected mobile payment options.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellation policies vary by property. Generally, free cancellation is available up to 7 days before arrival. Please check specific terms when booking.",
  },
]

export default function FAQsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Find answers to common questions about visiting Mpumalanga.</p>
          </div>

          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">Our team is happy to help.</p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
