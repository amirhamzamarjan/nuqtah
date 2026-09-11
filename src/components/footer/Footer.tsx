import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, ECOSYSTEM_SITES } from '../../lib/config';
import { ArrowUpRight, Mail, MessageCircle, MapPin } from 'lucide-react';
import { YouTubeIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#E6DDD2] border-t border-[#322C26]/10 text-[#5C5247] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#322C26]/10">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/logo/nuqtah black.jfif"
                alt="Nuqtah"
                className="h-10 w-auto object-contain filter drop-shadow-sm"
              />
            </Link>
            <p className="text-sm text-[#5C5247] max-w-sm leading-relaxed font-light">
              A unified digital ecosystem dedicated to luxury lifestyle commerce, cinematic media discourses, and authentic Islamic knowledge.
            </p>
            <div className="pt-2 text-xs text-[#5C5247] space-y-2 font-mono">
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#A6854F]" />
                <span>Email: </span>
                <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-[#241F1B] hover:text-[#A6854F] underline font-medium">
                  {APP_CONFIG.supportEmail}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#A6854F]" />
                <span>WhatsApp: </span>
                <a
                  href={`https://wa.me/${APP_CONFIG.whatsAppInternational}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#241F1B] hover:text-[#A6854F] underline font-medium"
                >
                  {APP_CONFIG.whatsAppNumber}
                </a>
              </p>
              <p className="flex items-start space-x-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#A6854F] mt-0.5 flex-shrink-0" />
                <span className="text-[11px] leading-relaxed text-[#241F1B]">
                  {APP_CONFIG.address.full}
                </span>
              </p>
            </div>
          </div>

          {/* Ecosystem Portals */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#241F1B] font-bold">Ecosystem</h3>
            <ul className="space-y-2 text-sm font-light">
              {ECOSYSTEM_SITES.map((site) => (
                <li key={site.id}>
                  <Link
                    to={site.path}
                    className="hover:text-[#A6854F] transition-colors flex items-center justify-between group"
                  >
                    <span>{site.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Departments */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#241F1B] font-bold">Shop Departments</h3>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link to="/shop/men" className="hover:text-[#A6854F] transition-colors">
                  Men Heritage
                </Link>
              </li>
              <li>
                <Link to="/shop/women" className="hover:text-[#9E6B60] transition-colors text-[#9E6B60] font-semibold">
                  Women Luxury Sanctuary
                </Link>
              </li>
              <li>
                <Link to="/shop/kids" className="hover:text-[#99784D] transition-colors">
                  Kids Little Noor
                </Link>
              </li>
              <li>
                <Link to="/shop/attar" className="hover:text-[#A6854F] transition-colors">
                  Attar Distillations
                </Link>
              </li>
              <li>
                <Link to="/shop/organic-food" className="hover:text-[#A6854F] transition-colors">
                  Organic Food
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Media */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#241F1B] font-bold">Media & Governance</h3>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a
                  href={APP_CONFIG.screenYouTube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A6854F] transition-colors flex items-center space-x-1.5 text-red-800 font-semibold"
                >
                  <YouTubeIcon className="w-4 h-4" />
                  <span>Nuqtah Screen YouTube</span>
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#A6854F] transition-colors">
                  About Nuqtah
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#A6854F] transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#A6854F] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#A6854F] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C5247]/80 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Nuqtah. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px] font-mono">
            <span>nuqtah.com</span>
            <span>•</span>
            <span>shop.nuqtah.com</span>
            <span>•</span>
            <span>screen.nuqtah.com</span>
            <span>•</span>
            <span>institute.nuqtah.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
