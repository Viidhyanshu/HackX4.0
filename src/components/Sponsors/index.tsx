"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPONSORS } from "@/data/sponsors";

export default function Sponsors() {
  // Duplicate array for infinite seamless marquee loop
  const marqueeSponsors = [...SPONSORS, ...SPONSORS];

  return (
    <section className="relative w-full py-20 md:py-32 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center bg-black text-white overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-black/80 to-black pointer-events-none" />

      {/* Main Container Frame Corner Brackets */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-white pointer-events-none" />
      <div className="absolute top-6 right-6 md:top-12 md:right-12 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-white pointer-events-none" />
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-white pointer-events-none" />
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-white pointer-events-none" />

      {/* Top SPONSORS Badge with Bracket Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative inline-block px-6 py-2 md:px-10 md:py-3 mb-8 md:mb-12"
      >
        {/* Inner Corner Brackets around SPONSORS label */}
        <span className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-white" />
        <span className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-white" />
        <span className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-white" />
        <span className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-white" />

        <h3 className="font-sans font-bold uppercase tracking-[0.25em] text-base sm:text-xl md:text-2xl text-white">
          SPONSORS
        </h3>
      </motion.div>

      {/* Main Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-sans font-black uppercase text-center text-white tracking-tight leading-[1.05] text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mb-14 md:mb-20 z-10"
      >
        <span className="block">POWERED BY</span>
        <span className="block">WORLD CLASS TEAMS</span>
        <span className="block">AND COMPANIES!</span>
      </motion.h2>

      {/* Sponsor Logos Infinite Marquee Row */}
      <div className="w-full relative z-10 overflow-hidden mask-gradient py-4">
        {/* Subtle Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div className="flex items-center gap-8 sm:gap-12 md:gap-16 px-4">
            {marqueeSponsors.map((sponsor, idx) => (
              <div
                key={`${sponsor.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center h-12 sm:h-16 md:h-20 max-w-[140px] sm:max-w-[180px] md:max-w-[220px] transition-all duration-300 hover:scale-105"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-full w-auto object-contain pointer-events-none drop-shadow-sm"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
