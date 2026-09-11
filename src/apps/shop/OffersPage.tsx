import React, { useState, useEffect } from 'react';
import { Tag, Clock } from 'lucide-react';
import { store } from '../../lib/store';
import { Offer, Product } from '../../types';
import { ProductCard } from '../../components/ui/ProductCard';

export const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const update = () => {
      setOffers(store.getActiveOffers());
      const prods = store.getAllProducts().filter((p) => p.oldPrice && p.oldPrice > p.price);
      setProducts(prods);
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Boutique Promotions
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">
            Active Offers & Seasonal Edits
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5247] font-light leading-relaxed">
            Special pricing on selected handcrafted pieces for limited seasonal windows.
          </p>
        </div>

        {/* Active Offer Banners */}
        {offers.length > 0 && (
          <div className="space-y-6">
            {offers.map((off) => (
              <div
                key={off.id}
                className="surface-card bg-[#FDFBF7] rounded-sm p-6 sm:p-8 border border-[#A6854F]/30 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#A6854F] font-semibold">
                    <Tag className="w-4 h-4" />
                    <span>Special Promotional Edit</span>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#241F1B]">{off.title}</h3>
                  <p className="text-xs sm:text-sm text-[#5C5247] max-w-xl leading-relaxed font-light">
                    {off.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-[#5C5247] bg-[#EFE8DE] px-4 py-2 rounded-sm border border-[#322C26]/10">
                  <Clock className="w-4 h-4 text-[#A6854F]" />
                  <span>
                    Ends {new Date(off.endAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Discounted Product Grid */}
        <div className="space-y-6">
          <div className="border-b border-[#322C26]/10 pb-3 flex justify-between items-center">
            <h3 className="text-xl font-serif font-semibold text-[#241F1B]">Promotional Selection</h3>
            <span className="text-xs font-mono text-[#877B6E]">{products.length} piece(s)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
