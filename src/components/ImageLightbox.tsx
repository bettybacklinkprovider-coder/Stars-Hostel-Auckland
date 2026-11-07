import React from 'react';
import { GalleryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  photo: GalleryPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  photo,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-red-600 rounded-full transition-colors"
        aria-label="Close photo view"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-slate-900/80 hover:bg-red-600 rounded-full transition-colors"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-slate-900/80 hover:bg-red-600 rounded-full transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image}
          alt={photo.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-blue-900/50"
        />
        <div className="mt-4 text-center max-w-xl">
          <span className="text-xs uppercase font-bold tracking-widest text-red-400">
            {photo.tag}
          </span>
          <h4 className="text-lg font-bold text-white mt-0.5">{photo.title}</h4>
          <p className="text-xs text-slate-300 mt-1">{photo.caption}</p>
        </div>
      </div>
    </div>
  );
};
