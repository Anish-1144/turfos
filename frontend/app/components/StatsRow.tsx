"use client";

import React from 'react';
import { SectionEyebrow } from './SectionEyebrow';
import { AnimatedCounter } from './AnimatedCounter';

export const StatsRow = () => {
  return (
    <section className="py-20 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionEyebrow text="A few more facts about us in numbers" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
          <AnimatedCounter 
            value={12000} 
            format={(n) => `${(n/1000).toFixed(n === 12000 ? 0 : 1).replace('.0', '')} 000+`} 
            label="Hours of play" 
            subtext="annually" 
          />
          <AnimatedCounter 
            value={89} 
            format={(n) => `${n}%`} 
            label="Player Retention" 
            subtext="Rate" 
          />
          <AnimatedCounter 
            value={1200} 
            format={(n) => `${n.toLocaleString()}+`} 
            label="Active Members" 
            subtext="in our club" 
          />
          <AnimatedCounter 
            value={125} 
            format={(n) => `${n}+`} 
            label="Annual Tournaments" 
            subtext="hosted" 
          />
        </div>
      </div>
    </section>
  );
};
