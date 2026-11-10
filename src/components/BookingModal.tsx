import React, { useState, useEffect } from 'react';
import { ROOMS_DATA, BUSINESS_INFO } from '../data/hostelData';
import { saveBookingToSupabase } from '../lib/supabase';
import { X, Calendar, Users, CheckCircle2, MessageCircle, BedDouble, Shield, ArrowRight, Database, Loader2, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
}) => {
  // Format dates for input: tomorrow and 3 days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const threeDays = new Date();
  threeDays.setDate(threeDays.getDate() + 4);
  const threeDaysStr = threeDays.toISOString().split('T')[0];

  const [roomId, setRoomId] = useState<string>(preSelectedRoomId || ROOMS_DATA[0].id);
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

  useEffect(() => {
    if (preSelectedRoomId) {
      setRoomId(preSelectedRoomId);
    }
  }, [preSelectedRoomId]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];

  // Calculate nights
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

    // Save to Supabase backend
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

  const resetAndClose = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Kia Ora Stars Hostel! I would like to book:\n• Room: ${selectedRoom.name}\n• Dates: ${checkIn} to ${checkOut} (${nights} nights)\n• Guests: ${guests}\n• Name: ${fullName || 'Guest'}\n• Reference: ${bookingRef || 'Inquiry'}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#09122d] border border-blue-900/60 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8 animate-in fade-in duration-200">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d1a42] border-b border-blue-900/40">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
              {isSubmitted ? 'Booking Reservation Confirmed' : 'Instant Booking Inquiry'}
            </h3>
            <p className="text-xs text-slate-400">
              Stars Hostel · 6a Glenside Crescent, Auckland
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-blue-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                Reservation Request Received
              </span>
              <h4 className="text-2xl font-bold text-white mt-1">
                Thank You, {fullName}!
              </h4>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Your booking inquiry for <strong className="text-white">{selectedRoom.name}</strong> has been registered under booking reference:
              </p>
              <div className="inline-block mt-3 px-4 py-2 bg-blue-950/80 border border-blue-700/50 rounded-lg text-lg font-mono font-bold tracking-wider text-red-400">
                {bookingRef}
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 rounded-lg px-3 py-1.5 max-w-fit mx-auto">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Synced to Supabase Cloud Database</span>
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-[#0c1a40] border border-blue-900/50 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-blue-900/40">
                <span className="text-slate-400">Stay Duration:</span>
                <span className="font-semibold text-white">{checkIn} to {checkOut} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/40">
                <span className="text-slate-400">Guests:</span>
                <span className="font-semibold text-white">{guests} guest{guests > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-900/40">
                <span className="text-slate-400">Total Estimate:</span>
                <span className="font-bold text-red-400 text-sm">${totalPrice} NZD</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Confirmation Sent To:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">{email}</span>
              </div>
            </div>

            {/* Fast WhatsApp confirmation */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.rawPhone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-colors shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                Confirm on WhatsApp
              </a>
              <button
                onClick={resetAndClose}
                className="px-5 py-3 bg-blue-900/60 hover:bg-blue-900 text-slate-200 rounded-lg font-semibold text-sm transition-colors"
              >
                Done & Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Duplicate email alert banner */}
            {errorMessage && (
              <div className="p-3.5 bg-red-950/90 border border-red-600 rounded-xl text-xs text-red-200 flex items-start gap-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-red-300">Booking Limit Exceeded</span>
                  <p className="mt-0.5 text-slate-200 leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Room selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Select Room Type
              </label>
              <div className="relative">
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  {ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#0a1435]">
                      {r.name} — ${r.priceNZD} NZD/night
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Guest count */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-500" />
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-[#0a1435]">
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Phone Number / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="+64 21 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Special Requests or Estimated Arrival Time (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Arriving late from airport at 11:30 PM, bottom bunk preferred"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#0d1c44] border border-blue-900/60 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            {/* Price calculation bar */}
            <div className="bg-[#0a1639] border border-blue-900/60 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">
                  {nights} {nights === 1 ? 'night' : 'nights'} · {guests} {guests === 1 ? 'guest' : 'guests'}
                </span>
                <span className="text-xs text-slate-400">Direct booking price:</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-red-500">
                  ${totalPrice} <span className="text-xs text-slate-300">NZD</span>
                </span>
                <span className="block text-[10px] text-emerald-400 font-medium">
                  Free cancellation up to 24h before
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-lg shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Supabase...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              No credit card required for inquiry. We will contact you immediately via WhatsApp or Email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
