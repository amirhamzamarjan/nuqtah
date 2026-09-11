import React, { useState, useEffect } from 'react';
import { Package, Boxes, Tv, BookOpen, ArrowUpRight } from 'lucide-react';
import { store } from '../../lib/store';
import { Product, Order, ScreenVideo, InstituteAyah } from '../../types';
import { AdminTab } from './AdminLayout';
import { APP_CONFIG } from '../../lib/config';

interface AdminOverviewTabProps {
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ setActiveTab }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [ayat, setAyat] = useState<InstituteAyah[]>([]);

  useEffect(() => {
    const update = () => {
      setProducts(store.getAllProducts());
      setOrders(store.getOrders());
      setVideos(store.getAllScreenVideos());
      setAyat(store.getAllInstituteAyat());
    };
    update();
    return store.subscribe(update);
  }, []);

  const totalInventoryUnits = products.reduce((acc, p) => acc + (p.totalStock || 0), 0);
  const lowStockCount = products.filter((p) => p.totalStock > 0 && p.totalStock <= 3).length;
  const outOfStockCount = products.filter((p) => p.totalStock <= 0).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
          System Status
        </span>
        <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Ecosystem Overview</h1>
        <p className="text-xs text-[#5D554C] font-light">
          Real metrics derived directly from live database tables and inventory states.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          className="p-5 bg-white surface-card rounded-sm border border-[#24201C]/[0.08] space-y-2 shadow-sm hover:border-[#B58B47]/40 transition-colors group"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5D554C] font-semibold">Total Products</span>
            <Package className="w-4 h-4 text-[#B58B47]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#24201C] group-hover:text-[#B58B47] transition-colors">
            {products.length}
          </div>
          <span className="text-[10px] font-mono text-[#8A8075] block">
            Across 5 departments
          </span>
        </div>

        <div
          className="p-5 bg-white surface-card rounded-sm border border-[#24201C]/[0.08] space-y-2 shadow-sm hover:border-[#B58B47]/40 transition-colors group"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5D554C] font-semibold">Total Stock Units</span>
            <Boxes className="w-4 h-4 text-[#B58B47]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#24201C] group-hover:text-[#B58B47] transition-colors">
            {totalInventoryUnits}
          </div>
          <span className="text-[10px] font-mono text-amber-700 block font-medium">
            {lowStockCount} low stock • {outOfStockCount} out of stock
          </span>
        </div>

        <div
          className="p-5 bg-white surface-card rounded-sm border border-[#24201C]/[0.08] space-y-2 shadow-sm hover:border-[#B58B47]/40 transition-colors group"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5D554C] font-semibold">Screen Discourses</span>
            <Tv className="w-4 h-4 text-[#B58B47]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#24201C] group-hover:text-[#B58B47] transition-colors">
            {videos.length}
          </div>
          <span className="text-[10px] font-mono text-[#8A8075] block">
            Active video archives
          </span>
        </div>

        <div
          className="p-5 bg-white surface-card rounded-sm border border-[#24201C]/[0.08] space-y-2 shadow-sm hover:border-[#B58B47]/40 transition-colors group"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5D554C] font-semibold">Institute Ayat</span>
            <BookOpen className="w-4 h-4 text-[#B58B47]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#24201C] group-hover:text-[#B58B47] transition-colors">
            {ayat.length}
          </div>
          <span className="text-[10px] font-mono text-[#8A8075] block">
            Quranic reflections published
          </span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="surface-card bg-white rounded-sm p-6 border border-[#24201C]/[0.08] shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
            <h3 className="text-lg font-serif font-semibold text-[#24201C]">Stock State Overview</h3>
            <span className="text-xs font-mono text-[#8A8075]">Recent items</span>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs font-mono p-2.5 bg-[#FAF6EF] rounded border border-[#24201C]/[0.06]"
              >
                <div className="truncate pr-4">
                  <span className="text-[#24201C] font-medium block truncate">{p.name}</span>
                  <span className="text-[#8A8075] text-[10px]">{p.sku}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                      p.totalStock <= 0
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : p.totalStock <= 3
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {p.totalStock <= 0
                      ? 'Out of Stock'
                      : p.totalStock <= 3
                      ? `${p.totalStock} left`
                      : `${p.totalStock} in stock`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card bg-white rounded-sm p-6 border border-[#24201C]/[0.08] shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
            <h3 className="text-lg font-serif font-semibold text-[#24201C]">Official Store Parameters</h3>
            <span className="text-xs font-mono text-[#8A8075]">Active configuration</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-[#FAF6EF] rounded border border-[#24201C]/[0.06] space-y-1">
              <span className="text-[#8A8075] block">WhatsApp Concierge:</span>
              <span className="text-[#24201C] font-bold">{APP_CONFIG.whatsAppNumber}</span>
            </div>
            <div className="p-3 bg-[#FAF6EF] rounded border border-[#24201C]/[0.06] space-y-1">
              <span className="text-[#8A8075] block">Support Email:</span>
              <span className="text-[#24201C] font-bold">{APP_CONFIG.supportEmail}</span>
            </div>
            <div className="p-3 bg-[#FAF6EF] rounded border border-[#24201C]/[0.06] space-y-1">
              <span className="text-[#8A8075] block">Shop Location:</span>
              <span className="text-[#24201C] font-medium leading-relaxed block">
                {APP_CONFIG.address.full}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
