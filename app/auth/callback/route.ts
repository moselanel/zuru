import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/auth/error`)
  }

  // After email verification the user now has a confirmed email.
  // Check if they already have a tenant and send them to the right place.
  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select("tenant_id")
    .eq("user_id", data.user.id)
    .single()

  if (tenantUser) {
    return NextResponse.redirect(`${origin}/admin`)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
