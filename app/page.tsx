import { Categories } from "@/components/home/Categories";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
