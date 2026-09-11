import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { store } from '../../lib/store';
import { InstituteTopic, InstituteArticle, InstituteAyah } from '../../types';

export const TopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<InstituteTopic[]>([]);
  const [articles, setArticles] = useState<InstituteArticle[]>([]);
  const [ayat, setAyat] = useState<InstituteAyah[]>([]);

  useEffect(() => {
    const update = () => {
      setTopics(store.getInstituteTopics());
      setArticles(store.getInstituteArticles());
      setAyat(store.getInstituteAyat());
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
            Knowledge Map
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1F1B17]">
            Curriculum Topics
          </h1>
          <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
            Browse knowledge indexed across Quranic contemplation, character formation, and sacred epistemology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topics.map((top) => {
            const topicArticles = articles.filter((a) => a.topicId === top.id);
            const topicAyat = ayat.filter((a) => a.topicId === top.id);

            return (
              <div key={top.id} className="surface-card bg-[#FDFBF8] rounded-sm p-8 border border-[#322C26]/10 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#91713B] font-semibold">
                    Topic Cluster
                  </span>
                  <h3 className="text-2xl font-serif font-semibold text-[#1F1B17]">{top.name}</h3>
                  <p className="text-xs text-[#544C41] font-light leading-relaxed">
                    {top.description}
                  </p>

                  <div className="pt-3 border-t border-[#322C26]/10 flex items-center space-x-4 text-xs font-mono text-[#7E7467]">
                    <span>{topicArticles.length} Essay(s)</span>
                    <span>•</span>
                    <span>{topicAyat.length} Verse(s)</span>
                  </div>
                </div>

                <Link
                  to={`/institute/articles?topic=${top.id}`}
                  className="pt-4 border-t border-[#322C26]/10 text-xs uppercase tracking-widest text-[#1F1B17] hover:text-[#91713B] flex items-center justify-between font-bold font-mono"
                >
                  <span>Browse Articles in Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#91713B]" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
