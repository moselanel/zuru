"use server"

import { createClient, createServiceClient } from "@/lib/supabase/server"
import { generateTenantSlug, isValidTenantSlug } from "@/lib/tenant/utils"

interface ProvisionTenantInput {
  email: string
  password: string
  firstName: string
  lastName: string
  organizationName: string
  plan?: "tembea" | "safari" | "indaba"
}

interface ProvisionTenantResult {
  success: boolean
  tenantSlug?: string
  error?: string
}

export async function provisionTenant(
  input: ProvisionTenantInput
): Promise<ProvisionTenantResult> {
  const supabase = await createClient()
  const serviceClient = createServiceClient()

  const { email, password, firstName, lastName, organizationName, plan = "tembea" } = input

  // Generate and validate slug
  let slug = generateTenantSlug(organizationName)

  if (!isValidTenantSlug(slug)) {
    slug = generateTenantSlug(organizationName + "-" + Date.now().toString(36))
  }

  // Check slug uniqueness via service client (bypasses RLS so we see all tenants)
  const { data: existingTenant } = await serviceClient
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .single()

  if (existingTenant) {
    slug = `${slug}-${Date.now().toString(36)}`
  }

  // Get plan limits
  const { data: planData } = await serviceClient
    .from("plans")
    .select("*")
    .eq("id", plan)
    .single()

  // Step 1: Create auth user + trigger verification email
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://zuru.africa"}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (authError || !authData.user) {
    return {
      success: false,
      error: authError?.message || "Failed to create user account",
    }
  }

  const userId = authData.user.id

  // Step 2: Create tenant — rollback auth user on failure
  const { data: tenant, error: tenantError } = await serviceClient
    .from("tenants")
    .insert({
      slug,
      name: organizationName,
      subscription_tier: plan,
      subscription_status: "trialing",
      max_destinations: planData?.max_destinations ?? 1,
      max_listings: planData?.max_listings ?? 50,
      max_users: planData?.max_users ?? 2,
      max_languages: planData?.max_languages ?? 3,
      created_by: userId,
    })
    .select()
    .single()

  if (tenantError || !tenant) {
    await serviceClient.auth.admin.deleteUser(userId)
    return {
      success: false,
      error: tenantError?.message || "Failed to create organization",
    }
  }

  // Step 3: Link user to tenant as owner — rollback both on failure
  const { error: linkError } = await serviceClient
    .from("tenant_users")
    .insert({
      tenant_id: tenant.id,
      user_id: userId,
      role: "owner",
      can_manage_content: true,
      can_manage_leads: true,
      can_manage_team: true,
      can_manage_billing: true,
      can_manage_settings: true,
      created_by: userId,
    })

  if (linkError) {
    // Cascade delete removes related rows; then clean up the auth user
    await serviceClient.from("tenants").delete().eq("id", tenant.id)
    await serviceClient.auth.admin.deleteUser(userId)
    return {
      success: false,
      error: linkError.message || "Failed to link user to organization",
    }
  }

  // Step 4: Audit log — records provisioning with the correct user_id
  // (The DB trigger fires too but with user_id=null because we used service role for DB ops)
  await serviceClient.from("audit_logs").insert({
    tenant_id: tenant.id,
    user_id: userId,
    action: "INSERT",
    table_name: "tenants",
    record_id: tenant.id,
    new_values: {
      slug,
      plan,
      organization_name: organizationName,
    },
  })

  return {
    success: true,
    tenantSlug: slug,
  }
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  if (!isValidTenantSlug(slug)) {
    return false
  }

  // Service client bypasses RLS so we correctly see all tenants
  const serviceClient = createServiceClient()

  const { data } = await serviceClient
    .from("tenants")
    .select("id")
    .eq("slug", slug)
    .single()

  return !data
}
