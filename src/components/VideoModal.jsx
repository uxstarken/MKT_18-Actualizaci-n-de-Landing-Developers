import React from 'react';
import { X, Video } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, platform, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full flex flex-col shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-100 flex items-center justify-center text-starken-orange flex-shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-starken-text-dark leading-tight">
                Video Tutorial: Integración {platform}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-starken-text-muted mt-0.5">
                Paso a paso para configurar tu tienda
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-[7px] transition-colors"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Video Embed */}
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            src={videoUrl}
            title={`Video tutorial ${platform}`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
