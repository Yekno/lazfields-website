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
