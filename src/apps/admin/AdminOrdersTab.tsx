import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { Order, OrderStatus } from '../../types';
import { formatPrice } from '../../lib/discount';
import { APP_CONFIG } from '../../lib/config';

export const AdminOrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const update = () => {
      setOrders(store.getOrders());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
    store.updateOrderStatus(orderId, status);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-[#24201C]/[0.08] pb-6">
        <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
          Customer Interactions
        </span>
        <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Orders & Inquiries</h1>
        <p className="text-xs text-[#5D554C] font-light">
          Records of customer bag inquiries initiated via WhatsApp and future direct checkout orders.
        </p>
      </div>

      <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#5D554C] space-y-2">
            <p className="text-base font-serif font-semibold text-[#24201C]">No inquiries recorded yet.</p>
            <p className="font-light">Customer WhatsApp orders and inquiries will appear here as they are processed.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF6EF]/50">
                  <td className="p-4 font-bold text-[#24201C]">{ord.orderNumber}</td>
                  <td className="p-4">
                    <span className="text-[#24201C] font-semibold block">{ord.customerName}</span>
                    <span className="text-[#8A8075] text-[10px]">{ord.customerPhone}</span>
                  </td>
                  <td className="p-4 text-[#5D554C]">{ord.items.length} item(s)</td>
                  <td className="p-4 text-[#B58B47] font-bold">
                    {formatPrice(ord.total, APP_CONFIG.currencySymbol)}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-[#FAF6EF] text-[#24201C] border border-[#24201C]/15">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusUpdate(ord.id, e.target.value as OrderStatus)}
                      className="bg-white text-[#24201C] border border-[#24201C]/15 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#B58B47]"
                    >
                      <option value="inquiry">Inquiry</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
