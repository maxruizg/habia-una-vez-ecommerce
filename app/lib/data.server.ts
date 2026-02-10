import type { Booking, BlockedDate } from "./types";
export type { Booking, BlockedDate };
export { packages, addons, characters, menuItems, siteSettings } from "./data";

const initialBlockedDates: BlockedDate[] = [
  { date: "2026-03-15", reason: "Mantenimiento del salon" },
  { date: "2026-03-16", reason: "Mantenimiento del salon" },
  { date: "2026-04-01", reason: "Evento privado" },
];

// In-memory bookings store (will be replaced with DB)
let bookingsStore: Booking[] = [
  {
    id: "1",
    bookingNumber: "HUV-2026-0001",
    customerName: "Maria Garcia",
    customerEmail: "maria@example.com",
    customerPhone: "5512345678",
    packageId: "premium",
    eventDate: "2026-03-20",
    guestCount: 45,
    addons: [
      { addonId: "mesa-dulces", quantity: 1 },
      { addonId: "arco-globos", quantity: 1 },
    ],
    subtotal: 20800,
    status: "confirmada",
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "2",
    bookingNumber: "HUV-2026-0002",
    customerName: "Carlos Lopez",
    customerEmail: "carlos@example.com",
    customerPhone: "5587654321",
    packageId: "experiencia-encantada",
    eventDate: "2026-03-25",
    guestCount: 30,
    addons: [],
    subtotal: 8500,
    status: "pendiente",
    createdAt: "2026-02-05T14:30:00Z",
  },
];

export function getBookings() {
  return bookingsStore;
}

export function getBooking(id: string) {
  return bookingsStore.find((b) => b.id === id);
}

export function getBookingByNumber(bookingNumber: string) {
  return bookingsStore.find((b) => b.bookingNumber === bookingNumber);
}

export function createBooking(booking: Omit<Booking, "id">) {
  const newBooking: Booking = {
    ...booking,
    id: String(bookingsStore.length + 1),
  };
  bookingsStore.push(newBooking);
  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking["status"]) {
  const booking = bookingsStore.find((b) => b.id === id);
  if (booking) {
    booking.status = status;
  }
  return booking;
}

// Blocked dates management
let blockedDatesStore = [...initialBlockedDates];

export function getBlockedDates() {
  return blockedDatesStore;
}

export function addBlockedDate(date: string, reason?: string) {
  if (!blockedDatesStore.find((d) => d.date === date)) {
    blockedDatesStore.push({ date, reason });
  }
}

export function removeBlockedDate(date: string) {
  blockedDatesStore = blockedDatesStore.filter((d) => d.date !== date);
}

export function isDateBlocked(date: string) {
  return blockedDatesStore.some((d) => d.date === date);
}

export function isDateBooked(date: string) {
  return bookingsStore.some(
    (b) => b.eventDate === date && b.status !== "cancelada"
  );
}
