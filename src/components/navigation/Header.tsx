import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Bookmark, Search, Menu, X } from 'lucide-react';
import { DestinationBar } from './DestinationBar';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, totalCount: cartCount } = useCart();
  const { openWishlist, totalCount: wishlistCount } = useWishlist();
  const { theme } = useTheme();

  const path = location.pathname;
  const isShop = path.startsWith('/shop');
  const isWomen = path.startsWith('/shop/women') || (isShop && theme === 'women');
  const isScreen = path.startsWith('/screen');
  const isInstitute = path.startsWith('/institute');

  // Logo mapping: nuqtah pink.png for women section, nuqtah black.jfif for all other sections
  let logoSrc = '/logo/nuqtah black.jfif';
  let siteName = 'Nuqtah';
  let homeLink = '/';

  if (isWomen) {
    logoSrc = '/logo/nuqtah pink.png';
    siteName = 'Nuqtah Women';
    homeLink = '/shop/women';
  } else if (isShop) {
    siteName = 'Nuqtah Shop';
    homeLink = '/shop';
  } else if (isScreen) {
    siteName = 'Nuqtah Screen';
    homeLink = '/screen';
  } else if (isInstitute) {
    siteName = 'Nuqtah Institute';
    homeLink = '/institute';
  }

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      <DestinationBar />

      <div className="bg-[#FAF6F0]/92 backdrop-blur-md border-b border-[#322C26]/10 shadow-[0_4px_20px_-4px_rgba(50,44,38,0.05)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand Area */}
          <div className="flex items-center space-x-8">
            <Link
              to={homeLink}
              className="flex items-center space-x-3 group focus:outline-none"
              aria-label={siteName}
            >
              <div className="h-12 max-w-[170px] flex items-center justify-start overflow-hidden">
                <img
                  src={logoSrc}
                  alt={siteName}
                  className="h-10 sm:h-12 w-auto max-h-12 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-[13px] tracking-widest uppercase font-medium">
              {isShop ? (
                <>
                  <Link
                    to="/shop/men"
                    className={`transition-colors py-1 ${
                      path === '/shop/men'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Men
                  </Link>
                  <Link
                    to="/shop/women"
                    className={`transition-colors py-1 flex items-center space-x-1.5 ${
                      path.startsWith('/shop/women')
                        ? 'text-[#9E6B60] border-b-2 border-[#9E6B60] font-semibold'
                        : 'text-[#9E6B60]/90 hover:text-[#9E6B60]'
                    }`}
                  >
                    <span>Women</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#9E6B60]/10 text-[#9E6B60] rounded uppercase tracking-wider font-mono font-semibold">
                      Luxury
                    </span>
                  </Link>
                  <Link
                    to="/shop/kids"
                    className={`transition-colors py-1 ${
                      path.startsWith('/shop/kids')
                        ? 'text-[#99784D] border-b-2 border-[#99784D] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Kids
                  </Link>
                  <Link
                    to="/shop/attar"
                    className={`transition-colors py-1 ${
                      path.startsWith('/shop/attar')
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Attar
                  </Link>
                  <Link
                    to="/shop/organic-food"
                    className={`transition-colors py-1 ${
                      path.startsWith('/shop/organic-food')
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Organic Food
                  </Link>
                  <Link
                    to="/shop/collections"
                    className={`transition-colors py-1 ${
                      path === '/shop/collections'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Collections
                  </Link>
                </>
              ) : isScreen ? (
                <>
                  <Link
                    to="/screen/videos"
                    className={`transition-colors py-1 ${
                      path === '/screen/videos'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Videos
                  </Link>
                  <Link
                    to="/screen/series"
                    className={`transition-colors py-1 ${
                      path.startsWith('/screen/series')
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Series
                  </Link>
                  <Link
                    to="/screen/podcasts"
                    className={`transition-colors py-1 ${
                      path === '/screen/podcasts'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Podcasts
                  </Link>
                  <Link
                    to="/screen/quotes"
                    className={`transition-colors py-1 ${
                      path === '/screen/quotes'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Quotes
                  </Link>
                  <Link
                    to="/screen/speakers"
                    className={`transition-colors py-1 ${
                      path === '/screen/speakers'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Speakers
                  </Link>
                </>
              ) : isInstitute ? (
                <>
                  <Link
                    to="/institute/ayat"
                    className={`transition-colors py-1 ${
                      path === '/institute/ayat'
                        ? 'text-[#91713B] border-b-2 border-[#91713B] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Ayat
                  </Link>
                  <Link
                    to="/institute/articles"
                    className={`transition-colors py-1 ${
                      path.startsWith('/institute/articles')
                        ? 'text-[#91713B] border-b-2 border-[#91713B] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Articles
                  </Link>
                  <Link
                    to="/institute/topics"
                    className={`transition-colors py-1 ${
                      path === '/institute/topics'
                        ? 'text-[#91713B] border-b-2 border-[#91713B] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Topics
                  </Link>
                  <Link
                    to="/institute/resources"
                    className={`transition-colors py-1 ${
                      path === '/institute/resources'
                        ? 'text-[#91713B] border-b-2 border-[#91713B] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Resources
                  </Link>
                  <Link
                    to="/institute/courses"
                    className={`transition-colors py-1 ${
                      path === '/institute/courses'
                        ? 'text-[#91713B] border-b-2 border-[#91713B] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Courses
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/shop"
                    className="text-[#5C5247] hover:text-[#241F1B] transition-colors py-1"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/screen"
                    className="text-[#5C5247] hover:text-[#241F1B] transition-colors py-1"
                  >
                    Screen
                  </Link>
                  <Link
                    to="/institute"
                    className="text-[#5C5247] hover:text-[#241F1B] transition-colors py-1"
                  >
                    Institute
                  </Link>
                  <Link
                    to="/about"
                    className={`transition-colors py-1 ${
                      path === '/about'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    to="/journal"
                    className={`transition-colors py-1 ${
                      path === '/journal'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Journal
                  </Link>
                  <Link
                    to="/contact"
                    className={`transition-colors py-1 ${
                      path === '/contact'
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F] font-semibold'
                        : 'text-[#5C5247] hover:text-[#241F1B]'
                    }`}
                  >
                    Contact
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Link */}
            {isShop && (
              <Link
                to="/shop/search"
                className="p-2 text-[#5C5247] hover:text-[#241F1B] transition-colors rounded-full hover:bg-[#322C26]/[0.05]"
                aria-label="Search Shop"
              >
                <Search className="w-5 h-5" />
              </Link>
            )}

            {isScreen && (
              <Link
                to="/screen/search"
                className="p-2 text-[#5C5247] hover:text-[#241F1B] transition-colors rounded-full hover:bg-[#322C26]/[0.05]"
                aria-label="Search Screen"
              >
                <Search className="w-5 h-5" />
              </Link>
            )}

            {/* Wishlist Trigger */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-[#5C5247] hover:text-[#241F1B] transition-colors rounded-full hover:bg-[#322C26]/[0.05]"
              aria-label="Wishlist"
            >
              <Bookmark className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] bg-[#A6854F] text-white font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger (Shop) */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#5C5247] hover:text-[#241F1B] transition-colors rounded-full hover:bg-[#322C26]/[0.05] flex items-center space-x-1.5"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] bg-[#A6854F] text-white font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5C5247] hover:text-[#241F1B] lg:hidden rounded-md focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0]/98 backdrop-blur-md border-b border-[#322C26]/10 px-5 pt-4 pb-7 space-y-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase">
            {isShop ? (
              <>
                <Link
                  to="/shop/men"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Men
                </Link>
                <Link
                  to="/shop/women"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#9E6B60] font-semibold border-b border-[#322C26]/[0.06] flex justify-between items-center"
                >
                  <span>Women</span>
                  <span className="text-[10px] bg-[#9E6B60]/10 px-2 py-0.5 rounded text-[#9E6B60]">
                    Luxury Sanctuary
                  </span>
                </Link>
                <Link
                  to="/shop/kids"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#99784D] border-b border-[#322C26]/[0.06]"
                >
                  Kids
                </Link>
                <Link
                  to="/shop/attar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Attar
                </Link>
                <Link
                  to="/shop/organic-food"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Organic Food
                </Link>
                <Link
                  to="/shop/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Collections
                </Link>
              </>
            ) : isScreen ? (
              <>
                <Link
                  to="/screen/videos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Videos
                </Link>
                <Link
                  to="/screen/series"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Series
                </Link>
                <Link
                  to="/screen/podcasts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Podcasts
                </Link>
                <Link
                  to="/screen/quotes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Quotes
                </Link>
                <Link
                  to="/screen/speakers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Speakers
                </Link>
              </>
            ) : isInstitute ? (
              <>
                <Link
                  to="/institute/ayat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Ayat
                </Link>
                <Link
                  to="/institute/articles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Articles
                </Link>
                <Link
                  to="/institute/topics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Topics
                </Link>
                <Link
                  to="/institute/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Resources
                </Link>
                <Link
                  to="/institute/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Courses
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Shop
                </Link>
                <Link
                  to="/screen"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Screen
                </Link>
                <Link
                  to="/institute"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Institute
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  About
                </Link>
                <Link
                  to="/journal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Journal
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#5C5247] hover:text-[#241F1B] border-b border-[#322C26]/[0.06]"
                >
                  Contact
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
