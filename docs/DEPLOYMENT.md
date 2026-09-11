# NUQTAH ECOSYSTEM — COMPLETE PRODUCTION DEPLOYMENT GUIDE

> This document provides the complete, end-to-end technical deployment manual for the Nuqtah digital ecosystem (`nuqtah.com`, `shop.nuqtah.com`, `screen.nuqtah.com`, `institute.nuqtah.com`, and `admin.nuqtah.com`).

---

## TABLE OF CONTENTS
1. [Architectural Overview & Concept Clarity](#1-architectural-overview--concept-clarity)
2. [Phase 1: Initial Deployment (Vercel Frontend + Supabase Backend)](#2-phase-1-initial-deployment)
   - [Step 1: Supabase Project Creation](#step-1-supabase-project-creation)
   - [Step 2: Database Migration Execution](#step-2-database-migration-execution)
   - [Step 3: Initial Seed Data Execution](#step-3-initial-seed-data-execution)
   - [Step 4: Storage Bucket Configuration](#step-4-storage-bucket-configuration)
   - [Step 5: Authentication & Admin Account Setup](#step-5-authentication--admin-account-setup)
   - [Step 6: Environment Variables Setup](#step-6-environment-variables-setup)
   - [Step 7: Vercel Frontend Deployment](#step-7-vercel-frontend-deployment)
   - [Step 8: Live Health & Functional Verification](#step-8-live-health--functional-verification)
3. [Phase 2: Connecting Future Paid Custom Domain & Multi-Subdomains](#3-phase-2-future-paid-custom-domain--multi-subdomains)
   - [Connecting All 4 Brand Subdomains](#connecting-all-4-brand-subdomains)
   - [DNS Records Configuration Table](#dns-records-configuration-table)
   - [SSL / HTTPS Provisioning](#ssl--https-provisioning)
   - [Custom Domain Supabase Auth Configuration](#custom-domain-supabase-auth-configuration)
4. [Critical Hosting Advisory: Modern Architecture vs. Traditional Shared cPanel Hosting](#4-critical-hosting-advisory)
5. [Maintenance & Routine Operational Runbook](#5-maintenance--routine-operational-runbook)

---

## 1. Architectural Overview & Concept Clarity

To successfully deploy and operate Nuqtah, it is essential to understand the exact role of each architectural component:

```
                               ┌────────────────────────────────────────┐
                               │       Domain Registrar / DNS Provider  │
                               │   (e.g., Namecheap, Cloudflare, GoDaddy)│
                               └──────────────────┬─────────────────────┘
                                                  │
                ┌─────────────────────────────────┴─────────────────────────────────┐
                │                                                                   │
                ▼ (DNS routing)                                                     ▼ (Database & API calls)
┌──────────────────────────────────────────────┐              ┌─────────────────────────────────────────────┐
│          Frontend Edge Hosting               │              │          Backend Cloud Infrastructure       │
│                 (Vercel)                     │              │                   (Supabase)                │
│                                              │              │                                             │
│  • nuqtah.com        (Gateway)               │◄────────────►│  • PostgreSQL Database (22 Tables, RLS)    │
│  • shop.nuqtah.com   (Boutique Commerce)     │  API HTTPS   │  • Supabase Storage (Product / Media Assets)│
│  • screen.nuqtah.com (Media & Podcasts)      │              │  • Supabase Auth (Admin Session Security)   │
│  • institute.nuqtah.com (Knowledge & Ayat)   │              │  • Stored Procedures (Atomic Stock Safety)  │
│  • admin.nuqtah.com  (Management Console)    │              └─────────────────────────────────────────────┘
└──────────────────────────────────────────────┘
```

### Core Concepts Defined
* **Domain Name** (e.g., `nuqtah.com`): The human-readable web address purchased from a registrar (Namecheap, GoDaddy, Cloudflare Registrar).
* **DNS (Domain Name System)**: The phonebook of the internet. It maps your domain and subdomains (`shop.nuqtah.com`, etc.) to IP addresses or server hostnames (Vercel CNAME).
* **Frontend Hosting** (Vercel Edge Network): Where your React, TypeScript, HTML, CSS, and compiled Vite assets live. It executes fast global CDN delivery and handles client-side routing.
* **Supabase Database**: A dedicated cloud PostgreSQL database instance housing your dynamic products, variant stock, orders, videos, podcasts, quotes, ayat, articles, and settings.
* **Supabase Storage**: S3-compatible cloud bucket storing high-resolution product imagery, catalog banners, and downloadable Institute PDFs.
* **Supabase Authentication**: Secure token-based session management, password encryption (bcrypt/argon2), and role validation for administrators.

---

## 2. Phase 1: Initial Deployment

### Step 1: Supabase Project Creation
1. Go to [https://supabase.com](https://supabase.com) and create an account or sign in.
2. Click **New Project**.
3. Select your organization and enter:
   - **Name**: `Nuqtah Production`
   - **Database Password**: Choose a strong, 20+ character password and record it in your password vault.
   - **Region**: Select a region close to your primary audience (e.g., `ap-southeast-1` Singapore for Bangladesh/South Asia).
   - **Pricing Plan**: Free or Pro tier.
4. Click **Create new project** and wait ~2 minutes for PostgreSQL provisioning to complete.

---

### Step 2: Database Migration Execution
1. In the Supabase Dashboard, click the **SQL Editor** icon in the left navigation bar.
2. Click **New query**.
3. Open the file `supabase/migrations/20260911000000_nuqtah_schema.sql` from your local project repository.
4. Copy the entire contents and paste into the Supabase SQL editor.
5. Click **Run** (or `Ctrl + Enter`).
6. Verify in the output window: `Success. No rows returned`.
7. Navigate to **Table Editor** to confirm that all 22 tables have been created:
   - `departments`, `categories`, `subcategories`, `collections`, `products`, `product_variants`, `offers`, `coupons`, `orders`, `order_items`
   - `screen_categories`, `screen_speakers`, `screen_series`, `screen_videos`, `screen_podcasts`, `screen_quotes`
   - `institute_topics`, `institute_ayat`, `institute_articles`, `institute_resources`, `courses`, `course_modules`, `course_lessons`
   - `admin_users`, `global_settings`

---

### Step 3: Initial Seed Data Execution
1. In the Supabase **SQL Editor**, open another **New query**.
2. Open the file `supabase/seed/seed.sql` from your repository.
3. Copy the full contents and paste into the editor.
4. Click **Run**.
5. This initializes:
   - 5 departments: Men, Women Luxury, Kids Little Noor, Attar, Organic Food.
   - Categories including Women Luxury edits (`Noor`, `Haya`, `Zahra Edit`, `Signature Modesty`) and Kids edits (`Little Noor`, `Mini Heritage`).
   - Sample products with real multi-variant inventory numbers and prices.
   - Video discourses, series, waveform podcasts, quotes, Quranic verses with Arabic typography, and articles.

---

### Step 4: Storage Bucket Configuration
1. In the Supabase Dashboard, click **Storage**.
2. Click **Create a new bucket**:
   - **Bucket name**: `nuqtah-media`
   - **Public bucket**: Toggle **ON** (Public).
   - **File size limit**: `10MB`
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`, `audio/mpeg`, `application/pdf`
3. Click **Save bucket**.
4. In **Storage Policies**, ensure public read access is enabled (`SELECT` policy for `anon`).

---

### Step 5: Authentication & Admin Account Setup
1. In the Supabase Dashboard, click **Authentication > Users**.
2. Click **Add User > Create User**:
   - **Email**: `admin@nuqtah.com`
   - **Password**: Enter your master secure password (e.g. `nuqtah2026` or stronger).
   - **Auto Confirm User**: Check **YES**.
3. Under **Authentication > URL Configuration**, verify:
   - **Site URL**: `https://nuqtah.com` (or your temporary Vercel URL `https://your-project.vercel.app`).

---

### Step 6: Environment Variables Setup
Obtain your Supabase API keys from **Project Settings > API**:
- **Project URL**: `https://<your-project-ref>.supabase.co`
- **Project API Keys**: `anon` (public key)

Prepare your production `.env` variables:
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_WHATSAPP_NUMBER=01997049300
VITE_STORE_CURRENCY=৳
VITE_LOW_STOCK_THRESHOLD=3
```

---

### Step 7: Vercel Frontend Deployment

#### Method A: Deploy via GitHub (Recommended)
1. Push your Nuqtah project repository to GitHub (or GitLab).
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **Add New... > Project**.
4. Select your GitHub repository (`nuqtah-ecosystem`).
5. Configure the Build & Development Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Expand **Environment Variables** and add:
   - `VITE_SUPABASE_URL` -> `https://<your-project-ref>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` -> `<your-anon-key>`
   - `VITE_WHATSAPP_NUMBER` -> `01997049300`
   - `VITE_STORE_CURRENCY` -> `৳`
   - `VITE_LOW_STOCK_THRESHOLD` -> `3`
7. Click **Deploy**. Vercel will build the project in ~45 seconds and provide a production URL (e.g. `https://nuqtah-ecosystem.vercel.app`).

#### Method B: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```

---

### Step 8: Live Health & Functional Verification
Verify the following checklist on your live Vercel URL:
1. **Home Gateway**: Navigate to `/` -> Verify hero, 3 destination portals, ecosystem editorial, and shop location section.
2. **Shop Boutique**: Navigate to `/shop` -> Verify products render from Supabase.
3. **Women Luxury Experience**: Navigate to `/shop/women` -> Verify `nuqtah pink.png` logo appears and theme switches to soft blush / dusty rose.
4. **Kids Luxury Experience**: Navigate to `/shop/kids` -> Verify warm cream theme and age filters.
5. **Product Detail Page**: Click on any product -> Test variant selection and verify stock indicator updates dynamically.
6. **WhatsApp Ordering**: Click "Order on WhatsApp" -> Confirm it opens `https://wa.me/8801997049300` with pre-filled item parameters.
7. **Screen Media**: Navigate to `/screen` -> Test YouTube video modal and podcast waveform player. Verify official channel CTA (`https://www.youtube.com/@nuqtahsscreen9992`).
8. **Institute**: Navigate to `/institute` -> Verify Amiri Quranic Arabic typography rendering.
9. **Admin Panel**: Navigate to `/admin` -> Confirm unauthenticated access is blocked. Log in with `admin` and `nuqtah2026`. Test updating stock counts or adding a category.
10. **Legal Pages**: Test `/privacy-policy` and `/terms-and-conditions`.

---

## 3. Phase 2: Future Paid Custom Domain & Multi-Subdomains

When you purchase your paid domain (`nuqtah.com`), follow this exact DNS routing configuration to connect all subdomains to Vercel and Supabase.

### Domain Hierarchy Mapping
| Domain / Subdomain | Target Section | Vercel Routing / Path |
| :--- | :--- | :--- |
| `nuqtah.com` | Flagship Gateway | Root Gateway (`/`) |
| `www.nuqtah.com` | Canonical Redirect | Redirects to `nuqtah.com` |
| `shop.nuqtah.com` | Boutique Commerce | Nuqtah Shop (`/shop`) |
| `screen.nuqtah.com` | Media & Discourses | Nuqtah Screen (`/screen`) |
| `institute.nuqtah.com` | Knowledge & Ayat | Nuqtah Institute (`/institute`) |
| `admin.nuqtah.com` | Management Console | Admin App (`/admin`) |

---

### DNS Records Configuration Table
Log in to your Domain Registrar (Namecheap, GoDaddy, Cloudflare, or Google Domains) and navigate to **DNS Management / Advanced DNS**. Add the following DNS records:

| Type | Host / Name | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Automatic / 300 | Points apex domain `nuqtah.com` to Vercel Edge Server |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 300 | Directs `www.nuqtah.com` |
| **CNAME** | `shop` | `cname.vercel-dns.com.` | Automatic / 300 | Directs `shop.nuqtah.com` |
| **CNAME** | `screen` | `cname.vercel-dns.com.` | Automatic / 300 | Directs `screen.nuqtah.com` |
| **CNAME** | `institute` | `cname.vercel-dns.com.` | Automatic / 300 | Directs `institute.nuqtah.com` |
| **CNAME** | `admin` | `cname.vercel-dns.com.` | Automatic / 300 | Directs `admin.nuqtah.com` |

---

### Adding Domains in Vercel Dashboard
1. Open your project in the **Vercel Dashboard**.
2. Go to **Settings > Domains**.
3. Add the following domains one by one:
   - `nuqtah.com`
   - `www.nuqtah.com`
   - `shop.nuqtah.com`
   - `screen.nuqtah.com`
   - `institute.nuqtah.com`
   - `admin.nuqtah.com`
4. Vercel will automatically verify the DNS records and issue **free wildcard SSL certificates (Let's Encrypt)** with automatic renewal.

---

### Custom Domain Supabase Auth Configuration
Once your custom domain is active, update Supabase so authentication and redirects work flawlessly:
1. In Supabase Dashboard, navigate to **Authentication > URL Configuration**.
2. Set **Site URL** to: `https://nuqtah.com`
3. In **Redirect URLs**, add:
   - `https://nuqtah.com/**`
   - `https://shop.nuqtah.com/**`
   - `https://screen.nuqtah.com/**`
   - `https://institute.nuqtah.com/**`
   - `https://admin.nuqtah.com/**`
4. Click **Save**.

---

## 4. Critical Hosting Advisory

### Why Traditional cPanel / Shared PHP Hosting is NOT Suitable
Traditional shared hosting packages (cPanel, Apache/PHP, MySQL shared hosting) are designed for legacy server-side PHP scripts (WordPress, Joomla).

**Nuqtah is architected as a high-performance modern Jamstack application**:
* **Frontend**: Compiled static Single Page Application (React + Vite + TypeScript) distributed across Vercel’s global Edge CDN.
* **Backend Database**: Cloud PostgreSQL with Row Level Security, WebSockets, and real-time triggers (Supabase).

**If you purchase a hosting package from a local provider**:
* Use the provider **ONLY as your Domain Registrar** (to buy `nuqtah.com`).
* Point the DNS records (A & CNAME records) to **Vercel** for frontend hosting.
* Keep **Supabase** as the PostgreSQL cloud database and storage engine.
* Do not upload this code to cPanel File Manager (`public_html`) using standard Apache settings without a Node.js/SPA reverse-proxy configuration.

---

## 5. Maintenance & Routine Operational Runbook

### Changing the WhatsApp Concierge Number
To change the WhatsApp number everywhere across all 4 sites:
1. Log in to the Admin Panel (`https://admin.nuqtah.com` or `/admin`).
2. Go to **Global Settings**.
3. Update **WhatsApp Local** (e.g. `01997049300`) and **WhatsApp International** (e.g. `8801997049300`).
4. Click **Save Global Settings**. The new number immediately takes effect for all product ordering buttons and cart inquiries.

### Adding New Products & Managing Stock
1. In the Admin Panel, go to **Products**.
2. Click **Add New Product**.
3. Specify name, price, department (Men, Women, Kids, Attar, Organic Food), image URL, and stock.
4. When stock reaches `0`, the product automatically transitions to `Out of Stock` on customer storefronts.
5. To restock, navigate to **Inventory Stock** and use the quick `+1` / `+5` adjustment buttons.
