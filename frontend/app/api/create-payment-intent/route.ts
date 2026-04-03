import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured on the server." },
      { status: 503 }
    );
  }

  let body: { amount?: number; metadata?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const amount = body.amount;
  if (typeof amount !== "number" || amount < 50 || amount > 99999999) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  try {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: body.metadata ?? {},
    });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Payment intent failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
