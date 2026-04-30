"use client"

import { useTenant } from "@/lib/tenant/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function TenantContactPage() {
  const tenant = useTenant()
  const params = useParams()
  const domain = params.domain as string
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch(`/api/tenant/${domain}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          source_page: "/contact",
        }),
      })

      if (res.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Failed to submit enquiry:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover scale-105"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920)`, backgroundPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${tenant.primary_color}cc 0%, transparent 60%)` }} />
        <div className="relative z-10 container mx-auto px-4 pb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Ready to plan your adventure? Get in touch with our travel experts.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground">
                        We&apos;ve received your enquiry and will be in touch shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium text-foreground">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            required
                            placeholder="John Smith"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">
                            Email *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">
                          Your Message *
                        </label>
                        <Textarea
                          name="message"
                          required
                          placeholder="Tell us about your travel plans, interests, and any questions you have..."
                          rows={5}
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full text-white"
                        style={{ backgroundColor: tenant.primary_color }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Enquiry
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
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground">
                  Our team of travel experts is here to help you plan the perfect trip. 
                  Reach out to us through any of the following channels.
                </p>
              </div>

              <div className="space-y-4">
                {tenant.contact_email && (
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${tenant.primary_color}20` }}
                    >
                      <Mail className="h-6 w-6" style={{ color: tenant.primary_color }} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a 
                        href={`mailto:${tenant.contact_email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {tenant.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {tenant.contact_phone && (
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${tenant.primary_color}20` }}
                    >
                      <Phone className="h-6 w-6" style={{ color: tenant.primary_color }} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a 
                        href={`tel:${tenant.contact_phone}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {tenant.contact_phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Card className="mt-8" style={{ borderColor: `${tenant.primary_color}30` }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Planning a Group Trip?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    For groups of 10 or more, we offer special rates and customized itineraries. 
                    Mention your group size in your message and we&apos;ll create a tailored proposal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
