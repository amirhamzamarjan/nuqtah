import React from 'react';
import { X } from 'lucide-react';
import { ScreenVideo } from '../../types';

interface VideoModalProps {
  video: ScreenVideo | null;
  onClose: () => void;
  speakerName?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, speakerName }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0F0F14] border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-[#070709]">
          <div className="min-w-0 pr-4">
            {speakerName && (
              <span className="text-[10px] uppercase tracking-widest text-[#C7A85C] font-mono block">
                {speakerName}
              </span>
            )}
            <h3 className="text-sm sm:text-base font-serif font-medium text-white truncate">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
            aria-label="Close Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Video Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Description */}
        <div className="p-4 sm:p-5 text-xs sm:text-sm text-white/70 font-light leading-relaxed max-h-36 overflow-y-auto">
          {video.description}
        </div>
      </div>
    </div>
  );
};
