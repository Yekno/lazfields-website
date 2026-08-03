"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SECTORS } from "@/lib/site-data";

const SLIDES = [
  {
    tag: "EPCI Services",
    lines: ["Engineering, Procurement,", "Construction & Installation"],
    description:
      "Full EPCI delivery across construction, energy, oil & gas, nuclear power, pharmaceutical, highways and marine sectors.",
    image: "/hero-epci.jpg",
  },
  {
    tag: "Delivery Certainty",
    lines: ["Project Management", "Consultancy"],
    description:
      "Portfolio, programme and project controls with disciplined planning, scheduling, monitoring and reporting.",
    image: "/hero-pm.jpg",
  },
  {
    tag: "Full Lifecycle Support",
    lines: ["From Concept to", "Commissioning"],
    description:
      "Supporting every stage of the project lifecycle — FEED, design, procurement, construction, commissioning and decommissioning.",
    image: "/hero-commissioning.jpg",
  },
] as const;

const AUTOPLAY_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[index];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy-900 pt-24 pb-14"
    >
      <AnimatePresence mode="sync">
        {SLIDES.map(
          (s, i) =>
            i === index && (
              <motion.div
                key={s.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0 -z-20"
              >
                <Image
                  src={s.image}
                  alt={s.tag}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover grayscale contrast-[1.05]"
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(13,18,67,0.95) 0%, rgba(13,18,67,0.82) 32%, rgba(13,18,67,0.45) 62%, rgba(13,18,67,0.15) 85%), linear-gradient(to top, rgba(13,18,67,0.9) 0%, rgba(13,18,67,0.15) 35%, rgba(13,18,67,0.35) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 lg:px-8">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F1CC01]/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F1CC01]">
                {slide.tag}
              </span>

              <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                {slide.lines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < slide.lines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Explore Our Services
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Talk to Us
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-xs font-medium tabular-nums text-white/60">
              0{index + 1} / 0{SLIDES.length}
            </span>
            <div className="flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group relative h-1.5 w-8 overflow-hidden rounded-full bg-white/20"
                >
                  {i === index && (
                    <motion.span
                      layoutId="hero-dot"
                      className="absolute inset-0 rounded-full bg-gold-500"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="rounded-full border border-white/25 p-1.5 text-white/70 transition-colors hover:border-white/50 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="rounded-full border border-white/25 p-1.5 text-white/70 transition-colors hover:border-white/50 hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-wider text-white/55">
            {SECTORS.map((sector, i) => (
              <span key={sector} className="flex items-center gap-3">
                {sector}
                {i < SECTORS.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-[#F1CC01]/60" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
