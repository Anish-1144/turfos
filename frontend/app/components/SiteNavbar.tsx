"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, Search, X } from "lucide-react";

type Props = {
  overlay?: boolean;
  bottom?: React.ReactNode;
};

const navPill =
  "rounded-full border border-white/[0.07] bg-black/50 px-1.5 py-1 backdrop-blur-md";

const linkBase =
  "font-dm rounded-full px-4 py-1.5 text-sm transition-colors text-white/65 hover:text-white";

export function SiteNavbar({ overlay, bottom }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (key: string) => {
    if (key === "home") return pathname === "/";
    if (key === "book") return pathname.startsWith("/booking");
    if (key === "my") return pathname === "/my-booking";
    if (key === "display") return pathname === "/display";
    return false;
  };

  const linkClass = (key: string) =>
    `${linkBase} ${isActive(key) ? "bg-[#1A4526] font-medium text-white shadow-sm" : ""}`;

  return (
    <div
      className={
        overlay
          ? "absolute left-0 right-0 top-0 z-50 w-full"
          : "relative z-20 w-full border-b border-white/[0.06] bg-black/40 backdrop-blur-md"
      }
    >
      <div className="flex h-[72px] w-full items-center justify-between gap-3 px-6 md:gap-6 md:px-16">
        <Link href="/" className="shrink-0">
          <span className="font-syne text-2xl font-extrabold">
            <span className="text-[#A8E040]">Turf</span>
            <span className="text-white">OS</span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <div
            className={`flex max-w-full flex-wrap items-center justify-center gap-0.5 ${navPill}`}
          >
            <Link href="/" className={linkClass("home")}>
              Home
            </Link>
            <Link href="/#about-us" className={linkClass("about")}>
              About
            </Link>
            <Link href="/booking" className={linkClass("book")}>
              Book
            </Link>
            <Link href="/my-booking" className={linkClass("my")}>
              My booking
            </Link>
            <Link href="/display" className={linkClass("display")}>
              Display
            </Link>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/45 px-4 py-2 backdrop-blur-sm">
            <input
              type="search"
              placeholder="Search here..."
              className="w-32 bg-transparent font-dm text-sm text-white/85 placeholder-white/35 outline-none"
              aria-label="Search"
            />
            <Search className="h-4 w-4 shrink-0 text-white/55" />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-dm text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Contact
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A8E040]">
              <Phone className="h-3 w-3 text-gray-900" />
            </span>
          </button>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {bottom ? (
        <div className="border-t border-white/[0.06] bg-black/30 py-2.5 backdrop-blur-sm">
          {bottom}
        </div>
      ) : null}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed left-0 right-0 top-[72px] z-40 border-t border-white/[0.06] bg-[#070b09]/95 px-6 py-5 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="rounded-lg px-2 py-2.5 font-dm text-sm text-white/85 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#about-us"
                className="rounded-lg px-2 py-2.5 font-dm text-sm text-white/85 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/booking"
                className="rounded-lg px-2 py-2.5 font-dm text-sm text-white/85 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Book
              </Link>
              <Link
                href="/my-booking"
                className="rounded-lg px-2 py-2.5 font-dm text-sm text-white/85 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                My booking
              </Link>
              <Link
                href="/display"
                className="rounded-lg px-2 py-2.5 font-dm text-sm text-white/85 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Display
              </Link>
              <button
                type="button"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 font-dm text-sm font-medium text-gray-900"
              >
                Contact
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A8E040]">
                  <Phone className="h-3 w-3 text-gray-900" />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
