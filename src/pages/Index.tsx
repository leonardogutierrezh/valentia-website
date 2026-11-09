import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { Gallery } from "@/components/Gallery";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhyValentia } from "@/components/WhyValentia";
import { Consulting } from "@/components/Consulting";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Gallery />
      <WhyValentia />
      <Consulting />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
