-- NUQTAH ECOSYSTEM — SUPABASE POSTGRESQL SCHEMA MIGRATION
-- Production-ready schema with TEXT primary keys, full compatibility, triggers, and permissive RLS for seamless cross-device synchronization.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ECOMMERCE FOUNDATION (DEPARTMENTS, CATEGORIES, PRODUCTS, VARIANTS, OFFERS)
-- ============================================================================

-- Departments
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

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subcategories
CREATE TABLE IF NOT EXISTS public.subcategories (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Collections
CREATE TABLE IF NOT EXISTS public.collections (
  id TEXT PRIMARY KEY,
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
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
  category_id TEXT NOT NULL,
  subcategory_id TEXT,
  collection_id TEXT,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  old_price NUMERIC(12,2),
  discount_type TEXT,
  discount_value NUMERIC(12,2),
  sale_price NUMERIC(12,2),
  main_image TEXT NOT NULL,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  hover_image TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  badge TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  available BOOLEAN NOT NULL DEFAULT true,
  total_stock INT NOT NULL DEFAULT 0,
  specifications JSONB DEFAULT '{}'::jsonb,
  care_instructions JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product Variants
CREATE TABLE IF NOT EXISTS public.product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
  price_override NUMERIC(12,2),
  stock INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Offers & Promotions
CREATE TABLE IF NOT EXISTS public.offers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percentage',
  discount_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  banner_image TEXT,
  department_id TEXT,
  product_ids JSONB DEFAULT '[]'::jsonb,
  category_ids JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Coupons
CREATE TABLE IF NOT EXISTS public.coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percentage',
  discount_value NUMERIC(12,2) NOT NULL DEFAULT 0,
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

-- Orders & Inquiries
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_whatsapp TEXT,
  customer_address TEXT,
  status TEXT NOT NULL DEFAULT 'inquiry',
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  shipping NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  sku TEXT NOT NULL,
  variant_id TEXT,
  variant_name TEXT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. NUQTAH SCREEN (MEDIA, VIDEOS, SPEAKERS, SERIES, PODCASTS, QUOTES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.screen_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_speakers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  photo_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_series (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL,
  speaker_id TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  youtube_url TEXT NOT NULL DEFAULT '',
  youtube_id TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL,
  speaker_id TEXT,
  series_id TEXT,
  episode_number INT,
  duration TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_podcasts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  audio_url TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  speaker_id TEXT,
  series_id TEXT,
  duration TEXT NOT NULL DEFAULT '00:00',
  duration_seconds INT NOT NULL DEFAULT 0,
  waveform_data JSONB DEFAULT '[]'::jsonb,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screen_quotes (
  id TEXT PRIMARY KEY,
  quote TEXT NOT NULL,
  speaker_name TEXT NOT NULL,
  speaker_id TEXT,
  source TEXT,
  video_id TEXT,
  series_id TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. NUQTAH INSTITUTE (AYAT, ARTICLES, TOPICS, RESOURCES, FUTURE COURSES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.institute_topics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.institute_ayat (
  id TEXT PRIMARY KEY,
  arabic_text TEXT NOT NULL,
  translation TEXT NOT NULL,
  surah_name_arabic TEXT NOT NULL DEFAULT '',
  surah_name_english TEXT NOT NULL DEFAULT '',
  surah_number INT NOT NULL DEFAULT 1,
  ayah_number INT NOT NULL DEFAULT 1,
  reference TEXT NOT NULL,
  reflection TEXT,
  topic_id TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.institute_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '',
  topic_id TEXT,
  reading_time_minutes INT NOT NULL DEFAULT 5,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  featured BOOLEAN NOT NULL DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.institute_resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  file_type TEXT NOT NULL DEFAULT 'PDF',
  file_url TEXT NOT NULL,
  file_size TEXT,
  topic_id TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL,
  instructor_name TEXT NOT NULL DEFAULT '',
  instructor_bio TEXT,
  topic_id TEXT,
  level TEXT NOT NULL DEFAULT 'Foundational',
  duration_weeks INT DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'Upcoming',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_modules (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
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
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Super Admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.global_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES (FULL READ & WRITE ACCESS)
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

-- Allow read & write access for seamless sync
CREATE POLICY "Allow public read and write departments" ON public.departments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write subcategories" ON public.subcategories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write collections" ON public.collections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write product_variants" ON public.product_variants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write offers" ON public.offers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write coupons" ON public.coupons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write order_items" ON public.order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write screen_categories" ON public.screen_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write screen_speakers" ON public.screen_speakers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write screen_series" ON public.screen_series FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write screen_videos" ON public.screen_videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write screen_podcasts" ON public.screen_podcasts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write screen_quotes" ON public.screen_quotes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write institute_topics" ON public.institute_topics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write institute_ayat" ON public.institute_ayat FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write institute_articles" ON public.institute_articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write institute_resources" ON public.institute_resources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write course_modules" ON public.course_modules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write course_lessons" ON public.course_lessons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write global_settings" ON public.global_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read and write admin_users" ON public.admin_users FOR ALL USING (true) WITH CHECK (true);
