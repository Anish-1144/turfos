"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  /** Extra nodes on the right (e.g. step nav on booking) */
  afterNav?: ReactNode;
};

export function TurfOsGlassHeader({ afterNav }: Props) {
  return (
    <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="font-syne text-xl font-extrabold">
          <span className="text-[#A8E040]">Turf</span>
          <span className="text-white">OS</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5">
          <Link
            href="/"
            className="hidden font-dm text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline"
          >
            Home
          </Link>
          <Link
            href="/booking"
            className="font-dm text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-[#A8E040] hover:underline"
          >
            Book
          </Link>
          <Link
            href="/my-booking"
            className="font-dm text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-[#A8E040] hover:underline"
          >
            My booking
          </Link>
          <Link
            href="/display"
            className="font-dm text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-[#A8E040] hover:underline"
          >
            Display
          </Link>
          {afterNav}
        </div>
      </div>
    </header>
  );
}
