"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Hero } from "@/components/homepage/Hero";
import { FeaturedProducts } from "@/components/homepage/FeaturedProducts";
import { RecommendationEngine } from "@/components/homepage/RecommendationEngine";
import { Calculators } from "@/components/homepage/Calculators";
import { Projects } from "@/components/homepage/Projects";
import { Sustainability } from "@/components/homepage/Sustainability";
import { DealerLocator } from "@/components/homepage/DealerLocator";
import { BlogsAndNews } from "@/components/homepage/BlogsAndNews";
import { ContactUs } from "@/components/homepage/ContactUs";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  // Sync theme class to document documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <RecommendationEngine />
        <Calculators />
        <Projects />
        <Sustainability />
        <DealerLocator />
        <BlogsAndNews />
      </main>
      <ContactUs />
    </div>
  );
}

