"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Compass, 
  Building2, 
  Globe, 
  Handshake, 
  CheckCircle2, 
  Headphones, 
  Mail, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export const AudienceGateways: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const pathways = [
    {
      title: "Architects & Consultants",
      subtitle: "High-performance clay solutions to bring your vision to life.",
      image: "/images/hero-1.jpg",
      icon: <Compass className="w-5 h-5 text-brand-terracotta-500" />,
      checklist: [
        "Detailed product specifications",
        "CAD, BIM & design resources",
        "Sustainability certifications (EPD, GRIHA)",
        "Technical support for your projects"
      ],
      actionText: "Explore for Architects",
      href: "/resources?role=architect"
    },
    {
      title: "Developers & Institutions",
      subtitle: "Reliable products, timely delivery and long-term performance.",
      image: "/images/cladding-showcase.jpg",
      icon: <Building2 className="w-5 h-5 text-brand-terracotta-500" />,
      checklist: [
        "Bulk order & supply assurance",
        "Project-based technical support",
        "Cost-effective & durable solutions",
        "Sustainable building materials"
      ],
      actionText: "Explore for Developers",
      href: "/contact?role=developer"
    },
    {
      title: "Export Buyers",
      subtitle: "Globally trusted clay products from India to the world.",
      image: "/images/hero-4.jpg",
      icon: <Globe className="w-5 h-5 text-brand-terracotta-500" />,
      checklist: [
        "International quality standards",
        "EPD certified & compliant products",
        "Reliable global logistics",
        "Dedicated export support"
      ],
      actionText: "Explore for Export Buyers",
      href: "/contact?role=export"
    },
    {
      title: "Dealers & Distributors",
      subtitle: "Grow with a brand that builds trust and delivers value.",
      image: "/images/legacy-heritage.jpg",
      icon: <Handshake className="w-5 h-5 text-brand-terracotta-500" />,
      checklist: [
        "Attractive dealership opportunities",
        "Marketing & branding support",
        "Timely supply & inventory support",
        "Long-term partnership approach"
      ],
      actionText: "Partner with PCP",
      href: "/contact?role=dealer"
    }
  ];

  return (
    <section 
      id="audience-gateways"
      ref={containerRef}
      className="py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center px-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-terracotta-500 block font-poppins">
              WHO WE BUILD FOR
            </span>
            <div className="w-8 h-[1px] bg-brand-terracotta-500/40 my-1" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-3 tracking-wide">
            Solutions for Every Builder. Value for Every Vision.
          </h2>

          <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 mt-4 max-w-2xl leading-relaxed">
            Whether you design, build, distribute or supply — we have the right solutions and support for your goals.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">
          {pathways.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-slate-950 border border-brand-slate-800 hover:border-brand-terracotta-500/40 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all shadow-xl hover:shadow-2xl text-left"
            >
              {/* Card Header Top Image Graphic */}
              <div className="relative h-44 bg-brand-black overflow-hidden border-b border-brand-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-transparent to-transparent" />
              </div>

              {/* Overlapping Floating Icon Badge */}
              <div className="w-12 h-12 rounded-full border-2 border-brand-slate-800 bg-brand-slate-900 flex items-center justify-center -mt-6 z-20 mx-auto shadow-lg shrink-0">
                {item.icon}
              </div>

              {/* Card Body */}
              <div className="p-6 pt-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite text-center">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-poppins text-brand-sand/65 text-center mt-1 mb-5 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <div className="w-full h-[1px] bg-brand-slate-800/80 mb-5" />

                  {/* Checklist */}
                  <div className="space-y-2.5 mb-6">
                    {item.checklist.map((check, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-poppins text-brand-sand/80 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0 mt-0.5" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Width Button CTA */}
                <div className="mt-4 pt-2">
                  <Link
                    href={item.href}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite py-3 px-4 rounded-xl text-xs font-bold font-poppins transition-colors shadow-md group-hover:shadow-brand-terracotta-600/20"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Help Panel (1:1 Mockup Alignment) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-terracotta-500/10 border border-brand-terracotta-500/20 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-brand-terracotta-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-offwhite font-poppins">
                Not sure which category fits you?
              </h4>
              <p className="text-xs text-brand-sand/65 font-poppins mt-0.5">
                Talk to our team and we'll guide you to the right solution.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 border border-brand-terracotta-500/40 hover:border-brand-terracotta-500 bg-brand-terracotta-500/10 hover:bg-brand-terracotta-500/20 text-brand-terracotta-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider font-poppins transition-colors shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default AudienceGateways;
