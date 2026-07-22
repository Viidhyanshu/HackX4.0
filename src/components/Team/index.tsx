"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NetflixCurtainBackground from "@/components/NetflixCurtainBackground/NetflixCurtainBackground";
import { TeamCard } from "./TeamCard";
import { TEAM_MEMBERS } from "@/data/team";

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── scroll progress through the tall container ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale: 1 → 45
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 45]);
  // Opacity: visible → gone
  const heroOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
  // Blur: 0px → 20px
  const heroBlur = useTransform(scrollYProgress, [0.25, 0.55], ["blur(0px)", "blur(20px)"]);

  /* ── Staggered Team grid transforms ── */
  const labelOpacity = useTransform(scrollYProgress, [0.40, 0.54], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.40, 0.54], [40, 0]);

  // Hook transforms for team members
  const cardOpacity0 = useTransform(scrollYProgress, [0.43, 0.57], [0, 1]);
  const cardOpacity1 = useTransform(scrollYProgress, [0.46, 0.60], [0, 1]);
  const cardOpacity2 = useTransform(scrollYProgress, [0.49, 0.63], [0, 1]);
  const cardOpacity3 = useTransform(scrollYProgress, [0.52, 0.66], [0, 1]);

  const cardY0 = useTransform(scrollYProgress, [0.43, 0.57], [60, 0]);
  const cardY1 = useTransform(scrollYProgress, [0.46, 0.60], [60, 0]);
  const cardY2 = useTransform(scrollYProgress, [0.49, 0.63], [60, 0]);
  const cardY3 = useTransform(scrollYProgress, [0.52, 0.66], [60, 0]);

  const cardOpacities = [cardOpacity0, cardOpacity1, cardOpacity2, cardOpacity3];
  const cardYs = [cardY0, cardY1, cardY2, cardY3];

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
    <div ref={containerRef} className="relative" style={{ height: "700vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent">
        <NetflixCurtainBackground scrollYProgress={scrollYProgress} />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 select-none z-10"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            filter: heroBlur,
            transformOrigin: "54% 61%",
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

        <div className="absolute inset-0 flex items-center justify-center z-20 px-6 md:px-12 bg-transparent overflow-y-auto py-12">
          <div className="w-full max-w-5xl my-auto">
            {/* Section label */}
            <motion.p
              className="text-center text-[#FAF8F5]/50 text-sm md:text-base tracking-[0.3em] uppercase font-sans font-medium mb-6 md:mb-8"
              style={{ opacity: labelOpacity, y: labelY }}
            >
              The Team
            </motion.p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.id || member.name}
                  style={{
                    opacity: cardOpacities[i] || 1,
                    y: cardYs[i] || 0,
                  }}
                >
                  <TeamCard member={member} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
