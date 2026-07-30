"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

/**
 * Vision statement on navy ground. Renders immediately above <ContactCta />,
 * which is also navy — together they read as one closing crescendo.
 */
export function AboutVision() {
  return (
    <section aria-labelledby="vision-heading" className="bg-navy-900 pt-20 pb-4 sm:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Our Vision
          </span>
          <h2
            id="vision-heading"
            className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl"
          >
            To become a trusted leader in delivering sustainable solutions for the global
            energy and civil construction sectors — because collaboration, openness and
            innovation are how higher standards are set and new challenges solved.
          </h2>
          <Link
            href="/services"
            className="group mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-gold-500 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
          >
            Explore our services
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
