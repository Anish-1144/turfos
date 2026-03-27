"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, Search } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Home', 'About', 'Service', 'Court', 'Shop'];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 z-50"
      >
        <div className="w-full px-6 md:px-16 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-syne font-extrabold text-2xl">
              <span className="text-[#A8E040]">Turf</span>
              <span className="text-white">OS</span>
            </span>
          </div>

          {/* Center Nav Pills */}
          <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-dm text-sm px-4 py-1.5 rounded-full transition-all ${
                  item === 'Home'
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search bar */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent text-white/80 placeholder-white/40 text-sm outline-none w-32 font-dm"
              />
              <Search className="w-4 h-4 text-white/60 flex-shrink-0" />
            </div>

            {/* Contact button */}
            <button className="flex items-center gap-2 bg-white text-gray-900 rounded-full px-4 py-2 text-sm font-dm font-medium hover:bg-gray-100 transition-colors">
              Contact
              <div className="w-6 h-6 rounded-full bg-[#A8E040] flex items-center justify-center">
                <Phone className="w-3 h-3 text-gray-900" />
              </div>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-black/90 backdrop-blur-md px-6 py-6 md:hidden border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-dm text-sm text-white/80 hover:text-white py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="mt-2 flex items-center justify-center gap-2 bg-white text-gray-900 rounded-full px-4 py-2.5 text-sm font-dm font-medium">
                Contact
                <div className="w-5 h-5 rounded-full bg-[#A8E040] flex items-center justify-center">
                  <Phone className="w-3 h-3 text-gray-900" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};