import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { store } from '../../lib/store';
import { ScreenQuote } from '../../types';

export const QuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<ScreenQuote[]>([]);

  useEffect(() => {
    const update = () => {
      setQuotes(store.getAllScreenQuotes().filter((q) => q.active));
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#201D1A] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Timeless Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#201D1A]">
            Scholarly Quotes & Aphorisms
          </h1>
          <p className="text-xs sm:text-sm text-[#595147] font-light leading-relaxed">
            Concise wisdom distilled from our video discourses and classical commentaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="surface-card bg-white rounded-sm p-8 border border-[#24201C]/[0.08] shadow-sm space-y-4 flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-[#B58B47]/30" />
              <p className="text-base font-serif text-[#201D1A] italic leading-relaxed font-normal">
                "{q.quote}"
              </p>
              <div className="pt-4 border-t border-[#24201C]/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-[#B58B47] font-bold">{q.speakerName}</span>
                {q.source && <span className="text-[#82786D]">{q.source}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
