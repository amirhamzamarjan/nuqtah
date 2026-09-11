import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bookmark,
  ShoppingBag,
  MessageCircle,
  ChevronRight,
  Share2,
  Check,
} from 'lucide-react';
import { store } from '../../lib/store';
import { Product, ProductVariant } from '../../types';
import { calculateProductPrice } from '../../lib/discount';
import { evaluateInventoryStatus } from '../../lib/inventory';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { generateSingleProductWhatsAppUrl } from '../../lib/whatsapp';
import { APP_CONFIG } from '../../lib/config';
import { ProductCard } from '../../components/ui/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | undefined>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addToCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!slug) return;
    const prod = store.getProductBySlug(slug);
    setProduct(prod);

    if (prod) {
      setSelectedImage(prod.mainImage);
      if (prod.variants && prod.variants.length > 0) {
        const firstAvailable = prod.variants.find((v) => v.stock > 0) || prod.variants[0];
        setSelectedVariant(firstAvailable);
      } else {
        setSelectedVariant(undefined);
      }
      setQuantity(1);

      // Contextual theme
      if (prod.departmentId === 'women') {
        setTheme('women');
      } else if (prod.departmentId === 'kids') {
        setTheme('kids');
      } else {
        setTheme('default');
      }
    }
  }, [slug, setTheme]);

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#F2ECE4] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-serif text-[#241F1B] font-semibold">Piece Not Found</h2>
        <p className="text-xs text-[#5C5247] max-w-sm">
          The requested item may have been archived or is no longer listed in our boutique archive.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-[#241F1B] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Price Calculation
  const activePrice = selectedVariant?.priceOverride || product.price;
  const pricing = calculateProductPrice(
    activePrice,
    product.oldPrice,
    product.discountType,
    product.discountValue,
    product.salePrice,
    APP_CONFIG.currencySymbol
  );

  // Real Inventory Evaluation
  const currentStock = selectedVariant ? selectedVariant.stock : product.totalStock;
  const inventory = evaluateInventoryStatus(currentStock, APP_CONFIG.lowStockThreshold);
  const wishlisted = isInWishlist(product.id);

  const handleWhatsAppOrder = () => {
    if (!inventory.isAvailable) return;
    const url = generateSingleProductWhatsAppUrl({
      product,
      variant: selectedVariant,
      quantity,
      selectedAttributes: selectedVariant?.attributes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = () => {
    if (inventory.isAvailable) {
      addToCart(product, selectedVariant, quantity);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = store
    .getProducts({ departmentId: product.departmentId })
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const isWomen = product.departmentId === 'women';
  const isKids = product.departmentId === 'kids';

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] pb-24 transition-colors duration-500">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#322C26]/10 bg-[#E6DDD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center space-x-2 text-xs font-mono text-[#5C5247]">
          <Link to="/" className="hover:text-[#241F1B]">
            Nuqtah
          </Link>
          <ChevronRight className="w-3 h-3 text-[#5C5247]/50" />
          <Link to="/shop" className="hover:text-[#241F1B]">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 text-[#5C5247]/50" />
          <Link to={`/shop/${product.departmentId}`} className="hover:text-[#241F1B] capitalize">
            {product.departmentId}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#5C5247]/50" />
          <span className="text-[#241F1B] font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Gallery Stage */}
          <div className="space-y-4 sticky top-24">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full bg-[#FAF6F0] rounded-sm overflow-hidden border border-[#322C26]/10 shadow-md">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="text-[10px] tracking-widest uppercase font-mono px-2.5 py-1 rounded-sm bg-[#241F1B] text-white shadow-sm font-semibold">
                    {product.badge}
                  </span>
                )}
                {pricing.hasDiscount && (
                  <span className="text-[10px] tracking-widest uppercase font-mono px-2.5 py-1 rounded-sm bg-[#A6854F] text-white shadow-sm font-semibold">
                    {pricing.badgeLabel}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleItem(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md shadow-sm transition-all z-10 ${
                  wishlisted
                    ? 'text-[#A6854F] border border-[#A6854F]/40'
                    : 'text-[#5C5247] hover:text-[#241F1B] border border-[#322C26]/10'
                }`}
                aria-label="Wishlist"
              >
                <Bookmark className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 aspect-[3/4] rounded-sm overflow-hidden border transition-all flex-shrink-0 bg-[#FAF6F0] ${
                      selectedImage === img
                        ? 'border-[#A6854F] ring-2 ring-[#A6854F]'
                        : 'border-[#322C26]/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Detail & Interaction */}
          <div className="space-y-8">
            {/* Header & Title */}
            <div className="space-y-2 border-b border-[#322C26]/10 pb-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#877B6E]">
                <span>SKU: {selectedVariant?.sku || product.sku}</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-1 hover:text-[#241F1B] transition-colors font-semibold"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif text-[#241F1B] font-semibold leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#5C5247] font-light leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Price Display */}
              <div className="pt-4 flex items-baseline space-x-3">
                <span
                  className={`text-2xl sm:text-3xl font-serif font-bold ${
                    isWomen ? 'text-[#9E6B60]' : isKids ? 'text-[#99784D]' : 'text-[#241F1B]'
                  }`}
                >
                  {pricing.formattedFinal}
                </span>
                {pricing.hasDiscount && (
                  <span className="text-sm text-[#877B6E] line-through font-mono">
                    {pricing.formattedOriginal}
                  </span>
                )}
              </div>
            </div>

            {/* Live Inventory Status Indicator */}
            <div className="flex items-center space-x-3 p-3.5 bg-[#FDFBF7] border border-[#322C26]/10 rounded-sm text-xs font-mono shadow-sm">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  !inventory.isAvailable
                    ? 'bg-red-500'
                    : inventory.isLowStock
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-emerald-600'
                }`}
              />
              <span className="text-[#241F1B] font-semibold">
                {!inventory.isAvailable
                  ? 'Currently Out of Stock'
                  : inventory.isLowStock
                  ? `Low Stock: Only ${inventory.availableQuantity} piece(s) remaining`
                  : 'In Stock & Ready for Dispatch'}
              </span>
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-[#5C5247] font-semibold">
                  <span>Select Variant / Size</span>
                  {selectedVariant && (
                    <span className="text-[#877B6E]">
                      Stock: {selectedVariant.stock} left
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const isOutOfStock = v.stock <= 0;

                    return (
                      <button
                        key={v.id}
                        disabled={isOutOfStock}
                        onClick={() => {
                          setSelectedVariant(v);
                          setQuantity(1);
                        }}
                        className={`px-4 py-2.5 text-xs font-mono rounded-sm border transition-all flex items-center space-x-2 ${
                          isOutOfStock
                            ? 'bg-[#EFE8DE] border-[#322C26]/10 text-[#877B6E] line-through cursor-not-allowed opacity-50'
                            : isSelected
                            ? isWomen
                              ? 'bg-[#9E6B60] text-white font-bold border-[#9E6B60] shadow-md'
                              : isKids
                              ? 'bg-[#99784D] text-white font-bold border-[#99784D] shadow-md'
                              : 'bg-[#241F1B] text-white font-bold border-[#241F1B] shadow-md'
                            : 'bg-[#FDFBF7] text-[#241F1B] border-[#322C26]/15 hover:border-[#A6854F]'
                        }`}
                      >
                        <span>{v.name}</span>
                        {isOutOfStock && <span className="text-[9px] uppercase font-normal">(Sold Out)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Ordering CTAs */}
            <div className="space-y-4 pt-2">
              {inventory.isAvailable ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-[#322C26]/15 bg-[#FDFBF7] rounded-sm px-3 py-2 text-xs font-mono space-x-3 shadow-sm">
                    <span className="text-[#5C5247]">QTY:</span>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-[#241F1B] hover:text-[#A6854F] font-bold px-1"
                    >
                      -
                    </button>
                    <span className="text-[#241F1B] font-bold px-1">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(inventory.availableQuantity, quantity + 1))}
                      className="text-[#241F1B] hover:text-[#A6854F] font-bold px-1"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-[#FAF6F0] hover:bg-white text-[#241F1B] border border-[#A6854F]/40 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-sm flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#A6854F]" />
                    <span>Add To Bag</span>
                  </button>
                </div>
              ) : null}

              {/* Primary WhatsApp Order CTA */}
              <button
                onClick={handleWhatsAppOrder}
                disabled={!inventory.isAvailable}
                className={`w-full py-4 rounded-sm text-xs font-bold tracking-widest uppercase flex items-center justify-center space-x-2.5 transition-all shadow-md ${
                  inventory.isAvailable
                    ? 'bg-emerald-800 hover:bg-emerald-700 text-white'
                    : 'bg-[#EFE8DE] text-[#877B6E] cursor-not-allowed border border-[#322C26]/10'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {inventory.isAvailable ? 'Order on WhatsApp' : 'Out of Stock (Inquire on WhatsApp)'}
                </span>
              </button>

              <p className="text-[11px] text-center text-[#5C5247] font-mono">
                Direct consultation with our Dhaka boutique concierge via WhatsApp ({APP_CONFIG.whatsAppNumber}).
              </p>
            </div>

            {/* Specifications & Care Details Accordions */}
            <div className="pt-6 border-t border-[#322C26]/10 space-y-5 text-xs font-light">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#24201B] mb-2">Description & Narrative</h4>
                <p className="text-[#5C5247] leading-relaxed font-light">{product.description}</p>
              </div>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="pt-4 border-t border-[#322C26]/10">
                  <h4 className="font-serif text-base font-semibold text-[#24201B] mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-[#5C5247] font-mono text-[11px]">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="p-2.5 bg-[#FDFBF7] rounded border border-[#322C26]/10 shadow-sm">
                        <span className="text-[#877B6E] block">{key}:</span>
                        <span className="text-[#241F1B] font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.careInstructions && product.careInstructions.length > 0 && (
                <div className="pt-4 border-t border-[#322C26]/10">
                  <h4 className="font-serif text-base font-semibold text-[#24201C] mb-2">Care & Preservation</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#5C5247]">
                    {product.careInstructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#322C26]/10 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
                  Complementary Edits
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#241F1B] mt-1">
                  You May Also Discern
                </h3>
              </div>
              <Link
                to={`/shop/${product.departmentId}`}
                className="text-xs uppercase tracking-widest text-[#241F1B] font-semibold hover:text-[#A6854F]"
              >
                View Department →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} departmentTheme={product.departmentId} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
