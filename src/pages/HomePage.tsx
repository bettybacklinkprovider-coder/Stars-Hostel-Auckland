import React, { useState } from 'react';
import { PageId, RoomType, GalleryPhoto } from '../types';
import { ROOMS_DATA, AMENITIES_DATA, GALLERY_PHOTOS, REVIEWS_DATA, BUSINESS_INFO } from '../data/hostelData';
import { ImageLightbox } from '../components/ImageLightbox';
import {
  Star,
  MapPin,
  Phone,
  Wifi,
  UtensilsCrossed,
  BedDouble,
  Sparkles,
  Tv,
  TreePine,
  ShieldCheck,
  Shirt,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle,
  Award,
  ChevronRight,
  Heart,
  Quote
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
  onOpenBookingModal: (roomId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onOpenBookingModal,
}) => {
  // Lightbox state for gallery section
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Take exactly 9 photos for the Home Gallery section
  const homeGalleryPhotos = GALLERY_PHOTOS.slice(0, 9);

  // Icon mapping helper for Amenities
  const getAmenityIcon = (name: string) => {
    switch (name) {
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-red-500" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-red-500" />;
      case 'BedDouble':
        return <BedDouble className="w-6 h-6 text-red-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-red-500" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-red-500" />;
      case 'TreePine':
        return <TreePine className="w-6 h-6 text-red-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-red-500" />;
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-red-500" />;
      default:
        return <Star className="w-6 h-6 text-red-500" />;
    }
  };

  const handleNextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % homeGalleryPhotos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + homeGalleryPhotos.length) % homeGalleryPhotos.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100">
      
      {/* ========================================================
          SECTION 1: HERO SECTION
          Large beautiful hostel interior image, headline, and Book Now button
      ======================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-blue-900/40">
        {/* Background Image with Dark Navy & Red Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_stars_hostel_1794036885732.jpg"
            alt="Stars Hostel Auckland Interior Lounge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out"
          />
          {/* Gradients ensuring 4.5:1 text contrast and rich royal blue tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d1e] via-[#070d1e]/80 to-[#070d1e]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070d1e] via-[#0a1538]/70 to-[#070d1e]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          
          {/* Subtle Location & Rating Bar */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-950/80 border border-blue-800/60 shadow-lg backdrop-blur-md mb-8">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-200">
              4.9/5 · Rated Top Boutique Hostel in Auckland
            </span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-xs text-red-400 font-bold hidden sm:inline">
              Eden Terrace · Central Auckland
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto font-display text-balance">
            Your Premium Sanctuary in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">Heart of Auckland</span>
          </h1>

          {/* Value proposition subtext */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Welcome to <strong className="text-white font-semibold">Stars Hostel</strong> at 6a Glenside Crescent. Experience handcrafted timber privacy pod beds, ultrafast fiber Wi-Fi, a commercial shared kitchen, and sunlit fern courtyard deck.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBookingModal()}
              className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-xl shadow-xl shadow-red-950/60 hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Book Now – Best Price Direct</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-4 bg-[#0d1d45] hover:bg-[#122659] border border-blue-700/60 text-white font-semibold text-base rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>

          {/* Quick Key Highlights Bar */}
          <div className="mt-14 pt-8 border-t border-blue-900/50 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <BedDouble className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Timber Pod Beds</p>
                <p className="text-[11px] text-slate-400">Blackout curtains & USB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <Wifi className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Gigabit Fiber</p>
                <p className="text-[11px] text-slate-400">100% free high speed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <MapPin className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Eden Terrace</p>
                <p className="text-[11px] text-slate-400">5 min to CBD & Ponsonby</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">24/7 Security</p>
                <p className="text-[11px] text-slate-400">Electronic keycard entry</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 2: ABOUT OUR HOSTEL
          Introduction to Stars Hostel
      ======================================================== */}
      <section className="py-24 bg-[#0a122e] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual representation */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-blue-800/50 shadow-2xl">
                <img
                  src="/images/hostel_outdoor_patio_1794036888006.jpg"
                  alt="Stars Hostel Outdoor Patio and Social Deck"
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e24]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#091539]/90 border border-blue-800/40 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-red-400">Prime Auckland Location</p>
                      <p className="text-sm font-semibold text-white">6a Glenside Crescent, Eden Terrace</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-red-600/90 text-white rounded font-bold">
                      Auckland 1010
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating trust card */}
              <div className="hidden sm:block absolute -top-6 -right-6 bg-[#0e1d4d] border border-blue-700/60 rounded-xl p-4 shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-600 rounded-lg text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Award-Winning Stay</p>
                    <p className="text-[11px] text-slate-300">Cleanliness & Comfort certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400">
                <span>About Our Hostel</span>
                <span>·</span>
                <span>Eden Terrace, Auckland</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                Modern Hostel Comfort Designed for International Travelers & Nomads
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Founded with a mission to eliminate squeaky, cramped dorm bunks, <strong>Stars Hostel</strong> delivers an elevated hospitality standard right in Auckland’s vibrant Eden Terrace neighborhood. Whether you are landing in New Zealand on a Working Holiday Visa, backpacking the North Island, or exploring Auckland on business, we offer a peaceful, sparkling clean retreat.
              </p>

              <p className="text-base text-slate-300 leading-relaxed">
                We believe you shouldn't have to compromise on sleep quality while staying on a traveler's budget. That's why our dorm rooms feature bespoke oak timber sleep pods with full blackout curtains, memory foam mattresses, and dedicated reading pods.
              </p>

              {/* Feature bullet grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Walkable to Auckland Hotspots</h4>
                    <p className="text-xs text-slate-400">Short stroll to Ponsonby dining, K-Road nightlife, and Mt Eden volcanic summit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Social & Safe Atmosphere</h4>
                    <p className="text-xs text-slate-400">Friendly communal kitchen, garden deck BBQs, and quiet hours from 10:30 PM for sound sleep.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Flexible Check-In Hours</h4>
                    <p className="text-xs text-slate-400">Reception open 2:00 PM – 10:00 PM with seamless 24/7 keycode late arrival support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Free High-Speed Wi-Fi</h4>
                    <p className="text-xs text-slate-400">Commercial fiber connection optimized for remote work, streaming, and trip planning.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('rooms')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  <span>Explore Rooms & Rates</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-6 py-3 bg-blue-900/40 hover:bg-blue-900/70 border border-blue-700/50 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Location & Contact
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 3: OUR ROOMS
          Beautiful room images and room descriptions
      ======================================================== */}
      <section className="py-24 bg-[#070d1e] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Accommodation Options
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
                Handcrafted Sleeping Spaces in Auckland
              </h2>
              <p className="mt-3 text-base text-slate-400 max-w-2xl">
                Choose between custom timber bunk pods engineered for deep privacy, or private double en-suites tailored for couples and digital nomads.
              </p>
            </div>
            
            <button
              onClick={() => setCurrentPage('rooms')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
            >
              <span>View All 6 Room Types</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Rooms Grid (3 marquee rooms on home) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS_DATA.slice(0, 3).map((room) => (
              <div
                key={room.id}
                className="bg-[#0b1432] rounded-2xl border border-blue-900/50 overflow-hidden flex flex-col hover:border-red-500/50 transition-all duration-300 group shadow-lg"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1432] via-transparent to-transparent" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-red-600/95 text-white px-3.5 py-1.5 rounded-lg text-sm font-extrabold shadow-md">
                    ${room.priceNZD} <span className="text-[11px] font-medium">NZD/night</span>
                  </div>

                  {/* Bed type badge */}
                  <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-200 flex items-center gap-1.5 bg-blue-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-blue-800/40">
                    <BedDouble className="w-3.5 h-3.5 text-red-400" />
                    <span>{room.bedType}</span>
                    <span className="text-slate-500">·</span>
                    <span>{room.capacity}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {room.name}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 space-y-2 text-xs text-slate-300">
                      {room.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center gap-3">
                    <button
                      onClick={() => onOpenBookingModal(room.id)}
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg text-center transition-colors shadow-sm cursor-pointer"
                    >
                      Book This Room
                    </button>
                    <button
                      onClick={() => setCurrentPage('rooms')}
                      className="px-3.5 py-2.5 bg-blue-900/40 hover:bg-blue-900/80 text-slate-200 font-semibold text-xs rounded-lg border border-blue-800/40 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('rooms')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0e1d4d] hover:bg-[#142866] border border-blue-700/60 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              <span>Explore All Rooms, Rates & Configurations</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 4: FACILITIES & AMENITIES
          Free Wi-Fi, comfortable beds, shared kitchen, bathrooms and common areas
      ======================================================== */}
      <section className="py-24 bg-[#0a122e] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              Hostel Facilities & Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
              Everything You Need for a Seamless Stay
            </h2>
            <p className="mt-3 text-base text-slate-400">
              From commercial kitchen facilities to quiet working corners and hotel-grade rain showers, every space has been carefully crafted.
            </p>
          </div>

          {/* Amenities Grid with Real Photographs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES_DATA.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-[#0b1638] border border-blue-900/50 rounded-2xl overflow-hidden hover:border-red-500/50 hover:bg-[#0e1a44] transition-all duration-300 group shadow-lg flex flex-col"
              >
                {/* Photo header */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1638] via-transparent to-transparent opacity-90" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-blue-950/90 border border-blue-800/60 backdrop-blur-md flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all shadow-md">
                    {getAmenityIcon(amenity.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {amenity.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-blue-900/40 flex items-center justify-between text-xs text-red-400 font-semibold">
                    <span>Stars Hostel Auckland</span>
                    <span className="text-[11px] text-slate-400 font-normal">Included Free</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra highlight banner: Shared Kitchen & Outdoor Terrace */}
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#0d1c44] via-[#091539] to-[#0d1c44] border border-blue-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-xl text-white">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Fully Stocked Commercial Kitchen & Dining
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Multiple gas stoves, convection ovens, large food storage units, and complimentary tea & coffee all day.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('gallery')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              See Kitchen & Deck Photos
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 5: GALLERY
          Display 9 high-quality hostel photographs
      ======================================================== */}
      <section className="py-24 bg-[#070d1e] border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Visual Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
                Life at Stars Hostel Auckland
              </h2>
              <p className="mt-2 text-base text-slate-400">
                A glimpse inside our bedrooms, timber pods, communal kitchen, sunlit patio, and social lounges.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('gallery')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
            >
              <span>View Full 12-Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Exactly 9 high-quality photos grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeGalleryPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-blue-900/50 hover:border-red-500/60 transition-all duration-300 shadow-md"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-red-600/90 px-2.5 py-1 rounded-md shadow-sm">
                    {photo.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('gallery')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0d1d45] hover:bg-[#12275b] border border-blue-700/60 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              <span>Explore Complete Gallery Page with Filter Tabs</span>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 6: GUEST REVIEWS & CONTACT
          Testimonials, contact details and booking CTA
      ======================================================== */}
      <section className="py-24 bg-[#0a122e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              Trusted by Global Backpackers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
              Real Experiences from Our Guests
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Read how fellow travelers, solo globetrotters, and digital nomads rated their stay at Stars Hostel Auckland.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS_DATA.map((review) => (
              <div
                key={review.id}
                className="bg-[#0b1638] border border-blue-900/50 rounded-xl p-6 flex flex-col justify-between hover:border-red-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-lg">{review.flag}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-900/40">
                  <div className="font-bold text-sm text-white">{review.name}</div>
                  <div className="text-xs text-red-400">{review.country}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {review.roomStayed} · {review.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details & Final Booking CTA Container */}
          <div className="mt-16 bg-gradient-to-br from-[#0c1b44] via-[#08102a] to-[#0c1b44] border border-blue-800/60 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                  Ready to Visit Auckland?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2 font-display">
                  Book Direct for Best Guaranteed Rates & Fast Check-In
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Have questions about bed availability, group reservations, or airport directions? Our friendly team is ready to assist you.
                </p>

                {/* Direct info icons */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{BUSINESS_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-200">
                    <Phone className="w-5 h-5 text-red-500 shrink-0" />
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-red-400 transition-colors font-semibold">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons & WhatsApp */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-xl shadow-xl shadow-red-950/60 transition-all text-center flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Reserve Your Bed Now</span>
                </button>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-3 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp (+64 21 938 777)</span>
                </a>

                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full py-3 bg-blue-950/70 hover:bg-blue-900/60 border border-blue-700/50 text-slate-200 font-semibold text-sm rounded-xl transition-colors text-center cursor-pointer"
                >
                  View Interactive Auckland Map & FAQs
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        photo={lightboxIndex !== null ? homeGalleryPhotos[lightboxIndex] : null}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />

    </div>
  );
};
