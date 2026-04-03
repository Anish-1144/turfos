"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { SPACES, spaceById } from "@/lib/booking/constants";
import { useBooking } from "@/lib/booking/context";
import type { SpaceId } from "@/lib/booking/types";
import {
  BookingEyebrow,
  BookingLead,
  BookingPanel,
  BookingMetaRow,
  BookingTitle,
} from "./components/BookingShell";

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const statusStyles = {
  available:
    "border-[#A8E040] bg-[#E8F5E9] text-[#1A4526] hover:bg-[#A8E040]/35 cursor-pointer",
  limited:
    "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 cursor-pointer",
  booked:
    "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-80",
} as const;

export default function BookingPage() {
  const router = useRouter();
  const {
    draft,
    setSpaceId,
    setDate,
    setSlotStart,
    setDurationMinutes,
    slotsForSelection,
    canPickSlot,
    scheduleTick,
  } = useBooking();

  const today = useMemo(() => new Date(), []);
  const [durationInput, setDurationInput] = useState(() =>
    String(draft.durationMinutes),
  );

  useEffect(() => {
    setDurationInput(String(draft.durationMinutes));
  }, [draft.durationMinutes]);

  const commitDurationInput = () => {
    let n = parseInt(durationInput.replace(/\D/g, ""), 10);
    if (Number.isNaN(n) || n < 30) n = 60;
    n = Math.min(240, Math.round(n / 15) * 15);
    setDurationMinutes(n);
    setDurationInput(String(n));
  };

  const [viewDate, setViewDate] = useState(() => {
    if (draft.date) {
      const [y, m] = draft.date.split("-").map(Number);
      return new Date(y!, m! - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  useEffect(() => {
    if (!draft.date) return;
    const [y, m] = draft.date.split("-").map(Number);
    setViewDate(new Date(y!, m! - 1, 1));
  }, [draft.date]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isPastDay = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(today);
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const pickDay = (day: number) => {
    if (isPastDay(day)) return;
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setDate(iso);
  };

  const canContinue = Boolean(draft.spaceId && draft.date && draft.slotStart);

  const goCheckout = () => {
    if (canContinue) router.push("/booking/checkout");
  };

  return (
    <div>
      <BookingEyebrow>Book</BookingEyebrow>
      <BookingTitle>Space &amp; time</BookingTitle>
     
      <BookingMetaRow>
        <Radio className="h-3.5 w-3.5 shrink-0 animate-pulse text-[#A8E040]" />
        <span>Live slot grid</span>
        <span className="text-white/30">·</span>
        <span className="font-mono text-white/40">{scheduleTick}</span>
      </BookingMetaRow>

      <BookingPanel className="mt-6">
        <p className="font-syne text-sm font-bold text-gray-900">Space</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {SPACES.map((s) => {
            const selected = draft.spaceId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSpaceId(s.id)}
                className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left transition-all ${
                  selected
                    ? "border-[#1A4526] bg-[#E8F5E9] ring-2 ring-[#A8E040]/40"
                    : "border-gray-200 hover:border-[#A8E040]/60"
                }`}
              >
                <span className="font-syne text-sm font-bold text-gray-900">
                  {s.label}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected
                      ? "border-[#1A4526] bg-[#1A4526] text-white"
                      : "border-gray-200 text-transparent"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        <label
          htmlFor="booking-duration"
          className="mt-6 block font-syne text-sm font-bold text-gray-900"
        >
          Duration
        </label>
        <p className="mt-1 font-dm text-xs text-gray-500">
          Minutes (30–240, 15-minute steps — e.g. 60, 90, 120)
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <input
            id="booking-duration"
            type="number"
            inputMode="numeric"
            min={30}
            max={240}
            step={15}
            value={durationInput}
            onChange={(e) => {
              const v = e.target.value;
              setDurationInput(v);
              const n = parseInt(v, 10);
              if (!Number.isNaN(n) && n >= 30 && n <= 240) {
                setDurationMinutes(n);
              }
            }}
            onBlur={commitDurationInput}
            className="w-full max-w-[200px] rounded-xl border border-gray-200 bg-white px-3 py-2.5 font-dm text-sm font-medium text-gray-900 outline-none transition-colors focus:border-[#1A4526] focus:ring-2 focus:ring-[#A8E040]/40 sm:max-w-[220px]"
            aria-describedby="booking-duration-hint"
          />
          <span className="font-dm text-sm text-gray-500">minutes</span>
        </div>
        <p id="booking-duration-hint" className="sr-only">
          Booking length in minutes from 30 to 240, rounded to 15 minutes when
          you leave the field.
        </p>
      </BookingPanel>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <BookingPanel>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-syne text-sm font-bold text-gray-900">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {WEEK.map((w) => (
              <div
                key={w}
                className="py-1 text-center font-dm text-[10px] font-semibold text-gray-400"
              >
                {w}
              </div>
            ))}
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} />;
              const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const selected = draft.date === iso;
              const past = isPastDay(d);
              const isToday =
                d === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              return (
                <button
                  key={i}
                  type="button"
                  disabled={past}
                  onClick={() => pickDay(d)}
                  className={`flex h-8 items-center justify-center rounded-lg font-dm text-[11px] font-medium ${
                    past
                      ? "cursor-not-allowed text-gray-300"
                      : selected
                        ? "bg-[#1A4526] font-bold text-white ring-2 ring-[#A8E040]/60"
                        : isToday
                          ? "bg-[#E8F5E9] text-[#1A4526]"
                          : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </BookingPanel>

        <BookingPanel>
          <h2 className="font-syne text-sm font-bold text-gray-900">
            Time slots
          </h2>
          <p className="mt-0.5 font-dm text-[10px] text-gray-500 sm:text-xs">
            {!draft.spaceId
              ? "Select a space first"
              : `${spaceById(draft.spaceId).label} · green open · amber limited`}
          </p>
          <div className="mt-3 grid max-h-[220px] grid-cols-3 gap-1.5 overflow-y-auto sm:max-h-[280px] sm:grid-cols-4 sm:gap-2">
            {draft.spaceId &&
              slotsForSelection.map((slot) => {
                const ok = canPickSlot(slot.time);
                const active = draft.slotStart === slot.time;
                const disabled = slot.status === "booked" || !ok;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) setSlotStart(slot.time);
                    }}
                    className={`rounded-lg border px-1 py-2 text-center font-syne text-xs font-bold sm:text-sm ${
                      active ? "ring-2 ring-[#1A4526] ring-offset-1" : ""
                    } ${
                      disabled
                        ? statusStyles.booked
                        : slot.status === "limited"
                          ? statusStyles.limited
                          : statusStyles.available
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
          </div>
        </BookingPanel>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={goCheckout}
          className="w-full rounded-lg bg-gray-900 py-3 font-dm text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-500 sm:w-auto sm:px-10"
        >
          Continue to checkout
        </button>
      </div>
    </div>
  );
}
