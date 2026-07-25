"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

interface ContactCtaProps {
  heading?: string;
}

/**
 * Opt-in closing CTA for content pages, placed above the Footer.
 * Do not render on Home (Capabilities already closes it) or Contact
 * (redundant there). The Footer itself carries no page-awareness.
 */
export function ContactCta({ heading = "Ready to discuss your next project?" }: ContactCtaProps) {
  return (
    <section className="bg-navy-900 py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          {heading}
        </motion.h2>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
        >
          Talk to Us
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
