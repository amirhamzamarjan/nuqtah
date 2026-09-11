import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Quote, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { YouTubeIcon } from '../../components/ui/Icons';
import { store } from '../../lib/store';
import { ScreenVideo, ScreenPodcast, ScreenQuote, ScreenSpeaker, ScreenSeries } from '../../types';
import { MediaCard } from '../../components/ui/MediaCard';
import { WaveformPlayer } from '../../components/audio/WaveformPlayer';
import { VideoModal } from '../../components/video/VideoModal';
import { useTheme } from '../../context/ThemeContext';
import { APP_CONFIG } from '../../lib/config';

export const ScreenHomePage: React.FC = () => {
  const { setTheme } = useTheme();
  const [videos, setVideos] = useState<ScreenVideo[]>([]);
  const [podcasts, setPodcasts] = useState<ScreenPodcast[]>([]);
  const [quotes, setQuotes] = useState<ScreenQuote[]>([]);
  const [speakers, setSpeakers] = useState<ScreenSpeaker[]>([]);
  const [series, setSeries] = useState<ScreenSeries[]>([]);
  const [activeVideo, setActiveVideo] = useState<ScreenVideo | null>(null);

  useEffect(() => {
    setTheme('screen');
    const update = () => {
      setVideos(store.getAllScreenVideos().filter((v) => v.active));
      setPodcasts(store.getAllScreenPodcasts().filter((p) => p.active));
      setQuotes(store.getAllScreenQuotes().filter((q) => q.active));
      setSpeakers(store.getScreenSpeakers());
      setSeries(store.getScreenSeries());
    };
    update();
    return store.subscribe(update);
  }, [setTheme]);

  const featuredVideo = videos.find((v) => v.featured) || videos[0];
  const featuredPodcast = podcasts.find((p) => p.featured) || podcasts[0];

  const getSpeakerName = (speakerId?: string) => {
    if (!speakerId) return undefined;
    return speakers.find((s) => s.id === speakerId)?.name;
  };

  return (
    <div className="min-h-screen bg-[#EDE6DC] text-[#211D19] transition-colors duration-300">
      {/* 1. Mid-Tone Editorial Featured Video Hero */}
      {featuredVideo && (
        <section className="relative py-16 sm:py-24 border-b border-[#322C26]/10 bg-gradient-to-b from-[#F7F2EB] via-[#EDE6DC] to-[#E0D6C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#A6854F]/40 text-xs font-mono text-[#A6854F] uppercase tracking-widest font-semibold shadow-sm">
                    Featured Discourse
                  </span>
                  {featuredVideo.duration && (
                    <span className="text-xs font-mono text-[#82776B] flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredVideo.duration}</span>
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif text-[#211D19] font-normal leading-tight">
                  {featuredVideo.title}
                </h1>

                <p className="text-xs sm:text-sm text-[#574E43] font-light leading-relaxed">
                  {featuredVideo.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveVideo(featuredVideo)}
                    className="px-8 py-4 bg-[#241F1B] text-[#FAF6F0] font-semibold text-xs tracking-widest uppercase rounded-sm hover:bg-[#352E28] transition-all shadow-md flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5 text-[#A6854F]" />
                    <span>Watch Video</span>
                  </button>

                  <a
                    href={APP_CONFIG.screenYouTube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-[#FAF6EE] hover:bg-white text-[#211D19] border border-[#322C26]/15 text-xs tracking-widest uppercase rounded-sm transition-all font-semibold flex items-center space-x-2 shadow-sm"
                  >
                    <YouTubeIcon className="w-4 h-4 text-red-800" />
                    <span>YouTube Channel</span>
                  </a>
                </div>
              </div>

              {/* Right Column Video Stage */}
              <div
                onClick={() => setActiveVideo(featuredVideo)}
                className="lg:col-span-7 relative aspect-video rounded-sm overflow-hidden bg-[#E0D6C8] border border-[#322C26]/10 shadow-lg cursor-pointer group"
              >
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#211D19] group-hover:text-[#A6854F] group-hover:scale-110 transition-all shadow-lg">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Official Screen YouTube CTA Banner (Warm Sand Taupe) */}
      <section className="py-12 bg-[#E0D6C8] border-b border-[#322C26]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FDFBF8] rounded-sm p-8 sm:p-10 border border-[#322C26]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#A6854F] font-semibold">
                <YouTubeIcon className="w-4 h-4 text-red-800" />
                <span>NUQTAH SCREEN OFFICIAL CHANNEL</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-[#211D19]">
                Watch the latest talks, reflections and conversations.
              </h3>
              <p className="text-xs sm:text-sm text-[#574E43] font-light leading-relaxed max-w-xl">
                Subscribe to our official broadcast archive on YouTube for cinematic releases and scholarly lectures.
              </p>
            </div>

            <a
              href={APP_CONFIG.screenYouTube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2 whitespace-nowrap"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Latest Video Discourses */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end border-b border-[#322C26]/10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
              Visual Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#211D19] mt-1">
              Latest Video Discourses
            </h2>
          </div>
          <Link
            to="/screen/videos"
            className="text-xs uppercase tracking-widest text-[#211D19] font-bold hover:text-[#A6854F] flex items-center space-x-1"
          >
            <span>View All Videos</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A6854F]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <MediaCard
              key={vid.id}
              type="video"
              item={vid}
              speakerName={getSpeakerName(vid.speakerId)}
              onPlay={() => setActiveVideo(vid)}
            />
          ))}
        </div>
      </section>

      {/* 4. Featured Podcast Waveform Section */}
      {featuredPodcast && (
        <section className="py-16 bg-[#E0D6C8] border-y border-[#322C26]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
                  Audio & Contemplation
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#211D19] mt-1">
                  Nuqtah Podcast Series
                </h2>
              </div>
              <Link
                to="/screen/podcasts"
                className="text-xs uppercase tracking-widest text-[#211D19] font-bold hover:text-[#A6854F] flex items-center space-x-1"
              >
                <span>All Episodes</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A6854F]" />
              </Link>
            </div>

            <WaveformPlayer
              podcast={featuredPodcast}
              speakerName={getSpeakerName(featuredPodcast.speakerId)}
            />
          </div>
        </section>
      )}

      {/* 5. Series Showcase */}
      {series.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex justify-between items-end border-b border-[#322C26]/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
                Structured Discourses
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#211D19] mt-1">
                Lecture Series
              </h2>
            </div>
            <Link
              to="/screen/series"
              className="text-xs uppercase tracking-widest text-[#211D19] font-bold hover:text-[#A6854F] flex items-center space-x-1"
            >
              <span>Explore Series</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A6854F]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {series.map((ser) => (
              <div
                key={ser.id}
                className="group surface-card rounded-sm overflow-hidden flex flex-col sm:flex-row bg-[#FDFBF8] border border-[#322C26]/10 shadow-sm hover:shadow-md hover:border-[#A6854F]/50 transition-all"
              >
                <div className="sm:w-1/2 aspect-video sm:aspect-auto relative bg-[#E0D6C8] overflow-hidden">
                  <img
                    src={ser.coverImage}
                    alt={ser.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-4 bg-[#FDFBF8]">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#A6854F] font-mono block font-semibold">
                      Curated Series
                    </span>
                    <h3 className="text-xl font-serif text-[#211D19] group-hover:text-[#A6854F] transition-colors font-semibold">
                      {ser.title}
                    </h3>
                    <p className="text-xs text-[#574E43] font-light line-clamp-3 leading-relaxed">
                      {ser.description}
                    </p>
                  </div>

                  <Link
                    to={`/screen/series/${ser.slug}`}
                    className="pt-3 border-t border-[#322C26]/10 text-xs uppercase tracking-widest text-[#211D19] font-bold flex items-center justify-between group-hover:text-[#A6854F]"
                  >
                    <span>View Episodes</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A6854F]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Editorial Quotes Archive Preview */}
      {quotes.length > 0 && (
        <section className="py-20 bg-[#E0D6C8] border-t border-[#322C26]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#A6854F] font-mono font-semibold">
                Scholarly Insights
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#211D19]">
                Contemplative Quotes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  className="surface-card rounded-sm p-8 bg-[#FDFBF8] border border-[#322C26]/10 shadow-sm space-y-4 relative flex flex-col justify-between"
                >
                  <Quote className="w-8 h-8 text-[#A6854F]/30" />
                  <p className="text-base sm:text-lg font-serif text-[#211D19] italic leading-relaxed font-normal">
                    "{q.quote}"
                  </p>
                  <div className="pt-4 border-t border-[#322C26]/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A6854F] font-bold">{q.speakerName}</span>
                    {q.source && <span className="text-[#82776B]">{q.source}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
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
