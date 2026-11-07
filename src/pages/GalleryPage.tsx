import React, { useState } from 'react';
import { PageId } from '../types';
import { GALLERY_PHOTOS } from '../data/hostelData';
import { ImageLightbox } from '../components/ImageLightbox';
import { Eye, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  setCurrentPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  setCurrentPage,
  onOpenBookingModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos (12)' },
    { id: 'rooms', label: 'Bedrooms & Pods' },
    { id: 'lounge', label: 'Social Lounge' },
    { id: 'kitchen', label: 'Shared Kitchen' },
    { id: 'outdoor', label: 'Outdoor Patio Deck' },
    { id: 'facilities', label: 'Bathrooms & Facilities' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const handleNextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
            <span>Stars Hostel Auckland</span>
            <span>·</span>
            <span>Hostel Photo Gallery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Explore Every Corner of Our Space
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Take a virtual tour through our modern oak bunk pods, cozy social living room, commercial chef kitchen, sun-drenched Auckland garden deck, and sparkling clean bathrooms.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#0b1638] rounded-2xl border border-blue-900/60 shadow-lg max-w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Photo Grid with attractive hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer bg-[#0b1535] border border-blue-900/50 hover:border-red-500/60 shadow-lg transition-all duration-300"
            >
              {/* Photo */}
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b1b] via-[#060b1b]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Tag pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-red-600/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-md">
                  {photo.tag}
                </span>
              </div>

              {/* Hover center icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* CTA bottom banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0c1a40] via-[#08122c] to-[#0c1a40] border border-blue-800/60 shadow-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Ready to Make Stars Hostel Your Auckland Base?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Book online in less than 2 minutes. Free cancellation up to 24 hours prior to check-in.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Book Your Bed or Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('rooms')}
              className="px-6 py-3.5 bg-blue-900/40 hover:bg-blue-900/70 border border-blue-700/50 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              Compare Room Rates
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Viewer */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        photo={lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
};
