"use client";

import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  firm: string;
  context: string;
  perspective: string;
  rating: number;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      perspective: "Architect Specifier Perspective",
      quote: "PCP's EPD-certified clay facade systems and Ecotherm blocks have become standard specifications in our sustainable institutional projects. The thermal mass performance and natural textures are exceptional.",
      author: "Ar. Sanjay Puri",
      role: "Principal Architect",
      firm: "Sanjay Puri Architects",
      context: "Project: The Slate Facade Atrium (Noida)",
      rating: 5
    },
    {
      perspective: "Developer / Contractor Perspective",
      quote: "Using Ecotherm hollow blocks allowed us to cut construction timelines by 20% while saving over 30% in mortar costs. From a building speed and structural load perspective, it is a game-changer.",
      author: "Rajesh Malhotra",
      role: "VP of Infrastructure",
      firm: "L&T Construction",
      context: "Project: Delhi Metro Expansion (NCR)",
      rating: 5
    },
    {
      perspective: "International Export Partner",
      quote: "As a distributor in the UK, we require materials to meet stringent ISO and UKCA standards. PCP's certified thermal brick series has consistently delivered reliability, quality, and aesthetics.",
      author: "David Harrison",
      role: "International Sourcing Director",
      firm: "UK Brick & Facades Ltd",
      context: "Region: Export Distribution Network (London)",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 lg:py-24 bg-transparent relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center px-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
            INDUSTRY TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Voices of Specification & Trust
          </h2>
          <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 mt-4 max-w-lg leading-relaxed">
            Representing the core perspectives of architects, developers, and global export distributors who build with PCP.
          </p>
        </div>

        {/* 3 Static Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/30 p-8 flex flex-col justify-between rounded-none transition-all duration-300 group text-left"
            >
              <div>
                {/* Perspective Header Badge */}
                <span className="block text-[8px] font-bold tracking-widest text-brand-gold uppercase font-poppins mb-4">
                  {item.perspective}
                </span>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-5 text-brand-gold">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm font-poppins text-brand-sand/80 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Project Context Info */}
              <div className="mt-8 pt-5 border-t border-brand-gold/10">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-brand-offwhite font-poppins">
                      {item.author}
                    </span>
                    <span className="block text-[9px] uppercase tracking-widest text-brand-sand/50 font-poppins mt-0.5">
                      {item.role}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-gold font-poppins uppercase tracking-wider text-right shrink-0">
                    {item.firm}
                  </span>
                </div>
                {/* Project context tag */}
                <div className="mt-3 text-[10px] text-brand-terracotta font-mono font-medium tracking-wide">
                  {item.context}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
