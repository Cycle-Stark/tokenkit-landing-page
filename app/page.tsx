import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Guide from "@/components/Guide";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TryTokenKit from "@/components/TryTokenKit";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <TryTokenKit />
      <Features />
      <Guide />
      <Footer />
    </main>
  );
}
