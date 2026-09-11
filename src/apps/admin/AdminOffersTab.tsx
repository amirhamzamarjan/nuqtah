import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { store } from '../../lib/store';
import { Offer } from '../../types';

export const AdminOffersTab: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(15);
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');

  useEffect(() => {
    const update = () => {
      setOffers(store.getAllOffers());
    };
    update();
    return store.subscribe(update);
  }, []);

  const openCreate = () => {
    setEditingOffer(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setDiscountType('percentage');
    setDiscountValue(15);
    setStartAt(new Date().toISOString().split('T')[0]);
    setEndAt(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const openEdit = (off: Offer) => {
    setEditingOffer(off);
    setTitle(off.title);
    setSlug(off.slug);
    setDescription(off.description);
    setDiscountType(off.discountType);
    setDiscountValue(off.discountValue);
    setStartAt(off.startAt.split('T')[0]);
    setEndAt(off.endAt.split('T')[0]);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const offerToSave: Offer = {
      id: editingOffer ? editingOffer.id : `off-${Date.now()}`,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      discountType,
      discountValue: Number(discountValue),
      startAt: new Date(startAt).toISOString(),
      endAt: new Date(endAt).toISOString(),
      active: true,
    };
    store.saveOffer(offerToSave);
    setIsModalOpen(false);
  };

  const isExpired = (end: string) => {
    return new Date(end).getTime() < Date.now();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Promotions & Campaigns
          </span>
          <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Offer Management</h1>
        </div>

        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-[#B58B47]" />
          <span>Create New Offer</span>
        </button>
      </div>

      <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
            <tr>
              <th className="p-4">Offer Title</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Auto-Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#24201C]/[0.06]">
            {offers.map((off) => {
              const expired = isExpired(off.endAt);
              return (
                <tr key={off.id} className="hover:bg-[#FAF6EF]/50">
                  <td className="p-4">
                    <span className="font-semibold text-[#24201C] block">{off.title}</span>
                    <span className="text-[#5D554C] text-[10px]">{off.description}</span>
                  </td>
                  <td className="p-4 text-[#B58B47] font-bold">
                    {off.discountType === 'percentage' ? `${off.discountValue}% OFF` : `৳${off.discountValue} OFF`}
                  </td>
                  <td className="p-4 text-[#5D554C]">
                    {new Date(off.startAt).toLocaleDateString()} to {new Date(off.endAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        expired
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {expired ? 'Expired / Inactive' : 'Active Live'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEdit(off)} className="p-1 hover:text-[#B58B47]">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => store.deleteOffer(off.id)} className="p-1 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-md w-full border border-[#24201C]/10 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif font-semibold text-[#24201C]">
                {editingOffer ? 'Edit Offer' : 'Create Offer'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Heritage Seasonal Edit"
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
