"use client";

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CalendarCheck, PlayCircle } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <MapPin className="w-7 h-7 text-[#1A4526]" />,
    title: 'Pick a Court',
    desc: 'Browse our curated list of premium turfs, filter by sport, location, or surface type and find your perfect match.',
  },
  {
    num: '02',
    icon: <CalendarCheck className="w-7 h-7 text-[#1A4526]" />,
    title: 'Choose Your Slot',
    desc: 'Select a date and time that fits your schedule. Our real-time availability system shows open slots instantly.',
  },
  {
    num: '03',
    icon: <PlayCircle className="w-7 h-7 text-[#1A4526]" />,
    title: 'Confirm & Play',
    desc: 'Complete your secure payment, receive an instant confirmation, and show up ready to play. It\'s that simple.',
  },
];

export const HowItWorks = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="font-dm text-[13px] text-gray-400 mb-2">How It Works</p>
          <h2 className="font-syne font-bold text-[30px] md:text-[42px] text-gray-900 leading-tight tracking-tight">
            Book a Court in<br className="hidden md:block" /> 3 Simple Steps
          </h2>
        </div>
        <p className="font-dm text-[14px] text-gray-500 leading-relaxed max-w-sm">
          From discovery to game time, TurfOS makes the entire booking experience seamless, fast, and enjoyable.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-[2px] bg-gray-100 z-0" />

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.14, duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col gap-5"
          >
            {/* Step number circle */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <span className="font-syne font-extrabold text-[48px] text-gray-100 leading-none select-none">
                {step.num}
              </span>
            </div>
            <div>
              <h3 className="font-syne font-bold text-[20px] text-gray-900 mb-2">{step.title}</h3>
              <p className="font-dm text-[14px] text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
