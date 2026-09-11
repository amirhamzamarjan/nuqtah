import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { store } from '../../lib/store';
import { ProductCard } from '../../components/ui/ProductCard';
import { Product } from '../../types';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const update = () => {
      setProducts(store.getAllProducts());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const filtered = products.filter((p) => {
    if (!p.active) return false;
    if (selectedDept !== 'all' && p.departmentId !== selectedDept) return false;
    if (inStockOnly && p.totalStock <= 0) return false;

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchTags && !matchDesc) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return (b.discountValue || 0) - (a.discountValue || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Boutique Search & Filters
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#241F1B]">
            Find Your Piece
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, SKU, fabric, or note..."
              className="w-full px-5 py-3.5 pl-12 bg-[#FDFBF7] border border-[#322C26]/15 rounded-sm text-sm text-[#241F1B] placeholder-[#5C5247]/50 focus:border-[#A6854F] focus:bg-white focus:outline-none shadow-sm font-sans"
            />
            <Search className="w-5 h-5 text-[#877B6E] absolute left-4 top-4" />
          </form>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-[#FDFBF7] rounded-sm border border-[#322C26]/10 shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Department Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto text-xs font-mono">
            <span className="text-[#5C5247] uppercase tracking-widest mr-2 hidden sm:inline font-semibold">
              Department:
            </span>
            {['all', 'men', 'women', 'kids', 'attar', 'organic-food'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all ${
                  selectedDept === dept
                    ? 'bg-[#241F1B] text-[#FAF6F0] font-bold shadow-sm'
                    : 'bg-[#FAF6F0] text-[#5C5247] hover:text-[#241F1B]'
                }`}
              >
                {dept === 'all' ? 'All' : dept.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Sort & Availability */}
          <div className="flex items-center space-x-4 text-xs font-mono">
            <label className="flex items-center space-x-2 cursor-pointer text-[#5C5247]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded bg-white border-[#322C26]/20 text-[#A6854F] focus:ring-0"
              />
              <span>In Stock Only</span>
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF6F0] text-[#241F1B] border border-[#322C26]/15 rounded-sm px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-[#A6854F]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center text-xs font-mono text-[#877B6E]">
          <span>
            Found {sorted.length} item{sorted.length === 1 ? '' : 's'}
          </span>
          {query && (
            <span>
              Searching for: "<strong className="text-[#241F1B]">{query}</strong>"
            </span>
          )}
        </div>

        {/* Products Grid */}
        {sorted.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#FDFBF7] rounded-sm border border-[#322C26]/10 p-12 shadow-sm">
            <p className="text-lg font-serif text-[#241F1B]">No items found matching your criteria.</p>
            <p className="text-xs text-[#5C5247] max-w-sm mx-auto">
              Try adjusting your search terms or clearing department filters.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedDept('all');
                setInStockOnly(false);
                setSearchParams({});
              }}
              className="text-xs uppercase tracking-widest text-[#A6854F] underline font-mono font-semibold pt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
