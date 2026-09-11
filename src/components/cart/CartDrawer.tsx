import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/discount';
import { generateCartWhatsAppUrl } from '../../lib/whatsapp';
import { APP_CONFIG } from '../../lib/config';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, clearCart, subtotal, totalCount } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = generateCartWhatsAppUrl(items, {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      notes: customerNotes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#24201C]/10 shadow-2xl flex flex-col text-[#24201C]">
          {/* Header */}
          <div className="p-5 border-b border-[#24201C]/[0.08] flex items-center justify-between bg-[#FAF6EF]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#B58B47]" />
              <h2 className="text-base font-serif font-bold text-[#24201C]">
                Your Shopping Bag ({totalCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#5D554C] hover:text-[#24201C] rounded-full bg-white hover:bg-white/80 transition-colors shadow-sm"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EF] border border-[#24201C]/[0.08] flex items-center justify-center text-[#5D554C]/50">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-serif font-semibold text-[#24201C]">Your bag is currently empty.</p>
                <p className="text-xs text-[#5D554C] max-w-xs leading-relaxed">
                  Explore our curated departments to discover handcrafted edits and luxury essentials.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-sm flex space-x-3 border border-[#24201C]/[0.08] shadow-sm"
                >
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-sm bg-[#F4EFE6] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-[#24201C] truncate">
                        {item.product.name}
                      </h4>
                      {item.variant && (
                        <span className="text-[10px] text-[#5D554C] block font-mono">
                          {item.variant.name}
                        </span>
                      )}
                      <span className="text-xs font-serif text-[#B58B47] font-bold block mt-1">
                        {formatPrice(item.unitPrice, APP_CONFIG.currencySymbol)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 bg-[#FAF6EF] border border-[#24201C]/10 rounded px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#5D554C] hover:text-[#24201C] p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-[#24201C] px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#5D554C] hover:text-[#24201C] p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#8A8075] hover:text-red-600 transition-colors p-1"
                        aria-label="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout & Inquiry Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#24201C]/[0.08] bg-[#FAF6EF] space-y-4">
              {/* Optional Quick Details for WhatsApp Template */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] uppercase tracking-widest text-[#5D554C] font-mono block font-semibold">
                  Delivery Details (Optional)
                </span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded-sm text-xs text-[#24201C] placeholder-[#5D554C]/50 focus:border-[#B58B47] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Delivery Address / City"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded-sm text-xs text-[#24201C] placeholder-[#5D554C]/50 focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              {/* Subtotal */}
              <div className="pt-2 border-t border-[#24201C]/[0.08] flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-[#5D554C] font-mono">Estimated Subtotal</span>
                <span className="text-lg font-serif font-bold text-[#24201C]">
                  {formatPrice(subtotal, APP_CONFIG.currencySymbol)}
                </span>
              </div>

              {/* WhatsApp Checkout Action */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-sm text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </button>

              <div className="flex justify-between items-center text-[10px] text-[#5D554C] font-mono">
                <span>Official Concierge: {APP_CONFIG.whatsAppNumber}</span>
                <button
                  onClick={clearCart}
                  className="hover:text-red-600 underline transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
