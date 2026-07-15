"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PuzzleSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracker through the puzzle section height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Puzzle translations: slide together and align rotation on scroll
  const leftX = useTransform(scrollYProgress, [0.1, 0.78], [-180, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.78], [180, 0]);
  const leftRotate = useTransform(scrollYProgress, [0.1, 0.78], [-12, 0]);
  const rightRotate = useTransform(scrollYProgress, [0.1, 0.78], [12, 0]);

  // Dynamic text cross-fading on the left piece
  const joinOpacity = useTransform(scrollYProgress, [0.72, 0.78], [1, 0]);
  const joinedOpacity = useTransform(scrollYProgress, [0.78, 0.84], [0, 1]);

  // Lock animation: subtle spring-like pop when pieces snap together
  const snapScale = useTransform(
    scrollYProgress,
    [0.76, 0.79, 0.85],
    [1, 1.06, 1]
  );

  // Central glow explosion when pieces lock
  const glowOpacity = useTransform(scrollYProgress, [0.74, 0.78, 0.95], [0, 0.45, 0.25]);
  const glowScale = useTransform(scrollYProgress, [0.74, 0.78], [0.6, 1.4]);

  // CTA button fade-in after connection
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.82, 0.95], [30, 0]);

  // Puzzle Piece Paths (drawn in local 200x200 space)
  // Left Piece: Tab on right, bottom, left; Blank on top
  const leftPath = 
    "M 0 0 " +
    "L 70 0 C 70 30, 80 40, 100 40 C 120 40, 130 30, 130 0 L 200 0 " + // Top Blank
    "L 200 70 C 230 70, 240 80, 240 100 C 240 120, 230 130, 200 130 L 200 200 " + // Right Tab (locks to right piece)
    "L 130 200 C 130 230, 120 240, 100 240 C 80 240, 70 230, 70 200 L 0 200 " + // Bottom Tab
    "L 0 130 C -30 130, -40 120, -40 100 C -40 80, -30 70, 0 70 Z"; // Left Tab

  // Right Piece: Blank on left, bottom, right; Tab on top
  const rightPath = 
    "M 0 0 " +
    "L 70 0 C 70 -30, 80 -40, 100 -40 C 120 -40, 130 -30, 130 0 L 200 0 " + // Top Tab
    "L 200 70 C 170 70, 160 80, 160 100 C 160 120, 170 130, 200 130 L 200 200 " + // Right Blank
    "L 130 200 C 130 170, 120 160, 100 160 C 80 160, 70 170, 70 200 L 0 200 " + // Bottom Blank
    "L 0 130 C 30 130, 40 120, 40 100 C 40 80, 30 70, 0 70 Z"; // Left Blank (receives left tab)

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "250vh" }}>
      {/* Sticky screen container */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent z-10 px-6 select-none">
        
        {/* Title */}
        <h2 className="text-[#FAF8F5]/60 text-xs md:text-sm tracking-[0.3em] uppercase font-sans font-medium mb-16 text-center">
          Connect to the Network
        </h2>

        {/* Puzzle Board Area */}
        <div className="relative w-full max-w-[600px] h-[340px] flex items-center justify-center">
          
          {/* Snap Glow Effect */}
          <motion.div
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background: "radial-gradient(circle, var(--color-violet) 0%, var(--color-magenta) 50%, transparent 100%)",
            }}
            className="absolute w-[300px] h-[300px] rounded-full pointer-events-none filter blur-[50px] z-0"
          />

          {/* Puzzle SVG Container */}
          <motion.svg
            style={{ scale: snapScale }}
            viewBox="0 0 500 300"
            className="w-full h-full overflow-visible z-10 filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Neon border gradients */}
              <linearGradient id="puzzleBorderLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7801FF" />
                <stop offset="50%" stopColor="#D242D7" />
                <stop offset="100%" stopColor="#B86EF9" />
              </linearGradient>
              <linearGradient id="puzzleBorderRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B86EF9" />
                <stop offset="50%" stopColor="#7801FF" />
                <stop offset="100%" stopColor="#D242D7" />
              </linearGradient>

              {/* Glowing inner shadow filters */}
              <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left Puzzle Piece Group */}
            <motion.g
              style={{
                x: leftX,
                rotate: leftRotate,
                transformOrigin: "150px 150px",
              }}
            >
              {/* Piece Body */}
              <path
                d={leftPath}
                transform="translate(50, 50)"
                fill="rgba(255, 255, 255, 0.03)"
                stroke="url(#puzzleBorderLeft)"
                strokeWidth="2"
                className="backdrop-blur-md"
                filter="url(#glassGlow)"
              />
              
              {/* Text: "join" */}
              <motion.text
                style={{ opacity: joinOpacity }}
                x="150"
                y="158"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-[#FAF8F5]/90 font-sans font-black text-2xl uppercase tracking-[0.15em] pointer-events-none"
              >
                join
              </motion.text>

              {/* Text: "joined" */}
              <motion.text
                style={{ opacity: joinedOpacity }}
                x="150"
                y="158"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-white font-sans font-black text-2xl uppercase tracking-[0.15em] pointer-events-none drop-shadow-[0_0_10px_#D242D7]"
              >
                joined
              </motion.text>
            </motion.g>

            {/* Right Puzzle Piece Group */}
            <motion.g
              style={{
                x: rightX,
                rotate: rightRotate,
                transformOrigin: "350px 150px",
              }}
            >
              {/* Piece Body */}
              <path
                d={rightPath}
                transform="translate(250, 50)"
                fill="rgba(255, 255, 255, 0.03)"
                stroke="url(#puzzleBorderRight)"
                strokeWidth="2"
                className="backdrop-blur-md"
                filter="url(#glassGlow)"
              />

              {/* Text: "now" */}
              <motion.text
                x="350"
                y="158"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-[#FAF8F5]/90 font-sans font-black text-2xl uppercase tracking-[0.15em] pointer-events-none transition-all duration-300"
                // Subtle text glow on snap match
                style={{
                  fill: useTransform(
                    scrollYProgress,
                    [0.78, 0.84],
                    ["rgba(250, 248, 245, 0.9)", "rgba(255, 255, 255, 1)"]
                  ),
                  filter: useTransform(
                    scrollYProgress,
                    [0.78, 0.84],
                    ["none", "drop-shadow(0 0 10px #7801FF)"]
                  ),
                }}
              >
                now
              </motion.text>
            </motion.g>
          </motion.svg>
        </div>

        {/* CTA Button revealed after connection */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="mt-12 pointer-events-auto z-20 flex flex-col items-center"
        >
          <a
            href="https://forms.google.com" // Replace with actual ambassador form URL
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-10 py-5 rounded-full font-sans text-sm md:text-base font-semibold tracking-wider text-black bg-[#FAF8F5] uppercase overflow-hidden group transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]"
          >
            Apply Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}
