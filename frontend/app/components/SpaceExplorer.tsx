"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Users, Lightbulb, Layers, ArrowRight } from 'lucide-react';

const courts = [
  {
    name: 'The Green Arena',
    badge: 'Outdoor',
    price: 800,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
    features: [
      { icon: <Users className="w-4 h-4" />, label: '10 players max' },
      { icon: <Layers className="w-4 h-4" />, label: 'Artificial Grass' },
      { icon: <Lightbulb className="w-4 h-4" />, label: 'Floodlit' },
    ],
    popular: false,
  },
  {
    name: 'Box Cricket Hub',
    badge: 'Indoor',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop',
    features: [
      { icon: <Users className="w-4 h-4" />, label: '14 players max' },
      { icon: <Layers className="w-4 h-4" />, label: 'Rubber Mat Surface' },
      { icon: <Lightbulb className="w-4 h-4" />, label: 'LED Lighting' },
    ],
    popular: true,
  },
  {
    name: 'Five-a-Side Pitch',
    badge: 'Outdoor',
    price: 600,
    image: 'https://images.unsplash.com/photo-1518605368461-1d59b208eb63?q=80&w=1200&auto=format&fit=crop',
    features: [
      { icon: <Users className="w-4 h-4" />, label: '10 players max' },
      { icon: <Layers className="w-4 h-4" />, label: 'Synthetic Turf' },
      { icon: <Lightbulb className="w-4 h-4" />, label: 'Floodlit' },
    ],
    popular: false,
  },
];

export const SpaceExplorer = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-dm text-[13px] text-gray-400 mb-2">Space Explorer</p>
          <h2 className="font-syne font-bold text-[30px] md:text-[42px] text-gray-900 leading-tight tracking-tight">
            Find Your Perfect Court
          </h2>
        </div>
        <button className="self-start md:self-auto inline-flex items-center gap-2 font-dm font-semibold text-[14px] text-[#1A4526] hover:gap-3 transition-all">
          View All Courts <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Court Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courts.map((court, i) => (
          <motion.div
            key={court.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={court.image}
                alt={court.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#A8E040] text-gray-900 text-[11px] font-dm font-bold px-3 py-1 rounded-full">
                  {court.badge}
                </span>
                {court.popular && (
                  <span className="bg-[#1A4526] text-white text-[11px] font-dm font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-syne font-bold text-[18px] text-gray-900 mb-3">{court.name}</h3>

              {/* Features */}
              <div className="flex flex-col gap-2 mb-6">
                {court.features.map((f) => (
                  <div key={f.label} className="flex items-center gap-2.5 text-gray-500 font-dm text-[13px]">
                    <span className="text-[#1A4526]">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="font-syne font-extrabold text-[24px] text-gray-900">₹{court.price}</span>
                  <span className="font-dm text-[12px] text-gray-400 ml-1">/hr</span>
                </div>
                <button className="bg-[#1A4526] hover:bg-[#0F2916] text-white rounded-full px-5 py-2.5 font-dm font-semibold text-[13px] transition-colors inline-flex items-center gap-1.5 group/btn">
                  Book Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
