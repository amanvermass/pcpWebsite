"use client";

import React, { useState, useEffect, useRef } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  inverseText?: boolean; // Forced override for white-text version
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
  inverseText = false,
  height = "30",
}) => {
  const h = isNaN(Number(height)) ? height : `${height}px`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBgDark, setIsBgDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      if (!containerRef.current) return;
      
      const getBgColor = (el: HTMLElement | null): string => {
        if (!el) return "";
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          return bg;
        }
        return getBgColor(el.parentElement);
      };

      const color = getBgColor(containerRef.current);
      if (color) {
        const match = color.match(/\d+/g);
        if (match && match.length >= 3) {
          const r = parseInt(match[0], 10);
          const g = parseInt(match[1], 10);
          const b = parseInt(match[2], 10);
          // YIQ brightness formula: dark < 128
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          setIsBgDark(brightness < 128);
        }
      }
    };

    // Run once on mount & scroll
    checkBackground();
    window.addEventListener("scroll", checkBackground);
    
    // Re-run after a small delay to handle layout updates
    const timer = setTimeout(checkBackground, 100);

    return () => {
      window.removeEventListener("scroll", checkBackground);
      clearTimeout(timer);
    };
  }, []);

  const shouldInverse = inverseText || isBgDark;
  
  return (
    <div ref={containerRef} className={`inline-flex items-center ${className}`} style={{ height: h }}>
      {showText ? (
        <>
          {/* Full Logo: visible on tablet/desktop, falls back to icon-only on mobile */}
          <img
            src={shouldInverse ? "/logo-white.png" : "/logo.png"}
            alt="Prayag Clay Products Logo"
            className="h-full w-auto select-none object-contain hidden sm:inline-block"
            style={{ height: h }}
          />
          <img
            src="/logo-icon.png"
            alt="Prayag Clay Products Icon"
            className="h-full w-auto select-none object-contain inline-block sm:hidden"
            style={{ height: h }}
          />
        </>
      ) : (
        /* Forced Icon-only logo */
        <img
          src="/logo-icon.png"
          alt="Prayag Clay Products Icon"
          className="h-full w-auto select-none object-contain inline-block"
          style={{ height: h }}
        />
      )}
    </div>
  );
};
export default Logo;
