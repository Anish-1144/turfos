"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

export const AnimatedCounter = ({ value, label, subtext, format = (n: number) => n.toString() }: { value: number, label: string, subtext: string, format?: (n: number) => string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        
        setDisplayValue(Math.floor(easeProgress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center md:text-left flex flex-col pt-6 pb-8 md:py-8 px-4 border-b md:border-b-0 md:border-r border-gray-100 last:border-0">
      <div className="font-syne text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
        {format(displayValue)}
      </div>
      <div className="font-dm text-sm text-gray-500 max-w-[140px] mx-auto md:mx-0">
        <span className="font-semibold text-gray-700 block mb-1">{label}</span>
        {subtext}
      </div>
    </div>
  );
};
