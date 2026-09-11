import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, Share2, Check } from 'lucide-react';
import { store } from '../../lib/store';
import { InstituteArticle } from '../../types';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<InstituteArticle | undefined>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      setArticle(store.getInstituteArticleBySlug(slug));
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-[70vh] bg-[#EFE9DF] flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#1F1B17]">
        <h2 className="text-2xl font-serif text-[#1F1B17] font-semibold">Essay Not Found</h2>
        <Link
          to="/institute/articles"
          className="px-6 py-2.5 bg-[#241F1B] text-[#FAF4EB] text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          Return to Articles
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#1F1B17] py-16 transition-colors duration-300">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          to="/institute/articles"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#91713B] hover:underline font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-[#322C26]/10 pb-8">
          <div className="flex items-center justify-between text-xs font-mono text-[#7E7467]">
            <span>By {article.author}</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTimeMinutes} min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#1F1B17] leading-tight font-normal">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#544C41] font-light italic leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2 flex justify-between items-center text-xs font-mono text-[#7E7467]">
            <span>{new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-[#91713B] hover:underline font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Essay'}</span>
            </button>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="aspect-[16/9] rounded-sm overflow-hidden border border-[#322C26]/10 bg-[#FAF5EC] shadow-sm">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-base sm:text-lg text-[#1F1B17]/90 font-light leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        {/* Author Footnote */}
        <div className="p-6 bg-[#FAF5EC] rounded-sm border border-[#322C26]/10 shadow-sm space-y-2 text-xs">
          <span className="font-mono uppercase tracking-widest text-[#91713B] font-semibold block">
            Publication Note
          </span>
          <p className="text-[#544C41] font-light leading-relaxed">
            Authored by {article.author} for the Nuqtah Institute research repository. All publications undergo editorial review for fidelity to classical commentary and linguistic precision.
          </p>
        </div>
      </article>
    </div>
  );
};
