import type { SpaceId } from "./types";

export const STORAGE_BOOKINGS_KEY = "turfos_bookings_v1";
export const STORAGE_LAST_BOOKING_KEY = "turfos_last_booking_v1";
export const STORAGE_DISPLAY_BANNER_KEY = "turfos_display_banner_v1";
export const SESSION_PREFILL_KEY = "turfos_booking_prefill_v1";

export const LOCATIONS = [
  "Baseline Grounds",
  "City Center Turf",
  "North Arena",
] as const;

export const SPACES: {
  id: SpaceId;
  label: string;
  short: string;
  description: string;
  basePriceCentsPerHour: number;
}[] = [
  {
    id: "full",
    label: "Full Field",
    short: "Full",
    description: "Regulation pitch — ideal for matches and large groups.",
    basePriceCentsPerHour: 150_00,
  },
  {
    id: "cage1",
    label: "Cage 1",
    short: "C1",
    description: "Enclosed cage — great for training and small-sided games.",
    basePriceCentsPerHour: 85_00,
  },
  {
    id: "cage2",
    label: "Cage 2",
    short: "C2",
    description: "Second cage with the same premium surface and lighting.",
    basePriceCentsPerHour: 85_00,
  },
];

export const DURATION_OPTIONS = [
  { minutes: 60, label: "1 hour" },
  { minutes: 90, label: "1.5 hours" },
  { minutes: 120, label: "2 hours" },
] as const;

export function spaceById(id: SpaceId) {
  const s = SPACES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown space: ${id}`);
  return s;
}

export function priceForSelection(
  spaceId: SpaceId,
  durationMinutes: number
): number {
  const s = spaceById(spaceId);
  return Math.round(s.basePriceCentsPerHour * (durationMinutes / 60));
}
