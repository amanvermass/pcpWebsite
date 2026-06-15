"use client";

import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  firm: string;
  rating: number;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "The visual depth and thermal shielding of PCP's cladding tiles are unmatched. We've specified them for multiple Net-Zero facades.",
      author: "Ar. Sanjay Puri",
      role: "Principal Architect",
      firm: "Sanjay Puri Architects",
      rating: 5
    },
    {
      quote: "PCP lightweight AAC blocks significantly reduced our building structural loads while giving us superior fire-ratings.",
      author: "Rajesh Malhotra",
      role: "Lead Structural Engineer",
      firm: "L&T Construction",
      rating: 5
    },
    {
      quote: "Their high-traffic interlocking paving blocks easily stood up to heavy logistics loaders. Extreme wear durability.",
      author: "Vikram Shekhawat",
      role: "Project Director",
      firm: "Delhi Metro Rail Corp (DMRC)",
      rating: 5
    },
    {
      quote: "PCP custom masonry terracotta structures gave our civic plaza project a rich natural texture that has earned multiple design awards.",
      author: "Ar. Sonali Rastogi",
      role: "Founding Partner",
      firm: "Morphogenesis",
      rating: 5
    }
  ];

  // Duplicate list to support seamless infinite looping track
  const loopList = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-brand-black overflow-hidden relative select-none">
      {/* Background guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center px-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
            INDUSTRY VERDICTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Trusted by Builders & Architects
          </h2>
        </div>

        {/* Infinite Marquee Track */}
        <div className="relative w-full flex items-center overflow-hidden py-4">
          {/* Left/Right Vignette gradients to smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

          {/* Sliding Track */}
          <div className="flex w-[200%] gap-8 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap">
            {loopList.map((item, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[420px] bg-brand-charcoal border border-brand-gold/10 p-6 sm:p-8 flex flex-col justify-between shrink-0 rounded-none select-none"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 text-brand-gold">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm font-poppins text-brand-sand/80 leading-relaxed whitespace-normal italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 border-t border-brand-gold/10 pt-4 flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-brand-offwhite font-poppins">
                      {item.author}
                    </span>
                    <span className="block text-[9px] uppercase tracking-widest text-brand-sand/50 font-poppins mt-0.5">
                      {item.role}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-gold font-poppins uppercase tracking-wider">
                    {item.firm}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global CSS Inject for marquee sliding */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
