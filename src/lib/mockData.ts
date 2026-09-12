import {
  Department,
  Category,
  Collection,
  Product,
  ScreenCategory,
  ScreenSpeaker,
  ScreenSeries,
  ScreenVideo,
  ScreenPodcast,
  ScreenQuote,
  InstituteTopic,
  InstituteAyah,
  InstituteArticle,
  InstituteResource,
  Course,
  Offer
} from '../types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'men',
    name: 'Men',
    slug: 'men',
    tagline: 'Refined Heritage & Occasion Wear',
    description: 'Impeccably tailored Panjabis, Kablis, and traditional menswear crafted with timeless elegance.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80',
    theme: 'men',
    active: true,
    order: 1,
  },
  {
    id: 'women',
    name: 'Women',
    slug: 'women',
    tagline: 'Grace, Modesty & Timeless Luxury',
    description: 'A dedicated luxury sanctuary of pure silks, handcrafted abayas, and refined modest silhouettes.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    theme: 'women',
    active: true,
    order: 2,
  },
  {
    id: 'kids',
    name: 'Kids',
    slug: 'kids',
    tagline: 'Little Noor & Young Elegance',
    description: 'Gentle fabrics, modest silhouettes, and festive edits created for children with warmth and care.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80',
    theme: 'kids',
    active: true,
    order: 3,
  },
  {
    id: 'attar',
    name: 'Attar',
    slug: 'attar',
    tagline: 'Pure Artisanal Distillations',
    description: 'Rare agarwood, Taif rose, and natural botanical extractions bottled in crystal flacons.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
    theme: 'attar',
    active: true,
    order: 4,
  },
  {
    id: 'organic-food',
    name: 'Organic Food',
    slug: 'organic-food',
    tagline: 'Pure & Wholesome Sustenance',
    description: 'Raw forest honeys, cold-pressed black seed oils, and ethically harvested natural essentials.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80',
    theme: 'food',
    active: true,
    order: 5,
  },
];

export const INITIAL_CATEGORIES: Category[] = [
  // Men
  { id: 'cat-men-panjabi', departmentId: 'men', name: 'Panjabi', slug: 'panjabi', description: 'Handcrafted premium panjabis.', active: true, order: 1 },
  { id: 'cat-men-kabli', departmentId: 'men', name: 'Kabli Set', slug: 'kabli-set', description: 'Structured formal wear.', active: true, order: 2 },
  { id: 'cat-men-payjama', departmentId: 'men', name: 'Payjama', slug: 'payjama', description: 'Tailored bottom wear.', active: true, order: 3 },
  { id: 'cat-men-heritage', departmentId: 'men', name: 'The Heritage Edit', slug: 'heritage-edit', description: 'Signature collection.', active: true, order: 4 },

  // Women Luxury Experience
  { id: 'cat-wom-noor', departmentId: 'women', name: 'Noor', slug: 'noor', description: 'Silk and linen abayas.', active: true, order: 1 },
  { id: 'cat-wom-haya', departmentId: 'women', name: 'Haya', slug: 'haya', description: 'Everyday elegance and graceful layers.', active: true, order: 2 },
  { id: 'cat-wom-zahra', departmentId: 'women', name: 'Zahra Edit', slug: 'zahra-edit', description: 'Occasion and festive wear.', active: true, order: 3 },
  { id: 'cat-wom-modesty', departmentId: 'women', name: 'Signature Modesty', slug: 'signature-modesty', description: 'Floor-length modest silhouettes.', active: true, order: 4 },

  // Kids Luxury
  { id: 'cat-kid-littlenoor', departmentId: 'kids', name: 'Little Noor', slug: 'little-noor', description: 'Festive sets for boys and girls.', active: true, order: 1 },
  { id: 'cat-kid-miniheritage', departmentId: 'kids', name: 'Mini Heritage', slug: 'mini-heritage', description: 'Classic comfortable silhouettes.', active: true, order: 2 },
  { id: 'cat-kid-junior', departmentId: 'kids', name: 'Junior Edit', slug: 'junior-edit', description: 'Festive wear for young juniors.', active: true, order: 3 },

  // Attar
  { id: 'cat-atr-signature', departmentId: 'attar', name: 'Signature Scents', slug: 'signature-scents', description: 'Oud and natural botanical extractions.', active: true, order: 1 },
  { id: 'cat-atr-classic', departmentId: 'attar', name: 'Classic Attar', slug: 'classic-attar', description: 'Pure rose and musk flacons.', active: true, order: 2 },

  // Organic Food
  { id: 'cat-fod-essentials', departmentId: 'organic-food', name: 'Curated Essentials', slug: 'curated-essentials', description: 'Raw artisan honey and pure oils.', active: true, order: 1 },
  { id: 'cat-fod-natural', departmentId: 'organic-food', name: 'Natural Selection', slug: 'natural-selection', description: 'Natural dates and superfoods.', active: true, order: 2 },
];

export const INITIAL_COLLECTIONS: Collection[] = [
  { id: 'col-heritage', name: 'The Heritage Edit', slug: 'the-heritage-edit', description: 'Rooted in timeless craftsmanship and pure natural fibers.', featured: true, active: true },
  { id: 'col-noor', name: 'Noor Collection', slug: 'noor-collection', description: 'Luminous modest wear with understated accents.', featured: true, active: true },
  { id: 'col-scents', name: 'Signature Scents', slug: 'signature-scents', description: 'Master distilled botanical pure perfumes.', featured: true, active: true },
];

// Clean empty products array - Ready for fresh admin uploads
export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_OFFERS: Offer[] = [];

export const INITIAL_SCREEN_CATEGORIES: ScreenCategory[] = [
  { id: 'scat-nasihah', name: 'Nasihah / Advice', slug: 'nasihah', description: 'Guidance and spiritual clarity for daily life.', active: true, order: 1 },
  { id: 'scat-discourses', name: 'Scholarly Discourses', slug: 'discourses', description: 'Theological lectures and philosophy.', active: true, order: 2 },
  { id: 'scat-short-clips', name: 'Short Clips', slug: 'short-clips', description: 'Concise contemplative reflections.', active: true, order: 3 },
];

export const INITIAL_SCREEN_SPEAKERS: ScreenSpeaker[] = [];
export const INITIAL_SCREEN_SERIES: ScreenSeries[] = [];
export const INITIAL_SCREEN_VIDEOS: ScreenVideo[] = [];
export const INITIAL_SCREEN_PODCASTS: ScreenPodcast[] = [];
export const INITIAL_SCREEN_QUOTES: ScreenQuote[] = [];

export const INITIAL_INSTITUTE_TOPICS: InstituteTopic[] = [
  { id: 'top-quran', name: 'Quranic Contemplation', slug: 'quranic-contemplation', description: 'Tadabbur and linguistic analysis of sacred verses.', active: true, order: 1 },
  { id: 'top-faith', name: 'Faith & Character', slug: 'faith-and-character', description: 'Ethical foundations and inner purification.', active: true, order: 2 },
  { id: 'top-civilization', name: 'Civilization & Knowledge', slug: 'civilization', description: 'Intellectual history, scholarship, and classical texts.', active: true, order: 3 },
];

export const INITIAL_INSTITUTE_AYAT: InstituteAyah[] = [
  {
    id: 'ayah-ali-imran',
    arabicText: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ',
    translation: 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.',
    surahNameArabic: 'آل عمران',
    surahNameEnglish: 'Ali Imran',
    surahNumber: 3,
    ayahNumber: 190,
    reference: 'Surah Ali Imran 3:190',
    reflection: 'The universe is not merely physical matter; it is an open book of divine signs inviting deliberate contemplation by the discerning intellect.',
    topicId: 'top-quran',
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_INSTITUTE_ARTICLES: InstituteArticle[] = [];
export const INITIAL_INSTITUTE_RESOURCES: InstituteResource[] = [];
export const INITIAL_COURSES: Course[] = [];
