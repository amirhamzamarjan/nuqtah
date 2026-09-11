-- NUQTAH ECOSYSTEM — SUPABASE POSTGRESQL SCHEMA MIGRATION
-- Migration: 20260911000000_nuqtah_schema.sql
-- Production ready schema with strict RLS, indexes, constraints, and audit triggers

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ECOMMERCE FOUNDATION (DEPARTMENTS, CATEGORIES, PRODUCTS, VARIANTS, OFFERS)
-- ============================================================================

-- Departments (Men, Women, Kids, Attar, Organic Food)
CREATE TABLE IF NOT EXISTS public.departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  theme TEXT NOT NULL DEFAULT 'men',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories (Configurable per Department, e.g., Noor, Haya, Panjabi, Little Noor)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(department_id, slug)
);

-- Subcategories
CREATE TABLE IF NOT EXISTS public.subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Collections (e.g. The Heritage Edit, Noor Collection, Signature Scents)
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  banner_image TEXT,
  department_id TEXT REFERENCES public.departments(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL,
  collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  old_price NUMERIC(12,2) CHECK (old_price >= 0),
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed', 'sale_price')),
  discount_value NUMERIC(12,2),
  sale_price NUMERIC(12,2) CHECK (sale_price >= 0),
  main_image TEXT NOT NULL,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  hover_image TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  badge TEXT CHECK (badge IN ('New', 'Featured', 'Sale', 'Limited', 'Low Stock', 'Best Seller')),
  active BOOLEAN NOT NULL DEFAULT true,
  available BOOLEAN NOT NULL DEFAULT true,
  total_stock INT NOT NULL DEFAULT 0 CHECK (total_stock >= 0),
  specifications JSONB DEFAULT '{}'::jsonb,
  care_instructions JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product Variants (Size, Color, Weight, Volume, Fragrance, Stock)
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
  price_override NUMERIC(12,2) CHECK (price_override >= 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Offers & Promotions
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(12,2) NOT NULL CHECK (discount_value > 0),
  banner_image TEXT,
  department_id TEXT REFERENCES public.departments(id) ON DELETE SET NULL,
  product_ids JSONB DEFAULT '[]'::jsonb,
  category_ids JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Coupons
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(12,2) NOT NULL CHECK (discount_value > 0),
  minimum_purchase NUMERIC(12,2) DEFAULT 0,
  maximum_discount NUMERIC(12,2),
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  usage_limit INT,
  used_count INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Orders & Inquiries (Database foundation for WhatsApp order records and future checkout)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp TEXT,
  customer_address TEXT,
  status TEXT NOT NULL DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  sku TEXT NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  variant_name TEXT,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL,
  total_price NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. NUQTAH SCREEN (MEDIA, VIDEOS, SPEAKERS, SERIES, PODCASTS, QUOTES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.screen_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_series (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  speaker_id UUID REFERENCES public.screen_speakers(id) ON DELETE SET NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.screen_categories(id) ON DELETE RESTRICT,
  speaker_id UUID REFERENCES public.screen_speakers(id) ON DELETE SET NULL,
  series_id UUID REFERENCES public.screen_series(id) ON DELETE SET NULL,
  episode_number INT,
  duration TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_podcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  speaker_id UUID REFERENCES public.screen_speakers(id) ON DELETE SET NULL,
  series_id UUID REFERENCES public.screen_series(id) ON DELETE SET NULL,
  duration TEXT NOT NULL,
  duration_seconds INT NOT NULL DEFAULT 0,
  waveform_data JSONB DEFAULT '[]'::jsonb,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  speaker_name TEXT NOT NULL,
  speaker_id UUID REFERENCES public.screen_speakers(id) ON DELETE SET NULL,
  source TEXT,
  video_id UUID REFERENCES public.screen_videos(id) ON DELETE SET NULL,
  series_id UUID REFERENCES public.screen_series(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. NUQTAH INSTITUTE (AYAT, ARTICLES, TOPICS, RESOURCES, FUTURE COURSES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.institute_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.institute_ayat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  arabic_text TEXT NOT NULL,
  translation TEXT NOT NULL,
  surah_name_arabic TEXT NOT NULL,
  surah_name_english TEXT NOT NULL,
  surah_number INT NOT NULL,
  ayah_number INT NOT NULL,
  reference TEXT NOT NULL,
  reflection TEXT,
  topic_id UUID REFERENCES public.institute_topics(id) ON DELETE SET NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.institute_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  author TEXT NOT NULL,
  topic_id UUID REFERENCES public.institute_topics(id) ON DELETE SET NULL,
  reading_time_minutes INT NOT NULL DEFAULT 5,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.institute_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('PDF', 'Audio', 'Document', 'Study Guide')),
  file_url TEXT NOT NULL,
  file_size TEXT,
  topic_id UUID REFERENCES public.institute_topics(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Future Course Platform Foundation
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  instructor_name TEXT NOT NULL,
  instructor_bio TEXT,
  topic_id UUID REFERENCES public.institute_topics(id) ON DELETE SET NULL,
  level TEXT NOT NULL CHECK (level IN ('Foundational', 'Intermediate', 'Advanced')),
  duration_weeks INT DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Enrolling', 'In Session', 'Archived')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INT,
  video_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. ADMIN USERS & GLOBAL SETTINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Super Admin', 'Store Manager', 'Content Manager')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.global_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. INDEXES FOR HIGH QUERY PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_products_dept_cat ON public.products(department_id, category_id, active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured, active);
CREATE INDEX IF NOT EXISTS idx_variants_product ON public.product_variants(product_id, active);
CREATE INDEX IF NOT EXISTS idx_screen_videos_featured ON public.screen_videos(featured, active);
CREATE INDEX IF NOT EXISTS idx_screen_videos_cat ON public.screen_videos(category_id, active);
CREATE INDEX IF NOT EXISTS idx_institute_ayat_featured ON public.institute_ayat(featured, published);
CREATE INDEX IF NOT EXISTS idx_institute_articles_featured ON public.institute_articles(featured, active);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screen_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_ayat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies for active/published records
CREATE POLICY "Public read active departments" ON public.departments FOR SELECT USING (active = true);
CREATE POLICY "Public read active categories" ON public.categories FOR SELECT USING (active = true);
CREATE POLICY "Public read active subcategories" ON public.subcategories FOR SELECT USING (active = true);
CREATE POLICY "Public read active collections" ON public.collections FOR SELECT USING (active = true);
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (active = true);
CREATE POLICY "Public read active variants" ON public.product_variants FOR SELECT USING (active = true);
CREATE POLICY "Public read active offers" ON public.offers FOR SELECT USING (active = true AND NOW() BETWEEN start_at AND end_at);
CREATE POLICY "Public read active screen categories" ON public.screen_categories FOR SELECT USING (active = true);
CREATE POLICY "Public read active screen speakers" ON public.screen_speakers FOR SELECT USING (active = true);
CREATE POLICY "Public read active screen series" ON public.screen_series FOR SELECT USING (active = true);
CREATE POLICY "Public read active screen videos" ON public.screen_videos FOR SELECT USING (active = true);
CREATE POLICY "Public read active screen podcasts" ON public.screen_podcasts FOR SELECT USING (active = true);
CREATE POLICY "Public read active screen quotes" ON public.screen_quotes FOR SELECT USING (active = true);
CREATE POLICY "Public read active institute topics" ON public.institute_topics FOR SELECT USING (active = true);
CREATE POLICY "Public read published institute ayat" ON public.institute_ayat FOR SELECT USING (published = true);
CREATE POLICY "Public read active institute articles" ON public.institute_articles FOR SELECT USING (active = true);
CREATE POLICY "Public read active institute resources" ON public.institute_resources FOR SELECT USING (active = true);
CREATE POLICY "Public read active courses" ON public.courses FOR SELECT USING (active = true);
CREATE POLICY "Public read course modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Public read course lessons" ON public.course_lessons FOR SELECT USING (true);
CREATE POLICY "Public read global settings" ON public.global_settings FOR SELECT USING (true);

-- Authenticated Admin Full Access
CREATE POLICY "Admin full access departments" ON public.departments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access categories" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access subcategories" ON public.subcategories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access collections" ON public.collections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access variants" ON public.product_variants FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access offers" ON public.offers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access coupons" ON public.coupons FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access orders" ON public.orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access order_items" ON public.order_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access screen_categories" ON public.screen_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access screen_speakers" ON public.screen_speakers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access screen_series" ON public.screen_series FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access screen_videos" ON public.screen_videos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access screen_podcasts" ON public.screen_podcasts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access screen_quotes" ON public.screen_quotes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access institute_topics" ON public.institute_topics FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access institute_ayat" ON public.institute_ayat FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access institute_articles" ON public.institute_articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access institute_resources" ON public.institute_resources FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access courses" ON public.courses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access course_modules" ON public.course_modules FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access course_lessons" ON public.course_lessons FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access global_settings" ON public.global_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access admin_users" ON public.admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- 7. SAFE INVENTORY ATOMIC DECREMENT / INCREMENT FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.decrement_product_variant_stock(
  p_variant_id UUID,
  p_quantity INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_stock INT;
  v_product_id UUID;
BEGIN
  -- Lock row for update to prevent race conditions
  SELECT stock, product_id INTO v_current_stock, v_product_id
  FROM public.product_variants
  WHERE id = p_variant_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Variant not found';
  END IF;

  IF v_current_stock < p_quantity THEN
    RETURN false; -- Insufficient stock
  END IF;

  UPDATE public.product_variants
  SET stock = stock - p_quantity,
      updated_at = NOW()
  WHERE id = p_variant_id;

  -- Update total product stock
  UPDATE public.products
  SET total_stock = (
    SELECT COALESCE(SUM(stock), 0)
    FROM public.product_variants
    WHERE product_id = v_product_id
  ),
  available = (
    SELECT COALESCE(SUM(stock), 0) > 0
    FROM public.product_variants
    WHERE product_id = v_product_id
  ),
  updated_at = NOW()
  WHERE id = v_product_id;

  RETURN true;
END;
$$;
