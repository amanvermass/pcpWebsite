"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ImageReveal } from "../ui/ScrollReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CompanyIntro: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const isStoryInView = useInView(storyRef, { once: false, margin: "-80px" });
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <section id="intro" className="py-16 md:py-20 lg:py-24 bg-transparent relative">
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
                  1937
                </span>
                <span className="text-[6px] tracking-[0.2em] font-medium text-brand-gold/70 uppercase block font-poppins mt-1">
                  PCP INDIA
                </span>
              </motion.div>
            </div>
          </motion.div>

          <div ref={storyRef} className="lg:col-span-6 flex flex-col gap-5 text-left">
            <motion.span 
              initial={{ x: 50, opacity: 0 }}
              animate={isStoryInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block"
            >
              LEGACY & HERITAGE
            </motion.span>

            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={isStoryInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite leading-tight"
            >
              Three Generations of Badlani Leadership
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm font-poppins text-brand-sand/80 leading-relaxed"
            >
              Founded in Varanasi in 1937, Prayag Clay Products (PCP) is built on an eighty-year history of structural craftsmanship. Today, under the third generation of the Badlani family, we merge traditional chemistry with European tunnel-kiln automation to deliver certified high-performance masonry solutions.
            </motion.p>

            {/* Legacy Stats Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 border-y border-brand-gold/15 py-4 my-2"
            >
              <div>
                <span className="block text-lg sm:text-xl font-bold font-cormorant text-brand-gold">85+ Years</span>
                <span className="block text-[9px] uppercase tracking-wider text-brand-sand/60 font-poppins mt-0.5">Structural Trust</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-cormorant text-brand-gold">15+ Markets</span>
                <span className="block text-[9px] uppercase tracking-wider text-brand-sand/60 font-poppins mt-0.5">Global Presence</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-cormorant text-brand-gold">500+ Blends</span>
                <span className="block text-[9px] uppercase tracking-wider text-brand-sand/60 font-poppins mt-0.5">Custom Formations</span>
              </div>
            </motion.div>

            {/* Legacy Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3 pl-3 border-l-2 border-brand-gold/20 text-xs text-left"
            >
              <div>
                <span className="font-bold text-brand-gold font-poppins text-[10px]">1937: FOUNDING</span>
                <p className="text-brand-sand/70 text-[10px] mt-0.5 font-poppins">Traditional clamping kilns established in Varanasi, North India.</p>
              </div>
              <div>
                <span className="font-bold text-brand-gold font-poppins text-[10px]">1983: MECHANISATION</span>
                <p className="text-brand-sand/70 text-[10px] mt-0.5 font-poppins">Integration of mechanical extrusion presses for precision block dimensions.</p>
              </div>
              <div>
                <span className="font-bold text-brand-gold font-poppins text-[10px]">TODAY: SUSTAINABILITY LEADERSHIP</span>
                <p className="text-brand-sand/70 text-[10px] mt-0.5 font-poppins">EPD-certified production powered by closed-loop waste heat systems.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-2"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-brand-sand transition-colors font-poppins"
              >
                Read Our Story
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
