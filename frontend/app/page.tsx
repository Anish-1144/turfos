"use client";

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { HowItWorks } from './components/HowItWorks';
import { SpaceExplorer } from './components/SpaceExplorer';
import { LiveSchedule } from './components/LiveSchedule';
import { AboutSection } from './components/AboutSection';
import { ServiceSection } from './components/ServiceSection';
import { DealsSection } from './components/DealsSection';
import { MembershipTeaser } from './components/MembershipTeaser';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { OurProducts } from './components/OurProducts';
import { Footer } from './components/Footer';

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900 font-sans overflow-x-hidden min-h-screen">
      {/* Navbar overlays the hero via absolute positioning */}
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
      <TrustStrip />
      {/* <HowItWorks /> */}
      {/* <SpaceExplorer /> */}
      <LiveSchedule />
      
      <AboutSection />
    
       <DealsSection />
         <OurProducts />
      <ServiceSection />
     
      <Testimonials />
      <MembershipTeaser />
      
     
      <FAQ />
      <Footer />
    </main>
  );
}