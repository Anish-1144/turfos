"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/lib/booking/context";
import { LOCATIONS, spaceById } from "@/lib/booking/constants";
import { PaymentForm } from "../payment/PaymentForm";
import {
  BookingEyebrow,
  BookingLead,
  BookingPanel,
  BookingTitle,
} from "../components/BookingShell";

export default function BookingCheckoutPage() {
  const router = useRouter();
  const { draft, setLocation, setCustomer, amountCents } = useBooking();

  useEffect(() => {
    if (!draft.spaceId || !draft.date || !draft.slotStart) {
      router.replace("/booking");
    }
  }, [draft.date, draft.spaceId, draft.slotStart, router]);

  if (!draft.spaceId || !draft.date || !draft.slotStart) return null;

  const space = spaceById(draft.spaceId);
  const amount = (amountCents / 100).toFixed(2);

  return (
    <div>
      <BookingEyebrow>Checkout</BookingEyebrow>
      <BookingTitle>Details &amp; pay</BookingTitle>
      <BookingLead>
        {space.label} · {draft.date} · {draft.slotStart} ·{" "}
        {draft.durationMinutes} min · ${amount}
      </BookingLead>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <BookingPanel>
          <h2 className="font-syne text-base font-bold text-gray-900">
            Your details
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="font-dm text-xs font-medium text-gray-500">
                Venue
              </label>
              <select
                value={draft.location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-dm text-sm outline-none focus:border-[#A8E040] focus:ring-2 focus:ring-[#A8E040]/30"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-dm text-xs font-medium text-gray-500">
                Name
              </label>
              <input
                required
                value={draft.customer.name}
                onChange={(e) => setCustomer({ name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-dm text-sm outline-none focus:border-[#A8E040] focus:ring-2 focus:ring-[#A8E040]/30"
                placeholder="Jordan Smith"
              />
            </div>
            <div>
              <label className="font-dm text-xs font-medium text-gray-500">
                Email
              </label>
              <input
                required
                type="email"
                value={draft.customer.email}
                onChange={(e) => setCustomer({ email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-dm text-sm outline-none focus:border-[#A8E040] focus:ring-2 focus:ring-[#A8E040]/30"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-dm text-xs font-medium text-gray-500">
                Phone
              </label>
              <input
                type="tel"
                value={draft.customer.phone}
                onChange={(e) => setCustomer({ phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-dm text-sm outline-none focus:border-[#A8E040] focus:ring-2 focus:ring-[#A8E040]/30"
                placeholder="+1 …"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
              <input
                type="checkbox"
                checked={draft.customer.waiverAccepted}
                onChange={(e) =>
                  setCustomer({ waiverAccepted: e.target.checked })
                }
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1A4526]"
              />
              <span className="font-dm text-xs text-gray-600">
                Waiver &amp; safety rules (optional)
              </span>
            </label>
          </div>
          <button
            type="button"
            onClick={() => router.push("/booking")}
            className="mt-6 font-dm text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
          >
            ← Change date or space
          </button>
        </BookingPanel>

        <BookingPanel>
          <h2 className="font-syne text-base font-bold text-gray-900">
            Order summary
          </h2>
          <dl className="mt-4 space-y-2 font-dm text-sm text-gray-700">
            <div className="flex justify-between gap-2">
              <dt>Space</dt>
              <dd className="font-semibold text-gray-900">{space.label}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>When</dt>
              <dd className="text-right font-semibold text-gray-900">
                {draft.date} {draft.slotStart}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>Duration</dt>
              <dd className="font-semibold text-gray-900">
                {draft.durationMinutes} min
              </dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 font-syne text-lg font-bold text-[#1A4526]">
              <dt>Total</dt>
              <dd>${amount}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="font-syne text-sm font-bold text-gray-900">
              Payment
            </h3>
            <p className="mt-1 font-dm text-xs text-gray-500">
              Stripe or demo checkout — name and email required.
            </p>
            <div className="mt-4">
              <PaymentForm />
            </div>
          </div>
        </BookingPanel>
      </div>
    </div>
  );
}
