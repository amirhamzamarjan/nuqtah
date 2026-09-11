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
  GlobalSettings,
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
  { id: 'cat-men-panjabi', departmentId: 'men', name: 'Panjabi', slug: 'panjabi', description: 'Handcrafted Egyptian cotton and raw silk panjabis.', active: true, order: 1 },
  { id: 'cat-men-kabli', departmentId: 'men', name: 'Kabli Set', slug: 'kabli-set', description: 'Two-piece structured formal wear.', active: true, order: 2 },
  { id: 'cat-men-payjama', departmentId: 'men', name: 'Payjama', slug: 'payjama', description: 'Comfortable tailored trousers.', active: true, order: 3 },
  { id: 'cat-men-heritage', departmentId: 'men', name: 'The Heritage Edit', slug: 'heritage-edit', description: 'Signature occasion collection.', active: true, order: 4 },

  // Women Luxury Experience
  { id: 'cat-wom-noor', departmentId: 'women', name: 'Noor', slug: 'noor', description: 'Luminous raw silk and linen abayas.', active: true, order: 1 },
  { id: 'cat-wom-haya', departmentId: 'women', name: 'Haya', slug: 'haya', description: 'Everyday elegance and graceful layers.', active: true, order: 2 },
  { id: 'cat-wom-zahra', departmentId: 'women', name: 'Zahra Edit', slug: 'zahra-edit', description: 'Dusty rose and soft blush occasion wear.', active: true, order: 3 },
  { id: 'cat-wom-modesty', departmentId: 'women', name: 'Signature Modesty', slug: 'signature-modesty', description: 'Floor-length modest silhouettes.', active: true, order: 4 },

  // Kids Luxury
  { id: 'cat-kid-littlenoor', departmentId: 'kids', name: 'Little Noor', slug: 'little-noor', description: 'Pure cotton sets for festive occasions.', active: true, order: 1 },
  { id: 'cat-kid-miniheritage', departmentId: 'kids', name: 'Mini Heritage', slug: 'mini-heritage', description: 'Classic silhouettes tailored for comfort.', active: true, order: 2 },
  { id: 'cat-kid-junior', departmentId: 'kids', name: 'Junior Edit', slug: 'junior-edit', description: 'Sophisticated festive wear for ages 8-14.', active: true, order: 3 },

  // Attar
  { id: 'cat-atr-signature', departmentId: 'attar', name: 'Signature Scents', slug: 'signature-scents', description: 'Aged Hindi oud and ambergris extractions.', active: true, order: 1 },
  { id: 'cat-atr-classic', departmentId: 'attar', name: 'Classic Attar', slug: 'classic-attar', description: 'Taif mountain rose and pure white musk.', active: true, order: 2 },

  // Organic Food
  { id: 'cat-fod-essentials', departmentId: 'organic-food', name: 'Curated Essentials', slug: 'curated-essentials', description: 'Raw artisan honey and cold-pressed oils.', active: true, order: 1 },
  { id: 'cat-fod-natural', departmentId: 'organic-food', name: 'Natural Selection', slug: 'natural-selection', description: 'Medjool dates and cold-pressed black seed oil.', active: true, order: 2 },
];

export const INITIAL_COLLECTIONS: Collection[] = [
  { id: 'col-heritage', name: 'The Heritage Edit', slug: 'the-heritage-edit', description: 'Rooted in timeless craftsmanship and pure natural fibers.', featured: true, active: true },
  { id: 'col-noor', name: 'Noor Collection', slug: 'noor-collection', description: 'Luminous modest wear with understated champagne accents.', featured: true, active: true },
  { id: 'col-scents', name: 'Signature Scents', slug: 'signature-scents', description: 'Master distilled botanical pure perfumes.', featured: true, active: true },
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. White Premium Panjabi (Stock = 5, Sale ৳2900 vs ৳3500)
  {
    id: 'prod-men-white-panjabi',
    slug: 'white-premium-panjabi',
    name: 'White Premium Heritage Panjabi',
    shortDescription: 'Hand-tailored Egyptian Giza cotton with subtle tone-on-tone collar embroidery.',
    description: 'Crafted from 100% extra-long staple Egyptian Giza cotton, this white panjabi represents the pinnacle of understated luxury. Designed with a tailored mandarin collar featuring fine tone-on-tone embroidery, mother-of-pearl buttons, and a relaxed ergonomic drape.',
    departmentId: 'men',
    categoryId: 'cat-men-panjabi',
    collectionId: 'col-heritage',
    sku: 'NQT-MEN-PJ-001',
    price: 2900,
    oldPrice: 3500,
    discountType: 'sale_price',
    discountValue: 0,
    salePrice: 2900,
    mainImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    ],
    featured: true,
    badge: 'Sale',
    active: true,
    available: true,
    totalStock: 5,
    specifications: {
      'Fabric': '100% Egyptian Giza Cotton',
      'Weave': 'Fine Twill',
      'Collar': 'Mandarin with Minimal Threadwork',
      'Buttons': 'Natural Mother of Pearl',
    },
    careInstructions: [
      'Dry clean recommended for first wash',
      'Gentle hand wash in cold water',
      'Iron on reverse side with medium heat',
    ],
    tags: ['panjabi', 'cotton', 'heritage', 'eid', 'occasion'],
    variants: [
      { id: 'var-pj-38', productId: 'prod-men-white-panjabi', sku: 'NQT-MEN-PJ-001-38', name: 'Size 38', attributes: { size: '38', color: 'Pure White' }, stock: 2, active: true },
      { id: 'var-pj-40', productId: 'prod-men-white-panjabi', sku: 'NQT-MEN-PJ-001-40', name: 'Size 40', attributes: { size: '40', color: 'Pure White' }, stock: 1, active: true },
      { id: 'var-pj-42', productId: 'prod-men-white-panjabi', sku: 'NQT-MEN-PJ-001-42', name: 'Size 42', attributes: { size: '42', color: 'Pure White' }, stock: 2, active: true },
      { id: 'var-pj-44', productId: 'prod-men-white-panjabi', sku: 'NQT-MEN-PJ-001-44', name: 'Size 44', attributes: { size: '44', color: 'Pure White' }, stock: 0, active: true },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 2. Noor Embroidered Silk Abaya (Women)
  {
    id: 'prod-wom-noor-abaya',
    slug: 'noor-embroidered-silk-abaya',
    name: 'Noor Embroidered Raw Silk Abaya',
    shortDescription: 'Fluid rosewood silk silhouette adorned with handcrafted champagne thread accents.',
    description: 'An ethereal addition to the Noor luxury line. Crafted from hand-spun raw silk with a soft modal lining. The graceful sleeves are trimmed with delicate champagne metallic needlework, offering modest grandeur.',
    departmentId: 'women',
    categoryId: 'cat-wom-noor',
    collectionId: 'col-noor',
    sku: 'NQT-WOM-AB-001',
    price: 7820,
    oldPrice: 9200,
    discountType: 'percentage',
    discountValue: 15,
    salePrice: 7820,
    mainImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    ],
    featured: true,
    badge: 'Featured',
    active: true,
    available: true,
    totalStock: 8,
    specifications: {
      'Fabric': 'Pure Raw Silk Crepe',
      'Cut': 'Relaxed A-Line Abaya',
      'Details': 'Hand-stitched Cuff Trim',
      'Lining': 'Breathable Modal',
    },
    careInstructions: [
      'Specialist dry clean only',
      'Store on padded hanger',
      'Steam iron only',
    ],
    tags: ['abaya', 'women', 'silk', 'luxury', 'noor', 'rosewood'],
    variants: [
      { id: 'var-ab-52', productId: 'prod-wom-noor-abaya', sku: 'NQT-WOM-AB-001-52', name: 'Length 52', attributes: { size: '52', color: 'Rosewood' }, stock: 3, active: true },
      { id: 'var-ab-54', productId: 'prod-wom-noor-abaya', sku: 'NQT-WOM-AB-001-54', name: 'Length 54', attributes: { size: '54', color: 'Rosewood' }, stock: 3, active: true },
      { id: 'var-ab-56', productId: 'prod-wom-noor-abaya', sku: 'NQT-WOM-AB-001-56', name: 'Length 56', attributes: { size: '56', color: 'Rosewood' }, stock: 2, active: true },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 3. Zahra Dusty Rose Linen Co-ord (Women)
  {
    id: 'prod-wom-zahra-coord',
    slug: 'zahra-dusty-rose-linen-coord',
    name: 'Zahra Dusty Rose Linen Co-ord',
    shortDescription: 'Two-piece relaxed tunic and tailored trousers in breathable organic blush linen.',
    description: 'Minimalist luxury embodied in soft dusty rose linen. Features clean asymmetric lines, concealed fastenings, and comfortable pleated trousers for effortless daytime sophistication.',
    departmentId: 'women',
    categoryId: 'cat-wom-zahra',
    collectionId: 'col-noor',
    sku: 'NQT-WOM-ZH-002',
    price: 5400,
    oldPrice: 6000,
    discountType: 'percentage',
    discountValue: 10,
    salePrice: 5400,
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    ],
    featured: true,
    badge: 'New',
    active: true,
    available: true,
    totalStock: 6,
    specifications: {
      'Fabric': '100% French Flax Linen',
      'Fit': 'Relaxed Modular Fit',
      'Pockets': 'Dual Inseam Pockets',
    },
    careInstructions: [
      'Machine wash gentle cold',
      'Line dry in shade',
      'Warm iron while damp',
    ],
    tags: ['linen', 'women', 'coord', 'blush', 'dusty-rose'],
    variants: [
      { id: 'var-zh-s', productId: 'prod-wom-zahra-coord', sku: 'NQT-WOM-ZH-002-S', name: 'Small', attributes: { size: 'S', color: 'Dusty Rose' }, stock: 2, active: true },
      { id: 'var-zh-m', productId: 'prod-wom-zahra-coord', sku: 'NQT-WOM-ZH-002-M', name: 'Medium', attributes: { size: 'M', color: 'Dusty Rose' }, stock: 2, active: true },
      { id: 'var-zh-l', productId: 'prod-wom-zahra-coord', sku: 'NQT-WOM-ZH-002-L', name: 'Large', attributes: { size: 'L', color: 'Dusty Rose' }, stock: 2, active: true },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 4. Little Noor Boys Festive Panjabi Set (Kids)
  {
    id: 'prod-kid-noor-set',
    slug: 'little-noor-festive-panjabi-set',
    name: 'Little Noor Boys Festive Panjabi Set',
    shortDescription: 'Gentle cotton panjabi with matching elasticated trousers for young boys.',
    description: 'Designed specifically for young boys with soft pre-washed cotton to avoid skin irritation. Features subtle antique gold buttons and an easy-dress placket.',
    departmentId: 'kids',
    categoryId: 'cat-kid-littlenoor',
    sku: 'NQT-KID-LN-001',
    price: 1850,
    mainImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80',
    ],
    featured: true,
    badge: 'New',
    active: true,
    available: true,
    totalStock: 9,
    specifications: {
      'Material': '100% Pre-washed Pure Cotton',
      'Age Group': '2 to 10 Years',
      'Waist': 'Soft Elastic Band',
    },
    careInstructions: ['Machine wash cold', 'Tumble dry low'],
    tags: ['kids', 'panjabi', 'festive', 'cotton'],
    variants: [
      { id: 'var-kd-24', productId: 'prod-kid-noor-set', sku: 'NQT-KID-LN-001-24', name: 'Age 2-3Y', attributes: { size: '2-3Y' }, stock: 3, active: true },
      { id: 'var-kd-28', productId: 'prod-kid-noor-set', sku: 'NQT-KID-LN-001-28', name: 'Age 4-5Y', attributes: { size: '4-5Y' }, stock: 4, active: true },
      { id: 'var-kd-32', productId: 'prod-kid-noor-set', sku: 'NQT-KID-LN-001-32', name: 'Age 6-7Y', attributes: { size: '6-7Y' }, stock: 2, active: true },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 5. Taif Rose & Aged Hindi Oud Attar (Attar)
  {
    id: 'prod-atr-taif-oud',
    slug: 'taif-rose-aged-oud-attar',
    name: 'Taif Rose & Aged Hindi Oud Attar',
    shortDescription: '12-year vintage hydro-distilled Assam agarwood infused with wild Taif mountain rose petals.',
    description: 'An opulent, alcohol-free pure oil distillation. Opening with the fresh, crisp floral sweetness of high-altitude Taif rose, deepening into resinous antique leather, earthy woods, and enduring amber warmth.',
    departmentId: 'attar',
    categoryId: 'cat-atr-signature',
    collectionId: 'col-scents',
    sku: 'NQT-ATR-001',
    price: 4500,
    oldPrice: 5000,
    discountType: 'fixed',
    discountValue: 500,
    salePrice: 4500,
    mainImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
    ],
    featured: true,
    badge: 'Best Seller',
    active: true,
    available: true,
    totalStock: 12,
    specifications: {
      'Origin': 'Assam & Taif Mountain',
      'Type': 'Concentrated Perfume Oil (100% Non-Alcoholic)',
      'Aging': '12 Years Matured Distillation',
    },
    careInstructions: [
      'Store upright in a cool, dark space',
      'Apply to pulse points',
    ],
    tags: ['attar', 'oud', 'rose', 'perfume', 'luxury'],
    variants: [
      { id: 'var-atr-6ml', productId: 'prod-atr-taif-oud', sku: 'NQT-ATR-001-6ML', name: '6ml Crystal Flacon', attributes: { volume: '6ml' }, priceOverride: 4500, stock: 8, active: true },
      { id: 'var-atr-12ml', productId: 'prod-atr-taif-oud', sku: 'NQT-ATR-001-12ML', name: '12ml Crystal Flacon', attributes: { volume: '12ml' }, priceOverride: 8500, stock: 4, active: true },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // 6. Raw Artisan Sundarban Wild Honey (Organic Food)
  {
    id: 'prod-fod-wild-honey',
    slug: 'raw-artisan-sundarban-wild-honey',
    name: 'Raw Artisan Sundarban Wild Honey',
    shortDescription: 'Unfiltered, unpasteurized wild multi-floral honey collected by traditional Mowals.',
    description: 'Harvested ethically from deep mangrove forests. Retaining all natural pollen, enzymes, and deep caramel undertones with zero additives.',
    departmentId: 'organic-food',
    categoryId: 'cat-fod-essentials',
    sku: 'NQT-FOD-001',
    price: 1200,
    mainImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80',
    ],
    featured: true,
    badge: 'Featured',
    active: true,
    available: true,
    totalStock: 20,
    specifications: {
      'Source': 'Sundarbans Mangrove Forest',
      'Processing': 'Cold-filtered, Unpasteurized',
      'Weight': '500g Glass Jar',
    },
    careInstructions: [
      'Store at room temperature',
      'Natural crystallization is a mark of purity',
    ],
    tags: ['honey', 'organic', 'raw', 'pure', 'sundarban'],
    variants: [
      { id: 'var-hny-500g', productId: 'prod-fod-wild-honey', sku: 'NQT-FOD-001-500G', name: '500g Glass Jar', attributes: { weight: '500g' }, stock: 15, active: true },
      { id: 'var-hny-1kg', productId: 'prod-fod-wild-honey', sku: 'NQT-FOD-001-1KG', name: '1kg Glass Jar', attributes: { weight: '1kg' }, priceOverride: 2300, stock: 5, active: true },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-seasonal-heritage',
    title: 'The Heritage Seasonal Edit',
    slug: 'heritage-seasonal-edit',
    description: 'Select handcrafted Egyptian cotton panjabis and silk abayas with special pricing.',
    startAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    endAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    discountType: 'percentage',
    discountValue: 15,
    bannerImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80',
    active: true,
  },
];

export const INITIAL_SCREEN_CATEGORIES: ScreenCategory[] = [
  { id: 'scat-nasihah', name: 'Nasihah / Advice', slug: 'nasihah', description: 'Guidance and spiritual clarity for daily life.', active: true, order: 1 },
  { id: 'scat-discourses', name: 'Scholarly Discourses', slug: 'discourses', description: 'Deep theological lectures and philosophy.', active: true, order: 2 },
  { id: 'scat-short-clips', name: 'Short Clips', slug: 'short-clips', description: 'Concise contemplative reflections.', active: true, order: 3 },
];

export const INITIAL_SCREEN_SPEAKERS: ScreenSpeaker[] = [
  {
    id: 'spk-abdal-hakim',
    name: 'Shaykh Abdal Hakim Murad',
    slug: 'abdal-hakim-murad',
    title: 'Dean of Cambridge Muslim College',
    bio: 'Scholar, author, and translator focusing on Islamic theology, ethics, and contemporary spiritual challenges.',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    active: true,
  },
  {
    id: 'spk-umar-faruq',
    name: 'Dr. Umar Faruq Abd-Allah',
    slug: 'umar-faruq-abd-allah',
    title: 'Islamic Scholar & Historian',
    bio: 'Renowned teacher and author specializing in Islamic civilization, classical Arabic, and spiritual theology.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    active: true,
  },
];

export const INITIAL_SCREEN_SERIES: ScreenSeries[] = [
  {
    id: 'ser-traveling-light',
    title: 'Traveling Light: Disciplining the Soul',
    slug: 'traveling-light',
    description: 'A contemplative journey through Imam al-Ghazali’s masterpiece Ihya Ulum al-Din.',
    coverImage: 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80',
    speakerId: 'spk-abdal-hakim',
    active: true,
    order: 1,
  },
];

export const INITIAL_SCREEN_VIDEOS: ScreenVideo[] = [
  {
    id: 'vid-stillness',
    title: 'The Architecture of Inner Stillness',
    slug: 'architecture-of-inner-stillness',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80',
    description: 'An exploration of spiritual clarity amidst the noise of the digital age, drawing from classical wisdom.',
    categoryId: 'scat-nasihah',
    speakerId: 'spk-abdal-hakim',
    seriesId: 'ser-traveling-light',
    episodeNumber: 1,
    duration: '28:45',
    publishedAt: new Date().toISOString(),
    featured: true,
    tags: ['stillness', 'spirituality', 'ghazali'],
    active: true,
  },
  {
    id: 'vid-sacred-art',
    title: 'Form, Proportion & The Sacred Spirit',
    slug: 'form-proportion-sacred-spirit',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    description: 'How traditional craftsmanship reflections express cosmic order and devotion.',
    categoryId: 'scat-discourses',
    speakerId: 'spk-umar-faruq',
    episodeNumber: 1,
    duration: '34:10',
    publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    featured: false,
    tags: ['art', 'geometry', 'craft'],
    active: true,
  },
];

export const INITIAL_SCREEN_PODCASTS: ScreenPodcast[] = [
  {
    id: 'pod-sacred-beauty',
    title: 'The Meaning of Sacred Beauty',
    slug: 'the-meaning-of-sacred-beauty',
    description: 'Reflections on Islamic aesthetics, sacred geometry, and the search for authentic form.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    speakerId: 'spk-abdal-hakim',
    duration: '34:12',
    durationSeconds: 2052,
    waveformData: [24, 38, 55, 72, 85, 90, 68, 52, 44, 60, 78, 88, 92, 70, 48, 36, 50, 75, 82, 64, 45, 58, 80, 95, 85, 60, 40, 52, 70, 85, 76, 50, 38, 62, 84, 90, 65, 42, 35, 55],
    publishedAt: new Date().toISOString(),
    featured: true,
    active: true,
  },
];

export const INITIAL_SCREEN_QUOTES: ScreenQuote[] = [
  {
    id: 'q-beauty',
    quote: 'Beauty is not a luxury for the human spirit; it is an intrinsic necessity through which the soul recognizes truth.',
    speakerName: 'Shaykh Abdal Hakim Murad',
    speakerId: 'spk-abdal-hakim',
    source: 'Traveling Light Series',
    publishedAt: new Date().toISOString(),
    featured: true,
    active: true,
  },
  {
    id: 'q-mercy',
    quote: 'True knowledge does not produce arrogance; it generates compassion, humility, and service toward all creation.',
    speakerName: 'Dr. Umar Faruq Abd-Allah',
    speakerId: 'spk-umar-faruq',
    source: 'Foundations of Character',
    publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    featured: true,
    active: true,
  },
];

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
  {
    id: 'ayah-anbiya',
    arabicText: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
    translation: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.',
    surahNameArabic: 'الأنبياء',
    surahNameEnglish: 'Al-Anbiya',
    surahNumber: 21,
    ayahNumber: 107,
    reference: 'Surah Al-Anbiya 21:107',
    reflection: 'Mercy is the essential ethos through which knowledge, conduct, and relationships must be governed.',
    topicId: 'top-faith',
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_INSTITUTE_ARTICLES: InstituteArticle[] = [
  {
    id: 'art-time',
    title: 'The Sacred Rhythm of Time',
    slug: 'the-sacred-rhythm-of-time',
    excerpt: 'An examination of how traditional Islamic time consciousness preserves purpose and presence.',
    content: `Time in modern society is treated as a transactional commodity to be spent, saved, and traded in relentless pursuit of productivity. Yet within the Islamic worldview, time (al-zaman) is conceived not as an economic resource, but as a sacred vessel.

The five daily prayers punctuate the day according to celestial movements: dawn, midday, afternoon, sunset, and nightfall. By anchoring consciousness to cosmic reality rather than mechanical clocks, the believer is summoned back from temporal distractions into eternal orientation.

To live intentionally within this rhythm is to recover presence, quiet the anxious mind, and restore reverence to the fleeting moments of human existence.`,
    coverImage: 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80',
    author: 'Editorial Fellow, Nuqtah Institute',
    topicId: 'top-quran',
    readingTimeMinutes: 5,
    publishedAt: new Date().toISOString(),
    featured: true,
    tags: ['time', 'quran', 'contemplation'],
    active: true,
  },
];

export const INITIAL_INSTITUTE_RESOURCES: InstituteResource[] = [
  {
    id: 'res-adhkar',
    title: 'A Guide to Daily Adhkar & Reflection',
    slug: 'guide-daily-adhkar-reflection',
    description: 'A structured, typography-focused reading guide for morning and evening remembrances.',
    fileType: 'PDF',
    fileUrl: '#',
    fileSize: '2.4 MB',
    topicId: 'top-faith',
    publishedAt: new Date().toISOString(),
    active: true,
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-arabic',
    title: 'Foundations of Quranic Arabic & Tadabbur',
    slug: 'foundations-quranic-arabic',
    shortDescription: 'A comprehensive primer into grammar, root structures, and reflective engagement with the Quran.',
    description: 'Designed for seekers wanting to unlock direct linguistic connection to the Quranic text with clarity and scholarly rigor.',
    coverImage: 'https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80',
    instructorName: 'Ustadh Ahmad Al-Hasan',
    instructorBio: 'Graduate of Al-Azhar University and Senior Fellow at Nuqtah Institute.',
    topicId: 'top-quran',
    level: 'Foundational',
    durationWeeks: 8,
    status: 'Upcoming',
    active: true,
    modules: [
      {
        id: 'mod-1',
        courseId: 'crs-arabic',
        title: 'Module 1: Three-Letter Root System',
        description: 'Understanding morphology and semantic depths of Arabic root words.',
        order: 1,
        lessons: [
          { id: 'les-1', moduleId: 'mod-1', title: 'The Concept of Ism and Fi‘l', durationMinutes: 25, order: 1 },
          { id: 'les-2', moduleId: 'mod-1', title: 'Root Permutations in Surah Al-Fatihah', durationMinutes: 30, order: 2 },
        ],
      },
    ],
  },
];
