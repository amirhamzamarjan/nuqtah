import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ECOSYSTEM_SITES, APP_CONFIG } from '../../lib/config';
import { MessageCircle } from 'lucide-react';

export const DestinationBar: React.FC = () => {
  const location = useLocation();

  const getActiveSiteId = (): string => {
    const path = location.pathname;
    if (path.startsWith('/shop')) return 'shop';
    if (path.startsWith('/screen')) return 'screen';
    if (path.startsWith('/institute')) return 'institute';
    return 'home';
  };

  const activeId = getActiveSiteId();

  return (
    <div className="w-full bg-[#EAE2D8] border-b border-[#322C26]/10 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        <div className="flex items-center space-x-1 sm:space-x-4">
          <span className="text-[10px] tracking-widest uppercase text-[#5C5247]/80 hidden md:inline font-mono font-medium">
            Ecosystem Portals:
          </span>
          <div className="flex items-center space-x-1">
            {ECOSYSTEM_SITES.map((site) => {
              const isActive = activeId === site.id;
              return (
                <Link
                  key={site.id}
                  to={site.path}
                  className={`px-2.5 py-0.5 text-[11px] tracking-wide transition-all rounded-sm flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-[#241F1B] bg-[#FAF6F0] font-semibold shadow-sm border border-[#A6854F]/40'
                      : 'text-[#5C5247] hover:text-[#241F1B] hover:bg-[#FAF6F0]/60'
                  }`}
                  title={`${site.name} (${site.domain})`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-[#A6854F] shadow-luxury-gold' : 'bg-[#5C5247]/30'
                    }`}
                  />
                  <span>{site.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Info: WhatsApp Concierge (Replacing Admin Portal link) */}
        <div className="flex items-center space-x-3 text-[11px] text-[#5C5247] font-mono">
          <a
            href={`https://wa.me/${APP_CONFIG.whatsAppInternational}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#241F1B] hover:bg-[#FAF6F0] transition-colors flex items-center space-x-1.5 text-[10px] tracking-wider bg-[#FAF6F0]/80 px-2.5 py-0.5 rounded border border-[#322C26]/10 font-semibold"
          >
            <MessageCircle className="w-3 h-3 text-emerald-800" />
            <span>Concierge: {APP_CONFIG.whatsAppNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
