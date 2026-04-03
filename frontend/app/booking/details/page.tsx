import { redirect } from "next/navigation";

export default function LegacyDetailsPage() {
  redirect("/booking/checkout");
}
