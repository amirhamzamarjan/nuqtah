import React, { useState, useEffect } from 'react';
import { store } from '../../lib/store';
import { ScreenPodcast, ScreenSpeaker } from '../../types';
import { WaveformPlayer } from '../../components/audio/WaveformPlayer';

export const PodcastsPage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<ScreenPodcast[]>([]);
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);

  useEffect(() => {
    const update = () => {
      setPodcasts(store.getAllScreenPodcasts().filter((p) => p.active));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Audio Archive
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#201D1A]">
            Nuqtah Podcast Series
          </h1>
          <p className="text-xs sm:text-sm text-[#595147] font-light leading-relaxed">
            Spoken reflections on aesthetics, character development, and classical philosophy with custom interactive waveform playback.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {podcasts.map((pod) => (
            <WaveformPlayer
              key={pod.id}
              podcast={pod}
              speakerName={getSpeakerName(pod.speakerId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
