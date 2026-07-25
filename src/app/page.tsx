import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { PoliciesPreview } from "@/components/policies-preview";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CapabilitiesSection />
        <PoliciesPreview />
      </main>
      <Footer />
    </>
  );
}
