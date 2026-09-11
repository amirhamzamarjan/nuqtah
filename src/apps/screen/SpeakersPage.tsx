import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { ScreenSpeaker, ScreenVideo } from '../../types';
import { MediaCard } from '../../components/ui/MediaCard';
import { VideoModal } from '../../components/video/VideoModal';

export const SpeakersPage: React.FC = () => {
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<ScreenVideo | null>(null);

  useEffect(() => {
    const update = () => {
      setSpeakers(store.getScreenSpeakers());
      setVideos(store.getAllScreenVideos().filter((v) => v.active));
    };
    update();
    return store.subscribe(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#201D1A] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Esteemed Contributors
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#201D1A]">
            Speakers & Teachers
          </h1>
          <p className="text-xs sm:text-sm text-[#595147] font-light leading-relaxed">
            Leading scholars and thinkers featured across our cinematic discourses and audio recordings.
          </p>
        </div>

        <div className="space-y-16">
          {speakers.map((spk) => {
            const speakerVideos = videos.filter((v) => v.speakerId === spk.id);
            return (
              <div key={spk.id} className="surface-card bg-white rounded-sm p-6 sm:p-10 border border-[#24201C]/[0.08] shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b border-[#24201C]/[0.08] pb-6">
                  {spk.photoUrl ? (
                    <img
                      src={spk.photoUrl}
                      alt={spk.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#B58B47]/40 shadow-sm flex-shrink-0"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#FAF6EF] border border-[#24201C]/10 flex items-center justify-center text-xl font-serif text-[#B58B47] font-bold">
                      {spk.name.charAt(0)}
                    </div>
                  )}

                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#B58B47] font-semibold">
                      Faculty Contributor
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-[#24201C]">{spk.name}</h3>
                    <p className="text-xs font-mono text-[#82786D]">{spk.title}</p>
                    <p className="text-xs sm:text-sm text-[#595147] font-light leading-relaxed max-w-2xl">
                      {spk.bio}
                    </p>
                  </div>
                </div>

                {/* Speaker Videos Grid */}
                {speakerVideos.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#595147] font-semibold">
                      Discourses by {spk.name} ({speakerVideos.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {speakerVideos.map((vid) => (
                        <MediaCard
                          key={vid.id}
                          type="video"
                          item={vid}
                          speakerName={spk.name}
                          onPlay={() => setActiveVideo(vid)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          speakerName={speakers.find((s) => s.id === activeVideo.speakerId)?.name}
        />
      )}
    </div>
  );
};
