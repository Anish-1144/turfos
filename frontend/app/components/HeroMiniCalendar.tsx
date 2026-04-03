"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseYMD(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return { y: y!, m: m! - 1, d: d! };
}

function toYMD(y: number, m0: number, day: number) {
  return `${y}-${String(m0 + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

type Props = {
  value: string;
  onChange: (ymd: string) => void;
  className?: string;
};

/** Compact month grid — replaces native date input in the hero card. */
export function HeroMiniCalendar({ value, onChange, className = "" }: Props) {
  const today = useMemo(() => startOfToday(), []);
  const initial = useMemo(() => {
    try {
      const { y, m, d } = parseYMD(value);
      return new Date(y, m, d);
    } catch {
      return today;
    }
  }, [value, today]);

  const [view, setView] = useState(() => {
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });

  useEffect(() => {
    try {
      const { y, m } = parseYMD(value);
      setView(new Date(y, m, 1));
    } catch {
      /* keep view */
    }
  }, [value]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  return (
    <div className={`rounded-xl border border-gray-200 bg-gray-50/80 p-2.5 ${className}`}>
      <div className="mb-2 flex items-center justify-between px-0.5">
        <button
          type="button"
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="font-syne text-xs font-bold text-gray-900">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          aria-label="Next month"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEK.map((w, i) => (
          <div
            key={`${w}-${i}`}
            className="py-0.5 text-center font-dm text-[9px] font-semibold uppercase text-gray-400"
          >
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} className="h-7" />;
          const iso = toYMD(year, month, d);
          const selected = value === iso;
          const past = isPast(d);
          const isToday =
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => !past && onChange(iso)}
              className={`flex h-7 items-center justify-center rounded-md font-dm text-[11px] font-medium transition-colors ${
                past
                  ? "cursor-not-allowed text-gray-300"
                  : selected
                    ? "bg-[#1A4526] font-bold text-white ring-1 ring-[#A8E040]/70"
                    : isToday
                      ? "bg-[#E8F5E9] text-[#1A4526]"
                      : "text-gray-700 hover:bg-white"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
