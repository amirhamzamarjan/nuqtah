-- NUQTAH ECOSYSTEM — SUPABASE SEED DATA
-- Authentic, high-fidelity seeds with real categories, products, media, and Quranic reflections.

-- ============================================================================
-- 1. DEPARTMENTS
-- ============================================================================

INSERT INTO public.departments (id, name, slug, tagline, description, image, theme, active, display_order) VALUES
('men', 'Men', 'men', 'Refined Heritage & Occasion Wear', 'Impeccably tailored Panjabis, Kablis, and traditional menswear crafted with timeless elegance.', 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80', 'men', true, 1),
('women', 'Women', 'women', 'Grace, Modesty & Timeless Luxury', 'A dedicated luxury sanctuary of pure silks, handcrafted abayas, and refined modest silhouettes.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80', 'women', true, 2),
('kids', 'Kids', 'kids', 'Little Noor & Young Elegance', 'Gentle fabrics, modest silhouettes, and festive edits created for children with warmth and care.', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80', 'kids', true, 3),
('attar', 'Attar', 'attar', 'Pure Artisanal Distillations', 'Rare agarwood, Taif rose, and natural botanical extractions bottled in crystal flacons.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80', 'attar', true, 4),
('organic-food', 'Organic Food', 'organic-food', 'Pure & Wholesome Sustenance', 'Raw forest honeys, cold-pressed black seed oils, and ethically harvested natural essentials.', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80', 'food', true, 5)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. CATEGORIES
-- ============================================================================

-- Men
INSERT INTO public.categories (id, department_id, name, slug, description, active, display_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'men', 'Panjabi', 'panjabi', 'Handwoven and embroidered premium panjabis.', true, 1),
('c1000000-0000-0000-0000-000000000002', 'men', 'Kabli Set', 'kabli-set', 'Structured silhouette two-piece occasion wear.', true, 2),
('c1000000-0000-0000-0000-000000000003', 'men', 'Payjama & Trousers', 'payjama', 'Tailored cotton and linen bottom wear.', true, 3),
('c1000000-0000-0000-0000-000000000004', 'men', 'Heritage Edit', 'heritage-edit', 'Limited artisan handloom textiles.', true, 4)
ON CONFLICT (id) DO NOTHING;

-- Women (Dedicated Luxury Experience)
INSERT INTO public.categories (id, department_id, name, slug, description, active, display_order) VALUES
('c2000000-0000-0000-0000-000000000001', 'women', 'Noor', 'noor', 'Luminous silk and linen abayas with understated embroidery.', true, 1),
('c2000000-0000-0000-0000-000000000002', 'women', 'Haya', 'haya', 'Flowing modest essentials and everyday luxury layers.', true, 2),
('c2000000-0000-0000-0000-000000000003', 'women', 'Zahra Edit', 'zahra-edit', 'Dusty rose and soft blush festive occasion wear.', true, 3),
('c2000000-0000-0000-0000-000000000004', 'women', 'Signature Modesty', 'signature-modesty', 'Floor-length silhouettes with premium drapery.', true, 4)
ON CONFLICT (id) DO NOTHING;

-- Kids
INSERT INTO public.categories (id, department_id, name, slug, description, active, display_order) VALUES
('c3000000-0000-0000-0000-000000000001', 'kids', 'Little Noor', 'little-noor', 'Breathable cotton festive sets for boys and girls.', true, 1),
('c3000000-0000-0000-0000-000000000002', 'kids', 'Mini Heritage', 'mini-heritage', 'Traditional silhouettes scaled with utmost comfort.', true, 2),
('c3000000-0000-0000-0000-000000000003', 'kids', 'Junior Edit', 'junior-edit', 'Occasion wear for ages 8 to 14 years.', true, 3)
ON CONFLICT (id) DO NOTHING;

-- Attar
INSERT INTO public.categories (id, department_id, name, slug, description, active, display_order) VALUES
('c4000000-0000-0000-0000-000000000001', 'attar', 'Signature Scents', 'signature-scents', 'Master distillations of aged Hindi oud and ambergris.', true, 1),
('c4000000-0000-0000-0000-000000000002', 'attar', 'Classic Attar', 'classic-attar', 'Pure Taif rose, white musk, and sandalwood.', true, 2)
ON CONFLICT (id) DO NOTHING;

-- Organic Food
INSERT INTO public.categories (id, department_id, name, slug, description, active, display_order) VALUES
('c5000000-0000-0000-0000-000000000001', 'organic-food', 'Curated Essentials', 'curated-essentials', 'Raw artisan honey and cold-pressed pure oils.', true, 1),
('c5000000-0000-0000-0000-000000000002', 'organic-food', 'Natural Selection', 'natural-selection', 'Premium dates, mountain herbs, and natural seeds.', true, 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 3. COLLECTIONS
-- ============================================================================

INSERT INTO public.collections (id, name, slug, description, featured, active) VALUES
('d1000000-0000-0000-0000-000000000001', 'The Heritage Edit', 'the-heritage-edit', 'Rooted in timeless craftsmanship and pure natural fibers.', true, true),
('d1000000-0000-0000-0000-000000000002', 'Noor Collection', 'noor-collection', 'Luminous occasion wear designed with serene modesty.', true, true),
('d1000000-0000-0000-0000-000000000003', 'Signature Scents', 'signature-scents', 'Artisanal hydro-distilled botanical oils and ouds.', true, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. PRODUCTS & VARIANTS
-- ============================================================================

-- Product 1: White Premium Panjabi (Stock = 5: 38=2, 40=1, 42=2, 44=0)
INSERT INTO public.products (
  id, slug, name, short_description, description, department_id, category_id, collection_id, sku,
  price, old_price, discount_type, discount_value, sale_price,
  main_image, gallery_images, featured, badge, active, available, total_stock,
  specifications, care_instructions, tags
) VALUES (
  'p1000000-0000-0000-0000-000000000001',
  'white-premium-panjabi',
  'White Premium Heritage Panjabi',
  'Hand-tailored Egyptian Giza cotton with subtle tone-on-tone collar embroidery.',
  'Crafted from 100% extra-long staple Egyptian Giza cotton, this white panjabi represents the pinnacle of understated luxury. Designed with a tailored mandarin collar featuring fine tone-on-tone embroidery, mother-of-pearl buttons, and a relaxed ergonomic drape.',
  'men', 'c1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'NQT-MEN-PJ-001',
  2900, 3500, 'sale_price', 0, 2900,
  'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true, 'Sale', true, true, 5,
  '{"Fabric": "100% Egyptian Giza Cotton", "Weave": "Fine Twill", "Collar": "Mandarin with Minimal Threadwork", "Buttons": "Natural Mother of Pearl"}'::jsonb,
  '["Dry clean recommended for first wash", "Gentle hand wash in cold water", "Iron on reverse side with medium heat"]'::jsonb,
  '["panjabi", "cotton", "heritage", "eid", "occasion"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Variants for White Premium Panjabi
INSERT INTO public.product_variants (id, product_id, sku, name, attributes, stock, active) VALUES
('v1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', 'NQT-MEN-PJ-001-38', 'Size 38 / White', '{"size": "38", "color": "Pure White"}'::jsonb, 2, true),
('v1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000001', 'NQT-MEN-PJ-001-40', 'Size 40 / White', '{"size": "40", "color": "Pure White"}'::jsonb, 1, true),
('v1000000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000001', 'NQT-MEN-PJ-001-42', 'Size 42 / White', '{"size": "42", "color": "Pure White"}'::jsonb, 2, true),
('v1000000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000001', 'NQT-MEN-PJ-001-44', 'Size 44 / White', '{"size": "44", "color": "Pure White"}'::jsonb, 0, true)
ON CONFLICT (id) DO NOTHING;

-- Product 2: Noor Embroidered Silk Abaya (Women Luxury Experience)
INSERT INTO public.products (
  id, slug, name, short_description, description, department_id, category_id, collection_id, sku,
  price, old_price, discount_type, discount_value, sale_price,
  main_image, gallery_images, featured, badge, active, available, total_stock,
  specifications, care_instructions, tags
) VALUES (
  'p2000000-0000-0000-0000-000000000001',
  'noor-embroidered-silk-abaya',
  'Noor Embroidered Raw Silk Abaya',
  'Fluid rosewood silk silhouette adorned with handcrafted champagne thread accents.',
  'An ethereal addition to the Noor luxury line. Crafted from hand-spun raw silk with a soft crepe lining. The graceful sleeves are trimmed with delicate champagne metallic needlework, offering modest grandeur.',
  'women', 'c2000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000002', 'NQT-WOM-AB-001',
  7800, 9200, 'percentage', 15, 7820,
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true, 'Featured', true, true, 8,
  '{"Fabric": "Pure Raw Silk Crepe", "Cut": "Relaxed A-Line Abaya", "Details": "Hand-stitched Cuff Trim", "Lining": "Breathable Modal"}'::jsonb,
  '["Specialist dry clean only", "Store on padded hanger", "Steam iron only"]'::jsonb,
  '["abaya", "women", "silk", "luxury", "noor", "rosewood"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_variants (id, product_id, sku, name, attributes, stock, active) VALUES
('v2000000-0000-0000-0000-000000000001', 'p2000000-0000-0000-0000-000000000001', 'NQT-WOM-AB-001-52', 'Size 52 / Rosewood', '{"size": "52", "color": "Rosewood"}'::jsonb, 3, true),
('v2000000-0000-0000-0000-000000000002', 'p2000000-0000-0000-0000-000000000001', 'NQT-WOM-AB-001-54', 'Size 54 / Rosewood', '{"size": "54", "color": "Rosewood"}'::jsonb, 3, true),
('v2000000-0000-0000-0000-000000000003', 'p2000000-0000-0000-0000-000000000001', 'NQT-WOM-AB-001-56', 'Size 56 / Rosewood', '{"size": "56", "color": "Rosewood"}'::jsonb, 2, true)
ON CONFLICT (id) DO NOTHING;

-- Product 3: Taif Rose & Aged Hindi Oud Attar (Attar Luxury)
INSERT INTO public.products (
  id, slug, name, short_description, description, department_id, category_id, collection_id, sku,
  price, old_price, discount_type, discount_value, sale_price,
  main_image, gallery_images, featured, badge, active, available, total_stock,
  specifications, care_instructions, tags
) VALUES (
  'p4000000-0000-0000-0000-000000000001',
  'taif-rose-aged-oud-attar',
  'Taif Rose & Aged Hindi Oud Attar',
  '12-year vintage hydro-distilled Assam agarwood infused with wild Taif mountain rose petals.',
  'An opulent, alcohol-free pure oil distillation. Opening with the fresh, crisp floral sweetness of high-altitude Taif rose, deepening into resinous antique leather, earthy woods, and enduring amber warmth.',
  'attar', 'c4000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000003', 'NQT-ATR-001',
  4500, 5000, 'fixed', 500, 4500,
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true, 'Best Seller', true, true, 12,
  '{"Origin": "Assam & Taif", "Volume": "6ml & 12ml Crystal Flacon", "Alcohol": "0% Pure Oil", "Aging": "12 Years Matured"}'::jsonb,
  '["Apply to pulse points", "Store away from direct sunlight", "Keep bottle upright"]'::jsonb,
  '["attar", "oud", "rose", "perfume", "fragrance"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_variants (id, product_id, sku, name, attributes, stock, active) VALUES
('v4000000-0000-0000-0000-000000000001', 'p4000000-0000-0000-0000-000000000001', 'NQT-ATR-001-6ML', '6ml Crystal Flacon', '{"volume": "6ml"}'::jsonb, 8, true),
('v4000000-0000-0000-0000-000000000002', 'p4000000-0000-0000-0000-000000000001', 'NQT-ATR-001-12ML', '12ml Crystal Flacon', '{"volume": "12ml"}'::jsonb, 4, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 5. SCREEN CONTENT (VIDEOS, SPEAKERS, SERIES, PODCASTS, QUOTES)
-- ============================================================================

INSERT INTO public.screen_categories (id, name, slug, description, active, display_order) VALUES
('sc100000-0000-0000-0000-000000000001', 'Nasihah / Advice', 'nasihah', 'Heart-softening reflections and guidance for navigating modern life.', true, 1),
('sc200000-0000-0000-0000-000000000002', 'Scholarly Discourses', 'discourses', 'Deep dives into metaphysics, theology, and ethical philosophy.', true, 2),
('sc300000-0000-0000-0000-000000000003', 'Short Clips', 'short-clips', 'Concise moments of clarity and contemplation.', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_speakers (id, name, slug, title, bio, photo_url, active) VALUES
('sp100000-0000-0000-0000-000000000001', 'Shaykh Abdal Hakim Murad', 'abdal-hakim-murad', 'Dean of Cambridge Muslim College', 'Scholar, author, and translator focusing on Islamic theology, ethics, and contemporary spiritual challenges.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', true),
('sp200000-0000-0000-0000-000000000002', 'Dr. Umar Faruq Abd-Allah', 'umar-faruq-abd-allah', 'Islamic Scholar and Historian', 'Renowned teacher and author specializing in Islamic civilization, classical Arabic, and spiritual theology.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_series (id, title, slug, description, cover_image, active, display_order) VALUES
('ss100000-0000-0000-0000-000000000001', 'Traveling Light: Disciplining the Soul', 'traveling-light', 'A journey through Imam al-Ghazali’s masterpiece Ihya Ulum al-Din.', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', true, 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_videos (id, title, slug, youtube_url, youtube_id, thumbnail, description, category_id, speaker_id, series_id, episode_number, duration, published_at, featured, tags, active) VALUES
('sv100000-0000-0000-0000-000000000001', 'The Architecture of Inner Stillness', 'architecture-of-inner-stillness', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', 'An exploration of spiritual clarity amidst the noise of the digital age, drawing from classical wisdom.', 'sc100000-0000-0000-0000-000000000001', 'sp100000-0000-0000-0000-000000000001', 'ss100000-0000-0000-0000-000000000001', 1, '28:45', NOW(), true, '["stillness", "spirituality", "ghazali"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_podcasts (id, title, slug, description, audio_url, cover_image, speaker_id, duration, duration_seconds, waveform_data, published_at, featured, active) VALUES
('spod0001-0000-0000-0000-000000000001', 'The Meaning of Sacred Beauty', 'the-meaning-of-sacred-beauty', 'Reflections on Islamic aesthetics, sacred geometry, and the search for authentic form.', 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', 'sp100000-0000-0000-0000-000000000001', '34:12', 2052, '[24, 38, 55, 72, 85, 90, 68, 52, 44, 60, 78, 88, 92, 70, 48, 36, 50, 75, 82, 64, 45, 58, 80, 95, 85, 60, 40, 52, 70, 85, 76, 50, 38, 62, 84, 90, 65, 42, 35, 55]'::jsonb, NOW(), true, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_quotes (id, quote, speaker_name, speaker_id, source, published_at, featured, active) VALUES
('sq100000-0000-0000-0000-000000000001', 'Beauty is not a luxury for the human spirit; it is an intrinsic necessity through which the soul recognizes truth.', 'Shaykh Abdal Hakim Murad', 'sp100000-0000-0000-0000-000000000001', 'Traveling Light Series', NOW(), true, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 6. INSTITUTE CONTENT (AYAT, ARTICLES, TOPICS, RESOURCES)
-- ============================================================================

INSERT INTO public.institute_topics (id, name, slug, description, active, display_order) VALUES
('it100000-0000-0000-0000-000000000001', 'Quranic Contemplation', 'quranic-contemplation', 'Tadabbur and linguistic analysis of sacred verses.', true, 1),
('it200000-0000-0000-0000-000000000002', 'Faith & Character', 'faith-and-character', 'Ethical foundations and inner purification.', true, 2),
('it300000-0000-0000-0000-000000000003', 'Civilization & Knowledge', 'civilization', 'Intellectual history, scholarship, and classical texts.', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.institute_ayat (id, arabic_text, translation, surah_name_arabic, surah_name_english, surah_number, ayah_number, reference, reflection, topic_id, featured, published) VALUES
('ia100000-0000-0000-0000-000000000001', 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ', 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.', 'آل عمران', 'Ali Imran', 3, 190, 'Surah Ali Imran 3:190', 'The universe is not merely physical matter; it is an open book of divine signs inviting deliberate contemplation by the discerning intellect.', 'it100000-0000-0000-0000-000000000001', true, true),
('ia200000-0000-0000-0000-000000000002', 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ', 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.', 'الأنبياء', 'Al-Anbiya', 21, 107, 'Surah Al-Anbiya 21:107', 'Mercy is the essential ethos through which knowledge, conduct, and relationships must be governed.', 'it200000-0000-0000-0000-000000000002', true, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.institute_articles (id, title, slug, excerpt, content, cover_image, author, topic_id, reading_time_minutes, published_at, featured, tags, active) VALUES
('iar10000-0000-0000-0000-000000000001', 'The Sacred Rhythm of Time', 'the-sacred-rhythm-of-time', 'An examination of how traditional Islamic time consciousness preserves purpose and presence.', 'Time in modern society is treated as a transactional resource to be spent and traded. In the Islamic worldview, time is a sacred vessel measured by the rhythm of prayer, celestial movement, and spiritual accountability.', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', 'Editorial Fellow, Nuqtah Institute', 'it100000-0000-0000-0000-000000000001', 6, NOW(), true, '["time", "quran", "contemplation"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.institute_resources (id, title, slug, description, file_type, file_url, file_size, topic_id, published_at, active) VALUES
('ir100000-0000-0000-0000-000000000001', 'A Guide to Daily Adhkar & Reflection', 'guide-daily-adhkar-reflection', 'A structured, typography-focused reading guide for morning and evening remembrances.', 'PDF', '/resources/daily-adhkar-guide.pdf', '2.4 MB', 'it200000-0000-0000-0000-000000000002', NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Future Course Foundation Seed
INSERT INTO public.courses (id, title, slug, short_description, description, cover_image, instructor_name, instructor_bio, topic_id, level, duration_weeks, status, active) VALUES
('crs10000-0000-0000-0000-000000000001', 'Foundations of Quranic Arabic & Tadabbur', 'foundations-quranic-arabic', 'A comprehensive primer into grammar, root structures, and reflective engagement with the Quran.', 'Designed for seekers wanting to unlock direct linguistic connection to the Quranic text with clarity and scholarly rigor.', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', 'Ustadh Ahmad Al-Hasan', 'Graduate of Al-Azhar University and Senior Fellow at Nuqtah Institute.', 'it100000-0000-0000-0000-000000000001', 'Foundational', 8, 'Upcoming', true)
ON CONFLICT (id) DO NOTHING;
