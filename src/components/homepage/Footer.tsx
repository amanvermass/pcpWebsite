"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useToast } from "../ui/Toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// Custom SVG Social Icons for Footer

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

// CSS 3D Clay Block that tilts with mouse coordinates and has vertical parallax scroll
const CSS3DBrick: React.FC<{ scrollProgress?: any }> = ({ scrollProgress }) => {
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

  const yFloat = scrollProgress ? useTransform(scrollProgress, [0, 1], [-30, 30]) : 0;

  return (
    <motion.div
      style={{ y: yFloat }}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 65, damping: 20 }}
      className="hidden lg:block absolute right-[12%] top-[140px] w-40 h-24 [perspective:800px] [transform-style:preserve-3d] z-0 opacity-[0.75] pointer-events-none select-none"
    >
      <motion.div 
        animate={{ y: [0, -12, 0], rotateY: [0, 360] }}
        transition={{ 
          y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
          rotateY: { repeat: Infinity, duration: 25, ease: "linear" }
        }}
        className="w-full h-full [transform-style:preserve-3d] relative"
      >
        {/* Drop Shadow of the brick */}
        <div 
          className="absolute bg-brand-gold/20 blur-xl rounded-full pointer-events-none"
          style={{ 
            width: "140px", 
            height: "25px", 
            left: "10px", 
            top: "90px", 
            transform: "rotateX(90deg) translateZ(-50px)",
          }}
        />
        {/* Front Face */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-[#914d3b] via-[#c06852] to-[#db8771] border border-[#ffbca9]/30 flex items-center justify-center text-[10px] font-bold text-white/70 tracking-[0.25em] font-poppins shadow-[0_6px_15px_rgba(0,0,0,0.3)]"
          style={{ transform: "rotateY(0deg) translateZ(48px)", width: "160px", height: "96px" }}
        >
          PCP
        </div>
        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#8c4331] to-[#5a2114] border border-[#ffbca9]/20"
          style={{ transform: "rotateY(180deg) translateZ(48px)", width: "160px", height: "96px" }}
        />
        {/* Right Face */}
        <div 
          className="absolute top-0 bottom-0 bg-gradient-to-b from-[#8c4331] to-[#5a2114] border border-[#ffbca9]/20 shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
          style={{ transform: "rotateY(90deg) translateZ(80px)", width: "96px", height: "96px", left: "32px" }}
        />
        {/* Left Face */}
        <div 
          className="absolute top-0 bottom-0 bg-gradient-to-b from-[#5c2316] to-[#361008] border border-[#ffbca9]/20"
          style={{ transform: "rotateY(-90deg) translateZ(80px)", width: "96px", height: "96px", left: "32px" }}
        />
        {/* Top Face */}
        <div 
          className="absolute left-0 right-0 bg-gradient-to-r from-[#e0917c] to-[#ffa894] border border-[#fff]/40 flex items-center justify-center text-[8px] text-[#5a2114]/80 font-bold tracking-widest font-poppins shadow-[inset_0_0_12px_rgba(255,255,255,0.45)]"
          style={{ transform: "rotateX(90deg) translateZ(48px)", width: "160px", height: "96px" }}
        >
          TERRACOTTA
        </div>
        {/* Bottom Face */}
        <div 
          className="absolute left-0 right-0 bg-gradient-to-t from-[#47150a] to-[#752a1a] border border-[#ffbca9]/10"
          style={{ transform: "rotateX(-90deg) translateZ(48px)", width: "160px", height: "96px" }}
        />
      </motion.div>
    </motion.div>
  );
};

const footerLinkClass = "relative py-0.5 text-brand-sand/65 hover:text-brand-gold transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full block w-fit";

// Spring hover animated text link
const AnimatedFooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <motion.div
      whileHover={{ 
        x: 6, 
        y: -1,
        scale: 1.02,
        transition: { type: "spring", stiffness: 450, damping: 12 } 
      }}
      className="w-fit"
    >
      <Link href={href} className={footerLinkClass}>
        {children}
      </Link>
    </motion.div>
  );
};

// Spring hover animated external contact link
const AnimatedExternalLink: React.FC<{ href: string; children: React.ReactNode; isBold?: boolean }> = ({ href, children, isBold = false }) => {
  return (
    <motion.div
      whileHover={{ 
        x: 6, 
        y: -1,
        scale: 1.02,
        transition: { type: "spring", stiffness: 450, damping: 12 } 
      }}
      className="w-fit"
    >
      <a 
        href={href}
        className={
          isBold
            ? "font-semibold text-brand-offwhite hover:text-brand-gold transition-colors duration-300 underline underline-offset-4 block w-fit font-poppins"
            : "text-brand-sand/70 hover:text-brand-gold transition-colors duration-300 block w-fit font-poppins"
        }
      >
        {children}
      </a>
    </motion.div>
  );
};

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast("Thank you! You have subscribed to the Technical Architectural bulletin.", "success");
    setNewsletterEmail("");
  };

  // Parallax Scroll Tracking for background 3D block
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Fade-in stagger animations for sections
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-brand-black pt-10 pb-4 relative overflow-hidden select-none z-10 border-t-[6px] border-[#9a3412]/50 rounded-t-[40px] md:rounded-t-[80px] shadow-[0_-16px_32px_rgba(154,52,18,0.18),inset_0_4px_0_rgba(255,255,255,0.12),inset_0_12px_24px_rgba(0,0,0,0.6)]"
    >
      {/* 3D Curved Top Shadow/Glow overlay */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none z-0" />

      {/* 3D Interactive Clay Block in Background */}
      <CSS3DBrick scrollProgress={scrollYProgress} />

      {/* Visual background ambient gold glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      {/* Perspective Giant Backdrop Branding */}
      <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.04] text-[clamp(6rem,18vw,24rem)] font-bold text-center tracking-[0.2em] font-poppins uppercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-brand-sand to-transparent">
        PRAYAG
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Horizontal 3D Glass Newsletter Panel */}
        <div 
          className="w-full bg-black mb-8 py-5 px-6 border border-brand-gold/10 relative overflow-hidden rounded-xl shadow-2xl backdrop-blur-md hover:border-brand-gold/30 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 group"
          style={{ backgroundColor: "rgba(18, 17, 16, 0.45)" }}
        >
          {/* Ambient inside glow */}
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-gold/15 transition-colors duration-500" />
          
          <div className="flex flex-col gap-1 max-w-xl text-left">
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold font-poppins">
              ARCHITECTURAL DISPATCH
            </span>
            <h3 className="text-lg font-normal font-cormorant text-brand-offwhite leading-tight">
              Subscribe to get technical bulletins, brick quantity calculators, and product blueprints.
            </h3>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto shrink-0 max-w-md relative z-10">
            <input
              type="email"
              placeholder="Enter your work email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-brand-charcoal/80 border border-brand-gold/15 rounded-none px-4 py-2.5 text-xs uppercase tracking-widest font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold w-full md:w-64"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-gold text-brand-black hover:bg-brand-sand hover:text-brand-offwhite transition-colors duration-300 font-bold uppercase tracking-wider text-xs cursor-pointer border border-brand-gold flex items-center gap-2 shrink-0"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Artevo Main Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-2"
        >
          
          {/* Left Side Column: Logo and Copyright/Credits */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-3">
            <div className="flex flex-col justify-between h-full min-h-[160px] text-left">
              <div className="mb-4">
                <Logo height="44" inverseText={true} />
              </div>
              <div className="space-y-3">
                <p className="text-[11px] font-poppins text-brand-sand/55 leading-relaxed max-w-[240px]">
                  Prayag Clay Products &copy; 2026. All Rights Reserved.
                </p>
                <p className="text-[10px] font-poppins text-brand-sand/45 leading-relaxed max-w-[240px]">
                  Web Development Company in Varanasi -{" "}
                  <a 
                    href="https://kvtechmedia.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-offwhite hover:text-brand-gold transition-colors underline underline-offset-2 font-medium"
                  >
                    KV TechMedia
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side Column: Artevo Multi-Layer Content */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
            
            {/* Top Social Links Row with 3D raised clay buttons */}
            <motion.div 
              variants={itemVariants} 
              className="social-links flex flex-wrap items-center justify-between pb-6 border-b border-brand-gold/10 gap-4"
            >
              <a 
                href="#" 
                className="px-4 py-2 bg-brand-slate-900 border border-brand-gold/20 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-offwhite hover:text-brand-gold shadow-[0_4px_0_#ce9456] hover:translate-y-[1px] hover:shadow-[0_3px_0_#ce9456] active:translate-y-[4px] active:shadow-none transition-all duration-150 flex items-center gap-2 group cursor-pointer animate-none"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#" 
                className="px-4 py-2 bg-brand-slate-900 border border-brand-gold/20 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-offwhite hover:text-brand-gold shadow-[0_4px_0_#ce9456] hover:translate-y-[1px] hover:shadow-[0_3px_0_#ce9456] active:translate-y-[4px] active:shadow-none transition-all duration-150 flex items-center gap-2 group cursor-pointer animate-none"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#" 
                className="px-4 py-2 bg-brand-slate-900 border border-brand-gold/20 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-offwhite hover:text-brand-gold shadow-[0_4px_0_#ce9456] hover:translate-y-[1px] hover:shadow-[0_3px_0_#ce9456] active:translate-y-[4px] active:shadow-none transition-all duration-150 flex items-center gap-2 group cursor-pointer animate-none"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#" 
                className="px-4 py-2 bg-brand-slate-900 border border-brand-gold/20 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-offwhite hover:text-brand-gold shadow-[0_4px_0_#ce9456] hover:translate-y-[1px] hover:shadow-[0_3px_0_#ce9456] active:translate-y-[4px] active:shadow-none transition-all duration-150 flex items-center gap-2 group cursor-pointer animate-none"
              >
                <span>YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>

            {/* Links Group Columns - Clean 3-Column Grid without QR/Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2 text-left">
              
              {/* Column 1: OUR WEBSITE */}
              <motion.div variants={itemVariants} className="links-group">
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/45 mb-4">
                  OUR WEBSITE
                </h6>
                <ul className="links flex flex-col gap-3 text-xs font-poppins">
                  <li><AnimatedFooterLink href="/">Home</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/about">About Us</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/inspiration">Inspiration</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/enquiry">Business Enquiry</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/privacy">Privacy Policy</AnimatedFooterLink></li>
                </ul>
              </motion.div>

              {/* Column 2: EXPLORE */}
              <motion.div variants={itemVariants} className="links-group">
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/45 mb-4">
                  EXPLORE
                </h6>
                <ul className="links flex flex-col gap-3 text-xs font-poppins">
                  <li><AnimatedFooterLink href="/products">Products</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/projects">Projects</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/dealers">Where to buy</AnimatedFooterLink></li>
                  <li><AnimatedFooterLink href="/contact">Contacts</AnimatedFooterLink></li>
                </ul>
              </motion.div>

              {/* Column 3: SAY HELLO & REACH US */}
              <motion.div variants={itemVariants} className="links-group space-y-5">
                <div>
                  <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/45 mb-2.5">
                    SAY HELLO
                  </h6>
                  <ul className="links flex flex-col gap-2.5 text-xs font-poppins">
                    <li>
                      <AnimatedExternalLink href="mailto:info@pcpindia.com" isBold>
                        info@pcpindia.com
                      </AnimatedExternalLink>
                    </li>
                    <li>
                      <AnimatedExternalLink href="tel:+919936011176">
                        +91 99360 11176
                      </AnimatedExternalLink>
                    </li>
                    <li>
                      <AnimatedExternalLink href="tel:+919935534218">
                        +91 99355 34218
                      </AnimatedExternalLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-gold/45 mb-2">
                    REACH US
                  </h6>
                  <div className="text-[11px] font-poppins text-brand-sand/65 leading-relaxed space-y-0.5">
                    <p className="font-semibold text-brand-offwhite text-xs font-poppins">Prayag Clay Products Limited</p>
                    <p className="text-[9px] font-semibold text-brand-sand/85 font-poppins">An ISO 9001:2015 Certified</p>
                    <p className="font-poppins text-[10.5px]">
                      Vill. Hariharpur, Off Ring Road Ph-1,<br />
                      Shivpur, Varanasi, UP, India 221003
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Giant Email Watermark Link - Moving Right to Left - FULL VIEWPORT WIDTH */}
      <div className="w-full overflow-hidden whitespace-nowrap pt-8 pb-1 relative select-text z-10 border-t border-brand-gold/10 mt-6 bg-transparent">
        <div className="flex w-max">
          <motion.div
            className="flex whitespace-nowrap text-[clamp(2rem,6vw,5.5rem)] font-poppins font-black tracking-tight uppercase leading-none"
            animate={{ x: [0, "-50%"] }}
            transition={{ ease: "linear", duration: 18, repeat: Infinity }}
          >
            <a 
              href="mailto:info@pcpindia.com" 
              className="pr-12 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
              style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7), -1px -1px 0px rgba(120,113,108,0.2)" }}
            >
              info@pcpindia.com
            </a>
            <a 
              href="mailto:info@pcpindia.com" 
              className="pr-12 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
              style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7), -1px -1px 0px rgba(120,113,108,0.2)" }}
            >
              info@pcpindia.com
            </a>
            <a 
              href="mailto:info@pcpindia.com" 
              className="pr-12 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
              style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7), -1px -1px 0px rgba(120,113,108,0.2)" }}
            >
              info@pcpindia.com
            </a>
            <a 
              href="mailto:info@pcpindia.com" 
              className="pr-12 text-brand-sand/15 hover:text-brand-gold transition-colors duration-500 select-text cursor-pointer"
              style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7), -1px -1px 0px rgba(120,113,108,0.2)" }}
            >
              info@pcpindia.com
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
