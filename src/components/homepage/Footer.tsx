"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Mail, ShieldCheck, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useToast } from "../ui/Toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Magnetic } from "../ui/Magnetic";
import { motion } from "framer-motion";

// CSS 3D Clay Block that tilts with mouse coordinates
const CSS3DBrick: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 22, y: -38 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 35;
      const y = (e.clientY / window.innerHeight - 0.5) * 35;
      setRotation({ x: 22 - y, y: -38 + x });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden lg:block absolute right-[12%] top-[110px] w-40 h-24 [perspective:1000px] z-0 opacity-[0.25] pointer-events-none select-none">
      <motion.div
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
        className="w-full h-full [transform-style:preserve-3d] relative"
      >
        {/* Front Face (width x height: 160x96) */}
        <div 
          className="absolute inset-0 bg-[#af6752] border border-[#ce9456]/40 flex items-center justify-center text-[9px] font-bold text-white/50 tracking-[0.2em] font-poppins"
          style={{ transform: "rotateY(0deg) translateZ(48px)", width: "160px", height: "96px" }}
        >
          PCP
        </div>
        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-[#ae624c] border border-[#ce9456]/40"
          style={{ transform: "rotateY(180deg) translateZ(48px)", width: "160px", height: "96px" }}
        />
        {/* Right Face (depth x height: 96x96) */}
        <div 
          className="absolute top-0 bottom-0 bg-[#c1816e] border border-[#ce9456]/40"
          style={{ transform: "rotateY(90deg) translateZ(80px)", width: "96px", height: "96px", left: "32px" }}
        />
        {/* Left Face */}
        <div 
          className="absolute top-0 bottom-0 bg-[#ae624c] border border-[#ce9456]/40"
          style={{ transform: "rotateY(-90deg) translateZ(80px)", width: "96px", height: "96px", left: "32px" }}
        />
        {/* Top Face (width x depth: 160x96) */}
        <div 
          className="absolute left-0 right-0 bg-[#e79e86] border border-[#ce9456]/50 flex items-center justify-center text-[7px] text-[#af6752]/75 font-semibold tracking-wider font-poppins"
          style={{ transform: "rotateX(90deg) translateZ(48px)", width: "160px", height: "96px" }}
        >
          TERRACOTTA
        </div>
        {/* Bottom Face */}
        <div 
          className="absolute left-0 right-0 bg-[#945645] border border-[#ce9456]/30"
          style={{ transform: "rotateX(-90deg) translateZ(48px)", width: "160px", height: "96px" }}
        />
      </motion.div>
    </div>
  );
};

const footerLinkClass = "relative py-0.5 text-brand-sand/65 hover:text-brand-gold transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full block w-fit";

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
    <footer className="bg-brand-black pt-36 pb-12 relative overflow-hidden select-none z-10">
      
      {/* 3D Top Skewed Panel Divider */}
      <div className="absolute top-0 left-0 right-0 h-[85px] bg-gradient-to-b from-brand-charcoal to-transparent border-t border-[#ce9456]/20 -skew-y-1.5 origin-top-left z-0 pointer-events-none" />

      {/* 3D Interactive Clay Block in Background */}
      <CSS3DBrick />

      {/* Visual background ambient gold glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      {/* Perspective Giant Backdrop Branding */}
      <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.05] text-[clamp(8rem,20vw,28rem)] font-bold text-center tracking-[0.2em] font-poppins uppercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-brand-sand to-transparent">
        PRAYAG
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Horizontal 3D Glass Newsletter Panel */}
        <div 
          className="w-full bg-black mb-16 p-8 border border-brand-gold/10 relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-md hover:border-brand-gold/30 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 group"
          style={{ backgroundColor: "rgba(18, 17, 16, 0.45)" }}
        >
          {/* Ambient inside glow */}
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/15 transition-colors duration-500" />
          
          <div className="flex flex-col gap-2 max-w-xl text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold font-poppins">
              ARCHITECTURAL DISPATCH
            </span>
            <h3 className="text-xl sm:text-2xl font-normal font-cormorant text-brand-offwhite leading-tight">
              Subscribe to get technical bulletins, brick quantity calculators, and product blueprints.
            </h3>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto shrink-0 max-w-md relative z-10">
            <input
              type="email"
              placeholder="Enter your work email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-brand-charcoal/80 border border-brand-gold/15 rounded-none px-4 py-3.5 text-xs uppercase tracking-widest font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold w-full md:w-72"
              required
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-brand-gold text-brand-black hover:bg-brand-sand hover:text-brand-offwhite transition-colors duration-300 font-bold uppercase tracking-wider text-xs cursor-pointer border border-brand-gold flex items-center gap-2 shrink-0"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Artevo Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Left Side: Logo and Copyright stack */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col justify-between h-full min-h-[220px]">
              <div className="mb-8">
                <Logo height="44" inverseText={true} />
              </div>
              <p className="text-[11px] font-poppins text-brand-sand/50 leading-relaxed max-w-[220px]">
                &copy; 1983-2026 Prayag Clay Productions (PCP) Ltd. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Right Side: Artevo Main Footer Content */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-12">
            
            {/* Top Social Links Row with up-right arrows */}
            <div className="social-links flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-brand-gold/10 gap-4">
              <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-sand/60 hover:text-brand-gold transition-colors duration-300 group">
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-sand/60 hover:text-brand-gold transition-colors duration-300 group">
                <span>X (Twitter)</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-sand/60 hover:text-brand-gold transition-colors duration-300 group">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-sand/60 hover:text-brand-gold transition-colors duration-300 group">
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Links Group Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
              
              {/* Column 1: Top Links */}
              <div className="links-group">
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/40 mb-5">
                  TOP LINKS
                </h6>
                <ul className="links flex flex-col gap-3.5 text-xs font-poppins">
                  <li><Link href="/about" className={footerLinkClass}>About Us</Link></li>
                  <li><Link href="/projects" className={footerLinkClass}>Projects Portfolio</Link></li>
                  <li><Link href={getHref("#why-pcp")} className={footerLinkClass}>Historical Timeline</Link></li>
                </ul>
              </div>

              {/* Column 2: Resources */}
              <div className="links-group">
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/40 mb-5">
                  RESOURCES
                </h6>
                <ul className="links flex flex-col gap-3.5 text-xs font-poppins">
                  <li><Link href="/products" className={footerLinkClass}>Products Catalog</Link></li>
                  <li><Link href="/calculators" className={footerLinkClass}>Estimators Hub</Link></li>
                  <li><Link href={getHref("#dealers")} className={footerLinkClass}>Dealer Coverage Map</Link></li>
                </ul>
              </div>

              {/* Column 3: PHONE */}
              <div className="links-group">
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/40 mb-5">
                  PHONE
                </h6>
                <ul className="links flex flex-col gap-3.5 text-xs font-poppins">
                  <li>
                    <a 
                      href="tel:+911140509900" 
                      className="text-sm font-semibold text-brand-offwhite hover:text-brand-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full block w-fit font-poppins"
                    >
                      +91 11 4050 9900
                    </a>
                  </li>
                  <li>
                    <a 
                      href="tel:+915322421200" 
                      className="text-sm font-semibold text-brand-offwhite hover:text-brand-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full block w-fit font-poppins"
                    >
                      +91 532 242 1200
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: ADDRESS */}
              <div className="links-group">
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/40 mb-5">
                  ADDRESS
                </h6>
                <ul className="links flex flex-col gap-4 text-xs font-poppins text-brand-sand/70 leading-relaxed">
                  <li>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold block mb-0.5">Corporate Hub</span>
                    Okhla Phase III, New Delhi, India
                  </li>
                  <li>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold block mb-0.5">Production Plant</span>
                    Naini Industrial Area, Prayagraj, UP, India
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Giant Email Watermark Link - Moving Right to Left - FULL VIEWPORT WIDTH */}
      <div className="w-full overflow-hidden whitespace-nowrap pt-12 pb-4 relative select-text z-10 border-t border-brand-gold/5 mt-8">
        <div className="flex w-max">
          <motion.div
            className="flex whitespace-nowrap text-[clamp(2.5rem,8vw,7.5rem)] font-poppins font-extralight tracking-tight uppercase leading-none"
            animate={{ x: [0, "-50%"] }}
            transition={{ ease: "linear", duration: 18, repeat: Infinity }}
          >
            <a 
              href="mailto:delhi@prayagclay.com" 
              className="pr-16 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
            >
              delhi@prayagclay.com
            </a>
            <a 
              href="mailto:delhi@prayagclay.com" 
              className="pr-16 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
            >
              delhi@prayagclay.com
            </a>
            <a 
              href="mailto:delhi@prayagclay.com" 
              className="pr-16 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
            >
              delhi@prayagclay.com
            </a>
            <a 
              href="mailto:delhi@prayagclay.com" 
              className="pr-16 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
            >
              delhi@prayagclay.com
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
