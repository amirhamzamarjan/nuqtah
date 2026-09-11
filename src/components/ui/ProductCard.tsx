import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { calculateProductPrice } from '../../lib/discount';
import { evaluateInventoryStatus } from '../../lib/inventory';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { generateSingleProductWhatsAppUrl } from '../../lib/whatsapp';
import { APP_CONFIG } from '../../lib/config';

interface ProductCardProps {
  product: Product;
  departmentTheme?: 'men' | 'women' | 'kids' | 'attar' | 'organic-food' | 'food';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, departmentTheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const pricing = calculateProductPrice(
    product.price,
    product.oldPrice,
    product.discountType,
    product.discountValue,
    product.salePrice,
    APP_CONFIG.currencySymbol
  );

  const inventory = evaluateInventoryStatus(product.totalStock, APP_CONFIG.lowStockThreshold);
  const wishlisted = isInWishlist(product.id);

  const displayImage =
    isHovered && product.galleryImages && product.galleryImages.length > 1
      ? product.galleryImages[1]
      : product.mainImage;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl({
      product,
      quantity: 1,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inventory.isAvailable) {
      addToCart(product, undefined, 1);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  const isWomenTheme = departmentTheme === 'women' || product.departmentId === 'women';
  const isKidsTheme = departmentTheme === 'kids' || product.departmentId === 'kids';

  return (
    <div
      className="group relative flex flex-col surface-card rounded-sm overflow-hidden bg-white border border-[#24201C]/[0.08] hover:border-[#B58B47]/40 shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full bg-[#F4EFE6] overflow-hidden">
        <Link to={`/shop/product/${product.slug}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm border shadow-sm ${
                product.badge === 'Sale'
                  ? 'bg-[#B58B47] text-white border-[#B58B47]'
                  : product.badge === 'Featured'
                  ? isWomenTheme
                    ? 'bg-[#B27468] text-white border-[#B27468]'
                    : 'bg-[#24201C] text-white border-[#24201C]'
                  : 'bg-[#24201C] text-white border-[#24201C]'
              }`}
            >
              {product.badge}
            </span>
          )}

          {pricing.hasDiscount && product.badge !== 'Sale' && (
            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm bg-[#B58B47]/15 text-[#B58B47] border border-[#B58B47]/30 font-semibold">
              {pricing.badgeLabel}
            </span>
          )}

          {!inventory.isAvailable ? (
            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm bg-[#B25E50] text-white border border-[#B25E50]">
              Out of Stock
            </span>
          ) : inventory.isLowStock ? (
            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm bg-[#B58B47]/20 text-[#24201C] border border-[#B58B47]/40 font-semibold">
              {inventory.label}
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md transition-all duration-200 z-10 shadow-sm ${
            wishlisted
              ? 'text-[#B58B47] border border-[#B58B47]/40'
              : 'text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white/95 via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex gap-2">
          {inventory.isAvailable ? (
            <>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-2 text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center space-x-1.5 shadow-sm ${
                  isWomenTheme
                    ? 'bg-[#B27468] text-white hover:bg-[#CA9489]'
                    : isKidsTheme
                    ? 'bg-[#B1905E] text-white hover:bg-[#C9AE80]'
                    : 'bg-[#24201C] text-[#FAF8F3] hover:bg-[#3A342E]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
              <button
                onClick={handleWhatsAppOrder}
                title="Order on WhatsApp"
                className="p-2 bg-emerald-700 text-white hover:bg-emerald-600 rounded-sm transition-colors shadow-sm"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full py-2 text-center text-[11px] uppercase tracking-widest text-[#5D554C] bg-white/90 border border-[#24201C]/10 rounded-sm">
              Unavailable
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-2 bg-white">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-[#8A8075] font-mono block">
            SKU: {product.sku}
          </span>
          <Link
            to={`/shop/product/${product.slug}`}
            className="block text-sm font-medium text-[#24201C] hover:text-[#B58B47] transition-colors line-clamp-1 mt-0.5"
          >
            {product.name}
          </Link>
          <p className="text-xs text-[#5D554C] line-clamp-2 mt-1 font-light leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing Area */}
        <div className="pt-2 border-t border-[#24201C]/[0.06] flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span
              className={`text-base font-serif font-bold ${
                isWomenTheme ? 'text-[#B27468]' : isKidsTheme ? 'text-[#B1905E]' : 'text-[#24201C]'
              }`}
            >
              {pricing.formattedFinal}
            </span>
            {pricing.hasDiscount && (
              <span className="text-xs text-[#8A8075] line-through font-mono">
                {pricing.formattedOriginal}
              </span>
            )}
          </div>

          {/* Mobile Quick WhatsApp Button */}
          <div className="sm:hidden">
            {inventory.isAvailable && (
              <button
                onClick={handleWhatsAppOrder}
                className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono font-bold flex items-center space-x-1"
              >
                <span>WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
