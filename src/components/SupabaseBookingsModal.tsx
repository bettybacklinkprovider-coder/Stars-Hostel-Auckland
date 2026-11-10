import React, { useState, useEffect } from 'react';
import {
  getBookingsFromSupabase,
  getMessagesFromSupabase,
  BookingRecord,
  ContactMessageRecord,
} from '../lib/supabase';
import {
  X,
  Database,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Calendar,
  Users,
  MessageSquare,
  Bed,
  ExternalLink,
  Code2,
  Mail,
  Phone
} from 'lucide-react';

interface SupabaseBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseBookingsModal: React.FC<SupabaseBookingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [modalTab, setModalTab] = useState<'bookings' | 'messages' | 'sql'>('bookings');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlSchema = `-- ====================================================================
-- STARS HOSTEL AUCKLAND - SUPABASE SQL SCHEMA
-- Run this in your Supabase Project: SQL Editor -> New Query -> Run
-- ====================================================================

-- 1. MESSAGES TABLE (For direct messages sent to the hostel owner)
-- --------------------------------------------------------------------
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text default 'unread',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on messages
alter table messages enable row level security;

-- Policy 1: Allow any visitor/guest to insert a message
drop policy if exists "Allow public message inserts" on messages;
create policy "Allow public message inserts" on messages
  for insert with check (true);

-- Policy 2: Allow reading messages (for owner management portal)
drop policy if exists "Allow public viewing" on messages;
create policy "Allow public viewing" on messages
  for select using (true);


-- 2. BOOKINGS TABLE (Enforces ONLY 1 BOOKING PER EMAIL)
-- --------------------------------------------------------------------
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  booking_ref text not null,
  full_name text not null,
  email text not null,
  phone text,
  room_id text,
  room_name text,
  check_in text,
  check_out text,
  nights integer,
  guests integer,
  total_price_nzd numeric,
  special_requests text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- STRICT UNIQUE CONSTRAINT: 1 booking per email
  constraint unique_guest_email unique (email)
);

-- Case-insensitive unique index
create unique index if not exists idx_bookings_email_unique 
  on bookings (lower(trim(email)));

-- Enable Row Level Security (RLS) on bookings
alter table bookings enable row level security;

-- Policy 1: Allow public booking submissions
drop policy if exists "Allow public booking submissions" on bookings;
create policy "Allow public booking submissions" on bookings
  for insert with check (true);

-- Policy 2: Allow public viewing for confirmation
drop policy if exists "Allow public viewing" on bookings;
create policy "Allow public viewing" on bookings
  for select using (true);
`;

  const loadData = async () => {
    setIsLoading(true);
    const [bData, mData] = await Promise.all([
      getBookingsFromSupabase(),
      getMessagesFromSupabase(),
    ]);
    setBookings(bData);
    setMessages(mData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#09122d] border border-blue-900/70 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8 animate-in fade-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d1c44] border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  Supabase Management & Inquiries
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                kvywjpwwnwaybqrveoqj.supabase.co
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-blue-900/50 transition-colors cursor-pointer"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-blue-900/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-blue-900/50 bg-[#081129] px-6 pt-3 gap-2">
          <button
            onClick={() => setModalTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer ${
              modalTab === 'bookings'
                ? 'bg-[#0d1c44] text-white border-t-2 border-red-500 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
            }`}
          >
            <Bed className="w-4 h-4 text-red-400" />
            <span>Bookings ({bookings.length})</span>
            <span className="px-1.5 py-0.2 bg-red-950/80 border border-red-800/40 text-[10px] text-red-300 rounded">
              1 per email
            </span>
          </button>

          <button
            onClick={() => setModalTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer ${
              modalTab === 'messages'
                ? 'bg-[#0d1c44] text-white border-t-2 border-red-500 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Owner Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setModalTab('sql')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer ${
              modalTab === 'sql'
                ? 'bg-[#0d1c44] text-white border-t-2 border-red-500 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
            }`}
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>SQL Schema</span>
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: BOOKINGS */}
          {modalTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Guest Bookings (Limit: 1 per email)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Database enforces PostgreSQL unique constraint on guest email.
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Total: {bookings.length}
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl border border-dashed border-blue-900/60 bg-[#070e24]">
                  <Calendar className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-300">No bookings logged yet</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Submit a booking inquiry from the Contact page or click "Book Now" to test!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-blue-900/50">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0c1a40] text-slate-300 border-b border-blue-900/40">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Ref #</th>
                        <th className="px-4 py-3 font-semibold">Guest</th>
                        <th className="px-4 py-3 font-semibold">Room Type</th>
                        <th className="px-4 py-3 font-semibold">Dates</th>
                        <th className="px-4 py-3 font-semibold">Total</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-900/30 bg-[#081028]">
                      {bookings.map((b, idx) => (
                        <tr key={idx} className="hover:bg-blue-900/20 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-red-400 whitespace-nowrap">
                            {b.booking_ref}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-white">{b.full_name}</div>
                            <div className="text-[11px] text-slate-400">{b.email}</div>
                            {b.phone && <div className="text-[10px] text-slate-400">{b.phone}</div>}
                          </td>
                          <td className="px-4 py-3 text-slate-200">
                            {b.room_name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-slate-300">
                            <div>{b.check_in} → {b.check_out}</div>
                            <div className="text-[10px] text-slate-400">{b.nights} nights · {b.guests} guest{b.guests > 1 ? 's' : ''}</div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-emerald-400 whitespace-nowrap">
                            ${b.total_price_nzd} NZD
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                              {b.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: OWNER MESSAGES */}
          {modalTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Direct Messages to Owner ({messages.length})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Inquiries sent by visitors and guests directly through the website.
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">
                  Hostel Management Inbox
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl border border-dashed border-blue-900/60 bg-[#070e24]">
                  <MessageSquare className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-300">No messages received yet</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Visitors can click "Message Owner" on the Contact page to send a message.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#081028] border border-blue-900/50 hover:border-blue-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-blue-900/40">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{m.full_name}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                            {m.subject}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          {m.phone && (
                            <span className="flex items-center gap-1 text-[11px]">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              {m.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[11px]">
                            <Mail className="w-3 h-3 text-red-400" />
                            {m.email}
                          </span>
                          {m.created_at && (
                            <span className="text-[10px] text-slate-500">
                              {new Date(m.created_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed bg-[#060c20] p-3 rounded-lg border border-blue-950/80">
                        "{m.message}"
                      </p>

                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          Status: <strong className="text-emerald-400 font-semibold">{m.status || 'unread'}</strong>
                        </span>
                        <a
                          href={`https://wa.me/${m.phone ? m.phone.replace(/[^0-9]/g, '') : ''}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                        >
                          <span>Reply via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SQL SCHEMA */}
          {modalTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Supabase SQL Schema Script
                  </h4>
                  <p className="text-xs text-slate-400">
                    Copy and run this in your Supabase SQL Editor to create both tables with security policies.
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-lg"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full SQL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-black/60 rounded-xl text-xs text-slate-200 font-mono overflow-x-auto max-h-96 border border-blue-950">
                {sqlSchema}
              </pre>

              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/40 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white">How to execute:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                  <li>Open your Supabase project dashboard (kvywjpwwnwaybqrveoqj).</li>
                  <li>Click on <strong>SQL Editor</strong> in the left sidebar.</li>
                  <li>Click <strong>New query</strong>, paste the code above, and click <strong>Run</strong>.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0d1c44] border-t border-blue-900/40 flex items-center justify-between text-xs text-slate-400">
          <a
            href="https://supabase.com/dashboard/project/kvywjpwwnwaybqrveoqj"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <span>Open Supabase Cloud Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-900/60 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
