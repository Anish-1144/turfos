"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X, Search } from "lucide-react";

const pillBase =
  "font-dm text-sm px-4 py-1.5 rounded-full transition-all text-white/70 hover:text-white";
const pillActive = "bg-white/15 text-white font-medium";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkPill = (key: "home" | "about" | "book" | "my" | "display") => {
    const active =
      (key === "home" && pathname === "/") ||
      (key === "book" && pathname.startsWith("/booking")) ||
      (key === "my" && pathname === "/my-booking") ||
      (key === "display" && pathname === "/display");
    return `${pillBase} ${active ? pillActive : ""}`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50"
      >
        <div className="flex h-[72px] w-full items-center justify-between gap-4 px-6 md:gap-6 md:px-16">
          <Link href="/" className="shrink-0">
            <span className="font-syne text-2xl font-extrabold">
              <span className="text-[#A8E040]">Turf</span>
              <span className="text-white">OS</span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <div className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1.5 backdrop-blur-md">
              <Link href="/" className={linkPill("home")}>
                Home
              </Link>
              <Link href="/#about-us" className={linkPill("about")}>
                About
              </Link>
              <Link href="/booking" className={linkPill("book")}>
                Book
              </Link>
              <Link href="/my-booking" className={linkPill("my")}>
                My booking
              </Link>
              <Link href="/display" className={linkPill("display")}>
                Display
              </Link>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
              <input
                type="text"
                placeholder="Search here..."
                className="w-32 bg-transparent font-dm text-sm text-white/80 placeholder-white/40 outline-none"
              />
              <Search className="h-4 w-4 shrink-0 text-white/60" />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-dm text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
            >
              Contact
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A8E040]">
                <Phone className="h-3 w-3 text-gray-900" />
              </div>
            </button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed left-0 right-0 top-[72px] z-40 border-t border-white/10 bg-black/90 px-6 py-6 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="font-dm text-sm text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#about-us"
                className="font-dm text-sm text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/booking"
                className="font-dm text-sm text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Book
              </Link>
              <Link
                href="/my-booking"
                className="font-dm text-sm text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                My booking
              </Link>
              <Link
                href="/display"
                className="font-dm text-sm text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Display
              </Link>
              <button
                type="button"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 font-dm text-sm font-medium text-gray-900"
              >
                Contact
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A8E040]">
                  <Phone className="h-3 w-3 text-gray-900" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
