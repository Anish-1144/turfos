import { SESSION_PREFILL_KEY } from "./constants";
import type { SpaceId } from "./types";

const MAX_AGE_MS = 120_000;

export type HeroPrefillPayload = {
  date: string;
  spaceId?: SpaceId;
  /** Optional; defaults to 60 in booking context */
  durationMinutes?: number;
  /** Optional; user picks slot on /booking when omitted */
  time?: string;
  _ts?: number;
};

export function readHeroPrefill(): HeroPrefillPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_PREFILL_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as HeroPrefillPayload;
    if (!p?.date) return null;
    if (p._ts != null && Date.now() - p._ts > MAX_AGE_MS) return null;
    return p;
  } catch {
    return null;
  }
}

export function clearHeroPrefill(): void {
  sessionStorage.removeItem(SESSION_PREFILL_KEY);
}
