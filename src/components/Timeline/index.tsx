"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const milestones = [
  {
    number: "1.",
    title: "FIRST HELLOS",
    description: "We design authentic employer brands to shape high-performing organisations."
  },
  {
    number: "2.",
    title: "INSPIRATION",
    description: "We set clear expectations, build community and connection through designing game-changing onboarding."
  },
  {
    number: "3.",
    title: "GROWTH",
    description: "We reimagine the growth and performance experience to shape careers, businesses and futures."
  },
  {
    number: "4.",
    title: "RECOGNITION",
    description: "We build recognition strategies and experiences to celebrate the moments, big and small."
  },
  {
    number: "5.",
    title: "CONNECTION",
    description: "We find your unique organisational signature and create authentic Employee Value Propositions."
  },
  {
    number: "6.",
    title: "CELEBRATION",
    description: "We celebrate our milestones, reflecting on our journey to shape a brighter, more innovative tomorrow."
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth scroll progress using a spring
  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Map scroll progress to the Y position along the SVG viewBox (500 to 5500)
  const yPosition = useTransform(progressSpring, [0, 1], [500, 5500], { clamp: true });

  // Derived X position based on the sine wave formula
  const xPosition = useTransform(yPosition, (y) => {
    return 500 + 150 * Math.sin(y * (Math.PI / 1000) + Math.PI);
  });

  // Calculate pathLength progress to align exactly with the dot's Y position
  const lineProgress = useTransform(yPosition, [0, 5500], [0, 1], { clamp: true });

  // Generate the full SVG path Y=0 to Y=5500
  const generateFullPath = () => {
    let path = "";
    for (let y = 0; y <= 5500; y += 15) {
      const x = 500 + 150 * Math.sin(y * (Math.PI / 1000) + Math.PI);
      if (y === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += `L ${x} ${y}`;
      }
    }
    return path;
  };

  const fullPathD = generateFullPath();

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[5500px] bg-transparent text-white select-none overflow-visible py-24"
    >
      {/* SVG Container: fixed-width and centered on desktop, narrow and aligned left on mobile */}
      <div className="absolute inset-y-0 left-6 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-[80px] md:w-[1000px] pointer-events-none z-10 overflow-visible">
        <svg 
          viewBox="0 0 1000 5500" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradient for the animated timeline line */}
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff5e3a" />
              <stop offset="35%" stopColor="#C076EC" />
              <stop offset="70%" stopColor="#572CE6" />
              <stop offset="100%" stopColor="#ff5e3a" />
            </linearGradient>

            {/* Glowing filter for the active point */}
            <filter id="active-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background thin trace line */}
          <path
            d={fullPathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
          />

          {/* Animated active drawing line */}
          <motion.path
            d={fullPathD}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="4.5"
            style={{ pathLength: lineProgress }}
          />

          {/* Milestone static indicators */}
          {milestones.map((_, idx) => {
            const yVal = (idx + 0.5) * 1000;
            const xVal = 500 + 150 * Math.sin(yVal * (Math.PI / 1000) + Math.PI);
            return (
              <g key={idx}>
                {/* Outermost ring */}
                <circle
                  cx={xVal}
                  cy={yVal}
                  r="14"
                  fill="none"
                  stroke="rgba(255, 94, 58, 0.15)"
                  strokeWidth="1"
                />
                {/* Inner dot */}
                <circle
                  cx={xVal}
                  cy={yVal}
                  r="5"
                  fill="#ff5e3a"
                  opacity="0.65"
                />
              </g>
            );
          })}

          {/* Moving Active Tracker Dot */}
          <motion.circle
            cx={xPosition}
            cy={yPosition}
            r="10"
            fill="#ff5e3a"
            filter="url(#active-glow)"
          />

        </svg>
      </div>

      {/* Cards list absolutely positioned corresponding to their coordinates */}
      <div className="relative w-full max-w-[1200px] mx-auto h-full px-6 md:px-12 pointer-events-none">
        {milestones.map((item, idx) => {
          const yVal = (idx + 0.5) * 1000;
          const isLeft = idx % 2 !== 0; // Alternating cards left/right
          
          return (
            <div
              key={idx}
              style={{ top: `${yVal}px` }}
              className={`absolute -translate-y-1/2 left-[80px] md:left-[55%] w-[calc(100%-120px)] md:w-[38%] ${
                isLeft ? "md:left-auto md:right-[55%]" : ""
              } pointer-events-auto`}
            >
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${isLeft ? "md:items-end md:text-right" : "items-start text-left"}`}
              >
                {/* Milestone Big Number */}
                <span className="font-serif italic text-7xl md:text-8xl text-[#ff5e3a] leading-none mb-4 block select-none">
                  {item.number}
                </span>
                
                {/* Milestone Title */}
                <h3 className="font-sans font-bold text-white text-xl md:text-2xl tracking-wider mb-3">
                  {item.title}
                </h3>
                
                {/* Milestone Description */}
                <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
