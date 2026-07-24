"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useToast } from "../ui/Toast";
import Link from "next/link";
import { Logo } from "./Logo";

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

interface FooterProps {
  showCTA?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ showCTA = true }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className={`bg-brand-black border-t border-brand-gold/10 relative z-10 text-brand-slate-200 font-poppins ${showCTA ? 'pt-32 md:pt-40 lg:pt-44' : 'pt-20'} pb-12`}>
      
      {/* Overlapping CTA Card */}
      {showCTA && (
        <div className="absolute top-0 left-0 right-0 transform -translate-y-1/2 z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-brand-charcoal border border-brand-gold/25 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 rounded-none">
            {/* Background Image of project */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/projects/project-48.jpg"
                alt="Featured architectural project facade - PCP India"
                className="w-full h-full object-cover object-center opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent" />
            </div>
            
            {/* CTA Text */}
            <div className="relative z-10 space-y-2 text-left">
              <h3 className="text-2xl sm:text-3xl font-normal font-cormorant text-brand-offwhite leading-tight uppercase tracking-wider">
                Experience Fired Clay Excellence
              </h3>
              <p className="text-xs sm:text-sm font-poppins text-brand-sand/70 max-w-md">
                Heritage craftsmanship since 1937. Request our physical spec catalogs and sample blocks today.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="relative z-10 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-brand-gold hover:bg-brand-sand text-brand-black font-bold px-8 py-3.5 rounded-none text-xs uppercase tracking-widest font-poppins transition-colors duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Left Column: Brand Coordinates, Contact Address, Phones, Emails */}
          <div className="col-span-12 lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <Logo height="40" />
              <p className="text-[11px] font-poppins text-brand-sand/70 leading-relaxed max-w-sm">
                Engineering high-performance structural building envelopes and heritage clay facing solutions since 1937.
              </p>
            </div>

            {/* Coordinates & Addresses side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-sand/80 font-poppins">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block">Varanasi HQ</span>
                <span className="text-[8px] text-brand-terracotta font-bold font-mono block">25.3176° N, 82.9739° E</span>
                <p className="text-[11px] leading-relaxed text-brand-sand/65">
                  Vill. Hariharpur, Off Ring Road Ph-1,<br />
                  Shivpur, Varanasi, UP, India 221003
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block">Noida Sales Office</span>
                <span className="text-[8px] text-brand-terracotta font-bold font-mono block">28.6273° N, 77.3725° E</span>
                <p className="text-[11px] leading-relaxed text-brand-sand/65">
                  Sector 62, Noida,<br />
                  Uttar Pradesh, India 201301
                </p>
              </div>
            </div>

            {/* Phone & Email Display blocks (side-by-side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-sand/80 border-t border-brand-gold/10 pt-6">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block">Phone Numbers</span>
                <a href="tel:+919936011176" className="block text-brand-offwhite hover:text-brand-gold transition-colors font-bold">+91 99360 11176</a>
                <a href="tel:+919935534218" className="block text-brand-offwhite hover:text-brand-gold transition-colors font-bold">+91 99355 34218</a>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block">Email Enquiries</span>
                <a href="mailto:info@pcpindia.com" className="block text-brand-offwhite hover:text-brand-gold transition-colors font-bold">info@pcpindia.com</a>
                <a href="mailto:export@pcpindia.com" className="block text-brand-offwhite hover:text-brand-gold transition-colors font-bold">export@pcpindia.com</a>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Link Blocks */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            
            {/* Column 1: Quick Links */}
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold mb-5">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3.5 text-xs font-poppins">
                <li><Link href="/" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-brand-sand/80 hover:text-brand-gold transition-colors">About Us</Link></li>
                <li><Link href="/products" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Products Catalog</Link></li>
                <li><Link href="/projects" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Signature Projects</Link></li>
                <li><Link href="/calculators" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Walling Estimators</Link></li>
              </ul>
            </div>

            {/* Column 2: Social coordinates */}
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold mb-5">
                Social Links
              </h4>
              <ul className="flex flex-col gap-3.5 text-xs font-poppins">
                <li><a href="#" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Facebook</a></li>
                <li><a href="#" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Instagram</a></li>
                <li><a href="#" className="text-brand-sand/80 hover:text-brand-gold transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-brand-sand/80 hover:text-brand-gold transition-colors">YouTube</a></li>
              </ul>
            </div>

            {/* Column 3: Legal compliance */}
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold mb-5">
                Legal
              </h4>
              <ul className="flex flex-col gap-3.5 text-xs font-poppins">
                <li><Link href="/terms" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-brand-sand/80 hover:text-brand-gold transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer Bottom copyright and developer credits */}
        <div className="border-t border-brand-gold/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-sand/50 font-poppins">
          <p>© 2026 Prayag Clay Products. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="text-[9px] uppercase tracking-widest font-bold font-poppins text-brand-sand hover:text-brand-gold transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
            <span className="text-brand-gold/20">|</span>
            <p>
              Varanasi Web Development -{" "}
              <a 
                href="https://kvtechmedia.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-sand/80 hover:text-brand-gold transition-colors underline underline-offset-2"
              >
                KV TechMedia
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
