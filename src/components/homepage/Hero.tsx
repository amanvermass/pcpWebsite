"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const slides = [
  {
    image: "/images/hero-1.jpg",
    alt: "Brick Architecture Facade detail",
  },
  {
    image: "/images/hero-2.jpg",
    alt: "Luxury Villa Pathway paving",
  },
  {
    image: "/images/hero-3.jpg",
    alt: "Commercial Building facade",
  },
  {
    image: "/images/hero-4.jpg",
    alt: "PCP Kiln Factory manufacturing excellence",
  },
  {
    image: "/images/hero-5.jpg",
    alt: "PCP Premium Bricks & Pavers Showcase",
  },
];

interface HeroProps {
  darkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ darkMode = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll linked animations for the background slideshow container
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const borderRadius = useTransform(scrollY, [0, 600], [0, 24]);
  const contentY = useTransform(scrollY, [0, 600], [0, 80]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);

  // Entrance animations timed to trigger after the 2.5s page loader
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.6,
      },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo
      },
    },
  };

  const headingContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 2.7,
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const headingWords = "Building Tomorrow's Infrastructure".split(" ");

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--background)] select-none">
      
      {/* Scroll-driven Scale Slideshow Container */}
      <motion.div 
        style={{ scale, borderRadius }}
        className="absolute inset-0 z-0 overflow-hidden origin-center bg-black"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6.5, ease: "easeOut" }
            }}
            style={{ y: backgroundY }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Clean Theme-Adaptive Overlay */}
        <div className="absolute inset-0 bg-brand-black/75 z-10" />
      </motion.div>

      {/* Main Centered Hero Contents */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex-grow flex items-center justify-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-5xl flex flex-col items-center"
        >
          {/* Top Tagline */}
          <motion.p 
            variants={blockVariants}
            className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-brand-gold font-semibold font-poppins mb-6"
          >
            PRAYAG CLAY PRODUCTS
          </motion.p>

          {/* Intrio-style Massive Serif Heading (Staggered Word Reveal) */}
          <motion.h1 
            variants={headingContainerVariants}
            className="text-white text-center leading-none tracking-tight mb-8 flex flex-wrap justify-center"
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em"
            }}
          >
            {headingWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.25em] pb-1">
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subheading Description */}
          <motion.p
            variants={blockVariants}
            className="text-xs sm:text-sm md:text-base font-poppins text-brand-offwhite/70 max-w-xl leading-relaxed mb-12"
          >
            Premium Bricks, Pavers & Solutions
          </motion.p>

          {/* Staggered CTA Buttons */}
          <motion.div
            variants={blockVariants}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <button
              onClick={() => handleScrollTo("#categories")}
              className="bg-brand-gold hover:bg-brand-gold-500 text-brand-black font-semibold tracking-[0.2em] font-poppins uppercase text-xs px-8 py-4 border border-brand-gold transition-colors cursor-pointer"
            >
              Explore Products
            </button>
 
            <button
              onClick={() => handleScrollTo("#projects")}
              className="bg-transparent hover:bg-brand-gold/5 text-brand-offwhite tracking-[0.2em] font-poppins uppercase text-xs px-8 py-4 border border-brand-offwhite/20 hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer"
            >
              View Projects
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Progress Indicator Lines at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3.5 z-25">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className="w-10 sm:w-14 h-[2px] bg-brand-offwhite/15 relative overflow-hidden cursor-pointer" 
            onClick={() => setCurrentSlide(idx)}
          >
            {idx === currentSlide && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute inset-0 bg-brand-gold origin-left w-full h-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Large Vertical Project Counter (Right Side) */}
      <div className="absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-25 text-xs font-poppins tracking-[0.2em] select-none">
        <div className="h-8 overflow-hidden relative w-8 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span 
              key={currentSlide}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-brand-gold font-light text-xl block"
            >
              0{currentSlide + 1}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-brand-offwhite/25 text-sm -mt-1">/</span>
        <span className="text-brand-offwhite/45 text-sm">0{slides.length}</span>
      </div>

      {/* Vertical Scroll Text (Bottom Left) */}
      <div 
        className="absolute bottom-16 left-10 lg:left-20 z-25 flex flex-col items-center gap-4 cursor-pointer text-brand-offwhite/50 hover:text-brand-gold transition-colors"
        onClick={() => handleScrollTo("#intro")}
      >
        <span 
          className="text-[9px] font-semibold tracking-[0.3em] uppercase block"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-12 bg-brand-offwhite/15 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-full h-1/2 bg-brand-gold"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;
