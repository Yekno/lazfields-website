"use client";

import { motion } from "framer-motion";
import { CAPABILITIES, SERVICE_DETAILS } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

export function ServiceDepth() {
  return (
    <section aria-labelledby="service-depth-heading" className="bg-mist py-20 sm:py-28">
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
            Service Depth
          </span>
          <h2
            id="service-depth-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            How each service solves a real problem
          </h2>
        </motion.div>

        <div className="mt-12">
          {CAPABILITIES.map(({ Icon, title }, i) => {
            const detail = SERVICE_DETAILS[title];
            if (!detail) return null;
            const number = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={title}
                id={`service-${detail.slug}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp(16)}
                transition={{ duration: 0.5, delay: i * 0.04, ease: SECTION_EASE }}
                className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0 lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 lg:py-10"
              >
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" className="text-gold-500" />
                  </div>
                  <div>
                    <span aria-hidden="true" className="block text-xs font-medium tabular-nums text-ink/30">
                      {number}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-snug text-ink">{title}</h3>
                  </div>
                </div>

                <dl className="mt-5 grid gap-5 sm:grid-cols-3 lg:mt-0">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/50">
                      The Risk
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">{detail.depth.risk}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/50">
                      Our Approach
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">{detail.depth.approach}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/50">
                      Continuity Advantage
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">{detail.depth.advantage}</dd>
                  </div>
                </dl>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
