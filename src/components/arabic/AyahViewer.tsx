import React from 'react';
import { InstituteAyah } from '../../types';
import { BookOpen, Sparkles } from 'lucide-react';

interface AyahViewerProps {
  ayah: InstituteAyah;
  showReflection?: boolean;
}

export const AyahViewer: React.FC<AyahViewerProps> = ({ ayah, showReflection = true }) => {
  return (
    <div className="surface-card rounded-sm p-6 sm:p-10 bg-white border border-[#24201C]/[0.08] shadow-sm relative overflow-hidden">
      {/* Subtle Background Ornament */}
      <div className="absolute top-0 right-0 p-8 text-[#24201C]/[0.02] pointer-events-none select-none font-serif text-9xl">
        ﷽
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-[#24201C]/[0.08] pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#B58B47]" />
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            {ayah.reference}
          </span>
        </div>
        <div className="text-xs text-[#5D554C] font-serif font-medium">
          سورة {ayah.surahNameArabic} ({ayah.surahNameEnglish})
        </div>
      </div>

      {/* Main Quranic Arabic Typography */}
      <div className="my-8 text-center sm:text-right">
        <p
          className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#181513] leading-[2.4] sm:leading-[2.7] tracking-wide font-normal"
          dir="rtl"
        >
          {ayah.arabicText}
          <span className="inline-block mx-2 text-[#B58B47] font-arabic text-2xl">
            ۝
          </span>
        </p>
      </div>

      {/* English Translation */}
      <div className="my-6 pt-6 border-t border-[#24201C]/[0.06]">
        <p className="text-sm sm:text-base text-[#24201C]/90 font-serif italic leading-relaxed text-center sm:text-left">
          "{ayah.translation}"
        </p>
      </div>

      {/* Scholarly Reflection */}
      {showReflection && ayah.reflection && (
        <div className="mt-6 p-5 bg-[#FAF6EF] rounded-sm border border-[#B58B47]/20">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#5D554C] font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B58B47]" />
            <span>Tadabbur / Scholarly Reflection</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5D554C] font-light leading-relaxed">
            {ayah.reflection}
          </p>
        </div>
      )}
    </div>
  );
};
