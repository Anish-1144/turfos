"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useBooking } from "@/lib/booking/context";

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { finalizeAfterPayment } = useBooking();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setErr(null);
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/booking/confirmation`,
      },
    });
    if (error) {
      setErr(error.message ?? "Payment failed");
      setLoading(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      finalizeAfterPayment(paymentIntent.id);
      router.push("/booking/confirmation");
      return;
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PaymentElement />
      {err && (
        <p className="font-dm text-sm text-red-600" role="alert">
          {err}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full rounded-lg bg-gray-900 py-3 font-dm text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading ? "Processing…" : "Pay now"}
      </button>
      <p className="font-dm text-xs text-gray-400">
        Secured by Stripe. Use test card 4242 4242 4242 4242 in test mode.
      </p>
    </form>
  );
}

export function PaymentForm() {
  const { amountCents, draft, finalizeAfterPayment } = useBooking();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  useEffect(() => {
    if (!pk || amountCents < 50) {
      setClientSecret(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountCents,
            metadata: {
              email: draft.customer.email,
            },
          }),
        });
        const data = (await res.json()) as {
          clientSecret?: string;
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok) {
          setFetchErr(data.error ?? "Could not start payment");
          setClientSecret(null);
          return;
        }
        setFetchErr(null);
        setClientSecret(data.clientSecret ?? null);
      } catch {
        if (!cancelled) {
          setFetchErr("Network error");
          setClientSecret(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [amountCents, draft.customer.email]);

  const stripePromise = useMemo(() => (pk ? loadStripe(pk) : null), []);

  const demoPay = () => {
    finalizeAfterPayment(null);
    router.push("/booking/confirmation");
  };

  if (pk && clientSecret && stripePromise) {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#1A4526",
              borderRadius: "10px",
            },
          },
        }}
      >
        <CheckoutForm />
      </Elements>
    );
  }

  return (
    <div className="space-y-4">
      {!pk && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-dm text-sm text-amber-900">
          Stripe is not configured. Add{" "}
          <code className="rounded bg-white px-1">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{" "}
          and <code className="rounded bg-white px-1">STRIPE_SECRET_KEY</code>{" "}
          to enable live card entry.
        </p>
      )}
      {pk && fetchErr && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 font-dm text-sm text-red-800">
          {fetchErr}
        </p>
      )}
      <p className="font-dm text-sm text-gray-600">
        Demo mode: complete the booking without charging a card.
      </p>
      <button
        type="button"
        onClick={demoPay}
        className="w-full rounded-lg bg-gray-900 py-3 font-dm text-sm font-semibold text-white transition-colors hover:bg-black"
      >
        Complete booking (demo)
      </button>
    </div>
  );
}
