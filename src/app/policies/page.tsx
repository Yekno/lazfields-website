import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { PoliciesContent } from "@/components/policies/policies-content";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Policies | Lazfields Limited",
  description:
    "Our principal policy areas — Corporate Social Responsibility, Fitness to Work and Safety, Health, Environment & Quality — guiding how Lazfields Limited operates.",
};

export default function PoliciesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Policies"
          title="Disciplined by policy, not just intention"
          description="Quality, wellbeing, safety and environmental responsibility are built into how we plan and run every project."
        />
        <PoliciesContent />
        <ContactCta heading="Have a question about how we operate?" />
      </main>
      <Footer />
    </>
  );
}
