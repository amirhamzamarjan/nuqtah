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
  DEPARTMENTS: 'nqt_departments',
  CATEGORIES: 'nqt_categories',
  COLLECTIONS: 'nqt_collections',
  PRODUCTS: 'nqt_products',
  OFFERS: 'nqt_offers',
  ORDERS: 'nqt_orders',
  SCREEN_CATEGORIES: 'nqt_screen_cats',
  SCREEN_SPEAKERS: 'nqt_screen_speakers',
  SCREEN_SERIES: 'nqt_screen_series',
  SCREEN_VIDEOS: 'nqt_screen_videos',
  SCREEN_PODCASTS: 'nqt_screen_podcasts',
  SCREEN_QUOTES: 'nqt_screen_quotes',
  INSTITUTE_TOPICS: 'nqt_inst_topics',
  INSTITUTE_AYAT: 'nqt_inst_ayat',
  INSTITUTE_ARTICLES: 'nqt_inst_articles',
  INSTITUTE_RESOURCES: 'nqt_inst_resources',
  COURSES: 'nqt_courses',
  SETTINGS: 'nqt_settings',
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
    this.settings = { ...APP_CONFIG, ...storedSettings, whatsAppNumber: APP_CONFIG.whatsAppNumber, whatsAppInternational: APP_CONFIG.whatsAppInternational, supportEmail: APP_CONFIG.supportEmail, screenYouTube: APP_CONFIG.screenYouTube, address: APP_CONFIG.address };

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

  private async syncFromSupabase() {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const [deptRes, prodRes, catRes, vidRes, ayaRes] = await Promise.all([
        supabase.from('departments').select('*').eq('active', true),
        supabase.from('products').select('*, variants:product_variants(*)').eq('active', true),
        supabase.from('categories').select('*').eq('active', true),
        supabase.from('screen_videos').select('*').eq('active', true),
        supabase.from('institute_ayat').select('*').eq('published', true),
      ]);

      if (deptRes.data && deptRes.data.length > 0) {
        this.departments = deptRes.data as Department[];
        saveStored(STORAGE_KEYS.DEPARTMENTS, this.departments);
      }
      if (prodRes.data && prodRes.data.length > 0) {
        this.products = prodRes.data as Product[];
        saveStored(STORAGE_KEYS.PRODUCTS, this.products);
      }
      if (catRes.data && catRes.data.length > 0) {
        this.categories = catRes.data as Category[];
        saveStored(STORAGE_KEYS.CATEGORIES, this.categories);
      }
      if (vidRes.data && vidRes.data.length > 0) {
        this.screenVideos = vidRes.data as ScreenVideo[];
        saveStored(STORAGE_KEYS.SCREEN_VIDEOS, this.screenVideos);
      }
      if (ayaRes.data && ayaRes.data.length > 0) {
        this.instituteAyat = ayaRes.data as InstituteAyah[];
        saveStored(STORAGE_KEYS.INSTITUTE_AYAT, this.instituteAyat);
      }
      this.notify();
    } catch (err) {
      console.warn('Supabase initial fetch skipped or failed, using synchronized state:', err);
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
  }

  public deleteCategory(id: string): void {
    this.categories = this.categories.filter((c) => c.id !== id);
    saveStored(STORAGE_KEYS.CATEGORIES, this.categories);
    this.notify();
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
  }

  public deleteCollection(id: string): void {
    this.collections = this.collections.filter((c) => c.id !== id);
    saveStored(STORAGE_KEYS.COLLECTIONS, this.collections);
    this.notify();
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

    const idx = this.products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      this.products[idx] = product;
    } else {
      this.products.unshift(product);
    }
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();
  }

  public deleteProduct(id: string): void {
    this.products = this.products.filter((p) => p.id !== id);
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();
  }

  /**
   * Real Inventory Decrement (Ensures never drops below 0)
   */
  public decrementStock(productId: string, variantId?: string, quantity: number = 1): boolean {
    const product = this.products.find((p) => p.id === productId);
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
    return true;
  }

  /**
   * Restock or adjust inventory safely
   */
  public updateVariantStock(productId: string, variantId: string, newStock: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const variant = product.variants?.find((v) => v.id === variantId);
    if (variant) {
      variant.stock = Math.max(0, newStock);
      product.totalStock = product.variants.reduce((acc, v) => acc + Math.max(0, v.stock), 0);
      product.available = product.totalStock > 0;
      product.updatedAt = new Date().toISOString();
      saveStored(STORAGE_KEYS.PRODUCTS, this.products);
      this.notify();
    }
  }

  public updateProductDirectStock(productId: string, newStock: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;
    product.totalStock = Math.max(0, newStock);
    product.available = product.totalStock > 0;
    product.updatedAt = new Date().toISOString();
    saveStored(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();
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
  }

  public deleteOffer(id: string): void {
    this.offers = this.offers.filter((o) => o.id !== id);
    saveStored(STORAGE_KEYS.OFFERS, this.offers);
    this.notify();
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
  }

  public deleteScreenVideo(id: string): void {
    this.screenVideos = this.screenVideos.filter((v) => v.id !== id);
    saveStored(STORAGE_KEYS.SCREEN_VIDEOS, this.screenVideos);
    this.notify();
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
  }

  public deleteScreenQuote(id: string): void {
    this.screenQuotes = this.screenQuotes.filter((q) => q.id !== id);
    saveStored(STORAGE_KEYS.SCREEN_QUOTES, this.screenQuotes);
    this.notify();
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
  }

  public deleteInstituteAyah(id: string): void {
    this.instituteAyat = this.instituteAyat.filter((a) => a.id !== id);
    saveStored(STORAGE_KEYS.INSTITUTE_AYAT, this.instituteAyat);
    this.notify();
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
  }

  public deleteInstituteArticle(id: string): void {
    this.instituteArticles = this.instituteArticles.filter((a) => a.id !== id);
    saveStored(STORAGE_KEYS.INSTITUTE_ARTICLES, this.instituteArticles);
    this.notify();
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
  }
}

export const store = new NuqtahStore();
