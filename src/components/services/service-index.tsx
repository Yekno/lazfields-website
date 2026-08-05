"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CAPABILITIES, ENGAGEMENT_MODES, SERVICE_DETAILS } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const FOCUS_RING_GOLD =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-2xl";

export function ServiceIndex() {
  return (
    <section aria-labelledby="service-index-heading" className="bg-paper py-20 sm:py-28">
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
            How You Can Engage Us
          </span>
          <h2
            id="service-index-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Three ways to work with an integrated delivery team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            Choose the level of involvement that suits your project — every route draws on the
            same accountable, senior-led team.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-14">
          {ENGAGEMENT_MODES.map((mode, modeIndex) => (
            <motion.div
              key={mode.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp(16)}
              transition={{ duration: 0.5, delay: modeIndex * 0.06, ease: SECTION_EASE }}
            >
              <h3 className="font-display text-2xl font-bold text-ink">{mode.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{mode.description}</p>

              {mode.leadElement && (
                <div className="mt-6 rounded-xl border border-line p-6 sm:p-8">
                  <h4 className="font-display text-base font-bold text-ink">
                    {mode.leadElement.title}
                  </h4>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70">
                    {mode.leadElement.body}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {mode.leadElement.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        {i > 0 && (
                          <span aria-hidden="true" className="h-px w-4 bg-gold-500/60" />
                        )}
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {mode.services.map((title) => {
                  const capability = CAPABILITIES.find((c) => c.title === title);
                  const detail = SERVICE_DETAILS[title];
                  if (!capability || !detail) return null;

                  const number = String(
                    CAPABILITIES.findIndex((c) => c.title === title) + 1
                  ).padStart(2, "0");
                  const Icon = capability.Icon;

                  return (
                    <li key={title}>
                      <a
                        href={`#service-${detail.slug}`}
                        className={`group relative flex h-full flex-col rounded-2xl bg-navy-900 p-6 transition-colors hover:bg-navy-800 focus-visible:bg-navy-800 ${FOCUS_RING_GOLD}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                            <Icon size={20} strokeWidth={1.75} aria-hidden="true" className="text-gold-500" />
                          </div>
                          <span aria-hidden="true" className="text-xs font-medium tabular-nums text-white/45">
                            {number}
                          </span>
                        </div>

                        <h4 className="mt-4 font-display text-base font-bold leading-snug text-white">
                          {title}
                        </h4>

                        <p className="mt-2 text-sm leading-relaxed text-white/70 opacity-100 transition-opacity duration-200 sm:can-hover:opacity-0 sm:can-hover:group-hover:opacity-100 sm:can-hover:group-focus-visible:opacity-100">
                          {detail.teaser}
                        </p>

                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-gold-500">
                          See how
                          <ArrowRight size={12} aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
