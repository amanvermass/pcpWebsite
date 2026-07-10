"use client";

import React from "react";
import { MapPin, User, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageReveal, TextReveal } from "../ui/ScrollReveal";
import { projects } from "../../data/projects";
import { Magnetic } from "../ui/Magnetic";

export const Projects: React.FC<{ teaser?: boolean }> = ({ teaser = false }) => {
  // Use a curated set of projects for the homepage showcase
  const featuredList = teaser ? projects.slice(0, 3) : projects;

  return (
    <section id="projects" className="py-16 md:py-20 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit">
            SIGNATURE PORTFOLIO
          </span>
          <TextReveal
            text="Architectural Showcase"
            className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide justify-center text-center w-full"
          />
          <p className="text-brand-sand/70 mt-4 text-xs sm:text-sm font-poppins max-w-xl leading-relaxed">
            See our architectural building envelopes in action. From corporate depots to luxury residences, we configure clay performance with high design.
          </p>
        </div>

        {/* Alternating Projects Layout */}
        <div className="flex flex-col gap-28">
          {featuredList.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={p.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Left/Right Column: Image with Wipe reveal & Parallax Scale */}
                <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden border border-brand-gold/15 bg-brand-charcoal relative group">
                  <ImageReveal>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </ImageReveal>
                  <div className="absolute top-4 left-4 z-10 text-[9px] font-bold tracking-widest text-brand-gold bg-brand-black/90 px-3 py-1.5 border border-brand-gold/20">
                    0{idx + 1} / 0{featuredList.length}
                  </div>
                </div>

                {/* Right/Left Column: Story Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 text-left">
                  <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-gold uppercase block font-poppins">
                    {p.type} Architectural envelope
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-cormorant text-brand-offwhite leading-tight">
                    {p.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 leading-relaxed">
                    This signature layout integrates PCP's high-insulating materials to construct modern ventilated cladding facade surfaces, demonstrating premium aesthetic execution and weather-resistant performance.
                  </p>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-brand-gold/10 pt-6 mt-2 max-w-md">
                    <div className="flex items-center gap-2 text-xs font-poppins text-brand-sand/70">
                      <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-poppins text-brand-sand/70">
                      <User className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{p.architect}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-poppins text-brand-sand/70 col-span-2">
                      <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Completed in {p.year}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Magnetic>
                      <Link
                        href={`/projects/${p.id}`}
                        className="inline-flex items-center gap-2.5 bg-brand-gold hover:bg-brand-sand text-brand-black px-6 py-3.5 border border-brand-gold font-bold uppercase tracking-[0.2em] font-poppins text-[10px] transition-colors cursor-pointer"
                      >
                        View Case Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
