"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_DISPLAY_BANNER_KEY } from "@/lib/booking/constants";
import {
  buildScheduleSlots,
  type ScheduleSlot,
} from "@/lib/booking/schedule";
import type { SpaceId } from "@/lib/booking/types";

const DISPLAY_SPACES: {
  id: SpaceId;
  code: string;
  name: string;
  typeLine: string;
}[] = [
  {
    id: "full",
    code: "001",
    name: "Full Field",
    typeLine: "SPACE-001 · Parent",
  },
  {
    id: "cage1",
    code: "002",
    name: "Batting Cage 1",
    typeLine: "SPACE-002 · Child",
  },
  {
    id: "cage2",
    code: "003",
    name: "Batting Cage 2",
    typeLine: "SPACE-003 · Child",
  },
];

const DEFAULT_BANNER =
  "Welcome to TurfOS Indoor Sports Facility — New LED lighting installed in Batting Cage 2";

const BOTTOM_ANNOUNCEMENTS = [
  {
    tag: "NOTICE",
    text: "Welcome to TurfOS Indoor Sports Facility — New LED lighting installed in Batting Cage 2 · Premium facility for Football, Cricket & more",
  },
  {
    tag: "CLOSED",
    text: "Facility closed Monday 7 Apr for maintenance · Normal hours resume Tuesday 8 Apr",
  },
  {
    tag: "⚡ DEAL",
    text: "Flash Deal — 30% OFF Evening slots 5–8 PM today · Use code EVENING30 at checkout",
  },
  {
    tag: "INFO",
    text: "Batting Cage 2 upgraded with new pitching machine · Book online at turfos.com",
  },
  {
    tag: "MEMBERS",
    text: "Membership open access hours: 6–8 AM and 10 PM–12 AM on weekdays",
  },
] as const;

const SIDE_ANNOUNCEMENTS = [
  {
    tag: "NOTICE",
    text: "New LED lighting in Batting Cage 2 — better visibility for evening sessions.",
  },
  {
    tag: "CLOSED",
    text: "Closed Monday 7 Apr for maintenance. Normal hours resume Tuesday.",
  },
  { tag: "DEAL", text: "30% OFF Evening slots 5–8 PM. Code: EVENING30 at checkout." },
  {
    tag: "INFO",
    text: "Cage 2 upgraded with variable-speed pitching machine.",
  },
  {
    tag: "MEMBERS",
    text: "Open access: 6–8 AM & 10 PM–12 AM on weekdays for members.",
  },
] as const;

type AdConfig = {
  tag: string;
  tagClass: "deal" | "info" | "alert" | "";
  headline: string;
  sub: string;
  oldPrice: string;
  newPrice: string;
  expireHour: number | null;
  expireMin: number | null;
};

const ADS: AdConfig[] = [
  {
    tag: "⚡ FLASH DEAL",
    tagClass: "deal",
    headline: "30% OFF — Evening Rush Hour",
    sub: "Book any cage 5–8 PM today · Use code EVENING30",
    oldPrice: "₹800",
    newPrice: "₹560",
    expireHour: 20,
    expireMin: 0,
  },
  {
    tag: "🌙 LAST MINUTE",
    tagClass: "deal",
    headline: "Tonight's Slots Going Fast",
    sub: "Only 2 Full Field slots remaining — book now",
    oldPrice: "₹1200",
    newPrice: "₹960",
    expireHour: 22,
    expireMin: 0,
  },
  {
    tag: "MEMBERSHIP",
    tagClass: "info",
    headline: "Unlimited Off-Peak Access",
    sub: "Join TurfOS Pro — priority bookings & discounted rates",
    oldPrice: "",
    newPrice: "₹1,299/mo",
    expireHour: null,
    expireMin: null,
  },
  {
    tag: "🎯 NEW",
    tagClass: "",
    headline: "Batting Cage 2 — Upgraded Pitching Machine",
    sub: "Variable speed pitching now available · Book Cage 2",
    oldPrice: "",
    newPrice: "Book Now",
    expireHour: null,
    expireMin: null,
  },
];

const AD_DURATION_MS = 10_000;
const REFRESH_SEC = 60;

const noScrollbar =
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-y-auto";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function parseSlotHour(time: string) {
  return Number(time.split(":")[0] ?? 0);
}

function fmtClockHour(h24: number) {
  const ap = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:00 ${ap}`;
}

function slotTimeRangeLabel(time: string) {
  const h = parseSlotHour(time);
  const end = (h + 1) % 24;
  return `${fmtClockHour(h)} – ${fmtClockHour(end)}`;
}

type LiveKind = "available" | "booked" | "upcoming" | "active-now";

function liveKind(slot: ScheduleSlot, date: string): LiveKind {
  const now = new Date();
  const isToday = date === now.toISOString().slice(0, 10);
  const h = parseSlotHour(slot.time);
  const nowH = now.getHours();
  const nowM = now.getMinutes();

  if (slot.status === "booked") {
    if (isToday && nowH === h) return "active-now";
    return "booked";
  }

  if (slot.status === "limited") {
    return "upcoming";
  }

  if (slot.status === "available" && isToday) {
    const minsUntil = (h - nowH) * 60 - nowM;
    if (minsUntil >= 0 && minsUntil <= 30) return "upcoming";
  }

  return "available";
}

function statusLabel(kind: LiveKind) {
  if (kind === "available") return "Available";
  if (kind === "booked") return "Booked";
  if (kind === "upcoming") return "Soon";
  return "In Progress";
}

function getSecondsUntil(
  h: number | null,
  m: number | null,
  now: Date = new Date()
) {
  if (h === null || m === null) return null;
  const target = new Date(now);
  target.setHours(h, m, 0, 0);
  let diff = Math.floor((target.getTime() - now.getTime()) / 1000);
  if (diff < 0) diff += 86400;
  return diff;
}

function fmtCountdown(secs: number | null) {
  if (secs === null) return "--:--:--";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function DisplayPage() {
  const [tick, setTick] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [refreshSecs, setRefreshSecs] = useState(REFRESH_SEC);
  const [banner, setBanner] = useState(DEFAULT_BANNER);
  const [bottomAnnIdx, setBottomAnnIdx] = useState(0);
  const [sideAnnIdx, setSideAnnIdx] = useState(0);
  const [bottomFade, setBottomFade] = useState(true);
  const [sideFade, setSideFade] = useState(true);
  const [adIdx, setAdIdx] = useState(0);
  const [imgOk, setImgOk] = useState(true);
  const adStartRef = useRef(Date.now());

  const date = todayKey();

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_DISPLAY_BANNER_KEY)
        : null;
    if (stored?.trim()) setBanner(stored.trim());
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = new Date();
      setNow(t);
      setRefreshSecs((r) => {
        if (r <= 1) {
          setTick((x) => x + 1);
          return REFRESH_SEC;
        }
        return r - 1;
      });
      if (t.getTime() - adStartRef.current >= AD_DURATION_MS) {
        adStartRef.current = t.getTime();
        setAdIdx((i) => (i + 1) % ADS.length);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBottomFade(false);
      window.setTimeout(() => {
        setBottomAnnIdx((i) => (i + 1) % BOTTOM_ANNOUNCEMENTS.length);
        setBottomFade(true);
      }, 400);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSideFade(false);
      window.setTimeout(() => {
        setSideAnnIdx((i) => (i + 1) % SIDE_ANNOUNCEMENTS.length);
        setSideFade(true);
      }, 400);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const columns = useMemo(() => {
    return DISPLAY_SPACES.map((s) => ({
      ...s,
      slots: buildScheduleSlots(date, s.id, tick),
    }));
  }, [date, tick]);

  const refreshFillPct = (refreshSecs / REFRESH_SEC) * 100;

  const clockStr = useMemo(() => {
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [now]);

  const dateStr = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
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
    return `${days[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }, [now]);

  const ad = ADS[adIdx]!;
  const adProgressPct = Math.max(
    0,
    100 - ((Date.now() - adStartRef.current) / AD_DURATION_MS) * 100
  );
  const expireSecs = getSecondsUntil(ad.expireHour, ad.expireMin, now);

  const tableRows = useMemo(() => {
    const rows: {
      timeLabel: string;
      spaceCode: string;
      spaceName: string;
      customer: string;
      duration: string;
      kind: LiveKind;
    }[] = [];
    for (const col of columns) {
      for (const slot of col.slots) {
        rows.push({
          timeLabel: slotTimeRangeLabel(slot.time),
          spaceCode: `SPACE-${col.code}`,
          spaceName: col.name,
          customer: slot.initials ?? "—",
          duration: "1 hr",
          kind: liveKind(slot, date),
        });
      }
    }
    const hourOrder = (label: string) => {
      const m = label.match(/(\d{1,2}):00\s*(AM|PM)/);
      if (!m) return 0;
      let hr = Number(m[1]);
      const ap = m[2];
      if (ap === "PM" && hr !== 12) hr += 12;
      if (ap === "AM" && hr === 12) hr = 0;
      return hr;
    };
    rows.sort(
      (a, b) =>
        hourOrder(a.timeLabel) - hourOrder(b.timeLabel) ||
        a.spaceCode.localeCompare(b.spaceCode),
    );
    return rows;
  }, [columns, date]);

  const sideAnn = SIDE_ANNOUNCEMENTS[sideAnnIdx]!;
  const bottomAnn = BOTTOM_ANNOUNCEMENTS[bottomAnnIdx]!;

  const slotRowClass = (kind: LiveKind) => {
    const base =
      "mb-[5px] flex items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 transition-all";
    if (kind === "available")
      return `${base} border-[rgba(0,229,122,0.2)] bg-[rgba(0,229,122,0.12)]`;
    if (kind === "booked")
      return `${base} border-[rgba(255,77,77,0.2)] bg-[rgba(255,77,77,0.12)]`;
    if (kind === "upcoming")
      return `${base} animate-[display-glow-yellow_2.5s_ease-in-out_infinite] border-[rgba(245,200,66,0.25)] bg-[rgba(245,200,66,0.12)]`;
    return `${base} border-[rgba(61,158,255,0.3)] bg-[rgba(61,158,255,0.12)]`;
  };

  const pillClass = (kind: LiveKind) => {
    if (kind === "available")
      return "border-[rgba(0,229,122,0.25)] bg-[rgba(0,229,122,0.12)] text-[#00e57a]";
    if (kind === "booked")
      return "border-[rgba(255,77,77,0.25)] bg-[rgba(255,77,77,0.12)] text-[#ff4d4d]";
    if (kind === "upcoming")
      return "border-[rgba(245,200,66,0.3)] bg-[rgba(245,200,66,0.12)] text-[#f5c842]";
    return "border-[rgba(61,158,255,0.3)] bg-[rgba(61,158,255,0.12)] text-[#3d9eff]";
  };

  const adsTagClass =
    ad.tagClass === "deal"
      ? "border-[rgba(245,200,66,0.3)] bg-[rgba(245,200,66,0.1)] text-[#f5c842]"
      : ad.tagClass === "info"
        ? "border-[rgba(61,158,255,0.3)] bg-[rgba(61,158,255,0.1)] text-[#3d9eff]"
        : ad.tagClass === "alert"
          ? "border-[rgba(255,77,77,0.3)] bg-[rgba(255,77,77,0.1)] text-[#ff4d4d]"
          : "border-[rgba(0,229,122,0.3)] bg-[rgba(0,229,122,0.1)] text-[#00e57a]";

  return (
    <div className="fixed inset-0 z-[100] box-border flex flex-col gap-4 overflow-hidden bg-[#080c0f] p-5 font-dm text-[#e8edf2] antialiased">
      {/* Top: logo | schedule | timer */}
      <div className="grid min-h-0 flex-1 grid-cols-[64px_1fr_220px] gap-4">
        {/* Logo strip */}
        <aside className="relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/[0.13] bg-[#0d1317] py-[18px] before:pointer-events-none before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-[#00e57a] before:opacity-80 before:content-['']">
          <div className="h-2 w-2 animate-[display-pulse-dot_2s_ease-in-out_infinite] rounded-full bg-[#00e57a]" />
          <span
            className="select-none font-syne text-[11px] font-extrabold tracking-[0.18em] text-[#00e57a]"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            TURFOS
          </span>
          <div className="h-2 w-2 animate-[display-pulse-dot_2s_ease-in-out_infinite] rounded-full bg-[#00e57a]" />
        </aside>

        {/* Schedule panel */}
        <section className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.13] bg-[#0d1317]">
          {/* Ads banner */}
          <div className="relative shrink-0 overflow-hidden border-b border-[rgba(0,229,122,0.18)] bg-gradient-to-r from-[#0a1a12] via-[#0d1f18] to-[#0a1510] before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:bg-[#00e57a] before:opacity-90 before:content-['']">
            <div className="flex items-center gap-[18px] py-3 pl-[22px] pr-5">
              <span
                className={`shrink-0 rounded-md border px-2.5 py-1 font-syne text-[10px] font-extrabold tracking-[0.14em] ${adsTagClass}`}
              >
                {ad.tag}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-syne text-[15px] font-bold text-[#e8edf2]">
                  {ad.headline}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-[rgba(232,237,242,0.45)]">
                  {ad.sub}
                </p>
              </div>
              <div className="shrink-0 text-right">
                {ad.oldPrice ? (
                  <p className="font-mono text-[11px] text-[rgba(232,237,242,0.25)] line-through">
                    {ad.oldPrice}
                  </p>
                ) : null}
                <p className="font-syne text-xl font-extrabold leading-none text-[#00e57a]">
                  {ad.newPrice}
                </p>
              </div>
              <div className="min-w-[120px] shrink-0 rounded-lg border border-white/[0.13] bg-white/[0.03] px-3.5 py-1.5 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-[rgba(232,237,242,0.25)]">
                  Current time
                </p>
                <p className="font-mono text-[22px] font-medium leading-none tracking-tight text-[#00e57a]">
                  {clockStr}
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-wide text-[rgba(232,237,242,0.25)]">
                  {dateStr}
                </p>
              </div>
            </div>
            <div className="h-0.5 bg-white/[0.05]">
              <div
                className="h-full bg-[#00e57a] transition-[width] duration-100 linear"
                style={{ width: `${adProgressPct}%` }}
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-3">
            <h2 className="font-syne text-[13px] font-bold uppercase tracking-[0.12em] text-[rgba(232,237,242,0.45)]">
              Today&apos;s Schedule
            </h2>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#00e57a]">
              <span className="h-1.5 w-1.5 animate-[display-pulse-dot_1.5s_ease-in-out_infinite] rounded-full bg-[#00e57a]" />
              Live · Auto-refresh {REFRESH_SEC}s
            </div>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-3 divide-x divide-white/[0.07]">
            {columns.map((col) => (
              <div
                key={col.id}
                className="flex min-h-0 min-w-0 flex-col border-white/[0.07]"
              >
                <div className="shrink-0 border-b border-white/[0.07] px-4 pb-2 pt-2.5">
                  <p className="font-syne text-xs font-bold tracking-[0.06em] text-[#e8edf2]">
                    {col.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-[rgba(232,237,242,0.25)]">
                    {col.typeLine}
                  </p>
                </div>
                <div className={`min-h-0 flex-1 p-2 ${noScrollbar}`}>
                  {col.slots.map((slot) => {
                    const kind = liveKind(slot, date);
                    const dotClass =
                      kind === "upcoming" || kind === "active-now"
                        ? "animate-[display-pulse-dot_1s_ease-in-out_infinite]"
                        : "";
                    return (
                      <div key={slot.time} className={slotRowClass(kind)}>
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass} ${
                            kind === "available"
                              ? "bg-[#00e57a]"
                              : kind === "booked"
                                ? "bg-[#ff4d4d]"
                                : kind === "upcoming"
                                  ? "bg-[#f5c842]"
                                  : "bg-[#3d9eff]"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="min-w-[80px] font-mono text-[11px] text-[rgba(232,237,242,0.45)]">
                            {slotTimeRangeLabel(slot.time)}
                          </p>
                          <p
                            className={`text-[11px] font-medium leading-snug ${
                              kind === "available"
                                ? "text-[#00e57a]"
                                : kind === "booked"
                                  ? "text-[#e8edf2]"
                                  : kind === "upcoming"
                                    ? "text-[#f5c842]"
                                    : "text-[#3d9eff]"
                            }`}
                          >
                            {statusLabel(kind)}
                          </p>
                          {slot.initials ? (
                            <p className="mt-px font-mono text-[10px] text-[rgba(232,237,242,0.25)]">
                              {slot.initials}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timer / legend / side announce */}
        <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.13] bg-[#0d1317]">
          <div className="shrink-0 border-b border-white/[0.07] px-4 pb-2.5 pt-3.5">
            <p className="font-syne text-[11px] font-bold uppercase tracking-[0.12em] text-[rgba(232,237,242,0.45)]">
              Expires In
            </p>
          </div>
          <p
            className="shrink-0 px-4 pt-4 text-center font-mono text-[30px] font-medium leading-none tracking-tight text-[#f5c842]"
            style={{ opacity: ad.expireHour !== null ? 1 : 0.35 }}
          >
            {fmtCountdown(expireSecs)}
          </p>
          <p className="shrink-0 px-4 pb-3.5 text-center font-mono text-[10px] tracking-[0.05em] text-[rgba(232,237,242,0.25)]">
            {ad.expireHour !== null
              ? `${ad.headline} countdown`
              : "No expiry — ongoing offer"}
          </p>
          <div className="flex shrink-0 items-center gap-1.5 border-t border-white/[0.07] px-4 py-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.05em] text-[rgba(232,237,242,0.25)]">
              Refresh
            </span>
            <div className="h-0.5 flex-1 overflow-hidden rounded-sm bg-white/[0.07]">
              <div
                className="h-full rounded-sm bg-[#00e57a] transition-all duration-1000 linear"
                style={{ width: `${refreshFillPct}%` }}
              />
            </div>
          </div>
          <div className="mt-auto flex shrink-0 flex-col gap-1.5 border-t border-white/[0.07] px-3.5 py-3">
            {(
              [
                ["#00e57a", "Available"],
                ["#f5c842", "Starting <30 min"],
                ["#3d9eff", "In Progress"],
                ["#ff4d4d", "Booked"],
              ] as const
            ).map(([c, lab]) => (
              <div
                key={lab}
                className="flex items-center gap-2 font-mono text-[10px] text-[rgba(232,237,242,0.45)]"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: c }}
                />
                {lab}
              </div>
            ))}
          </div>
          <div className="shrink-0 border-t border-white/[0.07]">
            <div className="flex items-center justify-between px-3.5 pb-2 pt-2.5">
              <p className="font-syne text-[10px] font-bold uppercase tracking-[0.12em] text-[rgba(232,237,242,0.25)]">
                Announcements
              </p>
              <p className="font-mono text-[9px] text-[rgba(232,237,242,0.25)]">
                {sideAnnIdx + 1} / {SIDE_ANNOUNCEMENTS.length}
              </p>
            </div>
            <div
              className="mx-2.5 mb-3 flex min-h-[70px] flex-col gap-1.5 rounded-[10px] border border-white/[0.13] bg-[#111820] p-3 transition-opacity duration-300"
              style={{ opacity: sideFade ? 1 : 0 }}
            >
              <p className="font-syne text-[9px] font-bold uppercase tracking-[0.12em] text-[#f5c842]">
                {sideAnn.tag}
              </p>
              <p className="flex-1 text-[11px] leading-relaxed text-[#e8edf2]">
                {sideAnnIdx === 0 ? banner : sideAnn.text}
              </p>
              <div className="mt-0.5 flex gap-1">
                {SIDE_ANNOUNCEMENTS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 w-1 rounded-full ${i === sideAnnIdx ? "bg-[#f5c842]" : "bg-white/[0.13]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom: table ~70% + ads ~30% */}
      <div className="grid w-full min-w-0 shrink-0 grid-cols-1 gap-4 lg:grid-cols-[7fr_3fr] lg:items-stretch">
        <div className="min-w-0">
          <div className="flex shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.13] bg-[#0d1317]">
            <div className="flex min-w-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center gap-3.5 overflow-hidden border-b border-white/[0.07] bg-[#111820] px-5 py-2">
            <span className="shrink-0 rounded-full border border-[rgba(245,200,66,0.3)] bg-[rgba(245,200,66,0.12)] px-2.5 py-0.5 font-syne text-[10px] font-bold tracking-[0.14em] text-[#f5c842]">
              {bottomAnn.tag}
            </span>
            <p
              className="min-w-0 flex-1 truncate font-mono text-[11px] text-[rgba(232,237,242,0.45)] transition-opacity duration-300"
              style={{ opacity: bottomFade ? 1 : 0 }}
            >
              {bottomAnn.text}
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-[120px_1fr_140px_110px_100px] gap-0 border-b border-white/15 bg-[#111820] px-5 py-2.5">
            {["Time Slot", "Space", "Customer", "Duration", "Status"].map(
              (h, i) => (
                <div
                  key={h}
                  className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8edf2]/85 ${i > 0 ? "pl-3" : ""}`}
                >
                  {h}
                </div>
              ),
            )}
          </div>
          <div className="shrink-0">
            {tableRows.slice(0, 5).map((row, idx) => {
              const pill = pillClass(row.kind);
              return (
                <div
                  key={`${row.spaceCode}-${row.timeLabel}-${idx}`}
                  className="grid grid-cols-[120px_1fr_140px_110px_100px] items-center border-b border-white/[0.07] px-5 py-2 transition-colors last:border-b-0 hover:bg-white/[0.02]"
                >
                  <div className="font-mono text-[12px] font-medium tabular-nums text-[#e8edf2]/90">
                    {row.timeLabel}
                  </div>
                  <div className="pl-3 font-mono text-[12px] text-[#e8edf2]/92">
                    <span className="inline-block rounded border border-white/20 bg-white/[0.08] px-1.5 py-0.5 text-[11px] font-medium text-[#e8edf2]/80">
                      {row.spaceCode}
                    </span>{" "}
                    <span className="font-medium text-[#e8edf2]">
                      {row.spaceName}
                    </span>
                  </div>
                  <div className="pl-3 font-syne text-[13px] font-bold tracking-wide text-[#e8edf2]">
                    {row.customer}
                  </div>
                  <div className="pl-3 font-mono text-[12px] font-medium text-[#e8edf2]/88">
                    {row.duration}
                  </div>
                  <div className="pl-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold ${pill}`}
                    >
                      <span
                        className="h-[5px] w-[5px] rounded-full"
                        style={{
                          background:
                            row.kind === "available"
                              ? "#00e57a"
                              : row.kind === "booked"
                                ? "#ff4d4d"
                                : row.kind === "upcoming"
                                  ? "#f5c842"
                                  : "#3d9eff",
                        }}
                      />
                      {statusLabel(row.kind)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col lg:h-full">
          <div className="relative min-h-[240px] w-full flex-1 overflow-hidden rounded-2xl border border-white/[0.13] bg-[#111820] lg:min-h-0">
            <p className="absolute left-0 right-0 top-0 z-10 border-b border-white/[0.07] bg-[#0d1317]/90 px-4 py-2 text-center font-syne text-[10px] font-bold uppercase tracking-[0.12em] text-[rgba(232,237,242,0.45)]">
              Ads
            </p>
          {imgOk ? (
            <>
              <div className="absolute inset-x-0 bottom-0 top-9 z-0">
                <Image
                  src="/bg-1.jpg"
                  alt=""
                  fill
                  className="object-cover opacity-85"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  onError={() => setImgOk(false)}
                  priority
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(8,12,15,0.92)] to-transparent px-3 py-2">
                <p className="font-syne text-[11px] font-bold tracking-[0.04em] text-[#e8edf2]">
                  TurfOS Facility
                </p>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-4 pt-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,229,122,0.3)] bg-[rgba(0,229,122,0.1)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(0,229,122,0.7)"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className="font-mono text-[10px] leading-snug tracking-[0.06em] text-[rgba(232,237,242,0.25)]">
                Add{" "}
                <code className="text-[rgba(232,237,242,0.4)]">/public/bg-1.jpg</code>
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
