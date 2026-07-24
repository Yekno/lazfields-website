"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAPABILITIES } from "@/lib/site-data";
import { SectionHeader } from "@/components/section-header";
import { ProofStrip } from "@/components/proof-strip";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-heading" className="bg-paper py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          id="capabilities-heading"
          eyebrow="Our Capabilities"
          title="Complete project delivery, engineered for certainty"
          paragraph="We bring together engineering, procurement, construction and project management under one accountable team — supporting every stage of the project lifecycle with robust systems, reliable data and proven delivery methods. Each engagement is tailored to your objectives, technical requirements, budget and programme."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ Icon, title, description }, i) => (
            <motion.li
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp(20)}
              transition={{ duration: 0.5, delay: i * 0.08, ease: SECTION_EASE }}
            >
              <div className="flex h-full flex-col rounded-xl border border-line bg-paper p-8 shadow-card">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900">
                    <Icon
                      size={22}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="text-gold-500"
                    />
                  </div>
                  <span aria-hidden="true" className="text-xs font-medium tabular-nums text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* No reservation at base: single-column layout, each card stands alone.
                    From sm up, cards sit side by side, so the longest title
                    ("Engineering Design & Technical Consultancy") is reserved at its
                    measured 2-line height to keep descriptions aligned across the row. */}
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink sm:min-h-[3.25rem]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{description}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <ProofStrip />

        <p className="mt-10 font-display text-lg font-semibold text-ink">
          Ready to scope your next project?
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2"
          >
            See All Services
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-navy-900/60 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2"
          >
            Discuss Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
