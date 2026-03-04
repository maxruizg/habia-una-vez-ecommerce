import type { Booking, BlockedDate, GuestTier, DayType } from "./types";
import { supabase } from "./supabase.server";

export type { Booking, BlockedDate };
export { packages, addons, characters, menuItems, siteSettings } from "./data";

// ---------------------------------------------------------------------------
// Row ↔ Domain mappers
// ---------------------------------------------------------------------------

interface BookingRow {
  id: string;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_id: string;
  event_date: string;
  guest_count: number;
  child_count: number | null;
  adult_count: number | null;
  guest_tier: number | null;
  day_type: string | null;
  selected_adult_menu: string[] | null;
  selected_kids_menu: string[] | null;
  addons: { addonId: string; quantity: number }[];
  subtotal: number;
  status: string;
  notes: string | null;
  created_at: string;
}

function rowToBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    bookingNumber: row.booking_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    packageId: row.package_id,
    eventDate: row.event_date,
    guestCount: row.guest_count,
    childCount: row.child_count ?? undefined,
    adultCount: row.adult_count ?? undefined,
    guestTier: (row.guest_tier as GuestTier) ?? undefined,
    dayType: (row.day_type as DayType) ?? undefined,
    selectedAdultMenu: row.selected_adult_menu ?? undefined,
    selectedKidsMenu: row.selected_kids_menu ?? undefined,
    addons: row.addons ?? [],
    subtotal: Number(row.subtotal),
    status: row.status as Booking["status"],
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  };
}

function bookingToRow(
  booking: Omit<Booking, "id">
): Omit<BookingRow, "id"> {
  return {
    booking_number: booking.bookingNumber,
    customer_name: booking.customerName,
    customer_email: booking.customerEmail,
    customer_phone: booking.customerPhone,
    package_id: booking.packageId,
    event_date: booking.eventDate,
    guest_count: booking.guestCount,
    child_count: booking.childCount ?? null,
    adult_count: booking.adultCount ?? null,
    guest_tier: booking.guestTier ?? null,
    day_type: booking.dayType ?? null,
    selected_adult_menu: booking.selectedAdultMenu ?? null,
    selected_kids_menu: booking.selectedKidsMenu ?? null,
    addons: booking.addons,
    subtotal: booking.subtotal,
    status: booking.status,
    notes: booking.notes ?? null,
    created_at: booking.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as BookingRow[]).map(rowToBooking);
}

export async function getBooking(id: string): Promise<Booking | undefined> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToBooking(data as BookingRow) : undefined;
}

export async function getBookingByNumber(
  bookingNumber: string
): Promise<Booking | undefined> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_number", bookingNumber)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToBooking(data as BookingRow) : undefined;
}

export async function createBooking(
  booking: Omit<Booking, "id">
): Promise<Booking> {
  const row = bookingToRow(booking);
  const { data, error } = await supabase
    .from("bookings")
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return rowToBooking(data as BookingRow);
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<Booking | undefined> {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data ? rowToBooking(data as BookingRow) : undefined;
}

// ---------------------------------------------------------------------------
// Blocked dates
// ---------------------------------------------------------------------------

export async function getBlockedDates(): Promise<BlockedDate[]> {
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .order("date");

  if (error) throw error;
  return (data ?? []).map((d) => ({
    date: d.date as string,
    reason: (d.reason as string) ?? undefined,
  }));
}

export async function addBlockedDate(
  date: string,
  reason?: string
): Promise<void> {
  const { error } = await supabase
    .from("blocked_dates")
    .upsert({ date, reason: reason ?? null });

  if (error) throw error;
}

export async function removeBlockedDate(date: string): Promise<void> {
  const { error } = await supabase
    .from("blocked_dates")
    .delete()
    .eq("date", date);

  if (error) throw error;
}

export async function isDateBlocked(date: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("blocked_dates")
    .select("*", { count: "exact", head: true })
    .eq("date", date);

  if (error) throw error;
  return (count ?? 0) > 0;
}

export async function isDateBooked(date: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("event_date", date)
    .neq("status", "cancelada");

  if (error) throw error;
  return (count ?? 0) > 0;
}
