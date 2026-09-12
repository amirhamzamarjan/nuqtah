-- NUQTAH ECOSYSTEM — SUPABASE SEED DATA
-- Clean taxonomy seeds ready for fresh user-uploaded products and content.

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

-- 4. SCREEN CATEGORIES
INSERT INTO public.screen_categories (id, name, slug, description, active, display_order) VALUES
('scat-nasihah', 'Nasihah / Advice', 'nasihah', 'Guidance and spiritual clarity for daily life.', true, 1),
('scat-discourses', 'Scholarly Discourses', 'discourses', 'Deep theological lectures and philosophy.', true, 2),
('scat-short-clips', 'Short Clips', 'short-clips', 'Concise contemplative reflections.', true, 3)
ON CONFLICT (id) DO NOTHING;

-- 5. INSTITUTE TOPICS & QURANIC AYAH
INSERT INTO public.institute_topics (id, name, slug, description, active, display_order) VALUES
('top-quran', 'Quranic Contemplation', 'quranic-contemplation', 'Tadabbur and linguistic analysis of sacred verses.', true, 1),
('top-faith', 'Faith & Character', 'faith-and-character', 'Ethical foundations and inner purification.', true, 2),
('top-civilization', 'Civilization & Knowledge', 'civilization', 'Intellectual history, scholarship, and classical texts.', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.institute_ayat (id, arabic_text, translation, surah_name_arabic, surah_name_english, surah_number, ayah_number, reference, reflection, topic_id, featured, published) VALUES
('ayah-ali-imran', 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ', 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.', 'آل عمران', 'Ali Imran', 3, 190, 'Surah Ali Imran 3:190', 'The universe is not merely physical matter; it is an open book of divine signs inviting deliberate contemplation by the discerning intellect.', 'top-quran', true, true)
ON CONFLICT (id) DO NOTHING;
