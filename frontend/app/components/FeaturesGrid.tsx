"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CalendarDays } from 'lucide-react';

export const FeaturesGrid = () => {
  const [isGameMode, setIsGameMode] = useState(false);

  return (
    <section className="py-10 md:py-20 bg-gray-50/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-navy rounded-2xl p-8 shadow-xl flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-8">
                <CalendarDays className="text-white/80 w-6 h-6" />
              </div>
              <p className="font-dm text-lg text-gray-400 leading-relaxed">
                Professional hard courts with tournament-grade lighting & climate control — play in <strong className="text-white font-medium">perfect conditions</strong>, in any season.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <span className="font-dm text-sm text-gray-300">Game Mode</span>
              <button 
                onClick={() => setIsGameMode(!isGameMode)}
                className={`w-12 h-6 rounded-full p-1 relative transition-colors ${isGameMode ? 'bg-blue-500' : 'bg-white/20'}`}
                aria-label="Toggle game mode"
              >
                <motion.div 
                  initial={false}
                  animate={{ x: isGameMode ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                />
              </button>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative rounded-2xl overflow-hidden shadow-xl min-h-[380px] group"
          >
            <Image 
              src="https://images.unsplash.com/photo-1622279457486-640fc294025a?q=80&w=1000&auto=format&fit=crop"
              alt="Tennis Coach"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <div className="bg-white/95 backdrop-blur-sm text-gray-900 rounded-full px-5 py-2.5 text-sm font-dm font-medium shadow-lg">
                Private & Group Lessons
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <h3 className="font-syne text-[56px] font-extrabold text-gray-900 leading-none mb-2">100+</h3>
              <p className="font-dm text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Pro Coaches</p>
              <p className="font-dm text-sm text-gray-500 leading-relaxed mb-8">
                Certified professionals ready to boost your game from first serve to tournament level.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Beginner', count: 10, num: 55 },
                { label: 'Intermediate', count: 8, num: 40 },
                { label: 'Advanced', count: 7, num: 35 },
              ].map((level) => (
                <div key={level.label} className="flex items-center justify-between text-xs font-dm">
                  <span className="text-gray-500 w-24">{level.label}</span>
                  <div className="flex gap-1.5 flex-1 mx-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2.5 h-2.5 rounded-full ${i < level.count ? 'bg-blue-400' : 'bg-gray-100'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-900 font-medium w-6 text-right">{level.num}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
