# NUQTAH DIGITAL ECOSYSTEM

> A unified digital ecosystem combining luxury lifestyle commerce, cinematic media discourses, and authentic Islamic knowledge.

---

## 1. Ecosystem Overview

Nuqtah is structured into four primary destinations plus a dedicated management portal:

1. **NUQTAH HOME (`nuqtah.com`)**: Flagship ecosystem gateway, editorial philosophy, live highlights from commerce, media, and institute.
2. **NUQTAH SHOP (`shop.nuqtah.com`)**:
   - **Men**: Hand-tailored Egyptian cotton Panjabis, Kabli sets, Payjamas, and Heritage edits.
   - **Women's Luxury Sanctuary**: Dedicated feminine blush/dusty rose/rosewood aesthetic using `nuqtah pink.png`, raw silk abayas, and linen co-ords.
   - **Kids' Little Noor**: Warm cream and soft beige festive sets for young children.
   - **Attar**: Hydro-distilled aged Hindi oud, Taif rose, and non-alcoholic flacons.
   - **Organic Food**: Raw Sundarban wild honey, cold-pressed black seed oils.
   - **Live Stock & Real Inventory**: Automatic Out-of-Stock and Low-Stock states, variant level inventory.
   - **Mathematical Discount Engine**: Exact discount percentages and savings computations.
   - **Direct WhatsApp Concierge**: Instant ordering with pre-formatted product, size, and pricing parameters.
3. **NUQTAH SCREEN (`screen.nuqtah.com`)**: Cinematic discourses, philosophical lecture series, custom waveform podcast player, contemplative quotes archive, speaker directory.
4. **NUQTAH INSTITUTE (`institute.nuqtah.com`)**: High-resolution Quranic Arabic typography (`Amiri`), translations, reflections, research essays, study guides, and future course architecture.
5. **ADMIN PORTAL (`admin.nuqtah.com` / `/admin`)**: Role-based management console for products, inventory stock adjustment, categories & collections, offers, WhatsApp order inquiries, media, and global settings.

---

## 2. Technology Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS with customized luxury design tokens.
- **Backend & Database**: Supabase PostgreSQL, Row Level Security (RLS), Supabase Auth, Supabase Storage.
- **Design System**: Zero-VibeCoded standards — no purple/neon gradients, no fake stats/reviews, no emojis as UI icons (Lucide SVG system), restrained antique gold, custom typography (`Cormorant Garamond`, `Plus Jakarta Sans`, `Amiri`).
- **State Management**: Reactive multi-layer store synchronizing with Supabase API and persistent local storage fallback.

---

## 3. Project Structure

```
nuqtah 2/
├── public/
│   ├── logo/
│   │   ├── Nuqtah Institute logo.jpg
│   │   ├── nuqtah home.png
│   │   ├── nuqtah screen.jfif
│   │   ├── nuqtah shop.jfif
│   │   └── nuqtahwomen.png
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── apps/
│   │   ├── home/           # nuqtah.com Gateway & Governance
│   │   ├── shop/           # shop.nuqtah.com Boutique, Women, Kids, Men, Attar, Food
│   │   ├── screen/         # screen.nuqtah.com Media, Series, Podcasts, Quotes
│   │   ├── institute/      # institute.nuqtah.com Ayat, Articles, Topics, Courses
│   │   └── admin/          # admin.nuqtah.com Management Console
│   ├── components/
│   │   ├── navigation/     # Header, DestinationBar, Mobile Drawer
│   │   ├── footer/         # Luxury Footer
│   │   ├── ui/             # Buttons, Badges, ProductCard, MediaCard, ArticleCard
│   │   ├── audio/          # Custom Luxury Waveform Podcast Player
│   │   ├── video/          # Privacy-friendly Video Modal
│   │   ├── arabic/         # Amiri Quranic Typography Viewer
│   │   ├── cart/           # Slide-over Bag Drawer with WhatsApp Order
│   │   └── wishlist/       # Slide-over Saved Items
│   ├── context/            # ThemeContext, CartContext, WishlistContext, AuthContext
│   ├── lib/                # Supabase client, Store, Discount engine, Inventory, WhatsApp
│   ├── styles/             # Tailwind base, tokens.css luxury palette
│   ├── types/              # Comprehensive TypeScript interfaces
│   ├── App.tsx             # Master Routing Orchestrator
│   └── main.tsx
├── supabase/
│   ├── migrations/         # 20260911000000_nuqtah_schema.sql
│   └── seed/               # seed.sql
├── docs/                   # README.md, SUPABASE_SETUP.md, DEPLOYMENT.md
├── package.json
└── vite.config.ts
```

---

## 4. Local Development

1. Clone or navigate to the repository directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`.

---

## 5. Admin Panel Security & Login

Navigate to `/admin` or click **Admin Portal** in the top navigation bar. Unauthenticated visitors are automatically redirected to the restricted Admin Login page.

- **Username**: `admin`
- **Password**: `nuqtah2026`
- **Supported Roles**: `Super Admin`, `Store Manager`, `Content Manager`
- **Protected Sections**: Products CRUD, Variant Inventory stock adjustments, Categories & Collections, Scheduled Offers, Order & WhatsApp Inquiries, Media, Institute, Global Settings.
