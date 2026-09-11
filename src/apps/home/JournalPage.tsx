import React from 'react';
import { store } from '../../lib/store';
import { ArticleCard } from '../../components/ui/ArticleCard';

export const JournalPage: React.FC = () => {
  const articles = store.getInstituteArticles();

  return (
    <div className="min-h-screen bg-[#F2ECE4] text-[#241F1B] py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
            Journal & Reflections
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#241F1B]">
            Ecosystem Notes & Essays
          </h1>
          <p className="text-sm text-[#5C5247] font-light leading-relaxed">
            Explorations into traditional craftsmanship, aesthetics, sacred time consciousness, and cultural essays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} topicName="Editorial Note" />
          ))}
        </div>
      </div>
    </div>
  );
};
