import {
  ClipboardList,
  HardHat,
  HeartHandshake,
  HeartPulse,
  PenTool,
  ShieldCheck,
  Ship,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Clients & Partners is intentionally not linked yet — the client's list is
// subject to approval/confidentiality (About brief) and no page exists until
// real, approved content is supplied. Do not add it back with placeholder content.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
] as const;

export const COMPANY = {
  name: "Lazfields Limited",
  tagline: "Engineering, Project Delivery and Management Consultancy",
  phone: "+44 (0) 7384 122027",
  email: "info@lazfields.co.uk",
  address: "53 Firepool Crescent, Taunton, TA1 1AT, Somerset, England, United Kingdom",
  // Structured form of the address above, for JSON-LD only — keep in sync if
  // the display string ever changes.
  postalAddress: {
    streetAddress: "53 Firepool Crescent",
    addressLocality: "Taunton",
    addressRegion: "Somerset",
    postalCode: "TA1 1AT",
    addressCountry: "GB",
  },
  registrationNumber: "11433098",
} as const;

// Single source of truth for sectors — used by the hero, proof strip and About page
// so the count can never drift between pages. Source: About brief, para 5.
//
// "Aerospace and Defence" added 2026-08-07 from the client's supplied industry
// list, in the client's own wording. It is not a new claim: Banks' biography
// (LEADERS[0].bio, below) and the Services proof section both already describe
// "aviation and aerospace defence" work — the sector strip had simply been
// under-claiming it. Do not add further sectors without a client source.
export const SECTORS = [
  "Construction",
  "Energy",
  "Utilities",
  "Oil & Gas",
  "Nuclear Power",
  "Pharmaceutical",
  "Highways",
  "Marine",
  "Aerospace and Defence",
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
      "Portfolio, programme and project controls with disciplined planning, scheduling, monitoring, reporting, and risk, cost, quality and change management.",
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
      "Bringing assets safely into operation, maintaining them through life with technical support, and supporting them to responsible end-of-life.",
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
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "Project Management Consultancy": {
    slug: "pm-consultancy",
    teaser: "Planning, controls and reporting, with risk, cost, quality and change management — visibility at every stage.",
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
    teaser: "Assets brought online, maintained through life, and supported to responsible end-of-life.",
    depth: {
      risk: "The highest-stakes phase of a project, handed to a team that wasn't there from the start.",
      approach: "Full-lifecycle ownership — the team commissioning the asset knew it from concept, and stays on to support and maintain it through life.",
      advantage: "Continuity that de-risks the moment it matters most.",
    },
  },
  "Marine & Offshore Services": {
    slug: "marine-offshore",
    teaser: "Specialist marine, offshore and topside modification support.",
    depth: {
      risk: "Marine and offshore work demands proven specialist experience, not generalist delivery.",
      approach: "Grounded in real FPSO topside-modification experience carried by our founding team.",
      advantage: "Genuinely owned specialist credibility, not a capability claimed on paper.",
    },
  },
};

export interface EngagementModeLeadElement {
  title: string;
  body: string;
  steps: string[];
}

export interface EngagementMode {
  label: string;
  description: string;
  services: string[];
  // Optional structural element rendered above a mode's service cards —
  // used only where the mode needs to express something the two cards
  // beneath it can't carry on their own (see docs RI-1).
  leadElement?: EngagementModeLeadElement;
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
    description: "The final phase of one continuous delivery route — commissioning, decommissioning and specialist marine work.",
    services: ["Commissioning & Decommissioning", "Marine & Offshore Services"],
    leadElement: {
      title: "The Integrated Route",
      body: "One team runs the entire path — engineering, procurement, construction and installation — then stays on through commissioning and, where relevant, specialist marine and offshore work.",
      steps: ["Engineering", "Procurement", "Construction", "Installation"],
    },
  },
];

// Single source of truth for founding leadership — used by the About page's
// condensed preview (`bio`) and the full Team page (`fullBio`, where available).
// Source: About Us brief (revised 19.07.26); Okolie's role, bio and fullBio
// updated 2026-08-05 from client-supplied content ("content of obiageli
// okolie.docx") and headshots (photos.pdf). `photo` is optional — leaders
// without one fall back to an initials monogram (see about/founding-leadership
// and team/team-content).
export interface Leader {
  initials: string;
  name: string;
  role: string;
  bio: string;
  fullBio?: string[];
  photo?: string;
  // Tunes object-position for photos where the face isn't centered in frame.
  photoPosition?: string;
}

export const LEADERS: Leader[] = [
  {
    initials: "IB",
    name: "Engr. Ian I. Banks",
    role: "Founder",
    photo: "/headshot-ian-banks.jpg",
    bio: "20+ years in portfolio, programme and project management, project controls and engineering. His work spans FPSO topside modifications, nuclear power, aviation and aerospace defence, pharmaceutical, utilities and construction — delivered across Nigeria, the UK, the US, Malaysia, Singapore and South Korea. PMP-certified by the Project Management Institute.",
    fullBio: [
      "Engr. Ian I. Banks has more than 20 years of experience in portfolio, programme and project management; project planning and scheduling; project controls and monitoring; and project engineering. He has a strong record of developing strategic procedures, project plans and delivery schedules that support the successful and timely completion of large-scale projects.",
      "His experience spans engineering projects involving topside modifications to Floating Production, Storage and Offloading (FPSO) facilities, including new production facilities and export-metering systems. He has also worked across the nuclear power, aviation and aerospace defence, pharmaceutical, utilities and construction sectors.",
      "Engr. Banks has supported projects through tendering, Front-End Engineering Design (FEED), detailed engineering, procurement and construction. He combines technical knowledge with strong commercial awareness and focuses on improving organisational value, sustainable profitability and long-term growth.",
      "His strengths include developing and re-engineering project processes to improve efficiency, managing stakeholders, gathering business requirements, and creating practical procedures and systems that support effective project delivery.",
      "He has delivered engineering and project management services across Nigeria, the United Kingdom, the United States, Malaysia, Singapore and South Korea. His responsibilities have included engineering, modelling, design, and the development and review of Process, Piping and Instrumentation Diagrams (P&IDs).",
      "Engr. Banks holds a bachelor's degree in Marine Engineering from Rivers State University of Science and Technology, Port Harcourt; a further bachelor's degree in Engineering Business Management from Coventry University, United Kingdom; and a master's degree in Engineering Management from Arden University, United Kingdom. He is a Project Management Professional (PMP), certified by the Project Management Institute, and a member of the Nigerian Society of Engineers. He has also completed a range of leadership, management and specialist training programmes in the United Kingdom and the United States.",
    ],
  },
  {
    initials: "OO",
    name: "Dr. Obiageli (Oby) Okolie, PhD",
    role: "Director",
    photo: "/headshot-obiageli-okolie.jpg",
    photoPosition: "center 20%",
    bio: "An accomplished researcher and project management professional, with a background spanning medical management and healthcare, research leadership and strategic programme delivery. A Visiting Researcher at the University of the West of England (UWE Bristol), she brings expertise in project controls, governance, stakeholder engagement and quality assurance to Lazfields' leadership.",
    fullBio: [
      "Dr. Oby Okolie is an accomplished researcher and a distinguished project management professional. She currently serves as a Director at Lazfields Limited and a Visiting Researcher at the University of the West of England (UWE Bristol), United Kingdom, where she leads and contributes to high-impact research projects, driving innovation, evidence-based practice, and collaborative partnerships across academia, industry, and the public sector.",
      "With an extensive background in medical management & healthcare, research, and project leadership, Dr. Okolie has successfully managed complex projects from concept development through implementation and evaluation. She has significant expertise in project management & controls, governance, stakeholder engagement, research management, quality assurance, and strategic programme delivery. Her ability to coordinate multidisciplinary teams and translate research into practical, measurable outcomes has earned her recognition for delivering projects that create lasting value.",
      "As Director at Lazfields Limited, Dr. Oby Okolie provides strategic leadership in project delivery, organisational development, research and innovation, and client engagement. She is passionate about delivering practical, sustainable, and client-focused solutions that help organisations achieve operational excellence and long-term success across diverse industries.",
    ],
  },
];

// Two Director seats the client has confirmed will be filled at a later date.
// Rendered as muted placeholder cards on the Team page only (not About's
// condensed preview) — real names replace these as they're confirmed; do not
// invent names, bios or photos for these seats in the meantime.
export const FUTURE_DIRECTOR_SEATS = 2;

// Single source of truth for policy areas — used by the Home preview and the
// full Policies page. Source: About Us brief (revised 19.07.26) §Policies.
export interface Policy {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const POLICIES: Policy[] = [
  {
    Icon: HeartHandshake,
    title: "Corporate Social Responsibility",
    description:
      "Investing in the communities where we operate and building positive, lasting relationships beyond the project lifecycle.",
  },
  {
    Icon: HeartPulse,
    title: "Fitness to Work",
    description:
      "Protecting the health and wellbeing of every employee, contractor and site visitor across all our operations.",
  },
  {
    Icon: ShieldCheck,
    title: "Safety, Health, Environment & Quality",
    description:
      "Upholding rigorous SHEQ standards on every project, with no compromise on people or the environment.",
  },
];
