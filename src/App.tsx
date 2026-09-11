import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { Header } from './components/navigation/Header';
import { Footer } from './components/footer/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';

// Site 1: Nuqtah Home Gateway & Pages
import { HomePage } from './apps/home/HomePage';
import { AboutPage } from './apps/home/AboutPage';
import { JournalPage } from './apps/home/JournalPage';
import { ContactPage } from './apps/home/ContactPage';
import { PrivacyPolicyPage } from './apps/home/PrivacyPolicyPage';
import { TermsConditionsPage } from './apps/home/TermsConditionsPage';
import { NotFoundPage } from './apps/home/NotFoundPage';

// Site 2: Nuqtah Shop
import { ShopHomePage } from './apps/shop/ShopHomePage';
import { MenShopPage } from './apps/shop/MenShopPage';
import { WomenShopPage } from './apps/shop/WomenShopPage';
import { KidsShopPage } from './apps/shop/KidsShopPage';
import { AttarShopPage } from './apps/shop/AttarShopPage';
import { OrganicFoodShopPage } from './apps/shop/OrganicFoodShopPage';
import { CollectionsPage } from './apps/shop/CollectionsPage';
import { OffersPage } from './apps/shop/OffersPage';
import { SearchPage } from './apps/shop/SearchPage';
import { ProductDetailPage } from './apps/shop/ProductDetailPage';

// Site 3: Nuqtah Screen
import { ScreenHomePage } from './apps/screen/ScreenHomePage';
import { VideosPage } from './apps/screen/VideosPage';
import { SeriesPage } from './apps/screen/SeriesPage';
import { PodcastsPage } from './apps/screen/PodcastsPage';
import { QuotesPage } from './apps/screen/QuotesPage';
import { SpeakersPage } from './apps/screen/SpeakersPage';
import { ScreenSearchPage } from './apps/screen/ScreenSearchPage';

// Site 4: Nuqtah Institute
import { InstituteHomePage } from './apps/institute/InstituteHomePage';
import { AyatPage } from './apps/institute/AyatPage';
import { ArticlesPage } from './apps/institute/ArticlesPage';
import { ArticleDetailPage } from './apps/institute/ArticleDetailPage';
import { TopicsPage } from './apps/institute/TopicsPage';
import { ResourcesPage } from './apps/institute/ResourcesPage';
import { CoursesPage } from './apps/institute/CoursesPage';

// Site 5: Admin Management
import { AdminApp } from './apps/admin/AdminApp';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper conditionally omitting main header/footer on admin routes
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppLayout>
                <Routes>
                  {/* Site 1: Nuqtah Home Gateway */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />

                  {/* Site 2: Nuqtah Shop */}
                  <Route path="/shop" element={<ShopHomePage />} />
                  <Route path="/shop/men" element={<MenShopPage />} />
                  <Route path="/shop/women" element={<WomenShopPage />} />
                  <Route path="/shop/kids" element={<KidsShopPage />} />
                  <Route path="/shop/attar" element={<AttarShopPage />} />
                  <Route path="/shop/organic-food" element={<OrganicFoodShopPage />} />
                  <Route path="/shop/collections" element={<CollectionsPage />} />
                  <Route path="/shop/offers" element={<OffersPage />} />
                  <Route path="/shop/search" element={<SearchPage />} />
                  <Route path="/shop/product/:slug" element={<ProductDetailPage />} />

                  {/* Site 3: Nuqtah Screen */}
                  <Route path="/screen" element={<ScreenHomePage />} />
                  <Route path="/screen/videos" element={<VideosPage />} />
                  <Route path="/screen/series" element={<SeriesPage />} />
                  <Route path="/screen/series/:slug" element={<SeriesPage />} />
                  <Route path="/screen/podcasts" element={<PodcastsPage />} />
                  <Route path="/screen/quotes" element={<QuotesPage />} />
                  <Route path="/screen/speakers" element={<SpeakersPage />} />
                  <Route path="/screen/search" element={<ScreenSearchPage />} />

                  {/* Site 4: Nuqtah Institute */}
                  <Route path="/institute" element={<InstituteHomePage />} />
                  <Route path="/institute/ayat" element={<AyatPage />} />
                  <Route path="/institute/articles" element={<ArticlesPage />} />
                  <Route path="/institute/article/:slug" element={<ArticleDetailPage />} />
                  <Route path="/institute/topics" element={<TopicsPage />} />
                  <Route path="/institute/resources" element={<ResourcesPage />} />
                  <Route path="/institute/courses" element={<CoursesPage />} />

                  {/* Site 5: Admin Management Console */}
                  <Route path="/admin/*" element={<AdminApp />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
