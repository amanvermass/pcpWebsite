"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const BlueprintGlobalBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll Y progress of the page
  const { scrollYProgress } = useScroll();

  // Parallax translation effects based on scroll Y
  const brickY = useTransform(scrollYProgress, [0, 0.45], [180, -180]);
  const columnY = useTransform(scrollYProgress, [0.15, 0.65], [200, -200]);
  const compassY = useTransform(scrollYProgress, [0.4, 0.9], [250, -250]);

  return (
    <div ref={containerRef} className="absolute inset-y-0 left-0 w-full overflow-hidden pointer-events-none z-0">
      {/* 1. Global continuous vertical grid guide lines */}
      <div className="absolute inset-y-0 left-0 w-full z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      {/* 2. Brick Bonding Drafting blueprint (around CompanyIntro / ProductCategories depth, top: 1100px) */}
      <motion.div 
        style={{ y: brickY }}
        className="absolute left-[3%] sm:left-[6%] top-[1100px] w-[280px] sm:w-[350px] h-[220px] text-brand-gold opacity-[0.22] hidden md:block"
      >
        <svg viewBox="0 0 350 220" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
          {/* A running bond brick drafting blueprint */}
          <path d="M 0,20 L 350,20 M 0,55 L 350,55 M 0,90 L 350,90 M 0,125 L 350,125 M 0,160 L 350,160 M 0,195 L 350,195" />
          {/* Vertical joints row 1 */}
          <path d="M 35,20 L 35,55 M 105,20 L 105,55 M 175,20 L 175,55 M 245,20 L 245,55 M 315,20 L 315,55" />
          {/* Vertical joints row 2 */}
          <path d="M 0,55 L 0,90 M 70,55 L 70,90 M 140,55 L 140,90 M 210,55 L 210,90 M 280,55 L 280,90 M 350,55 L 350,90" />
          {/* Vertical joints row 3 */}
          <path d="M 35,90 L 35,125 M 105,90 L 105,125 M 175,90 L 175,125 M 245,90 L 245,125 M 315,90 L 315,125" />
          {/* Vertical joints row 4 */}
          <path d="M 0,125 L 0,160 M 70,125 L 70,160 M 140,125 L 140,160 M 210,125 L 210,160 M 280,125 L 280,160 M 350,125 L 350,160" />
          {/* Vertical joints row 5 */}
          <path d="M 35,160 L 35,195 M 105,160 L 105,195 M 175,160 L 175,195 M 245,160 L 245,195 M 315,160 L 315,195" />
          {/* Dimensions guidelines */}
          <path d="M 10,10 L 10,4 M 340,10 L 340,4 M 10,4 L 340,4" strokeDasharray="2 2" />
          <text x="140" y="-1" fill="currentColor" stroke="none" className="font-mono text-[7px] uppercase tracking-wider">L = 230mm (std)</text>
          <text x="10" y="210" fill="currentColor" stroke="none" className="font-mono text-[6px] uppercase tracking-widest opacity-60">PCP_BRICK_BONDING_DRAFT_01</text>
        </svg>
      </motion.div>

      {/* 3. Column Profile Drafting blueprint (around Projects / ManufacturingExcellence depth, top: 2700px) */}
      <motion.div 
        style={{ y: columnY }}
        className="absolute right-[3%] sm:right-[6%] top-[2700px] w-[220px] sm:w-[280px] h-[380px] text-brand-gold opacity-[0.18] hidden md:block"
      >
        <svg viewBox="0 0 200 300" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
          {/* Column profile blueprint */}
          <path d="M 50,280 L 150,280 M 55,270 L 145,270 M 60,260 L 140,260 M 65,250 L 135,250 M 70,50 L 70,250 M 130,50 L 130,250" />
          {/* Capitello details */}
          <path d="M 60,40 L 140,40 M 50,30 L 150,30 M 45,20 L 155,20 L 155,30 M 45,20 L 45,30" />
          <circle cx="100" cy="150" r="15" strokeDasharray="2 2" />
          <path d="M 70,150 L 130,150" strokeDasharray="1 3" />
          {/* Measuring annotations */}
          <path d="M 30,20 L 30,280" strokeDasharray="2 2" />
          <path d="M 25,20 L 35,20 M 25,280 L 35,280" />
          <text x="5" y="160" transform="rotate(-90 5 160)" fill="currentColor" stroke="none" className="font-mono text-[7px] uppercase tracking-wider">H = 3400mm (std)</text>
          <text x="65" y="295" fill="currentColor" stroke="none" className="font-mono text-[6px] uppercase tracking-widest opacity-60">COLUMN_SECTION_1_50</text>
        </svg>
      </motion.div>

      {/* 4. Compass Drafting Seal blueprint (around Calculators / DealerLocator / Testimonials depth, top: 4800px) */}
      <motion.div 
        style={{ y: compassY }}
        className="absolute left-[4%] sm:left-[8%] top-[4800px] w-[260px] sm:w-[320px] h-[320px] text-brand-gold opacity-[0.16] hidden md:block"
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="45" />
          <path d="M 20,100 L 180,100 M 100,20 L 100,180" />
          <path d="M 43,43 L 157,157 M 43,157 L 157,43" strokeDasharray="2 2" />
          {/* Compass labels */}
          <text x="96" y="15" fill="currentColor" stroke="none" className="font-mono text-[9px] font-bold">N</text>
          <text x="97" y="193" fill="currentColor" stroke="none" className="font-mono text-[9px] font-bold">S</text>
          <text x="183" y="103" fill="currentColor" stroke="none" className="font-mono text-[9px] font-bold">E</text>
          <text x="7" y="103" fill="currentColor" stroke="none" className="font-mono text-[9px] font-bold">W</text>
          <text x="55" y="90" fill="currentColor" stroke="none" className="font-mono text-[6px] uppercase tracking-widest opacity-60">PCP_COORDINATES_SEAL</text>
          <text x="45" y="115" fill="currentColor" stroke="none" className="font-mono text-[6px] uppercase tracking-widest opacity-60">REF: ISO_9001:2015</text>
        </svg>
      </motion.div>
    </div>
  );
};
