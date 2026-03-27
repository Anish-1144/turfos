"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Tag } from 'lucide-react';

const deals = [
  {
    tag: '⚡ Flash Deal',
    title: 'Evening Rush Hour',
    subtitle: 'Book any outdoor court between 5–8 PM',
    discount: '30% OFF',
    price: '₹560',
    originalPrice: '₹800',
    expiresHours: 4,
    dark: true,
  },
  {
    tag: '🌙 Last-Minute',
    title: "Tonight's Slots Going Fast",
    subtitle: "Only 3 courts left for tonight's sessions",
    discount: '20% OFF',
    price: '₹960',
    originalPrice: '₹1,200',
    expiresHours: 2,
    dark: false,
  },
];

const Countdown = ({ totalHours }: { totalHours: number }) => {
  const [secs, setSecs] = useState(totalHours * 3600);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(secs / 3600).toString().padStart(2, '0');
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return (
    <div className="flex items-center gap-1.5 text-sm font-dm font-bold tabular-nums opacity-80">
      <span>{h}</span><span>:</span><span>{m}</span><span>:</span><span>{s}</span>
    </div>
  );
};

export const DealsSection = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

      {/* Header */}
      <div className="mb-10">
        <p className="font-dm text-[13px] text-gray-400 mb-2">Limited Time</p>
        <h2 className="font-syne font-bold text-[30px] md:text-[42px] text-gray-900 leading-tight tracking-tight">
          Deals & Last-Minute Offers
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal, i) => (
          <motion.div
            key={deal.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className={`rounded-2xl p-7 md:p-10 flex flex-col gap-6 ${
              deal.dark ? 'bg-[#1A4526] text-white' : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className={`flex items-center gap-2 text-[12px] font-dm font-semibold px-3 py-1.5 rounded-full ${
                deal.dark ? 'bg-white/10 text-white' : 'bg-[#E8F5E9] text-[#1A4526]'
              }`}>
                <Tag className="w-3.5 h-3.5" />
                {deal.tag}
              </div>
              <div className={`font-syne font-extrabold text-3xl ${deal.dark ? 'text-[#A8E040]' : 'text-[#1A4526]'}`}>
                {deal.discount}
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-syne font-bold text-[22px] md:text-[26px] mb-2 leading-tight">{deal.title}</h3>
              <p className={`font-dm text-[14px] leading-relaxed ${deal.dark ? 'text-white/70' : 'text-gray-500'}`}>
                {deal.subtitle}
              </p>
            </div>

            {/* Price + countdown */}
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-syne font-extrabold text-[28px]">{deal.price}</span>
                  <span className={`font-dm text-[13px] line-through ${deal.dark ? 'text-white/40' : 'text-gray-400'}`}>{deal.originalPrice}</span>
                </div>
                <div className={`font-dm text-[11px] mt-1 ${deal.dark ? 'text-white/50' : 'text-gray-400'}`}>
                  Expires in: <Countdown totalHours={deal.expiresHours} />
                </div>
              </div>
              <button className={`rounded-full px-6 py-3 font-dm font-bold text-[13px] inline-flex items-center gap-2 group transition-colors ${
                deal.dark
                  ? 'bg-[#A8E040] text-gray-900 hover:bg-[#96cc38]'
                  : 'bg-[#1A4526] text-white hover:bg-[#0F2916]'
              }`}>
                Grab Deal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
