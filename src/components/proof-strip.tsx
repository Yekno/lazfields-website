"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

interface Stat {
  value: number | null;
  suffix?: string;
  display?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Years of Leadership Experience" },
  { value: 6, label: "Countries Delivered Across" },
  { value: 7, label: "Core Sectors Served" },
  { value: null, display: "PMP", label: "Certified Project Leadership" },
];

function useCountUp(target: number | null, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target === null) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
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
      className={`flex flex-col-reverse gap-1 px-2 py-6 lg:border-t-0 lg:px-8 lg:py-8 ${
        isSecondMobileRow ? "border-t border-white/15 lg:border-t-0" : ""
      }`}
    >
      <dt className="text-xs font-medium uppercase tracking-wider text-white/70">
        {stat.label}
      </dt>
      <dd className="font-display text-3xl font-bold text-gold-500 sm:text-4xl">{display}</dd>
    </div>
  );
}

export function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp(16)}
      transition={{ duration: 0.5, ease: SECTION_EASE }}
      className="mt-16 rounded-2xl bg-navy-900 px-6 sm:px-10"
    >
      <dl className="grid grid-cols-2 gap-y-6 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-white/15">
        {STATS.map((stat, i) => (
          <StatUnit key={stat.label} stat={stat} active={inView} index={i} />
        ))}
      </dl>
    </motion.div>
  );
}
