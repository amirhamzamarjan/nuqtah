import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, Tv, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-[#F2ECE4] text-[#241F1B] flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full surface-card rounded-sm p-8 sm:p-12 bg-[#FDFBF7] border border-[#322C26]/10 text-center space-y-6 shadow-sm animate-fade-in">
        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-serif text-[#A6854F] font-bold block">404</span>
          <span className="text-xs uppercase tracking-widest text-[#877B6E] font-mono block font-semibold">
            Page Not Located
          </span>
        </div>

        <h1 className="text-2xl font-serif font-semibold text-[#241F1B]">
          The requested path does not exist.
        </h1>

        <p className="text-xs text-[#5C5247] font-light leading-relaxed">
          The destination you are seeking may have been moved, renamed, or is currently uncataloged within the Nuqtah ecosystem.
        </p>

        <div className="pt-4 border-t border-[#322C26]/10 grid grid-cols-2 gap-2 text-xs font-mono">
          <Link
            to="/"
            className="p-2.5 bg-[#FAF6F0] hover:bg-[#EFE8DE] rounded border border-[#322C26]/10 text-[#241F1B] font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#A6854F]" />
            <span>Gateway</span>
          </Link>
          <Link
            to="/shop"
            className="p-2.5 bg-[#FAF6F0] hover:bg-[#EFE8DE] rounded border border-[#322C26]/10 text-[#241F1B] font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#A6854F]" />
            <span>Shop</span>
          </Link>
          <Link
            to="/screen"
            className="p-2.5 bg-[#FAF6F0] hover:bg-[#EFE8DE] rounded border border-[#322C26]/10 text-[#241F1B] font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Tv className="w-3.5 h-3.5 text-[#A6854F]" />
            <span>Screen</span>
          </Link>
          <Link
            to="/institute"
            className="p-2.5 bg-[#FAF6F0] hover:bg-[#EFE8DE] rounded border border-[#322C26]/10 text-[#241F1B] font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#A6854F]" />
            <span>Institute</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
