import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw } from 'lucide-react';
import { ScreenPodcast } from '../../types';

interface WaveformPlayerProps {
  podcast: ScreenPodcast;
  speakerName?: string;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ podcast, speakerName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(podcast.durationSeconds || 1800);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const waveformBars =
    podcast.waveformData && podcast.waveformData.length > 0
      ? podcast.waveformData
      : [25, 45, 60, 75, 90, 80, 50, 40, 65, 85, 95, 70, 55, 35, 60, 80, 90, 65, 45, 55, 75, 85, 90, 60, 40, 50, 70, 80, 75, 50, 35, 60, 80, 90, 65, 40, 30, 50];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Audio playback prevented:', e);
          setIsPlaying(true);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (index: number) => {
    const fraction = index / waveformBars.length;
    const targetTime = fraction * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
    setCurrentTime(targetTime);
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const nextTime = Math.min(Math.max(0, audioRef.current.currentTime + seconds), duration);
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressFraction = duration > 0 ? currentTime / duration : 0;
  const activeBarCount = Math.floor(progressFraction * waveformBars.length);

  return (
    <div className="surface-card rounded-sm p-6 sm:p-8 bg-white border border-[#24201C]/[0.08] shadow-sm relative overflow-hidden">
      <audio
        ref={audioRef}
        src={podcast.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Cover Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden bg-[#F4EFE6] flex-shrink-0 border border-[#24201C]/10 shadow-sm">
          <img
            src={podcast.coverImage}
            alt={podcast.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info & Player Main Controls */}
        <div className="flex-1 min-w-0 space-y-4">
          <div>
            {speakerName && (
              <span className="text-xs uppercase tracking-widest text-[#B58B47] font-semibold font-mono block mb-1">
                {speakerName}
              </span>
            )}
            <h4 className="text-lg font-serif font-semibold text-[#24201C] line-clamp-1">
              {podcast.title}
            </h4>
            <p className="text-xs text-[#5D554C] line-clamp-1 mt-0.5 font-light">
              {podcast.description}
            </p>
          </div>

          {/* Interactive Visual Waveform */}
          <div className="space-y-1.5">
            <div
              className="h-12 flex items-center gap-1 cursor-pointer select-none py-1"
              title="Click waveform to scrub"
            >
              {waveformBars.map((barHeight, idx) => {
                const isActive = idx <= activeBarCount;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSeek(idx)}
                    className="flex-1 flex items-center justify-center h-full group"
                  >
                    <div
                      style={{ height: `${barHeight}%` }}
                      className={`w-full rounded-full transition-all duration-150 ${
                        isActive
                          ? 'bg-[#B58B47] shadow-luxury-gold'
                          : 'bg-[#E9DED0] group-hover:bg-[#C9A96A]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Time Stamp Indicators */}
            <div className="flex justify-between text-[11px] font-mono text-[#8A8075]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Buttons Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#24201C]/[0.06]">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => skipTime(-15)}
                className="p-1.5 text-[#5D554C] hover:text-[#24201C] transition-colors"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-[#24201C] text-[#FAF8F3] hover:bg-[#3A342E] transition-all flex items-center justify-center font-bold shadow-md"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => skipTime(15)}
                className="p-1.5 text-[#5D554C] hover:text-[#24201C] transition-colors"
                title="Forward 15 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono">
              {/* Playback Rate Switcher */}
              <button
                onClick={cycleSpeed}
                className="px-2.5 py-1 rounded bg-[#FAF6EF] hover:bg-[#F4EFE6] text-[#24201C] border border-[#24201C]/10 font-semibold transition-colors"
              >
                {playbackRate}x
              </button>

              {/* Volume Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-[#5D554C] hover:text-[#24201C] transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
