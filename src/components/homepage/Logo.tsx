"use client";

import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  inverseText?: boolean; // If true, makes the dark charcoal text white (for dark mode backgrounds)
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
  inverseText = false,
  height = "42",
}) => {
  // Hex Colors from the Logo Image
  const colors = {
    gray: "#c4b7b0",       // Top block (warm gray/beige)
    ochre: "#c29153",      // Middle block & ESTD/Subtext (ochre/sand gold)
    terracotta: "#af6752", // Bottom block (terracotta red-brown)
    darkCharcoal: "#171514", // "PRAYAG CLAY PRODUCTS" text
  };

  const textFill = inverseText ? "#000000" : colors.darkCharcoal;

  if (!showText) {
    // Return only the stack icon
    return (
      <svg
        viewBox="0 0 180 190"
        height={height}
        className={`inline-block ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Block - Warm Gray */}
        <path
          d="M 10,20 L 170,20 L 170,55 L 10,55 Z"
          fill={colors.gray}
        />
        {/* Middle Block - Muted Gold/Ochre */}
        <path
          d="M 10,65 L 130,75 L 170,68 L 170,103 L 130,110 L 10,100 Z"
          fill={colors.ochre}
        />
        {/* Bottom Block - Terracotta */}
        <path
          d="M 10,115 L 130,138 L 170,128 L 170,163 L 130,173 L 10,150 Z"
          fill={colors.terracotta}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 540 240"
      height={height}
      className={`inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* --- Stack Icon (Left) --- */}
      {/* Top Block - Warm Gray */}
      <path
        d="M 10,20 L 170,20 L 170,55 L 10,55 Z"
        fill={colors.gray}
      />
      {/* Middle Block - Ochre */}
      <path
        d="M 10,65 L 130,75 L 170,68 L 170,103 L 130,110 L 10,100 Z"
        fill={colors.ochre}
      />
      {/* Bottom Block - Terracotta */}
      <path
        d="M 10,115 L 130,138 L 170,128 L 170,163 L 130,173 L 10,150 Z"
        fill={colors.terracotta}
      />

      {/* --- Brand Text (Right) --- */}
      {/* PRAYAG */}
      <text
        x="210"
        y="58"
        fill={textFill}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="54"
        fontWeight="800"
        letterSpacing="2"
      >
        PRAYAG
      </text>

      {/* CLAY */}
      <text
        x="210"
        y="118"
        fill={textFill}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="54"
        fontWeight="800"
        letterSpacing="2"
      >
        CLAY
      </text>

      {/* ESTD 1937 */}
      <text
        x="425"
        y="93"
        fill={colors.ochre}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="700"
        letterSpacing="3"
      >
        ESTD
      </text>
      <text
        x="425"
        y="115"
        fill={colors.ochre}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="3"
      >
        1937
      </text>

      {/* PRODUCTS */}
      <text
        x="210"
        y="178"
        fill={textFill}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="54"
        fontWeight="800"
        letterSpacing="2"
      >
        PRODUCTS
      </text>

      {/* --- Subtext (Bottom) --- */}
      {/* BRICKS • BLOCKS • TILES • PAVERS */}
      <text
        x="10"
        y="225"
        fill={colors.ochre}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="16.5"
        fontWeight="700"
        letterSpacing="6.5"
      >
        BRICKS  •  BLOCKS  •  TILES  •  PAVERS
      </text>
    </svg>
  );
};
