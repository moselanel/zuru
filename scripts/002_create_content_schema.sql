-- ============================================================
-- ZURU MULTI-TENANT SCHEMA
-- Script 002: Content tables (destinations, experiences, etc.)
-- ============================================================

-- ============================================================
-- DESTINATIONS TABLE
-- Regions/areas within a tenant's portfolio
-- ============================================================
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Basic info
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Location
  country TEXT,
  region TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Media
  hero_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Content
  highlights JSONB DEFAULT '[]'::jsonb,
  best_time_to_visit TEXT,
  climate TEXT,
  
  -- Multilingual content
  translations JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  UNIQUE(tenant_id, slug)
);

-- ============================================================
-- ATTRACTIONS TABLE
-- Points of interest within destinations
-- ============================================================
CREATE TABLE IF NOT EXISTS public.attractions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  
  -- Basic info
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Type
  category TEXT CHECK (category IN ('natural', 'cultural', 'historical', 'adventure', 'wildlife', 'other')),
  
  -- Location
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address TEXT,
  
  -- Media
  hero_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Details
  opening_hours JSONB,
  entrance_fee TEXT,
  contact_info JSONB,
  
  -- Multilingual
  translations JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  UNIQUE(tenant_id, slug)
);

-- ============================================================
-- EXPERIENCES TABLE
-- Activities and tours
-- ============================================================
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  
  -- Basic info
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Type
  category TEXT CHECK (category IN ('safari', 'cultural', 'adventure', 'wellness', 'culinary', 'photography', 'walking', 'water', 'other')),
  
  -- Logistics
  duration TEXT,
  duration_hours DECIMAL(5, 2),
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'challenging', 'extreme')),
  group_size_min INTEGER,
  group_size_max INTEGER,
  
  -- Pricing
  price_from DECIMAL(10, 2),
  price_currency TEXT DEFAULT 'ZAR',
  price_includes TEXT,
  price_excludes TEXT,
  
  -- Media
  hero_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Details
  highlights JSONB DEFAULT '[]'::jsonb,
  requirements JSONB DEFAULT '[]'::jsonb,
  what_to_bring JSONB DEFAULT '[]'::jsonb,
  
  -- Multilingual
  translations JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  UNIQUE(tenant_id, slug)
);

-- ============================================================
-- ACCOMMODATIONS TABLE
-- Lodges, hotels, camps
-- ============================================================
CREATE TABLE IF NOT EXISTS public.accommodations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  
  -- Basic info
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Type
  category TEXT CHECK (category IN ('lodge', 'hotel', 'camp', 'guesthouse', 'villa', 'glamping', 'treehouse', 'other')),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  
  -- Location
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address TEXT,
  
  -- Pricing
  price_from DECIMAL(10, 2),
  price_currency TEXT DEFAULT 'ZAR',
  price_per TEXT DEFAULT 'night' CHECK (price_per IN ('night', 'person', 'room')),
  
  -- Capacity
  total_rooms INTEGER,
  max_guests INTEGER,
  
  -- Media
  hero_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Amenities & Features
  amenities JSONB DEFAULT '[]'::jsonb,
  room_types JSONB DEFAULT '[]'::jsonb,
  
  -- Contact
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  
  -- Multilingual
  translations JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  UNIQUE(tenant_id, slug)
);

-- ============================================================
-- GUIDES TABLE
-- Tour guides and specialists
-- ============================================================
CREATE TABLE IF NOT EXISTS public.guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Basic info
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  short_bio TEXT,
  
  -- Expertise
  specializations JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  years_experience INTEGER,
  
  -- Media
  photo_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Contact
  email TEXT,
  phone TEXT,
  
  -- Multilingual
  translations JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  UNIQUE(tenant_id, slug)
);

-- ============================================================
-- EVENTS TABLE
-- Festivals, seasonal events
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  
  -- Basic info
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Type
  category TEXT CHECK (category IN ('festival', 'cultural', 'wildlife', 'sports', 'music', 'food', 'other')),
  
  -- Dates
  start_date DATE,
  end_date DATE,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT,
  
  -- Location
  venue TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Media
  hero_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  
  -- Details
  ticket_info TEXT,
  external_url TEXT,
  
  -- Multilingual
  translations JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  UNIQUE(tenant_id, slug)
);

-- ============================================================
-- ENQUIRIES TABLE
-- Lead capture from visitors
-- ============================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  
  -- Enquiry details
  subject TEXT,
  message TEXT,
  
  -- Context
  source_page TEXT,
  source_url TEXT,
  
  -- Related content (optional)
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
  accommodation_id UUID REFERENCES public.accommodations(id) ON DELETE SET NULL,
  
  -- Travel details (from AI planner)
  travel_dates JSONB,
  group_size INTEGER,
  budget_range TEXT,
  interests JSONB DEFAULT '[]'::jsonb,
  
  -- AI-generated itinerary (if from trip planner)
  ai_itinerary JSONB,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- ============================================================
-- MEDIA LIBRARY TABLE
-- Shared media assets per tenant
-- ============================================================
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- File info
  filename TEXT NOT NULL,
  original_filename TEXT,
  url TEXT NOT NULL,
  
  -- Type
  mime_type TEXT,
  file_size INTEGER,
  
  -- Dimensions (for images)
  width INTEGER,
  height INTEGER,
  
  -- Metadata
  alt_text TEXT,
  caption TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- Audit fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_destinations_tenant ON public.destinations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON public.destinations(tenant_id, slug);
CREATE INDEX IF NOT EXISTS idx_attractions_tenant ON public.attractions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_attractions_destination ON public.attractions(destination_id);
CREATE INDEX IF NOT EXISTS idx_experiences_tenant ON public.experiences(tenant_id);
CREATE INDEX IF NOT EXISTS idx_experiences_destination ON public.experiences(destination_id);
CREATE INDEX IF NOT EXISTS idx_accommodations_tenant ON public.accommodations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_accommodations_destination ON public.accommodations(destination_id);
CREATE INDEX IF NOT EXISTS idx_guides_tenant ON public.guides(tenant_id);
CREATE INDEX IF NOT EXISTS idx_events_tenant ON public.events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_events_dates ON public.events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_enquiries_tenant ON public.enquiries(tenant_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_media_tenant ON public.media(tenant_id);

-- ============================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES: CONTENT TABLES
-- Pattern: 
--   - SELECT: Tenant members OR published content (for public sites)
--   - INSERT/UPDATE/DELETE: Tenant members with content permission
-- ============================================================

-- Helper function to check if user is tenant member
CREATE OR REPLACE FUNCTION public.is_tenant_member(p_tenant_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.tenant_users 
    WHERE tenant_id = p_tenant_id AND user_id = auth.uid() AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user can manage content
CREATE OR REPLACE FUNCTION public.can_manage_content(p_tenant_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.tenant_users 
    WHERE tenant_id = p_tenant_id 
      AND user_id = auth.uid() 
      AND is_active = TRUE
      AND (can_manage_content = TRUE OR role IN ('owner', 'admin'))
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- DESTINATIONS policies
CREATE POLICY "destinations_select" ON public.destinations
  FOR SELECT USING (
    public.is_tenant_member(tenant_id) OR is_published = TRUE
  );

CREATE POLICY "destinations_insert" ON public.destinations
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "destinations_update" ON public.destinations
  FOR UPDATE USING (public.can_manage_content(tenant_id));

CREATE POLICY "destinations_delete" ON public.destinations
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- ATTRACTIONS policies
CREATE POLICY "attractions_select" ON public.attractions
  FOR SELECT USING (
    public.is_tenant_member(tenant_id) OR is_published = TRUE
  );

CREATE POLICY "attractions_insert" ON public.attractions
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "attractions_update" ON public.attractions
  FOR UPDATE USING (public.can_manage_content(tenant_id));

CREATE POLICY "attractions_delete" ON public.attractions
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- EXPERIENCES policies
CREATE POLICY "experiences_select" ON public.experiences
  FOR SELECT USING (
    public.is_tenant_member(tenant_id) OR is_published = TRUE
  );

CREATE POLICY "experiences_insert" ON public.experiences
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "experiences_update" ON public.experiences
  FOR UPDATE USING (public.can_manage_content(tenant_id));

CREATE POLICY "experiences_delete" ON public.experiences
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- ACCOMMODATIONS policies
CREATE POLICY "accommodations_select" ON public.accommodations
  FOR SELECT USING (
    public.is_tenant_member(tenant_id) OR is_published = TRUE
  );

CREATE POLICY "accommodations_insert" ON public.accommodations
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "accommodations_update" ON public.accommodations
  FOR UPDATE USING (public.can_manage_content(tenant_id));

CREATE POLICY "accommodations_delete" ON public.accommodations
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- GUIDES policies
CREATE POLICY "guides_select" ON public.guides
  FOR SELECT USING (
    public.is_tenant_member(tenant_id) OR is_published = TRUE
  );

CREATE POLICY "guides_insert" ON public.guides
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "guides_update" ON public.guides
  FOR UPDATE USING (public.can_manage_content(tenant_id));

CREATE POLICY "guides_delete" ON public.guides
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- EVENTS policies
CREATE POLICY "events_select" ON public.events
  FOR SELECT USING (
    public.is_tenant_member(tenant_id) OR is_published = TRUE
  );

CREATE POLICY "events_insert" ON public.events
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "events_update" ON public.events
  FOR UPDATE USING (public.can_manage_content(tenant_id));

CREATE POLICY "events_delete" ON public.events
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- ENQUIRIES policies (only tenant members can view, anyone can insert)
CREATE POLICY "enquiries_select" ON public.enquiries
  FOR SELECT USING (public.is_tenant_member(tenant_id));

CREATE POLICY "enquiries_insert" ON public.enquiries
  FOR INSERT WITH CHECK (TRUE); -- Anyone can submit an enquiry

CREATE POLICY "enquiries_update" ON public.enquiries
  FOR UPDATE USING (public.is_tenant_member(tenant_id));

CREATE POLICY "enquiries_delete" ON public.enquiries
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- MEDIA policies
CREATE POLICY "media_select" ON public.media
  FOR SELECT USING (public.is_tenant_member(tenant_id));

CREATE POLICY "media_insert" ON public.media
  FOR INSERT WITH CHECK (public.can_manage_content(tenant_id));

CREATE POLICY "media_delete" ON public.media
  FOR DELETE USING (public.can_manage_content(tenant_id));

-- ============================================================
-- AUDIT TRIGGERS FOR CONTENT TABLES
-- ============================================================
CREATE TRIGGER audit_destinations
  AFTER INSERT OR UPDATE OR DELETE ON public.destinations
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

CREATE TRIGGER audit_attractions
  AFTER INSERT OR UPDATE OR DELETE ON public.attractions
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

CREATE TRIGGER audit_experiences
  AFTER INSERT OR UPDATE OR DELETE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

CREATE TRIGGER audit_accommodations
  AFTER INSERT OR UPDATE OR DELETE ON public.accommodations
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

CREATE TRIGGER audit_guides
  AFTER INSERT OR UPDATE OR DELETE ON public.guides
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

CREATE TRIGGER audit_events
  AFTER INSERT OR UPDATE OR DELETE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

CREATE TRIGGER audit_enquiries
  AFTER INSERT OR UPDATE OR DELETE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();

-- ============================================================
-- UPDATE TIMESTAMP TRIGGERS
-- ============================================================
CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_attractions_updated_at
  BEFORE UPDATE ON public.attractions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_accommodations_updated_at
  BEFORE UPDATE ON public.accommodations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
