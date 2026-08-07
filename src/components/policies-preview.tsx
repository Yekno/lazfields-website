"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POLICIES } from "@/lib/site-data";
import { PolicyCard } from "@/components/policies/policy-card";

export function PoliciesPreview() {
  return (
    <section aria-labelledby="policies-preview-heading" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-700">
            Our Commitment
          </span>
          <h2
            id="policies-preview-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Policies that guide everything we do
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            We place strong emphasis on quality, employee wellbeing, operational safety,
            environmental protection and positive community relationships — achieved through
            careful planning and the consistent implementation of policy across every project.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POLICIES.map((policy, i) => (
            <PolicyCard key={policy.title} index={i} {...policy} />
          ))}
        </ul>

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
