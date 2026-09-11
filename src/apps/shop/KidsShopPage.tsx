import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { store } from '../../lib/store';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product, Category } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const KidsShopPage: React.FC = () => {
  const { setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');

  useEffect(() => {
    setTheme('kids');
    const update = () => {
      setProducts(store.getProducts({ departmentId: 'kids' }));
      setCategories(store.getCategories('kids'));
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (selectedAge !== 'all') {
      const hasAge = p.variants?.some((v) => v.attributes.size?.includes(selectedAge) && v.stock > 0);
      if (!hasAge) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#EFE8DD] text-[#262019] transition-colors duration-500">
      {/* 1. Kids Mid-Tone Warm Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-[#99784D]/20 bg-gradient-to-b from-[#F8F3EB] via-[#EFE8DD] to-[#E4DACB]">
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <div className="inline-block px-4 py-1 rounded-full bg-[#FAF5ED] border border-[#99784D]/30 text-xs font-mono text-[#99784D] uppercase tracking-widest font-semibold shadow-sm">
            Little Noor & Mini Heritage
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-[#262019] font-normal tracking-tight">
            Young Elegance & Festive Joy.
          </h1>

          <p className="text-sm sm:text-base text-[#635443] font-light max-w-xl mx-auto leading-relaxed">
            Gentle pre-washed pure cottons, comfortable elasticated waistbands, and understated embroidery tailored for happy, playful days.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-2 text-xs font-mono text-[#635443]">
            <Link to="/shop" className="hover:text-[#262019] flex items-center space-x-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Shop Home</span>
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-[#262019] font-semibold">
              <span>Nuqtah Gateway</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Category & Age Filter Bar */}
      <section className="py-6 border-b border-[#99784D]/15 bg-[#FAF5ED]/90 sticky top-20 z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#99784D] text-white font-bold shadow-md'
                  : 'bg-[#EFE4D6] text-[#635443] hover:text-[#99784D] border border-[#99784D]/15'
              }`}
            >
              All Edits ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#99784D] text-white font-bold shadow-md'
                    : 'bg-[#EFE4D6] text-[#635443] hover:text-[#99784D] border border-[#99784D]/15'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="bg-[#FAF5ED] text-[#262019] border border-[#99784D]/30 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#99784D]"
            >
              <option value="all">All Ages</option>
              <option value="2-3Y">Age 2 to 3 Years</option>
              <option value="4-5Y">Age 4 to 5 Years</option>
              <option value="6-7Y">Age 6 to 7 Years</option>
              <option value="8-12Y">Age 8 to 12 Years</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} departmentTheme="kids" />
          ))}
        </div>
      </section>
    </div>
  );
};
