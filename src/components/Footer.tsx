import React from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO } from '../data/hostelData';
import { MapPin, Phone, Mail, Star, MessageCircle, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenBookingModal }) => {
  const handleNav = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050918] border-t border-blue-900/40 text-slate-300">
      {/* Top Banner highlight */}
      <div className="bg-gradient-to-r from-blue-950 via-[#0c1a40] to-blue-950 border-b border-blue-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-red-400">
                Auckland Hospitality
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Experience New Zealand with Comfort, Style & Warmth
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Centrally nestled in Eden Terrace, Auckland. Seconds away from public transit and Ponsonby cafes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <button
                onClick={() => onOpenBookingModal()}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md shadow-red-950/50 cursor-pointer"
              >
                Book Your Stay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/30">
                <Star className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="text-xl font-extrabold text-white font-display">
                Stars Hostel
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Auckland’s premier boutique hostel, pairing the privacy and comfort of bespoke timber pod beds with the social warmth of New Zealand backpacking culture.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified NZ Accommodation · 24/7 Keycard Access</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-blue-900/40 pb-2">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('rooms')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Our Rooms & Pods
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Photo Gallery (12 Photos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Contact, Map & Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Transit */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-blue-900/40 pb-2">
              Hours & Access
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Reception Check-in:</span>
                  <span>{BUSINESS_INFO.checkInTime}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Check-out Time:</span>
                  <span>{BUSINESS_INFO.checkOutTime}</span>
                </div>
              </li>
              <li className="text-xs text-slate-400 pt-1">
                Late arrivals after 10:00 PM are seamlessly handled via automated keycard entry.
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-blue-900/40 pb-2">
              Contact & Location
            </h4>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                <span className="text-slate-300 leading-snug">
                  {BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-white font-semibold hover:text-red-400 transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-red-400 transition-colors text-slate-300"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-blue-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Stars Hostel Auckland. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Kia Ora & Welcome to Aotearoa New Zealand</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
