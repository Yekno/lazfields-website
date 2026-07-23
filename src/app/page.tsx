import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PoliciesPreview } from "@/components/policies-preview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PoliciesPreview />
      </main>
    </>
  );
}
