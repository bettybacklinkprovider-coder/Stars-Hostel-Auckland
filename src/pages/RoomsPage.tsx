import React, { useState } from 'react';
import { PageId } from '../types';
import { ROOMS_DATA } from '../data/hostelData';
import {
  BedDouble,
  Users,
  CheckCircle,
  Wifi,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Maximize2,
  Lock,
  Zap,
  HelpCircle
} from 'lucide-react';

interface RoomsPageProps {
  setCurrentPage: (page: PageId) => void;
  onOpenBookingModal: (roomId?: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  setCurrentPage,
  onOpenBookingModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dorm' | 'private' | 'female'>('all');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'female') return room.category === 'female';
    if (activeFilter === 'dorm') return room.category === 'dorm' || room.category === 'female';
    if (activeFilter === 'private') return room.category === 'private';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
            <span>Stars Hostel Auckland</span>
            <span>·</span>
            <span>Rooms & Suites</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Designed for Restful Sleep & Social Living
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every bed at Stars Hostel has been engineered to provide maximum personal privacy, whisper-quiet sturdiness, and modern travel conveniences.
          </p>

          {/* Filter Bar (interactive filter tabs) */}
          <div className="mt-8 inline-flex p-1.5 bg-[#0c183d] rounded-xl border border-blue-900/60 shadow-lg">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Accommodations ({ROOMS_DATA.length})
            </button>
            <button
              onClick={() => setActiveFilter('dorm')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'dorm'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Timber Pod Dorms
            </button>
            <button
              onClick={() => setActiveFilter('female')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'female'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Female Only Dorm
            </button>
            <button
              onClick={() => setActiveFilter('private')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'private'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Private Rooms
            </button>
          </div>
        </div>

        {/* Room List */}
        <div className="space-y-12">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#0b1535] rounded-3xl border border-blue-900/50 overflow-hidden shadow-xl hover:border-red-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Room Photo (5 cols) */}
              <div className="relative lg:col-span-5 min-h-[300px] lg:min-h-full overflow-hidden group">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1535] via-transparent to-transparent lg:hidden" />
                
                {/* Popular or Category tag */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {room.popular && (
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  {room.category === 'female' && (
                    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                      Female Only
                    </span>
                  )}
                </div>

                {/* Price pill */}
                <div className="absolute bottom-4 left-4 lg:hidden bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md">
                  ${room.priceNZD} NZD/night
                </div>
              </div>

              {/* Room Info (7 cols) */}
              <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between">
                <div>
                  
                  {/* Title and metadata */}
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                        {room.name}
                      </h2>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-red-400" />
                          {room.bedType}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-red-400" />
                          {room.capacity}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                          {room.sizeM2} m²
                        </span>
                      </div>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden lg:block text-right">
                      <span className="text-3xl font-extrabold text-red-500 font-display">
                        ${room.priceNZD}
                      </span>
                      <span className="text-xs text-slate-300 block font-medium">
                        NZD / night
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        Taxes & linen included
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Included Room Features & Comforts:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {room.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                          <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Action strip */}
                <div className="mt-8 pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Free high-speed Wi-Fi, daily sanitization, 24/7 keycard access</span>
                  </div>

                  <div className="w-full sm:w-auto flex items-center gap-3">
                    <button
                      onClick={() => onOpenBookingModal(room.id)}
                      className="w-full sm:w-auto px-7 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book This Room</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Why Book Direct Banner */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1c45] to-[#070e24] border border-blue-800/60 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white font-display">
              Why Book Direct on Our Official Website?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Skip third-party commission fees and enjoy flexible perks only available when booking with Stars Hostel directly.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <Zap className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Guaranteed Lowest Rates</h4>
              <p className="text-xs text-slate-400 mt-1">Always at least $5-$10 NZD cheaper than external OTA booking platforms.</p>
            </div>
            <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <Lock className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Flexible Cancellation</h4>
              <p className="text-xs text-slate-400 mt-1">Free date alterations and cancellation up to 24 hours prior to check-in.</p>
            </div>
            <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-900/40">
              <BedDouble className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">Bunk Preference Priority</h4>
              <p className="text-xs text-slate-400 mt-1">Request bottom bunk or top bunk preference with guaranteed priority assignment.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
