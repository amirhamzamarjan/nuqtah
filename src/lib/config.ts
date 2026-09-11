import { GlobalSettings } from '../types';

export const APP_CONFIG: GlobalSettings = {
  storeName: 'Nuqtah',
  tagline: 'Commerce, Media, Knowledge',
  whatsAppNumber: '01997049300',
  whatsAppInternational: '8801997049300',
  supportEmail: 'nuqtah20@gmail.com',
  supportPhone: '01997049300',
  currencySymbol: '৳',
  currencyCode: 'BDT',
  lowStockThreshold: 3,
  screenYouTube: 'https://www.youtube.com/@nuqtahsscreen9992',
  address: {
    shopNo: 'Shop No. 105',
    market: 'Hasan Mahmud Complex',
    area: 'Azompur Kacha Bazar, Dakshin Khan (Uttara)',
    city: 'Dhaka',
    postalCode: 'Dhaka-1230',
    country: 'Bangladesh',
    full: 'Shop No. 105, Hasan Mahmud Complex, Azompur Kacha Bazar, Dakshin Khan (Uttara), Dhaka-1230, Bangladesh',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shop+No.+105,+Hasan+Mahmud+Complex,+Azompur+Kacha+Bazar,+Dakshin+Khan,+Uttara,+Dhaka-1230',
  },
  socialLinks: {
    facebook: 'https://facebook.com/nuqtah',
    instagram: 'https://instagram.com/nuqtah',
    youtube: 'https://www.youtube.com/@nuqtahsscreen9992',
    whatsapp: 'https://wa.me/8801997049300',
  },
};

export const ECOSYSTEM_SITES = [
  {
    id: 'home',
    name: 'Nuqtah',
    title: 'Flagship Gateway',
    domain: 'nuqtah.com',
    path: '/',
    logo: '/logo/nuqtah black.jfif',
    description: 'The digital ecosystem bringing together luxury commerce, cinematic media, and authentic knowledge.',
  },
  {
    id: 'shop',
    name: 'Shop',
    title: 'Luxury Boutique',
    domain: 'shop.nuqtah.com',
    path: '/shop',
    logo: '/logo/nuqtah black.jfif',
    description: 'Curated heritage fashion, modest luxury wear, pure attars, and organic essentials.',
  },
  {
    id: 'screen',
    name: 'Screen',
    title: 'Media & Discourses',
    domain: 'screen.nuqtah.com',
    path: '/screen',
    logo: '/logo/nuqtah black.jfif',
    description: 'Cinematic talks, series, podcasts, and timeless wisdom for the modern mind.',
  },
  {
    id: 'institute',
    name: 'Institute',
    title: 'Knowledge & Learning',
    domain: 'institute.nuqtah.com',
    path: '/institute',
    logo: '/logo/nuqtah black.jfif',
    description: 'Reflective Quranic Ayat, scholarly essays, and structured Islamic learning resources.',
  },
] as const;
