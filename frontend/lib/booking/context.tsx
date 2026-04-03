"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { priceForSelection, spaceById } from "./constants";
import { readHeroPrefill } from "./prefill";
import {
  generateAccessCode,
  saveBooking,
  setLastBooking,
} from "./storage";
import { isSlotBookable, buildScheduleSlots, slotEnd } from "./schedule";
import type { BookingDraft, CompletedBooking, SpaceId } from "./types";

const LOCATIONS_FALLBACK = "Baseline Grounds";

function freshDraft(): BookingDraft {
  return {
    location: LOCATIONS_FALLBACK,
    spaceId: null,
    durationMinutes: 60,
    date: null,
    slotStart: null,
    customer: {
      name: "",
      email: "",
      phone: "",
      waiverAccepted: false,
    },
  };
}

function todayYMD() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

function freshDraftWithToday(): BookingDraft {
  return { ...freshDraft(), date: todayYMD() };
}

type BookingContextValue = {
  draft: BookingDraft;
  scheduleTick: number;
  completed: CompletedBooking | null;
  setLocation: (v: string) => void;
  setSpaceId: (id: SpaceId) => void;
  setDurationMinutes: (m: number) => void;
  setDate: (d: string | null) => void;
  setSlotStart: (t: string | null) => void;
  setCustomer: (p: Partial<BookingDraft["customer"]>) => void;
  amountCents: number;
  slotsForSelection: ReturnType<typeof buildScheduleSlots>;
  canPickSlot: (time: string) => boolean;
  finalizeAfterPayment: (paymentIntentId?: string | null) => CompletedBooking | null;
  resetFlow: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [draft, setDraft] = useState<BookingDraft>(() => freshDraft());
  const [scheduleTick, setScheduleTick] = useState(0);
  const [completed, setCompleted] = useState<CompletedBooking | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setScheduleTick((t) => t + 1);
    }, 14_000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const p = readHeroPrefill();
    if (p) {
      setDraft((d) => ({
        ...d,
        ...(p.spaceId ? { spaceId: p.spaceId } : {}),
        durationMinutes: p.durationMinutes ?? 60,
        date: p.date,
        slotStart: p.time ?? null,
        customer: { ...d.customer },
      }));
    } else {
      setDraft((d) => (d.date ? d : { ...d, date: todayYMD() }));
    }
  }, []);

  const setLocation = useCallback((location: string) => {
    setDraft((d) => ({ ...d, location }));
  }, []);

  const setSpaceId = useCallback((spaceId: SpaceId) => {
    setDraft((d) => ({ ...d, spaceId }));
  }, []);

  const setDurationMinutes = useCallback((durationMinutes: number) => {
    setDraft((d) => ({ ...d, durationMinutes }));
  }, []);

  const setDate = useCallback((date: string | null) => {
    setDraft((d) => ({ ...d, date, slotStart: null }));
  }, []);

  const setSlotStart = useCallback((slotStart: string | null) => {
    setDraft((d) => ({ ...d, slotStart }));
  }, []);

  const setCustomer = useCallback((p: Partial<BookingDraft["customer"]>) => {
    setDraft((d) => ({ ...d, customer: { ...d.customer, ...p } }));
  }, []);

  const slotsForSelection = useMemo(() => {
    if (!draft.date || !draft.spaceId) return [];
    return buildScheduleSlots(draft.date, draft.spaceId, scheduleTick);
  }, [draft.date, draft.spaceId, scheduleTick]);

  const canPickSlot = useCallback(
    (time: string) => {
      if (!draft.spaceId || !draft.date) return false;
      const slots = buildScheduleSlots(
        draft.date,
        draft.spaceId,
        scheduleTick
      );
      return isSlotBookable(slots, time, draft.durationMinutes);
    },
    [draft.date, draft.spaceId, draft.durationMinutes, scheduleTick]
  );

  const amountCents = useMemo(() => {
    if (!draft.spaceId) return 0;
    return priceForSelection(draft.spaceId, draft.durationMinutes);
  }, [draft.spaceId, draft.durationMinutes]);

  const finalizeAfterPayment = useCallback(
    (paymentIntentId?: string | null) => {
      if (
        !draft.spaceId ||
        !draft.date ||
        !draft.slotStart ||
        !draft.customer.name.trim() ||
        !draft.customer.email.trim()
      ) {
        return null;
      }
      const space = spaceById(draft.spaceId);
      const booking: CompletedBooking = {
        id: crypto.randomUUID(),
        accessCode: generateAccessCode(),
        spaceId: draft.spaceId,
        spaceLabel: space.label,
        location: draft.location,
        date: draft.date,
        slotStart: draft.slotStart,
        slotEnd: slotEnd(draft.slotStart, draft.durationMinutes),
        durationMinutes: draft.durationMinutes,
        customerName: draft.customer.name.trim(),
        customerEmail: draft.customer.email.trim(),
        customerPhone: draft.customer.phone.trim(),
        waiverAccepted: draft.customer.waiverAccepted,
        amountCents: amountCents,
        createdAt: new Date().toISOString(),
        paymentIntentId: paymentIntentId ?? null,
      };
      saveBooking(booking);
      setLastBooking(booking);
      setCompleted(booking);
      setDraft(freshDraftWithToday());
      return booking;
    },
    [draft, amountCents]
  );

  const resetFlow = useCallback(() => {
    setDraft(freshDraftWithToday());
    setCompleted(null);
    router.push("/booking");
  }, [router]);

  const value = useMemo(
    () => ({
      draft,
      scheduleTick,
      completed,
      setLocation,
      setSpaceId,
      setDurationMinutes,
      setDate,
      setSlotStart,
      setCustomer,
      amountCents,
      slotsForSelection,
      canPickSlot,
      finalizeAfterPayment,
      resetFlow,
    }),
    [
      draft,
      scheduleTick,
      completed,
      setLocation,
      setSpaceId,
      setDurationMinutes,
      setDate,
      setSlotStart,
      setCustomer,
      amountCents,
      slotsForSelection,
      canPickSlot,
      finalizeAfterPayment,
      resetFlow,
    ]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
