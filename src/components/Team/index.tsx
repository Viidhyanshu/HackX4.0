"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ────────────────────────────────────────────
   Team member data
   ──────────────────────────────────────────── */
const TEAM_MEMBERS = [
  { name: "Aryan Verma", role: "Organizer", initials: "AV" },
  { name: "Samaksh Gupta", role: "Organizer", initials: "SG" },
  { name: "Tamanna Yadav", role: "Organizer", initials: "TY" },
  { name: "Harshada Chandel", role: "Organizer", initials: "HC" },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── scroll progress through the tall container ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Hero text transforms (scroll 0 → 0.6) ── */
  // Scale: 1 → 45 (zooms massively into the M, spread over more scroll)
  const heroScale = useTransform(scrollYProgress, [0, 0.55], [1, 45]);
  // Opacity: visible → gone
  const heroOpacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  // Curtains fade out
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.35], [0.85, 0]);

  /* ── Team grid transforms (scroll 0.55 → 0.8) ── */
  const teamOpacity = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);
  const teamY = useTransform(scrollYProgress, [0.52, 0.72], [80, 0]);

  /* ── Entry animations ── */
  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, delay: 0.7, ease: "easeOut" },
    },
  };

  return (
    /* The tall scroll container – 700vh gives enough room for
       the zoom-in + team reveal + breathing space */
    <div ref={containerRef} className="relative" style={{ height: "700vh" }}>
      {/* ════════════════════════════════════════════════
          STICKY VIEWPORT – everything stays pinned while
          the user scrolls through the 700vh container
          ════════════════════════════════════════════════ */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#090416]">
        {/* ── Curtain glows (fade with scroll) ── */}
        <motion.div
          className="absolute inset-y-0 left-0 w-[40vw] md:w-[35vw] pointer-events-none select-none z-0"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, #080014 5%, #23004a 12%, #5000a3 20%, #7801FF 28%, #D242D7 34%, #B86EF9 38%, #E1E1F5 42%, #B86EF9 48%, #D242D7 55%, #7801FF 63%, #23004a 72%, #080014 82%, #090416 100%)",
            filter: "blur(18px) contrast(1.15) saturate(1.3)",
            opacity: curtainOpacity,
          }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 w-[40vw] md:w-[35vw] pointer-events-none select-none z-0"
          style={{
            background:
              "linear-gradient(to left, #000000 0%, #080014 5%, #23004a 12%, #5000a3 20%, #7801FF 28%, #D242D7 34%, #B86EF9 38%, #E1E1F5 42%, #B86EF9 48%, #D242D7 55%, #7801FF 63%, #23004a 72%, #080014 82%, #090416 100%)",
            filter: "blur(18px) contrast(1.15) saturate(1.3)",
            opacity: curtainOpacity,
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090416]/40 to-[#090416]/90 pointer-events-none z-0" />

        {/* ════════════════════════════════════════════════
            HERO HEADING – scales into the M on scroll
            ════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 select-none z-10"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            /* The transform-origin is shifted slightly left & up
               to target the "M" in "TEAM MUJ" */
            transformOrigin: "58% 42%",
          }}
        >
          <div className="relative flex flex-col items-center justify-center max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw]">
            {/* Subtitle */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 md:mb-8 pointer-events-auto"
            >
              <span className="text-[#FAF8F5]/60 text-2xl md:text-3xl lg:text-4xl font-serif italic tracking-wide">
                Meet The Humans Behind The Curtains
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center font-sans font-black uppercase tracking-normal leading-[0.98] text-center"
              style={{ fontSize: "clamp(2.5rem, 8.5vw, 8.8rem)" }}
            >
              <div className="overflow-hidden py-1 md:py-2">
                <motion.span
                  variants={lineVariants}
                  className="block origin-bottom font-extrabold text-[#FAF8F5]"
                >
                  TEAM MUJ
                </motion.span>
              </div>
              <div className="overflow-hidden py-1 md:py-2">
                <motion.span
                  variants={lineVariants}
                  className="block origin-bottom text-[#FAF8F5] font-extrabold"
                >
                  HACKX 4.0
                </motion.span>
              </div>
            </motion.h1>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════
            TEAM MEMBERS GRID – fades in after zoom
            ════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 px-6 md:px-12"
          style={{ opacity: teamOpacity, y: teamY }}
        >
          <div className="w-full max-w-6xl">
            {/* Section label */}
            <motion.p
              className="text-center text-[#FAF8F5]/50 text-sm md:text-base tracking-[0.3em] uppercase font-sans font-medium mb-10 md:mb-14"
              style={{ opacity: teamOpacity }}
            >
              The Team
            </motion.p>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="group relative flex flex-col items-center text-center p-5 md:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-[#7801FF]/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(120,1,255,0.08)]"
                  style={{ opacity: teamOpacity }}
                >
                  {/* Avatar circle with initials */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, #7801FF ${20 + i * 5}%, #D242D7 ${60 + i * 3}%, #B86EF9 100%)`,
                    }}
                  >
                    <span className="text-white font-bold text-lg md:text-xl tracking-wide">
                      {member.initials}
                    </span>
                    {/* Subtle shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                  </div>

                  {/* Name */}
                  <h3 className="text-[#FAF8F5] text-sm md:text-base font-semibold tracking-wide mb-1 transition-colors duration-300 group-hover:text-white">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-[#FAF8F5]/40 text-xs md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 group-hover:text-[#B86EF9]/70">
                    {member.role}
                  </p>

                  {/* Hover glow accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#7801FF] to-transparent transition-all duration-500 group-hover:w-3/4" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll hint (visible only at the very top) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
        >
          <span className="text-[#FAF8F5]/30 text-xs tracking-[0.2em] uppercase font-sans">
            Scroll to explore
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border border-[#FAF8F5]/20 flex items-start justify-center p-1.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-[#FAF8F5]/50"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
