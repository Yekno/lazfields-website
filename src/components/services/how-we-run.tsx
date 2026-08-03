"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const STAGES = [
  {
    label: "Mobilisation & Governance",
    body: "The team is stood up, roles are assigned and accountability is set from day one.",
  },
  {
    label: "Planning & Controls",
    body: "Schedule, cost and risk controls are established before work begins in earnest.",
  },
  {
    label: "Monitoring & Reporting",
    body: "A clear reporting cadence gives you visibility into progress, cost and risk throughout.",
  },
  {
    label: "Assurance & Handover",
    body: "Quality is assured against recognised standards, through to a clean, complete handover.",
  },
] as const;

/**
 * Photographic band reusing the approved PageHeader grayscale + heavy-navy-scrim
 * treatment (same gradient values), applied to a mid-page section rather than a header.
 */
export function HowWeRun() {
  return (
    <section aria-labelledby="how-we-run-heading" className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
      <Image
        src="/hero-pm.jpg"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover grayscale contrast-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(13,18,67,0.97) 0%, rgba(13,18,67,0.88) 45%, rgba(13,18,67,0.72) 100%), linear-gradient(to top, rgba(13,18,67,0.80) 0%, rgba(13,18,67,0.60) 55%, rgba(13,18,67,0.68) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            How We Run Your Project
          </span>
          <h2
            id="how-we-run-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            The governance behind every engagement
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Not a list of project stages — this is how we manage the work, and the visibility
            you can expect throughout.
          </p>
        </motion.div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, i) => (
            <motion.li
              key={stage.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp(16)}
              transition={{ duration: 0.5, delay: i * 0.06, ease: SECTION_EASE }}
              className="rounded-xl border border-white/15 p-6"
            >
              <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 font-display text-xs font-bold tabular-nums text-navy-950">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-base font-bold leading-snug text-white">
                {stage.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{stage.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
