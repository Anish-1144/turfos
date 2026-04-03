import {
  STORAGE_BOOKINGS_KEY,
  STORAGE_LAST_BOOKING_KEY,
} from "./constants";
import type { CompletedBooking } from "./types";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadBookings(): CompletedBooking[] {
  if (typeof window === "undefined") return [];
  const list = safeParse<CompletedBooking[]>(
    localStorage.getItem(STORAGE_BOOKINGS_KEY)
  );
  return Array.isArray(list) ? list.filter((b) => !b.cancelled) : [];
}

export function loadAllBookingsIncludingCancelled(): CompletedBooking[] {
  if (typeof window === "undefined") return [];
  const list = safeParse<CompletedBooking[]>(
    localStorage.getItem(STORAGE_BOOKINGS_KEY)
  );
  return Array.isArray(list) ? list : [];
}

export function saveBooking(booking: CompletedBooking): void {
  const all = loadAllBookingsIncludingCancelled();
  all.push(booking);
  localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(all));
  localStorage.setItem(STORAGE_LAST_BOOKING_KEY, JSON.stringify(booking));
}

export function setLastBooking(booking: CompletedBooking | null): void {
  if (!booking) {
    localStorage.removeItem(STORAGE_LAST_BOOKING_KEY);
    return;
  }
  localStorage.setItem(STORAGE_LAST_BOOKING_KEY, JSON.stringify(booking));
}

export function getLastBooking(): CompletedBooking | null {
  if (typeof window === "undefined") return null;
  return safeParse<CompletedBooking>(
    localStorage.getItem(STORAGE_LAST_BOOKING_KEY)
  );
}

export function cancelBookingById(id: string): boolean {
  const all = loadAllBookingsIncludingCancelled();
  const idx = all.findIndex((b) => b.id === id && !b.cancelled);
  if (idx === -1) return false;
  all[idx] = { ...all[idx], cancelled: true };
  localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(all));
  return true;
}

export function getBookingsByEmail(email: string): CompletedBooking[] {
  const e = email.trim().toLowerCase();
  return loadAllBookingsIncludingCancelled().filter(
    (b) => b.customerEmail.toLowerCase() === e && !b.cancelled
  );
}

export function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const arr = new Uint8Array(6);
  crypto.getRandomValues(arr);
  for (let i = 0; i < 6; i++) {
    out += chars[arr[i]! % chars.length];
  }
  return out;
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
