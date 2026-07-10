"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Flame, Leaf, Shield } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TimelineNodeProps {
  year: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  alignLeft?: boolean;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ year, title, desc, icon, alignLeft = true }) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 ${alignLeft ? "" : "md:flex-row-reverse"}`}>
      {/* Icon node in the center */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="p-3 bg-brand-charcoal border border-brand-gold text-brand-gold rounded-full shadow-lg"
        >
          {icon}
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: alignLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[45%] pl-16 md:pl-0 ${alignLeft ? "md:text-right" : "md:text-left"}`}
      >
        <span className="text-3xl font-light font-cormorant text-brand-gold tracking-widest block mb-1">
          {year}
        </span>
        <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-poppins text-brand-sand/70 leading-relaxed">
          {desc}
        </p>
      </motion.div>

      {/* Spacer to balance grid */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

export const WhyPCP: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const lineEl = lineRef.current;
    const containerEl = containerRef.current;

    if (!lineEl || !containerEl) return;

    // Create GSAP ScrollTrigger timeline drawing animation
    const anim = gsap.fromTo(
      lineEl,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const milestones = [
    {
      year: "1983",
      title: "Foundation & Earthen Heritage",
      desc: "Prayag Clay Productions launched its first raw organic clay firing kilns in Northern India, serving localized infrastructure and home construction needs.",
      icon: <Award className="w-5 h-5" />,
      alignLeft: true
    },
    {
      year: "1998",
      title: "Tunnel Kiln Automation",
      desc: "Commissioned European automated tunnel kilns, increasing daily volumes while maintaining strict dimensional sizing tolerances across all blocks.",
      icon: <Flame className="w-5 h-5" />,
      alignLeft: false
    },
    {
      year: "2010",
      title: "Eco Green Shield Systems",
      desc: "Pioneered high-insulation cellular aerated concrete blocks (Terraplasts) and solar recovery lines, reducing site HVAC load demands.",
      icon: <Leaf className="w-5 h-5" />,
      alignLeft: true
    },
    {
      year: "2020+",
      title: "Metropolitan Infrastructure Integration",
      desc: "Became a premier partner for public transport centers and commercial landmarks, providing high-load clay pavers and ventilated terracotta facades.",
      icon: <Shield className="w-5 h-5" />,
      alignLeft: false
    }
  ];

  return (
    <section id="why-pcp" className="py-16 md:py-20 lg:py-24 bg-brand-black relative">
      {/* Background guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
            OUR HISTORICAL MILESTONES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Why Prayag Clay Productions (PCP)
          </h2>
          <p className="text-brand-sand/70 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Trace our evolution from localized brick firing facilities to a leading manufacturer of premium, green-qualified structural envelopes.
          </p>
        </div>

        {/* Timeline block */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Vertical timeline line container */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-brand-gold/15 -translate-x-1/2 overflow-hidden">
            {/* GSAP ScrollTrigger controlled drawing indicator */}
            <div
              ref={lineRef}
              className="w-full h-full bg-brand-gold origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {milestones.map((ms, idx) => (
            <TimelineNode
              key={idx}
              year={ms.year}
              title={ms.title}
              desc={ms.desc}
              icon={ms.icon}
              alignLeft={ms.alignLeft}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyPCP;
