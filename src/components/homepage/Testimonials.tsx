"use client";

import React from "react";
import { Building2, Hammer, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  roleTag: string;
  icon: React.ReactNode;
  quote: string;
  avatar: string;
  author: string;
  roleAndFirm: string;
  projectHighlight: string;
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      roleTag: "ARCHITECT",
      icon: <Building2 className="w-3.5 h-3.5 text-brand-terracotta-500" />,
      quote: "PCP India’s brick range gives us the freedom to create timeless facades that are both beautiful and built to last. The texture, consistency and color options are exceptional.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      author: "Ar. Riya Saini",
      roleAndFirm: "Principal Architect, Saini & Associates",
      projectHighlight: "Project: IIM Ahmedabad"
    },
    {
      roleTag: "DEVELOPER",
      icon: <Hammer className="w-3.5 h-3.5 text-brand-terracotta-500" />,
      quote: "We’ve used PCP bricks in multiple large-scale projects. The product performance, timely supply and technical support make them a reliable partner for any developer.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
      author: "Vikram Mehta",
      roleAndFirm: "Project Director, Mehta Developers",
      projectHighlight: "Project: Lodha Palava City"
    },
    {
      roleTag: "DISTRIBUTOR",
      icon: <Globe className="w-3.5 h-3.5 text-brand-terracotta-500" />,
      quote: "PCP India products represent the perfect blend of tradition and innovation. Our international clients value the sustainability certifications and world-class quality they deliver.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
      author: "James Whitfield",
      roleAndFirm: "Managing Director, Buildex International",
      projectHighlight: "Serving: Australia, New Zealand"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 lg:py-24 bg-transparent relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center px-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-terracotta-500 block font-poppins">
              VOICES OF TRUST
            </span>
            <div className="w-8 h-[1px] bg-brand-terracotta-500/40 my-1" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-3 tracking-wide">
            Trusted by Experts. Chosen for Generations.
          </h2>

          <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 mt-4 max-w-2xl leading-relaxed">
            From architectural vision to global supply partnerships, our clients trust us for quality, consistency and a shared commitment to sustainable construction.
          </p>
        </div>

        {/* 3 Static Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-slate-950 border border-brand-slate-800/80 hover:border-brand-terracotta-500/40 p-7 sm:p-8 flex flex-col justify-between rounded-2xl transition-all duration-300 group text-left shadow-xl hover:shadow-2xl"
            >
              <div>
                {/* Header Row: Quotation mark & Role Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-cormorant font-bold text-brand-terracotta-500 leading-none select-none">
                    “
                  </span>
                  
                  <div className="flex items-center gap-1.5 bg-brand-terracotta-500/10 border border-brand-terracotta-500/20 px-3 py-1 rounded-full">
                    <div className="p-1 bg-brand-black rounded-full border border-brand-terracotta-500/20">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-brand-terracotta-500 uppercase font-poppins">
                      {item.roleTag}
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote Body */}
                <p className="text-xs sm:text-sm font-poppins text-brand-sand/85 leading-relaxed relative">
                  {item.quote}
                  <span className="text-brand-terracotta-500 font-bold ml-1 font-cormorant text-base">
                    ”
                  </span>
                </p>
              </div>

              {/* Card Footer Divider & Profile Block */}
              <div>
                <div className="w-full h-[1px] bg-brand-slate-800/80 my-6" />

                <div className="flex items-center gap-4">
                  {/* Avatar Profile Photo */}
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-13 h-13 rounded-full object-cover border-2 border-brand-slate-800 group-hover:border-brand-terracotta-500/50 transition-colors shrink-0 shadow-md"
                  />

                  {/* Profile Details */}
                  <div className="flex flex-col justify-center text-left">
                    <h4 className="text-sm font-semibold text-brand-offwhite font-poppins">
                      {item.author}
                    </h4>
                    <span className="text-[11px] text-brand-sand/65 font-poppins leading-tight mt-0.5">
                      {item.roleAndFirm}
                    </span>
                    <span className="text-[11px] font-semibold text-brand-terracotta-500 font-poppins mt-1">
                      {item.projectHighlight}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
