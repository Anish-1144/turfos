"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const categories = ['See all', 'Footwear', 'Apparel', 'Equipment', 'Accessories'];

const products = [
  {
    id: 1,
    name: 'Turf Football Cleats',
    price: '₹2,499',
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1200&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: 2,
    name: 'Football Match Ball',
    price: '₹999',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1200&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: 3,
    name: 'Sports Performance Tee',
    price: '₹1,199',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 4,
    name: 'Cricket Batting Gloves',
    price: '₹1,499',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 5,
    name: 'Tennis Racket Pro',
    price: '₹4,599',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1554068865-24ceea4eb0db?q=80&w=800&auto=format&fit=crop',
    size: 'small',
  },
];

const ProductCard = ({ product }: { product: typeof products[number] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.35 }}
    className="relative rounded-2xl overflow-hidden group cursor-pointer h-full min-h-[280px]"
  >
    <Image
      src={product.image}
      alt={product.name}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
      <div>
        <p className="font-syne font-bold text-white text-[15px] md:text-[16px] leading-tight">{product.name}</p>
        <p className="font-syne font-extrabold text-white text-[18px] mt-0.5">{product.price}</p>
      </div>
      <button className="bg-white hover:bg-[#A8E040] transition-colors text-gray-900 rounded-full px-4 py-2 font-dm font-semibold text-[12px] whitespace-nowrap flex items-center gap-1.5 group/btn shadow-md">
        Shop Now
        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export const OurProducts = () => {
  const [activeCategory, setActiveCategory] = useState('See all');

  const filtered = activeCategory === 'See all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-dm text-[13px] text-gray-400 mb-2">Our Products</p>
          <h2 className="font-syne font-bold text-[30px] md:text-[48px] text-gray-900 leading-tight tracking-tight">
            Explore Our Exclusive<br className="hidden md:block" /> Sports Products
          </h2>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 font-dm text-[13px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#1A4526] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="bg-[#A8E040] hover:bg-[#96cc38] transition-colors text-gray-900 rounded-full px-6 py-2.5 font-dm font-bold text-[13px] inline-flex items-center gap-2">
            Explore Categories
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Grid — Bento style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Top row: first 2 large cards */}
            {filtered.length >= 1 && (
              <div className="h-[340px] md:h-[400px]">
                <ProductCard product={filtered[0]} />
              </div>
            )}
            {filtered.length >= 2 && (
              <div className="h-[340px] md:h-[400px]">
                <ProductCard product={filtered[1]} />
              </div>
            )}

            {/* Bottom row: up to 3 smaller cards */}
            {filtered.length >= 3 && (
              <div className={`col-span-1 md:col-span-2 grid gap-4 h-[280px] md:h-[300px] ${
                filtered.length === 3
                  ? 'grid-cols-1'
                  : filtered.length === 4
                  ? 'grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-3'
              }`}>
                {filtered.slice(2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
