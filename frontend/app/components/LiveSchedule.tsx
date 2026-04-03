"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Radio, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Today's time slots ─────────────────────────────── */
const timeSlots = [
  { time: '06:00', label: 'Early Morning', status: 'booked' },
  { time: '07:00', label: '', status: 'booked' },
  { time: '08:00', label: '', status: 'available' },
  { time: '09:00', label: 'Morning', status: 'available' },
  { time: '10:00', label: '', status: 'limited' },
  { time: '11:00', label: '', status: 'available' },
  { time: '12:00', label: 'Afternoon', status: 'booked' },
  { time: '13:00', label: '', status: 'booked' },
  { time: '14:00', label: '', status: 'available' },
  { time: '15:00', label: '', status: 'limited' },
  { time: '16:00', label: '', status: 'available' },
  { time: '17:00', label: 'Evening', status: 'available' },
  { time: '18:00', label: '', status: 'limited' },
  { time: '19:00', label: '', status: 'available' },
  { time: '20:00', label: '', status: 'booked' },
  { time: '21:00', label: 'Night', status: 'booked' },
];

/* Fake "booked" days this month (date numbers) */
const bookedDays = new Set([2, 5, 9, 12, 14, 17, 19, 22, 25, 27]);
const limitedDays = new Set([3, 7, 13, 16, 20, 26]);

const statusCfg = {
  available: { slot: 'bg-[#E8F5E9] border border-[#A8E040] text-[#1A4526] hover:bg-[#A8E040]/40 cursor-pointer', dot: 'bg-[#A8E040]', label: 'Available' },
  limited:   { slot: 'bg-amber-50 border border-amber-300 text-amber-700 cursor-pointer hover:bg-amber-100', dot: 'bg-amber-400', label: 'Limited' },
  booked:    { slot: 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed', dot: 'bg-gray-300', label: 'Booked' },
};

/* ─── Mini Calendar ──────────────────────────────────── */
const WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const MiniCalendar = () => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = () => setViewDate(new Date(year, month - 1, 1));
  const next = () => setViewDate(new Date(year, month + 1, 1));

  const isToday = (d: number) => month === today.getMonth() && year === today.getFullYear() && d === today.getDate();

  const dayStatus = (d: number) => {
    if (bookedDays.has(d)) return 'booked';
    if (limitedDays.has(d)) return 'limited';
    return 'available';
  };

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prev} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-syne font-bold text-[15px] text-gray-900">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEK.map(w => (
          <div key={w} className="text-center font-dm text-[11px] font-semibold text-gray-400 py-1">{w}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const st = dayStatus(d);
          return (
            <div
              key={d}
              className={`relative h-9 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                isToday(d)
                  ? 'bg-[#1A4526] text-white font-bold ring-2 ring-[#A8E040]/60'
                  : st === 'booked'
                  ? 'bg-gray-100 text-gray-400'
                  : st === 'limited'
                  ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  : 'hover:bg-[#E8F5E9] text-gray-700'
              }`}
            >
              <span className="font-dm text-[12px] leading-none">{d}</span>
              {/* Status dot */}
              {!isToday(d) && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${
                  st === 'booked' ? 'bg-gray-300' : st === 'limited' ? 'bg-amber-400' : 'bg-[#A8E040]'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Calendar legend */}
      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
        {Object.entries(statusCfg).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${v.dot}`} />
            <span className="font-dm text-[11px] text-gray-400">{v.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── LiveSchedule ───────────────────────────────────── */
export const LiveSchedule = () => {
  const available = timeSlots.filter(s => s.status === 'available');
  const booked = timeSlots.filter(s => s.status !== 'available');

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* Section header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A8E040] opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A8E040]" />
          </span>
          <div>
            <p className="font-dm text-[12px] text-gray-400 leading-none mb-1 flex items-center gap-1.5">
              <Radio className="w-3 h-3" /> Live Availability
            </p>
            <h2 className="font-syne font-bold text-[28px] md:text-[38px] text-gray-900 leading-tight tracking-tight">
              Today's Schedule
            </h2>
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">

          {/* ── Left: Today's Slots ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-syne font-bold text-[17px] text-gray-900">Today's Slots</h3>
              <div className="flex items-center gap-4">
                {Object.entries(statusCfg).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${v.dot}`} />
                    <span className="font-dm text-[11px] text-gray-400">{v.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot grid */}
            <motion.div
              className="grid grid-cols-4 gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeSlots.map((slot, i) => {
                const cfg = statusCfg[slot.status as keyof typeof statusCfg];
                return (
                  <motion.div
                    key={slot.time}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.025 }}
                    className={`rounded-xl px-2 py-3 flex flex-col items-center text-center transition-all ${cfg.slot}`}
                  >
                    <span className="font-syne font-bold text-[13px] leading-none">{slot.time}</span>
                    {slot.label && (
                      <span className="font-dm text-[9px] mt-1 opacity-60 leading-tight">{slot.label}</span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Summary bar */}
            <div className="flex items-center gap-6 mt-5 pt-5 border-t border-gray-100">
              <div className="text-center">
                <p className="font-syne font-extrabold text-[22px] text-[#1A4526] leading-none">{available.length}</p>
                <p className="font-dm text-[11px] text-gray-400 mt-0.5">Available</p>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <p className="font-syne font-extrabold text-[22px] text-gray-400 leading-none">{booked.length}</p>
                <p className="font-dm text-[11px] text-gray-400 mt-0.5">Booked / Limited</p>
              </div>
              <div className="ml-auto">
                <Link
                  href="/booking"
                  className="inline-block bg-[#1A4526] text-white rounded-full px-5 py-2.5 font-dm font-semibold text-[13px] hover:bg-[#0F2916] transition-colors"
                >
                  Book a Slot
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: Monthly Calendar ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-syne font-bold text-[17px] text-gray-900 mb-5">Monthly Overview</h3>
            <MiniCalendar />
          </div>

        </div>

        <p className="font-dm text-[11px] text-gray-300 mt-5">
          * Availability updates in real-time. Tap an available slot to book instantly.
        </p>
      </div>
    </section>
  );
};
