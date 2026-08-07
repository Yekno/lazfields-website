"use client";

import { motion } from "framer-motion";
import type { Policy } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

interface PolicyCardProps extends Policy {
  /** Position in the grid — drives the staggered reveal. */
  index: number;
}

/**
 * A single policy area, shared by the homepage preview (`PoliciesPreview`) and
 * the full Policies page (`PoliciesContent`). Both surfaces read the same
 * POLICIES array, so the card is defined once and composed rather than
 * duplicated: the two sections are expected to diverge in content depth, not
 * in card treatment.
 *
 * Renders as an <li> — only ever mount this inside a <ul> or <ol>.
 */
export function PolicyCard({ Icon, title, description, index }: PolicyCardProps) {
  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp(20)}
      transition={{ duration: 0.5, delay: index * 0.1, ease: SECTION_EASE }}
      className="rounded-xl border border-line bg-paper p-8 shadow-card"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900">
        <Icon size={22} className="text-gold-500" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{description}</p>
    </motion.li>
  );
}
