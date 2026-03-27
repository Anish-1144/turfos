"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'motion/react';
import { MapPin, LayoutGrid, Clock, Calendar, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const SelectField = ({
  icon,
  label,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-gray-500 font-dm">{label}</label>
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 bg-white cursor-pointer hover:border-gray-300 transition-colors group">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span className="text-sm font-dm text-gray-400">{placeholder}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
    </div>
  </div>
);

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 2;
  const backgrounds = [
    '/bg-1.jpg',
    '/bg-2.jpg'
  ];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Backgrounds */}
      {backgrounds.map((bg, idx) => (
        <Image
          key={bg}
          src={bg}
          alt={`Turf Background ${idx + 1}`}
          fill
          className={`object-cover object-center transition-opacity duration-1000 ${
            currentSlide === idx + 1 ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
          priority
        />
      ))}

      {/* Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Navbar lives here (absolute positioned) */}
      {/* — rendered in page.tsx above, but navbar is absolute so it overlays */}

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 pt-[72px]">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-6">

          {/* ── Left Column ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-xl"
          >
            <motion.p variants={fadeInUp} className="font-dm text-[#A8E040] text-sm font-semibold uppercase tracking-widest mb-4">
              Premium Sports Booking
            </motion.p>

            <motion.h1
              variants={fadeInUp}
            className="font-syne font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-5"
            >
              Choose Your Turf<br />
              Play Your Game.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-dm text-white/70 text-base leading-relaxed mb-8 max-w-md"
            >
              Book premium sports turfs across the city for Football, Cricket,
              Hockey, and more — with just a few clicks.
            </motion.p>

            {/* Member Avatars */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Member ${i + 1}`}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-white object-cover w-9 h-9"
                  />
                ))}
              </div>
              <div>
                <p className="font-syne font-bold text-white text-base leading-tight">
                  12k + <span className="font-semibold">Membership</span>
                </p>
                <p className="font-dm text-white/50 text-xs">Enjoy our facilities</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column — Booking Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 max-w-[480px] mx-auto lg:mx-0"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
              {/* Card Header */}
              <p className="font-dm text-white/80 text-sm leading-snug mb-1">
                Discover and book top quality<br />
                courts effortlessly with{' '}
                <span className="text-[#A8E040] font-semibold">TurfOS.</span>
              </p>

              {/* Form */}
              <div className="mt-4 bg-white rounded-xl p-4 flex flex-col gap-3">
                {/* Location */}
                <SelectField
                  icon={<MapPin className="w-4 h-4" />}
                  label="Location"
                  placeholder="Select your perfect location"
                />

                {/* Court Type */}
                <SelectField
                  icon={<LayoutGrid className="w-4 h-4" />}
                  label="Court Type"
                  placeholder="Court type (e.g., clay, grass, hard)"
                />

                {/* Duration */}
                <SelectField
                  icon={<Clock className="w-4 h-4" />}
                  label="Duration"
                  placeholder="Select Duration"
                />

                {/* Date + Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500 font-dm">Date</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer hover:border-gray-300 transition-colors">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-dm text-gray-400">Choose date</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500 font-dm">Time</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer hover:border-gray-300 transition-colors">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-dm text-gray-400">Choose time</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full mt-1 bg-gray-900 hover:bg-black text-white rounded-lg py-3 text-sm font-dm font-medium transition-colors">
                  Book Court Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 flex items-center justify-end"
        >
          {/* Slide counter */}
          <div className="flex items-center gap-3">
            <span className="font-dm text-white/70 text-sm">
              {currentSlide}/{totalSlides} Baseline Grounds
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((p) => Math.min(totalSlides, p + 1))}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors shadow-md"
                aria-label="Next slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
          <motion.div
            className="h-full bg-[#A8E040]"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
};
