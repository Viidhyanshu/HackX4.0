"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ThreeSteps() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Apply Online",
      desc: "Fill out our quick application form to share your profile, experience, and motivation.",
      color: "from-[#D242D7] to-[#B86EF9]",
    },
    {
      num: "02",
      title: "Get Shortlisted",
      desc: "Our team will review your application and conduct a brief onboarding discussion.",
      color: "from-[#B86EF9] to-[#7801FF]",
    },
    {
      num: "03",
      title: "Lead & Earn",
      desc: "Promote HackX 4.0 on your campus, help teams register, and claim exclusive rewards.",
      color: "from-[#7801FF] to-[#D242D7]",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-transparent overflow-hidden select-none">
      {/* Background Soft Glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none filter blur-[150px] opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-violet, #7801FF) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full pointer-events-none filter blur-[150px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--color-magenta, #D242D7) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1250px] mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-20 md:gap-12">
        {/* Left Column: Stacked Interactive Cards */}
        <div 
          ref={containerRef}
          className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[460px] flex items-center justify-center"
        >
          {steps.map((step, idx) => {
            // Card visual offset positions
            let xOffset = 0;
            let yOffset = 0;
            let rotation = 0;

            if (idx === 0) {
              xOffset = isMobile ? -25 : -50;
              yOffset = isMobile ? -20 : -35;
              rotation = -6;
            } else if (idx === 1) {
              xOffset = 0;
              yOffset = 0;
              rotation = -3;
            } else {
              xOffset = isMobile ? 25 : 50;
              yOffset = isMobile ? 20 : 35;
              rotation = 0;
            }

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 0, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: xOffset,
                  y: yOffset,
                  rotate: rotation,
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.05,
                  x: xOffset * 1.1,
                  y: yOffset * 1.1,
                  rotate: rotation,
                  zIndex: 50,
                  boxShadow: "0 25px 50px rgba(184, 110, 249, 0.25)",
                  borderColor: "rgba(184, 110, 249, 0.35)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  delay: idx * 0.15,
                }}
                className="absolute inset-0 rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col justify-between cursor-pointer origin-center transition-colors duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                  backdropFilter: "blur(20px)",
                  zIndex: 10 + idx,
                }}
              >
                {/* Top of Card: Step Number */}
                <div className="flex justify-between items-start">
                  <span className={`font-sans font-black text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r ${step.color} select-none`}>
                    {step.num}
                  </span>
                  
                  {/* Subtle HackX Logo Watermark */}
                  <div className="opacity-10 w-12 h-12 relative pointer-events-none select-none">
                    <Image
                      src="/assets/logos/HACKX White@2x.png"
                      alt="HackX watermark"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Bottom of Card: Step Content */}
                <div className="flex flex-col gap-2 mt-auto">
                  <h4 className="font-sans font-black text-xl md:text-2xl uppercase tracking-wide text-white leading-tight">
                    {step.title}
                  </h4>
                  <p className="font-sans text-white/60 text-xs md:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Heading Text */}
        <div className="flex-1 max-w-[600px] text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <h2 className="font-sans font-black uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-normal leading-[1.0] flex flex-col gap-2">
              <span>CAMPUS</span>
              <span>AMBASSADOR</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D242D7] via-[#B86EF9] to-white/95 leading-[1.1] pb-1">
                IN 3 SIMPLE STEPS
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
