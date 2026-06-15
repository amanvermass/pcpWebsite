"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

const StatCounter: React.FC<StatItemProps> = ({ value, suffix, label }) => {
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
    <div ref={ref} className="text-center p-6 glass-panel border border-brand-white/10 rounded-none bg-brand-black/40 backdrop-blur-md">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-light font-cormorant text-brand-gold flex items-baseline justify-center">
        <span>{count}</span>
        <span className="text-xl sm:text-2xl font-light ml-0.5">{suffix}</span>
      </div>
      <span className="block text-[10px] tracking-[0.25em] uppercase text-brand-offwhite/70 mt-3 font-poppins font-semibold">
        {label}
      </span>
    </div>
  );
};

export const ManufacturingExcellence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center py-24 bg-brand-black overflow-hidden"
    >
      {/* Background Factory Drone Image with Parallax & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="/images/hero-2.jpg"
          alt="Prayag Clay Productions automated kiln facility drone view"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black z-10" />
      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
              MANUFACTURING EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite leading-tight">
              Precision Heavy Clay Engineering
            </h2>
            <p className="text-sm font-poppins text-brand-sand/75 max-w-xl leading-relaxed">
              Fired at 1100°C inside state-of-the-art European tunnel kilns. Our computerized thermal profiling guarantees extreme load tolerance and long-term durability.
            </p>
          </div>

          {/* Stats Counters Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value={40} suffix="+" label="Years Experience" />
            <StatCounter value={1500} suffix="+" label="Projects Completed" />
            <StatCounter value={250} suffix="+" label="Active Dealers" />
            <StatCounter value={18} suffix="+" label="States Covered" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingExcellence;
