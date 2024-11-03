"use client"

import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Guide from "@/components/Guide";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SelectToken from "@/components/SelectToken";
import Test from "@/components/Test";
import TokenPreviewComponent from "@/components/TokenPreviewComponent";
import TryTokenKit from "@/components/TryTokenKit";
import Image from "next/image";
import { TokenKitWrapper } from "starknet-tokenkit";
import "starknet-tokenkit/dist/index.css";

export default function Home() {
  const stylingObject = {
    r: "20px",
    textColor: "black",
    headerFooterBg: "rgba(0, 0, 0, 0.28)",
    backgroundColor: "yellow",
    fontFamily: "DM Sans",
    searchBackground: "rgba(151, 244, 238, 0.46)",
    searchColor: "white",
    searchBorderColor: "rgba(14, 6, 46, 0)",
    searchFocusBorderColor: "rgba(151, 244, 238, 1)",
    primaryColor: "rgba(0, 97, 91, 1)",
  };
  return (
    <main>
      <HeroSection />
      <About />
      <TokenKitWrapper
        network="SN_MAIN" // Required - 'SN_MAIN' | 'SN_SEPOLIA'
        sepoliaNodeURL="https://starknet-sepolia.public.blastapi.io/rpc/v0_7" // Required
        mainnetNodeURL="https://starknet-mainnet.public.blastapi.io/rpc/v0_7" // Required
        themeObject={stylingObject} // Required
      >
        <TokenPreviewComponent />
        <SelectToken />
      </TokenKitWrapper>
      <TryTokenKit />
      <Features />
      <Guide />
      <Footer />
    </main>
  );
}
