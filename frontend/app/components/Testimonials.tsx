"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Best courts in the city",
    text: "I absolutely love playing here! The courts are always in excellent condition, and the location is super convenient. It's the perfect spot to unwind and enjoy a great game every weekend.",
    name: "Samantha L.",
    role: "Business man",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    mainImage:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
    sideImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "Incredible facilities",
    text: "The turf quality is exceptional and booking was a breeze. I booked a 5-a-side session for my team and we had an absolute blast. Will definitely be coming back every week!",
    name: "Rahul M.",
    role: "Football Coach",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    mainImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    sideImage:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "A game changer for athletes",
    text: "TurfOS has completely changed how I organize my training. I can book, reschedule, and even track my sessions from a single app. Massive shoutout to the management team!",
    name: "Priya K.",
    role: "Professional Athlete",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    mainImage:
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1200&auto=format&fit=crop",
    sideImage:
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=800&auto=format&fit=crop",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export const Testimonials = () => {
  const [[index, direction], setSlide] = useState([0, 0]);
  const t = testimonials[index];

  const go = (dir: 1 | -1) => {
    setSlide(([prev]) => [(prev + dir + testimonials.length) % testimonials.length, dir]);
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <div>
            <div className="border border-gray-200 rounded-full px-5 py-1.5 inline-block mb-4">
              <span className="font-dm text-[13px] text-gray-600">Testimonials</span>
            </div>
            <h2 className="font-syne font-bold text-[28px] md:text-[38px] lg:text-[44px] text-gray-900 leading-tight tracking-tight">
              What Our Players Say
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full bg-[#1A4526] flex items-center justify-center text-white hover:bg-[#0F2916] transition-colors"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Content Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_0.55fr] gap-6 items-center">

          {/* Left — main image */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`img-${t.id}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative rounded-2xl overflow-hidden h-[300px] md:h-[380px]"
            >
              <Image
                src={t.mainImage}
                alt={t.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Center — quote */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`quote-${t.id}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
              className="flex flex-col justify-center px-0 md:px-6"
            >
              {/* Big quote mark */}
              <span className="font-syne font-bold text-[56px] text-gray-200 leading-none mb-2 select-none">&ldquo;</span>

              <h3 className="font-syne font-bold text-[22px] md:text-[26px] text-gray-900 mb-4 leading-tight">
                {t.quote}
              </h3>
              <p className="font-dm text-[14px] md:text-[15px] text-gray-500 leading-relaxed mb-8 max-w-sm">
                {t.text}
              </p>

              {/* Avatar */}
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12 border-2 border-gray-100"
                />
                <div>
                  <p className="font-syne font-semibold text-[15px] text-gray-900 leading-tight">{t.name}</p>
                  <p className="font-dm text-[12px] text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right — peek image */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`side-${t.id}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden h-[220px] md:h-[300px] hidden md:block"
            >
              <Image
                src={t.sideImage}
                alt="Sport"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide([i, i > index ? 1 : -1])}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#1A4526]' : 'w-2 bg-gray-200'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
