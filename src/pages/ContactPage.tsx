import React, { useState } from 'react';
import { PageId } from '../types';
import { BUSINESS_INFO, ROOMS_DATA, FAQ_ITEMS } from '../data/hostelData';
import { saveBookingToSupabase, saveMessageToSupabase } from '../lib/supabase';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  MessageSquare,
  Calendar,
  Users,
  CheckCircle2,
  Navigation,
  Bus,
  Plane,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Send,
  Database,
  Loader2,
  AlertCircle,
  User,
  Bed
} from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  // Tab: 'booking' | 'message'
  const [activeFormTab, setActiveFormTab] = useState<'booking' | 'message'>('booking');

  // Tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const threeDays = new Date();
  threeDays.setDate(threeDays.getDate() + 4);
  const threeDaysStr = threeDays.toISOString().split('T')[0];

  // Booking Form State
  const [roomId, setRoomId] = useState(ROOMS_DATA[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(tomorrowStr);
  const [checkOut, setCheckOut] = useState(threeDaysStr);
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Direct Message to Owner State
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgPhone, setMsgPhone] = useState('');
  const [msgSubject, setMsgSubject] = useState('General Question for Owner');
  const [msgBody, setMsgBody] = useState('');
  const [isMsgSubmitting, setIsMsgSubmitting] = useState(false);
  const [isMsgSubmitted, setIsMsgSubmitted] = useState(false);
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSavedToDb, setMsgSavedToDb] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];

  // Nights calculation
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const diffTime = Math.max(0, dOut.getTime() - dIn.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalPrice = selectedRoom.priceNZD * nights * guests;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    const refCode = `STARS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);

    // Save to Supabase Cloud
    const res = await saveBookingToSupabase({
      booking_ref: refCode,
      full_name: fullName,
      email: email,
      phone: phone,
      room_id: selectedRoom.id,
      room_name: selectedRoom.name,
      check_in: checkIn,
      check_out: checkOut,
      nights: nights,
      guests: guests,
      total_price_nzd: totalPrice,
      special_requests: specialRequests,
    });

    setIsSubmitting(false);

    if (res.alreadyExists) {
      setErrorMessage(res.error || 'A booking already exists for this email address. Only 1 booking per email is permitted.');
      return;
    }

    if (!res.success && res.error) {
      setErrorMessage(res.error);
      return;
    }

    setSavedToDb(res.savedToDb);
    setIsSubmitted(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgError(null);
    setIsMsgSubmitting(true);

    const res = await saveMessageToSupabase({
      full_name: msgName,
      email: msgEmail,
      phone: msgPhone || undefined,
      subject: msgSubject,
      message: msgBody,
    });

    setIsMsgSubmitting(false);

    if (!res.success && res.error) {
      setMsgError(res.error);
      return;
    }

    setMsgSavedToDb(res.savedToDb);
    setIsMsgSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/${BUSINESS_INFO.rawPhone}?text=${encodeURIComponent(
    `Kia Ora Stars Hostel! I would like to make a booking:\n• Room: ${selectedRoom.name}\n• Check-in: ${checkIn}\n• Check-out: ${checkOut} (${nights} nights)\n• Guests: ${guests}\n• Name: ${fullName || 'Guest'}`
  )}`;

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
            <span>Stars Hostel Auckland</span>
            <span>·</span>
            <span>Contact & Reservations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Get in Touch & Book Your Stay
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            We are here to help you plan your Auckland trip. Submit an inquiry below, give us a ring, or message our reception team directly on WhatsApp for instant confirmation.
          </p>
        </div>

        {/* Visual Hostel Location Banner */}
        <div className="relative mb-14 rounded-3xl overflow-hidden border border-blue-800/60 shadow-2xl h-64 sm:h-80">
          <img
            src="/images/hero_stars_hostel_1794036885732.jpg"
            alt="Stars Hostel Auckland Reception & Lounge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e24] via-[#070e24]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/60">
                Auckland Headquarters
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                Stars Hostel · 6a Glenside Crescent
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Eden Terrace, Auckland 1010, New Zealand · Phone: +64 21 938 777
              </p>
            </div>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Booking</span>
            </a>
          </div>
        </div>

        {/* 2-Column Main Section: Booking Form & Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Booking & Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1538] border border-blue-900/60 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Form Mode Tabs */}
            <div className="grid grid-cols-2 p-1.5 bg-[#070e24] border border-blue-900/60 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setActiveFormTab('booking')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeFormTab === 'booking'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
                }`}
              >
                <Bed className="w-4 h-4" />
                <span>Room Booking</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('message')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer relative ${
                  activeFormTab === 'message'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Owner</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-900/80 text-blue-200 uppercase">
                  Direct
                </span>
              </button>
            </div>

            {/* TAB 1: BOOKING FORM */}
            {activeFormTab === 'booking' ? (
              <>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-blue-900/50">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Online Reservation Form
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-1 font-display">
                      Booking Inquiry
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Direct booking rate</span>
                    <span className="text-xs font-semibold text-emerald-400">No Booking Fee</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                    Booking Request Sent
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Cheers, {fullName}!
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                    We have received your reservation request for <strong className="text-white">{selectedRoom.name}</strong>. Your confirmation reference is:
                  </p>
                  <div className="inline-block mt-3 px-5 py-2.5 bg-blue-950/80 border border-blue-700/60 rounded-xl text-xl font-mono font-bold tracking-wider text-red-400">
                    {bookingRef}
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 rounded-lg px-3 py-1.5 max-w-fit mx-auto">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved to Supabase Cloud Database (kvywjpwwnwaybqrveoqj)</span>
                  </div>
                </div>

                <div className="bg-[#0c1a40] border border-blue-900/50 rounded-xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between py-1 border-b border-blue-900/40">
                    <span className="text-slate-400">Dates:</span>
                    <span className="font-semibold text-white">{checkIn} to {checkOut} ({nights} nights)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-900/40">
                    <span className="text-slate-400">Guests:</span>
                    <span className="font-semibold text-white">{guests} guest{guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-900/40">
                    <span className="text-slate-400">Estimated Total:</span>
                    <span className="font-bold text-red-400 text-sm">${totalPrice} NZD</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Hostel Address:</span>
                    <span className="font-semibold text-white">6a Glenside Crescent, Eden Terrace</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Confirm Instantly via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3.5 bg-blue-900/50 hover:bg-blue-900 text-slate-200 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Duplicate email alert banner */}
                {errorMessage && (
                  <div className="p-4 bg-red-950/90 border border-red-600 rounded-2xl text-xs sm:text-sm text-red-200 flex items-start gap-3 shadow-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-red-300">Booking Limit Exceeded</span>
                      <p className="mt-1 text-slate-200 leading-relaxed">{errorMessage}</p>
                      <p className="mt-1.5 text-[11px] text-red-300/80">
                        Please contact reception via WhatsApp if you need to update an existing reservation.
                      </p>
                    </div>
                  </div>
                )}

                {/* Room Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    1. Select Accommodation Type *
                  </label>
                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-medium"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#09122c]">
                        {r.name} — ${r.priceNZD} NZD/night ({r.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-red-500" />
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-red-500" />
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-red-500" />
                    Number of Guests *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-[#09122c]">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Taylor"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Phone / WhatsApp Number (with country code)
                  </label>
                  <input
                    type="tel"
                    placeholder="+64 21 000 0000 or +44 7000 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Special Requests or Arrival Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Arriving on evening flight from Singapore, request lower bunk, early luggage drop-off"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                {/* Live Price Estimation Box */}
                <div className="bg-[#091538] border border-blue-800/60 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Calculated Rate: {nights} {nights === 1 ? 'night' : 'nights'} × ${selectedRoom.priceNZD} NZD
                    </span>
                    <span className="text-xs text-slate-400">
                      Guests: {guests} {guests === 1 ? 'traveler' : 'travelers'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-red-500 font-display">
                      ${totalPrice} <span className="text-xs text-slate-300">NZD</span>
                    </span>
                    <span className="block text-[11px] text-emerald-400 font-medium">
                      Taxes, linen & Wi-Fi included
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-xl shadow-xl shadow-red-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving to Supabase Database...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Booking Inquiry</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-slate-400">
                  Instant confirmation without deposit. You can also contact us directly below.
                </p>
              </form>
            )}
          </>
        ) : (
          /* TAB 2: DIRECT MESSAGE TO OWNER FORM */
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-blue-900/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Direct Hostel Communication
                </span>
                <h2 className="text-2xl font-bold text-white mt-1 font-display">
                  Message the Owner
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Stars Hostel Auckland</span>
                <span className="text-xs font-semibold text-red-400">Owner & Management</span>
              </div>
            </div>

            {isMsgSubmitted ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                    Message Sent Successfully
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Thank You, {msgName}!
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                    Your message regarding <strong className="text-white">"{msgSubject}"</strong> has been saved directly into our management inbox. The owner/manager will review it promptly.
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 rounded-lg px-3 py-1.5 max-w-fit mx-auto">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved to Supabase 'messages' table (kvywjpwwnwaybqrveoqj)</span>
                  </div>
                </div>

                <div className="bg-[#0c1a40] border border-blue-900/50 rounded-xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between py-1 border-b border-blue-900/40">
                    <span className="text-slate-400">Sender:</span>
                    <span className="font-semibold text-white">{msgName} ({msgEmail})</span>
                  </div>
                  {msgPhone && (
                    <div className="flex justify-between py-1 border-b border-blue-900/40">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-semibold text-white">{msgPhone}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-blue-900/40">
                    <span className="text-slate-400">Topic:</span>
                    <span className="font-semibold text-red-300">{msgSubject}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-400 block mb-1">Your Message:</span>
                    <p className="text-slate-200 italic bg-[#070e24] p-3 rounded-lg border border-blue-900/30">
                      "{msgBody}"
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.rawPhone}?text=${encodeURIComponent(
                      `Kia Ora Stars Hostel Owner! My name is ${msgName} (${msgEmail}). I just submitted an inquiry on your website:\n\nSubject: ${msgSubject}\nMessage: ${msgBody}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Forward to Owner's WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsMsgSubmitted(false);
                      setMsgBody('');
                    }}
                    className="px-6 py-3.5 bg-blue-900/50 hover:bg-blue-900 text-slate-200 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                {msgError && (
                  <div className="p-4 bg-red-950/90 border border-red-600 rounded-2xl text-xs sm:text-sm text-red-200 flex items-start gap-3 shadow-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-red-300">Message Error</span>
                      <p className="mt-1 text-slate-200">{msgError}</p>
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-slate-300 flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Use this form to message the owner directly about room inquiries, custom long-term stays, group bookings, or feedback.
                  </span>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Smith / Sarah Taylor"
                    value={msgName}
                    onChange={(e) => setMsgName(e.target.value)}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="liam@example.com"
                      value={msgEmail}
                      onChange={(e) => setMsgEmail(e.target.value)}
                      className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+64 21 000 0000"
                      value={msgPhone}
                      onChange={(e) => setMsgPhone(e.target.value)}
                      className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Subject / Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Subject / Inquiry Category *
                  </label>
                  <select
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-medium"
                  >
                    <option value="General Question for Owner">General Question for Hostel Owner</option>
                    <option value="Long-term Stay Inquiry (Weekly / Monthly)">Long-term Stay Inquiry (Weekly / Monthly Discount)</option>
                    <option value="Group Booking (6+ Guests)">Group Booking (6+ Guests)</option>
                    <option value="Late Night Check-in / Flight Arrival Query">Late Night Check-in / Flight Arrival Query</option>
                    <option value="Luggage Storage / Parking Inquiry">Luggage Storage / Parking Inquiry</option>
                    <option value="Feedback or Compliment for Management">Feedback or Compliment for Management</option>
                  </select>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Message to Owner *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message, questions, dates, or details for the owner here..."
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                    className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                {/* Submit message button */}
                <button
                  type="submit"
                  disabled={isMsgSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-xl shadow-xl shadow-red-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isMsgSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Delivering Message to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message to Owner</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Direct line: +64 21 938 777</span>
                  <span>Saved directly in Supabase DB</span>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

          {/* RIGHT: Contact Information, WhatsApp & Reception (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Booking Card */}
            <div className="bg-gradient-to-br from-emerald-950/80 to-[#071a17] border border-emerald-600/40 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Fast WhatsApp Booking
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">
                    Typical response time: Under 15 mins
                  </p>
                </div>
              </div>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Need an immediate bed tonight or have custom travel inquiries? Chat with our Auckland reception desk via WhatsApp.
              </p>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message +64 21 938 777</span>
              </a>
            </div>

            {/* Direct Contact Details Card */}
            <div className="bg-[#0b1538] border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white font-display border-b border-blue-900/40 pb-3">
                Hostel Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-red-600/20 text-red-400 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Address</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Eden Terrace, Auckland 1010, New Zealand
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-red-600/20 text-red-400 rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Direct Telephone</h4>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-sm font-bold text-white hover:text-red-400 transition-colors mt-0.5 block"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">
                      International: +64 21 938 777
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-red-600/20 text-red-400 rounded-xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Email Inquiries</h4>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-sm font-semibold text-slate-200 hover:text-red-400 transition-colors mt-0.5 block"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-red-600/20 text-red-400 rounded-xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Reception Desk Hours</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      Check-in: 2:00 PM – 10:00 PM
                    </p>
                    <p className="text-xs text-slate-400">
                      Check-out: 10:00 AM (24/7 keyless code after hours)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auckland Transit & Getting Here */}
            <div className="bg-[#0b1538] border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white font-display mb-4">
                Getting to Stars Hostel
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Plane className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>From Auckland Airport:</strong> SkyDrive bus to central city or 25-minute taxi/rideshare directly to Glenside Crescent.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Bus className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>By Public Bus:</strong> Routes along New North Road and Symonds Street arrive every 5 minutes from Britomart Station.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>On Foot:</strong> 12-minute walk to Ponsonby Road boutique dining & K-Road cafes.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* GOOGLE MAPS SHOWING HOSTEL ADDRESS */}
        <div className="mt-20">
          <div className="bg-[#0b1538] border border-blue-900/60 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 sm:p-8 bg-[#0d1c44] border-b border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                  Interactive Location Map
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5 font-display">
                  Stars Hostel Auckland on Google Maps
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  6a Glenside Crescent, Eden Terrace, Auckland 1010, New Zealand
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('6a Glenside Crescent, Eden Terrace, Auckland 1010, New Zealand')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps App</span>
              </a>
            </div>

            {/* Embedded Google Map iframe showing exact address */}
            <div className="relative w-full h-[420px] bg-slate-900">
              <iframe
                title="Stars Hostel Auckland Map Location"
                src="https://maps.google.com/maps?q=6a%20Glenside%20Crescent,%20Eden%20Terrace,%20Auckland%201010,%20New%20Zealand&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              Got Questions?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 font-display">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Everything you need to know about checking in, security, and hostel amenities.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#0b1538] border border-blue-900/50 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 text-white hover:text-red-400 transition-colors focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-red-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-900/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
