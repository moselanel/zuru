-- ============================================================
-- ZURU MULTI-TENANT SCHEMA
-- Script 001: Core tenant tables with RLS and audit trail
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TENANTS TABLE
-- Core tenant/organization record
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  
  -- Branding
  logo_url TEXT,
  logo_dark_url TEXT,
  primary_color TEXT DEFAULT '#D4541A',
  secondary_color TEXT DEFAULT '#5C2D6E',
  
  -- Custom domain (optional)
  custom_domain TEXT UNIQUE,
  
  -- Subscription
  subscription_tier TEXT DEFAULT 'tembea' CHECK (subscription_tier IN ('tembea', 'safari', 'indaba')),
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'paused')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  
  -- Limits based on tier
  max_destinations INTEGER DEFAULT 1,
  max_listings INTEGER DEFAULT 50,
  max_users INTEGER DEFAULT 2,
  max_languages INTEGER DEFAULT 3,
  
  -- Settings
  default_language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'Africa/Johannesburg',
  currency TEXT DEFAULT 'ZAR',
  
  -- Metadata
  is_demo BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID
);

-- ============================================================
-- TENANT USERS TABLE
-- Links users to tenants with roles
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tenant_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('owner', 'admin', 'staff')),
  
  -- Permissions (can be expanded)
  can_manage_content BOOLEAN DEFAULT TRUE,
  can_manage_leads BOOLEAN DEFAULT TRUE,
  can_manage_team BOOLEAN DEFAULT FALSE,
  can_manage_billing BOOLEAN DEFAULT FALSE,
  can_manage_settings BOOLEAN DEFAULT FALSE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID,
  
  UNIQUE(tenant_id, user_id)
);

-- ============================================================
-- USER PROFILES TABLE
-- Extended user information
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  
  -- Platform-level role (for super admins)
  is_super_admin BOOLEAN DEFAULT FALSE,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG TABLE
-- Tracks all changes for compliance
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID,
  user_id UUID,
  
  -- Action details
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'VIEW')),
  table_name TEXT NOT NULL,
  record_id UUID,
  
  -- Data changes
  old_values JSONB,
  new_values JSONB,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster audit queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON public.audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table ON public.audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ============================================================
-- PLANS TABLE
-- Subscription plan definitions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  price_monthly INTEGER NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  
  -- Limits
  max_destinations INTEGER,
  max_listings INTEGER,
  max_users INTEGER,
  max_languages INTEGER,
  
  -- Features (JSON for flexibility)
  features JSONB,
  
  -- Display
  is_popular BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default plans
INSERT INTO public.plans (id, name, display_name, price_monthly, max_destinations, max_listings, max_users, max_languages, features, is_popular, sort_order)
VALUES 
  ('tembea', 'Tembea', 'Tembea', 850000, 1, 50, 2, 3, 
   '{"ai_trip_planner": true, "enquiry_capture": true, "custom_subdomain": true, "analytics": false, "priority_support": false, "custom_domain": false, "api_access": false}',
   FALSE, 1),
  ('safari', 'Safari', 'Safari', 1800000, 3, -1, 10, 6,
   '{"ai_trip_planner": true, "enquiry_capture": true, "custom_subdomain": true, "analytics": true, "priority_support": true, "custom_domain": false, "api_access": false}',
   TRUE, 2),
  ('indaba', 'Indaba', 'Indaba', 4500000, -1, -1, -1, -1,
   '{"ai_trip_planner": true, "enquiry_capture": true, "custom_subdomain": true, "analytics": true, "priority_support": true, "custom_domain": true, "api_access": true, "sla": true, "onboarding": true}',
   FALSE, 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES: PROFILES
-- ============================================================
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- RLS POLICIES: TENANTS
-- Users can only see tenants they belong to
-- ============================================================
DROP POLICY IF EXISTS "tenants_select_member" ON public.tenants;
CREATE POLICY "tenants_select_member" ON public.tenants
  FOR SELECT USING (
    id IN (SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid())
    OR is_demo = TRUE
  );

DROP POLICY IF EXISTS "tenants_update_admin" ON public.tenants;
CREATE POLICY "tenants_update_admin" ON public.tenants
  FOR UPDATE USING (
    id IN (
      SELECT tenant_id FROM public.tenant_users 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- ============================================================
-- RLS POLICIES: TENANT_USERS
-- ============================================================
DROP POLICY IF EXISTS "tenant_users_select_same_tenant" ON public.tenant_users;
CREATE POLICY "tenant_users_select_same_tenant" ON public.tenant_users
  FOR SELECT USING (
    tenant_id IN (SELECT tenant_id FROM public.tenant_users tu WHERE tu.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "tenant_users_insert_admin" ON public.tenant_users;
CREATE POLICY "tenant_users_insert_admin" ON public.tenant_users
  FOR INSERT WITH CHECK (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users tu
      WHERE tu.user_id = auth.uid() AND tu.role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "tenant_users_update_admin" ON public.tenant_users;
CREATE POLICY "tenant_users_update_admin" ON public.tenant_users
  FOR UPDATE USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users tu
      WHERE tu.user_id = auth.uid() AND tu.role IN ('owner', 'admin')
    )
  );

DROP POLICY IF EXISTS "tenant_users_delete_owner" ON public.tenant_users;
CREATE POLICY "tenant_users_delete_owner" ON public.tenant_users
  FOR DELETE USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users tu
      WHERE tu.user_id = auth.uid() AND tu.role = 'owner'
    )
  );

-- ============================================================
-- RLS POLICIES: AUDIT_LOGS
-- Only viewable by tenant admins
-- ============================================================
DROP POLICY IF EXISTS "audit_logs_select_admin" ON public.audit_logs;
CREATE POLICY "audit_logs_select_admin" ON public.audit_logs
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM public.tenant_users tu
      WHERE tu.user_id = auth.uid() AND tu.role IN ('owner', 'admin')
    )
  );

-- ============================================================
-- RLS POLICIES: PLANS
-- Everyone can read plans
-- ============================================================
DROP POLICY IF EXISTS "plans_select_all" ON public.plans;
CREATE POLICY "plans_select_all" ON public.plans
  FOR SELECT USING (TRUE);

-- ============================================================
-- FUNCTIONS: Auto-update timestamps
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables (drop first if exists)
DROP TRIGGER IF EXISTS update_tenants_updated_at ON public.tenants;
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_tenant_users_updated_at ON public.tenant_users;
CREATE TRIGGER update_tenant_users_updated_at
  BEFORE UPDATE ON public.tenant_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- FUNCTION: Create profile on user signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- FUNCTION: Generic audit logging
-- This is called manually from application code or simpler triggers
-- ============================================================
CREATE OR REPLACE FUNCTION public.log_audit(
  p_tenant_id UUID,
  p_action TEXT,
  p_table_name TEXT,
  p_record_id UUID,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO public.audit_logs (tenant_id, user_id, action, table_name, record_id, old_values, new_values)
  VALUES (p_tenant_id, auth.uid(), p_action, p_table_name, p_record_id, p_old_values, p_new_values)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;
