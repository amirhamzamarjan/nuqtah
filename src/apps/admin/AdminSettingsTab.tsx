import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { store } from '../../lib/store';
import { GlobalSettings } from '../../types';

export const AdminSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings>(store.getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(store.getSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div className="border-b border-[#24201C]/[0.08] pb-6">
        <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
          System Configuration
        </span>
        <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Global Settings</h1>
        <p className="text-xs text-[#5D554C] font-light">
          Centralized configuration governing WhatsApp concierge ordering, official email, YouTube channel, and store parameters.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-sm text-xs font-mono text-emerald-900 flex items-center space-x-2 shadow-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Global settings updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
        <div className="surface-card bg-white rounded-sm p-6 border border-[#24201C]/[0.08] shadow-sm space-y-4">
          <h3 className="font-serif text-[#24201C] uppercase tracking-wider text-base font-semibold">
            WhatsApp Order Routing
          </h3>
          <p className="text-[#5D554C] text-[11px] leading-relaxed font-light">
            All customer bag inquiries and direct item orders are dispatched to this phone number via WhatsApp with formatted order details.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#5D554C] font-semibold block mb-1">WhatsApp Local (01997049300)</label>
              <input
                type="text"
                required
                value={settings.whatsAppNumber}
                onChange={(e) => setSettings({ ...settings, whatsAppNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                placeholder="01997049300"
              />
            </div>

            <div>
              <label className="text-[#5D554C] font-semibold block mb-1">WhatsApp International (8801997049300)</label>
              <input
                type="text"
                required
                value={settings.whatsAppInternational}
                onChange={(e) => setSettings({ ...settings, whatsAppInternational: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                placeholder="8801997049300"
              />
            </div>
          </div>
        </div>

        <div className="surface-card bg-white rounded-sm p-6 border border-[#24201C]/[0.08] shadow-sm space-y-4">
          <h3 className="font-serif text-[#24201C] uppercase tracking-wider text-base font-semibold">
            Store Parameters & Media Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#5D554C] font-semibold block mb-1">Store Name</label>
              <input
                type="text"
                required
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#5D554C] font-semibold block mb-1">Currency Symbol</label>
              <input
                type="text"
                required
                value={settings.currencySymbol}
                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[#5D554C] font-semibold block mb-1">Screen YouTube Channel URL</label>
            <input
              type="text"
              required
              value={settings.screenYouTube}
              onChange={(e) => setSettings({ ...settings, screenYouTube: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
              placeholder="https://www.youtube.com/@nuqtahsscreen9992"
            />
          </div>

          <div>
            <label className="text-[#5D554C] font-semibold block mb-1">Low-Stock Alert Threshold (Units)</label>
            <input
              type="number"
              min={1}
              max={50}
              required
              value={settings.lowStockThreshold}
              onChange={(e) => setSettings({ ...settings, lowStockThreshold: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
            />
          </div>
        </div>

        <div className="surface-card bg-white rounded-sm p-6 border border-[#24201C]/[0.08] shadow-sm space-y-4">
          <h3 className="font-serif text-[#24201C] uppercase tracking-wider text-base font-semibold">
            Verified Contact & Boutique Location
          </h3>

          <div>
            <label className="text-[#5D554C] font-semibold block mb-1">Official Support Email</label>
            <input
              type="email"
              required
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[#5D554C] font-semibold block mb-1">Full Shop Address</label>
            <input
              type="text"
              required
              value={settings.address.full}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  address: { ...settings.address, full: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-sm text-[#24201C] focus:border-[#B58B47] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
        >
          <Save className="w-4 h-4 text-[#B58B47]" />
          <span>Save Global Settings</span>
        </button>
      </form>
    </div>
  );
};
