import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Tv, BookOpen, Compass, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { store } from '../../lib/store';
import { ProductCard } from '../../components/ui/ProductCard';
import { MediaCard } from '../../components/ui/MediaCard';
import { AyahViewer } from '../../components/arabic/AyahViewer';
import { VideoModal } from '../../components/video/VideoModal';
import { Product, ScreenVideo, InstituteAyah, InstituteArticle } from '../../types';
import { APP_CONFIG, ECOSYSTEM_SITES } from '../../lib/config';
import { useTheme } from '../../context/ThemeContext';

export const HomePage: React.FC = () => {
  const { setTheme } = useTheme();
  const [featuredProduct, setFeaturedProduct] = useState<Product | undefined>();
  const [featuredVideo, setFeaturedVideo] = useState<ScreenVideo | undefined>();
  const [featuredAyah, setFeaturedAyah] = useState<InstituteAyah | undefined>();
  const [latestArticle, setLatestArticle] = useState<InstituteArticle | undefined>();
  const [activeVideoModal, setActiveVideoModal] = useState<ScreenVideo | null>(null);

  useEffect(() => {
    setTheme('default');
    const updateData = () => {
      const prods = store.getProducts({ featured: true });
      setFeaturedProduct(prods[0] || store.getProducts()[0]);

      const vids = store.getScreenVideos();
      setFeaturedVideo(vids.find((v) => v.featured) || vids[0]);

      const ayat = store.getInstituteAyat();
      setFeaturedAyah(ayat.find((a) => a.featured) || ayat[0]);

      const arts = store.getInstituteArticles();
      setLatestArticle(arts[0]);
    };

    updateData();
    return store.subscribe(updateData);
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] transition-colors duration-300">
      {/* 1. Mid-Tone Luxury Flagship Hero Section */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-[#322C26]/10 bg-gradient-to-b from-[#FAF6F0] via-[#F2ECE4] to-[#E6DDD2]">
        {/* Subtle Warm Luxury Texture */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#241F1B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#A6854F]/40 text-xs font-mono text-[#A6854F] tracking-widest uppercase shadow-sm animate-fade-in font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6854F] animate-pulse" />
            <span>A Unified Digital Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-[#241F1B] leading-[1.1] max-w-4xl mx-auto">
            Where sacred heritage meets modern discernment.
          </h1>

          <p className="text-base sm:text-xl text-[#5C5247] font-light max-w-2xl mx-auto leading-relaxed">
            Nuqtah brings together refined lifestyle commerce, cinematic media discourses, and authentic Islamic knowledge under one cohesive, dignified sanctuary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-[#241F1B] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded-sm hover:bg-[#352E28] transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
            >
              <span>Explore The Shop</span>
              <ArrowRight className="w-4 h-4 text-[#A6854F]" />
            </Link>

            <Link
              to="/screen"
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF6F0] text-[#241F1B] hover:bg-white border border-[#A6854F]/40 text-xs tracking-widest uppercase rounded-sm transition-all duration-200 font-semibold shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Watch Discourses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Three Primary Destination Portals (Warm Limestone & Taupe Background) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Three Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#241F1B]">
            The Portals of Nuqtah
          </h2>
          <p className="text-sm text-[#5C5247] max-w-lg mx-auto font-light">
            Distinct disciplines shaped by a single commitment to beauty, modesty, and truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Portal */}
          <div className="group relative surface-card rounded-sm overflow-hidden flex flex-col justify-between bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm hover:border-[#A6854F]/50 hover:shadow-md transition-all duration-500">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#E6DDD2]">
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80"
                alt="Nuqtah Shop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/90 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded-sm bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border border-[#322C26]/10">
                <ShoppingBag className="w-5 h-5 text-[#A6854F]" />
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-[#FDFBF7]">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#A6854F] uppercase block font-semibold">
                  Commerce Portal
                </span>
                <h3 className="text-2xl font-serif text-[#241F1B] group-hover:text-[#A6854F] transition-colors mt-1 font-semibold">
                  Nuqtah Shop
                </h3>
                <p className="text-xs text-[#5C5247] font-light leading-relaxed mt-2">
                  Curated heritage Panjabis, an exclusive women's luxury sanctuary, warm kids' edits, aged artisanal attars, and organic natural sustenance.
                </p>
              </div>

              <Link
                to="/shop"
                className="pt-4 border-t border-[#322C26]/10 text-xs uppercase tracking-widest text-[#241F1B] font-bold flex items-center justify-between group-hover:text-[#A6854F]"
              >
                <span>Enter Boutique</span>
                <ArrowRight className="w-4 h-4 text-[#A6854F] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Screen Portal */}
          <div className="group relative surface-card rounded-sm overflow-hidden flex flex-col justify-between bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm hover:border-[#A6854F]/50 hover:shadow-md transition-all duration-500">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#E6DDD2]">
              <img
                src="https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=800&q=80"
                alt="Nuqtah Screen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/90 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded-sm bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border border-[#322C26]/10">
                <Tv className="w-5 h-5 text-[#A6854F]" />
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-[#FDFBF7]">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#A6854F] uppercase block font-semibold">
                  Media Portal
                </span>
                <h3 className="text-2xl font-serif text-[#241F1B] group-hover:text-[#A6854F] transition-colors mt-1 font-semibold">
                  Nuqtah Screen
                </h3>
                <p className="text-xs text-[#5C5247] font-light leading-relaxed mt-2">
                  Cinematic discourses, philosophical lecture series, custom waveform podcasts, and timeless contemplative quotes from esteemed scholars.
                </p>
              </div>

              <Link
                to="/screen"
                className="pt-4 border-t border-[#322C26]/10 text-xs uppercase tracking-widest text-[#241F1B] font-bold flex items-center justify-between group-hover:text-[#A6854F]"
              >
                <span>Watch & Listen</span>
                <ArrowRight className="w-4 h-4 text-[#A6854F] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Institute Portal */}
          <div className="group relative surface-card rounded-sm overflow-hidden flex flex-col justify-between bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm hover:border-[#A6854F]/50 hover:shadow-md transition-all duration-500">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#E6DDD2]">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
                alt="Nuqtah Institute"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/90 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded-sm bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border border-[#322C26]/10">
                <BookOpen className="w-5 h-5 text-[#A6854F]" />
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-[#FDFBF7]">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#A6854F] uppercase block font-semibold">
                  Knowledge Portal
                </span>
                <h3 className="text-2xl font-serif text-[#24201C] group-hover:text-[#A6854F] transition-colors mt-1 font-semibold">
                  Nuqtah Institute
                </h3>
                <p className="text-xs text-[#5C5247] font-light leading-relaxed mt-2">
                  Pristine Arabic typography of Quranic verses, scholarly reflections, research essays, downloadable resources, and future structured learning.
                </p>
              </div>

              <Link
                to="/institute"
                className="pt-4 border-t border-[#322C26]/10 text-xs uppercase tracking-widest text-[#241F1B] font-bold flex items-center justify-between group-hover:text-[#A6854F]"
              >
                <span>Read & Learn</span>
                <ArrowRight className="w-4 h-4 text-[#A6854F] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dimensional Editorial Section (Warm Charcoal & Espresso Contrast) */}
      <section className="py-20 border-y border-[#322C26]/20 bg-[#241F1B] text-[#F7F2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#B89A64] tracking-widest uppercase font-semibold">
                <Compass className="w-4 h-4" />
                <span>Ecosystem Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#F7F2EC] leading-tight">
                An interconnected journey of material dignity and intellectual depth.
              </h2>

              <p className="text-sm text-[#C7BCB0] font-light leading-relaxed">
                In classical civilization, commerce was never separated from ethics, and contemplation was woven into daily attire and fragrance. Nuqtah honors this integration: what you wear, what you consume, what you watch, and what you study inform one another.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-[#2E2823] border border-white/10 rounded-sm space-y-1 shadow-sm">
                  <span className="text-xs font-serif font-semibold text-[#F7F2EC] block">Pure Materials</span>
                  <p className="text-[11px] text-[#C7BCB0]">Egyptian cotton, French linen, pure oud distillations.</p>
                </div>
                <div className="p-4 bg-[#2E2823] border border-white/10 rounded-sm space-y-1 shadow-sm">
                  <span className="text-xs font-serif font-semibold text-[#F7F2EC] block">Uncompromising Depth</span>
                  <p className="text-[11px] text-[#C7BCB0]">Scholarly discourses devoid of clickbait or sensationalism.</p>
                </div>
                <div className="p-4 bg-[#2E2823] border border-white/10 rounded-sm space-y-1 shadow-sm">
                  <span className="text-xs font-serif font-semibold text-[#F7F2EC] block">Authentic Roots</span>
                  <p className="text-[11px] text-[#C7BCB0]">Quranic reflection rooted in classical commentary.</p>
                </div>
              </div>
            </div>

            {/* Visual Balance Column */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-sm overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
                alt="Nuqtah Editorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241F1B]/95 via-[#241F1B]/40 to-transparent p-8 flex flex-col justify-end">
                <span className="text-xs uppercase tracking-widest text-[#B89A64] font-mono font-semibold">The Nuqtah Standard</span>
                <p className="text-lg font-serif text-[#F7F2EC] mt-1 italic font-medium">
                  "Simplicity is the final achievement of profound depth."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Backend Featured Content Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#322C26]/10 pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
              Live from the Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#241F1B] mt-1">
              Curated Highlights
            </h2>
          </div>
          <p className="text-xs text-[#5C5247] max-w-md font-light">
            Real dynamic entries synchronized across our boutique inventory, media archive, and scholarly publications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shop Highlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C5247]">
              <span className="font-semibold">Featured In Shop</span>
              <Link to="/shop" className="text-[#A6854F] hover:underline font-bold">All Products →</Link>
            </div>
            {featuredProduct ? (
              <ProductCard product={featuredProduct} />
            ) : (
              <div className="p-8 surface-card bg-[#FDFBF7] rounded text-center text-xs text-[#5C5247]">
                No featured product currently highlighted.
              </div>
            )}
          </div>

          {/* Screen Highlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C5247]">
              <span className="font-semibold">Featured On Screen</span>
              <Link to="/screen" className="text-[#A6854F] hover:underline font-bold">All Videos →</Link>
            </div>
            {featuredVideo ? (
              <MediaCard
                type="video"
                item={featuredVideo}
                onPlay={() => setActiveVideoModal(featuredVideo)}
                speakerName="Shaykh Abdal Hakim Murad"
                categoryName="Nasihah"
              />
            ) : (
              <div className="p-8 surface-card bg-[#FDFBF7] rounded text-center text-xs text-[#5C5247]">
                No featured video currently configured.
              </div>
            )}
          </div>

          {/* Institute Highlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#5C5247]">
              <span className="font-semibold">Institute Reflection</span>
              <Link to="/institute" className="text-[#A6854F] hover:underline font-bold">All Ayat →</Link>
            </div>
            {featuredAyah ? (
              <AyahViewer ayah={featuredAyah} showReflection={true} />
            ) : (
              <div className="p-8 surface-card bg-[#FDFBF7] rounded text-center text-xs text-[#5C5247]">
                No featured Ayah published.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Concise Authentic About Section (Warm Muted Beige Ground) */}
      <section id="about" className="py-20 border-t border-[#322C26]/10 bg-[#E6DDD2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            About Nuqtah
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#241F1B]">
            The Point of Origin
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#5C5247] font-light leading-relaxed text-left sm:text-center">
            <p>
              In Arabic calligraphy, the <em className="text-[#A6854F] font-serif font-semibold">Nuqtah</em> (the dot) is the fundamental unit of measure. Every letter, every curve, and every proportion is derived from the single placement of the reed pen.
            </p>
            <p>
              Nuqtah was conceived as a digital embodiment of this principle: an ecosystem where commerce, media, and knowledge spring from a common foundation of purpose, proportionality, and ethical beauty.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Shop Contact & Location Section */}
      <section id="contact" className="py-20 border-t border-[#322C26]/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Sanctuary & Boutique
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#241F1B]">
            Contact & Shop Location
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5247] max-w-lg mx-auto font-light">
            Visit our physical boutique in Dhaka or consult our concierge via WhatsApp and direct email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Location */}
          <div className="p-6 bg-[#FDFBF7] rounded-sm border border-[#322C26]/10 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-[#EFE8DE] flex items-center justify-center text-[#A6854F]">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#241F1B]">NUQTAH SHOP</h4>
              <p className="text-xs text-[#5C5247] leading-relaxed font-light">
                {APP_CONFIG.address.shopNo}, {APP_CONFIG.address.market}<br />
                {APP_CONFIG.address.area}<br />
                {APP_CONFIG.address.postalCode}, {APP_CONFIG.address.country}
              </p>
            </div>
            <a
              href={APP_CONFIG.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#A6854F] hover:underline font-semibold pt-2"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Concierge */}
          <div className="p-6 bg-[#FDFBF7] rounded-sm border border-[#322C26]/10 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-emerald-50 flex items-center justify-center text-emerald-800">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#241F1B]">WhatsApp Concierge</h4>
              <p className="text-xs text-[#5C5247] leading-relaxed font-light">
                Direct order consultation, sizing verification, and live stock confirmations.
              </p>
              <div className="text-sm font-mono font-bold text-emerald-900 pt-1">
                {APP_CONFIG.whatsAppNumber}
              </div>
            </div>
            <a
              href={`https://wa.me/${APP_CONFIG.whatsAppInternational}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-emerald-800 hover:underline font-semibold pt-1"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Email Correspondence */}
          <div className="p-6 bg-[#FDFBF7] rounded-sm border border-[#322C26]/10 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-sm bg-[#EFE8DE] flex items-center justify-center text-[#A6854F]">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-semibold text-[#241F1B]">Direct Correspondence</h4>
              <p className="text-xs text-[#5C5247] leading-relaxed font-light">
                For boutique inquiries, media discussions, and scholarly submissions.
              </p>
              <div className="text-sm font-mono text-[#241F1B] pt-1 font-semibold">
                {APP_CONFIG.supportEmail}
              </div>
            </div>
            <a
              href={`mailto:${APP_CONFIG.supportEmail}`}
              className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#A6854F] hover:underline font-semibold pt-1"
            >
              <span>Send Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideoModal && (
        <VideoModal
          video={activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
          speakerName="Shaykh Abdal Hakim Murad"
        />
      )}
    </div>
  );
};
