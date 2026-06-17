"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Building2, HardHat, FileText, Calculator, PhoneCall, Sun, Moon, ArrowRight, Compass, Layers, Hammer, LayoutGrid } from "lucide-react";
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

  const menuItems = {
    products: [
      { name: "Clay Bricks", href: "/products?category=Clay Bricks", desc: "Facing bricks fired at 1100°C for load-bearing facades." },
      { name: "Terracotta Facades", href: "/products?category=Terracotta", desc: "Ventilated natural terracotta cladding and custom sunscreens." },
      { name: "Roofing Tiles", href: "/products?category=Roofing Tiles", desc: "Interlocking clay sloped roof tiles and finishing ridges." },
      { name: "Paving Stones", href: "/products?category=Pavers", desc: "Heavy-duty outdoor paving bricks for paths and roadways." },
      { name: "Hollow Blocks", href: "/products?category=Hollow Blocks", desc: "Insulating structural clay blocks for lightweight facades." },
      { name: "AAC Blocks", href: "/products?category=AAC Blocks", desc: "Lightweight cellular thermal insulating autoclaved blocks." },
    ],
    calculators: [
      { name: "Brick Quantity Calculator", href: "/calculators?id=brick-quantity", desc: "Calculate brick counts and mortar buffers." },
      { name: "House Material Estimator", href: "/calculators?id=house-estimator", desc: "Estimate cement, sand, and aggregates." },
      { name: "Wall Net Area Estimator", href: "/calculators?id=wall-net-area", desc: "Subtract window and door voids easily." },
      { name: "Roofing Tile Estimator", href: "/calculators?id=roofing-tile", desc: "Roman tile count with slope angles." },
      { name: "Paver Calculator", href: "/calculators?id=paver", desc: "Calculate rectangular and hexagonal paver patterns." },
    ],
    resources: [
      { name: "Technical Datasheets", href: "/resources?type=Technical Datasheet", desc: "Compressive strengths, densities, and water absorption ratios." },
      { name: "CAD Drawings (DWG/DXF)", href: "/resources?type=CAD Detail", desc: "Standard CAD details for draftsmen." },
      { name: "BIM & Revit Objects (RVT/IFC)", href: "/resources?type=BIM Revit Object", desc: "BIM models for architectural integration." },
      { name: "Installation Manuals", href: "/resources?type=Installation Guide", desc: "On-site installation manuals and guides." },
    ],
  };

  return (
    <header
      onMouseLeave={() => setActiveDropdown(null)}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-brand-slate-950 py-3 shadow-md border-b border-brand-slate-800/40" 
          : "bg-transparent py-4 border-none shadow-none"
      }`}
    >
      <div className={`mx-auto transition-all duration-500 relative ${scrolled ? "max-w-7xl px-4 sm:px-6 lg:px-8" : "max-w-full px-4 md:px-8"}`}>
        <div className="flex items-center justify-between">
          
          {/* Left Block (Logo & Project Icon Card) */}
          <div className={`flex items-center gap-4 transition-all duration-500 ${
            scrolled 
              ? "bg-transparent border-none p-0 shadow-none" 
              : "bg-brand-slate-950 border border-brand-slate-800/40 px-5 py-2.5 rounded-xl shadow-lg"
          }`}>
            {/* Project Grid Icon */}
            <button 
              onClick={() => handleLinkClick("/projects")}
              className="p-1.5 rounded-lg text-brand-gold hover:text-brand-terracotta-500 hover:bg-brand-slate-900 transition-all duration-300 flex items-center justify-center cursor-pointer"
              title="View Projects Portfolio"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            
            <div className="h-5 w-[1px] bg-brand-slate-800" />
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                router.push("/");
              }
            }}>
              <Logo height="36" inverseText={true} />
            </div>
          </div>

          {/* Right Block (Desktop Menu & Mobile Toggle Card) */}
          <div className={`flex items-center gap-6 transition-all duration-500 ${
            scrolled 
              ? "bg-transparent border-none p-0 shadow-none" 
              : "bg-brand-slate-950 border border-[#ce9456]/20 px-6 py-2 rounded-xl shadow-lg"
          }`}>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {/* Products Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("products")}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/products") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  Products <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Projects */}
              <button
                onClick={() => handleLinkClick("/projects")}
                className={`text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/projects") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Projects
              </button>

              {/* Calculators Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("calculators")}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/calculators") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  Calculators <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "calculators" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Recommender Quiz */}
              <button
                onClick={() => handleLinkClick("#recommender")}
                className="text-sm font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
              >
                Material Wizard
              </button>

              {/* Resources Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("resources")}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/resources") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
                >
                  Resources <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* About */}
              <button
                onClick={() => handleLinkClick("/about")}
                className={`text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/about") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                About
              </button>

              {/* Contact */}
              <button
                onClick={() => handleLinkClick("/contact")}
                className={`text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/contact") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Contact
              </button>

              {/* Enquire Now Button */}
              <button
                onClick={() => handleLinkClick("/contact")}
                className="bg-brand-gold hover:bg-brand-gold-500 text-brand-black px-4.5 py-2  text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Enquire Now
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
                className="absolute max-w-5xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-6 grid grid-cols-12 gap-8 z-50 text-left"
              >
                {/* Left Column Callout */}
                <div className="col-span-4 bg-brand-black border border-brand-gold/15 flex flex-col justify-between relative overflow-hidden group rounded-xl">
                  <div className="h-32 relative w-full overflow-hidden shrink-0 border-b border-brand-gold/10">
                    <img src="/images/hero-3.jpg" alt="Fired clay tile facade detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <span className="text-[8px] tracking-[0.3em] font-bold text-brand-gold uppercase block font-poppins">
                        FEATURED SELECTION
                      </span>
                      <h4 className="text-base font-semibold font-cormorant text-brand-offwhite leading-tight">
                        Natural Terracotta Envelopes
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed">
                        Eco-certified, thermal-insulating facades designed for high-load metropolitan layouts.
                      </p>
                    </div>
                    <Link 
                      href="/products?category=Terracotta"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-brand-gold font-bold font-poppins w-fit"
                    >
                      Explore Range
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>
                  </div>
                </div>

                {/* Right Columns list */}
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {menuItems.products.map((item, idx) => {
                    const icons = [
                      <FacadeIcon key="bricks" className="w-5 h-5 text-brand-terracotta-500" />,
                      <FacadeIcon key="facades" className="w-5 h-5 text-brand-terracotta-500" />,
                      <RoofingIcon key="tiles" className="w-5 h-5 text-brand-terracotta-500" />,
                      <PaversIcon key="pavers" className="w-5 h-5 text-brand-terracotta-500" />,
                      <HollowBlockIcon key="hollow" className="w-5 h-5 text-brand-terracotta-500" />,
                      <AACBlockIcon key="aac" className="w-5 h-5 text-brand-terracotta-500" />,
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
              </motion.div>
            )}

            {activeDropdown === "calculators" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute max-w-5xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-6 grid grid-cols-12 gap-8 z-50 text-left"
              >
                {/* Left Column Callout */}
                <div className="col-span-4 bg-brand-black border border-brand-gold/15 flex flex-col justify-between relative overflow-hidden group rounded-xl">
                  <div className="h-32 relative w-full overflow-hidden shrink-0 border-b border-brand-gold/10">
                    <img src="/images/hero-2.jpg" alt="PCP Automated Factory" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <span className="text-[8px] tracking-[0.3em] font-bold text-brand-gold uppercase block font-poppins">
                        ESTIMATOR TOOLS
                      </span>
                      <h4 className="text-base font-semibold font-cormorant text-brand-offwhite leading-tight">
                        Engineering Estimators Desk
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed">
                        Estimate material volumes, Roman interlocking patterns, and net masonry boundaries in real-time.
                      </p>
                    </div>
                    <Link 
                      href="/calculators"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-brand-gold font-bold font-poppins w-fit"
                    >
                      Go to Estimators
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>
                  </div>
                </div>

                {/* Right Columns list */}
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {menuItems.calculators.map((item, idx) => {
                    const icons = [
                      <FacadeIcon key="bricks" className="w-5 h-5 text-brand-terracotta-500" />,
                      <ConsumerIcon key="house" className="w-5 h-5 text-brand-terracotta-500" />,
                      <ExpertiseIcon key="wall" className="w-5 h-5 text-brand-terracotta-500" />,
                      <RoofingIcon key="roof" className="w-5 h-5 text-brand-terracotta-500" />,
                      <PaversIcon key="paver" className="w-5 h-5 text-brand-terracotta-500" />,
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
              </motion.div>
            )}

            {activeDropdown === "resources" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute max-w-5xl mx-auto left-4 right-4 top-full mt-2 rounded-2xl shadow-2xl bg-brand-slate-950 border border-brand-slate-800/40 p-6 grid grid-cols-12 gap-8 z-50 text-left"
              >
                {/* Left Column Callout */}
                <div className="col-span-4 bg-brand-black border border-brand-gold/15 flex flex-col justify-between relative overflow-hidden group rounded-xl">
                  <div className="h-32 relative w-full overflow-hidden shrink-0 border-b border-brand-gold/10">
                    <img src="/images/hero-1.jpg" alt="Architectural BIM blueprints" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <span className="text-[8px] tracking-[0.3em] font-bold text-brand-gold uppercase block font-poppins">
                        TECHNICAL DIRECTORY
                      </span>
                      <h4 className="text-base font-semibold font-cormorant text-brand-offwhite leading-tight">
                        Architect CAD & BIM Center
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/70 leading-relaxed">
                        Download technical sheets, detailed DWG drawings, Revit RVT profiles, and installation manuals.
                      </p>
                    </div>
                    <Link 
                      href="/resources"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-brand-gold font-bold font-poppins w-fit"
                    >
                      Go to Resources
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>
                  </div>
                </div>

                {/* Right Columns list */}
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {menuItems.resources.map((item, idx) => {
                    const icons = [
                      <ExpertiseIcon key="datasheet" className="w-5 h-5 text-brand-terracotta-500" />,
                      <ProfessionalIcon key="cad" className="w-5 h-5 text-brand-terracotta-500" />,
                      <ProfessionalIcon key="bim" className="w-5 h-5 text-brand-terracotta-500" />,
                      <ProfessionalIcon key="manual" className="w-5 h-5 text-brand-terracotta-500" />,
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-brand-slate-950 border-t border-brand-slate-800 px-4 py-6 flex flex-col gap-4 shadow-2xl"
          >
            {/* Navigation links */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleLinkClick("/products")}
                className={`w-full text-left font-semibold py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/products") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                Products Catalog
              </button>
              <button
                onClick={() => handleLinkClick("/projects")}
                className={`w-full text-left font-semibold py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/projects") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                Architectural Projects
              </button>
              <button
                onClick={() => handleLinkClick("/calculators")}
                className={`w-full text-left font-semibold py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/calculators") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                Material Calculators
              </button>
              <button
                onClick={() => handleLinkClick("#recommender")}
                className="w-full text-left font-semibold text-brand-slate-200 py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors"
              >
                Material Recommendation Quiz
              </button>
              <button
                onClick={() => handleLinkClick("/resources")}
                className={`w-full text-left font-semibold py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/resources") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                BIM / CAD Resource Center
              </button>
              <button
                onClick={() => handleLinkClick("#sustainability")}
                className="w-full text-left font-semibold text-brand-slate-200 py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors"
              >
                Sustainability Programs
              </button>
              <button
                onClick={() => handleLinkClick("/about")}
                className={`w-full text-left font-semibold py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/about") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                About PCP India
              </button>
              <button
                onClick={() => handleLinkClick("/contact")}
                className={`w-full text-left font-semibold py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors ${pathname.startsWith("/contact") ? "text-brand-terracotta-500 bg-brand-slate-900/50 font-bold" : "text-brand-slate-200"}`}
              >
                Contact & Dealer Enquiry
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
};
