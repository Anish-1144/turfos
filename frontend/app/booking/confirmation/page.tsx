"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, CheckCircle2 } from "lucide-react";
import { useBooking } from "@/lib/booking/context";
import { clearHeroPrefill } from "@/lib/booking/prefill";
import { getLastBooking } from "@/lib/booking/storage";
import type { CompletedBooking } from "@/lib/booking/types";
import {
  BookingEyebrow,
  BookingLead,
  BookingPanel,
  BookingTitle,
} from "../components/BookingShell";

export default function BookingConfirmationPage() {
  const { completed } = useBooking();
  const router = useRouter();
  const [booking, setBooking] = useState<CompletedBooking | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    clearHeroPrefill();
    if (completed) {
      setBooking(completed);
      return;
    }
    const last = getLastBooking();
    if (last && !last.cancelled) {
      setBooking(last);
      return;
    }
    router.replace("/booking");
  }, [completed, router]);

  const copyCode = async () => {
    if (!booking) return;
    await navigator.clipboard.writeText(booking.accessCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (!booking) {
    return (
      <p className="font-dm text-sm text-white/60">Loading confirmation…</p>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-2 ring-[#A8E040]/40">
          <CheckCircle2 className="h-9 w-9 text-[#A8E040]" />
        </div>
      </div>
      <BookingEyebrow>Success</BookingEyebrow>
      <BookingTitle>You&apos;re booked</BookingTitle>
      <BookingLead>
        Show this access code at check-in. We also saved it under your email in
        My booking.
      </BookingLead>

      <BookingPanel className="mt-8">
        <div className="text-center">
          <p className="font-dm text-xs font-medium uppercase tracking-wider text-gray-400">
            Access code
          </p>
          <p className="mt-2 font-syne text-4xl font-extrabold tracking-[0.2em] text-[#1A4526]">
            {booking.accessCode}
          </p>
          <button
            type="button"
            onClick={copyCode}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-dm text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-[#1A4526]" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      </BookingPanel>

      <BookingPanel className="mt-6">
        <dl className="space-y-2 font-dm text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Space</dt>
            <dd className="font-semibold text-gray-900">{booking.spaceLabel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">When</dt>
            <dd className="text-right font-semibold text-gray-900">
              {booking.date} · {booking.slotStart} – {booking.slotEnd}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Venue</dt>
            <dd className="font-semibold text-gray-900">{booking.location}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">Guest</dt>
            <dd className="font-semibold text-gray-900">
              {booking.customerName}
            </dd>
          </div>
        </dl>
      </BookingPanel>

      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-6 py-3 text-center font-dm text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Back to home
        </Link>
        <Link
          href="/my-booking"
          className="rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-center font-dm text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
        >
          View in My booking
        </Link>
      </div>
    </div>
  );
}
