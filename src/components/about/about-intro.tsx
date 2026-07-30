"use client";

import { motion } from "framer-motion";
import { SECTORS } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const OUTCOMES = [
  {
    lead: "Clear visibility",
    body: "of project activities, tasks and issues at every stage.",
  },
  {
    lead: "Delivery certainty",
    body: "through disciplined schedule and cost control, and quality management.",
  },
  {
    lead: "Tailored to your programme",
    body: "scope shaped around your objectives, technical requirements, budget and timeline.",
  },
] as const;

export function AboutIntro() {
  return (
    <section aria-labelledby="about-intro-heading" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
            Who We Are
          </span>
          <h2
            id="about-intro-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            One accountable team, from first concept to final handover
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            <p>
              Lazfields Limited provides Engineering, Procurement, Construction and
              Installation (EPCI) services, together with project management consultancy,
              across the construction, energy, utilities, oil &amp; gas, nuclear power,
              pharmaceutical, highways and marine sectors.
            </p>
            <p>
              Our work is led by experienced founding members and delivered by skilled
              professionals who stay hands-on and accountable throughout. We combine strong
              technical knowledge with proven tools, systems and delivery methods — supported
              by a network of technical partners and manufacturers across the United Kingdom,
              United States, Europe and China. We do not compromise on the health, safety and
              wellbeing of our people, clients or communities.
            </p>
          </div>
        </motion.div>

        {/* What this means for you — the delivery-certainty payload, made scannable */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="mt-14 border-t border-line pt-10"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
            What this means for you
          </h3>
          <dl className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {OUTCOMES.map((item) => (
              <div key={item.lead}>
                <dt className="font-display text-lg font-bold text-ink">{item.lead}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Sector strip — scannable breadth, not its own section */}
        <div className="mt-14 border-t border-line pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
            Sectors we serve
          </span>
          <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-ink/70">
            {SECTORS.map((sector, i) => (
              <li key={sector} className="flex items-center gap-3">
                {sector}
                {i < SECTORS.length - 1 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-500/70" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
