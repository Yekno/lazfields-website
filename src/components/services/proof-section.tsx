"use client";

import { motion } from "framer-motion";
import { ProofStrip } from "@/components/proof-strip";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const EVIDENCE = [
  {
    lead: "Senior-led",
    body: "Led by a PMP-certified founder with 20+ years of hands-on delivery experience.",
  },
  {
    lead: "Full lifecycle, integrated",
    body: "Breadth across 8 core sectors and 6 countries of delivery experience.",
  },
  {
    lead: "Trusted delivery",
    body: "A partner network spanning the UK, US, Europe and China, held to recognised professional standards.",
  },
] as const;

/**
 * Proof only — validates §2's promises without restating them. Ground is
 * navy-950 (darker than ProofStrip's own navy-900 panel) so the panel still
 * reads as a distinct element rather than disappearing into the section.
 */
export function ProofSection() {
  return (
    <section aria-labelledby="proof-heading" className="bg-navy-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            The Proof Behind the Promise
          </span>
          <h2
            id="proof-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Why Lazfields
          </h2>
        </motion.div>

        <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {EVIDENCE.map((item, i) => (
            <motion.div
              key={item.lead}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp(16)}
              transition={{ duration: 0.5, delay: i * 0.06, ease: SECTION_EASE }}
            >
              <dt className="font-display text-lg font-bold text-white">{item.lead}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</dd>
            </motion.div>
          ))}
        </dl>

        <ProofStrip />
      </div>
    </section>
  );
}
