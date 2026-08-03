"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
}

/**
 * Shared interior-page header. Sits on the navy ground (matching the footer's
 * bookend logic) with generous top padding to clear the fixed navbar. The title
 * is the page's single <h1>. Reused across all interior pages.
 *
 * backgroundImage is optional: without it, the header is flat navy (unchanged
 * default). With it, a full-bleed desaturated image sits behind a heavier
 * version of the homepage hero's scrim — the image should read as quiet
 * texture, not a competing photo hero.
 */
export function PageHeader({ eyebrow, title, description, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover grayscale contrast-[1.05]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(13,18,67,0.97) 0%, rgba(13,18,67,0.88) 45%, rgba(13,18,67,0.72) 100%), linear-gradient(to top, rgba(13,18,67,0.80) 0%, rgba(13,18,67,0.60) 55%, rgba(13,18,67,0.68) 100%)",
            }}
          />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
        >
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
