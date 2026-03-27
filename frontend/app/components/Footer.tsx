import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1A4526] text-white pt-20 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-syne font-bold text-2xl md:text-3xl mb-3">Get Exclusive Updates Offers</h3>
            <p className="font-dm text-[13px] text-white/70 mb-6 max-w-sm leading-relaxed">
              Be the first to know about upcoming training sessions, special events,
            </p>
            <div className="relative max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email Address..." 
                className="w-full bg-[#A8E040] text-gray-900 placeholder-gray-900/60 rounded-full py-3.5 pl-5 pr-12 text-[13px] font-dm outline-none font-medium"
              />
              <button className="absolute right-1.5 top-1.5 w-9 h-9 bg-[#1A4526] hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Spacer / Layout alignment for 12 cols */}
          <div className="lg:col-span-1 hidden lg:block"></div>

          {/* Contact Info */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-1 gap-6 md:gap-12">
            <div>
              <p className="font-dm text-[11px] text-white/60 mb-1.5">Have a question or feedback?</p>
              <p className="font-dm font-medium text-[15px]">hello@turfos.com</p>
            </div>
            <div>
              <p className="font-dm text-[11px] text-white/60 mb-1.5">Give us a call</p>
              <p className="font-dm font-medium text-[15px]">+123445566789</p>
            </div>
          </div>

          {/* Facilities Links */}
          <div className="lg:col-span-2">
            <h4 className="font-syne font-semibold text-lg mb-5">Facilities</h4>
            <ul className="flex flex-col gap-3.5 font-dm text-[13px] text-white/70">
              {['Tennis Courts', 'Basketball Courts', 'Swimming Pool', 'Gym & Fitness Center'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="font-syne font-semibold text-lg mb-5">Support</h4>
            <ul className="flex flex-col gap-3.5 font-dm text-[13px] text-white/70">
              {['FAQ\'s', 'Contact Us', 'Help Center', 'Live Chat Support'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-dm text-[12px] text-white/50">Riverside Turfos@ 2024 All right reserved</p>
          <div className="flex gap-8 font-dm text-[12px] text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy & Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

      {/* Huge Background Text TurfOS */}
      <div className="w-full relative flex justify-center">
        <h1 className="font-syne font-extrabold text-[14vw] md:text-[14vw] leading-[0.72] uppercase tracking-tighter w-full text-center bg-gradient-to-b from-[#d2ff78]/90 via-[#a8e040]/40 to-transparent bg-clip-text text-transparent">
          TURFOS
        </h1>
      </div>
    </footer>
  );
};
