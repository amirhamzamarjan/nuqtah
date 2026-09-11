import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { Collection, Product } from '../../types';
import { ProductCard } from '../../components/ui/ProductCard';

export const CollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCol, setSelectedCol] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const update = () => {
      setCollections(store.getCollections());
      setProducts(store.getAllProducts());
    };
    update();
    return store.subscribe(update);
  }, []);

  const filteredProducts = selectedCol === 'all'
    ? products
    : products.filter((p) => p.collectionId === selectedCol);

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Curated Themes
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">
            Signature Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5247] font-light leading-relaxed">
            Thematic seasonal edits uniting heritage Panjabis, modest luxury silhouettes, and pure agarwood flacons.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex items-center justify-center space-x-3 overflow-x-auto py-2">
          <button
            onClick={() => setSelectedCol('all')}
            className={`px-5 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
              selectedCol === 'all'
                ? 'bg-[#241F1B] text-[#FAF6F0] font-bold shadow-md'
                : 'bg-[#FDFBF7] text-[#5C5247] hover:text-[#241F1B] border border-[#322C26]/10 shadow-sm'
            }`}
          >
            All Collections
          </button>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCol(col.id)}
              className={`px-5 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
                selectedCol === col.id
                  ? 'bg-[#241F1B] text-[#FAF6F0] font-bold shadow-md'
                  : 'bg-[#FDFBF7] text-[#5C5247] hover:text-[#241F1B] border border-[#322C26]/10 shadow-sm'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};
