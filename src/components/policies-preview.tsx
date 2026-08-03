"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { POLICIES } from "@/lib/site-data";

export function PoliciesPreview() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
            Our Commitment
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Policies that guide everything we do
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            We place strong emphasis on quality, employee wellbeing, operational safety,
            environmental protection and positive community relationships — achieved through
            careful planning and the consistent implementation of policy across every project.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POLICIES.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="rounded-xl border border-line bg-paper p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900">
                <Icon size={22} className="text-gold-500" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-navy-700"
          >
            View Our Policies
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
