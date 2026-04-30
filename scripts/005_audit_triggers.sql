-- ============================================================
-- ZURU MULTI-TENANT SCHEMA
-- Script 005: Audit trigger function
-- ============================================================
-- The triggers on content tables (destinations, experiences,
-- accommodations, etc.) were created in 002 referencing this
-- function, but the function body was never defined. This script
-- creates it so all content mutations are automatically audited.
-- ============================================================

CREATE OR REPLACE FUNCTION public.audit_trigger_func()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tenant_id UUID := NULL;
  v_record_id UUID := NULL;
  v_old_values JSONB := NULL;
  v_new_values JSONB := NULL;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_tenant_id := OLD.tenant_id;
    v_record_id := OLD.id;
    v_old_values := to_jsonb(OLD);
  ELSIF TG_OP = 'UPDATE' THEN
    v_tenant_id := NEW.tenant_id;
    v_record_id := NEW.id;
    v_old_values := to_jsonb(OLD);
    v_new_values := to_jsonb(NEW);
  ELSE -- INSERT
    v_tenant_id := NEW.tenant_id;
    v_record_id := NEW.id;
    v_new_values := to_jsonb(NEW);
  END IF;

  INSERT INTO public.audit_logs (
    tenant_id,
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    v_tenant_id,
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    v_record_id,
    v_old_values,
    v_new_values
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Grant execute to authenticated and service roles
GRANT EXECUTE ON FUNCTION public.audit_trigger_func() TO authenticated;
GRANT EXECUTE ON FUNCTION public.audit_trigger_func() TO service_role;
