"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Building2, HardHat, FileText, Calculator, PhoneCall, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
      if (window.scrollY > 20) {
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
      { name: "Clay Bricks", href: "/products?category=Clay Bricks" },
      { name: "Terracotta Facades", href: "/products?category=Terracotta" },
      { name: "Roofing Tiles", href: "/products?category=Roofing Tiles" },
      { name: "Paving Stones", href: "/products?category=Pavers" },
      { name: "Hollow Blocks", href: "/products?category=Hollow Blocks" },
      { name: "AAC Blocks", href: "/products?category=AAC Blocks" },
    ],
    calculators: [
      { name: "Brick Quantity Calculator", href: "/calculators?id=brick-quantity" },
      { name: "House Material Estimator", href: "/calculators?id=house-estimator" },
      { name: "Wall Net Area Estimator", href: "/calculators?id=wall-net-area" },
      { name: "Roofing Tile Estimator", href: "/calculators?id=roofing-tile" },
      { name: "Paver Calculator", href: "/calculators?id=paver" },
    ],
    resources: [
      { name: "Technical Datasheets", href: "/resources?type=Technical Datasheet" },
      { name: "CAD Drawings (DWG/DXF)", href: "/resources?type=CAD Detail" },
      { name: "BIM & Revit Objects (RVT/IFC)", href: "/resources?type=BIM Revit Object" },
      { name: "Installation Manuals", href: "/resources?type=Installation Guide" },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 glass-panel shadow-lg bg-brand-slate-950/80"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              router.push("/");
            }
          }}>
            <Logo height="48" inverseText={darkMode} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("products")}
                onMouseEnter={() => setActiveDropdown("products")}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/products") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Products <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 mt-2 w-64 rounded-xl shadow-2xl glass-panel bg-brand-slate-950/95 border border-brand-slate-800 p-2 grid grid-cols-1 gap-1"
                  >
                    {menuItems.products.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setActiveDropdown(null);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-slate-300 hover:bg-brand-slate-900 hover:text-brand-terracotta-500 transition-all font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta-600"></span>
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects */}
            <button
              onClick={() => handleLinkClick("/projects")}
              className={`text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/projects") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
            >
              Projects
            </button>

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("calculators")}
                onMouseEnter={() => setActiveDropdown("calculators")}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/calculators") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Calculators <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "calculators" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "calculators" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 mt-2 w-64 rounded-xl shadow-2xl glass-panel bg-brand-slate-950/95 border border-brand-slate-800 p-2 grid grid-cols-1 gap-1"
                  >
                    {menuItems.calculators.map((item, idx) => (
                      <Link
                        key={idx}
                        href={getHref(item.href)}
                        onClick={() => {
                          setIsOpen(false);
                          setActiveDropdown(null);
                          if (pathname === "/" && item.href.startsWith("#")) {
                            handleLinkClick(item.href);
                          }
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-slate-300 hover:bg-brand-slate-900 hover:text-brand-terracotta-500 transition-all font-medium"
                      >
                        <Calculator className="w-4 h-4 text-brand-terracotta-500" />
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Recommender Quiz */}
            <button
              onClick={() => handleLinkClick("#recommender")}
              className="text-sm font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
            >
              Material Wizard
            </button>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("resources")}
                onMouseEnter={() => setActiveDropdown("resources")}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${pathname.startsWith("/resources") ? "text-brand-terracotta-500" : "text-brand-slate-200 hover:text-brand-terracotta-500"}`}
              >
                Resources <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 mt-2 w-68 rounded-xl shadow-2xl glass-panel bg-brand-slate-950/95 border border-brand-slate-800 p-2 grid grid-cols-1 gap-1"
                  >
                    {menuItems.resources.map((item, idx) => (
                      <Link
                        key={idx}
                        href={getHref(item.href)}
                        onClick={() => {
                          setIsOpen(false);
                          setActiveDropdown(null);
                          if (pathname === "/" && item.href.startsWith("#")) {
                            handleLinkClick(item.href);
                          }
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-slate-300 hover:bg-brand-slate-900 hover:text-brand-terracotta-500 transition-all font-medium"
                      >
                        <FileText className="w-4 h-4 text-brand-terracotta-500" />
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sustainability */}
            <button
              onClick={() => handleLinkClick("#sustainability")}
              className="text-sm font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
            >
              Sustainability
            </button>

            {/* Dealer Locator */}
            <button
              onClick={() => handleLinkClick("#dealers")}
              className="text-sm font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
            >
              Dealers
            </button>

            {/* Blog */}
            <button
              onClick={() => handleLinkClick("#blogs")}
              className="text-sm font-semibold text-brand-slate-200 hover:text-brand-terracotta-500 transition-colors py-2 cursor-pointer"
            >
              Knowledge Base
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-brand-slate-800 text-brand-slate-300 hover:text-brand-terracotta-500 hover:border-brand-slate-700 transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => handleLinkClick("#contact")}
              className="flex items-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-brand-terracotta-600/30 transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              Inquire Now
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-brand-slate-800 text-brand-slate-300 hover:text-brand-terracotta-500 transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-brand-slate-800 bg-brand-slate-900/50 text-white cursor-pointer hover:bg-brand-slate-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
                onClick={() => handleLinkClick("#dealers")}
                className="w-full text-left font-semibold text-brand-slate-200 py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors"
              >
                Dealer Network Locator
              </button>
              <button
                onClick={() => handleLinkClick("#blogs")}
                className="w-full text-left font-semibold text-brand-slate-200 py-2.5 px-3 rounded-lg hover:bg-brand-slate-900 transition-colors"
              >
                Blog & News
              </button>
            </div>

            <button
              onClick={() => handleLinkClick("#contact")}
              className="flex items-center justify-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white w-full py-3 rounded-xl font-bold transition-all text-center"
            >
              <PhoneCall className="w-4 h-4" />
              Inquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
