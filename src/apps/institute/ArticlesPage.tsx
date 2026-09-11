import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { InstituteArticle, InstituteTopic } from '../../types';
import { ArticleCard } from '../../components/ui/ArticleCard';

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<InstituteArticle[]>([]);
  const [topics, setTopics] = useState<InstituteTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  useEffect(() => {
    const update = () => {
      setArticles(store.getInstituteArticles());
      setTopics(store.getInstituteTopics());
    };
    update();
    return store.subscribe(update);
  }, []);

  const filtered = selectedTopic === 'all'
    ? articles
    : articles.filter((a) => a.topicId === selectedTopic);

  const getTopicName = (topicId?: string) => {
    return topics.find((t) => t.id === topicId)?.name;
  };

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#91713B] font-mono font-semibold">
            Scholarly Publications
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1F1B17]">
            Essays & Research Papers
          </h1>
          <p className="text-xs sm:text-sm text-[#544C41] font-light leading-relaxed">
            In-depth explorations into Quranic themes, ethics, character, and Islamic intellectual history.
          </p>
        </div>

        {/* Topic Filters */}
        <div className="flex items-center justify-center space-x-3 overflow-x-auto py-2">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-5 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
              selectedTopic === 'all'
                ? 'bg-[#241F1B] text-[#FAF4EB] font-bold shadow-md'
                : 'bg-[#FAF5EC] text-[#544C41] hover:text-[#1F1B17] border border-[#322C26]/10 shadow-sm'
            }`}
          >
            All Essays ({articles.length})
          </button>
          {topics.map((top) => (
            <button
              key={top.id}
              onClick={() => setSelectedTopic(top.id)}
              className={`px-5 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
                selectedTopic === top.id
                  ? 'bg-[#241F1B] text-[#FAF4EB] font-bold shadow-md'
                  : 'bg-[#FAF5EC] text-[#544C41] hover:text-[#1F1B17] border border-[#322C26]/10 shadow-sm'
              }`}
            >
              {top.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <ArticleCard key={art.id} article={art} topicName={getTopicName(art.topicId)} />
          ))}
        </div>
      </div>
    </div>
  );
};
