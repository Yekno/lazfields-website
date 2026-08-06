"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { FUTURE_DIRECTOR_SEATS, LEADERS } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

export function TeamContent() {
  return (
    <section aria-labelledby="team-heading" className="bg-paper py-20 sm:py-28">
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
            Professional. Experienced. Committed.
          </span>
          <h2
            id="team-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            The people behind every delivery
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
            Two founding leaders, drawn from engineering and public health, who stay
            hands-on with every engagement they take on. Full qualifications and career
            record below — and two more Director seats to be announced as the team grows.
          </p>
        </motion.div>

        <ul className="mt-14 flex flex-col gap-10">
          {LEADERS.map((leader, i) => (
            <motion.li
              key={leader.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp(20)}
              transition={{ duration: 0.5, delay: i * 0.08, ease: SECTION_EASE }}
              className="flex flex-col gap-6 rounded-xl border border-line bg-paper p-8 shadow-card sm:flex-row sm:gap-8"
            >
              {leader.photo ? (
                <Image
                  src={leader.photo}
                  alt=""
                  width={192}
                  height={192}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                  style={{ objectPosition: leader.photoPosition ?? "center" }}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-extrabold tracking-tight text-gold-500"
                >
                  {leader.initials}
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="font-display text-xl font-bold text-ink">{leader.name}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
                  {leader.role}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {(leader.fullBio ?? [leader.bio]).map((paragraph, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-ink/65">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}

          {Array.from({ length: FUTURE_DIRECTOR_SEATS }).map((_, i) => (
            <motion.li
              key={`future-director-${i}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp(20)}
              transition={{ duration: 0.5, delay: (LEADERS.length + i) * 0.08, ease: SECTION_EASE }}
              className="flex flex-col items-start gap-6 rounded-xl border border-dashed border-line bg-mist/40 p-8 sm:flex-row sm:items-center sm:gap-8"
            >
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-line text-ink/30"
              >
                <UserRound size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
                  Director — Incoming
                </p>
                <p className="mt-1 text-sm text-ink/65">Joining Lazfields</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
