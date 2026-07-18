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

export const Footer: React.FC = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast("Thank you! You have subscribed to the Technical Architectural bulletin.", "success");
    setNewsletterEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-brand-slate pt-20 pb-12 relative z-10 border-t border-brand-slate-600/10 text-brand-slate-200 font-poppins">
      {/* Structural background lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-10">
        <div className="border-l border-brand-charcoal h-full" />
        <div className="border-l border-brand-charcoal h-full" />
        <div className="border-l border-brand-charcoal h-full" />
        <div className="border-l border-brand-charcoal h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Branding Statement & Back to Top Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-brand-charcoal/10 mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-brand-terracotta font-poppins">
              BRAND PHILOSOPHY
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light font-cormorant text-brand-offwhite leading-tight uppercase tracking-wider">
              Clay Is Our Heritage. Architecture Is Our Canvas.
            </h2>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold font-poppins text-brand-offwhite hover:text-brand-gold transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="p-1.5 border border-brand-gold/20 group-hover:border-brand-gold transition-colors">
              <ArrowUp className="w-3.5 h-3.5 text-brand-gold" />
            </div>
          </button>
        </div>

        {/* Newsletter subscription panel - White-Contrast Card overlay */}
        <div className="w-full bg-brand-charcoal border border-brand-slate/40 p-6 sm:p-8 rounded-none flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 shadow-sm relative z-10">
          <div className="flex flex-col gap-1.5 text-left max-w-xl">
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold font-poppins">
              ARCHITECTURAL DISPATCH
            </span>
            <h3 className="text-lg font-normal font-cormorant text-brand-offwhite leading-tight">
              Subscribe to get technical bulletins, brick quantity calculators, and product blueprints.
            </h3>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full lg:w-auto shrink-0 max-w-md">
            <input
              type="email"
              placeholder="Enter your work email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-brand-black border border-brand-slate rounded-none px-4 py-3 text-xs uppercase tracking-widest font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold w-full lg:w-64"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-gold text-brand-black hover:bg-brand-sand transition-colors duration-300 font-bold uppercase tracking-wider text-xs cursor-pointer border border-brand-gold flex items-center gap-2 shrink-0"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-2">
          
          {/* Left Side Column: Logo, credentials, & copyright */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between h-full min-h-[200px] text-left">
            <div>
              <Logo height="42" />
              <p className="text-[11px] font-poppins text-brand-slate-200 leading-relaxed mt-4 max-w-[280px]">
                Engineering structural building envelopes with premium terracotta solutions since 1937.
              </p>
              
              {/* Technical / Certification credentials */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-[7px] font-bold tracking-widest uppercase border border-brand-terracotta/30 text-brand-terracotta px-2 py-0.5 font-poppins">
                  EPD CERTIFIED
                </span>
                <span className="text-[7px] font-bold tracking-widest uppercase border border-brand-terracotta/30 text-brand-terracotta px-2 py-0.5 font-poppins">
                  GRIHA LISTED
                </span>
                <span className="text-[7px] font-bold tracking-widest uppercase border border-brand-terracotta/30 text-brand-terracotta px-2 py-0.5 font-poppins">
                  ISO 14001
                </span>
                <span className="text-[7px] font-bold tracking-widest uppercase border border-brand-terracotta/30 text-brand-terracotta px-2 py-0.5 font-poppins">
                  UKCA COMPLIANT
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mt-8 lg:mt-12">
              <p className="text-[10px] font-poppins text-brand-slate-300 leading-relaxed">
                Prayag Clay Products &copy; 2026. All Rights Reserved.
              </p>
              <p className="text-[9px] font-poppins text-brand-slate-300/50 leading-relaxed">
                Varanasi Web Development -{" "}
                <a 
                  href="https://kvtechmedia.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-offwhite hover:text-brand-gold transition-colors underline underline-offset-2"
                >
                  KV TechMedia
                </a>
              </p>
            </div>
          </div>

          {/* Right Side Column: Navigation Links, Coordinates, Say Hello */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            
            {/* Top Social Links Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-brand-charcoal/10">
              <a href="#" className="flex items-center justify-center gap-2.5 border border-brand-gold/15 hover:border-brand-gold py-3 px-4 bg-brand-charcoal hover:bg-brand-gold text-brand-offwhite hover:text-brand-black transition-all duration-300 text-[9px] font-bold uppercase tracking-widest font-poppins">
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-2.5 border border-brand-gold/15 hover:border-brand-gold py-3 px-4 bg-brand-charcoal hover:bg-brand-gold text-brand-offwhite hover:text-brand-black transition-all duration-300 text-[9px] font-bold uppercase tracking-widest font-poppins">
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-2.5 border border-brand-gold/15 hover:border-brand-gold py-3 px-4 bg-brand-charcoal hover:bg-brand-gold text-brand-offwhite hover:text-brand-black transition-all duration-300 text-[9px] font-bold uppercase tracking-widest font-poppins">
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-2.5 border border-brand-gold/15 hover:border-brand-gold py-3 px-4 bg-brand-charcoal hover:bg-brand-gold text-brand-offwhite hover:text-brand-black transition-all duration-300 text-[9px] font-bold uppercase tracking-widest font-poppins">
                <YouTubeIcon className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>
            </div>

            {/* Links Group Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2 text-left">
              
              {/* Column 1: OUR WEBSITE */}
              <div>
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-terracotta mb-5">
                  OUR WEBSITE
                </h6>
                <ul className="flex flex-col gap-3.5 text-xs font-poppins">
                  <li><Link href="/" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Home</Link></li>
                  <li><Link href="/about" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">About Us</Link></li>
                  <li><Link href="/inspiration" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Inspiration</Link></li>
                  <li><Link href="/enquiry" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Business Enquiry</Link></li>
                  <li><Link href="/privacy" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Column 2: EXPLORE */}
              <div>
                <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-terracotta mb-5">
                  EXPLORE
                </h6>
                <ul className="flex flex-col gap-3.5 text-xs font-poppins">
                  <li><Link href="/products" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Products</Link></li>
                  <li><Link href="/projects" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Projects</Link></li>
                  <li><Link href="/dealers" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Where to buy</Link></li>
                  <li><Link href="/contact" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all after:duration-300 pb-0.5">Contacts</Link></li>
                </ul>
              </div>

              {/* Column 3: SAY HELLO & GEOGRAPHY */}
              <div className="space-y-6">
                <div>
                  <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-terracotta mb-3">
                    SAY HELLO
                  </h6>
                  <ul className="flex flex-col gap-2.5 text-xs font-poppins">
                    <li>
                      <span className="text-[9px] uppercase tracking-wider text-brand-sand/50 block font-poppins">Domestic Inquiries</span>
                      <a href="mailto:info@pcpindia.com" className="font-semibold text-brand-offwhite hover:text-brand-gold transition-colors duration-200 underline underline-offset-4">
                        info@pcpindia.com
                      </a>
                    </li>
                    <li>
                      <span className="text-[9px] uppercase tracking-wider text-brand-sand/50 block font-poppins">Export Specifications</span>
                      <a href="mailto:export@pcpindia.com" className="font-semibold text-brand-offwhite hover:text-brand-gold transition-colors duration-200 underline underline-offset-4">
                        export@pcpindia.com
                      </a>
                    </li>
                    <li>
                      <span className="text-[9px] uppercase tracking-wider text-brand-sand/50 block font-poppins">Call Specifications Desk</span>
                      <a href="tel:+919936011176" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 block">
                        +91 99360 11176
                      </a>
                      <a href="tel:+919935534218" className="text-brand-slate-200 hover:text-brand-gold transition-colors duration-200 block">
                        +91 99355 34218
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h6 className="font-poppins text-uppercase text-[10px] font-bold tracking-[0.25em] text-brand-terracotta mb-3">
                    REACH US
                  </h6>
                  <div className="text-[10.5px] font-poppins text-brand-slate-200 leading-relaxed space-y-3">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-brand-offwhite text-xs">Varanasi Headquarters</p>
                      <p className="text-[8.5px] text-brand-terracotta font-bold tracking-wider uppercase font-mono">25.3176° N, 82.9739° E</p>
                      <p className="text-[10px] leading-relaxed">
                        Vill. Hariharpur, Off Ring Road Ph-1,<br />
                        Shivpur, Varanasi, UP, India 221003
                      </p>
                    </div>
                    
                    <div className="space-y-0.5 pt-1.5 border-t border-brand-charcoal/10">
                      <p className="font-semibold text-brand-offwhite text-xs">Noida Sales Office</p>
                      <p className="text-[8.5px] text-brand-terracotta font-bold tracking-wider uppercase font-mono">28.6273° N, 77.3725° E</p>
                      <p className="text-[10px] leading-relaxed">
                        Sector 62, Noida,<br />
                        Uttar Pradesh, India 201301
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
