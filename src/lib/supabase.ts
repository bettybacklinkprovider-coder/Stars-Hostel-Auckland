import { createClient } from '@supabase/supabase-js';

// Supabase URL & Public Key provided by user
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://kvywjpwwnwaybqrveoqj.supabase.co';

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_4d5Sj-ZbZLHk49Fl4rScpA_yYJuopM8';

// Create Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface BookingRecord {
  id?: string;
  booking_ref: string;
  full_name: string;
  email: string;
  phone: string;
  room_id: string;
  room_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  total_price_nzd: number;
  special_requests?: string;
  status?: string;
  created_at?: string;
}

export interface ContactMessageRecord {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}


/**
 * Save booking reservation inquiry to Supabase database.
 * Enforces rule: ONLY ONE BOOKING PER EMAIL ADDRESS.
 */
export async function saveBookingToSupabase(
  bookingData: Omit<BookingRecord, 'id' | 'created_at'>
): Promise<{ success: boolean; savedToDb: boolean; alreadyExists?: boolean; error?: string }> {
  try {
    const normalizedEmail = bookingData.email.trim().toLowerCase();

    // 1. Check in Supabase if this email already booked
    try {
      const { data: existingSupabase } = await supabase
        .from('bookings')
        .select('booking_ref, email')
        .ilike('email', normalizedEmail)
        .limit(1);

      if (existingSupabase && existingSupabase.length > 0) {
        return {
          success: false,
          savedToDb: false,
          alreadyExists: true,
          error: `An active booking already exists for this email address (${bookingData.email}) with reference ${existingSupabase[0].booking_ref}. Only 1 booking per email is permitted.`,
        };
      }
    } catch (e) {
      console.warn('Could not check remote email existence:', e);
    }

    // 2. Check in local cache
    const existing = JSON.parse(localStorage.getItem('stars_hostel_bookings') || '[]');
    const localDuplicate = existing.find(
      (b: any) => b.email && b.email.trim().toLowerCase() === normalizedEmail
    );
    if (localDuplicate) {
      return {
        success: false,
        savedToDb: false,
        alreadyExists: true,
        error: `A booking has already been submitted using this email (${bookingData.email}) with reference ${localDuplicate.booking_ref}. Only 1 booking per email is permitted.`,
      };
    }

    const withTimestamp = {
      ...bookingData,
      email: normalizedEmail,
      created_at: new Date().toISOString(),
      status: 'pending',
    };

    // 3. Insert into Supabase 'bookings' table
    const { data, error } = await supabase
      .from('bookings')
      .insert([withTimestamp])
      .select();

    if (error) {
      // Check for PostgreSQL UNIQUE constraint violation (code 23505)
      if (
        error.code === '23505' ||
        error.message?.toLowerCase().includes('unique') ||
        error.message?.toLowerCase().includes('duplicate')
      ) {
        return {
          success: false,
          savedToDb: false,
          alreadyExists: true,
          error: `This email address (${bookingData.email}) already has a confirmed booking in the database. Only 1 booking per email is allowed.`,
        };
      }

      console.warn('Supabase table insert note:', error.message);
      // Save to local cache as fallback if table schema is being set up
      localStorage.setItem('stars_hostel_bookings', JSON.stringify([withTimestamp, ...existing]));
      return { success: true, savedToDb: false, error: error.message };
    }

    // Backup locally as well
    localStorage.setItem('stars_hostel_bookings', JSON.stringify([withTimestamp, ...existing]));
    return { success: true, savedToDb: true };
  } catch (err: any) {
    console.error('Supabase connection error:', err);
    return { success: false, savedToDb: false, error: err?.message || 'Network error' };
  }
}

/**
 * Fetch bookings from Supabase or local cache
 */
export async function getBookingsFromSupabase(): Promise<BookingRecord[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as BookingRecord[];
    }
  } catch (err) {
    console.warn('Falling back to local cached bookings:', err);
  }

  // Fallback to local storage
  const local = JSON.parse(localStorage.getItem('stars_hostel_bookings') || '[]');
  return local as BookingRecord[];
}

/**
 * Quick ping to test Supabase connection
 */
export async function checkSupabaseConnection(): Promise<{ connected: boolean; url: string }> {
  try {
    const { error } = await supabase.from('bookings').select('id').limit(1);
    // If we get here, connection reached Supabase (even if table doesn't exist yet, HTTP 200/400 reached Supabase)
    return { connected: true, url: SUPABASE_URL };
  } catch {
    return { connected: false, url: SUPABASE_URL };
  }
}

/**
 * Save direct message to hostel owner/management in Supabase 'messages' table
 */
export async function saveMessageToSupabase(
  messageData: Omit<ContactMessageRecord, 'id' | 'created_at'>
): Promise<{ success: boolean; savedToDb: boolean; error?: string }> {
  try {
    const withTimestamp = {
      ...messageData,
      status: 'unread',
      created_at: new Date().toISOString(),
    };

    // 1. Local backup
    const existing = JSON.parse(localStorage.getItem('stars_hostel_messages') || '[]');
    localStorage.setItem(
      'stars_hostel_messages',
      JSON.stringify([withTimestamp, ...existing])
    );

    // 2. Insert into Supabase 'messages' table
    const { data, error } = await supabase
      .from('messages')
      .insert([withTimestamp])
      .select();

    if (error) {
      console.warn('Supabase message insert note:', error.message);
      return { success: true, savedToDb: false, error: error.message };
    }

    return { success: true, savedToDb: true };
  } catch (err: any) {
    console.error('Supabase message connection error:', err);
    return { success: false, savedToDb: false, error: err?.message || 'Network error' };
  }
}

/**
 * Fetch messages sent to owner from Supabase or local cache
 */
export async function getMessagesFromSupabase(): Promise<ContactMessageRecord[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as ContactMessageRecord[];
    }
  } catch (err) {
    console.warn('Falling back to local cached messages:', err);
  }

  const local = JSON.parse(localStorage.getItem('stars_hostel_messages') || '[]');
  return local as ContactMessageRecord[];
}

