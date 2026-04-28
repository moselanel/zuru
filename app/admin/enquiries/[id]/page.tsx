import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Mail, Phone, Calendar, Globe, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { EnquiryStatusSelect } from "./status-select"
import { EnquiryNotes } from "./notes"

export const metadata = {
  title: "View Enquiry | Zuru Admin",
}

interface PageProps {
  params: Promise<{ id: string }>
}

const statusColors: Record<string, string> = {
  new: "bg-zuru-sunset text-white",
  contacted: "bg-blue-500 text-white",
  qualified: "bg-green-500 text-white",
  converted: "bg-purple-500 text-white",
  closed: "bg-gray-500 text-white",
}

export default async function EnquiryDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select("tenant:tenants(id, name)")
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  const tenant = tenantUser.tenant as { id: string; name: string }

  const { data: enquiry } = await supabase
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .eq("tenant_id", tenant.id)
    .single()

  if (!enquiry) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/enquiries">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Enquiry from {enquiry.name}</h1>
            <p className="text-muted-foreground">
              Received {new Date(enquiry.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <Badge className={statusColors[enquiry.status] || "bg-gray-500"}>
          {enquiry.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              {enquiry.message ? (
                <p className="whitespace-pre-wrap text-muted-foreground">{enquiry.message}</p>
              ) : (
                <p className="text-muted-foreground italic">No message provided</p>
              )}
            </CardContent>
          </Card>

          {/* Trip Details */}
          {(enquiry.travel_dates || enquiry.travelers_count || enquiry.interests) && (
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {enquiry.travel_dates && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Travel Dates</p>
                      <p className="font-medium">{enquiry.travel_dates}</p>
                    </div>
                  </div>
                )}
                {enquiry.travelers_count && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Number of Travelers</p>
                      <p className="font-medium">{enquiry.travelers_count}</p>
                    </div>
                  </div>
                )}
                {enquiry.interests && (
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(enquiry.interests) 
                        ? enquiry.interests 
                        : enquiry.interests.split(",")
                      ).map((interest: string, i: number) => (
                        <Badge key={i} variant="secondary">
                          {interest.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <EnquiryNotes enquiryId={enquiry.id} initialNotes={enquiry.notes || ""} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zuru-sunset/10 text-zuru-sunset">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{enquiry.name}</p>
                  {enquiry.country && (
                    <p className="text-sm text-muted-foreground">{enquiry.country}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <a
                  href={`mailto:${enquiry.email}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{enquiry.email}</span>
                </a>
                {enquiry.phone && (
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{enquiry.phone}</span>
                  </a>
                )}
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button className="flex-1 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
                  <a href={`mailto:${enquiry.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
                {enquiry.phone && (
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={`tel:${enquiry.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <EnquiryStatusSelect enquiryId={enquiry.id} currentStatus={enquiry.status} />
            </CardContent>
          </Card>

          {/* Source */}
          <Card>
            <CardHeader>
              <CardTitle>Source</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {enquiry.source_page && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{enquiry.source_page}</span>
                </div>
              )}
              {enquiry.utm_source && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {enquiry.utm_source}
                    {enquiry.utm_medium && ` / ${enquiry.utm_medium}`}
                    {enquiry.utm_campaign && ` / ${enquiry.utm_campaign}`}
                  </span>
                </div>
              )}
              {!enquiry.source_page && !enquiry.utm_source && (
                <p className="text-sm text-muted-foreground">No source data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
