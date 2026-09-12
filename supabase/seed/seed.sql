-- NUQTAH ECOSYSTEM — SUPABASE SEED DATA
-- Production seeds with matching IDs for seamless cross-device synchronization.

-- 1. DEPARTMENTS
INSERT INTO public.departments (id, name, slug, tagline, description, image, theme, active, display_order) VALUES
('men', 'Men', 'men', 'Refined Heritage & Occasion Wear', 'Impeccably tailored Panjabis, Kablis, and traditional menswear crafted with timeless elegance.', 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80', 'men', true, 1),
('women', 'Women', 'women', 'Grace, Modesty & Timeless Luxury', 'A dedicated luxury sanctuary of pure silks, handcrafted abayas, and refined modest silhouettes.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80', 'women', true, 2),
('kids', 'Kids', 'kids', 'Little Noor & Young Elegance', 'Gentle fabrics, modest silhouettes, and festive edits created for children with warmth and care.', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80', 'kids', true, 3),
('attar', 'Attar', 'attar', 'Pure Artisanal Distillations', 'Rare agarwood, Taif rose, and natural botanical extractions bottled in crystal flacons.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80', 'attar', true, 4),
('organic-food', 'Organic Food', 'organic-food', 'Pure & Wholesome Sustenance', 'Raw forest honeys, cold-pressed black seed oils, and ethically harvested natural essentials.', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80', 'food', true, 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  theme = EXCLUDED.theme,
  active = EXCLUDED.active,
  display_order = EXCLUDED.display_order;

-- 2. CATEGORIES
INSERT INTO public.categories (id, department_id, name, slug, description, active, display_order) VALUES
('cat-men-panjabi', 'men', 'Panjabi', 'panjabi', 'Handcrafted Egyptian cotton and raw silk panjabis.', true, 1),
('cat-men-kabli', 'men', 'Kabli Set', 'kabli-set', 'Two-piece structured formal wear.', true, 2),
('cat-men-payjama', 'men', 'Payjama', 'payjama', 'Comfortable tailored bottom wear.', true, 3),
('cat-men-heritage', 'men', 'The Heritage Edit', 'heritage-edit', 'Signature occasion collection.', true, 4),
('cat-wom-noor', 'women', 'Noor', 'noor', 'Luminous raw silk and linen abayas with understated embroidery.', true, 1),
('cat-wom-haya', 'women', 'Haya', 'haya', 'Everyday elegance and graceful layers.', true, 2),
('cat-wom-zahra', 'women', 'Zahra Edit', 'zahra-edit', 'Dusty rose and soft blush occasion wear.', true, 3),
('cat-wom-modesty', 'women', 'Signature Modesty', 'signature-modesty', 'Floor-length modest silhouettes.', true, 4),
('cat-kid-littlenoor', 'kids', 'Little Noor', 'little-noor', 'Pure cotton sets for festive occasions.', true, 1),
('cat-kid-miniheritage', 'kids', 'Mini Heritage', 'mini-heritage', 'Classic silhouettes tailored for comfort.', true, 2),
('cat-kid-junior', 'kids', 'Junior Edit', 'junior-edit', 'Sophisticated festive wear for ages 8-14.', true, 3),
('cat-atr-signature', 'attar', 'Signature Scents', 'signature-scents', 'Aged Hindi oud and ambergris extractions.', true, 1),
('cat-atr-classic', 'attar', 'Classic Attar', 'classic-attar', 'Taif mountain rose and pure white musk.', true, 2),
('cat-fod-essentials', 'organic-food', 'Curated Essentials', 'curated-essentials', 'Raw artisan honey and cold-pressed pure oils.', true, 1),
('cat-fod-natural', 'organic-food', 'Natural Selection', 'natural-selection', 'Premium dates, mountain herbs, and natural seeds.', true, 2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  active = EXCLUDED.active;

-- 3. COLLECTIONS
INSERT INTO public.collections (id, name, slug, description, featured, active) VALUES
('col-heritage', 'The Heritage Edit', 'the-heritage-edit', 'Rooted in timeless craftsmanship and pure natural fibers.', true, true),
('col-noor', 'Noor Collection', 'noor-collection', 'Luminous modest wear with understated champagne accents.', true, true),
('col-scents', 'Signature Scents', 'signature-scents', 'Master distilled botanical pure perfumes.', true, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  featured = EXCLUDED.featured,
  active = EXCLUDED.active;

-- 4. PRODUCTS
INSERT INTO public.products (
  id, slug, name, short_description, description, department_id, category_id, collection_id, sku,
  price, old_price, discount_type, discount_value, sale_price,
  main_image, gallery_images, featured, badge, active, available, total_stock,
  specifications, care_instructions, tags
) VALUES (
  'prod-men-white-panjabi',
  'white-premium-panjabi',
  'White Premium Heritage Panjabi',
  'Hand-tailored Egyptian Giza cotton with subtle tone-on-tone collar embroidery.',
  'Crafted from 100% extra-long staple Egyptian Giza cotton, this white panjabi represents the pinnacle of understated luxury. Designed with a tailored mandarin collar featuring fine tone-on-tone embroidery, mother-of-pearl buttons, and a relaxed ergonomic drape.',
  'men', 'cat-men-panjabi', 'col-heritage', 'NQT-MEN-PJ-001',
  2900, 3500, 'sale_price', 0, 2900,
  'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true, 'Sale', true, true, 5,
  '{"Fabric": "100% Egyptian Giza Cotton", "Weave": "Fine Twill", "Collar": "Mandarin with Minimal Threadwork", "Buttons": "Natural Mother of Pearl"}'::jsonb,
  '["Dry clean recommended for first wash", "Gentle hand wash in cold water", "Iron on reverse side with medium heat"]'::jsonb,
  '["panjabi", "cotton", "heritage", "eid", "occasion"]'::jsonb
),
(
  'prod-wom-noor-abaya',
  'noor-embroidered-silk-abaya',
  'Noor Embroidered Raw Silk Abaya',
  'Fluid rosewood silk silhouette adorned with handcrafted champagne thread accents.',
  'An ethereal addition to the Noor luxury line. Crafted from hand-spun raw silk with a soft modal lining. The graceful sleeves are trimmed with delicate champagne metallic needlework, offering modest grandeur.',
  'women', 'cat-wom-noor', 'col-noor', 'NQT-WOM-AB-001',
  7820, 9200, 'percentage', 15, 7820,
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true, 'Featured', true, true, 8,
  '{"Fabric": "Pure Raw Silk Crepe", "Cut": "Relaxed A-Line Abaya", "Details": "Hand-stitched Cuff Trim", "Lining": "Breathable Modal"}'::jsonb,
  '["Specialist dry clean only", "Store on padded hanger", "Steam iron only"]'::jsonb,
  '["abaya", "women", "silk", "luxury", "noor", "rosewood"]'::jsonb
),
(
  'prod-atr-taif-oud',
  'taif-rose-aged-oud-attar',
  'Taif Rose & Aged Hindi Oud Attar',
  '12-year vintage hydro-distilled Assam agarwood infused with wild Taif mountain rose petals.',
  'An opulent, alcohol-free pure oil distillation. Opening with the fresh, crisp floral sweetness of high-altitude Taif rose, deepening into resinous antique leather, earthy woods, and enduring amber warmth.',
  'attar', 'cat-atr-signature', 'col-scents', 'NQT-ATR-001',
  4500, 5000, 'fixed', 500, 4500,
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true, 'Best Seller', true, true, 12,
  '{"Origin": "Assam & Taif Mountain", "Type": "Concentrated Perfume Oil (100% Non-Alcoholic)", "Aging": "12 Years Matured Distillation"}'::jsonb,
  '["Store upright in a cool, dark space", "Apply to pulse points"]'::jsonb,
  '["attar", "oud", "rose", "perfume", "luxury"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  total_stock = EXCLUDED.total_stock,
  active = EXCLUDED.active;

-- 5. VARIANTS
INSERT INTO public.product_variants (id, product_id, sku, name, attributes, stock, active) VALUES
('var-pj-38', 'prod-men-white-panjabi', 'NQT-MEN-PJ-001-38', 'Size 38', '{"size": "38", "color": "Pure White"}'::jsonb, 2, true),
('var-pj-40', 'prod-men-white-panjabi', 'NQT-MEN-PJ-001-40', 'Size 40', '{"size": "40", "color": "Pure White"}'::jsonb, 1, true),
('var-pj-42', 'prod-men-white-panjabi', 'NQT-MEN-PJ-001-42', 'Size 42', '{"size": "42", "color": "Pure White"}'::jsonb, 2, true),
('var-pj-44', 'prod-men-white-panjabi', 'NQT-MEN-PJ-001-44', 'Size 44', '{"size": "44", "color": "Pure White"}'::jsonb, 0, true),
('var-ab-52', 'prod-wom-noor-abaya', 'NQT-WOM-AB-001-52', 'Length 52', '{"size": "52", "color": "Rosewood"}'::jsonb, 3, true),
('var-ab-54', 'prod-wom-noor-abaya', 'NQT-WOM-AB-001-54', 'Length 54', '{"size": "54", "color": "Rosewood"}'::jsonb, 3, true),
('var-ab-56', 'prod-wom-noor-abaya', 'NQT-WOM-AB-001-56', 'Length 56', '{"size": "56", "color": "Rosewood"}'::jsonb, 2, true),
('var-atr-6ml', 'prod-atr-taif-oud', 'NQT-ATR-001-6ML', '6ml Crystal Flacon', '{"volume": "6ml"}'::jsonb, 8, true),
('var-atr-12ml', 'prod-atr-taif-oud', 'NQT-ATR-001-12ML', '12ml Crystal Flacon', '{"volume": "12ml"}'::jsonb, 4, true)
ON CONFLICT (id) DO UPDATE SET
  stock = EXCLUDED.stock,
  active = EXCLUDED.active;

-- 6. SCREEN CONTENT
INSERT INTO public.screen_categories (id, name, slug, description, active, display_order) VALUES
('scat-nasihah', 'Nasihah / Advice', 'nasihah', 'Guidance and spiritual clarity for daily life.', true, 1),
('scat-discourses', 'Scholarly Discourses', 'discourses', 'Deep theological lectures and philosophy.', true, 2),
('scat-short-clips', 'Short Clips', 'short-clips', 'Concise contemplative reflections.', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_speakers (id, name, slug, title, bio, photo_url, active) VALUES
('spk-abdal-hakim', 'Shaykh Abdal Hakim Murad', 'abdal-hakim-murad', 'Dean of Cambridge Muslim College', 'Scholar, author, and translator focusing on Islamic theology, ethics, and contemporary spiritual challenges.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', true),
('spk-umar-faruq', 'Dr. Umar Faruq Abd-Allah', 'umar-faruq-abd-allah', 'Islamic Scholar & Historian', 'Renowned teacher and author specializing in Islamic civilization, classical Arabic, and spiritual theology.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_series (id, title, slug, description, cover_image, speaker_id, active, display_order) VALUES
('ser-traveling-light', 'Traveling Light: Disciplining the Soul', 'traveling-light', 'A contemplative journey through Imam al-Ghazali’s masterpiece Ihya Ulum al-Din.', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', 'spk-abdal-hakim', true, 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_videos (id, title, slug, youtube_url, youtube_id, thumbnail, description, category_id, speaker_id, series_id, episode_number, duration, published_at, featured, tags, active) VALUES
('vid-stillness', 'The Architecture of Inner Stillness', 'architecture-of-inner-stillness', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', 'An exploration of spiritual clarity amidst the noise of the digital age, drawing from classical wisdom.', 'scat-nasihah', 'spk-abdal-hakim', 'ser-traveling-light', 1, '28:45', NOW(), true, '["stillness", "spirituality", "ghazali"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_podcasts (id, title, slug, description, audio_url, cover_image, speaker_id, duration, duration_seconds, waveform_data, published_at, featured, active) VALUES
('pod-sacred-beauty', 'The Meaning of Sacred Beauty', 'the-meaning-of-sacred-beauty', 'Reflections on Islamic aesthetics, sacred geometry, and the search for authentic form.', 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', 'spk-abdal-hakim', '34:12', 2052, '[24, 38, 55, 72, 85, 90, 68, 52, 44, 60, 78, 88, 92, 70, 48, 36, 50, 75, 82, 64, 45, 58, 80, 95, 85, 60, 40, 52, 70, 85, 76, 50, 38, 62, 84, 90, 65, 42, 35, 55]'::jsonb, NOW(), true, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.screen_quotes (id, quote, speaker_name, speaker_id, source, published_at, featured, active) VALUES
('q-beauty', 'Beauty is not a luxury for the human spirit; it is an intrinsic necessity through which the soul recognizes truth.', 'Shaykh Abdal Hakim Murad', 'spk-abdal-hakim', 'Traveling Light Series', NOW(), true, true)
ON CONFLICT (id) DO NOTHING;

-- 7. INSTITUTE CONTENT
INSERT INTO public.institute_topics (id, name, slug, description, active, display_order) VALUES
('top-quran', 'Quranic Contemplation', 'quranic-contemplation', 'Tadabbur and linguistic analysis of sacred verses.', true, 1),
('top-faith', 'Faith & Character', 'faith-and-character', 'Ethical foundations and inner purification.', true, 2),
('top-civilization', 'Civilization & Knowledge', 'civilization', 'Intellectual history, scholarship, and classical texts.', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.institute_ayat (id, arabic_text, translation, surah_name_arabic, surah_name_english, surah_number, ayah_number, reference, reflection, topic_id, featured, published) VALUES
('ayah-ali-imran', 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ', 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.', 'آل عمران', 'Ali Imran', 3, 190, 'Surah Ali Imran 3:190', 'The universe is not merely physical matter; it is an open book of divine signs inviting deliberate contemplation by the discerning intellect.', 'top-quran', true, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.institute_articles (id, title, slug, excerpt, content, cover_image, author, topic_id, reading_time_minutes, published_at, featured, tags, active) VALUES
('art-time', 'The Sacred Rhythm of Time', 'the-sacred-rhythm-of-time', 'An examination of how traditional Islamic time consciousness preserves purpose and presence.', 'Time in modern society is treated as a transactional commodity to be spent, saved, and traded in relentless pursuit of productivity. Yet within the Islamic worldview, time (al-zaman) is conceived not as an economic resource, but as a sacred vessel.', 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80', 'Editorial Fellow, Nuqtah Institute', 'top-quran', 6, NOW(), true, '["time", "quran", "contemplation"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
