"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Count up animation
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 400); // Small pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Lock scroll while page is loading
    if (!isComplete) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isComplete]);

  // Grid size for the brick assembling animation
  const gridRows = 4;
  const gridCols = 8;
  const totalBricks = gridRows * gridCols;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2
            }
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-brand-black text-brand-offwhite select-none overflow-hidden"
        >
          {/* Brick Assembling Grid Background (Subtle) */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-1 p-4 opacity-15 pointer-events-none">
            {Array.from({ length: totalBricks }).map((_, index) => {
              const row = Math.floor(index / gridCols);
              const col = index % gridCols;
              // Stagger calculation based on distance from center/bottom
              const delay = (row * 0.1) + (col * 0.05);

              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: progress / 100 >= (index / totalBricks) ? 1 : 0,
                    opacity: progress / 100 >= (index / totalBricks) ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: delay
                  }}
                  className="w-full h-full bg-brand-gold/40 rounded-sm border border-brand-gold/10"
                />
              );
            })}
          </div>

          {/* Luxury Lines Design overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between px-12 md:px-24">
            <div className="w-[1px] h-full bg-brand-slate border-dashed border-l border-brand-gold/20" />
            <div className="w-[1px] h-full bg-brand-slate border-dashed border-l border-brand-gold/20" />
            <div className="w-[1px] h-full bg-brand-slate border-dashed border-l border-brand-gold/20" />
          </div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Brand Logo Animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 flex flex-col items-center"
            >
              <span className="text-sm font-poppins tracking-[0.4em] uppercase text-brand-sand">
                PRAYAG CLAY PRODUCTIONS
              </span>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold tracking-wider mt-1">
                PCP INDIA
              </h1>
            </motion.div>

            {/* Main Percentage Counter */}
            <div className="overflow-hidden h-[120px] flex items-center justify-center">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-9xl font-cormorant font-light text-brand-gold tabular-nums"
              >
                {Math.round(progress)}
                <span className="text-4xl md:text-5xl font-cormorant font-light text-brand-sand ml-1">%</span>
              </motion.div>
            </div>

            {/* Assembling Subtext */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-6 text-[10px] font-poppins tracking-[0.3em] uppercase text-brand-sand/60"
            >
              Assembling Architectural Structure...
            </motion.div>
          </div>

          {/* Bottom Luxury Signature */}
          <div className="absolute bottom-10 left-0 w-full flex justify-between px-10 text-[10px] font-poppins tracking-[0.2em] uppercase text-brand-sand/40">
            <span>est. 1983</span>
            <span>crafting luxury spaces</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
