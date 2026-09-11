import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Tv, Mic, Quote } from 'lucide-react';
import { store } from '../../lib/store';
import { ScreenVideo, ScreenPodcast, ScreenQuote, ScreenSpeaker } from '../../types';

export const AdminScreenTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'videos' | 'podcasts' | 'quotes' | 'speakers'>('videos');
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [podcasts, setPodcasts] = useState<ScreenPodcast[]>([]);
  const [quotes, setQuotes] = useState<ScreenQuote[]>([]);
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);

  // Video Form
  const [isVideoModal, setIsVideoModal] = useState(false);
  const [vidTitle, setVidTitle] = useState('');
  const [vidSlug, setVidSlug] = useState('');
  const [vidYtUrl, setVidYtUrl] = useState('');
  const [vidYtId, setVidYtId] = useState('');
  const [vidThumb, setVidThumb] = useState('');
  const [vidDesc, setVidDesc] = useState('');
  const [vidDuration, setVidDuration] = useState('25:00');
  const [vidFeatured, setVidFeatured] = useState(false);

  // Quote Form
  const [isQuoteModal, setIsQuoteModal] = useState(false);
  const [quoteText, setQuoteText] = useState('');
  const [quoteSpeaker, setQuoteSpeaker] = useState('');
  const [quoteSource, setQuoteSource] = useState('');

  useEffect(() => {
    const update = () => {
      setVideos(store.getAllScreenVideos());
      setPodcasts(store.getAllScreenPodcasts());
      setQuotes(store.getAllScreenQuotes());
      setSpeakers(store.getScreenSpeakers());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const videoToSave: ScreenVideo = {
      id: `vid-${Date.now()}`,
      title: vidTitle,
      slug: vidSlug || vidTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      youtubeUrl: vidYtUrl,
      youtubeId: vidYtId || 'dQw4w9WgXcQ',
      thumbnail: vidThumb,
      description: vidDesc,
      categoryId: 'scat-nasihah',
      speakerId: speakers[0]?.id,
      duration: vidDuration,
      publishedAt: new Date().toISOString(),
      featured: vidFeatured,
      tags: ['discourse', 'screen'],
      active: true,
    };
    store.saveScreenVideo(videoToSave);
    setIsVideoModal(false);
  };

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const quoteToSave: ScreenQuote = {
      id: `quote-${Date.now()}`,
      quote: quoteText,
      speakerName: quoteSpeaker,
      source: quoteSource,
      publishedAt: new Date().toISOString(),
      featured: true,
      active: true,
    };
    store.saveScreenQuote(quoteToSave);
    setIsQuoteModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24201C]/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Media Platform
          </span>
          <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Screen Media Management</h1>
        </div>

        {activeSection === 'videos' && (
          <button
            onClick={() => {
              setVidTitle('');
              setVidSlug('');
              setVidYtUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
              setVidYtId('dQw4w9WgXcQ');
              setVidThumb('https://images.unsplash.com/photo-1507842229450-c6d5952d790f?auto=format&fit=crop&w=1200&q=80');
              setVidDesc('Spiritual reflection on purpose and presence.');
              setVidDuration('28:45');
              setVidFeatured(false);
              setIsVideoModal(true);
            }}
            className="px-5 py-2.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-[#B58B47]" />
            <span>Add Video</span>
          </button>
        )}

        {activeSection === 'quotes' && (
          <button
            onClick={() => {
              setQuoteText('');
              setQuoteSpeaker(speakers[0]?.name || 'Shaykh Abdal Hakim Murad');
              setQuoteSource('Traveling Light Series');
              setIsQuoteModal(true);
            }}
            className="px-5 py-2.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-[#B58B47]" />
            <span>Add Quote</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-2 text-xs font-mono">
        <button
          onClick={() => setActiveSection('videos')}
          className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
            activeSection === 'videos'
              ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
              : 'bg-white text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10 shadow-sm'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>Videos ({videos.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('podcasts')}
          className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
            activeSection === 'podcasts'
              ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
              : 'bg-white text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10 shadow-sm'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Podcasts ({podcasts.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('quotes')}
          className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
            activeSection === 'quotes'
              ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
              : 'bg-white text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10 shadow-sm'
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          <span>Quotes ({quotes.length})</span>
        </button>
      </div>

      {/* Videos View */}
      {activeSection === 'videos' && (
        <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Duration</th>
                <th className="p-4">YouTube ID</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {videos.map((vid) => (
                <tr key={vid.id} className="hover:bg-[#FAF6EF]/50">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={vid.thumbnail} alt="" className="w-12 h-8 object-cover rounded bg-[#F4EFE6] border border-[#24201C]/10" />
                    <span className="text-[#24201C] font-semibold truncate max-w-sm">{vid.title}</span>
                  </td>
                  <td className="p-4 text-[#5D554C]">{vid.duration}</td>
                  <td className="p-4 text-[#B58B47] font-bold">{vid.youtubeId}</td>
                  <td className="p-4">{vid.featured ? <span className="text-emerald-700 font-bold">Yes</span> : <span className="text-[#8A8075]">No</span>}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => store.deleteScreenVideo(vid.id)}
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

      {/* Quotes View */}
      {activeSection === 'quotes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((q) => (
            <div key={q.id} className="p-5 surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm space-y-3 flex flex-col justify-between">
              <p className="text-sm font-serif text-[#24201C] italic font-normal">"{q.quote}"</p>
              <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-[#24201C]/[0.06]">
                <span className="text-[#B58B47] font-bold">{q.speakerName}</span>
                <button
                  onClick={() => store.deleteScreenQuote(q.id)}
                  className="p-1 text-[#8A8075] hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {isVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-lg w-full border border-[#24201C]/10 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif text-[#24201C] font-semibold">Add Video Discourse</h3>
              <button onClick={() => setIsVideoModal(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={vidTitle}
                  onChange={(e) => setVidTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">YouTube Video ID</label>
                <input
                  type="text"
                  required
                  value={vidYtId}
                  onChange={(e) => setVidYtId(e.target.value)}
                  placeholder="e.g. dQw4w9WgXcQ"
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  required
                  value={vidThumb}
                  onChange={(e) => setVidThumb(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={vidDuration}
                    onChange={(e) => setVidDuration(e.target.value)}
                    placeholder="28:45"
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Featured on Screen Home</label>
                  <select
                    value={vidFeatured ? 'yes' : 'no'}
                    onChange={(e) => setVidFeatured(e.target.value === 'yes')}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={vidDesc}
                  onChange={(e) => setVidDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModal(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {isQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-md w-full border border-[#24201C]/10 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif text-[#24201C] font-semibold">Add Scholarly Quote</h3>
              <button onClick={() => setIsQuoteModal(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSaveQuote} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Quote Text</label>
                <textarea
                  rows={3}
                  required
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Speaker Name</label>
                <input
                  type="text"
                  required
                  value={quoteSpeaker}
                  onChange={(e) => setQuoteSpeaker(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Source Series / Lecture</label>
                <input
                  type="text"
                  value={quoteSource}
                  onChange={(e) => setQuoteSource(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsQuoteModal(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
