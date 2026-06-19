"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ImageReveal } from "../ui/ScrollReveal";

export const CompanyIntro: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const isStoryInView = useInView(storyRef, { once: false, margin: "-80px" });
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <section id="intro" className="py-16 md:py-20 lg:py-24 bg-brand-black relative">
      {/* Background grids */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Large Factory Image with Hover Zoom and badge overlay */}
          <motion.div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full h-[450px] overflow-hidden border border-brand-gold/15 hover:border-brand-gold/50 bg-brand-charcoal relative cursor-pointer shadow-lg hover:shadow-brand-gold/10 transition-colors duration-500 group"
          >
            <ImageReveal>
              <img
                src="/images/hero-4.jpg"
                alt="Prayag Clay Productions automated factory floor"
                className="w-full h-full object-cover"
              />
            </ImageReveal>

            {/* Glowing gold base gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            {/* Center Golden Badge overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <motion.div
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={isHovered ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -45, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                className="w-24 h-24 rounded-full bg-brand-black/85 border-2 border-brand-gold flex flex-col items-center justify-center text-center p-2 backdrop-blur-sm shadow-2xl"
              >
                <span className="text-[7px] tracking-[0.3em] font-semibold text-brand-gold uppercase block font-poppins">
                  ESTABLISHED
                </span>
                <span className="text-sm font-light text-brand-offwhite tracking-widest font-cormorant mt-1">
                  1983
                </span>
                <span className="text-[6px] tracking-[0.2em] font-medium text-brand-gold/70 uppercase block font-poppins mt-1">
                  PCP INDIA
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Company Story with staggered reveal */}
          <div ref={storyRef} className="lg:col-span-6 flex flex-col gap-6">
            <div className="overflow-hidden">
              <motion.span 
                initial={{ x: 50, opacity: 0 }}
                animate={isStoryInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block"
              >
                ABOUT PCP INDIA
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                animate={isStoryInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite leading-tight"
              >
                Forming Raw Earth, Firing Architectural Legacies
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base font-poppins text-brand-sand/80 leading-relaxed"
            >
              Since 1983, Prayag Clay Productions (PCP) has been at the forefront of engineering building envelopes. By blending traditional clay chemistry with heavy-duty European tunnel firing kilns, we produce architectural facing bricks, ventilated terracotta facades, and paving stones that endure for generations.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base font-poppins text-brand-sand/80 leading-relaxed"
            >
              Our automated manufacturing facilities incorporate eco-sustainable closed-loop processing, capturing excess kiln heat to operate raw-clay dryers. Partnering with leading builders and architects, we refine raw earthen minerals into structural masterworks.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
