"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

interface Leader {
  initials: string;
  name: string;
  role: string;
  bio: string;
}

const LEADERS: Leader[] = [
  {
    initials: "IB",
    name: "Engr. Ian I. Banks",
    role: "Founder",
    bio: "20+ years in portfolio, programme and project management, project controls and engineering. His work spans FPSO topside modifications, nuclear power, aviation and aerospace defence, pharmaceutical, utilities and construction — delivered across Nigeria, the UK, the US, Malaysia, Singapore and South Korea. PMP-certified by the Project Management Institute.",
  },
  {
    initials: "OO",
    name: "Dr Obiageli Okolie, PhD",
    role: "Founding Member",
    bio: "More than 15 years of cumulative professional experience.",
  },
];

export function FoundingLeadership() {
  return (
    <section aria-labelledby="leadership-heading" className="bg-paper py-20 sm:py-28">
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
            Leadership
          </span>
          <h2
            id="leadership-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Led by an experienced founding team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            The business is led by founding members with strong management capability and
            extensive industry experience, supported by skilled personnel across technical,
            operational and administrative functions.
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {LEADERS.map((leader, i) => (
            <motion.li
              key={leader.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp(20)}
              transition={{ duration: 0.5, delay: i * 0.08, ease: SECTION_EASE }}
              className="flex flex-col gap-5 rounded-xl border border-line bg-paper p-8 shadow-card sm:flex-row sm:gap-6"
            >
              {/* Brand monogram — placeholder for a real photo, supplied by the individual */}
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-extrabold tracking-tight text-gold-500"
              >
                {leader.initials}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-lg font-bold text-ink">{leader.name}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
                  {leader.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{leader.bio}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/team"
            className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-navy-900 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2"
          >
            Meet the team
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
