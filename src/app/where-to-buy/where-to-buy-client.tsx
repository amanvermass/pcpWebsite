"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { DealerLocator } from "@/components/homepage/DealerLocator";
import { BlueprintGlobalBackground } from "@/components/ui/BlueprintGlobalBackground";

export default function WhereToBuyClient() {
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
    <div className="flex flex-col min-h-screen bg-brand-slate-950 text-slate-100 relative">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow relative pt-20">
        <BlueprintGlobalBackground />
        <div className="animate-fade-in-up">
          <DealerLocator />
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
