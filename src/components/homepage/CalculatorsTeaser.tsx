"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useInView, motion } from "framer-motion";
import { Calculator, Layers, Hammer, ArrowRight, FileText } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";

interface UtilityCardProps {
  name: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  actionText: string;
  badge: string;
}

const UtilityCard: React.FC<UtilityCardProps> = ({
  name, desc, icon, href, actionText, badge
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <div ref={cardRef} className="h-full">
      <Link
        href={href}
        className="flex flex-col justify-between h-full bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/40 rounded-none p-8 hover:shadow-[0_0_30px_rgba(197,139,69,0.15)] transition-all group duration-300 relative text-left"
      >
        <div>
          {/* Header icon row */}
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-brand-black border border-brand-gold/15 rounded-none text-brand-gold group-hover:border-brand-gold/40 transition-colors">
              {icon}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-brand-slate-400 font-mono border border-brand-slate-800 px-2 py-0.5 font-poppins">
              {badge}
            </span>
          </div>

          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors">
            {name}
          </h3>
          <p className="text-xs font-poppins text-brand-slate-300 mt-3 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5 py-3.5 rounded-none text-[10px] uppercase font-poppins font-bold tracking-[0.2em] bg-brand-gold group-hover:bg-brand-sand text-brand-black border border-brand-gold group-hover:border-brand-sand transition-colors cursor-pointer">
          {actionText}
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </div>
  );
};

export const CalculatorsTeaser: React.FC = () => {
  const utilities = [
    {
      name: "Precision Material Estimators",
      desc: "Compute exact brick counts, paving area layouts, and mortar joint volume requirements to minimize material wastage.",
      icon: <Calculator className="w-6 h-6" />,
      href: "/calculators",
      actionText: "Launch Estimators",
      badge: "Self-Serve Calculators"
    },
    {
      name: "Installation & Anchoring Guides",
      desc: "Access step-by-step layout blueprints, structural details, cavity wall specifications, and site guidelines for contractors.",
      icon: <Hammer className="w-6 h-6" />,
      href: "/resources?type=Installation Guide",
      actionText: "Download Guides",
      badge: "Technical Manuals"
    },
    {
      name: "Specification Comparison Tool",
      desc: "Cross-reference physical densities, thermal U-values, dead-load limits, and certifications across our entire product range.",
      icon: <Layers className="w-6 h-6" />,
      href: "/resources",
      actionText: "Compare Specifications",
      badge: "Product Matrix"
    }
  ];

  return (
    <section id="calculators" className="py-16 md:py-20 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
            SPECIFICATION UTILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Self-Serve Resources
          </h2>
          <p className="text-brand-slate-300 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Gain immediate practical specifications with our estimators, guides, and comparison tables designed for contractors and architects mid-project.
          </p>
        </div>

        {/* Utilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {utilities.map((item, idx) => (
            <UtilityCard
              key={idx}
              name={item.name}
              desc={item.desc}
              icon={item.icon}
              href={item.href}
              actionText={item.actionText}
              badge={item.badge}
            />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-16">
          <Magnetic>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-sand text-brand-black px-8 py-4 rounded-none font-semibold uppercase tracking-[0.2em] font-poppins text-xs transition-colors border border-brand-gold cursor-pointer"
            >
              Access Resource Library
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsTeaser;
