import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Policies", href: "/policies" },
] as const;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm";

export function Footer() {
  const year = new Date().getFullYear();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;

  return (
    <footer className="bg-navy-900">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-12">
          {/* Brand */}
          <div className="sm:col-start-1 sm:row-start-1 lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Link href="/" className={`flex w-fit items-center gap-2.5 ${FOCUS_RING}`}>
              <Image
                src="/logo-mark.png"
                alt="Lazfields Limited"
                width={315}
                height={506}
                className="h-10 w-auto shrink-0"
              />
              <span className="flex flex-col pt-0.5">
                <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-gold-500">
                  Lazfields
                </span>
                <span className="mt-1.5 flex items-center gap-2">
                  <span className="h-px w-4 bg-gold-500" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold-400/90">
                    Limited
                  </span>
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              {COMPANY.tagline}
            </p>
          </div>

          {/* Contact — not a nav landmark, this is contact information */}
          <div className="sm:col-start-2 sm:row-start-1 sm:row-span-2 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:row-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Contact
            </h3>
            <div className="mt-3 flex flex-col items-start">
              <a
                href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}
                className={`block py-2 font-display text-lg font-bold tabular-nums text-gold-500 transition-colors hover:text-gold-400 ${FOCUS_RING}`}
              >
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className={`block py-3 text-sm text-white/70 transition-colors hover:text-white ${FOCUS_RING}`}
              >
                {COMPANY.email}
              </a>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 py-3 text-sm font-semibold text-white transition-colors hover:text-white/80 ${FOCUS_RING}`}
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Location */}
          <div className="sm:col-start-1 sm:row-start-2 lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <address className="max-w-xs text-sm leading-relaxed text-white/70 not-italic">
              {COMPANY.address}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-flex items-center gap-2 py-3 text-sm font-semibold text-white transition-colors hover:text-white/80 ${FOCUS_RING}`}
            >
              View on Map
              <ArrowRight size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          {/* Company */}
          <nav
            aria-label="Company"
            className="sm:col-start-1 sm:row-start-3 lg:col-span-3 lg:col-start-7 lg:row-start-1 lg:row-span-2"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Company
            </h3>
            <ul className="mt-3 flex flex-col">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-sm text-white/70 transition-colors hover:text-white ${FOCUS_RING}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal bar — no legal pages are published yet, so no links render here */}
        <div className="mt-16 border-t border-white/15 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/60">
              © {year} Lazfields Limited. All rights reserved.
            </p>
            <p className="text-xs text-white/60">
              Registered in England and Wales, company no. {COMPANY.registrationNumber}.
              Registered office: 53 Firepool Crescent, Taunton, TA1 1AT.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
