"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    // Send to API route that emails info@azizes.co.za
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Get in Touch
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-zuru-sand md:text-5xl">
              Let&apos;s talk about your{" "}
              <span className="text-zuru-sunset">destination</span>
            </h1>
            <p className="text-lg text-zuru-sand/80">
              Whether you&apos;re ready to get started or just exploring options, 
              we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-zuru-ink/10">
                  <CardContent className="p-8">
                    {isSubmitted ? (
                      <div className="py-12 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-zuru-ink">
                          Message Sent!
                        </h3>
                        <p className="text-zuru-ink/70">
                          Thank you for reaching out. Our team will get back to you 
                          within 24 hours.
                        </p>
                        <Button 
                          className="mt-6 bg-zuru-sunset text-white hover:bg-zuru-sunset/90"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-zuru-ink">
                              Your Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              required
                              placeholder="John Doe"
                              className="border-zuru-ink/20 focus:border-zuru-sunset"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zuru-ink">
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              placeholder="john@tourism.org"
                              className="border-zuru-ink/20 focus:border-zuru-sunset"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="company" className="mb-2 block text-sm font-medium text-zuru-ink">
                            Organization / Company
                          </label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Tourism Board / DMC Name"
                            className="border-zuru-ink/20 focus:border-zuru-sunset"
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-zuru-ink">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            required
                            placeholder="How can we help?"
                            className="border-zuru-ink/20 focus:border-zuru-sunset"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="mb-2 block text-sm font-medium text-zuru-ink">
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Tell us about your destination and what you're looking for..."
                            className="border-zuru-ink/20 focus:border-zuru-sunset"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full bg-zuru-sunset text-white hover:bg-zuru-sunset/90"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="border-zuru-ink/10">
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold text-zuru-ink">Head Office</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 shrink-0 text-zuru-sunset" />
                        <span className="text-zuru-ink/70">
                          Bel Air Shopping Centre,<br />
                          Bellairs Dr, Northriding,<br />
                          Johannesburg, 2169
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Mail className="h-5 w-5 shrink-0 text-zuru-sunset" />
                        <a href="mailto:info@azizes.co.za" className="text-zuru-ink/70 hover:text-zuru-sunset">
                          info@azizes.co.za
                        </a>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 shrink-0 text-zuru-sunset" />
                        <span className="text-zuru-ink/70">Mon-Fri: 08:00 - 17:00 SAST</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-zuru-sunset/20 bg-gradient-to-br from-zuru-sunset/5 to-zuru-amber/5">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-zuru-ink">Contact & Booking Support</h3>
                    <p className="mb-3 text-sm text-zuru-ink/70">
                      For urgent enquiries and booking support:
                    </p>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-zuru-sunset" />
                      <a href="tel:+27823166905" className="font-semibold text-zuru-sunset">
                        +27 82 316 6905
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-zuru-ink/10">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-zuru-ink">Quick Response</h3>
                    <p className="text-sm text-zuru-ink/70">
                      We typically respond to all enquiries within 24 hours during 
                      business days. For partnerships and enterprise plans, we&apos;ll 
                      schedule a call to discuss your needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
