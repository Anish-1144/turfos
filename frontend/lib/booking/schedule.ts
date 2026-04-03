import type { CompletedBooking, SpaceId, SlotStatus } from "./types";
import { loadAllBookingsIncludingCancelled, initialsFromName } from "./storage";

export type ScheduleSlot = {
  time: string;
  status: SlotStatus;
  initials?: string;
};

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6); // 06–21

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function minutesFromMidnight(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h! * 60 + (m ?? 0);
}

export function bookingCoversSlotHour(
  booking: Pick<CompletedBooking, "slotStart" | "slotEnd">,
  hourLabel: string
): boolean {
  const bs = minutesFromMidnight(booking.slotStart);
  const be = minutesFromMidnight(booking.slotEnd);
  if (be <= bs) return hourLabel === booking.slotStart;
  const hs = minutesFromMidnight(hourLabel);
  const he = hs + 60;
  return bs < he && be > hs;
}

function hashSeed(parts: string[]): number {
  const s = parts.join("|");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Deterministic “base” availability; `tick` nudges a slot for a live feel. */
export function buildScheduleSlots(
  date: string,
  spaceId: SpaceId,
  tick: number
): ScheduleSlot[] {
  const bookings = loadAllBookingsIncludingCancelled().filter(
    (b) =>
      !b.cancelled && b.date === date && b.spaceId === spaceId
  );

  const seed = hashSeed([date, spaceId]);
  const volatile = (seed + tick * 7919) % 1000;

  return HOURS.map((h, idx) => {
    const time = `${pad(h)}:00`;
    const match = bookings.find((b) => bookingCoversSlotHour(b, time));
    if (match) {
      return {
        time,
        status: "booked" as const,
        initials: initialsFromName(match.customerName),
      };
    }

    const roll = (seed + idx * 97 + volatile) % 100;
    let status: SlotStatus = "available";
    if (roll < 18) status = "booked";
    else if (roll < 32) status = "limited";

    return { time, status };
  });
}

export function slotEnd(start: string, durationMinutes: number): string {
  const [hh, mm] = start.split(":").map(Number);
  const startM = hh! * 60 + (mm ?? 0);
  const endM = startM + durationMinutes;
  const eH = Math.floor(endM / 60) % 24;
  const eM = endM % 60;
  return `${pad(eH)}:${pad(eM)}`;
}

export function isSlotBookable(
  slots: ScheduleSlot[],
  slotStart: string,
  durationMinutes: number
): boolean {
  const startIdx = slots.findIndex((s) => s.time === slotStart);
  if (startIdx === -1) return false;
  const steps = Math.ceil(durationMinutes / 60);
  for (let i = 0; i < steps; i++) {
    const s = slots[startIdx + i];
    if (!s || s.status === "booked") return false;
  }
  return true;
}
