"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { projects } from "../../data/projects";
import { ArrowRight, MapPin, User, Calendar } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";

export const HorizontalSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the parent vertical container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Shift horizontal track from 0% to -75% as scroll progress goes from 0 to 1
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="featured-gallery" className="relative h-[400vh] bg-brand-black">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background grids */}
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-10">
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full border-r" />
        </div>

        {/* Top left section heading */}
        <div className="absolute top-8 left-12 z-20 hidden md:block">
          <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-3.5 py-1 border border-brand-gold/20 rounded-none w-fit block font-poppins mb-2">
            FEATURED PROJECTS
          </span>
          <h2 className="text-xl sm:text-3xl font-normal font-cormorant text-brand-offwhite tracking-wide leading-none">
            Signature Architectural Showcase
          </h2>
        </div>

        {/* Bottom indicator track */}
        <div className="absolute bottom-10 right-12 z-10 hidden md:flex items-center gap-4">
          <span className="text-[10px] font-poppins tracking-[0.2em] uppercase text-brand-sand/50">
            SCROLL FOR PORTFOLIO
          </span>
          <div className="w-24 h-[1px] bg-brand-slate/40 relative">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute left-0 top-0 h-full bg-brand-gold origin-left w-full"
            />
          </div>
        </div>

        {/* Sliding panels container */}
        <motion.div style={{ x }} className="flex h-[75vh] w-[400vw] gap-20 px-12 md:px-24">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="relative w-[85vw] md:w-[70vw] h-full flex flex-col md:flex-row items-center gap-8 md:gap-16 shrink-0 z-10 border-b border-brand-gold/10 pb-8"
            >
              {/* Left Column - Image with wipe reveal */}
              <div className="w-full md:w-1/2 h-[35vh] md:h-[55vh] relative overflow-hidden group border border-brand-gold/10">
                <div className="absolute inset-0 bg-brand-slate-100/35 z-10" />
                <motion.div
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-[400ms] ease-[0.16,1,0.3,1] group-hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute bottom-4 left-4 z-20 text-[10px] font-poppins text-brand-gold font-bold tracking-widest bg-brand-slate-200/90 px-3.5 py-1.5 border border-brand-gold/20">
                  0{idx + 1} / 04
                </div>
              </div>

              {/* Right Column - Storytelling Contents */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <span className="text-xs font-poppins tracking-[0.3em] text-brand-gold font-semibold uppercase mb-3 block">
                  {project.type} Structural case
                </span>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite leading-tight mb-4">
                  {project.name}
                </h3>

                <p className="text-xs sm:text-sm font-poppins text-brand-slate-300 leading-relaxed max-w-xl mb-6">
                  {project.desc}
                </p>

                {/* Info grids */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-brand-gold/10 pt-6 max-w-md">
                  <div className="flex items-center gap-2 text-xs font-poppins text-brand-slate-200">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-poppins text-brand-slate-200">
                    <User className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{project.architect}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-poppins text-brand-slate-200 col-span-2">
                    <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Completed {project.year}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Magnetic>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2.5 bg-brand-gold hover:bg-brand-sand text-brand-black px-6 py-3.5 border border-brand-gold font-bold uppercase tracking-[0.2em] font-poppins text-[10px] transition-colors cursor-pointer"
                    >
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalSection;
