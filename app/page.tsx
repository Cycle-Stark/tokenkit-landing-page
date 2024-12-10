"use client";

import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Guide from "@/components/Guide";
import HeroSection from "@/components/HeroSection";
import Playground from "@/components/Playground";
import TryTokenKit from "@/components/TryTokenKit";
import "starknet-tokenkit/dist/index.css";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Playground />
      <TryTokenKit />
      <Features />
      <Guide />
      <Footer />
    </main>
  );
}
