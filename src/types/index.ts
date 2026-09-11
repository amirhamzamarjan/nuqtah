export type DepartmentId = 'men' | 'women' | 'kids' | 'attar' | 'organic-food';

export interface Department {
  id: DepartmentId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  theme: 'men' | 'women' | 'kids' | 'attar' | 'food';
  active: boolean;
  order: number;
}

export interface Category {
  id: string;
  departmentId: DepartmentId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  active: boolean;
  order: number;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  departmentId: DepartmentId;
  name: string;
  slug: string;
  active: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage?: string;
  departmentId?: DepartmentId;
  featured: boolean;
  active: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string; // e.g., "Size 40 / White" or "50ml"
  attributes: {
    size?: string;
    color?: string;
    weight?: string;
    volume?: string;
    fragrance?: string;
    style?: string;
    [key: string]: string | undefined;
  };
  priceOverride?: number;
  stock: number;
  active: boolean;
}

export type ProductBadge = 'New' | 'Featured' | 'Sale' | 'Limited' | 'Low Stock' | 'Best Seller';

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  departmentId: DepartmentId;
  categoryId: string;
  subcategoryId?: string;
  collectionId?: string;
  sku: string;
  price: number;
  oldPrice?: number;
  discountType?: 'percentage' | 'fixed' | 'sale_price';
  discountValue?: number;
  salePrice?: number;
  mainImage: string;
  galleryImages: string[];
  hoverImage?: string;
  featured: boolean;
  badge?: ProductBadge;
  active: boolean;
  available: boolean;
  totalStock: number;
  specifications?: Record<string, string>;
  careInstructions?: string[];
  tags: string[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // generated unique cart id
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  slug: string;
  description: string;
  startAt: string;
  endAt: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  bannerImage?: string;
  departmentId?: DepartmentId;
  productIds?: string[];
  categoryIds?: string[];
  active: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumPurchase?: number;
  maximumDiscount?: number;
  startAt: string;
  endAt: string;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
}

export type OrderStatus = 'inquiry' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerWhatsApp?: string;
  customerAddress?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// -------------------------------------------------------------
// SCREEN (MEDIA) TYPES
// -------------------------------------------------------------

export interface ScreenCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  order: number;
}

export interface ScreenSpeaker {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  photoUrl?: string;
  active: boolean;
}

export interface ScreenSeries {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  speakerId?: string;
  active: boolean;
  order: number;
}

export interface ScreenVideo {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
  categoryId: string;
  speakerId?: string;
  seriesId?: string;
  episodeNumber?: number;
  duration?: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  active: boolean;
}

export interface ScreenPodcast {
  id: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  coverImage: string;
  speakerId?: string;
  seriesId?: string;
  duration: string;
  durationSeconds: number;
  waveformData?: number[];
  publishedAt: string;
  featured: boolean;
  active: boolean;
}

export interface ScreenQuote {
  id: string;
  quote: string;
  speakerName: string;
  speakerId?: string;
  source?: string;
  videoId?: string;
  seriesId?: string;
  publishedAt: string;
  featured: boolean;
  active: boolean;
}

// -------------------------------------------------------------
// INSTITUTE (KNOWLEDGE & COURSES) TYPES
// -------------------------------------------------------------

export interface InstituteTopic {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  order: number;
}

export interface InstituteAyah {
  id: string;
  arabicText: string;
  translation: string;
  surahNameArabic: string;
  surahNameEnglish: string;
  surahNumber: number;
  ayahNumber: number;
  reference: string;
  reflection?: string;
  topicId?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface InstituteArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  topicId?: string;
  readingTimeMinutes: number;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  active: boolean;
}

export interface InstituteResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  fileType: 'PDF' | 'Audio' | 'Document' | 'Study Guide';
  fileUrl: string;
  fileSize?: string;
  topicId?: string;
  publishedAt: string;
  active: boolean;
}

// Future Course Platform Foundation
export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  instructorName: string;
  instructorBio?: string;
  topicId?: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  durationWeeks?: number;
  status: 'Upcoming' | 'Enrolling' | 'In Session' | 'Archived';
  modules: CourseModule[];
  active: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  durationMinutes?: number;
  videoUrl?: string;
  order: number;
}

// -------------------------------------------------------------
// ADMIN & GLOBAL CONFIGURATION TYPES
// -------------------------------------------------------------

export type AdminRole = 'Super Admin' | 'Store Manager' | 'Content Manager';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
  lastLogin?: string;
}

export interface GlobalSettings {
  storeName: string;
  tagline: string;
  whatsAppNumber: string;
  whatsAppInternational: string;
  supportEmail: string;
  supportPhone?: string;
  currencySymbol: string;
  currencyCode: string;
  lowStockThreshold: number;
  screenYouTube: string;
  address: {
    shopNo: string;
    market: string;
    area: string;
    city: string;
    postalCode: string;
    country: string;
    full: string;
    mapUrl: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
}
