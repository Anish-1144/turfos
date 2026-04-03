export type SpaceId = "full" | "cage1" | "cage2";

export type SlotStatus = "available" | "limited" | "booked";

export type CustomerDraft = {
  name: string;
  email: string;
  phone: string;
  waiverAccepted: boolean;
};

export type BookingDraft = {
  location: string;
  spaceId: SpaceId | null;
  durationMinutes: number;
  date: string | null;
  slotStart: string | null;
  customer: CustomerDraft;
};

export type CompletedBooking = {
  id: string;
  accessCode: string;
  spaceId: SpaceId;
  spaceLabel: string;
  location: string;
  date: string;
  slotStart: string;
  slotEnd: string;
  durationMinutes: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  waiverAccepted: boolean;
  amountCents: number;
  createdAt: string;
  cancelled?: boolean;
  paymentIntentId?: string | null;
};
