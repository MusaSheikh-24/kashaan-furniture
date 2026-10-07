import Navbar from "@/components/Navbar";
import { Hero, About, Collections, Featured, Packages, VisualBreak, Why, Services, Gallery, Showroom, CTA, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Collections />
        <Featured />
        <Packages />
        <VisualBreak />
        <Why />
        <Services />
        <Gallery />
        <Showroom />
        <CTA />
      </main>
      <Footer />
    </>
  );
}