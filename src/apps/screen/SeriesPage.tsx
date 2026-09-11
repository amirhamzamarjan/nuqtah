import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { ScreenSeries, ScreenVideo, ScreenSpeaker } from '../../types';
import { MediaCard } from '../../components/ui/MediaCard';
import { VideoModal } from '../../components/video/VideoModal';

export const SeriesPage: React.FC = () => {
  const [seriesList, setSeriesList] = useState<ScreenSeries[]>([]);
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);
  const [activeVideo, setActiveVideo] = useState<ScreenVideo | null>(null);

  useEffect(() => {
    const update = () => {
      setSeriesList(store.getScreenSeries());
      setVideos(store.getAllScreenVideos().filter((v) => v.active));
      setSpeakers(store.getScreenSpeakers());
    };
    update();
    return store.subscribe(update);
  }, []);

  const getSpeakerName = (speakerId?: string) => {
    return speakers.find((s) => s.id === speakerId)?.name;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#201D1A] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Sequential Discourses
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#201D1A]">
            Curated Lecture Series
          </h1>
          <p className="text-xs sm:text-sm text-[#595147] font-light leading-relaxed">
            Multidisciplinary journeys exploring spiritual purification, metaphysical foundations, and sacred aesthetics.
          </p>
        </div>

        <div className="space-y-16">
          {seriesList.map((ser) => {
            const seriesVideos = videos.filter((v) => v.seriesId === ser.id);
            return (
              <div key={ser.id} className="surface-card bg-white rounded-sm p-6 sm:p-10 border border-[#24201C]/[0.08] shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center border-b border-[#24201C]/[0.08] pb-8">
                  <img
                    src={ser.coverImage}
                    alt={ser.title}
                    className="w-full md:w-72 aspect-video object-cover rounded-sm border border-[#24201C]/10 shadow-sm"
                  />
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#B58B47] font-semibold">
                      Series Showcase
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#201D1A] font-semibold">{ser.title}</h2>
                    <p className="text-xs sm:text-sm text-[#595147] leading-relaxed font-light">
                      {ser.description}
                    </p>
                    {ser.speakerId && (
                      <span className="text-xs font-mono text-[#82786D] block">
                        Speaker: <strong className="text-[#201D1A]">{getSpeakerName(ser.speakerId)}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Episodes Grid */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#595147] font-semibold">
                    Episodes in this Series ({seriesVideos.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seriesVideos.map((vid) => (
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
              </div>
            );
          })}
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
