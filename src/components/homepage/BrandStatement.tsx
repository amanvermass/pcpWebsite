"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const BrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background image filters and scale linked to scroll progress
  const bgScale = useTransform(scrollYProgress, [0.1, 0.7], [1.05, 1.25]);
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.1, 0.35, 0.35, 0.1]);
  
  const grayscaleVal = useTransform(scrollYProgress, [0.1, 0.55], [100, 20]);
  const blurVal = useTransform(scrollYProgress, [0.1, 0.55], [15, 0]);
  
  const bgFilter = useTransform(
    [grayscaleVal, blurVal],
    ([g, b]) => `grayscale(${g}%) blur(${b}px) brightness(60%)`
  );

  // Staggered word reveal generator
  const getWordTransform = (index: number) => {
    const start = 0.15 + index * 0.025;
    const end = 0.32 + index * 0.025;
    
    const y = useTransform(scrollYProgress, [start, end], [55, 0]);
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    
    return { y, opacity };
  };

  const wordsLine1 = ["CRAFTING", "THE", "FUTURE"];
  const wordsLine2 = ["OF", "SUSTAINABLE"];
  const wordsLine3 = ["BUILDING", "MATERIALS"];

  const renderWord = (word: string, absIndex: number) => {
    const { y, opacity } = getWordTransform(absIndex);
    return (
      <motion.span
        key={absIndex}
        style={{ y, opacity, display: "inline-block" }}
        className="mr-3 md:mr-5 text-white hover:text-brand-gold transition-colors duration-300 cursor-default"
      >
        {word}
      </motion.span>
    );
  };

  // Gold separator line scale animation
  const lineWidth = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);

  // Paragraph fade in
  const descY = useTransform(scrollYProgress, [0.52, 0.68], [30, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 0.85]);

  return (
    <div 
      ref={containerRef} 
      id="intro"
      className="relative h-[180vh] w-full bg-brand-black flex flex-col justify-start"
    >
      {/* Sticky container that keeps screen fixed during scroll animations */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-10">
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full border-r" />
        </div>

        {/* Dynamic Zooming Project Image Background */}
        <motion.div 
          style={{ scale: bgScale, opacity: bgOpacity, filter: bgFilter }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img 
            src="/images/hero-1.jpg" 
            alt="PCP Premium Architectural Detail" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Central Overlay for Typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          
          <div className="mb-4">
            <span className="text-[10px] font-poppins tracking-[0.4em] uppercase text-brand-gold font-bold">
              ESTABLISHED 1983
            </span>
          </div>

          {/* Huge Architectural Statement (Staggered Words) */}
          <div className="flex flex-col gap-3 md:gap-5 mb-10 text-3xl sm:text-5xl md:text-6xl font-normal font-cormorant tracking-wide uppercase">
            <div className="overflow-hidden py-1 flex justify-center flex-wrap">
              {wordsLine1.map((word, i) => renderWord(word, i))}
            </div>
            
            <div className="overflow-hidden py-1 flex justify-center flex-wrap">
              {wordsLine2.map((word, i) => renderWord(word, i + wordsLine1.length))}
            </div>

            <div className="overflow-hidden py-1 flex justify-center flex-wrap">
              {wordsLine3.map((word, i) => renderWord(word, i + wordsLine1.length + wordsLine2.length))}
            </div>
          </div>

          {/* Growing Accent Line */}
          <div className="w-24 md:w-32 h-[1px] bg-brand-slate/40 relative overflow-hidden mb-8">
            <motion.div 
              style={{ scaleX: lineWidth }}
              className="absolute inset-0 bg-brand-gold origin-center"
            />
          </div>

          {/* Description Block */}
          <div className="max-w-2xl overflow-hidden py-2">
            <motion.p
              style={{ y: descY, opacity: descOpacity }}
              className="text-sm md:text-base font-poppins text-brand-sand leading-relaxed font-light"
            >
              For over four decades, Prayag Clay Products has merged Earth chemistry with state-of-the-art European firing technology. We engineer building components—bricks, paving slabs, and blocks—that empower architects to build with ecological integrity and structural permanence.
            </motion.p>
          </div>

        </div>

        {/* Scroll tracker indicator */}
        <div className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-3">
          <span className="text-[9px] font-poppins tracking-[0.25em] text-brand-sand/40 uppercase">
            READING STATEMENT
          </span>
          <div className="w-16 h-[2px] bg-brand-slate/20 relative">
            <motion.div 
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 bg-brand-gold origin-left"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandStatement;
