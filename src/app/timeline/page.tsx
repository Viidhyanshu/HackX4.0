"use client";

import React from "react";
import Timeline from "@/components/Timeline";

export default function TimelinePage() {
  return (
    <div className="relative w-full min-h-screen bg-transparent pt-24">
      {/* Title section for the Timeline Page */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-12 pb-6 select-none animate-[fadeIn_1s_ease-out]">
        <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wider mb-4">
          Event Timeline
        </h1>
        <p className="font-sans text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Follow the journey of HackX 4.0. Scroll down to trace each milestone along the curved path of innovation.
        </p>
      </div>

      <Timeline />
    </div>
  );
}
