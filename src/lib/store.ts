import {
  Department,
  Category,
  Collection,
  Product,
  ProductVariant,
  Offer,
  Order,
  OrderStatus,
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
  DepartmentId,
} from '../types';

import {
  INITIAL_DEPARTMENTS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_SCREEN_CATEGORIES,
  INITIAL_SCREEN_SPEAKERS,
  INITIAL_SCREEN_SERIES,
  INITIAL_SCREEN_VIDEOS,
  INITIAL_SCREEN_PODCASTS,
  INITIAL_SCREEN_QUOTES,
  INITIAL_INSTITUTE_TOPICS,
  INITIAL_INSTITUTE_AYAT,
  INITIAL_INSTITUTE_ARTICLES,
  INITIAL_INSTITUTE_RESOURCES,
  INITIAL_COURSES,
} from './mockData';

import { APP_CONFIG } from './config';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  DEPARTMENTS: 'nqt_clean_departments',
  CATEGORIES: 'nqt_clean_categories',
  COLLECTIONS: 'nqt_clean_collections',
  PRODUCTS: 'nqt_clean_products',
  OFFERS: 'nqt_clean_offers',
  ORDERS: 'nqt_clean_orders',
  SCREEN_CATEGORIES: 'nqt_clean_screen_cats',
  SCREEN_SPEAKERS: 'nqt_clean_screen_speakers',
  SCREEN_SERIES: 'nqt_clean_screen_series',
  SCREEN_VIDEOS: 'nqt_clean_screen_videos',
  SCREEN_PODCASTS: 'nqt_clean_screen_podcasts',
  SCREEN_QUOTES: 'nqt_clean_screen_quotes',
  INSTITUTE_TOPICS: 'nqt_clean_inst_topics',
  INSTITUTE_AYAT: 'nqt_clean_inst_ayat',
  INSTITUTE_ARTICLES: 'nqt_clean_inst_articles',
  INSTITUTE_RESOURCES: 'nqt_clean_inst_resources',
  COURSES: 'nqt_clean_courses',
  SETTINGS: 'nqt_clean_settings',
};

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}

// -------------------------------------------------------------
// DATABASE MAPPERS (SNAKE_CASE <-> CAMELCASE)
// -------------------------------------------------------------

function mapDbVariantToVariant(row: any): ProductVariant {
  return {
    id: row.id,
    productId: row.product_id || row.productId,
    sku: row.sku || '',
    name: row.name || 'Standard',
    attributes: row.attributes || {},
    priceOverride: row.price_override !== null && row.price_override !== undefined ? Number(row.price_override) : undefined,
    stock: Number(row.stock || 0),
    active: row.active !== undefined ? Boolean(row.active) : true,
  };
}

function mapDbProductToProduct(row: any): Product {
  const variants = Array.isArray(row.variants)
    ? row.variants.map(mapDbVariantToVariant)
    : Array.isArray(row.product_variants)
    ? row.product_variants.map(mapDbVariantToVariant)
    : [];

  const rawStock = row.total_stock !== undefined ? row.total_stock : (row.totalStock !== undefined ? row.totalStock : 0);
  const totalStock = variants.length > 0
    ? variants.reduce((acc: number, v: ProductVariant) => acc + Math.max(0, v.stock), 0)
    : Number(rawStock || 0);

  return {
    id: row.id,
    slug: row.slug || '',
    name: row.name || '',
    shortDescription: row.short_description || row.shortDescription || '',
    description: row.description || '',
    departmentId: (row.department_id || row.departmentId || 'men') as DepartmentId,
    categoryId: row.category_id || row.categoryId || '',
    subcategoryId: row.subcategory_id || row.subcategoryId,
    collectionId: row.collection_id || row.collectionId,
    sku: row.sku || '',
    price: Number(row.price || 0),
    oldPrice: row.old_price !== null && row.old_price !== undefined ? Number(row.old_price) : (row.oldPrice !== undefined ? Number(row.oldPrice) : undefined),
    discountType: row.discount_type || row.discountType,
    discountValue: row.discount_value !== null && row.discount_value !== undefined ? Number(row.discount_value) : (row.discountValue !== undefined ? Number(row.discountValue) : undefined),
    salePrice: row.sale_price !== null && row.sale_price !== undefined ? Number(row.sale_price) : (row.salePrice !== undefined ? Number(row.salePrice) : undefined),
    mainImage: row.main_image || row.mainImage || '',
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : (Array.isArray(row.galleryImages) ? row.galleryImages : [row.main_image || row.mainImage || '']),
    hoverImage: row.hover_image || row.hoverImage,
    featured: Boolean(row.featured),
    badge: row.badge,
    active: row.active !== undefined ? Boolean(row.active) : true,
    available: totalStock > 0,
    totalStock,
    specifications: row.specifications || {},
    careInstructions: Array.isArray(row.care_instructions) ? row.care_instructions : (Array.isArray(row.careInstructions) ? row.careInstructions : []),
    tags: Array.isArray(row.tags) ? row.tags : [],
    variants,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

function mapProductToDbRow(p: Product): any {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    short_description: p.shortDescription,
    description: p.description,
    department_id: p.departmentId,
    category_id: p.categoryId,
    subcategory_id: p.subcategoryId || null,
    collection_id: p.collectionId || null,
    sku: p.sku,
    price: p.price,
    old_price: p.oldPrice || null,
    discount_type: p.discountType || null,
    discount_value: p.discountValue || null,
    sale_price: p.salePrice || null,
    main_image: p.mainImage,
    gallery_images: p.galleryImages || [p.mainImage],
    hover_image: p.hoverImage || null,
    featured: p.featured,
    badge: p.badge || null,
    active: p.active,
    available: p.totalStock > 0,
    total_stock: p.totalStock,
    specifications: p.specifications || {},
    care_instructions: p.careInstructions || [],
    tags: p.tags || [],
    updated_at: new Date().toISOString(),
  };
}

function mapDbCategoryToCategory(row: any): Category {
  return {
    id: row.id,
    departmentId: (row.department_id || row.departmentId || 'women') as DepartmentId,
    name: row.name,
    slug: row.slug,
    description: row.description,
    image: row.image,
    active: row.active !== undefined ? Boolean(row.active) : true,
    order: row.display_order !== undefined ? Number(row.display_order) : (row.order !== undefined ? Number(row.order) : 0),
  };
}

function mapCategoryToDbRow(c: Category): any {
  return {
    id: c.id,
    department_id: c.departmentId,
    name: c.name,
    slug: c.slug,
    description: c.description || null,
    image: c.image || null,
    active: c.active,
    display_order: c.order || 0,
    updated_at: new Date().toISOString(),
  };
}

function mapDbOfferToOffer(row: any): Offer {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    startAt: row.start_at || row.startAt,
    endAt: row.end_at || row.endAt,
    discountType: row.discount_type || row.discountType || 'percentage',
    discountValue: Number(row.discount_value !== undefined ? row.discount_value : (row.discountValue || 0)),
    bannerImage: row.banner_image || row.bannerImage,
    departmentId: row.department_id || row.departmentId,
    productIds: Array.isArray(row.product_ids) ? row.product_ids : row.productIds,
    categoryIds: Array.isArray(row.category_ids) ? row.category_ids : row.categoryIds,
    active: row.active !== undefined ? Boolean(row.active) : true,
  };
}

function mapDbVideoToVideo(row: any): ScreenVideo {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    youtubeUrl: row.youtube_url || row.youtubeUrl || '',
    youtubeId: row.youtube_id || row.youtubeId || '',
    thumbnail: row.thumbnail || '',
    description: row.description || '',
    categoryId: row.category_id || row.categoryId || '',
    speakerId: row.speaker_id || row.speakerId,
    seriesId: row.series_id || row.seriesId,
    episodeNumber: row.episode_number || row.episodeNumber,
    duration: row.duration,
    publishedAt: row.published_at || row.publishedAt || new Date().toISOString(),
    featured: Boolean(row.featured),
    tags: Array.isArray(row.tags) ? row.tags : [],
    active: row.active !== undefined ? Boolean(row.active) : true,
  };
}

function mapDbAyahToAyah(row: any): InstituteAyah {
  return {
    id: row.id,
    arabicText: row.arabic_text || row.arabicText || '',
    translation: row.translation || '',
    surahNameArabic: row.surah_name_arabic || row.surahNameArabic || '',
    surahNameEnglish: row.surah_name_english || row.surahNameEnglish || '',
    surahNumber: Number(row.surah_number || row.surahNumber || 1),
    ayahNumber: Number(row.ayah_number || row.ayahNumber || 1),
    reference: row.reference || '',
    reflection: row.reflection,
    topicId: row.topic_id || row.topicId,
    featured: Boolean(row.featured),
    published: row.published !== undefined ? Boolean(row.published) : true,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

function mapDbArticleToArticle(row: any): InstituteArticle {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    coverImage: row.cover_image || row.coverImage || '',
    author: row.author || '',
    topicId: row.topic_id || row.topicId,
    readingTimeMinutes: Number(row.reading_time_minutes || row.readingTimeMinutes || 5),
    publishedAt: row.published_at || row.publishedAt || new Date().toISOString(),
    featured: Boolean(row.featured),
    tags: Array.isArray(row.tags) ? row.tags : [],
    active: row.active !== undefined ? Boolean(row.active) : true,
  };
}

class NuqtahStore {
  private departments: Department[];
  private categories: Category[];
  private collections: Collection[];
  private products: Product[];
  private offers: Offer[];
  private orders: Order[];
  private screenCategories: ScreenCategory[];
  private screenSpeakers: ScreenSpeaker[];
  private screenSeries: ScreenSeries[];
  private screenVideos: ScreenVideo[];
  private screenPodcasts: ScreenPodcast[];
  private screenQuotes: ScreenQuote[];
  private instituteTopics: InstituteTopic[];
  private instituteAyat: InstituteAyah[];
  private instituteArticles: InstituteArticle[];
  private instituteResources: InstituteResource[];
  private courses: Course[];
  private settings: GlobalSettings;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.departments = loadStored(STORAGE_KEYS.DEPARTMENTS, INITIAL_DEPARTMENTS);
    this.categories = loadStored(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    this.collections = loadStored(STORAGE_KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
    this.products = loadStored(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.offers = loadStored(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    this.orders = loadStored(STORAGE_KEYS.ORDERS, []);
    this.screenCategories = loadStored(STORAGE_KEYS.SCREEN_CATEGORIES, INITIAL_SCREEN_CATEGORIES);
    this.screenSpeakers = loadStored(STORAGE_KEYS.SCREEN_SPEAKERS, INITIAL_SCREEN_SPEAKERS);
    this.screenSeries = loadStored(STORAGE_KEYS.SCREEN_SERIES, INITIAL_SCREEN_SERIES);
    this.screenVideos = loadStored(STORAGE_KEYS.SCREEN_VIDEOS, INITIAL_SCREEN_VIDEOS);
    this.screenPodcasts = loadStored(STORAGE_KEYS.SCREEN_PODCASTS, INITIAL_SCREEN_PODCASTS);
    this.screenQuotes = loadStored(STORAGE_KEYS.SCREEN_QUOTES, INITIAL_SCREEN_QUOTES);
    this.instituteTopics = loadStored(STORAGE_KEYS.INSTITUTE_TOPICS, INITIAL_INSTITUTE_TOPICS);
    this.instituteAyat = loadStored(STORAGE_KEYS.INSTITUTE_AYAT, INITIAL_INSTITUTE_AYAT);
    this.instituteArticles = loadStored(STORAGE_KEYS.INSTITUTE_ARTICLES, INITIAL_INSTITUTE_ARTICLES);
    this.instituteResources = loadStored(STORAGE_KEYS.INSTITUTE_RESOURCES, INITIAL_INSTITUTE_RESOURCES);
    this.courses = loadStored(STORAGE_KEYS.COURSES, INITIAL_COURSES);

    const storedSettings = loadStored<Partial<GlobalSettings>>(STORAGE_KEYS.SETTINGS, {});
    this.settings = {
      ...APP_CONFIG,
      ...storedSettings,
      whatsAppNumber: APP_CONFIG.whatsAppNumber,
      whatsAppInternational: APP_CONFIG.whatsAppInternational,
      supportEmail: APP_CONFIG.supportEmail,
      screenYouTube: APP_CONFIG.screenYouTube,
      address: APP_CONFIG.address,
    };

    this.syncFromSupabase();
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  /**
   * Fetches latest data from Supabase PostgreSQL and maps snake_case to camelCase
   */
  public async syncFromSupabase() {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const [deptRes, prodRes, catRes, colRes, offRes, vidRes, ayaRes, artRes] = await Promise.all([
        supabase.from('departments').select('*').eq('active', true).order('display_order'),
        supabase.from('products').select('*, variants:product_variants(*)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('display_order'),
        supabase.from('collections').select('*'),
        supabase.from('offers').select('*'),
        supabase.from('screen_videos').select('*').order('published_at', { ascending: false }),
        supabase.from('institute_ayat').select('*').order('created_at', { ascending: false }),
        supabase.from('institute_articles').select('*').order('published_at', { ascending: false }),
      ]);

      if (deptRes.data && deptRes.data.length > 0) {
        this.departments = deptRes.data.map((d: any) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          tagline: d.tagline || '',
          description: d.description || '',
          image: d.image || '',
          theme: d.theme || 'men',
          active: Boolean(d.active),
          order: Number(d.display_order || 0),
        }));
        saveStored(STORAGE_KEYS.DEPARTMENTS, this.departments);
      }

      if (prodRes.data && prodRes.data.length > 0) {
        this.products = prodRes.data.map(mapDbProductToProduct);
        saveStored(STORAGE_KEYS.PRODUCTS, this.products);
      }

      if (catRes.data && catRes.data.length > 0) {
        this.categories = catRes.data.map(mapDbCategoryToCategory);
        saveStored(STORAGE_KEYS.CATEGORIES, this.categories);
      }

      if (colRes.data && colRes.data.length > 0) {
        this.collections = colRes.data.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          bannerImage: c.banner_image,
          departmentId: c.department_id,
          featured: Boolean(c.featured),
          active: Boolean(c.active),
        }));
        saveStored(STORAGE_KEYS.COLLECTIONS, this.collections);
      }

      if (offRes.data && offRes.data.length > 0) {
        this.offers = offRes.data.map(mapDbOfferToOffer);
        saveStored(STORAGE_KEYS.OFFERS, this.offers);
      }

      if (vidRes.data && vidRes.data.length > 0) {
        this.screenVideos = vidRes.data.map(mapDbVideoToVideo);
        saveStored(STORAGE_KEYS.SCREEN_VIDEOS, this.screenVideos);
      }

      if (ayaRes.data && ayaRes.data.length > 0) {
        this.instituteAyat = ayaRes.data.map(mapDbAyahToAyah);
        saveStored(STORAGE_KEYS.INSTITUTE_AYAT, this.instituteAyat);
      }

      if (artRes.data && artRes.data.length > 0) {
        this.instituteArticles = artRes.data.map(mapDbArticleToArticle);
        saveStored(STORAGE_KEYS.INSTITUTE_ARTICLES, this.instituteArticles);
      }

      this.notify();
    } catch (err) {
      console.warn('Supabase sync info:', err);
    }
  }

  // -------------------------------------------------------------
  // DEPARTMENTS
  // -------------------------------------------------------------
  public getDepartments(): Department[] {
    return [...this.departments].sort((a, b) => a.order - b.order);
  }

  public getDepartment(idOrSlug: string): Department | undefined {
    return this.departments.find((d) => d.id === idOrSlug || d.slug === idOrSlug);
  }

  // -------------------------------------------------------------
  // CATEGORIES & COLLECTIONS
  // -------------------------------------------------------------
  public getCategories(departmentId?: DepartmentId): Category[] {
    if (!departmentId) return this.categories.filter((c) => c.active);
    return this.categories
      .filter((c) => c.departmentId === departmentId && c.active)
      .sort((a, b) => a.order - b.order);
  }

  public getAllCategories(): Category[] {
    return [...this.categories];
  }

  public saveCategory(category: Category): void {
    const idx = this.categories.findIndex((c) => c.id === category.id);
    if (idx >= 0) {
      this.categories[idx] = category;
    } else {
      this.categories.push(category);
    }
    saveStored(STORAGE_KEYS.CATEGORIES, this.categories);
    this.notify();

    // Persist to Supabase
    if (isSupabaseConfigured && supabase) {
      const row = mapCategoryToDbRow(category);
      supabase.from('categories').upsert(row, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveCategory error:', error);
      });
    }
  }

  public deleteCategory(id: string): void {
    this.categories = this.categories.filter((c) => c.id !== id);
    saveStored(STORAGE_KEYS.CATEGORIES, this.categories);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('categories').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteCategory error:', error);
      });
    }
  }

  public getCollections(): Collection[] {
    return this.collections.filter((c) => c.active);
  }

  public getAllCollections(): Collection[] {
    return [...this.collections];
  }

  public saveCollection(col: Collection): void {
    const idx = this.collections.findIndex((c) => c.id === col.id);
    if (idx >= 0) {
      this.collections[idx] = col;
    } else {
      this.collections.push(col);
    }
    saveStored(STORAGE_KEYS.COLLECTIONS, this.collections);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('collections').upsert({
        id: col.id,
        name: col.name,
        slug: col.slug,
        description: col.description,
        featured: col.featured,
        active: col.active,
      }, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveCollection error:', error);
      });
    }
  }

  public deleteCollection(id: string): void {
    this.collections = this.collections.filter((c) => c.id !== id);
    saveStored(STORAGE_KEYS.COLLECTIONS, this.collections);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('collections').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteCollection error:', error);
      });
    }
  }

  // -------------------------------------------------------------
  // PRODUCTS & INVENTORY
  // -------------------------------------------------------------
  public getProducts(filters?: {
    departmentId?: DepartmentId;
    categoryId?: string;
    collectionId?: string;
    featured?: boolean;
    search?: string;
  }): Product[] {
    return this.products.filter((p) => {
      if (!p.active) return false;
      if (filters?.departmentId && p.departmentId !== filters.departmentId) return false;
      if (filters?.categoryId && p.categoryId !== filters.categoryId) return false;
      if (filters?.collectionId && p.collectionId !== filters.collectionId) return false;
      if (filters?.featured !== undefined && p.featured !== filters.featured) return false;
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesSku && !matchesTags) return false;
      }
      return true;
    });
  }

  public getAllProducts(): Product[] {
    return [...this.products];
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug || p.id === slug);
  }

  public saveProduct(product: Product): void {
    // Recalculate total stock from variants if present
    if (product.variants && product.variants.length > 0) {
      product.totalStock = product.variants.reduce((acc, v) => acc + Math.max(0, v.stock), 0);
      product.available = product.totalStock > 0;
    } else {
      product.available = product.totalStock > 0;
    }
    product.updatedAt = new Date().toISOString();

    const idx = this.products.findIndex((p) => p.id === product.id || p.slug === product.slug);
    if (idx >= 0) {
      this.products[idx] = product;
    } else {
      this.products.unshift(product);
    }
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();

    // Asynchronously upsert to Supabase
    if (isSupabaseConfigured && supabase) {
      const dbRow = mapProductToDbRow(product);
      supabase.from('products').upsert(dbRow, { onConflict: 'id' }).then(async ({ error }) => {
        if (error) {
          console.error('Supabase saveProduct error:', error);
          return;
        }
        // Also upsert variants
        if (product.variants && product.variants.length > 0) {
          const variantRows = product.variants.map((v) => ({
            id: v.id,
            product_id: product.id,
            sku: v.sku,
            name: v.name,
            attributes: v.attributes,
            price_override: v.priceOverride || null,
            stock: v.stock,
            active: v.active,
          }));
          await supabase!.from('product_variants').upsert(variantRows, { onConflict: 'id' });
        }
      });
    }
  }

  public deleteProduct(id: string): void {
    this.products = this.products.filter((p) => p.id !== id && p.slug !== id);
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('products').delete().or(`id.eq.${id},slug.eq.${id}`).then(({ error }) => {
        if (error) console.error('Supabase deleteProduct error:', error);
      });
    }
  }

  /**
   * Real Inventory Decrement (Ensures never drops below 0)
   */
  public decrementStock(productId: string, variantId?: string, quantity: number = 1): boolean {
    const product = this.products.find((p) => p.id === productId || p.slug === productId);
    if (!product) return false;

    if (variantId && product.variants && product.variants.length > 0) {
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant || variant.stock < quantity) return false;
      variant.stock = Math.max(0, variant.stock - quantity);
      product.totalStock = product.variants.reduce((acc, v) => acc + Math.max(0, v.stock), 0);
      product.available = product.totalStock > 0;
    } else {
      if (product.totalStock < quantity) return false;
      product.totalStock = Math.max(0, product.totalStock - quantity);
      product.available = product.totalStock > 0;
    }

    product.updatedAt = new Date().toISOString();
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();

    // Supabase decrement
    if (isSupabaseConfigured && supabase) {
      if (variantId) {
        const v = product.variants.find((item) => item.id === variantId);
        if (v) {
          supabase.from('product_variants').update({ stock: v.stock }).eq('id', variantId);
        }
      }
      supabase.from('products').update({ total_stock: product.totalStock, available: product.available }).eq('id', product.id);
    }
    return true;
  }

  /**
   * Restock or adjust inventory safely
   */
  public updateVariantStock(productId: string, variantId: string, newStock: number): void {
    const product = this.products.find((p) => p.id === productId || p.slug === productId);
    if (!product) return;

    const variant = product.variants?.find((v) => v.id === variantId);
    if (variant) {
      variant.stock = Math.max(0, newStock);
      product.totalStock = product.variants.reduce((acc, v) => acc + Math.max(0, v.stock), 0);
      product.available = product.totalStock > 0;
      product.updatedAt = new Date().toISOString();
      saveStored(STORAGE_KEYS.PRODUCTS, this.products);
      this.notify();

      if (isSupabaseConfigured && supabase) {
        supabase.from('product_variants').update({ stock: variant.stock }).eq('id', variantId).then(() => {});
        supabase.from('products').update({ total_stock: product.totalStock, available: product.available }).eq('id', product.id).then(() => {});
      }
    }
  }

  public updateProductDirectStock(productId: string, newStock: number): void {
    const product = this.products.find((p) => p.id === productId || p.slug === productId);
    if (!product) return;
    product.totalStock = Math.max(0, newStock);
    product.available = product.totalStock > 0;
    product.updatedAt = new Date().toISOString();
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('products').update({ total_stock: product.totalStock, available: product.available }).eq('id', product.id).then(() => {});
    }
  }

  // -------------------------------------------------------------
  // OFFERS & PROMOTIONS
  // -------------------------------------------------------------
  public getActiveOffers(): Offer[] {
    const now = new Date().getTime();
    return this.offers.filter((o) => {
      if (!o.active) return false;
      const start = new Date(o.startAt).getTime();
      const end = new Date(o.endAt).getTime();
      return now >= start && now <= end;
    });
  }

  public getAllOffers(): Offer[] {
    return [...this.offers];
  }

  public saveOffer(offer: Offer): void {
    const idx = this.offers.findIndex((o) => o.id === offer.id);
    if (idx >= 0) {
      this.offers[idx] = offer;
    } else {
      this.offers.unshift(offer);
    }
    saveStored(STORAGE_KEYS.OFFERS, this.offers);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('offers').upsert({
        id: offer.id,
        title: offer.title,
        slug: offer.slug,
        description: offer.description,
        start_at: offer.startAt,
        end_at: offer.endAt,
        discount_type: offer.discountType,
        discount_value: offer.discountValue,
        active: offer.active,
      }, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveOffer error:', error);
      });
    }
  }

  public deleteOffer(id: string): void {
    this.offers = this.offers.filter((o) => o.id !== id);
    saveStored(STORAGE_KEYS.OFFERS, this.offers);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('offers').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteOffer error:', error);
      });
    }
  }

  // -------------------------------------------------------------
  // ORDERS / INQUIRIES
  // -------------------------------------------------------------
  public getOrders(): Order[] {
    return [...this.orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      orderNumber: `NQT-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.orders.unshift(newOrder);
    saveStored(STORAGE_KEYS.ORDERS, this.orders);
    this.notify();
    return newOrder;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): void {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      saveStored(STORAGE_KEYS.ORDERS, this.orders);
      this.notify();
    }
  }

  // -------------------------------------------------------------
  // SCREEN (MEDIA)
  // -------------------------------------------------------------
  public getScreenVideos(filters?: { categoryId?: string; speakerId?: string; seriesId?: string }): ScreenVideo[] {
    return this.screenVideos.filter((v) => {
      if (!v.active) return false;
      if (filters?.categoryId && v.categoryId !== filters.categoryId) return false;
      if (filters?.speakerId && v.speakerId !== filters.speakerId) return false;
      if (filters?.seriesId && v.seriesId !== filters.seriesId) return false;
      return true;
    });
  }

  public getAllScreenVideos(): ScreenVideo[] {
    return [...this.screenVideos];
  }

  public getScreenVideoBySlug(slug: string): ScreenVideo | undefined {
    return this.screenVideos.find((v) => v.slug === slug || v.id === slug);
  }

  public saveScreenVideo(video: ScreenVideo): void {
    const idx = this.screenVideos.findIndex((v) => v.id === video.id);
    if (idx >= 0) {
      this.screenVideos[idx] = video;
    } else {
      this.screenVideos.unshift(video);
    }
    saveStored(STORAGE_KEYS.SCREEN_VIDEOS, this.screenVideos);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('screen_videos').upsert({
        id: video.id,
        title: video.title,
        slug: video.slug,
        youtube_url: video.youtubeUrl,
        youtube_id: video.youtubeId,
        thumbnail: video.thumbnail,
        description: video.description,
        category_id: video.categoryId,
        speaker_id: video.speakerId || null,
        duration: video.duration,
        featured: video.featured,
        active: video.active,
      }, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveScreenVideo error:', error);
      });
    }
  }

  public deleteScreenVideo(id: string): void {
    this.screenVideos = this.screenVideos.filter((v) => v.id !== id);
    saveStored(STORAGE_KEYS.SCREEN_VIDEOS, this.screenVideos);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('screen_videos').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteScreenVideo error:', error);
      });
    }
  }

  public getScreenSpeakers(): ScreenSpeaker[] {
    return this.screenSpeakers.filter((s) => s.active);
  }

  public getAllScreenSpeakers(): ScreenSpeaker[] {
    return [...this.screenSpeakers];
  }

  public saveScreenSpeaker(spk: ScreenSpeaker): void {
    const idx = this.screenSpeakers.findIndex((s) => s.id === spk.id);
    if (idx >= 0) this.screenSpeakers[idx] = spk;
    else this.screenSpeakers.push(spk);
    saveStored(STORAGE_KEYS.SCREEN_SPEAKERS, this.screenSpeakers);
    this.notify();
  }

  public getScreenSeries(): ScreenSeries[] {
    return this.screenSeries.filter((s) => s.active);
  }

  public getAllScreenSeries(): ScreenSeries[] {
    return [...this.screenSeries];
  }

  public saveScreenSeries(series: ScreenSeries): void {
    const idx = this.screenSeries.findIndex((s) => s.id === series.id);
    if (idx >= 0) this.screenSeries[idx] = series;
    else this.screenSeries.push(series);
    saveStored(STORAGE_KEYS.SCREEN_SERIES, this.screenSeries);
    this.notify();
  }

  public getScreenPodcasts(): ScreenPodcast[] {
    return this.screenPodcasts.filter((p) => p.active);
  }

  public getAllScreenPodcasts(): ScreenPodcast[] {
    return [...this.screenPodcasts];
  }

  public saveScreenPodcast(pod: ScreenPodcast): void {
    const idx = this.screenPodcasts.findIndex((p) => p.id === pod.id);
    if (idx >= 0) this.screenPodcasts[idx] = pod;
    else this.screenPodcasts.unshift(pod);
    saveStored(STORAGE_KEYS.SCREEN_PODCASTS, this.screenPodcasts);
    this.notify();
  }

  public deleteScreenPodcast(id: string): void {
    this.screenPodcasts = this.screenPodcasts.filter((p) => p.id !== id);
    saveStored(STORAGE_KEYS.SCREEN_PODCASTS, this.screenPodcasts);
    this.notify();
  }

  public getScreenQuotes(): ScreenQuote[] {
    return this.screenQuotes.filter((q) => q.active);
  }

  public getAllScreenQuotes(): ScreenQuote[] {
    return [...this.screenQuotes];
  }

  public saveScreenQuote(q: ScreenQuote): void {
    const idx = this.screenQuotes.findIndex((item) => item.id === q.id);
    if (idx >= 0) this.screenQuotes[idx] = q;
    else this.screenQuotes.unshift(q);
    saveStored(STORAGE_KEYS.SCREEN_QUOTES, this.screenQuotes);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('screen_quotes').upsert({
        id: q.id,
        quote: q.quote,
        speaker_name: q.speakerName,
        source: q.source || null,
        active: q.active,
      }, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveScreenQuote error:', error);
      });
    }
  }

  public deleteScreenQuote(id: string): void {
    this.screenQuotes = this.screenQuotes.filter((q) => q.id !== id);
    saveStored(STORAGE_KEYS.SCREEN_QUOTES, this.screenQuotes);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('screen_quotes').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteScreenQuote error:', error);
      });
    }
  }

  // -------------------------------------------------------------
  // INSTITUTE (KNOWLEDGE & COURSES)
  // -------------------------------------------------------------
  public getInstituteAyat(): InstituteAyah[] {
    return this.instituteAyat.filter((a) => a.published);
  }

  public getAllInstituteAyat(): InstituteAyah[] {
    return [...this.instituteAyat];
  }

  public saveInstituteAyah(ayah: InstituteAyah): void {
    const idx = this.instituteAyat.findIndex((a) => a.id === ayah.id);
    if (idx >= 0) this.instituteAyat[idx] = ayah;
    else this.instituteAyat.unshift(ayah);
    saveStored(STORAGE_KEYS.INSTITUTE_AYAT, this.instituteAyat);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('institute_ayat').upsert({
        id: ayah.id,
        arabic_text: ayah.arabicText,
        translation: ayah.translation,
        surah_name_arabic: ayah.surahNameArabic,
        surah_name_english: ayah.surahNameEnglish,
        surah_number: ayah.surahNumber,
        ayah_number: ayah.ayahNumber,
        reference: ayah.reference,
        reflection: ayah.reflection || null,
        featured: ayah.featured,
        published: ayah.published,
      }, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveInstituteAyah error:', error);
      });
    }
  }

  public deleteInstituteAyah(id: string): void {
    this.instituteAyat = this.instituteAyat.filter((a) => a.id !== id);
    saveStored(STORAGE_KEYS.INSTITUTE_AYAT, this.instituteAyat);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('institute_ayat').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteInstituteAyah error:', error);
      });
    }
  }

  public getInstituteArticles(): InstituteArticle[] {
    return this.instituteArticles.filter((a) => a.active);
  }

  public getAllInstituteArticles(): InstituteArticle[] {
    return [...this.instituteArticles];
  }

  public getInstituteArticleBySlug(slug: string): InstituteArticle | undefined {
    return this.instituteArticles.find((a) => a.slug === slug || a.id === slug);
  }

  public saveInstituteArticle(art: InstituteArticle): void {
    const idx = this.instituteArticles.findIndex((a) => a.id === art.id);
    if (idx >= 0) this.instituteArticles[idx] = art;
    else this.instituteArticles.unshift(art);
    saveStored(STORAGE_KEYS.INSTITUTE_ARTICLES, this.instituteArticles);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('institute_articles').upsert({
        id: art.id,
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt,
        content: art.content,
        cover_image: art.coverImage,
        author: art.author,
        reading_time_minutes: art.readingTimeMinutes,
        featured: art.featured,
        active: art.active,
      }, { onConflict: 'id' }).then(({ error }) => {
        if (error) console.error('Supabase saveInstituteArticle error:', error);
      });
    }
  }

  public deleteInstituteArticle(id: string): void {
    this.instituteArticles = this.instituteArticles.filter((a) => a.id !== id);
    saveStored(STORAGE_KEYS.INSTITUTE_ARTICLES, this.instituteArticles);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('institute_articles').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteInstituteArticle error:', error);
      });
    }
  }

  public getInstituteTopics(): InstituteTopic[] {
    return this.instituteTopics.filter((t) => t.active);
  }

  public getInstituteResources(): InstituteResource[] {
    return this.instituteResources.filter((r) => r.active);
  }

  public getCourses(): Course[] {
    return this.courses.filter((c) => c.active);
  }

  public getAllCourses(): Course[] {
    return [...this.courses];
  }

  public saveCourse(course: Course): void {
    const idx = this.courses.findIndex((c) => c.id === course.id);
    if (idx >= 0) this.courses[idx] = course;
    else this.courses.push(course);
    saveStored(STORAGE_KEYS.COURSES, this.courses);
    this.notify();
  }

  // -------------------------------------------------------------
  // SETTINGS
  // -------------------------------------------------------------
  public getSettings(): GlobalSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<GlobalSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    saveStored(STORAGE_KEYS.SETTINGS, this.settings);
    this.notify();

    if (isSupabaseConfigured && supabase) {
      supabase.from('global_settings').upsert({
        key: 'store_settings',
        value: this.settings,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' }).then(() => {});
    }
  }
}

export const store = new NuqtahStore();
