import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { store } from '../../lib/store';
import { Product } from '../../types';
import { evaluateInventoryStatus } from '../../lib/inventory';
import { APP_CONFIG } from '../../lib/config';

export const AdminInventoryTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(APP_CONFIG.lowStockThreshold);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setProducts(store.getAllProducts());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleStockChange = (productId: string, variantId?: string, delta: number = 0, exactVal?: number) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    if (variantId && prod.variants && prod.variants.length > 0) {
      const v = prod.variants.find((item) => item.id === variantId);
      if (v) {
        const newStock = exactVal !== undefined ? Math.max(0, exactVal) : Math.max(0, v.stock + delta);
        store.updateVariantStock(productId, variantId, newStock);
        setMessage(`Updated stock for ${prod.name} (${v.name}) to ${newStock}`);
      }
    } else {
      const newStock = exactVal !== undefined ? Math.max(0, exactVal) : Math.max(0, prod.totalStock + delta);
      store.updateProductDirectStock(productId, newStock);
      setMessage(`Updated stock for ${prod.name} to ${newStock}`);
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24201C]/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Inventory Management
          </span>
          <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Live Stock Control</h1>
          <p className="text-xs text-[#5D554C] font-light">
            Real-time stock adjustment with safe zero-floor validation and automated stock state alerts.
          </p>
        </div>

        {/* Global Low Stock Threshold Setting */}
        <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-sm border border-[#24201C]/15 text-xs font-mono shadow-sm">
          <span className="text-[#5D554C] font-semibold">Low-Stock Alert Level:</span>
          <input
            type="number"
            min={1}
            max={50}
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
            className="w-12 bg-[#FAF8F3] border border-[#24201C]/20 rounded px-1.5 py-0.5 text-center text-[#24201C] font-bold focus:outline-none focus:border-[#B58B47]"
          />
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-sm text-xs font-mono text-emerald-900 flex items-center space-x-2 shadow-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{message}</span>
        </div>
      )}

      {/* Inventory Table */}
      <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Variant / Dimension</th>
                <th className="p-4">Stock State</th>
                <th className="p-4 text-center">Available Stock</th>
                <th className="p-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {products.map((prod) => {
                const hasVariants = prod.variants && prod.variants.length > 0;

                if (!hasVariants) {
                  const inv = evaluateInventoryStatus(prod.totalStock, lowStockThreshold);
                  return (
                    <tr key={prod.id} className="hover:bg-[#FAF6EF]/50">
                      <td className="p-4 font-semibold text-[#24201C]">{prod.name}</td>
                      <td className="p-4 text-[#5D554C]">{prod.sku}</td>
                      <td className="p-4 text-[#8A8075]">Standard</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            !inv.isAvailable
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : inv.isLowStock
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {inv.label}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-sm text-[#24201C]">
                        {prod.totalStock}
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => handleStockChange(prod.id, undefined, -1)}
                          disabled={prod.totalStock <= 0}
                          className="px-2.5 py-1 bg-[#FAF6EF] hover:bg-[#F4EFE6] rounded border border-[#24201C]/10 text-[#24201C] font-semibold disabled:opacity-30"
                          title="Decrease by 1"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => handleStockChange(prod.id, undefined, 1)}
                          className="px-2.5 py-1 bg-[#FAF6EF] hover:bg-[#F4EFE6] rounded border border-[#24201C]/10 text-[#24201C] font-semibold"
                          title="Increase by 1"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleStockChange(prod.id, undefined, 5)}
                          className="px-2.5 py-1 bg-[#B58B47]/15 text-[#B58B47] hover:bg-[#B58B47]/25 rounded font-bold"
                          title="Restock +5"
                        >
                          +5
                        </button>
                      </td>
                    </tr>
                  );
                }

                // Render variant rows
                return prod.variants.map((v, vIdx) => {
                  const inv = evaluateInventoryStatus(v.stock, lowStockThreshold);
                  return (
                    <tr key={v.id} className="hover:bg-[#FAF6EF]/50">
                      <td className="p-4 font-semibold text-[#24201C]">
                        {vIdx === 0 ? prod.name : <span className="text-[#8A8075] pl-4">↳</span>}
                      </td>
                      <td className="p-4 text-[#5D554C]">{v.sku}</td>
                      <td className="p-4 text-[#B58B47] font-bold">{v.name}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            !inv.isAvailable
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : inv.isLowStock
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {inv.label}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-sm text-[#24201C]">
                        {v.stock}
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button
                          onClick={() => handleStockChange(prod.id, v.id, -1)}
                          disabled={v.stock <= 0}
                          className="px-2.5 py-1 bg-[#FAF6EF] hover:bg-[#F4EFE6] rounded border border-[#24201C]/10 text-[#24201C] font-semibold disabled:opacity-30"
                          title="Decrease by 1"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => handleStockChange(prod.id, v.id, 1)}
                          className="px-2.5 py-1 bg-[#FAF6EF] hover:bg-[#F4EFE6] rounded border border-[#24201C]/10 text-[#24201C] font-semibold"
                          title="Increase by 1"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleStockChange(prod.id, v.id, 5)}
                          className="px-2.5 py-1 bg-[#B58B47]/15 text-[#B58B47] hover:bg-[#B58B47]/25 rounded font-bold"
                          title="Restock +5"
                        >
                          +5
                        </button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
