import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MapPin, Edit, Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function DestinationsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select("tenant:tenants(id, name, slug)")
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  const tenant = tenantUser.tenant as { id: string; name: string; slug: string }

  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("sort_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Destinations</h1>
          <p className="text-muted-foreground">
            Manage your destination pages and content.
          </p>
        </div>
        <Button className="gap-2 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
          <Link href="/admin/destinations/new">
            <Plus className="h-4 w-4" />
            Add Destination
          </Link>
        </Button>
      </div>

      {destinations && destinations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden">
              <div className="relative h-40 bg-muted">
                {destination.hero_image_url ? (
                  <Image
                    src={destination.hero_image_url}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute right-2 top-2">
                  <Badge variant={destination.is_published ? "default" : "secondary"}>
                    {destination.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{destination.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {destination.short_description || "No description"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/destinations/${destination.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`https://${tenant.slug}.zuru.africa/destinations/${destination.slug}`}
                          target="_blank"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Live
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/admin/destinations/${destination.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No destinations yet</h3>
            <p className="mt-2 text-muted-foreground">
              Add your first destination to start building your portal.
            </p>
            <Button className="mt-4 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
              <Link href="/admin/destinations/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Destination
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
