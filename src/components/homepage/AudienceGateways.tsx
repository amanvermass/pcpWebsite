"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Factory, Globe2, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

export const AudienceGateways: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-60px" });

  const pathways = [
    {
      title: "Architects & Specifiers",
      icon: <Compass className="w-6 h-6 text-brand-gold" />,
      desc: "Integrate high-accuracy BIM Revit objects, CAD blocks, and EPD compliance files directly into your structural specifications.",
      actionText: "Access Design Specs",
      href: "/resources"
    },
    {
      title: "Developers & Contractors",
      icon: <Factory className="w-6 h-6 text-brand-gold" />,
      desc: "Achieve structural load savings up to 60% with Ecotherm blocks. Get bulk pricing estimates, schedule logs, and technical calculations.",
      actionText: "Request Commercial Quote",
      href: "/contact?role=developer"
    },
    {
      title: "Export Sourcing Partners",
      icon: <Globe2 className="w-6 h-6 text-brand-gold" />,
      desc: "Order UKCA and CE certified fired clay modules designed for European and global load specifications. Direct ocean logistics hubs.",
      actionText: "Contact Export Desk",
      href: "/contact?role=export"
    },
    {
      title: "Dealers & Distributors",
      icon: <Network className="w-6 h-6 text-brand-gold" />,
      desc: "Join our retail specifications distribution network. Gain certified territory allocations, co-marketing collaterals, and support.",
      actionText: "Partner With Us",
      href: "/contact?role=dealer"
    }
  ];

  return (
    <section 
      id="audience-gateways"
      ref={containerRef}
      className="py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
            PARTNERSHIP PATHWAYS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Who We Build For
          </h2>
          <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 mt-4 max-w-lg leading-relaxed">
            Different building projects require different specification parameters. Select your pathway to view customized resources and enquiry desks.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/30 hover:bg-brand-slate-950 p-6 flex flex-col justify-between transition-all group text-left relative"
            >
              {/* Corner structural blueprint tick mark */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-gold/15 group-hover:border-brand-gold/40 transition-colors" />
              
              <div className="space-y-4">
                <div className="p-3 bg-brand-black border border-brand-gold/10 rounded-lg group-hover:border-brand-gold/40 transition-colors w-fit">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold font-cormorant text-brand-offwhite leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] font-poppins text-brand-sand/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-brand-gold/10 group-hover:border-brand-gold/20 transition-colors">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-brand-gold group-hover:text-brand-sand transition-colors font-poppins"
                >
                  {item.actionText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AudienceGateways;
