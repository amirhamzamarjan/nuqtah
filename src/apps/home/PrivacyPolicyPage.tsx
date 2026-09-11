import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../../lib/config';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#A6854F] hover:underline font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Nuqtah Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">Privacy Policy</h1>
          <p className="text-xs font-mono text-[#877B6E]">Last Updated: September 2026</p>
        </div>

        <div className="surface-card rounded-sm p-8 sm:p-12 bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm space-y-8 text-sm sm:text-base text-[#5C5247] font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">1. Information We Collect</h2>
            <p>
              Nuqtah respects your privacy and operates with minimal data collection. When you browse our ecosystem (nuqtah.com, shop.nuqtah.com, screen.nuqtah.com, institute.nuqtah.com):
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#5C5247]">
              <li>
                <strong>Browser Storage (Local Storage):</strong> We store your shopping bag items, saved wishlist items, and theme preferences directly in your browser so you do not lose your selections when returning.
              </li>
              <li>
                <strong>WhatsApp Order Details:</strong> When you initiate an order via our WhatsApp concierge, information such as your name, delivery address, selected items, and sizing is sent directly to our official WhatsApp channel ({APP_CONFIG.whatsAppNumber}).
              </li>
              <li>
                <strong>Direct Correspondence:</strong> If you contact us via email ({APP_CONFIG.supportEmail}), we collect your email address and message contents to respond to your inquiry.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">2. How Information Is Used</h2>
            <p>We use collected details solely for:</p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#5C5247]">
              <li>Fulfilling order requests, size consultations, and stock confirmations.</li>
              <li>Delivering media and educational content smoothly.</li>
              <li>Responding to scholarly submissions and customer service correspondence.</li>
            </ul>
            <p className="text-xs text-[#877B6E]">
              We never sell, rent, or trade your personal information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">3. Third-Party Services</h2>
            <p className="text-xs sm:text-sm text-[#5D554C] leading-relaxed">
              Our ecosystem utilizes Supabase for database management and authentication. On Nuqtah Screen, video players utilize privacy-enhanced YouTube embeds (youtube-nocookie.com) without third-party tracking pixels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">4. Data Security & Retention</h2>
            <p className="text-xs sm:text-sm text-[#5D554C] leading-relaxed">
              We apply industry-standard Row Level Security (RLS) policies on our PostgreSQL databases to protect all store and editorial records.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#322C26]/10">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">5. Contact Regarding Privacy</h2>
            <p className="text-xs sm:text-sm text-[#5D554C]">
              For any questions regarding our privacy practices, please contact us at{' '}
              <a href={`mailto:${APP_CONFIG.supportEmail}`} className="text-[#A6854F] hover:underline font-semibold">
                {APP_CONFIG.supportEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
