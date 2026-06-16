"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 30,
}) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initialOffset = directions[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium custom cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
};

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({ children, delay = 0 }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to horizontal translation (left to right)
  const x = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  
  // Map scroll progress to image scaling (growing big as you scroll down)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.15]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-full group">
      <motion.div
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full overflow-hidden"
      >
        <motion.div
          style={{ x, scale }}
          className="w-full h-full overflow-hidden"
        >
          {/* Inner hover zoom layer */}
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em] pb-1">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
