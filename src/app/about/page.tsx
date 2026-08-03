import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { AboutIntro } from "@/components/about/about-intro";
import { LifecycleBand } from "@/components/about/lifecycle-band";
import { FoundingLeadership } from "@/components/about/founding-leadership";
import { AboutVision } from "@/components/about/about-vision";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us | Lazfields Limited",
  description:
    "Lazfields Limited delivers EPCI and project management consultancy across the full project life cycle — senior-led, hands-on and accountable from concept to commissioning.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="About Us"
          title="Complete project delivery, from concept to commissioning"
          description="Innovative, practical and comprehensive solutions — tailored to each client's needs and delivered in line with recognised professional standards."
          backgroundImage="/hero-commissioning.jpg"
        />
        <AboutIntro />
        <LifecycleBand />
        <FoundingLeadership />
        <AboutVision />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
