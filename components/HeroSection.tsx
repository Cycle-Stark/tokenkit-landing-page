"use client";

import { HeroBg } from "@/constants/svg";
import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import { CaretRight, Copy } from "@phosphor-icons/react";
import Link from "next/link";
import { useCopy } from "@/hooks/useCopy";

const HeroSection = () => {
  const copyText = useCopy();
  return (
    <div className="bg-hero-bg bg-cover bg-center h-[140vh]">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center p-5 md:py-10 md:px-20">
        <article className="text-black flex flex-col justify-center md:justify-center items-center h-[100vh]">
          <button className="font-DM text-[#FF9217] bg-[#fb8a2013] py-2 px-5 rounded-full w-max flex items-center">
            Available on DappLand
            <CaretRight size={20} />
          </button>
          <div className="my-[20px] md:my-[0px]">
            <h1 className="text-white font-melodrama text-4xl md:text-5xl lg:text-6xl font-semibold text-center md:my-[20px] max-w-[800px]">
              Seamlessly Load Starknet Tokens with Token Kit
            </h1>
          </div>
          <h2 className="font-DM mb-[20px] md:my-[30px] max-w-[800px] text-center text-white">
            Tokenkit keeps track of tokens listed on the starknet network
            enhancing user experience and save time when building.
          </h2>
          <Link href="https://docs.tokenkithq.io" className=" py-3 px-6 w-max font-DM rounded-md bg-[#FF757D] text-white font-semibold hover:bg-white hover:text-black hover:border-aqua hover:cursor-pointer">
            View the Docs
          </Link>
          <button onClick={()=>copyText("npm install starknet-tokenkit", `Link copied!`)} className="flex items-center justify-around py-3 px-6 w-max font-DM rounded-md bg-[#ffffff1d] border border-[#fff1] text-[#ffffff50] font-semibold hover:bg-white hover:text-black hover:border-aqua hover:cursor-pointer my-[20px] md:my-[30px]">
            $ npm i starknet-tokenkit <Copy size={20} className="ml-2" />
          </button>
        </article>
      </div>
    </div>
  );
};

export default HeroSection;
