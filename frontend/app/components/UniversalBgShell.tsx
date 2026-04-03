"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Full-page turf background without heavy washes — photo at full strength,
 * light bottom vignette only so content stays readable.
 */
export function UniversalBgShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden font-dm text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0">
          <Image
            src="/bg-1.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        {/* Subtle bottom-only darkening for scroll/footer legibility — no full-screen fade */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      {children}
    </div>
  );
}
