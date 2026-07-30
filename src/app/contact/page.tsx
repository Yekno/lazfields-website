import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Contact | Lazfields Limited",
  description:
    "Talk to the senior team delivering EPCI and project management consultancy across the full project life cycle — reach Lazfields Limited by phone, email or enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Contact"
          title="Talk to the team who'll deliver your project"
          description="Reach out directly, or send a brief — every enquiry is read by a senior member of the team."
          backgroundImage="/hero-pm.jpg"
        />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
