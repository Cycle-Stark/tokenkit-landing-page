import { TokenKitImg } from "@/constants/svg";
import Image from "next/image";
import React from "react";

const TryTokenKit = () => {
  return (
    <section className="flex flex-col items-center font-DM bg-[#030014]">
        <h2 className="text-white text-center text-3xl xsm:text-[40px] font-bold my-10 ">
          Try Out TokenKit
        </h2>
        <h4 className="text-[#596780ab] w-[100%] md:w-[900px] text-center text-base">
          Tokenkit is a package that keeps track of tokens listed on the
          tokenkit contract and displays them through a modal and a token
          container while the tokens keep getting autoupdated for users of your
          dapp.
        </h4>
        <Image src={TokenKitImg} alt="" className="" />

    </section>
  );
};

export default TryTokenKit;
