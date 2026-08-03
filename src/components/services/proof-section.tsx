"use client";

import { motion } from "framer-motion";
import { ProofStrip } from "@/components/proof-strip";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const EVIDENCE = [
  {
    lead: "Senior-led",
    body: "Strategy and delivery sit with the same accountable leader — not split between a business-development team and a delivery team you never meet.",
  },
  {
    lead: "Complex-sector record",
    body: "FPSO topside modifications, nuclear power, and aviation and aerospace defence — sectors where there's no margin for an inexperienced team.",
  },
  {
    lead: "Trusted delivery",
    body: "A partner network spanning the UK, US, Europe and China, held to recognised professional standards.",
  },
] as const;

/**
 * Proof only — validates §2's promises without restating them. Ground is
 * paper, so ProofStrip's own navy-900 panel reads as the section's one dark
 * accent rather than blending into a dark section around it.
 */
export function ProofSection() {
  return (
    <section aria-labelledby="proof-heading" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
            Why Lazfields
          </span>
          <h2
            id="proof-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            The proof behind the promise
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
              <dt className="font-display text-lg font-bold text-ink">{item.lead}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</dd>
            </motion.div>
          ))}
        </dl>

        <ProofStrip />
      </div>
    </section>
  );
}
