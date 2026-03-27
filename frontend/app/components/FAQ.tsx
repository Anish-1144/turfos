"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a court on TurfOS?',
    a: 'Simply download the app or visit our website, search for available courts in your area, pick a time slot, and pay securely. You\'ll receive an instant confirmation via email and SMS.',
  },
  {
    q: 'Can I cancel or reschedule my booking?',
    a: 'Yes! You can cancel or reschedule up to 2 hours before your session for a full refund. Last-minute cancellations may be subject to a small fee depending on the facility\'s policy.',
  },
  {
    q: 'What sports and facilities are available?',
    a: 'We cover Football, Cricket, Basketball, Badminton, Tennis, and more. Our facilities range from outdoor turf pitches to fully air-conditioned indoor arenas and padel courts.',
  },
  {
    q: 'Do you offer group or corporate bookings?',
    a: 'Absolutely. We offer dedicated group booking support for teams, corporates, and events. Get in touch with our team for custom quotes and preferential rates.',
  },
  {
    q: 'What is included in a membership plan?',
    a: 'Membership plans include priority booking access, discounted hourly rates, monthly credits, guest passes, and more depending on the tier. See our Membership section for a full breakdown.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. All transactions are processed through industry-standard encrypted payment gateways. We never store your card details on our servers.',
  },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">

          {/* Left — title + image */}
          <div className="lg:sticky lg:top-28 self-start">
            <p className="font-dm text-[13px] text-gray-400 mb-2">FAQ</p>
            <h2 className="font-syne font-bold text-[30px] md:text-[42px] text-gray-900 leading-tight tracking-tight mb-5">
              Your Questions, Answered
            </h2>
            <p className="font-dm text-[14px] text-gray-500 leading-relaxed">
              Can't find your answer here? Reach out to our support team anytime — we're always happy to help.
            </p>
            <div className="mt-6 mb-8">
              <button className="bg-[#1A4526] text-white rounded-full px-6 py-3 font-dm font-semibold text-[14px] hover:bg-[#0F2916] transition-colors">
                Contact Support
              </button>
            </div>

            {/* Turf splash image */}
            <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop"
                alt="Turf Court"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A4526]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-syne font-bold text-white text-[16px] leading-snug">Premium Courts, Ready to Book</p>
                <p className="font-dm text-white/70 text-[12px] mt-1">Football · Cricket · Basketball · Tennis</p>
              </div>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="flex flex-col divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex items-center justify-between w-full text-left gap-4"
                >
                  <span className="font-syne font-semibold text-[16px] md:text-[17px] text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                    open === i ? 'bg-[#1A4526] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="font-dm text-[14px] text-gray-500 leading-relaxed pt-4 max-w-xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
