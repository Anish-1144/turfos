"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionEyebrow } from './SectionEyebrow';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const ServicesSection = () => {
  const carouselControls = useRef(null);
  
  const services = [
    {
      title: "Training Programs",
      desc: "Programs designed for all ages and abilities.",
      img: "https://images.unsplash.com/photo-1622279457486-640fc294025a?q=80&w=1000&auto=format&fit=crop",
      colSpan: "w-80"
    },
    {
      title: "Hourly Court Rental",
      desc: "Step into a space built for players — to grow, compete, and thrive.",
      img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop",
      colSpan: "w-[400px]"
    },
    {
      title: "Pro Shop Access",
      desc: "Top gear for top performance. Strings, grips, shoes & more.",
      img: "https://images.unsplash.com/photo-1560012057-4372e14c5085?q=80&w=1000&auto=format&fit=crop",
      colSpan: "w-80"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50/50" id="services">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-4 pr-0 lg:pr-8"
          >
            <motion.div variants={fadeInUp}>
              <SectionEyebrow text="Services" />
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="font-syne text-[36px] md:text-[42px] font-bold text-gray-900 leading-[1.1] mb-6">
              Explore our full range of coaching, training, and tennis experiences.
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="font-dm text-base text-gray-600 leading-relaxed mb-10">
              From first serve to match point — we've got the right program for you.
            </motion.p>
            
            <motion.button variants={fadeInUp} className="bg-navy text-white rounded-full px-6 py-3 font-dm font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition-colors group">
              Explore More 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Carousel Column */}
          <div className="lg:col-span-8 overflow-hidden" ref={carouselControls}>
            <motion.div 
              drag="x"
              dragConstraints={carouselControls}
              dragElastic={0.2}
              className="flex gap-6 cursor-grab active:cursor-grabbing w-max pr-12"
            >
              {services.map((svc, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`${svc.colSpan} aspect-[3/4] relative rounded-2xl overflow-hidden group shadow-lg shrink-0`}
                >
                  <Image src={svc.img} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="self-end bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-xs font-dm font-medium text-white border border-white/20">
                      {svc.title}
                    </div>
                    
                    <div>
                      <h3 className="font-syne text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{svc.title}</h3>
                      <p className="font-dm text-sm text-gray-300 line-clamp-2">{svc.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Nav Arrows (Visual only for layout, actual drag works everywhere) */}
            <div className="flex justify-end gap-3 mt-8">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
