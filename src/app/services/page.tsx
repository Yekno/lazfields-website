import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { DeliveryModel } from "@/components/services/delivery-model";
import { ServiceIndex } from "@/components/services/service-index";
import { ServiceDepth } from "@/components/services/service-depth";
import { HowWeRun } from "@/components/services/how-we-run";
import { ProofSection } from "@/components/services/proof-section";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { CAPABILITIES, COMPANY } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services | Lazfields Limited",
  description:
    "Engineering, Procurement, Construction & Installation and project management consultancy — one accountable, senior-led team delivering across the full project life cycle.",
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: COMPANY.address,
    makesOffer: CAPABILITIES.map(({ title, description }) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: title,
        description,
        provider: {
          "@type": "Organization",
          name: COMPANY.name,
        },
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Services"
          title="Complete project delivery, engineered as one integrated capability"
          description="Engineering, procurement, construction and project management consultancy — delivered by one accountable, senior-led team, with no handoffs across the lifecycle."
          backgroundImage="/hero-epci.jpg"
        />
        <DeliveryModel />
        <ServiceIndex />
        <ServiceDepth />
        <HowWeRun />
        <ProofSection />
        <ContactCta heading="Scope your project with a senior team" />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
