"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./WhyHackX.module.css";

gsap.registerPlugin(ScrollTrigger);

// How much scroll distance (in vh) is dedicated to each item's "turn" as the
// active/expanded one, and how much extra empty scroll to leave at the end
// (once everything is collapsed) before the section releases and the page
// moves on. Tune these to taste.
const ITEM_VH = 95;
const BUFFER_VH = 70;

// How much of the *preceding* item's scroll window (in vh) is spent sliding
// the next item up into place. The reveal is a continuous function of
// scroll position across this whole span -- not a snap -- so the item is
// genuinely visible (partially faded/offset) the entire time it travels.
const ENTRANCE_VH = 65;

// How far below its resting spot a "not yet arrived" item starts, as a
// fraction of the viewport height. This is what makes it originate from
// the actual bottom edge of the screen (like lenis.dev) instead of from
// somewhere already inside the stage -- recomputed on resize.
const ENTRANCE_OFFSET_VH_FRACTION = 0.8;
const ENTRANCE_OFFSET_MIN_PX = 480;

// How aggressively the animated progress chases the raw scroll progress
// each frame (lower = smoother/heavier, higher = snappier/more literal).
const SMOOTHING = 0.12;

const ITEMS = [
  {
    id: "01",
    title: "COLLABORATE & SKILL UP",
    description:
      "Connect with brilliant developers, designers, and innovators. Form high-performance teams, master cutting-edge technologies under intense hackathon pressure, and build impactful real-world projects that stand out in your portfolio.",
  },
  {
    id: "02",
    title: "WIN EXCITING PRIZES",
    description:
      "Compete for a massive prize pool. The top three overall teams and the best projects in each specialized domain will walk away with premium tech gadgets, developer grants, and exclusive sponsor rewards.",
  },
  {
    id: "03",
    title: "ENGAGING WORKSHOPS",
    description:
      "Participate in live hands-on coding bootcamps, tech talks, and interactive mini-challenges. Learn directly from platform architects and developer experts who build the tools you use every day.",
  },
  {
    id: "04",
    title: "MENTORSHIP SESSIONS",
    description:
      "Receive direct 1-on-1 feedback and technical reviews from industry leaders, engineering directors, and seasoned developers. Refine your system architecture and perfect your pitch before the final judging rounds.",
  },
  {
    id: "05",
    title: "RECRUITMENT OFFERS",
    description:
      "Showcase your coding skills, problem-solving speed, and teamwork to sponsor companies. Top-performing hackers will receive exclusive interview invites, fast-tracked internship opportunities, and full-time role offers.",
  },
  {
    id: "06",
    title: "EXPAND NETWORK",
    description:
      "Engage with startup founders, venture capitalists, community leaders, and peers from across the country. Build lasting professional relationships and discover collaborators for your next big venture.",
  },
];

const TOTAL_VH = ITEMS.length * ITEM_VH + BUFFER_VH;
const ACTIVE_WINDOW = (ITEMS.length * ITEM_VH) / TOTAL_VH; // fraction of scroll before the buffer/hold zone

const easeOut = gsap.parseEase("power2.out");

export default function WhyHackX() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  // Refs to each item's wrapper -- the entrance animation writes directly to
  // these via GSAP, imperatively, on every scroll tick. It deliberately does
  // NOT go through React state/inline-style, so nothing else re-rendering
  // (e.g. hover) can ever stomp on it mid-animation.
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Which item is currently "active" (fully expanded) -- only used for the
  // title-dim / description-expand treatment, not for entrance visibility.
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );

        // Single source of truth for both the discrete "active item" state
        // and the continuous per-item entrance. `currentProgress` eases
        // toward the raw scroll progress every animation frame (via
        // gsap.ticker), which is what makes the reveal feel weighted and
        // smooth instead of mechanically snapping to the scroll position.
        let targetProgress = 0;
        let currentProgress = 0;
        let lastActiveIndex: number | null = 0;
        let offsetPx = Math.max(
          window.innerHeight * ENTRANCE_OFFSET_VH_FRACTION,
          ENTRANCE_OFFSET_MIN_PX
        );

        const applyFrame = () => {
          currentProgress += (targetProgress - currentProgress) * SMOOTHING;
          if (Math.abs(targetProgress - currentProgress) < 0.0005) {
            currentProgress = targetProgress;
          }
          const p = currentProgress;

          // Discrete: which item is the active/expanded one right now.
          const nextActive =
            p >= ACTIVE_WINDOW
              ? null
              : Math.min(
                  ITEMS.length - 1,
                  Math.max(0, Math.floor((p / ACTIVE_WINDOW) * ITEMS.length))
                );
          if (nextActive !== lastActiveIndex) {
            lastActiveIndex = nextActive;
            setActiveIndex(nextActive);
          }

          // Continuous: every item's entrance is a direct function of `p`,
          // so scrubbing forward or backward at any speed always renders
          // the correct in-between frame -- there is no scroll speed at
          // which an item can skip straight from hidden to arrived.
          // Position only -- opacity is never touched here, so color/
          // brightness stays constant while an item travels (no fade), and
          // the "dimmed vs active" look stays purely a function of the
          // title's own opacity, identical for every item regardless of
          // where it is in its entrance.
          ITEMS.forEach((_, i) => {
            const el = itemRefs.current[i];
            if (!el) return;

            const revealEnd =
              i === 0 ? ENTRANCE_VH / TOTAL_VH : (i * ITEM_VH) / TOTAL_VH; // item 0 gets its own reveal window at the very top; the rest reveal exactly when they become active
            const revealStart = Math.max(0, revealEnd - ENTRANCE_VH / TOTAL_VH);
            const span = revealEnd - revealStart || 1;
            const t = easeOut(Math.min(1, Math.max(0, (p - revealStart) / span)));

            gsap.set(el, { y: offsetPx * (1 - t) });
          });
        };

        const st = ScrollTrigger.create({
          trigger: spacerRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            targetProgress = self.progress;
          },
          onRefresh: (self) => {
            offsetPx = Math.max(
              window.innerHeight * ENTRANCE_OFFSET_VH_FRACTION,
              ENTRANCE_OFFSET_MIN_PX
            );
            targetProgress = self.progress;
            currentProgress = self.progress;
            applyFrame();
          },
        });

        // Initialize immediately so nothing waits for the first scroll
        // event (handles page loads that land mid-scroll, etc).
        targetProgress = st.progress;
        currentProgress = st.progress;
        applyFrame();

        gsap.ticker.add(applyFrame);

        return () => {
          gsap.ticker.remove(applyFrame);
        };
      });

      mm.add("(max-width: 768px)", () => {
        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, { scaleY: 1 });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent text-[#FAF8F5] py-20 md:py-0"
    >
      <div className="max-w-[1300px] mx-auto w-full flex flex-col md:flex-row items-start justify-center px-6 md:px-12 md:pl-24 lg:pl-36 gap-16 md:gap-24 lg:gap-32">
        {/* Left Column: Sticky Title (unchanged) */}
        <div className="w-full md:w-auto md:sticky md:top-0 md:h-screen flex items-center justify-start select-none flex-shrink-0">
          <div className="flex items-stretch gap-6 md:gap-8">
            <div className="w-[3px] bg-white/10 rounded-full relative overflow-hidden flex-shrink-0 my-[-24px]">
              <div
                ref={progressLineRef}
                className="absolute top-0 left-0 w-full h-full bg-[#8c19be] shadow-[0_0_15px_#ff7695] origin-top"
              />
            </div>
            <div className="flex flex-col font-anton tracking-normal uppercase leading-[0.9] text-[10vw] md:text-[6.66vw] text-white scale-x-[0.9] origin-left">
              <span>WHY</span>
              <span>CHOOSE</span>
              <span>HACKX?</span>
            </div>
          </div>
        </div>

        {/* Right Column: tall scroll spacer that pins the stage below it */}
        <div
          ref={spacerRef}
          className={`${styles.scrollSpacer} relative w-full md:w-[600px] flex-shrink-0`}
          style={{ height: `${TOTAL_VH}vh` }}
        >
          <div
            className={`${styles.stage} md:sticky md:top-0 md:h-screen w-full flex flex-col justify-center items-start gap-5 md:gap-6 py-16 md:py-0`}
          >
            {ITEMS.map((item, i) => {
              const expanded = hoveredIndex !== null ? hoveredIndex === i : activeIndex === i;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={`${styles.itemWrap} w-full`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <h3
                    className={`${styles.title} font-sans font-semibold uppercase tracking-[-0.02em] text-xl md:text-2xl lg:text-[2rem] leading-snug cursor-default ${
                      expanded ? "text-[#ff7695] opacity-100" : "text-[#ff7695] opacity-50"
                    }`}
                    style={{ wordSpacing: "0.06em" }}
                  >
                    {item.title}
                  </h3>

                  <div className={styles.cardDesc} data-expanded={expanded}>
                    <div className={styles.cardDescInner} data-expanded={expanded}>
                      <p
                        className={`${styles.descText} pt-3 md:pt-4 font-sans font-normal text-white/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-[600px]`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}