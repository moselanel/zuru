import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Building2, Edit, Eye, MoreHorizontal, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function AccommodationsPage() {
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

  const { data: accommodations } = await supabase
    .from("accommodations")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Accommodations</h1>
          <p className="text-muted-foreground">
            Manage hotels, lodges, and other properties.
          </p>
        </div>
        <Button className="gap-2 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
          <Link href="/admin/accommodations/new">
            <Plus className="h-4 w-4" />
            Add Accommodation
          </Link>
        </Button>
      </div>

      {accommodations && accommodations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accommodations.map((accommodation) => (
            <Card key={accommodation.id} className="overflow-hidden">
              <div className="relative h-40 bg-muted">
                {accommodation.hero_image_url ? (
                  <Image
                    src={accommodation.hero_image_url}
                    alt={accommodation.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute left-2 top-2">
                  <Badge variant="secondary">{accommodation.property_type || "Property"}</Badge>
                </div>
                <div className="absolute right-2 top-2">
                  <Badge variant={accommodation.is_published ? "default" : "secondary"}>
                    {accommodation.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{accommodation.name}</h3>
                      {accommodation.star_rating && (
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          {Array.from({ length: accommodation.star_rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {accommodation.short_description || "No description"}
                    </p>
                    {accommodation.price_from && (
                      <p className="mt-2 text-sm font-medium">
                        From {accommodation.price_currency} {accommodation.price_from.toLocaleString()}/night
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/accommodations/${accommodation.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`https://${tenant.slug}.zuru.africa/accommodations/${accommodation.slug}`}
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
                    <Link href={`/admin/accommodations/${accommodation.id}`}>
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
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No accommodations yet</h3>
            <p className="mt-2 text-muted-foreground">
              Add hotels, lodges, and other places to stay.
            </p>
            <Button className="mt-4 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
              <Link href="/admin/accommodations/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Accommodation
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
