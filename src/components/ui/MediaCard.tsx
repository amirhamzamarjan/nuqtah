import React from 'react';
import { Play, Mic, Clock } from 'lucide-react';
import { ScreenVideo, ScreenPodcast } from '../../types';

interface MediaCardProps {
  type: 'video' | 'podcast';
  item: ScreenVideo | ScreenPodcast;
  onPlay?: () => void;
  speakerName?: string;
  categoryName?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  type,
  item,
  onPlay,
  speakerName,
  categoryName,
}) => {
  const isVideo = type === 'video';
  const video = isVideo ? (item as ScreenVideo) : undefined;
  const podcast = !isVideo ? (item as ScreenPodcast) : undefined;

  const thumbnail = isVideo ? video?.thumbnail : podcast?.coverImage;
  const duration = isVideo ? video?.duration : podcast?.duration;

  return (
    <div
      onClick={onPlay}
      className="group surface-card rounded-sm overflow-hidden flex flex-col cursor-pointer bg-white border border-[#24201C]/[0.08] hover:border-[#B58B47]/40 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Media Thumbnail with Play Overlay */}
      <div className="relative aspect-video w-full bg-[#F4EFE6] overflow-hidden">
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#24201C]/25 group-hover:bg-[#24201C]/10 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#24201C] group-hover:text-[#B58B47] group-hover:scale-110 transition-all shadow-md">
            {isVideo ? <Play className="w-5 h-5 fill-current ml-0.5" /> : <Mic className="w-5 h-5" />}
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {categoryName && (
            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm bg-white/90 text-[#24201C] border border-[#24201C]/10 backdrop-blur-md font-semibold shadow-sm">
              {categoryName}
            </span>
          )}
          {item.featured && (
            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-sm bg-[#B58B47] text-white backdrop-blur-md font-semibold shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Duration Chip */}
        {duration && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-sm bg-[#24201C]/80 text-white text-[10px] font-mono flex items-center space-x-1 backdrop-blur-md">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-2 bg-white">
        <div>
          {speakerName && (
            <span className="text-[11px] text-[#B58B47] font-semibold tracking-wide block">
              {speakerName}
            </span>
          )}
          <h3 className="text-base font-serif font-semibold text-[#24201C] group-hover:text-[#B58B47] transition-colors line-clamp-2 mt-0.5">
            {item.title}
          </h3>
          <p className="text-xs text-[#5D554C] line-clamp-2 mt-1 font-light leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#24201C]/[0.06] flex items-center justify-between text-[11px] text-[#8A8075] font-mono">
          <span>{new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-[#24201C] font-semibold group-hover:text-[#B58B47] transition-colors flex items-center space-x-1">
            <span>{isVideo ? 'Watch Discourse' : 'Listen Episode'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
