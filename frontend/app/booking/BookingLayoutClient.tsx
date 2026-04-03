"use client";

import { BookingProvider } from "@/lib/booking/context";
import { Navbar } from "@/app/components/Navbar";
import { UniversalBgShell } from "@/app/components/UniversalBgShell";

export function BookingLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <UniversalBgShell>
        <div className="relative min-h-screen">
          <Navbar />
          <div className="relative z-10 pt-[72px]">
            <div className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </div>
      </UniversalBgShell>
    </BookingProvider>
  );
}
