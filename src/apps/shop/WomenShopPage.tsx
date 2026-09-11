import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { store } from '../../lib/store';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product, Category } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const WomenShopPage: React.FC = () => {
  const { setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    setTheme('women');
    const update = () => {
      setProducts(store.getProducts({ departmentId: 'women' }));
      setCategories(store.getCategories('women'));
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  // Filtering
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (selectedSize !== 'all') {
      const hasSize = p.variants?.some((v) => v.attributes.size === selectedSize && v.stock > 0);
      if (!hasSize) return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const availableSizes = Array.from(
    new Set(
      products
        .flatMap((p) => p.variants || [])
        .map((v) => v.attributes.size)
        .filter(Boolean)
    )
  );

  return (
    <div className="min-h-screen bg-[#F0E6E2] text-[#281E1C] transition-colors duration-500">
      {/* 1. Women Sanctuary Mid-Tone Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden border-b border-[#9E6B60]/20 bg-gradient-to-b from-[#F8F2EF] via-[#F0E6E2] to-[#E4D5D0]">
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <div className="flex justify-center">
            <img
              src="/logo/nuqtah pink.png"
              alt="Nuqtah Women"
              className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-sm"
            />
          </div>

          <div className="inline-block px-4 py-1 rounded-full bg-[#FAF5F2] border border-[#9E6B60]/30 text-xs font-mono text-[#9E6B60] uppercase tracking-widest font-semibold shadow-sm">
            The Women's Luxury Sanctuary
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#281E1C] font-normal tracking-tight">
            Grace, Modesty & Timeless Serenity.
          </h1>

          <p className="text-sm sm:text-base text-[#6B5550] font-light max-w-xl mx-auto leading-relaxed">
            Flowing raw silk abayas, handcrafted dusty rose co-ords, and luminous modest silhouettes tailored with delicate champagne accents.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-2 text-xs font-mono text-[#6B5550]">
            <Link to="/shop" className="hover:text-[#281E1C] flex items-center space-x-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Shop Home</span>
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-[#281E1C] font-semibold">
              <span>Nuqtah Gateway</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Women Category Tabs */}
      <section className="py-6 border-b border-[#9E6B60]/15 bg-[#FAF5F2]/90 sticky top-20 z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#9E6B60] text-white font-bold shadow-md'
                  : 'bg-[#EFE3DF] text-[#6B5550] hover:text-[#9E6B60] border border-[#9E6B60]/15'
              }`}
            >
              All Edits ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#9E6B60] text-white font-bold shadow-md'
                    : 'bg-[#EFE3DF] text-[#6B5550] hover:text-[#9E6B60] border border-[#9E6B60]/15'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sizing & Sorting Controls */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-[#FAF5F2] text-[#281E1C] border border-[#9E6B60]/30 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#9E6B60]"
              >
                <option value="all">All Sizes</option>
                {availableSizes.map((s) => (
                  <option key={s} value={s}>
                    Size {s}
                  </option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF5F2] text-[#281E1C] border border-[#9E6B60]/30 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#9E6B60]"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#FAF5F2] surface-card rounded border border-[#9E6B60]/15 p-12 shadow-sm">
            <p className="text-lg font-serif text-[#281E1C]">No silhouettes matching this selection.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('all');
              }}
              className="text-xs uppercase tracking-widest text-[#9E6B60] underline font-mono font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} departmentTheme="women" />
            ))}
          </div>
        )}
      </section>

      {/* 4. Women Sanctuary Editorial Note */}
      <section className="py-16 border-t border-[#9E6B60]/15 bg-[#E4D5D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#9E6B60] font-mono font-semibold">
            Bespoke Fabric Selection
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#281E1C]">
            The Art of Modest Drapery
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5550] font-light leading-relaxed max-w-2xl mx-auto">
            Every Nuqtah Women piece is measured for non-clinging flow, breathability in warm climates, and enduring elegance for festive and daily occasions.
          </p>
        </div>
      </section>
    </div>
  );
};
