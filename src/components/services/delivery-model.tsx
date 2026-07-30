"use client";

import { motion } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const PROMISES = [
  {
    lead: "One accountable team",
    body: "From first concept to final commissioning, the same team stays responsible throughout.",
  },
  {
    lead: "Senior people, hands-on",
    body: "The people who plan your project are the people who deliver it.",
  },
  {
    lead: "EPCI and PM, one roof",
    body: "Engineering, procurement, construction and project management — under a single accountable team, with no handoffs.",
  },
  {
    lead: "Disciplined controls",
    body: "Robust systems and reliable data, so you always know where your project stands.",
  },
] as const;

export function DeliveryModel() {
  return (
    <section aria-labelledby="delivery-model-heading" className="bg-paper py-20 sm:py-28">
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
            The Delivery Model
          </span>
          <h2
            id="delivery-model-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            The complete, integrated delivery capability
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
            Every service on this page is a part of one integrated system — not a menu of
            separate offers. This is what that promises you.
          </p>
        </motion.div>

        <dl className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {PROMISES.map((item, i) => (
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
      </div>
    </section>
  );
}
