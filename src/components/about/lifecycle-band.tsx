"use client";

import { motion } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const STAGES: { label: string; note?: string }[] = [
  { label: "Concept & Planning" },
  { label: "FEED & Design" },
  { label: "Procurement" },
  { label: "Construction & Installation" },
  { label: "Commissioning" },
  { label: "Operation Support" },
  { label: "Decommissioning", note: "where required" },
];

export function LifecycleBand() {
  return (
    <section aria-labelledby="lifecycle-heading" className="bg-mist py-20 sm:py-28">
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
            Full Lifecycle Support
          </span>
          <h2
            id="lifecycle-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            We support every stage of the project life cycle
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            From early concept and environmental studies through design, procurement,
            construction and commissioning — and, where required, safe decommissioning.
          </p>
        </motion.div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, i) => {
            // Continuity connector — a quiet tick into the gap toward the next
            // stage, desktop only (4 columns). Suppressed at the end of each row
            // and after the final stage, since there's nothing to connect to
            // there. Anchored to the card's own right edge (top-9 = the badge's
            // fixed vertical offset from the card top), so it holds regardless
            // of row height or wrapping — no cross-row pixel math required.
            const isLastInRow = (i + 1) % 4 === 0;
            const isLastStage = i === STAGES.length - 1;
            const showConnector = !isLastInRow && !isLastStage;

            return (
              <motion.li
                key={stage.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp(16)}
                transition={{ duration: 0.5, delay: i * 0.06, ease: SECTION_EASE }}
                className="relative flex flex-col rounded-xl border border-line bg-paper p-6"
              >
                {showConnector && (
                  <div
                    aria-hidden="true"
                    className="absolute left-full top-9 hidden h-px w-4 bg-gold-500/40 lg:block"
                  />
                )}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 font-display text-xs font-bold tabular-nums text-navy-950">
                  {i + 1}
                </span>
                <span className="mt-3 font-display text-base font-bold leading-snug text-ink">
                  {stage.label}
                </span>
                {stage.note && (
                  <span className="mt-1 text-xs font-medium uppercase tracking-wider text-ink/60">
                    {stage.note}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
