import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { TeamContent } from "@/components/team/team-content";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Our Team | Lazfields Limited",
  description:
    "Meet the founding leadership behind Lazfields Limited — senior, hands-on professionals with decades of engineering and project management experience.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Our Team"
          title="Senior people, hands-on from concept to handover"
          description="Engineering, project and programme leadership shaped by decades of complex-sector delivery — from FPSO and nuclear projects to public-health research — set out here in full, qualifications included."
        />
        <TeamContent />
        <ContactCta heading="Talk to the team who'll run your project" />
      </main>
      <Footer />
    </>
  );
}
