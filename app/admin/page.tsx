import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MapPin, Compass, Building2, MessageSquare, ArrowUpRight, Plus, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Get tenant
  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select("tenant:tenants(*)")
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  
  const tenant = tenantUser.tenant as { id: string; name: string; slug: string }

  // Get content counts
  const [destinations, experiences, accommodations, enquiries] = await Promise.all([
    supabase.from("destinations").select("id", { count: "exact" }).eq("tenant_id", tenant.id),
    supabase.from("experiences").select("id", { count: "exact" }).eq("tenant_id", tenant.id),
    supabase.from("accommodations").select("id", { count: "exact" }).eq("tenant_id", tenant.id),
    supabase.from("enquiries").select("*").eq("tenant_id", tenant.id).order("created_at", { ascending: false }).limit(5),
  ])

  const newEnquiries = enquiries.data?.filter(e => e.status === "new").length || 0

  const stats = [
    {
      name: "Destinations",
      value: destinations.count || 0,
      icon: MapPin,
      href: "/admin/destinations",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      name: "Experiences",
      value: experiences.count || 0,
      icon: Compass,
      href: "/admin/experiences",
      color: "bg-green-500/10 text-green-600",
    },
    {
      name: "Accommodations",
      value: accommodations.count || 0,
      icon: Building2,
      href: "/admin/accommodations",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      name: "New Enquiries",
      value: newEnquiries,
      icon: MessageSquare,
      href: "/admin/enquiries",
      color: "bg-orange-500/10 text-orange-600",
    },
  ]

  const firstName = user.user_metadata?.first_name || "there"

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Welcome back, {firstName}</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with {tenant.name}.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" asChild>
            <Link href={`https://${tenant.slug}.zuru.africa`} target="_blank">
              <Eye className="h-4 w-4" />
              View Portal
            </Link>
          </Button>
          <Button className="gap-2 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
            <Link href="/admin/destinations/new">
              <Plus className="h-4 w-4" />
              Add Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent enquiries */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Enquiries</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/enquiries">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {enquiries.data && enquiries.data.length > 0 ? (
              <div className="space-y-4">
                {enquiries.data.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-start justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{enquiry.name}</p>
                        <Badge
                          variant={enquiry.status === "new" ? "default" : "secondary"}
                          className={enquiry.status === "new" ? "bg-zuru-sunset" : ""}
                        >
                          {enquiry.status}
                        </Badge>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {enquiry.message || "No message"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {enquiry.email} &middot; {new Date(enquiry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/enquiries/${enquiry.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <MessageSquare className="mx-auto h-8 w-8 opacity-50" />
                <p className="mt-2">No enquiries yet</p>
                <p className="text-sm">When visitors submit enquiries, they&apos;ll appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <Link href="/admin/destinations/new">
                <MapPin className="h-4 w-4" />
                Add Destination
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <Link href="/admin/experiences/new">
                <Compass className="h-4 w-4" />
                Add Experience
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <Link href="/admin/accommodations/new">
                <Building2 className="h-4 w-4" />
                Add Accommodation
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <Link href="/admin/settings/branding">
                Customize Branding
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Getting started */}
      {(destinations.count || 0) === 0 && (
        <Card className="border-dashed border-zuru-sunset/50 bg-zuru-sand/20">
          <CardContent className="py-8 text-center">
            <h3 className="text-lg font-semibold">Get started with Zuru</h3>
            <p className="mt-2 text-muted-foreground">
              Add your first destination to start building your tourism portal.
            </p>
            <Button className="mt-4 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
              <Link href="/admin/destinations/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Destination
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
