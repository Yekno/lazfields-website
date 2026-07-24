"use client";

import { motion } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  paragraph: string;
}

export function SectionHeader({ id, eyebrow, title, paragraph }: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp(16)}
      transition={{ duration: 0.5, ease: SECTION_EASE }}
      className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-12"
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
          {eyebrow}
        </span>
        <h2
          id={id}
          className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
        {paragraph}
      </p>
    </motion.div>
  );
}
