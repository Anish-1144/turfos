"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { HeroMiniCalendar } from "./HeroMiniCalendar";
import { SESSION_PREFILL_KEY } from "@/lib/booking/constants";
import type { HeroPrefillPayload } from "@/lib/booking/prefill";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

function defaultDateStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const HeroSection = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 2;
  const backgrounds = ["/bg-1.jpg", "/bg-2.jpg"];

  const [date, setDate] = useState(defaultDateStr);

  const startBooking = () => {
    const payload: HeroPrefillPayload = {
      date,
      _ts: Date.now(),
    };
    sessionStorage.setItem(SESSION_PREFILL_KEY, JSON.stringify(payload));
    router.push("/booking");
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {backgrounds.map((bg, idx) => (
        <Image
          key={bg}
          src={bg}
          alt={`Turf Background ${idx + 1}`}
          fill
          className={`object-cover object-center transition-opacity duration-1000 ${
            currentSlide === idx + 1 ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
          priority
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative z-10 flex h-full flex-col justify-center px-5 pt-[72px] sm:px-8 md:px-12 lg:px-16">
        <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-xl flex-1"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-4 font-dm text-sm font-semibold uppercase tracking-widest text-[#A8E040]"
            >
              Premium Sports Booking
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="mb-5 font-syne text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-[56px]"
            >
              Choose Your Turf
              <br />
              Play Your Game.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-8 max-w-md font-dm text-base leading-relaxed text-white/70"
            >
              Book premium sports turfs across the city for Football, Cricket,
              Hockey, and more — with just a few clicks.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Member ${i + 1}`}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="font-syne text-base font-bold leading-tight text-white">
                  12k + <span className="font-semibold">Membership</span>
                </p>
                <p className="font-dm text-xs text-white/50">
                  Enjoy our facilities
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto w-full max-w-[480px] shrink-0 lg:mx-0 lg:w-[380px] xl:w-[420px]"
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <p className="mb-1 font-dm text-sm leading-snug text-white/80">
                Discover and book top quality
                <br />
                courts effortlessly with{" "}
                <span className="font-semibold text-[#A8E040]">TurfOS.</span>
              </p>

              <div className="mt-4 flex flex-col gap-3 rounded-xl bg-white p-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-dm text-xs font-medium text-gray-500">
                    Date
                  </label>
                  <HeroMiniCalendar value={date} onChange={setDate} />
                </div>

                <button
                  type="button"
                  onClick={startBooking}
                  className="mt-1 w-full rounded-lg bg-gray-900 py-3 font-dm text-sm font-medium text-white transition-colors hover:bg-black"
                >
                  Book Court Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-6 right-6 flex items-center justify-end md:left-10 md:right-10"
        >
          <div className="flex items-center gap-3">
            <span className="font-dm text-sm text-white/70">
              {currentSlide}/{totalSlides} Baseline Grounds
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentSlide((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentSlide((p) => Math.min(totalSlides, p + 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition-colors hover:bg-gray-100"
                aria-label="Next slide"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
          <motion.div
            className="h-full bg-[#A8E040]"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
};
