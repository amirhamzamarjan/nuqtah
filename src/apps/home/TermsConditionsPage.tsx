import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../../lib/config';

export const TermsConditionsPage: React.FC = () => {
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
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">Terms & Conditions</h1>
          <p className="text-xs font-mono text-[#877B6E]">Last Updated: September 2026</p>
        </div>

        <div className="surface-card rounded-sm p-8 sm:p-12 bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm space-y-8 text-sm sm:text-base text-[#5C5247] font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">1. Ecosystem Scope & Acceptance</h2>
            <p>
              By accessing and using the Nuqtah digital ecosystem (nuqtah.com, shop.nuqtah.com, screen.nuqtah.com, institute.nuqtah.com), you agree to comply with and be bound by these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">2. Boutique Commerce & WhatsApp Ordering</h2>
            <p>
              Customer orders on Nuqtah Shop are initiated via our official WhatsApp Concierge ({APP_CONFIG.whatsAppNumber}).
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#5C5247]">
              <li>
                <strong>Inquiry & Confirmation:</strong> Placing an item in your bag or clicking "Order on WhatsApp" initiates a consultation with our team. An order is legally confirmed only after our team verifies real-time stock availability and issues payment instructions.
              </li>
              <li>
                <strong>Product Pricing & Currency:</strong> All prices are displayed in Bangladeshi Taka ({APP_CONFIG.currencySymbol}) including applicable promotional reductions.
              </li>
              <li>
                <strong>Fabric & Distillation Characteristics:</strong> Natural materials (Egyptian cottons, raw silks, botanical attars, wild honeys) may exhibit subtle variations in weave texture or vintage aging, which are hallmarks of authentic artisan craft.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">3. Intellectual Property & Media Rights</h2>
            <p className="text-xs sm:text-sm text-[#5D554C] leading-relaxed">
              All visual designs, product descriptions, video discourses on Nuqtah Screen, and research essays published by Nuqtah Institute are the intellectual property of Nuqtah. Quranic translations and classical commentaries remain sacred public heritage presented with respectful attribution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">4. Disclaimers</h2>
            <p className="text-xs sm:text-sm text-[#5D554C] leading-relaxed">
              Products in our Organic Food department are natural agricultural foods and are not intended as medicinal treatments. Care instructions should be strictly followed for raw silks and fine cottons.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#322C26]/10">
            <h2 className="text-xl font-serif font-semibold text-[#241F1B]">5. Governing Law</h2>
            <p className="text-xs sm:text-sm text-[#5D554C]">
              These terms are governed by the laws of Bangladesh. For any inquiries, please contact{' '}
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
