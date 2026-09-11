import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { store } from '../../lib/store';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product, Category } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const AttarShopPage: React.FC = () => {
  const { setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setTheme('default');
    const update = () => {
      setProducts(store.getProducts({ departmentId: 'attar' }));
      setCategories(store.getCategories('attar'));
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] transition-colors duration-300">
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-[#322C26]/10 bg-gradient-to-b from-[#FAF6F0] via-[#F2ECE4] to-[#E6DDD2]">
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#A6854F]/30 text-xs font-mono text-[#A6854F] uppercase tracking-widest font-semibold shadow-sm">
            Pure Botanical Distillations
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">
            Aged Hindi Oud & Taif Rose Attars
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5247] font-light max-w-lg mx-auto leading-relaxed">
            100% alcohol-free concentrated perfume oils matured in crystal flacons.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-2 text-xs font-mono text-[#5C5247]">
            <Link to="/shop" className="hover:text-[#241F1B] flex items-center space-x-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Shop Home</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-[#322C26]/10 bg-[#FAF6F0]/90 sticky top-20 z-30 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 overflow-x-auto py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#241F1B] text-[#FAF8F3] font-bold shadow-md'
                : 'bg-[#EFE8DE] text-[#5C5247] hover:text-[#241F1B] border border-[#322C26]/10'
            }`}
          >
            All Distillations ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#241F1B] text-[#FAF8F3] font-bold shadow-md'
                  : 'bg-[#EFE8DE] text-[#5C5247] hover:text-[#241F1B] border border-[#322C26]/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};
