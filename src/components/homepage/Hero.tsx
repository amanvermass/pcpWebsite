"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const slides = [
  {
    image: "/images/hero-1.jpg",
    alt: "Brick Architecture Facade detail",
  },
  {
    image: "/images/hero-2.jpg",
    alt: "Luxury Villa Pathway paving",
  },
  {
    image: "/images/hero-3.jpg",
    alt: "Commercial Building facade",
  },
  {
    image: "/images/hero-4.jpg",
    alt: "PCP Kiln Factory manufacturing excellence",
  },
  {
    image: "/images/hero-5.jpg",
    alt: "PCP Premium Bricks & Pavers Showcase",
  },
];

interface HeroProps {
  darkMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ darkMode = true }) => {
  const [glowOpacity, setGlowOpacity] = useState(0);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      // Enable hover spotlight tracking within the vertical and horizontal viewport area of the hero section
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        setGlowOpacity(1);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        hero.style.setProperty("--mouse-x", `${x}px`);
        hero.style.setProperty("--mouse-y", `${y}px`);
      } else {
        setGlowOpacity(0);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  const handleScrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll linked animations for the background slideshow container
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const borderRadius = useTransform(scrollY, [0, 600], [0, 24]);
  const contentY = useTransform(scrollY, [0, 600], [0, 80]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);

  // Entrance animations timed to trigger after the 2.5s page loader
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.6,
      },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo
      },
    },
  };

  const headingContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 2.7,
      }
    }
  };

  const wordVariants = {
    hidden: { y: "150%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const headingWords = "Building Tomorrow's Infrastructure".split(" ");

  return (
    <section
      id="hero-section"
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#faf6f2] select-none"
    >

      {/* Mouse Follow Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-12 transition-opacity duration-700 ease-out"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.45) 0%, rgba(244, 237, 224, 0.25) 50%, transparent 100%)",
        }}
      />

      {/* Premium Cream Background Container */}
      <motion.div
        style={{ scale, borderRadius }}
        className="absolute inset-0 z-0 overflow-hidden origin-center bg-[#faf6f2]"
      >
        {/* Subtle grid watermark */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ce9456_1px,transparent_1px),linear-gradient(to_bottom,#ce9456_1px,transparent_1px)] bg-[size:30px_30px]" />

        {/* Soft radial backdrop gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(206,148,86,0.04),transparent)]" />
      </motion.div>

      {/* Base faint sketch layer (Full screen cover, direct child of section for exact coordinate alignment) */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-5">
        <BlueprintSketch glowing={false} />
      </div>

      {/* Glowing colorful sketch overlay (Full screen cover, direct child of section for exact coordinate alignment) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ease-out"
        style={{
          clipPath: `circle(160px at var(--mouse-x, 50%) var(--mouse-y, 50%))`,
          opacity: glowOpacity,
        }}
      >
        <div className="absolute inset-0">
          <BlueprintSketch glowing={true} />
        </div>
      </div>

      {/* Main Asymmetric Hero Contents (Positioned at z-20 to always display on top of the background spotlight) */}
      <div className="bg-transparent relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex-grow flex items-center justify-between gap-12 text-left pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: contentY }}
          className="max-w-xl lg:max-w-2xl flex flex-col items-start z-30"
        >
          {/* Top Tagline with decorative line prefix */}
          <motion.div
            variants={blockVariants}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-brand-gold shrink-0" />
            <span className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-brand-gold font-semibold font-poppins">
              PRAYAG CLAY PRODUCTS
            </span>
          </motion.div>

          {/* Intrio-style Massive Serif Heading (Staggered Word Reveal) */}
          <motion.h1
            variants={headingContainerVariants}
            className="text-brand-slate-100 text-left leading-none tracking-tight mb-8 flex flex-wrap justify-start"
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5.8vw, 5.8rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em"
            }}
          >
            {headingWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.25em] pt-3 pb-5 -mt-3 -mb-5">
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subheading Description */}
          <motion.p
            variants={blockVariants}
            className="text-xs sm:text-sm md:text-base font-poppins text-brand-slate-200/90 max-w-xl leading-relaxed mb-12"
          >
            Engineering premium structural envelopes with EPD-certified fired clay bricks, terracotta facades, and high-performance walling systems since 1937.
          </motion.p>

          {/* Staggered CTA Buttons */}
          <motion.div
            variants={blockVariants}
            className="flex flex-wrap items-center justify-start gap-6"
          >
            <button
              onClick={() => handleScrollTo("#products-range")}
              className="bg-brand-gold hover:bg-brand-sand text-brand-black font-semibold tracking-[0.2em] font-poppins uppercase text-xs px-8 py-4 border border-brand-gold transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-brand-gold/20"
            >
              Explore Products
            </button>

            <button
              onClick={() => handleScrollTo("#sustainability-strip")}
              className="bg-transparent hover:bg-brand-gold/5 text-brand-slate-100 hover:text-brand-gold tracking-[0.2em] font-poppins uppercase text-xs px-8 py-4 border border-brand-slate-200/40 hover:border-brand-gold transition-all duration-300 cursor-pointer"
            >
              EPD Certified
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical Scroll Text (Bottom Left) */}
      <div
        className="absolute bottom-16 left-10 lg:left-20 z-25 flex flex-col items-center gap-4 cursor-pointer text-brand-slate-200/60 hover:text-brand-gold transition-colors"
        onClick={() => handleScrollTo("#intro")}
      >
        <span
          className="text-[9px] font-semibold tracking-[0.3em] uppercase block"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-12 bg-brand-offwhite/15 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-full h-1/2 bg-brand-gold"
          />
        </div>
      </div>

    </section>
  );
};

const lineVariants: any = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.8, ease: "easeInOut" },
      opacity: { delay, duration: 0.1 }
    }
  })
};

const BlueprintSketch: React.FC<{ glowing?: boolean }> = ({ glowing = false }) => {
  const strokeColor = glowing ? "rgba(42, 37, 34, 0.95)" : "rgba(66, 59, 55, 0.42)";
  const strokeWidth = glowing ? 1.5 : 1.0;

  // Horizontal rustication joint lines (Ground Floor)
  const rusticationY = [350, 370, 390, 410, 430, 450, 470, 490];

  // Alternating vertical masonry block joints (shifted right by 150px)
  const masonryVerticalJoints = [
    { y1: 330, y2: 350, xs: [240, 320, 400, 480, 560, 960, 1040, 1120, 1200, 1280] },
    { y1: 350, y2: 370, xs: [280, 360, 440, 520, 1000, 1080, 1160, 1240] },
    { y1: 370, y2: 390, xs: [240, 320, 400, 480, 560, 960, 1040, 1120, 1200, 1280] },
    { y1: 390, y2: 410, xs: [280, 360, 440, 520, 1000, 1080, 1160, 1240] },
    { y1: 410, y2: 430, xs: [240, 320, 400, 480, 560, 960, 1040, 1120, 1200, 1280] },
    { y1: 430, y2: 450, xs: [280, 360, 440, 520, 1000, 1080, 1160, 1240] },
    { y1: 450, y2: 470, xs: [240, 320, 400, 480, 560, 960, 1040, 1120, 1200, 1280] },
    { y1: 470, y2: 490, xs: [280, 360, 440, 520, 1000, 1080, 1160, 1240] },
    { y1: 490, y2: 500, xs: [240, 320, 400, 480, 560, 960, 1040, 1120, 1200, 1280] },
  ];

  // 4 Giant Columns Coordinates (shifted right by 150px)
  const columns = [
    { x: 625, w: 20 },
    { x: 685, w: 20 },
    { x: 795, w: 20 },
    { x: 855, w: 20 }
  ];

  // Ground floor windows (x-coordinates) (shifted right by 150px)
  const groundWindows = [325, 475, 1025, 1175];

  // First floor windows (x-coordinates) (shifted right by 150px)
  const upperWindows = [325, 475, 1025, 1175];

  // Roof Balusters list (shifted right by 150px)
  const leftBalusters = Array.from({ length: 25 }, (_, i) => 215 + i * 15);
  const rightBalusters = Array.from({ length: 25 }, (_, i) => 935 + i * 15);

  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      viewBox="0 0 1200 545"
      preserveAspectRatio="xMaxYMax slice"
      className="w-full h-full"
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    >
      <defs>
        {/* Wall stone shading gradient */}
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf5e8" />
          <stop offset="100%" stopColor="#ebdcb9" />
        </linearGradient>

        {/* Roof terracotta tile gradient */}
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d5734c" />
          <stop offset="100%" stopColor="#9e4321" />
        </linearGradient>

        {/* Glass base reflection */}
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2029" />
          <stop offset="100%" stopColor="#0a0c10" />
        </linearGradient>

        {/* Column 3D rounded gradient */}
        <linearGradient id="columnGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dbd2bd" />
          <stop offset="50%" stopColor="#faf6ec" />
          <stop offset="100%" stopColor="#dbd2bd" />
        </linearGradient>

        {/* Granite steps/plinth gradient */}
        <linearGradient id="plinthGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ded6c5" />
          <stop offset="100%" stopColor="#bcaea0" />
        </linearGradient>

        {/* Window interior glow radial gradient */}
        <radialGradient id="glowRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4a8" />
          <stop offset="60%" stopColor="#f3a430" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a2029" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wall fills (Background colors under drawing inside cursor) */}
      {glowing && (
        <g stroke="none">
          {/* Ground Floor Walls */}
          <rect x={200} y={330} width={1100} height={170} fill="url(#wallGrad)" />
          {/* First Floor Walls */}
          <rect x={200} y={160} width={1100} height={150} fill="url(#wallGrad)" />

          {/* Portico Wall back projection (subtle contrast) */}
          <rect x={600} y={160} width={300} height={340} fill="#fcf9f2" opacity="0.6" />

          {/* Roof Fills */}
          <polygon points="200,160 600,160 560,80 240,80" fill="url(#roofGrad)" />
          <polygon points="900,160 1300,160 1260,80 940,80" fill="url(#roofGrad)" />
          <polygon points="580,160 750,50 920,160" fill="url(#roofGrad)" />

          {/* Plinth Base Fill */}
          <rect x={190} y={500} width={1120} height={15} fill="url(#plinthGrad)" />

          {/* Stairs Fills */}
          <rect x={600} y={535} width={300} height={10} fill="url(#plinthGrad)" />
          <rect x={610} y={525} width={280} height={10} fill="url(#plinthGrad)" />
          <rect x={620} y={515} width={260} height={10} fill="url(#plinthGrad)" />
          <rect x={630} y={505} width={240} height={10} fill="url(#plinthGrad)" />
          <rect x={595} y={505} width={15} height={40} fill="url(#plinthGrad)" />
          <rect x={890} y={505} width={15} height={40} fill="url(#plinthGrad)" />

          {/* Balustrade rail fill (y=140 to 160) */}
          <rect x={200} y={145} width={380} height={15} fill="#f7f3eb" />
          <rect x={920} y={145} width={380} height={15} fill="#f7f3eb" />

          {/* Column Fills */}
          {columns.map((c, i) => (
            <rect key={`col-fill-${i}`} x={c.x} y={172} width={c.w} height={313} fill="url(#columnGrad)" />
          ))}
          {/* Column Bases & Capitals */}
          {columns.map((c, i) => (
            <g key={`col-details-${i}`}>
              <rect x={c.x - 3} y={485} width={c.w + 6} height={15} fill="#dbd2be" />
              <rect x={c.x - 2} y={160} width={c.w + 4} height={12} fill="#dfd6c2" />
            </g>
          ))}

          {/* Center balconette fill */}
          <rect x={700} y={310} width={100} height={10} fill="#f7f3eb" />

          {/* Window Glass Fills */}
          {groundWindows.map((x) => (
            <path key={`g-win-fill-${x}`} d={`M ${x - 30},500 L ${x - 30},440 A 30,30 0 0,1 ${x + 30},440 L ${x + 30},500 Z`} fill="url(#glassGrad)" />
          ))}
          <path d="M 710,500 L 710,430 A 40,40 0 0,1 790,430 L 790,500 Z" fill="url(#glassGrad)" />

          {upperWindows.map((x) => (
            <rect key={`u-win-fill-${x}`} x={x - 25} y={220} width={50} height={90} fill="url(#glassGrad)" />
          ))}
          <rect x={720} y={200} width={60} height={110} fill="url(#glassGrad)" />

          {/* Window interior lighting glows */}
          {groundWindows.map((x) => (
            <circle key={`g-win-glow-${x}`} cx={x} cy={455} r={32} fill="url(#glowRadial)" opacity="0.85" />
          ))}
          <circle cx={750} cy={440} r={40} fill="url(#glowRadial)" opacity="0.85" />
          {upperWindows.map((x) => (
            <circle key={`u-win-glow-${x}`} cx={x} cy={265} r={30} fill="url(#glowRadial)" opacity="0.85" />
          ))}
          <circle cx={750} cy={255} r={35} fill="url(#glowRadial)" opacity="0.85" />
        </g>
      )}

      {/* Main Structural Facade Outline */}
      <g>
        {/* Wall outer frames */}
        <motion.path d="M 200,500 L 200,160 L 1300,160 L 1300,500 Z" variants={lineVariants} custom={2.7} />
        {/* Plinth block */}
        <motion.path d="M 190,500 L 1310,500 L 1310,515 L 190,515 Z" variants={lineVariants} custom={2.8} />

        {/* Floor Divider Entablature details */}
        <motion.line x1={200} y1={310} x2={1300} y2={310} variants={lineVariants} custom={2.9} />
        <motion.line x1={200} y1={316} x2={1300} y2={316} variants={lineVariants} custom={2.9} />
        <motion.line x1={200} y1={324} x2={1300} y2={324} variants={lineVariants} custom={3.0} />
        <motion.line x1={200} y1={330} x2={1300} y2={330} variants={lineVariants} custom={3.0} />
      </g>

      {/* Rusticated stonework joints (Ground Floor) */}
      <g opacity="0.7">
        {/* Horizontal joints */}
        {rusticationY.map((y, idx) => (
          <g key={`rust-horiz-${idx}`}>
            <motion.line x1={200} y1={y} x2={600} y2={y} variants={lineVariants} custom={3.1 + idx * 0.04} />
            <motion.line x1={900} y1={y} x2={1300} y2={y} variants={lineVariants} custom={3.1 + idx * 0.04} />
          </g>
        ))}
        {/* Vertical joints */}
        {masonryVerticalJoints.map((row, rowIdx) => (
          <g key={`rust-vert-row-${rowIdx}`}>
            {row.xs.map((x, xIdx) => (
              <motion.line
                key={`rust-vert-${rowIdx}-${xIdx}`}
                x1={x}
                y1={row.y1}
                x2={x}
                y2={row.y2}
                variants={lineVariants}
                custom={3.3 + rowIdx * 0.05 + xIdx * 0.01}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Stairs and handrails */}
      <g>
        {/* Step outlines */}
        <motion.path d="M 600,535 L 900,535 L 900,545 L 600,545 Z" variants={lineVariants} custom={3.0} />
        <motion.path d="M 610,525 L 890,525 L 890,535 L 610,535 Z" variants={lineVariants} custom={3.1} />
        <motion.path d="M 620,515 L 880,515 L 880,525 L 620,525 Z" variants={lineVariants} custom={3.2} />
        <motion.path d="M 630,505 L 870,505 L 870,515 L 630,515 Z" variants={lineVariants} custom={3.3} />
        {/* Side handrail piers */}
        <motion.path d="M 595,505 L 610,505 L 610,545 L 595,545 Z" variants={lineVariants} custom={3.4} />
        <motion.path d="M 890,505 L 905,505 L 905,545 L 890,545 Z" variants={lineVariants} custom={3.4} />
      </g>

      {/* Giant Classical Columns inside Portico */}
      <g>
        {columns.map((c, i) => (
          <g key={`col-outlines-${i}`}>
            {/* Column bases */}
            <motion.path d={`M ${c.x - 3},485 L ${c.x - 3},500 L ${c.x + c.w + 3},500 L ${c.x + c.w + 3},485 Z`} variants={lineVariants} custom={3.2 + i * 0.05} />
            {/* Column capitals */}
            <motion.line x1={c.x - 2} y1={160} x2={c.x + c.w + 2} y2={160} variants={lineVariants} custom={3.2} />
            <motion.line x1={c.x - 1} y1={164} x2={c.x + c.w + 1} y2={164} variants={lineVariants} custom={3.2} />
            <motion.line x1={c.x} y1={172} x2={c.x + c.w} y2={172} variants={lineVariants} custom={3.3} />
            {/* Shaft vertical outlines */}
            <motion.line x1={c.x} y1={172} x2={c.x} y2={485} variants={lineVariants} custom={3.4 + i * 0.04} />
            <motion.line x1={c.x + c.w} y1={172} x2={c.x + c.w} y2={485} variants={lineVariants} custom={3.4 + i * 0.04} />
            {/* Shaft fluting lines */}
            <motion.line x1={c.x + 5} y1={172} x2={c.x + 5} y2={485} strokeDasharray="4 2" opacity="0.6" variants={lineVariants} custom={3.5 + i * 0.04} />
            <motion.line x1={c.x + 10} y1={172} x2={c.x + 10} y2={485} opacity="0.7" variants={lineVariants} custom={3.5 + i * 0.04} />
            <motion.line x1={c.x + 15} y1={172} x2={c.x + 15} y2={485} strokeDasharray="4 2" opacity="0.6" variants={lineVariants} custom={3.5 + i * 0.04} />
          </g>
        ))}
      </g>

      {/* Ground Floor Openings/Arches */}
      <g>
        {/* Arched windows */}
        {groundWindows.map((x, idx) => (
          <g key={`g-window-${x}`}>
            {/* Outer Arch */}
            <motion.path d={`M ${x - 30},500 L ${x - 30},440 A 30,30 0 0,1 ${x + 30},440 L ${x + 30},500`} variants={lineVariants} custom={3.6 + idx * 0.08} />
            {/* Inner Sash */}
            <motion.path d={`M ${x - 25},500 L ${x - 25},442 A 25,25 0 0,1 ${x + 25},442 L ${x + 25},500`} variants={lineVariants} custom={3.7 + idx * 0.08} />
            {/* Window grids */}
            <motion.line x1={x} y1={412} x2={x} y2={500} variants={lineVariants} custom={3.8} />
            <motion.line x1={x - 25} y1={458} x2={x + 25} y2={458} variants={lineVariants} custom={3.8} />
            <motion.line x1={x - 25} y1={478} x2={x + 25} y2={478} variants={lineVariants} custom={3.8} />
          </g>
        ))}

        {/* Center Arched Entrance Doorway */}
        <g>
          {/* Outer Frame */}
          <motion.path d="M 710,500 L 710,430 A 40,40 0 0,1 790,430 L 790,500" variants={lineVariants} custom={3.5} />
          {/* Inner Door Trim */}
          <motion.path d="M 716,500 L 716,433 A 34,34 0 0,1 784,433 L 784,500" variants={lineVariants} custom={3.6} />
          {/* Door split line */}
          <motion.line x1={750} y1={399} x2={750} y2={500} variants={lineVariants} custom={3.7} />
          {/* Fanlight radial glazing lines */}
          <motion.line x1={750} y1={433} x2={723} y2={409} variants={lineVariants} custom={3.8} />
          <motion.line x1={750} y1={433} x2={750} y2={399} variants={lineVariants} custom={3.8} />
          <motion.line x1={750} y1={433} x2={777} y2={409} variants={lineVariants} custom={3.8} />
        </g>
      </g>

      {/* First Floor Windows & Central Balcony */}
      <g>
        {/* Balustrade rail under portico */}
        <motion.line x1={700} y1={310} x2={800} y2={310} variants={lineVariants} custom={3.7} />
        <motion.line x1={700} y1={320} x2={800} y2={320} variants={lineVariants} custom={3.7} />
        {Array.from({ length: 11 }).map((_, i) => {
          const bx = 700 + i * 10;
          return <motion.line key={`bal-port-${i}`} x1={bx} y1={310} x2={bx} y2={320} variants={lineVariants} custom={3.8} />;
        })}

        {/* Rectangular windows with pediments */}
        {upperWindows.map((x, idx) => (
          <g key={`u-window-${x}`}>
            {/* Window outer frame */}
            <motion.path d={`M ${x - 25},310 L ${x - 25},220 L ${x + 25},220 L ${x + 25},310 Z`} variants={lineVariants} custom={3.7 + idx * 0.08} />
            {/* Window inner sash */}
            <motion.path d={`M ${x - 20},310 L ${x - 20},225 L ${x + 20},225 L ${x + 20},310 Z`} variants={lineVariants} custom={3.8 + idx * 0.08} />
            {/* Window grids */}
            <motion.line x1={x} y1={225} x2={x} y2={310} variants={lineVariants} custom={3.9} />
            <motion.line x1={x - 20} y1={250} x2={x + 20} y2={250} variants={lineVariants} custom={3.9} />
            <motion.line x1={x - 20} y1={280} x2={x + 20} y2={280} variants={lineVariants} custom={3.9} />
            {/* Triangular pediment hood */}
            <motion.polygon points={`${x - 28},220 ${x},198 ${x + 28},220`} variants={lineVariants} custom={4.0 + idx * 0.08} />
          </g>
        ))}

        {/* Center first floor French door */}
        <g>
          <motion.path d="M 720,310 L 720,200 L 780,200 L 780,310 Z" variants={lineVariants} custom={3.7} />
          <motion.path d="M 725,310 L 725,205 L 775,205 L 775,310 Z" variants={lineVariants} custom={3.8} />
          <motion.line x1={750} y1={205} x2={750} y2={310} variants={lineVariants} custom={3.9} />
          <motion.line x1={725} y1={235} x2={775} y2={235} variants={lineVariants} custom={3.9} />
        </g>
      </g>

      {/* Roof Level Balustrade (Wing Roofs) */}
      <g>
        {/* Left wing rails */}
        <motion.line x1={200} y1={145} x2={580} y2={145} variants={lineVariants} custom={3.2} />
        <motion.line x1={200} y1={160} x2={580} y2={160} variants={lineVariants} custom={3.2} />
        {leftBalusters.map((x, i) => (
          <motion.line key={`l-bal-${i}`} x1={x} y1={145} x2={x} y2={160} variants={lineVariants} custom={3.3 + i * 0.01} />
        ))}

        {/* Right wing rails */}
        <motion.line x1={920} y1={145} x2={1300} y2={145} variants={lineVariants} custom={3.2} />
        <motion.line x1={920} y1={160} x2={1300} y2={160} variants={lineVariants} custom={3.2} />
        {rightBalusters.map((x, i) => (
          <motion.line key={`r-bal-${i}`} x1={x} y1={145} x2={x} y2={160} variants={lineVariants} custom={3.3 + i * 0.01} />
        ))}
      </g>

      {/* Repeating brackets details under wing roof lines */}
      <g opacity="0.8">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 205 + i * 13;
          return <motion.rect key={`brkt-l-${i}`} x={x - 2} y={160} width={4} height={8} variants={lineVariants} custom={3.0 + i * 0.01} />;
        })}
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 915 + i * 13;
          return <motion.rect key={`brkt-r-${i}`} x={x - 2} y={160} width={4} height={8} variants={lineVariants} custom={3.0 + i * 0.01} />;
        })}
      </g>

      {/* Roof pediment and tiling structures */}
      <g>
        {/* Left Roof Plane */}
        <motion.path d="M 200,160 L 600,160 L 560,80 L 240,80 Z" variants={lineVariants} custom={3.0} />
        {/* Right Roof Plane */}
        <motion.path d="M 900,160 L 1300,160 L 1260,80 L 940,80 Z" variants={lineVariants} custom={3.0} />
        {/* Center Triangular Portico Pediment */}
        <motion.polygon points="580,160 750,50 920,160" variants={lineVariants} custom={3.1} />
        {/* Pediment molding frame offset */}
        <motion.polygon points="595,155 750,68 905,155" variants={lineVariants} custom={3.2} />

        {/* Center Medallion circle detail */}
        <motion.circle cx={750} cy={115} r={22} variants={lineVariants} custom={3.3} />
        <motion.circle cx={750} cy={115} r={14} strokeDasharray="2 2" variants={lineVariants} custom={3.4} />
        {/* Medallion spokes */}
        {[0, 45, 90, 135].map((deg, idx) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 750 - 22 * Math.cos(rad);
          const y1 = 115 - 22 * Math.sin(rad);
          const x2 = 750 + 22 * Math.cos(rad);
          const y2 = 115 + 22 * Math.sin(rad);
          return <motion.line key={`med-spk-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} variants={lineVariants} custom={3.5} />;
        })}

        {/* Roof tile lines - Horizontal runs */}
        {[95, 110, 125, 140].map((ry, idx) => (
          <g key={`tile-run-${idx}`}>
            {/* Left roof horiz */}
            <motion.line x1={240 + idx * 8} y1={ry} x2={560 - idx * 8} y2={ry} strokeWidth="0.7" opacity="0.6" variants={lineVariants} custom={3.3 + idx * 0.05} />
            {/* Right roof horiz */}
            <motion.line x1={940 + idx * 8} y1={ry} x2={1260 - idx * 8} y2={ry} strokeWidth="0.7" opacity="0.6" variants={lineVariants} custom={3.3 + idx * 0.05} />
          </g>
        ))}

        {/* Left Roof Tile Diagonal Lines */}
        {Array.from({ length: 15 }).map((_, i) => {
          const startX = 210 + i * 26;
          const endX = 245 + i * 21;
          return (
            <motion.line
              key={`tile-left-guide-${i}`}
              x1={startX}
              y1={160}
              x2={endX}
              y2={80}
              strokeWidth="0.8"
              opacity="0.7"
              variants={lineVariants}
              custom={3.4 + i * 0.02}
            />
          );
        })}

        {/* Right Roof Tile Diagonal Lines */}
        {Array.from({ length: 15 }).map((_, i) => {
          const startX = 910 + i * 26;
          const endX = 945 + i * 21;
          return (
            <motion.line
              key={`tile-right-guide-${i}`}
              x1={startX}
              y1={160}
              x2={endX}
              y2={80}
              strokeWidth="0.8"
              opacity="0.7"
              variants={lineVariants}
              custom={3.4 + i * 0.02}
            />
          );
        })}
      </g>

      {/* Compass metadata drafting seal */}
      <g stroke={strokeColor} strokeWidth="0.75" strokeDasharray="2 4" opacity="0.35">
        <motion.circle cx={1130} cy={430} r={30} variants={lineVariants} custom={3.8} />
        <motion.circle cx={1130} cy={430} r={18} variants={lineVariants} custom={3.8} />
        <motion.line x1={1090} y1={430} x2={1170} y2={430} variants={lineVariants} custom={3.9} />
        <motion.line x1={1130} y1={390} x2={1130} y2={470} variants={lineVariants} custom={3.9} />
      </g>
      <g fill={strokeColor} stroke="none" className="font-mono text-[8px]" opacity="0.45">
        <motion.text x={1126} y={382} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 4.8 }}>
          N
        </motion.text>
        <motion.text x={230} y={482} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 5.0 }}>
          PRAYAG CLAY PRODUCTS CO. | DRAFT FILE REF: PC-FA-83-CLASSIC
        </motion.text>
        <motion.text x={230} y={495} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 5.1 }}>
          FACADE ELEVATION VIEW | SCALE 1:50 | NEOCLASSICAL ACCENT DESIGN
        </motion.text>
      </g>
    </motion.svg>
  );
};

export default Hero;
