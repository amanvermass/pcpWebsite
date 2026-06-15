"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectCard, setIsProjectCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth follow effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop devices with fine pointers
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = target.closest("a, button, select, input, [role='button'], .cursor-pointer");
      if (isInteractive) {
        setIsHovered(true);
      }

      // Check if target is a project card or inside one
      const isProj = target.closest("a[href^='/projects/'], .group[href^='/projects/']");
      if (isProj) {
        setIsProjectCard(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = target.closest("a, button, select, input, [role='button'], .cursor-pointer");
      if (isInteractive) {
        setIsHovered(false);
      }

      const isProj = target.closest("a[href^='/projects/'], .group[href^='/projects/']");
      if (isProj) {
        setIsProjectCard(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Add CSS class to body to hide standard cursor on desktop
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isProjectCard ? 72 : isHovered ? 48 : 24,
          height: isProjectCard ? 72 : isHovered ? 48 : 24,
          backgroundColor: isProjectCard
            ? "rgba(175, 103, 82, 0.95)"
            : isHovered
            ? "rgba(175, 103, 82, 0.15)"
            : "rgba(0,0,0,0)",
          borderColor: isHovered || isProjectCard ? "#af6752" : "#c4b7b0",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        {isProjectCard && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold text-white text-white-force tracking-widest"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-terracotta-600 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isProjectCard ? 0 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
    </>
  );
};
