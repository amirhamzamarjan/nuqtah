import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  FolderTree,
  Tag,
  ShoppingBag,
  Tv,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type AdminTab =
  | 'overview'
  | 'products'
  | 'inventory'
  | 'categories'
  | 'offers'
  | 'orders'
  | 'screen'
  | 'institute'
  | 'settings';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  children,
}) => {
  const { user, logout, canManageShop, canManageScreen, canManageInstitute, canManageSettings } =
    useAuth();

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#24201C] flex flex-col md:flex-row font-sans transition-colors">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#FAF6EF] border-r border-[#24201C]/[0.08] flex flex-col justify-between flex-shrink-0 shadow-sm">
        <div className="p-6 space-y-6">
          {/* Logo & Header */}
          <div className="space-y-2">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo/nuqtah black.jfif"
                alt="Nuqtah"
                className="h-8 w-auto object-contain filter drop-shadow-sm"
              />
            </Link>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-[#B58B47] font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </div>
          </div>

          {/* User Profile Pill */}
          {user && (
            <div className="p-3 bg-white border border-[#24201C]/[0.06] rounded-sm space-y-1 shadow-sm">
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-[#B58B47]" />
                <span className="text-xs font-semibold text-[#24201C] truncate">{user.name}</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#B58B47]/15 text-[#B58B47] inline-block font-semibold">
                {user.role}
              </span>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-mono tracking-wider uppercase">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                  : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#B58B47]" />
              <span>Overview</span>
            </button>

            {/* Shop Section */}
            {canManageShop && (
              <>
                <div className="pt-3 pb-1 text-[9px] uppercase tracking-widest text-[#8A8075] px-3 font-semibold">
                  Commerce
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'products'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <Package className="w-4 h-4 text-[#B58B47]" />
                  <span>Products</span>
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'inventory'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <Boxes className="w-4 h-4 text-[#B58B47]" />
                  <span>Inventory Stock</span>
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'categories'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <FolderTree className="w-4 h-4 text-[#B58B47]" />
                  <span>Categories</span>
                </button>
                <button
                  onClick={() => setActiveTab('offers')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'offers'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <Tag className="w-4 h-4 text-[#B58B47]" />
                  <span>Offers & Promo</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#B58B47]" />
                  <span>Orders & Inquiry</span>
                </button>
              </>
            )}

            {/* Media & Content */}
            {canManageScreen && (
              <>
                <div className="pt-3 pb-1 text-[9px] uppercase tracking-widest text-[#8A8075] px-3 font-semibold">
                  Media
                </div>
                <button
                  onClick={() => setActiveTab('screen')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'screen'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <Tv className="w-4 h-4 text-[#B58B47]" />
                  <span>Screen Media</span>
                </button>
              </>
            )}

            {/* Knowledge Platform */}
            {canManageInstitute && (
              <>
                <div className="pt-3 pb-1 text-[9px] uppercase tracking-widest text-[#8A8075] px-3 font-semibold">
                  Knowledge
                </div>
                <button
                  onClick={() => setActiveTab('institute')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'institute'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#B58B47]" />
                  <span>Institute Content</span>
                </button>
              </>
            )}

            {/* Global Settings */}
            {canManageSettings && (
              <>
                <div className="pt-3 pb-1 text-[9px] uppercase tracking-widest text-[#8A8075] px-3 font-semibold">
                  System
                </div>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full px-3 py-2.5 rounded-sm flex items-center space-x-2.5 transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                      : 'text-[#5D554C] hover:text-[#24201C] hover:bg-white/60'
                  }`}
                >
                  <Settings className="w-4 h-4 text-[#B58B47]" />
                  <span>Global Settings</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#24201C]/[0.08] space-y-2">
          <Link
            to="/"
            className="w-full px-3 py-2 rounded-sm text-xs font-mono text-[#5D554C] hover:text-[#24201C] flex items-center justify-between hover:bg-white/60 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#B58B47]" />
          </Link>
          <button
            onClick={logout}
            className="w-full px-3 py-2 rounded-sm text-xs font-mono text-red-600 hover:text-red-800 hover:bg-red-50 flex items-center space-x-2 transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#FAF8F3] p-6 sm:p-10">
        <div className="max-w-6xl mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
};
