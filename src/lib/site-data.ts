import { ClipboardList, HardHat, PenTool, Ship, Truck, Wrench, type LucideIcon } from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Policies", href: "/policies" },
  { label: "Clients & Partners", href: "/clients-partners" },
  { label: "Contact", href: "/contact" },
] as const;

export const COMPANY = {
  name: "Lazfields Limited",
  tagline: "Engineering, Project Delivery and Management Consultancy",
  phone: "+44 (0) 7384 122027",
  email: "info@lazfields.co.uk",
  address: "53 Firepool Crescent, Taunton, TA1 1AT, Somerset, England, United Kingdom",
  registrationNumber: "11433098",
} as const;

// Single source of truth for sectors — used by the hero, proof strip and About page
// so the count can never drift between pages. Source: About brief, para 5.
export const SECTORS = [
  "Construction",
  "Energy",
  "Utilities",
  "Oil & Gas",
  "Nuclear Power",
  "Pharmaceutical",
  "Highways",
  "Marine",
] as const;

export interface Capability {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const CAPABILITIES: Capability[] = [
  {
    Icon: ClipboardList,
    title: "Project Management Consultancy",
    description:
      "Portfolio, programme and project controls with disciplined planning, scheduling, monitoring and reporting.",
  },
  {
    Icon: PenTool,
    title: "Engineering Design & Technical Consultancy",
    description:
      "FEED, detailed design and technical assurance across complex, multi-discipline projects.",
  },
  {
    Icon: Truck,
    title: "Procurement & Supply Chain",
    description:
      "Sourcing and delivery through a trusted network of partners across the UK, US, Europe and China.",
  },
  {
    Icon: HardHat,
    title: "Construction & Installation",
    description:
      "On-site delivery managed to schedule, cost and quality — with safety never compromised.",
  },
  {
    Icon: Wrench,
    title: "Commissioning & Decommissioning",
    description:
      "Bringing assets safely into operation, and supporting them to responsible end-of-life.",
  },
  {
    Icon: Ship,
    title: "Marine & Offshore Services",
    description:
      "Specialist support for marine, offshore and topside modification programmes.",
  },
];

// Services page (§3/§4) content — keyed to CAPABILITIES by title so the icon,
// title and base description stay single-sourced there. Slugs anchor each
// index card (§3) to its matching depth block (§4).
export interface ServiceDepth {
  risk: string;
  approach: string;
  advantage: string;
}

export interface ServiceDetail {
  slug: string;
  teaser: string;
  depth: ServiceDepth;
  specialist?: boolean;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "Project Management Consultancy": {
    slug: "pm-consultancy",
    teaser: "Disciplined planning, controls and reporting — visibility at every stage.",
    depth: {
      risk: "Plans that don't survive contact with delivery, run by a detached PMO.",
      approach: "The team that writes the controls also builds to them, as part of an integrated EPCI team.",
      advantage: "Controls grounded in build reality, not assumptions.",
    },
  },
  "Engineering Design & Technical Consultancy": {
    slug: "engineering-design",
    teaser: "FEED to detailed design, with technical assurance across disciplines.",
    depth: {
      risk: "The classic design-to-build handoff gap, where intent gets lost in translation.",
      approach: "Design owned by people accountable through construction and commissioning, not handed off at drawings.",
      advantage: "Buildable design, owned to the end — not a document thrown over a wall.",
    },
  },
  "Procurement & Supply Chain": {
    slug: "procurement-supply-chain",
    teaser: "Sourcing and delivery through a trusted UK, US, Europe and China network.",
    depth: {
      risk: "Sourcing delays and unvetted suppliers stalling delivery.",
      approach: "A real, established partner network across the UK, US, Europe and China.",
      advantage: "Trusted routes to the right materials, not spot-market gambles.",
    },
  },
  "Construction & Installation": {
    slug: "construction-installation",
    teaser: "On-site delivery to schedule, cost and quality — safety never compromised.",
    depth: {
      risk: "On-site slippage on cost, quality or safety once a plan meets reality.",
      approach: "Built by the team that planned it, senior-led on site, safety non-negotiable.",
      advantage: "No disconnect between the plan and what happens on site.",
    },
  },
  "Commissioning & Decommissioning": {
    slug: "commissioning-decommissioning",
    teaser: "Assets brought safely online, and supported to responsible end-of-life.",
    depth: {
      risk: "The highest-stakes phase of a project, handed to a team that wasn't there from the start.",
      approach: "Full-lifecycle ownership — the team commissioning the asset knew it from concept.",
      advantage: "Continuity that de-risks the moment it matters most.",
    },
  },
  "Marine & Offshore Services": {
    slug: "marine-offshore",
    specialist: true,
    teaser: "Specialist marine, offshore and topside modification support.",
    depth: {
      risk: "Marine and offshore work demands proven specialist experience, not generalist delivery.",
      approach: "Grounded in real FPSO topside-modification experience carried by our founding team.",
      advantage: "Genuinely owned specialist credibility, not a capability claimed on paper.",
    },
  },
};

export interface EngagementMode {
  label: string;
  description: string;
  services: string[];
}

// "Three ways to engage" — client-confirmed as the firm's real commercial
// framing (see docs/services-page.md decision #4). Order also sets the
// section's read order: advisory-only through to full integrated delivery.
export const ENGAGEMENT_MODES: EngagementMode[] = [
  {
    label: "Advise Us",
    description: "Stay in control — we plan, manage and advise, you decide.",
    services: ["Project Management Consultancy", "Engineering Design & Technical Consultancy"],
  },
  {
    label: "Deliver for Us",
    description: "Hand us a defined scope — we execute it to plan.",
    services: ["Procurement & Supply Chain", "Construction & Installation"],
  },
  {
    label: "End-to-End (EPCI)",
    description: "One accountable team, start to finish — the full integrated route.",
    services: ["Commissioning & Decommissioning", "Marine & Offshore Services"],
  },
];
