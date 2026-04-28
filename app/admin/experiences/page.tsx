import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Compass, Edit, Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function ExperiencesPage() {
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

  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("tenant_id", tenant.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Experiences</h1>
          <p className="text-muted-foreground">
            Manage tours, activities, and experiences.
          </p>
        </div>
        <Button className="gap-2 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
          <Link href="/admin/experiences/new">
            <Plus className="h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </div>

      {experiences && experiences.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <div className="relative h-40 bg-muted">
                {experience.hero_image_url ? (
                  <Image
                    src={experience.hero_image_url}
                    alt={experience.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Compass className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute left-2 top-2">
                  <Badge variant="secondary">{experience.category || "Uncategorized"}</Badge>
                </div>
                <div className="absolute right-2 top-2">
                  <Badge variant={experience.is_published ? "default" : "secondary"}>
                    {experience.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{experience.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {experience.short_description || "No description"}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      {experience.duration && <span>{experience.duration}</span>}
                      {experience.price_from && (
                        <>
                          {experience.duration && <span>&middot;</span>}
                          <span>
                            From {experience.price_currency} {experience.price_from.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/experiences/${experience.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`https://${tenant.slug}.zuru.africa/experiences/${experience.slug}`}
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
                    <Link href={`/admin/experiences/${experience.id}`}>
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
            <Compass className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No experiences yet</h3>
            <p className="mt-2 text-muted-foreground">
              Add tours, activities, and unique experiences for visitors.
            </p>
            <Button className="mt-4 bg-zuru-sunset hover:bg-zuru-sunset-dark" asChild>
              <Link href="/admin/experiences/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
