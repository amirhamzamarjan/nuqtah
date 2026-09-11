import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { store } from '../../lib/store';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product, Department, Collection, Offer } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const ShopHomePage: React.FC = () => {
  const { setTheme } = useTheme();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [activeOffers, setActiveOffers] = useState<Offer[]>([]);

  useEffect(() => {
    setTheme('default');
    const update = () => {
      setDepartments(store.getDepartments());
      setCollections(store.getCollections());
      setFeaturedProducts(store.getProducts({ featured: true }));
      setActiveOffers(store.getActiveOffers());
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  const menProducts = store.getProducts({ departmentId: 'men' }).slice(0, 4);
  const womenProducts = store.getProducts({ departmentId: 'women' }).slice(0, 4);
  const kidsProducts = store.getProducts({ departmentId: 'kids' }).slice(0, 4);
  const attarProducts = store.getProducts({ departmentId: 'attar' }).slice(0, 4);
  const foodProducts = store.getProducts({ departmentId: 'organic-food' }).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] transition-colors duration-300">
      {/* 1. Shop Mid-Tone Luxury Hero */}
      <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden border-b border-[#322C26]/10 bg-gradient-to-b from-[#FAF6F0] via-[#F2ECE4] to-[#E6DDD2]">
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#241F1B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#A6854F]/40 text-xs font-mono text-[#A6854F] uppercase tracking-widest font-semibold shadow-sm">
            Nuqtah Luxury Boutique
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#241F1B] font-normal tracking-tight leading-tight">
            Curated attires, sacred scents & pure sustenance.
          </h1>
          <p className="text-sm sm:text-base text-[#5C5247] font-light max-w-xl mx-auto leading-relaxed">
            Every thread woven with discipline. Every distillation aged with patience. Discover our dedicated edits for men, women, and children.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/shop/men"
              className="px-6 py-3 bg-[#241F1B] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#352E28] transition-all shadow-md"
            >
              Men's Edit
            </Link>
            <Link
              to="/shop/women"
              className="px-6 py-3 bg-[#9E6B60] text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#B57F74] transition-all shadow-md"
            >
              Women's Sanctuary
            </Link>
            <Link
              to="/shop/kids"
              className="px-6 py-3 bg-[#99784D] text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#AF8E60] transition-all shadow-md"
            >
              Kids' Little Noor
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Department Discovery Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Departments
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#241F1B]">
            Curated Lifestyle Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              to={`/shop/${dept.slug}`}
              className="group relative surface-card rounded-sm overflow-hidden flex flex-col justify-end aspect-[3/4] bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm hover:border-[#A6854F]/50 hover:shadow-md transition-all duration-300"
            >
              <img
                src={dept.image}
                alt={dept.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/30 to-transparent" />

              <div className="relative p-5 space-y-1 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent">
                <span className="text-[10px] uppercase tracking-widest text-[#A6854F] font-mono block font-semibold">
                  Department
                </span>
                <h3 className="text-xl font-serif text-[#241F1B] group-hover:text-[#A6854F] transition-colors font-semibold">
                  {dept.name}
                </h3>
                <p className="text-[11px] text-[#5C5247] line-clamp-2 font-light">
                  {dept.tagline}
                </p>
                <div className="pt-2 text-[10px] uppercase tracking-widest text-[#241F1B] font-semibold flex items-center space-x-1 group-hover:text-[#A6854F]">
                  <span>Enter</span>
                  <ArrowRight className="w-3 h-3 text-[#A6854F] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Active Offers (Warm Muted Beige Ground) */}
      {activeOffers.length > 0 && (
        <section className="py-12 bg-[#E6DDD2] border-y border-[#322C26]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="surface-card bg-[#FDFBF7] rounded-sm p-8 sm:p-10 border border-[#A6854F]/30 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#A6854F] font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>Limited Time Active Offer</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#241F1B]">
                  {activeOffers[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5247] font-light leading-relaxed">
                  {activeOffers[0].description}
                </p>
              </div>

              <Link
                to="/shop/offers"
                className="px-8 py-3.5 bg-[#241F1B] hover:bg-[#352E28] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded-sm transition-all shadow-md whitespace-nowrap"
              >
                View Offer Pieces
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Women's Luxury Experience Preview Banner (Dusty Rose Tone) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="surface-card rounded-sm p-8 sm:p-14 border border-[#9E6B60]/30 bg-gradient-to-r from-[#F0E6E2] to-[#E4D5D0] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo/nuqtah pink.png"
                  alt="Nuqtah Women"
                  className="h-10 w-auto object-contain filter drop-shadow-sm"
                />
                <span className="text-xs uppercase tracking-widest text-[#9E6B60] font-mono border-l border-[#9E6B60]/30 pl-3 font-semibold">
                  Dedicated Sanctuary
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#281E1C] font-normal leading-tight">
                Modest Grandeur in Pure Silk, Raw Linen & Soft Rosewood.
              </h2>

              <p className="text-sm text-[#6B5550] font-light leading-relaxed">
                Step into an exclusive sanctuary designed with muted blush palettes, champagne metallic accents, and flowing abayas tailored for discerning women.
              </p>

              <div className="pt-2">
                <Link
                  to="/shop/women"
                  className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#9E6B60] text-white font-semibold text-xs tracking-widest uppercase rounded-sm hover:bg-[#B57F74] transition-all shadow-md"
                >
                  <span>Experience Nuqtah Women</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {womenProducts.slice(0, 2).map((prod) => (
                <ProductCard key={prod.id} product={prod} departmentTheme="women" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Men's Signature Edit */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#322C26]/10 pb-4 gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
              Men's Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#241F1B] mt-1">
              Hand-tailored Panjabis & Kablis
            </h2>
          </div>
          <Link
            to="/shop/men"
            className="text-xs uppercase tracking-widest text-[#241F1B] font-bold hover:text-[#A6854F] flex items-center space-x-1"
          >
            <span>View All Men</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A6854F]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. Attar & Organic Food Dimensional Contrast Section (Deep Charcoal) */}
      <section className="py-16 bg-[#241F1B] text-[#F7F2EC] border-t border-[#322C26]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Attar */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B89A64] font-mono font-semibold">
                  Artisanal Distillations
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F7F2EC] mt-1">
                  Signature Attar Extractions
                </h2>
              </div>
              <Link
                to="/shop/attar"
                className="text-xs uppercase tracking-widest text-[#F7F2EC] font-bold hover:text-[#B89A64] flex items-center space-x-1"
              >
                <span>Explore Scent Archive</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B89A64]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {attarProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* Organic Food */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B89A64] font-mono font-semibold">
                  Pure Sustenance
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F7F2EC] mt-1">
                  Wild Honey & Wholesome Essentials
                </h2>
              </div>
              <Link
                to="/shop/organic-food"
                className="text-xs uppercase tracking-widest text-[#F7F2EC] font-bold hover:text-[#B89A64] flex items-center space-x-1"
              >
                <span>Explore Organic Food</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B89A64]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {foodProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Boutique Trust Banner (Warm Muted Beige Ground) */}
      <section className="py-16 border-t border-[#322C26]/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-6 bg-[#FDFBF7] surface-card rounded-sm border border-[#322C26]/10 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#A6854F] mx-auto sm:mx-0" />
            <h4 className="text-base font-serif font-semibold text-[#241F1B]">Genuine Materials</h4>
            <p className="text-xs text-[#5C5247] leading-relaxed font-light">
              100% natural Egyptian cottons, raw silks, authentic Taif rose distillations, and unfiltered wild honeys.
            </p>
          </div>

          <div className="p-6 bg-[#FDFBF7] surface-card rounded-sm border border-[#322C26]/10 shadow-sm space-y-2">
            <RefreshCw className="w-6 h-6 text-[#A6854F] mx-auto sm:mx-0" />
            <h4 className="text-base font-serif font-semibold text-[#241F1B]">WhatsApp Order Guidance</h4>
            <p className="text-xs text-[#5C5247] leading-relaxed font-light">
              Personalized size verification, real-time stock confirmation, and seamless direct dispatch.
            </p>
          </div>

          <div className="p-6 bg-[#FDFBF7] surface-card rounded-sm border border-[#322C26]/10 shadow-sm space-y-2">
            <Truck className="w-6 h-6 text-[#A6854F] mx-auto sm:mx-0" />
            <h4 className="text-base font-serif font-semibold text-[#241F1B]">Careful Nationwide Delivery</h4>
            <p className="text-xs text-[#5C5247] leading-relaxed font-light">
              Securely packaged in protective eco-luxury boxes to preserve pristine fabric structure and flacons.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
