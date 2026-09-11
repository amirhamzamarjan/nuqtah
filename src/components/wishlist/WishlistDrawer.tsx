import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { store } from '../../lib/store';
import { formatPrice } from '../../lib/discount';
import { APP_CONFIG } from '../../lib/config';

export const WishlistDrawer: React.FC = () => {
  const { items, isOpen, closeWishlist, toggleItem } = useWishlist();

  if (!isOpen) return null;

  const products = items
    .map((item) => store.getProductBySlug(item.productId))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#24201C]/10 shadow-2xl flex flex-col text-[#24201C]">
          {/* Header */}
          <div className="p-5 border-b border-[#24201C]/[0.08] flex items-center justify-between bg-[#FAF6EF]">
            <div className="flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-[#B58B47]" />
              <h2 className="text-base font-serif font-bold text-[#24201C]">
                Saved Items ({items.length})
              </h2>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 text-[#5D554C] hover:text-[#24201C] rounded-full bg-white hover:bg-white/80 transition-colors shadow-sm"
              aria-label="Close Saved Items"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {products.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EF] border border-[#24201C]/[0.08] flex items-center justify-center text-[#5D554C]/50">
                  <Bookmark className="w-8 h-8" />
                </div>
                <p className="text-base font-serif font-semibold text-[#24201C]">Your saved list is empty.</p>
                <p className="text-xs text-[#5D554C] max-w-xs leading-relaxed">
                  Save your favorite silhouettes and distillations to review whenever you return.
                </p>
              </div>
            ) : (
              products.map((prod) => {
                if (!prod) return null;
                return (
                  <div
                    key={prod.id}
                    className="p-3 bg-white rounded-sm flex space-x-3 border border-[#24201C]/[0.08] shadow-sm items-center"
                  >
                    <img
                      src={prod.mainImage}
                      alt={prod.name}
                      className="w-16 h-20 object-cover rounded-sm bg-[#F4EFE6] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#24201C] truncate">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-serif text-[#B58B47] font-bold block mt-1">
                        {formatPrice(prod.price, APP_CONFIG.currencySymbol)}
                      </span>
                      <div className="flex items-center space-x-3 mt-2">
                        <Link
                          to={`/shop/product/${prod.slug}`}
                          onClick={closeWishlist}
                          className="text-[11px] uppercase tracking-wider text-[#24201C] hover:text-[#B58B47] font-semibold flex items-center space-x-1"
                        >
                          <span>View Piece</span>
                          <ArrowRight className="w-3 h-3 text-[#B58B47]" />
                        </Link>
                        <button
                          onClick={() => toggleItem(prod.id)}
                          className="text-[#8A8075] hover:text-red-600 p-1 text-xs"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
