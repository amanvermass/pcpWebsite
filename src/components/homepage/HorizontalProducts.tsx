"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";

interface ProductItem {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  desc: string;
  image: string;
  link: string;
}

const products: ProductItem[] = [
  {
    id: "clay-bricks",
    num: "01",
    name: "Clay Bricks",
    subtitle: "ALLUVIAL EARTH FACING BRICKS",
    desc: "Formed using natural alluvial river clay and fired at 1000°C+ in automated European tunnel kilns. Our bricks provide exceptional load-bearing strength, optimal thermal mass, and a timeless facade aesthetic.",
    image: "/images/hero-1.jpg",
    link: "/products?category=Clay Bricks",
  },
  {
    id: "pavers",
    num: "02",
    name: "Clay Pavers",
    subtitle: "HEAVY-DUTY PAVING SYSTEMS",
    desc: "High-density clay paving blocks designed to withstand heavy vehicular and pedestrian traffic. Complete with high anti-skid ratings, absolute frost resistance, and permanent rich earthy tones.",
    image: "/images/hero-4.jpg",
    link: "/products?category=Pavers",
  },
  {
    id: "aac-blocks",
    num: "03",
    name: "Terraplasts",
    subtitle: "AUTOCLAVED AERATED CONCRETE",
    desc: "Ultra-lightweight structural masonry units featuring superior acoustic damping, structural fire safety, and advanced thermal insulation to dramatically reduce building energy requirements.",
    image: "/images/hero-2.jpg",
    link: "/products?category=Terraplasts",
  },
  {
    id: "flyash-bricks",
    num: "04",
    name: "Cladding",
    subtitle: "SUSTAINABLE MASONRY SOLUTIONS",
    desc: "Eco-friendly, precise-dimension engineering bricks manufactured using recycled fly ash, sand, and cement. Highly uniform in shape to optimize structural mortar efficiency and design consistency.",
    image: "/images/hero-3.jpg",
    link: "/products?category=Hollow Blocks",
  },
];

export const HorizontalProducts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the parent vertical container
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Translate the horizontal track from 0 to -75% (since we have 4 slides)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Slide transforms helper for scroll-linked creative motion
  const getSlideTransforms = (index: number) => {
    const total = products.length;
    const step = 1 / (total - 1); // 0.333...
    const center = index * step;

    let inputR: number[];
    let yR: number[];
    let opacityR: number[];
    let scaleR: number[];
    let parallaxTextR: number[];

    if (index === 0) {
      inputR = [0, step];
      yR = [0, -80];
      opacityR = [1, 0];
      scaleR = [1.0, 1.15];
      parallaxTextR = [0, 150];
    } else if (index === total - 1) {
      inputR = [center - step, 1.0];
      yR = [80, 0];
      opacityR = [0, 1];
      scaleR = [1.15, 1.0];
      parallaxTextR = [-150, 0];
    } else {
      inputR = [center - step, center, center + step];
      yR = [80, 0, -80];
      opacityR = [0, 1, 0];
      scaleR = [1.15, 1.0, 1.15];
      parallaxTextR = [-150, 0, 150];
    }

    const y = useTransform(scrollYProgress, inputR, yR);
    const opacity = useTransform(scrollYProgress, inputR, opacityR);
    const imgScale = useTransform(scrollYProgress, inputR, scaleR);
    const pTextX = useTransform(scrollYProgress, inputR, parallaxTextR);

    return { y, opacity, imgScale, pTextX };
  };

  return (
    <section ref={containerRef} id="categories" className="relative h-[400vh] bg-brand-black">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full border-r" />
        </div>

        {/* Section Header (Fixed in Top Left) */}
        <div className="absolute top-10 left-6 md:left-12 lg:left-20 z-20 flex flex-col gap-1.5 pointer-events-none">
          <span className="text-[10px] font-poppins tracking-[0.45em] uppercase text-brand-gold font-bold">
            PRODUCT SOLUTIONS
          </span>
          <span className="text-[9px] font-poppins tracking-[0.2em] uppercase text-brand-sand/40">
            01 — 04 / ENGINEERED PERFORMANCE
          </span>
        </div>

        {/* Scroll Indicator (Fixed in Bottom Right) */}
        <div className="absolute bottom-10 right-6 md:right-12 lg:right-20 z-20 hidden sm:flex items-center gap-4">
          <span className="text-[10px] font-poppins tracking-[0.2em] uppercase text-brand-sand/40">
            SCROLL FOR PRODUCTS
          </span>
          <div className="w-24 h-[1px] bg-brand-slate/40 relative">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute left-0 top-0 h-full bg-brand-gold origin-left w-full"
            />
          </div>
        </div>

        {/* Horizontal Slide Track */}
        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center">
          {products.map((prod, idx) => {
            const { y, opacity, imgScale, pTextX } = getSlideTransforms(idx);

            return (
              <div
                key={prod.id}
                className="relative w-[100vw] h-full flex items-center justify-center shrink-0 px-6 md:px-12 lg:px-20 z-10 overflow-hidden"
              >
                {/* Massive Background Parallax Text Layer */}
                <motion.div
                  style={{ x: pTextX }}
                  className="absolute top-[45%] left-0 -translate-y-1/2 text-[15vw] font-playfair font-black text-brand-slate-200/15 select-none pointer-events-none uppercase whitespace-nowrap z-0"
                >
                  {prod.name}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center max-w-7xl w-full z-10 relative">

                  {/* Left Column - Typography & Content (Smooth scroll-linked translate and fade) */}
                  <motion.div
                    style={{ y, opacity }}
                    className="lg:col-span-5 flex flex-col items-start text-left order-2 lg:order-1"
                  >
                    {/* Index Number */}
                    <div className="overflow-hidden mb-2">
                      <span className="text-4xl md:text-5xl font-cormorant font-light text-brand-gold/40 tracking-wider">
                        {prod.num}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <span className="text-[10px] tracking-[0.3em] font-semibold text-brand-gold uppercase block font-poppins mb-3">
                      {prod.subtitle}
                    </span>

                    {/* Product Name */}
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-normal font-cormorant text-brand-offwhite leading-tight tracking-wide mb-6">
                      {prod.name}
                    </h3>

                    {/* Product Details */}
                    <p className="text-xs sm:text-sm font-poppins text-brand-sand/80 leading-relaxed max-w-md mb-8 font-light">
                      {prod.desc}
                    </p>

                    {/* Magnetic CTA button links to project/product page */}
                    <div>
                      <Magnetic>
                        <a
                          href={prod.link}
                          className="inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-gold-500 text-brand-black px-7 py-3.5 border border-brand-gold font-poppins uppercase text-[10px] font-semibold tracking-widest transition-colors cursor-pointer"
                        >
                          Explore Specs
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </Magnetic>
                    </div>

                  </motion.div>

                  {/* Right Column - Large Image Mask Reveal */}
                  <div className="lg:col-span-7 w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] relative overflow-hidden group border border-brand-gold/15 bg-brand-charcoal order-1 lg:order-2">
                    <div className="absolute inset-0 bg-black/35 z-10 transition-opacity duration-500 group-hover:bg-black/15" />

                    {/* Parallax Image Scale bound directly to scroll track */}
                    <div className="w-full h-full overflow-hidden">
                      <motion.img
                        src={prod.image}
                        alt={prod.name}
                        style={{ scale: imgScale }}
                        className="w-full h-full object-cover origin-center"
                      />
                    </div>

                    {/* Overlay cursor hover marker */}
                    <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
                      <span className="text-[9px] font-poppins text-[#faf6f2] tracking-widest uppercase bg-black/85 px-3 py-1 border border-brand-slate/20">
                        PCP BUILD
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default HorizontalProducts;
