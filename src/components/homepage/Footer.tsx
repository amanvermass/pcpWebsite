"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useToast } from "../ui/Toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Magnetic } from "../ui/Magnetic";

export const Footer: React.FC = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast("Thank you! You have subscribed to the Technical Architectural bulletin.", "success");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-brand-black border-t border-brand-gold/15 pt-24 relative overflow-hidden select-none z-10">
      {/* Visual background ambient gold glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-gold/10">
          
          {/* Logo & Newsletter Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Logo height="44" inverseText={true} />
            </div>
            
            <p className="text-xs font-poppins text-brand-sand/65 leading-relaxed max-w-sm">
              We design and fire industrial-grade building ceramics, paving stones, and lightweight aerated blocks. Leading the construction industry toward structural resilience and zero-waste manufacturing.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-2">
              <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-gold font-poppins">
                ARCHITECTS BULLETINS
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Work email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-brand-charcoal border border-brand-gold/10 rounded-none px-3.5 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="p-3 bg-brand-gold text-brand-black hover:bg-brand-sand transition-colors rounded-none cursor-pointer border border-brand-gold"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Links Column 1: Products */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.2em] mb-6 font-poppins">
              Products
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs font-poppins text-brand-sand/60">
              <li><Link href="/products?category=Clay Bricks" className="hover:text-brand-gold transition-colors">Clay Facing Bricks</Link></li>
              <li><Link href="/products?category=Terracotta" className="hover:text-brand-gold transition-colors">Terracotta Facades</Link></li>
              <li><Link href="/products?category=Roofing Tiles" className="hover:text-brand-gold transition-colors">Roofing Tiles</Link></li>
              <li><Link href="/products?category=Pavers" className="hover:text-brand-gold transition-colors">Engineering Pavers</Link></li>
              <li><Link href="/products?category=Hollow Blocks" className="hover:text-brand-gold transition-colors">Hollow Blocks</Link></li>
              <li><Link href="/products?category=AAC Blocks" className="hover:text-brand-gold transition-colors">AAC Blocks</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Tools */}
          <div className="md:col-span-2.5">
            <h4 className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.2em] mb-6 font-poppins">
              Engineers Portal
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs font-poppins text-brand-sand/60">
              <li><Link href="/calculators?id=brick-quantity" className="hover:text-brand-gold transition-colors">Brick Qty Calculator</Link></li>
              <li><Link href="/calculators?id=wall-net-area" className="hover:text-brand-gold transition-colors">Wall Net Area Tool</Link></li>
              <li><Link href="/calculators?id=paver" className="hover:text-brand-gold transition-colors">Paver Calculator</Link></li>
              <li><Link href={getHref("#dealers")} className="hover:text-brand-gold transition-colors">Dealer coverage Map</Link></li>
              <li><Link href={getHref("#calculators")} className="hover:text-brand-gold transition-colors">Estimators Dashboard</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Corporate */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase font-bold text-brand-gold tracking-[0.2em] mb-6 font-poppins">
              Corporate
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs font-poppins text-brand-sand/60">
              <li><Link href={getHref("#why-pcp")} className="hover:text-brand-gold transition-colors">Historical Timeline</Link></li>
              <li><Link href="/projects" className="hover:text-brand-gold transition-colors">Project Portfolio</Link></li>
              <li><Link href={getHref("#dealers")} className="hover:text-brand-gold transition-colors">Distribution Network</Link></li>
              <li><Link href={getHref("#contact")} className="hover:text-brand-gold transition-colors">Contact Enquiries</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Socials & Copyright Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-poppins text-brand-sand/40 gap-6 pt-8">
          <span>&copy; 2026 Prayag Clay Productions (PCP) Ltd. All Rights Reserved.</span>
          
          {/* Social icons with hover effects */}
          <div className="flex items-center gap-6">
            <Magnetic>
              <a href="#" className="p-2 bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/50 text-brand-sand hover:text-brand-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#" className="p-2 bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/50 text-brand-sand hover:text-brand-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#" className="p-2 bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/50 text-brand-sand hover:text-brand-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
