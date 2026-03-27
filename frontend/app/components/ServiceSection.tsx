"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ClipboardList, UserCheck, Ticket, ShoppingBag } from 'lucide-react';

const services = [
  {
    title: 'Slot Booking',
    desc: 'Book training sessions, events, gym hours, or personal coaching with just a few clicks.',
    icon: <ClipboardList className="w-6 h-6 text-[#1A4526]" />
  },
  {
    title: 'Training Sessions',
    desc: 'Level up your game or start your fitness journey with our expert-led training sessions.',
    icon: <UserCheck className="w-6 h-6 text-[#1A4526]" />
  },
  {
    title: 'Event Management',
    desc: 'Planning a sports tournament, fitness workshop, or wellness event? Leave the logistics to us.',
    icon: <Ticket className="w-6 h-6 text-[#1A4526]" />
  },
  {
    title: 'Sports Online Shop',
    desc: 'Find the best sportswear, fitness gear, and accessories — all in one place.',
    icon: <ShoppingBag className="w-6 h-6 text-[#1A4526]" />
  }
];

export const ServiceSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-center py-10 md:py-16 overflow-hidden z-10">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-2.jpg"
          alt="Stadium Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C10]/95 via-[#0F2916]/80 to-[#1A4526]/95 z-10" />

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col h-full justify-center gap-6 md:gap-10">
        
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="border border-white/20 rounded-full px-6 py-2.5 backdrop-blur-sm">
              <span className="font-dm text-sm text-white">Service</span>
            </div>
            <button className="bg-[#A8E040] hover:bg-[#96cc38] transition-colors text-gray-900 rounded-full px-7 py-3.5 font-dm font-bold text-[14px] shadow-sm">
              View all Service
            </button>
          </div>

          {/* Main Title & Desc */}
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-syne font-bold text-4xl md:text-5xl lg:text-[54px] text-white leading-[1.05] mb-5 tracking-tight"
            >
              Fuel Your Passion with Our Full Service Experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-dm text-[15px] text-white/70 leading-relaxed max-w-xl"
            >
              We are more than just a platform — we are a community built for athletes, trainers, event organizers, and sports enthusiasts. Our mission is to make access to sports easier, more organized, and more exciting than ever before.
            </motion.p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6 md:mt-8">
          {services.map((srv, idx) => (
            <motion.div 
              key={srv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 md:p-6 flex flex-col shadow-xl min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-auto pt">
                {srv.icon}
              </div>
              <div className="pt-10">
                <h3 className="font-syne font-bold text-lg md:text-xl text-gray-900 mb-2 tracking-tight">{srv.title}</h3>
                <p className="font-dm text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
