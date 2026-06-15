"use client";

import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  inverseText?: boolean; // Kept for interface compatibility
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  height = "30",
}) => {
  return (
    <img
      src="/logo.png"
      alt="Prayag Clay Productions"
      className={`inline-block select-none ${className}`}
      style={{
        height: isNaN(Number(height)) ? height : `${height}px`,
        width: "auto",
        display: "inline-block",
        objectFit: "contain",
      }}
    />
  );
};
