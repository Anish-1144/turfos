"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, BellRing, Headphones } from 'lucide-react';

const badges = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Instant Booking',
    desc: 'Reserve your court in under 60 seconds',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Secure Payments',
    desc: 'End-to-end encrypted transactions',
  },
  {
    icon: <BellRing className="w-5 h-5" />,
    title: 'Automated Reminders',
    desc: 'Never miss a session with smart alerts',
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: '24/7 Support',
    desc: 'Our team is here whenever you need us',
  },
];

export const TrustStrip = () => (
  <section className="bg-[#1A4526] py-0">
    <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
        {badges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-4 py-6 px-4 md:px-6 group"
          >
            {/* Icon circle */}
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#A8E040]/15 group-hover:bg-[#A8E040]/25 transition-colors flex items-center justify-center text-[#A8E040]">
              {b.icon}
            </div>
            <div>
              <p className="font-syne font-semibold text-[13px] md:text-[14px] text-white leading-tight">{b.title}</p>
              <p className="font-dm text-[11px] md:text-[12px] text-white/45 leading-snug mt-0.5 hidden sm:block">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
