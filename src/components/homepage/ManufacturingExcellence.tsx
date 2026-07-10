"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

const StatCounter: React.FC<StatItemProps & { variants?: any }> = ({ value, suffix, label, variants }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const end = value;
    const incrementTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      whileHover={{ y: -6, borderColor: "#ce9456" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-center p-5 border border-brand-gold/10 rounded-xl bg-brand-black cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-light font-cormorant text-brand-gold flex items-baseline justify-center">
        <span>{count}</span>
        <span className="text-lg sm:text-xl font-light ml-0.5">{suffix}</span>
      </div>
      <span className="block text-[8px] tracking-[0.25em] uppercase text-brand-offwhite/70 mt-2.5 font-poppins font-semibold">
        {label}
      </span>
    </motion.div>
  );
};

export const ManufacturingExcellence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Scroll-linked motion (motion on scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax displacement on scroll (enabled on desktop only to prevent stack overlap on mobile/tablet)
  const textY = useTransform(scrollYProgress, [0, 1], isLargeScreen ? [30, -30] : [0, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], isLargeScreen ? [-50, 50] : [0, 0]);

  // Parent container variants for staggered children load
  const statsContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative flex items-center py-16 md:py-24 lg:py-32 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side Content - Parallax Scroll */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            {/* Header info - slides up and fades in */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl flex flex-col gap-4"
            >
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
                MANUFACTURING EXCELLENCE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite leading-tight">
                Precision Heavy Clay Engineering
              </h2>
              <p className="text-sm font-poppins text-brand-sand/75 leading-relaxed font-normal">
                Fired at 1100°C inside state-of-the-art European tunnel kilns. Our computerized thermal profiling guarantees extreme load tolerance and long-term durability.
              </p>
            </motion.div>

            {/* Stats Counters Grid - Staggered fade in */}
            <motion.div 
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              <StatCounter value={40} suffix="+" label="Years Experience" variants={statItemVariants} />
              <StatCounter value={1500} suffix="+" label="Projects Completed" variants={statItemVariants} />
              <StatCounter value={250} suffix="+" label="Active Dealers" variants={statItemVariants} />
              <StatCounter value={18} suffix="+" label="States Covered" variants={statItemVariants} />
            </motion.div>
          </motion.div>

          {/* Right Side Image Showcase - Parallax Scroll */}
          <motion.div 
            style={{ y: imageY }}
            className="lg:col-span-5 relative group w-full"
          >
            {/* Standby Pulse background shadow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-terracotta/20 rounded-2xl blur-lg pointer-events-none" 
            />
            
            {/* Standby Floating Image container */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="relative rounded-2xl overflow-hidden border border-brand-gold/15 bg-brand-black aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] w-full"
            >
              <motion.img
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src="/images/hero-2.jpg"
                alt="Prayag Clay Productions automated kiln facility drone view"
                className="w-full h-full object-cover opacity-100"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingExcellence;
