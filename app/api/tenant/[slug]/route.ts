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

  const { data: tenant, error } = await supabase
    .from("tenants")
    .select("id, slug, name, logo_url, primary_color, secondary_color, timezone, currency, default_language, contact_email, contact_phone")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
  }

  return NextResponse.json(tenant)
}
