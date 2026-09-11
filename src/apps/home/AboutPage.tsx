import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../../lib/config';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            About Nuqtah
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">
            The Philosophy of The Point
          </h1>
          <p className="text-sm sm:text-base text-[#5C5247] font-light max-w-2xl mx-auto leading-relaxed">
            A digital ecosystem founded upon the harmony of material craftsmanship, thoughtful media discourses, and authentic Islamic learning.
          </p>
        </div>

        {/* Narrative */}
        <div className="surface-card rounded-sm p-8 sm:p-12 space-y-6 text-sm sm:text-base text-[#5C5247] font-light leading-relaxed bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm">
          <h2 className="text-2xl font-serif font-semibold text-[#241F1B]">Our Point of Origin</h2>
          <p>
            In traditional calligraphy, every stroke begins with a single dot of the reed pen: the <strong className="text-[#A6854F] font-serif font-semibold">Nuqtah</strong>. This humble point establishes the precise scale, proportion, and geometry of every subsequent letter.
          </p>
          <p>
            In our contemporary world, commerce often separates itself from sacred values, while media tends toward distraction. Nuqtah was created to restore unity: offering refined modest attire and pure botanical distillations, alongside serious scholarly discourses and contemplative Quranic insights.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 surface-card rounded-sm space-y-3 bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm">
            <Compass className="w-6 h-6 text-[#A6854F]" />
            <h3 className="text-lg font-serif font-semibold text-[#241F1B]">Intentionality</h3>
            <p className="text-xs text-[#5C5247] font-light leading-relaxed">
              Every garment silhouette, every video lecture, and every Arabic translation is chosen with deliberate care and ethical reverence.
            </p>
          </div>

          <div className="p-6 surface-card rounded-sm space-y-3 bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#A6854F]" />
            <h3 className="text-lg font-serif font-semibold text-[#241F1B]">Truthfulness</h3>
            <p className="text-xs text-[#5C5247] font-light leading-relaxed">
              We never publish artificial statistics, fabricated claims, or synthetic marketing. What you see reflects our real standards.
            </p>
          </div>

          <div className="p-6 surface-card rounded-sm space-y-3 bg-[#FDFBF7] border border-[#322C26]/10 shadow-sm">
            <Heart className="w-6 h-6 text-[#A6854F]" />
            <h3 className="text-lg font-serif font-semibold text-[#241F1B]">Quiet Luxury</h3>
            <p className="text-xs text-[#5C5247] font-light leading-relaxed">
              True luxury does not shout with gaudy logos. It speaks through fine Egyptian cotton weaves, natural aged ouds, and peaceful spaces.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-[#322C26]/10">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#241F1B] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded-sm hover:bg-[#352E28] transition-all shadow-md"
          >
            <span>Discover The Collections</span>
            <ArrowRight className="w-4 h-4 text-[#A6854F]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
