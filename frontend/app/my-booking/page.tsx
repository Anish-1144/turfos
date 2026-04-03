"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, XCircle } from "lucide-react";
import { TurfOsGlassHeader } from "@/app/components/TurfOsGlassHeader";
import { UniversalBgShell } from "@/app/components/UniversalBgShell";
import {
  BookingEyebrow,
  BookingLead,
  BookingPanel,
  BookingTitle,
} from "@/app/booking/components/BookingShell";
import { getBookingsByEmail, cancelBookingById } from "@/lib/booking/storage";
import type { CompletedBooking } from "@/lib/booking/types";

export default function MyBookingPage() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<CompletedBooking[] | null>(null);
  const [searched, setSearched] = useState(false);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (!email.trim()) {
      setResults([]);
      return;
    }
    setResults(getBookingsByEmail(email));
  };

  const cancel = (id: string) => {
    if (!confirm("Cancel this booking? This cannot be undone in the demo.")) {
      return;
    }
    cancelBookingById(id);
    setResults((r) => r?.filter((b) => b.id !== id) ?? null);
  };

  return (
    <UniversalBgShell>
      <TurfOsGlassHeader />
      <main className="relative z-10 mx-auto max-w-2xl px-4 py-10 pb-16 sm:px-6">
        <BookingEyebrow>Lookup</BookingEyebrow>
        <BookingTitle>My booking</BookingTitle>
        <BookingLead>
          Enter the email you used when booking to see your access code and
          session details.
        </BookingLead>

        <BookingPanel className="mt-8">
          <form
            onSubmit={lookup}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <label className="font-dm text-xs font-medium text-gray-500">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 font-dm text-sm text-gray-900 outline-none focus:border-[#A8E040] focus:ring-2 focus:ring-[#A8E040]/30"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-dm text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              <Search className="h-4 w-4" />
              Look up
            </button>
          </form>
        </BookingPanel>

        {searched && results !== null && (
          <div className="mt-6 space-y-4">
            {results.length === 0 ? (
              <BookingPanel>
                <p className="font-dm text-sm text-gray-600">
                  No active bookings found for that email. Bookings are stored in
                  this browser for the demo.
                </p>
                <Link
                  href="/booking"
                  className="mt-4 inline-block font-dm text-sm font-medium text-[#1A4526] underline-offset-4 hover:underline"
                >
                  Start a new booking →
                </Link>
              </BookingPanel>
            ) : (
              results.map((b) => (
                <BookingPanel key={b.id}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-dm text-xs font-medium uppercase tracking-wider text-gray-400">
                        Access code
                      </p>
                      <p className="font-syne text-3xl font-extrabold tracking-[0.15em] text-[#1A4526]">
                        {b.accessCode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => cancel(b.id)}
                      className="inline-flex items-center gap-2 self-start rounded-lg border border-red-200 px-4 py-2 font-dm text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel booking
                    </button>
                  </div>
                  <dl className="mt-4 space-y-2 border-t border-gray-100 pt-4 font-dm text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Space</dt>
                      <dd className="font-semibold text-gray-900">
                        {b.spaceLabel}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">When</dt>
                      <dd className="text-right font-semibold text-gray-900">
                        {b.date} · {b.slotStart} – {b.slotEnd}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Venue</dt>
                      <dd className="font-semibold text-gray-900">
                        {b.location}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Name</dt>
                      <dd className="font-semibold text-gray-900">
                        {b.customerName}
                      </dd>
                    </div>
                  </dl>
                </BookingPanel>
              ))
            )}
          </div>
        )}
      </main>
    </UniversalBgShell>
  );
}
