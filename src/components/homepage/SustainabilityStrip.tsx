"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Leaf, Landmark, Download, FileText } from "lucide-react";
import Link from "next/link";

export const SustainabilityStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-60px" });

  const certifications = [
    {
      badge: "EPD",
      title: "Environmental Product Declaration",
      authority: "Third-party audited LCA footprint details",
      image: "/images/certifications/logo-epd.png"
    },
    {
      badge: "GRIHA",
      title: "Green Building Star Ratings",
      authority: "Certified low thermal conductivity masonry",
      image: "/images/certifications/logo-griha.jpg"
    },
    {
      badge: "ISO 9001",
      title: "Quality Management & Audits",
      authority: "ISO 9001:2015 certified factory standards",
      image: "/images/certifications/logo-iso.png"
    },
    {
      badge: "SUSTAINABLE",
      title: "Green Building Materials",
      authority: "Suitable for IGBC, LEED, and GRIHA ratings",
      image: "/images/certifications/logo-sustainability.png"
    }
  ];

  return (
    <section 
      id="sustainability-strip"
      ref={containerRef}
      className="py-16 bg-brand-black border-y border-brand-slate-900 text-left relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Box */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
              THE PCP DIFFERENTIATOR
            </span>
            <h3 className="text-3xl font-normal font-cormorant text-brand-offwhite leading-tight">
              EPD Certified Fired Clay: The Ultimate Standard
            </h3>
            <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 leading-relaxed">
              We provide fully audited Environmental Product Declarations (EPD), certifying a transparently measured lifecycle footprint. For green building specifiers and consultants, this documentation is essential for securing GRIHA credits and LEED ratings.
            </p>
            <div className="mt-2">
              <Link 
                href="/resources?type=Technical Datasheet"
                className="inline-flex items-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins shadow-md w-fit cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Certifications Stack
              </Link>
            </div>
          </div>

          {/* Right Badges / Grids */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-5 bg-brand-slate-950 border border-brand-slate-900 hover:border-brand-gold/20 rounded-none transition-all group"
              >
                <div className="w-16 h-16 bg-white p-1 rounded-none flex items-center justify-center shrink-0 border border-brand-gold/15 group-hover:border-brand-gold/45 transition-colors">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-brand-terracotta font-mono uppercase bg-brand-terracotta/5 px-2 py-0.5 rounded border border-brand-terracotta/10 shrink-0">
                      {cert.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-brand-offwhite font-poppins mt-1">
                    {cert.title}
                  </h4>
                  <p className="text-[10px] font-poppins text-brand-sand/60 leading-normal">
                    {cert.authority}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SustainabilityStrip;
