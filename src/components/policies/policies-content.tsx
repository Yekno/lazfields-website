"use client";

import { motion } from "framer-motion";
import { POLICIES } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";
import { PolicyCard } from "@/components/policies/policy-card";

export function PoliciesContent() {
  return (
    <section aria-labelledby="policies-heading" className="bg-paper py-20 sm:py-28">
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
            Our Commitment
          </span>
          <h2
            id="policies-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Policies that guide everything we do
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            Lazfields Limited is committed to meeting client requirements and continually
            improving customer satisfaction. We place strong emphasis on quality, employee
            health and wellbeing, operational safety, environmental protection and positive
            community relationships.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            We achieve this through careful planning and the consistent implementation of
            policies that guide our daily operations — our aim is to remain a trusted
            contractor and consultancy in a changing and competitive business environment.
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POLICIES.map((policy, i) => (
            <PolicyCard key={policy.title} index={i} {...policy} />
          ))}
        </ul>
      </div>
    </section>
  );
}
