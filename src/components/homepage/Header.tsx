"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Building2, HardHat, FileText, Calculator, PhoneCall, Sun, Moon, ArrowRight, Compass, Layers, Hammer, LayoutGrid, Leaf, Shield, Award, Landmark, Users, Globe, BookOpen, Briefcase, Milestone, Factory } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Custom relevant line-art SVG icons matching the Vandersanden aesthetic
const FacadeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="1.5" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <line x1="2" y1="15" x2="22" y2="15" />
    <line x1="7" y1="4" x2="7" y2="9" />
    <line x1="17" y1="4" x2="17" y2="9" />
    <line x1="12" y1="9" x2="12" y2="15" />
    <line x1="7" y1="15" x2="7" y2="20" />
    <line x1="17" y1="15" x2="17" y2="20" />
  </svg>
);

const PaversIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2l6 6-4 4-6-6z" />
    <path d="M14 2l6 6-4 4-6-6z" />
    <path d="M10 8l6 6-4 4-6-6z" />
    <path d="M18 8l6 6-4 4-6-6z" />
  </svg>
);

const RoofingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 20c3-3 3-3 6 0 3-3 3-3 6 0 3-3 3-3 6 0" />
    <path d="M3 14c3-3 3-3 6 0 3-3 3-3 6 0 3-3 3-3 6 0" />
    <path d="M3 8c3-3 3-3 6 0 3-3 3-3 6 0 3-3 3-3 6 0" />
  </svg>
);

const HollowBlockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="1.5" />
    <rect x="5" y="8" width="5" height="8" rx="0.5" />
    <rect x="14" y="8" width="5" height="8" rx="0.5" />
  </svg>
);

const AACBlockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="1.5" />
    <line x1="6" y1="10" x2="6.01" y2="10" />
    <line x1="12" y1="10" x2="12.01" y2="10" />
    <line x1="18" y1="10" x2="18.01" y2="10" />
    <line x1="9" y1="14" x2="9.01" y2="14" />
    <line x1="15" y1="14" x2="15.01" y2="14" />
  </svg>
);

const ExpertiseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h5" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
);

const ProfessionalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="6" y="2" width="12" height="20" rx="1" />
    <line x1="9" y1="2" x2="9" y2="22" />
    <line x1="6" y1="6" x2="9" y2="6" />
    <line x1="6" y1="10" x2="9" y2="10" />
    <line x1="6" y1="14" x2="9" y2="14" />
    <line x1="6" y1="18" x2="9" y2="18" />
  </svg>
);

const ConsumerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menuName: string) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  const handleLinkClick = (pathOrSelector: string) => {
    setIsOpen(false);
    setActiveDropdown(null);

    if (pathOrSelector.startsWith("#")) {
      if (pathname === "/") {
        const element = document.querySelector(pathOrSelector);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${pathOrSelector}`);
      }
    } else {
      router.push(pathOrSelector);
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const productMenu = {
    categories: [
      { name: "Clay Hollow Blocks", href: "/products?category=Hollow Blocks", icon: <HollowBlockIcon className="w-4 h-4" /> },
      { name: "Facing Bricks (Extruded)", href: "/products?category=Clay Bricks", icon: <FacadeIcon className="w-4 h-4" /> },
      { name: "Handmade Bricks", href: "/products?category=Clay Bricks", icon: <FacadeIcon className="w-4 h-4" /> },
      { name: "Linea Handmade Series", href: "/products?category=Clay Bricks", icon: <FacadeIcon className="w-4 h-4" /> },
      { name: "Cladding Bricks & Tiles", href: "/products?category=Terracotta", icon: <FacadeIcon className="w-4 h-4" /> },
      { name: "Clay Pavers", href: "/products?category=Pavers", icon: <PaversIcon className="w-4 h-4" /> },
      { name: "Roofing Tiles", href: "/products?category=Roofing Tiles", icon: <RoofingIcon className="w-4 h-4" /> },
      { name: "Terraplast", href: "/products?category=Terraplasts", icon: <AACBlockIcon className="w-4 h-4" /> }
    ] as { name: string; href: string; icon: React.ReactNode; isNew?: boolean }[],
    downloads: [
      { name: "TDS", label: "Technical Data Sheets", href: "/resources?type=Technical Datasheet", icon: <FileText className="w-5 h-5" /> },
      { name: "BIM", label: "Building Information Modeling", href: "/resources?type=BIM Revit Object", icon: <Layers className="w-5 h-5" /> },
      { name: "CAD", label: "CAD Drawings & Details", href: "/resources?type=CAD Detail", icon: <LayoutGrid className="w-5 h-5" /> }
    ],
    applications: [
      { name: "Structural Walling", href: "/products?category=Hollow Blocks", icon: <Building2 className="w-4 h-4" /> },
      { name: "Facades & Cladding", href: "/products?category=Terracotta", icon: <FacadeIcon className="w-4 h-4" /> },
      { name: "Flooring & Paving", href: "/products?category=Pavers", icon: <PaversIcon className="w-4 h-4" /> },
      { name: "Roofing", href: "/products?category=Roofing Tiles", icon: <RoofingIcon className="w-4 h-4" /> },
      { name: "Interior Wall Finish (Terraplast)", href: "/products?category=Terraplasts", icon: <AACBlockIcon className="w-4 h-4" /> },
      { name: "Sustainable Building", href: "/#sustainability-strip", icon: <Leaf className="w-4 h-4" /> }
    ] as { name: string; href: string; icon: React.ReactNode; highlightSuffix?: string; isComingSoon?: boolean }[]
  };

  const sustainabilityItems = [
    { name: "Our EPD Certification", href: "/#sustainability", desc: "Environmental Product Declarations certifying low footprint." },
    { name: "Certifications & Standards", href: "/about#certifications", desc: "GRIHA · ISO 14001 · UKCA compliance details." },
    { name: "Environmental Commitments", href: "/#sustainability", desc: "CO2 reduction, zero waste discharge, and green energy." },
    { name: "Production Process", href: "/about#process", desc: "High-efficiency European tunnel kiln firing." },
    { name: "Sustainable Building with Clay", href: "/#sustainability", desc: "How fired clay naturally regulates temperature." }
  ];

  const resourcesItems = [
    { name: "Installation Guides", href: "/resources?type=Installation Guide", desc: "Step-by-step layout & anchoring instructions." },
    { name: "Material Help Centre", href: "/resources", desc: "Technical FAQs, product guides, and support." },
    { name: "Calculators", href: "/calculators", desc: "Brick counts, wall net area, roof and paver estimators." },
    { name: "Blog", href: "/#blogs", desc: "Masonry tips, construction science, and updates." }
  ];

  const aboutItems = [
    { name: "Our Story (Est. 1937)", href: "/about#why-pcp", desc: "Over 80 years of excellence in fired clay." },
    { name: "Leadership", href: "/about#leadership", desc: "Directors, ceramic chemists, and specifications engineers." },
    { name: "Manufacturing Facility", href: "/about#process", desc: "Take a tour of our automated tunnel kiln facility." },
    { name: "Certifications & Standards", href: "/about#certifications", desc: "GRIHA, ISO audits, UKCA structural certificates." },
    { name: "Awards & Media", href: "/about#certifications", desc: "Recognitions in sustainable building." },
    { name: "Export Activity / Our Footprints", href: "/about#infrastructure", desc: "Global and domestic distribution hubs." },
    { name: "Careers", href: "/about#leadership", desc: "Join our specifications team." }
  ];

  return (
    <header
      onMouseLeave={() => setActiveDropdown(null)}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled || isOpen
        ? "bg-brand-slate-950 py-3 shadow-md border-b border-brand-slate-800/40"
        : "bg-transparent py-4 border-none shadow-none"
        }`}
    >
      <div className={`mx-auto transition-all duration-500 relative ${scrolled ? "max-w-7xl px-4 sm:px-6 lg:px-8" : "max-w-full px-4 md:px-8"}`}>
        <div className="flex items-center justify-between">

          {/* Left Block (Logo Card) */}
          <div className="flex items-center bg-transparent border-none p-0 shadow-none transition-all duration-500">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}>
              <Logo height="36" inverseText={pathname === "/" && !scrolled} />
            </div>
          </div>

          {/* Right Block (Desktop Menu & Mobile Toggle Card) */}
          <div className={`flex items-center gap-4 transition-all duration-500 ${scrolled
            ? "bg-transparent border-none p-0 shadow-none"
            : "bg-brand-slate-950 border border-[#ce9456]/20 px-4 py-2 rounded-xl shadow-lg"
            }`}>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
              {/* Products Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("products")}
                  className={`flex items-center gap-0.5 text-xs xl:text-[13px] font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/products") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  Products <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Projects */}
              <button
                onClick={() => handleLinkClick("/projects")}
                className={`text-xs xl:text-[13px] font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/projects") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Projects
              </button>

              {/* Sustainability Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("sustainability")}
                  className={`flex items-center gap-0.5 text-xs xl:text-[13px] font-semibold transition-colors py-2 cursor-pointer ${pathname.includes("sustainability") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  Sustainability <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "sustainability" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Resources Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("resources")}
                  className={`flex items-center gap-0.5 text-xs xl:text-[13px] font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/resources") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* About Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("about")}
                  className={`flex items-center gap-0.5 text-xs xl:text-[13px] font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/about") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  About <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Where to Buy */}
              <button
                onClick={() => handleLinkClick("/where-to-buy")}
                className={`text-xs xl:text-[13px] font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/where-to-buy") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Where to Buy
              </button>

              {/* Media Coverage */}
              <button
                onClick={() => handleLinkClick("/resources?type=media")}
                className="text-xs xl:text-[13px] font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
              >
                Media Coverage
              </button>

              {/* In the News */}
              <button
                onClick={() => handleLinkClick("/resources?type=news")}
                className="text-xs xl:text-[13px] font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
              >
                In the News
              </button>

              {/* Enquire CTA Button */}
              <button
                onClick={() => handleLinkClick("/contact")}
                className="bg-brand-gold hover:bg-brand-gold-500 text-brand-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins flex items-center gap-1 cursor-pointer shadow-md shrink-0"
              >
                Enquire
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-brand-slate-200 hover:text-brand-terracotta-500 hover:bg-brand-slate-900 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Dropdown panels rendered absolute relative to the outer container */}
          <AnimatePresence>
            {activeDropdown === "products" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute max-w-6xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-0 overflow-hidden grid z-50 text-left"
                style={{ gridTemplateColumns: "3fr 2.5fr 3fr 3.5fr" }}
              >
                {/* Column 1: By Category */}
                <div className="py-7 pl-7 pr-3 flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-terracotta-500 mb-5 block font-poppins border-b border-brand-slate-800/40 pb-1.5">
                    By Category
                  </span>
                  <div className="flex flex-col gap-1 pr-1">
                    {productMenu.categories.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-brand-slate-900/50 transition-colors group"
                      >
                        <div className="text-brand-sand/60 group-hover:text-brand-terracotta-500 transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-medium text-brand-offwhite group-hover:text-brand-terracotta-500 transition-colors block font-poppins">
                            {item.name}
                          </span>
                          {item.isNew && (
                            <span className="bg-brand-terracotta-600 text-white text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-poppins shrink-0">
                              NEW
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Downloads */}
                <div className="py-7 px-5 border-l border-brand-slate-900 flex flex-col gap-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-terracotta-500 mb-1 block font-poppins border-b border-brand-slate-800/40 pb-1.5">
                    Downloads
                  </span>
                  <div className="flex flex-col gap-3">
                    {productMenu.downloads.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3.5 py-3 px-3 rounded-xl hover:bg-brand-slate-900/50 transition-all border border-transparent hover:border-brand-gold/10 group"
                      >
                        <div className="p-2.5 bg-brand-black border border-brand-slate-800 rounded-xl group-hover:border-brand-gold/30 group-hover:bg-brand-slate-950 transition-all text-brand-gold shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-offwhite group-hover:text-brand-gold transition-colors block font-poppins uppercase tracking-wider">
                            {item.name}
                          </span>
                          <span className="text-[9px] text-brand-sand/50 leading-relaxed block mt-0.5 font-poppins">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: By Application */}
                <div className="py-7 px-5 border-l border-brand-slate-900 flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-terracotta-500 mb-5 block font-poppins border-b border-brand-slate-800/40 pb-1.5">
                    By Application
                  </span>
                  <div className="flex flex-col gap-1">
                    {productMenu.applications.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-brand-slate-900/50 transition-colors group"
                      >
                        <div className="text-brand-sand/60 group-hover:text-brand-terracotta-500 transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[12px] font-medium text-brand-offwhite group-hover:text-brand-terracotta-500 transition-colors font-poppins">
                            {item.name}
                            {item.highlightSuffix && (
                              <span className="text-brand-terracotta-500 font-semibold">{item.highlightSuffix}</span>
                            )}
                          </span>
                          {item.isComingSoon && (
                            <span className="border border-brand-slate-850 text-brand-sand/40 text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-poppins shrink-0">
                              COMING SOON
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 4: Premium Clay Solutions Callout */}
                <div className="relative flex flex-col justify-between p-7 overflow-hidden border-l border-brand-slate-900">
                  {/* Background Image */}
                  <img
                    src="/images/hero-3.jpg"
                    alt="Premium clay building design"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />
                  {/* Dark Vignette Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-950 via-brand-slate-950/95 to-brand-slate-950/20 z-10" />

                  {/* Content */}
                  <div className="relative z-20 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-2.5">
                      <span className="text-[9px] tracking-[0.25em] font-bold text-brand-terracotta-500 uppercase block font-poppins">
                        PREMIUM CLAY SOLUTIONS
                      </span>
                      <h4 className="text-xl font-normal font-cormorant text-brand-offwhite leading-tight">
                        Timeless Materials for Modern Architecture
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed max-w-[200px]">
                        Sustainable clay building materials crafted for beauty, durability and a better tomorrow.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center justify-center gap-1.5 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins w-fit shadow-lg"
                    >
                      View All Products
                      <ArrowRight className="w-3.5 h-3.5 text-brand-offwhite" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeDropdown === "sustainability" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute max-w-6xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-0 overflow-hidden grid grid-cols-12 z-50 text-left"
              >
                {/* Left Columns list */}
                <div className="col-span-8 py-7 px-7 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {sustainabilityItems.map((item, idx) => {
                      const icons = [
                        <Leaf key="epd" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Award key="cert" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Shield key="commit" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Factory key="process" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Building2 key="building" className="w-5 h-5 text-brand-terracotta-500" />,
                      ];
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex gap-3 p-3 rounded-lg hover:bg-brand-slate-900/50 transition-colors group"
                        >
                          <div className="p-2.5 bg-brand-black border border-brand-gold/10 rounded-lg group-hover:border-brand-gold/45 transition-colors shrink-0 flex items-center justify-center h-fit">
                            {icons[idx % icons.length]}
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-semibold text-brand-offwhite group-hover:text-brand-terracotta-500 transition-colors font-poppins">
                              {item.name}
                            </h5>
                            <p className="text-[9px] font-poppins text-brand-sand/65 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column Callout */}
                <div className="col-span-4 relative flex flex-col justify-between p-7 overflow-hidden border-l border-brand-slate-900">
                  {/* Background Image */}
                  <img
                    src="/images/hero-4.jpg"
                    alt="Eco-friendly clay production"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />
                  {/* Dark Vignette Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-950 via-brand-slate-950/95 to-brand-slate-950/20 z-10" />

                  {/* Content */}
                  <div className="relative z-20 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-2.5">
                      <span className="text-[9px] tracking-[0.25em] font-bold text-brand-terracotta-500 uppercase block font-poppins">
                        ECO-CERTIFICATION
                      </span>
                      <h4 className="text-xl font-normal font-cormorant text-brand-offwhite leading-tight">
                        Circular Earthen Craft
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed max-w-[200px]">
                        PCP products carry third-party audited Environmental Product Declarations (EPD) and contribute to GRIHA green building stars.
                      </p>
                    </div>
                    <Link
                      href="/#sustainability"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center justify-center gap-1.5 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins w-fit shadow-lg"
                    >
                      EPD Details
                      <ArrowRight className="w-3.5 h-3.5 text-brand-offwhite" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeDropdown === "resources" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute max-w-6xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-0 overflow-hidden grid grid-cols-12 z-50 text-left"
              >
                {/* Left Columns list */}
                <div className="col-span-8 py-7 px-7 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {resourcesItems.map((item, idx) => {
                      const icons = [
                        <HardHat key="guides" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Compass key="help" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Calculator key="calcs" className="w-5 h-5 text-brand-terracotta-500" />,
                        <BookOpen key="blog" className="w-5 h-5 text-brand-terracotta-500" />,
                      ];
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex gap-3 p-3 rounded-lg hover:bg-brand-slate-900/50 transition-colors group"
                        >
                          <div className="p-2.5 bg-brand-black border border-brand-gold/10 rounded-lg group-hover:border-brand-gold/45 transition-colors shrink-0 flex items-center justify-center h-fit">
                            {icons[idx % icons.length]}
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-semibold text-brand-offwhite group-hover:text-brand-terracotta-500 transition-colors font-poppins">
                              {item.name}
                            </h5>
                            <p className="text-[9px] font-poppins text-brand-sand/65 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column Callout */}
                <div className="col-span-4 relative flex flex-col justify-between p-7 overflow-hidden border-l border-brand-slate-900">
                  {/* Background Image */}
                  <img
                    src="/images/hero-1.jpg"
                    alt="CAD blueprints"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />
                  {/* Dark Vignette Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-950 via-brand-slate-950/95 to-brand-slate-950/20 z-10" />

                  {/* Content */}
                  <div className="relative z-20 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-2.5">
                      <span className="text-[9px] tracking-[0.25em] font-bold text-brand-terracotta-500 uppercase block font-poppins">
                        TECHNICAL CENTER
                      </span>
                      <h4 className="text-xl font-normal font-cormorant text-brand-offwhite leading-tight">
                        Blueprints & Estimation
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed max-w-[200px]">
                        Access detailed CAD drawings, installation guides, Revit profiles, and design estimators for masonry.
                      </p>
                    </div>
                    <Link
                      href="/resources"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center justify-center gap-1.5 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins w-fit shadow-lg"
                    >
                      Open Downloads
                      <ArrowRight className="w-3.5 h-3.5 text-brand-offwhite" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeDropdown === "about" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute max-w-6xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-0 overflow-hidden grid grid-cols-12 z-50 text-left"
              >
                {/* Left Columns list */}
                <div className="col-span-8 py-7 px-7 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {aboutItems.map((item, idx) => {
                      const icons = [
                        <Milestone key="story" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Users key="lead" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Factory key="facility" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Award key="cert" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Landmark key="media" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Globe key="export" className="w-5 h-5 text-brand-terracotta-500" />,
                        <Briefcase key="careers" className="w-5 h-5 text-brand-terracotta-500" />,
                      ];
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex gap-3 p-3 rounded-lg hover:bg-brand-slate-900/50 transition-colors group"
                        >
                          <div className="p-2.5 bg-brand-black border border-brand-gold/10 rounded-lg group-hover:border-brand-gold/45 transition-colors shrink-0 flex items-center justify-center h-fit">
                            {icons[idx % icons.length]}
                          </div>
                          <div className="space-y-1">
                            <h5 className="text-xs font-semibold text-brand-offwhite group-hover:text-brand-terracotta-500 transition-colors font-poppins">
                              {item.name}
                            </h5>
                            <p className="text-[9px] font-poppins text-brand-sand/65 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column Callout */}
                <div className="col-span-4 relative flex flex-col justify-between p-7 overflow-hidden border-l border-brand-slate-900">
                  {/* Background Image */}
                  <img
                    src="/images/hero-5.jpg"
                    alt="Historic Brick Kiln"
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                  />
                  {/* Dark Vignette Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-950 via-brand-slate-950/95 to-brand-slate-950/20 z-10" />

                  {/* Content */}
                  <div className="relative z-20 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-2.5">
                      <span className="text-[9px] tracking-[0.25em] font-bold text-brand-terracotta-500 uppercase block font-poppins">
                        OUR STORY
                      </span>
                      <h4 className="text-xl font-normal font-cormorant text-brand-offwhite leading-tight">
                        Earthen Heritage Since 1937
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed max-w-[200px]">
                        Blending traditional firing chemistry with European automation to build the next generations of civil structures.
                      </p>
                    </div>
                    <Link
                      href="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center justify-center gap-1.5 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins w-fit shadow-lg"
                    >
                      Read Story
                      <ArrowRight className="w-3.5 h-3.5 text-brand-offwhite" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand-slate-950 border-t border-brand-slate-800 px-6 py-6 flex flex-col gap-4 shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            {/* Navigation links */}
            <div className="flex flex-col gap-3">
              {/* Products */}
              <div className="border-b border-brand-slate-800/40 pb-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest px-3 block mb-1">Products</span>
                <button
                  onClick={() => handleLinkClick("/products")}
                  className="w-full text-left text-xs font-semibold py-1.5 px-3 rounded-lg text-brand-slate-200 hover:bg-brand-slate-900 transition-colors"
                >
                  All Products Catalog
                </button>
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <button onClick={() => handleLinkClick("/products?category=Clay Bricks")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Facing & Handmade Bricks</button>
                  <button onClick={() => handleLinkClick("/products?category=Terracotta")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Facades & Cladding</button>
                  <button onClick={() => handleLinkClick("/products?category=Pavers")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Flooring & Clay Pavers</button>
                  <button onClick={() => handleLinkClick("/products?category=Roofing Tiles")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Roofing Tiles</button>
                  <button onClick={() => handleLinkClick("/products?category=Hollow Blocks")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Hollow Blocks (Walling)</button>
                  <button onClick={() => handleLinkClick("/products?category=Terraplasts")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Terraplast Wall Finish</button>
                </div>
              </div>

              {/* Projects */}
              <button
                onClick={() => handleLinkClick("/projects")}
                className={`w-full text-left text-xs font-semibold py-2 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/projects") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                Architectural Projects
              </button>

              {/* Sustainability */}
              <div className="border-b border-brand-slate-800/40 pb-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest px-3 block mb-1">Sustainability</span>
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <button onClick={() => handleLinkClick("/#sustainability")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">EPD Certification</button>
                  <button onClick={() => handleLinkClick("/about#certifications")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Certifications & Standards</button>
                  <button onClick={() => handleLinkClick("/#sustainability")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Environmental Commitments</button>
                </div>
              </div>

              {/* Resources */}
              <div className="border-b border-brand-slate-800/40 pb-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest px-3 block mb-1">Resources</span>
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <button onClick={() => handleLinkClick("/resources")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Installation Guides & Help</button>
                  <button onClick={() => handleLinkClick("/calculators")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Calculators & Estimators</button>
                  <button onClick={() => handleLinkClick("/#blogs")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Blog & News</button>
                </div>
              </div>

              {/* About */}
              <div className="border-b border-brand-slate-800/40 pb-2">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest px-3 block mb-1">About</span>
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <button onClick={() => handleLinkClick("/about#why-pcp")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Our Story (Est. 1937)</button>
                  <button onClick={() => handleLinkClick("/about#leadership")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Leadership & Directors</button>
                  <button onClick={() => handleLinkClick("/about#process")} className="text-left text-[11px] text-brand-sand/70 py-1 hover:text-brand-gold transition-colors">Manufacturing Facility</button>
                </div>
              </div>

              {/* Where to Buy */}
              <button
                onClick={() => handleLinkClick("/where-to-buy")}
                className="w-full text-left text-xs font-semibold py-2 px-3 rounded-lg text-brand-slate-200 hover:bg-brand-slate-900 transition-colors"
              >
                Where to Buy
              </button>

              {/* Media Coverage */}
              <button
                onClick={() => handleLinkClick("/resources?type=media")}
                className="w-full text-left text-xs font-semibold py-2 px-3 rounded-lg text-brand-slate-200 hover:bg-brand-slate-900 transition-colors"
              >
                Media Coverage
              </button>

              {/* In the News */}
              <button
                onClick={() => handleLinkClick("/resources?type=news")}
                className="w-full text-left text-xs font-semibold py-2 px-3 rounded-lg text-brand-slate-200 hover:bg-brand-slate-900 transition-colors"
              >
                In the News
              </button>
            </div>

            <button
              onClick={() => handleLinkClick("/contact")}
              className="flex items-center justify-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white w-full py-3 rounded-xl font-bold transition-all text-center"
            >
              <PhoneCall className="w-4 h-4" />
              Enquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
