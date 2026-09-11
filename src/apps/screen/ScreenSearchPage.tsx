import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { store } from '../../lib/store';
import { ScreenVideo, ScreenSpeaker } from '../../types';
import { MediaCard } from '../../components/ui/MediaCard';
import { VideoModal } from '../../components/video/VideoModal';

export const ScreenSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);
  const [activeVideo, setActiveVideo] = useState<ScreenVideo | null>(null);

  useEffect(() => {
    const update = () => {
      setVideos(store.getAllScreenVideos().filter((v) => v.active));
      setSpeakers(store.getScreenSpeakers());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const filtered = videos.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const matchTitle = v.title.toLowerCase().includes(q);
    const matchDesc = v.description.toLowerCase().includes(q);
    const matchTags = v.tags.some((t) => t.toLowerCase().includes(q));
    const speaker = speakers.find((s) => s.id === v.speakerId);
    const matchSpeaker = speaker?.name.toLowerCase().includes(q);
    return matchTitle || matchDesc || matchTags || matchSpeaker;
  });

  const getSpeakerName = (speakerId?: string) => {
    return speakers.find((s) => s.id === speakerId)?.name;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#201D1A] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Screen Search
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#201D1A]">
            Search Media & Discourses
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by discourse topic, speaker, or series..."
              className="w-full px-5 py-3.5 pl-12 bg-white border border-[#24201C]/15 rounded-sm text-sm text-[#201D1A] placeholder-[#595147]/50 focus:border-[#B58B47] focus:outline-none shadow-sm font-sans"
            />
            <Search className="w-5 h-5 text-[#82786D] absolute left-4 top-4" />
          </form>
        </div>

        <div className="flex justify-between items-center text-xs font-mono text-[#82786D] border-b border-[#24201C]/[0.08] pb-3">
          <span>Found {filtered.length} discourse(s)</span>
          {query && <span>Searching for: "{query}"</span>}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-sm border border-[#24201C]/10 p-12 shadow-sm">
            <p className="text-lg font-serif text-[#201D1A]">No discourses found.</p>
            <button
              onClick={() => {
                setQuery('');
                setSearchParams({});
              }}
              className="text-xs uppercase tracking-widest text-[#B58B47] underline font-mono font-semibold pt-2"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((vid) => (
              <MediaCard
                key={vid.id}
                type="video"
                item={vid}
                speakerName={getSpeakerName(vid.speakerId)}
                onPlay={() => setActiveVideo(vid)}
              />
            ))}
          </div>
        )}
      </div>

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          speakerName={getSpeakerName(activeVideo.speakerId)}
        />
      )}
    </div>
  );
};
