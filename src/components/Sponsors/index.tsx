"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPONSORS } from "@/data/sponsors";

export default function Sponsors() {
  // Duplicate array for infinite seamless marquee loop
  const marqueeSponsors = [...SPONSORS, ...SPONSORS];

  return (
    <section className="relative w-full -mt-12 md:-mt-24 pt-0 pb-16 md:pb-24 px-4 sm:px-8 md:px-16 flex flex-col items-center justify-center bg-transparent text-white overflow-hidden select-none">
      {/* Top SPONSORS Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 md:mb-8"
      >
        <h3 className="font-sans font-bold uppercase tracking-[0.25em] text-sm sm:text-base md:text-xl text-white/90">
          SPONSORS
        </h3>
      </motion.div>

      {/* Main Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-sans font-black uppercase text-center text-white tracking-tight leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mb-10 md:mb-14 z-10"
      >
        <span className="block">POWERED BY</span>
        <span className="block">WORLD CLASS TEAMS</span>
        <span className="block">AND COMPANIES!</span>
      </motion.h2>

      {/* Sponsor Logos Infinite Marquee Row */}
      <div className="w-full relative z-10 overflow-hidden mask-gradient py-4">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div className="flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4">
            {marqueeSponsors.map((sponsor, idx) => (
              <div
                key={`${sponsor.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center h-6 sm:h-8 md:h-10 lg:h-12 max-w-[100px] sm:max-w-[130px] md:max-w-[160px] transition-all duration-300 hover:scale-105"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-6 sm:h-8 md:h-10 lg:h-12 max-h-full w-auto object-contain pointer-events-none brightness-105 drop-shadow-sm"
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
