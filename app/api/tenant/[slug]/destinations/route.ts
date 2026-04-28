import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Get tenant by slug
  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (tenantError || !tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
  }

  // Get published destinations for this tenant
  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("id, slug, name, short_description, description, hero_image_url, is_featured, sort_order")
    .eq("tenant_id", tenant.id)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(destinations)
}
