import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { ScreenVideo, ScreenCategory, ScreenSpeaker } from '../../types';
import { MediaCard } from '../../components/ui/MediaCard';
import { VideoModal } from '../../components/video/VideoModal';
import { useTheme } from '../../context/ThemeContext';

export const VideosPage: React.FC = () => {
  const { setTheme } = useTheme();
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [categories, setCategories] = useState<ScreenCategory[]>([]);
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<ScreenVideo | null>(null);

  useEffect(() => {
    setTheme('screen');
    const update = () => {
      setVideos(store.getAllScreenVideos().filter((v) => v.active));
      setCategories(store.getScreenVideos().length ? [
        { id: 'scat-nasihah', name: 'Nasihah / Advice', slug: 'nasihah', active: true, order: 1 },
        { id: 'scat-discourses', name: 'Scholarly Discourses', slug: 'discourses', active: true, order: 2 },
        { id: 'scat-short-clips', name: 'Short Clips', slug: 'short-clips', active: true, order: 3 },
      ] : []);
      setSpeakers(store.getScreenSpeakers());
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  const filtered = selectedCat === 'all'
    ? videos
    : videos.filter((v) => v.categoryId === selectedCat);

  const getSpeakerName = (speakerId?: string) => {
    return speakers.find((s) => s.id === speakerId)?.name;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#201D1A] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Cinematic Archive
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#201D1A]">
            Video Discourses
          </h1>
          <p className="text-xs sm:text-sm text-[#595147] font-light">
            In-depth lectures, heart-softening nasihah, and philosophical explorations.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center space-x-3 overflow-x-auto py-2">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-5 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
              selectedCat === 'all'
                ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-md'
                : 'bg-white text-[#595147] hover:text-[#201D1A] border border-[#24201C]/10 shadow-sm'
            }`}
          >
            All Videos ({videos.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-5 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all ${
                selectedCat === cat.id
                  ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-md'
                  : 'bg-white text-[#595147] hover:text-[#201D1A] border border-[#24201C]/10 shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
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
