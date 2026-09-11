import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';
import { InstituteArticle } from '../../types';

interface ArticleCardProps {
  article: InstituteArticle;
  topicName?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, topicName }) => {
  return (
    <article className="surface-card rounded-sm overflow-hidden flex flex-col group bg-white border border-[#24201C]/[0.08] hover:border-[#B58B47]/40 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Article Cover Image */}
      <div className="relative aspect-[16/10] w-full bg-[#F4EFE6] overflow-hidden">
        <Link to={`/institute/article/${article.slug}`} className="block w-full h-full">
          <img
            src={article.coverImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {topicName && (
            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm bg-white/95 text-[#24201C] border border-[#24201C]/10 backdrop-blur-md font-semibold shadow-sm">
              {topicName}
            </span>
          )}
        </div>
      </div>

      {/* Article Meta & Excerpt */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-3 bg-white">
        <div>
          <div className="flex items-center space-x-3 text-xs text-[#8A8075] font-mono mb-1.5">
            <span>{article.author}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{article.readingTimeMinutes} min read</span>
            </span>
          </div>

          <Link
            to={`/institute/article/${article.slug}`}
            className="block text-lg font-serif font-semibold text-[#24201C] group-hover:text-[#B58B47] transition-colors line-clamp-2"
          >
            {article.title}
          </Link>

          <p className="text-xs text-[#5D554C] line-clamp-3 font-light leading-relaxed mt-2">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-[#24201C]/[0.06] flex items-center justify-between">
          <span className="text-xs text-[#8A8075] font-mono">
            {new Date(article.publishedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <Link
            to={`/institute/article/${article.slug}`}
            className="text-xs uppercase tracking-wider text-[#24201C] group-hover:text-[#B58B47] flex items-center space-x-1 font-semibold"
          >
            <span>Read Essay</span>
            <BookOpen className="w-3.5 h-3.5 ml-1 text-[#B58B47]" />
          </Link>
        </div>
      </div>
    </article>
  );
};
