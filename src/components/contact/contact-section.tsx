"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import { fadeUp, SECTION_EASE } from "@/lib/motion";

const FOCUS_RING_NAVY =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 rounded-sm";
const FOCUS_RING_GOLD =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = { type: "error" | "success"; message: string } | null;
type FieldErrors = { name?: string; contact?: string; message?: string };

export function ContactSection() {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
  const telHref = `tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`;
  const primaryMailtoHref = `mailto:${COMPANY.email}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: silently drop, don't reward the bot with feedback.
    if (honeypot) return;

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!message.trim()) nextErrors.message = "Please share a brief message.";
    if (!email.trim() && !phone.trim()) {
      nextErrors.contact = "Please provide an email or phone number so we can respond.";
    } else if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
      nextErrors.contact = "Please enter a valid email address.";
    }

    if (nextErrors.name || nextErrors.contact || nextErrors.message) {
      setErrors(nextErrors);
      setStatus({ type: "error", message: "Please check the highlighted fields below." });
      // Focus the first invalid field in reading order, so the error is where attention lands next.
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.contact) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setErrors({});

    const subject = `Website enquiry from ${name}${organisation ? ` (${organisation})` : ""}`;
    const bodyLines = [
      `Name: ${name}`,
      organisation && `Organisation: ${organisation}`,
      email && `Email: ${email}`,
      phone && `Phone: ${phone}`,
      "",
      message,
    ].filter(Boolean);

    // Client-side mailto fallback — no submission backend exists yet.
    // Swap this block for a POST to a real endpoint once one is available.
    const mailtoUrl = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailtoUrl;

    setStatus({
      type: "success",
      message: "Opening your email client with your message ready to send.",
    });
  }

  return (
    <section aria-labelledby="contact-heading" className="bg-paper py-20 sm:py-28">
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
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Reach the team directly, or send us a brief
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/* Primary — direct-contact panel, on navy so gold text stays accessible */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(20)}
            transition={{ duration: 0.5, ease: SECTION_EASE }}
            className="flex flex-col rounded-2xl bg-navy-900 px-6 py-10 sm:px-10 sm:py-12"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Direct to the Team
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                However you&apos;d like to reach us
              </h3>

              <a
                href={primaryMailtoHref}
                className={`group mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 ${FOCUS_RING_GOLD}`}
              >
                <Mail size={16} aria-hidden="true" />
                Email the Team
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href={telHref}
                className={`mt-6 flex w-fit items-center gap-2 font-display text-lg font-bold tabular-nums text-gold-500 transition-colors hover:text-gold-400 ${FOCUS_RING_GOLD}`}
              >
                <Phone size={16} aria-hidden="true" />
                {COMPANY.phone}
              </a>
            </div>

            <div className="mt-10 space-y-3 border-t border-white/15 pt-6">
              <p className="text-sm leading-relaxed text-white/70">
                Led by our founding team — including Engr. Ian I. Banks, PMP — your enquiry is
                read by senior members of the team, not a call centre.
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                You&apos;ll hear back directly, from the people who would deliver your project.
              </p>
            </div>
          </motion.div>

          {/* Secondary — enquiry form, degrades to a mailto composition with no backend */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(20)}
            transition={{ duration: 0.5, delay: 0.08, ease: SECTION_EASE }}
            onSubmit={handleSubmit}
            noValidate
            className="flex h-full flex-col rounded-xl border border-line bg-paper p-8 shadow-card sm:p-10"
          >
            <h3 className="font-display text-lg font-bold text-ink">Send us a brief</h3>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-ink">
                  Name
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-navy-700 ${FOCUS_RING_NAVY}`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-danger">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-organisation" className="block text-sm font-medium text-ink">
                  Organisation <span className="font-normal text-ink/65">(optional)</span>
                </label>
                <input
                  id="contact-organisation"
                  name="organisation"
                  type="text"
                  autoComplete="organization"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  className={`mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-navy-700 ${FOCUS_RING_NAVY}`}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={errors.contact ? true : undefined}
                    aria-describedby={errors.contact ? "contact-contact-error" : undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-navy-700 ${FOCUS_RING_NAVY}`}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-ink">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={errors.contact ? true : undefined}
                    aria-describedby={errors.contact ? "contact-contact-error" : undefined}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-navy-700 ${FOCUS_RING_NAVY}`}
                  />
                </div>
              </div>
              {errors.contact && (
                <p id="contact-contact-error" className="text-xs text-danger">
                  {errors.contact}
                </p>
              )}

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-navy-700 ${FOCUS_RING_NAVY}`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-danger">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — hidden from sighted and assistive users, catches simple bots */}
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="contact-company-website">Leave this field empty</label>
                <input
                  id="contact-company-website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
            </div>

            <div aria-live="polite" aria-atomic="true" className="mt-4 min-h-[1.25rem]">
              {status && (
                <p
                  className={`text-sm leading-relaxed ${status.type === "error" ? "text-danger" : "text-ink/70"}`}
                >
                  {status.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`group mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 ${FOCUS_RING_NAVY}`}
            >
              Send Message
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <p className="mt-4 text-xs leading-relaxed text-ink/65">
              We only use these details to respond to your enquiry — never for marketing, and
              never shared with third parties.
            </p>
          </motion.form>
        </div>

        {/* Office line — ranked below the form per approved hierarchy; adds the
            "by appointment" value the footer doesn't carry, rather than repeating it */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp(16)}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="mt-10 flex flex-col gap-1 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              Registered Office · Visits by Appointment
            </span>
            <address className="mt-2 text-sm leading-relaxed text-ink/70 not-italic">
              {COMPANY.address}
            </address>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group mt-3 inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-navy-700 sm:mt-0 ${FOCUS_RING_NAVY}`}
          >
            <MapPin size={16} aria-hidden="true" />
            View on Map
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
