import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, BookOpen, FileText } from 'lucide-react';
import { store } from '../../lib/store';
import { InstituteAyah, InstituteArticle, InstituteTopic } from '../../types';

export const AdminInstituteTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'ayat' | 'articles' | 'topics'>('ayat');
  const [ayat, setAyat] = useState<InstituteAyah[]>([]);
  const [articles, setArticles] = useState<InstituteArticle[]>([]);
  const [topics, setTopics] = useState<InstituteTopic[]>([]);

  // Ayah Form
  const [isAyahModal, setIsAyahModal] = useState(false);
  const [arabicText, setArabicText] = useState('');
  const [translation, setTranslation] = useState('');
  const [surahNameArabic, setSurahNameArabic] = useState('البقرة');
  const [surahNameEnglish, setSurahNameEnglish] = useState('Al-Baqarah');
  const [surahNumber, setSurahNumber] = useState<number>(2);
  const [ayahNumber, setAyahNumber] = useState<number>(255);
  const [reference, setReference] = useState('Surah Al-Baqarah 2:255');
  const [reflection, setReflection] = useState('');
  const [ayahFeatured, setAyahFeatured] = useState(false);

  // Article Form
  const [isArticleModal, setIsArticleModal] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artSlug, setArtSlug] = useState('');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artCover, setArtCover] = useState('');
  const [artAuthor, setArtAuthor] = useState('Editorial Fellow, Nuqtah Institute');
  const [artReadingTime, setArtReadingTime] = useState<number>(5);

  useEffect(() => {
    const update = () => {
      setAyat(store.getAllInstituteAyat());
      setArticles(store.getAllInstituteArticles());
      setTopics(store.getInstituteTopics());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleSaveAyah = (e: React.FormEvent) => {
    e.preventDefault();
    const ayahToSave: InstituteAyah = {
      id: `ayah-${Date.now()}`,
      arabicText,
      translation,
      surahNameArabic,
      surahNameEnglish,
      surahNumber: Number(surahNumber),
      ayahNumber: Number(ayahNumber),
      reference: reference || `Surah ${surahNameEnglish} ${surahNumber}:${ayahNumber}`,
      reflection,
      topicId: topics[0]?.id,
      featured: ayahFeatured,
      published: true,
      createdAt: new Date().toISOString(),
    };
    store.saveInstituteAyah(ayahToSave);
    setIsAyahModal(false);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const articleToSave: InstituteArticle = {
      id: `art-${Date.now()}`,
      title: artTitle,
      slug: artSlug || artTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: artExcerpt,
      content: artContent,
      coverImage: artCover,
      author: artAuthor,
      readingTimeMinutes: Number(artReadingTime),
      publishedAt: new Date().toISOString(),
      featured: false,
      tags: ['institute', 'research'],
      active: true,
    };
    store.saveInstituteArticle(articleToSave);
    setIsArticleModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24201C]/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Knowledge Platform
          </span>
          <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Institute Content Management</h1>
        </div>

        {activeSubTab === 'ayat' && (
          <button
            onClick={() => {
              setArabicText('اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ');
              setTranslation('Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.');
              setSurahNameArabic('البقرة');
              setSurahNameEnglish('Al-Baqarah');
              setSurahNumber(2);
              setAyahNumber(255);
              setReference('Surah Al-Baqarah 2:255');
              setReflection('The foundational declaration of divine sovereignty and unconditioned sustenance.');
              setAyahFeatured(false);
              setIsAyahModal(true);
            }}
            className="px-5 py-2.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-[#B58B47]" />
            <span>Add Quranic Ayah</span>
          </button>
        )}

        {activeSubTab === 'articles' && (
          <button
            onClick={() => {
              setArtTitle('');
              setArtSlug('');
              setArtExcerpt('');
              setArtContent('');
              setArtCover('https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80');
              setArtAuthor('Editorial Fellow, Nuqtah Institute');
              setArtReadingTime(5);
              setIsArticleModal(true);
            }}
            className="px-5 py-2.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-[#B58B47]" />
            <span>Publish Article</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-2 text-xs font-mono">
        <button
          onClick={() => setActiveSubTab('ayat')}
          className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
            activeSubTab === 'ayat'
              ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
              : 'bg-white text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10 shadow-sm'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ayat Reflections ({ayat.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('articles')}
          className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
            activeSubTab === 'articles'
              ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
              : 'bg-white text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10 shadow-sm'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Articles ({articles.length})</span>
        </button>
      </div>

      {/* Ayat Table */}
      {activeSubTab === 'ayat' && (
        <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Surah</th>
                <th className="p-4">Translation Excerpt</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {ayat.map((a) => (
                <tr key={a.id} className="hover:bg-[#FAF6EF]/50">
                  <td className="p-4 font-bold text-[#B58B47]">{a.reference}</td>
                  <td className="p-4 text-[#24201C] font-serif font-semibold">{a.surahNameEnglish} ({a.surahNameArabic})</td>
                  <td className="p-4 text-[#5D554C] truncate max-w-md italic">{a.translation}</td>
                  <td className="p-4">{a.featured ? <span className="text-emerald-700 font-bold">Yes</span> : <span className="text-[#8A8075]">No</span>}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => store.deleteInstituteAyah(a.id)}
                      className="p-1 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Articles Table */}
      {activeSubTab === 'articles' && (
        <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Read Time</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-[#FAF6EF]/50">
                  <td className="p-4 font-semibold text-[#24201C]">{art.title}</td>
                  <td className="p-4 text-[#5D554C]">{art.author}</td>
                  <td className="p-4 text-[#B58B47] font-bold">{art.readingTimeMinutes} min</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => store.deleteInstituteArticle(art.id)}
                      className="p-1 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Ayah Modal */}
      {isAyahModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-lg w-full border border-[#24201C]/10 space-y-4 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif text-[#24201C] font-semibold">Add Quranic Ayah</h3>
              <button onClick={() => setIsAyahModal(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSaveAyah} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Arabic Text (Uthmani / Amiri Font)</label>
                <textarea
                  rows={3}
                  required
                  dir="rtl"
                  value={arabicText}
                  onChange={(e) => setArabicText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#181513] font-arabic text-xl leading-loose"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">English Translation</label>
                <textarea
                  rows={2}
                  required
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] italic font-serif text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Surah (English)</label>
                  <input
                    type="text"
                    required
                    value={surahNameEnglish}
                    onChange={(e) => setSurahNameEnglish(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Surah (Arabic)</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={surahNameArabic}
                    onChange={(e) => setSurahNameArabic(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] font-arabic text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Surah #</label>
                  <input
                    type="number"
                    required
                    value={surahNumber}
                    onChange={(e) => setSurahNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Ayah #</label>
                  <input
                    type="number"
                    required
                    value={ayahNumber}
                    onChange={(e) => setAyahNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Featured</label>
                  <select
                    value={ayahFeatured ? 'yes' : 'no'}
                    onChange={(e) => setAyahFeatured(e.target.value === 'yes')}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Tadabbur / Scholarly Reflection</label>
                <textarea
                  rows={3}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAyahModal(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Save Ayah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {isArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-lg w-full border border-[#24201C]/10 space-y-4 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif text-[#24201C] font-semibold">Publish Essay</h3>
              <button onClick={() => setIsArticleModal(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Essay Title</label>
                <input
                  type="text"
                  required
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Author</label>
                <input
                  type="text"
                  required
                  value={artAuthor}
                  onChange={(e) => setArtAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={artCover}
                  onChange={(e) => setArtCover(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={artExcerpt}
                  onChange={(e) => setArtExcerpt(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Full Article Content</label>
                <textarea
                  rows={5}
                  required
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsArticleModal(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Publish Essay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
