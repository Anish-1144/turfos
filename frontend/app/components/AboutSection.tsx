"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    label: 'Football Pitch',
    src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop',
    overlay: 'Our mission is to make access to premium artificial turfs easier, more organized, and more exciting than ever',
  },
  {
    label: 'Box Cricket',
    src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
    overlay: 'State-of-the-art enclosed turf facilities for year-round training and competitions',
  },
];

const sideImages = [
  {
    label: 'Exclusive Membership',
    src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    label: 'Elite Training',
    src: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
  },
];

const stats = [
  {
    value: '10,00+',
    label: 'Athletes Trained Since 2015',
    sub: 'Proven track record: 8 years, 10,000+ success stories.',
  },
  {
    value: '97%',
    label: 'Satisfaction Rate',
    sub: 'Physical and mental gains—\nbacked by our participants.',
  },
  {
    value: '10+',
    label: 'Professional Experience',
    sub: 'Decades of expertise, one powerful team.',
  },
];

export const AboutSection = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white" id="about-us">
      <div className="w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* ── Header Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-8 md:mb-12 items-start">
          {/* Left: eyebrow + headline */}
          <div>
            <p className="text-[13px] font-normal text-gray-500 mb-2 font-dm">
              About Us
            </p>
            <h2 className="font-syne font-bold text-[32px] md:text-[40px] text-gray-900 leading-[1.15] tracking-tight">
              Empowering Sports Through<br />
              Innovation and Convenience
            </h2>
          </div>

          {/* Right: description */}
          <div className="flex flex-col justify-end pt-0 md:pt-10">
            <p className="font-dm text-[15px] text-gray-600 leading-[1.65]">
              Join TurfOS and become part of an exclusive sports community. Our memberships offer priority bookings, discounted rates, and access to premium facilities all year round. Whether you're a casual player or a full-time athlete, our plans are designed to elevate your game.
            </p>
          </div>
        </div>

        {/* ── Image Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 items-stretch">

          {/* Left: Main Image Card */}
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[320px] md:h-[440px] group"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

            {/* Top label pill */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[12px] font-dm font-medium px-3.5 py-1.5 rounded-full">
              {slides[current].label}
            </div>

            {/* Arrow button top-right */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
              <ArrowUpRight className="w-[18px] h-[18px] text-gray-900" />
            </div>

            {/* Bottom overlay text */}
            <div className="absolute bottom-6 left-6 right-8">
              <p className="font-dm text-white text-[14px] md:text-[15px] leading-[1.6]">
                {slides[current].overlay}
              </p>
            </div>
          </motion.div>

          {/* Right: Membership image + Stats */}
          <div className="flex flex-col gap-6">
            {/* Membership images — two side by side */}
            <div className="grid grid-cols-2 gap-3">
              {sideImages.map((img) => (
                <div key={img.label} className="relative rounded-2xl overflow-hidden group h-[180px] sm:h-[220px]">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 bg-black/55 backdrop-blur-sm text-white text-[12px] font-dm font-medium px-4 py-1.5 rounded-full">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-6 pt-2">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-syne font-bold text-[28px] md:text-[32px] text-gray-900 leading-none mb-1.5">
                      {s.value}
                    </p>
                    <p className="font-dm text-[12px] font-bold text-gray-900 mb-1 leading-snug">
                      {s.label}
                    </p>
                    <p className="font-dm text-[11px] text-gray-400 leading-snug whitespace-pre-line">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Buttons under stats */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button className="bg-[#A8E040] text-gray-900 rounded-full px-7 py-3 text-[14px] font-dm font-bold hover:bg-[#96cc38] transition-colors shadow-sm inline-flex items-center justify-center gap-2 group w-full sm:w-auto">
                  Get Membership
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-gray-900 text-white rounded-full px-7 py-3 text-[14px] font-dm font-bold hover:bg-black transition-colors shadow-sm inline-flex items-center justify-center gap-2 group w-full sm:w-auto">
                  View Our Programs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation Arrows ── */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="w-10 h-10 rounded-full bg-[#2d2d2d] flex items-center justify-center text-white hover:bg-black transition-colors shadow-sm"
            aria-label="Next"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
