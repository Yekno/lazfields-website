"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";
import { SECTORS } from "@/lib/site-data";

interface Stat {
  value: number | null;
  suffix?: string;
  // An array renders as stacked lines within the one cell.
  display?: string | string[];
  label: string;
}

const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Years of Leadership Experience" },
  { value: 6, label: "Countries Delivered Across" },
  // Derived, not hard-coded: this figure and the hero/About sector strips must
  // never disagree. Previously a literal 8, which silently drifted the moment
  // SECTORS changed.
  { value: SECTORS.length, label: "Core Sectors Served" },
  // Two accrediting bodies share one cell so the strip stays a 4-column grid.
  // Stacked rather than set on one line: "PMI · APM" needs 165.8px, which the
  // cell cannot give below 1100px on desktop or below 412px on mobile, so it
  // broke mid-value. Stacked, the widest token is "APM" at 77.9px against
  // 96px at the narrowest supported viewport.
  { value: null, display: ["PMI", "APM"], label: "Certified Project Management Leadership" },
];

function useCountUp(target: number | null, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target === null) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion uses a zero-length "animation" so the value still lands on
    // target — set inside the rAF callback rather than synchronously in the effect.
    const effectiveDuration = prefersReduced ? 0 : duration;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress =
        effectiveDuration === 0 ? 1 : Math.min((now - start) / effectiveDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatUnit({
  stat,
  active,
  index,
}: {
  stat: Stat;
  active: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, active);
  const display = stat.value !== null ? `${count}${stat.suffix ?? ""}` : stat.display;
  const isSecondMobileRow = index >= 2;

  return (
    <div
      // Was flex-col-reverse, which bottom-packs each cell independently, so a
      // label wrapping to two lines lifted its own value above its neighbours'.
      // Subgrid puts every value in one shared row and every label in another,
      // so neither can drift. `self-end` keeps single-line values sitting on
      // the same baseline as the last line of the stacked one.
      className={`row-span-2 grid grid-rows-subgrid gap-1 px-2 py-6 lg:border-t-0 lg:px-8 lg:py-8 ${
        isSecondMobileRow ? "mt-6 border-t border-white/15 lg:mt-0 lg:border-t-0" : ""
      }`}
    >
      <dt className="row-start-2 text-xs font-medium uppercase tracking-wider text-white/70">
        {stat.label}
      </dt>
      <dd className="row-start-1 self-end font-display text-3xl font-bold text-gold-500 sm:text-4xl">
        {Array.isArray(display)
          ? display.map((line, i) => (
              // The leading space keeps the accessible text "PMI APM" rather
              // than "PMIAPM"; it collapses at the start of a block line, so
              // it costs nothing visually.
              <span key={line} className="block">
                {i > 0 ? " " : null}
                {line}
              </span>
            ))
          : display}
      </dd>
    </div>
  );
}

export function ProofStrip() {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => setInView(true)}
      variants={fadeUp(16)}
      transition={{ duration: 0.5, ease: SECTION_EASE }}
      className="mt-16 rounded-2xl bg-navy-900 px-6 sm:px-10"
    >
      <dl className="grid grid-cols-2 grid-rows-[repeat(4,auto)] gap-y-1 lg:grid-cols-4 lg:grid-rows-[auto_auto] lg:divide-x lg:divide-white/15">
        {STATS.map((stat, i) => (
          <StatUnit key={stat.label} stat={stat} active={inView} index={i} />
        ))}
      </dl>
    </motion.div>
  );
}
