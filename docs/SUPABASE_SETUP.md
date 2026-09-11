# SUPABASE SETUP & CONFIGURATION

> Step-by-step guide for deploying the Nuqtah database schema, Row Level Security (RLS) policies, storage buckets, and seed data on Supabase.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Name your project: `Nuqtah Ecosystem`.
4. Set a strong database password and select your preferred region (e.g., `ap-southeast-1` Singapore or nearest).

---

## 2. Execute SQL Migrations

1. Open your Supabase Dashboard and navigate to **SQL Editor**.
2. Click **New Query**.
3. Copy the full contents of `supabase/migrations/20260911000000_nuqtah_schema.sql` and paste them into the SQL editor.
4. Click **Run** to execute the migration.
5. This creates all 22 database tables, indexes, constraints, audit columns, RLS policies, and safe atomic stock functions (`decrement_product_variant_stock`).

---

## 3. Seed Initial Production Data

1. In the Supabase **SQL Editor**, open another **New Query**.
2. Copy the full contents of `supabase/seed/seed.sql` and paste them into the editor.
3. Click **Run**.
4. This seeds all 5 departments, categories (including Women luxury and Kids edits), products with variants and stock numbers, Screen media entries, Podcasts, Quotes, Institute Ayat, and Articles.

---

## 4. Setup Supabase Storage Buckets

Navigate to **Storage** in your Supabase dashboard:
1. Create a public bucket named `nuqtah-media`.
2. Set public access permissions for read operations.
3. Set upload policies restricted to authenticated admin users.

---

## 5. Configure Environment Variables

In your project root, create or update `.env` (or set environment variables in your hosting provider):

```env
VITE_SUPABASE_URL=https://your-supabase-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_WHATSAPP_NUMBER=01997049300
VITE_STORE_CURRENCY=৳
VITE_LOW_STOCK_THRESHOLD=3
```
