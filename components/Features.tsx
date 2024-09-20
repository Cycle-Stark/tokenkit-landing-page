import {
  ChipIcon,
  ModalImg,
  PaintIcon,
  TokenKitImg,
  TokenStackBg,
} from "@/constants/svg";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <div className=" bg-[#030014] overflow-hidden">
      <div className="flex flex-col items-center">
        <h2 className="text-white text-center text-3xl xsm:text-[40px] font-bold py-10">
          It’s as easy as installed
        </h2>
        <h4 className="text-[#596780ab] text-center text-base w-[100%] md:w-[900px]">
          Tokenkit is a package that keeps track of tokens listed on the
          tokenkit contract and displays them through a modal and a token
          container while the tokens keep getting autoupdated for users of your
          dapp.
        </h4>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-start p-5 md:py-10 md:px-20 bg-gradient-to-r from-[#FF757D] via-[#A30CB5] to-[#00173A] m-5 md:m-20 rounded-xl">
        <article className="text-black flex flex-col justify-center md:justify-center md:h-[500px] min-w-[300px]">
          <Image src={PaintIcon} alt="wallet" className="my-2" />
          <div className="my-[20px] md:my-[0px]">
            <h1 className="text-white font-melodrama text-5xl lg:text-6xl font-semibold md:my-[20px]">
              Great UX
            </h1>
          </div>
          <h2 className="font-DM mb-[20px] md:my-[30px] max-w-[800px] text-white">
            Tokenkit makes it easy to add a working modal and a container of
            tokens to your dapp making it easy and fast for you to focus on core
            business logic.
          </h2>
          <button className=" py-3 px-6 w-max font-DM rounded-md bg-[#ffffff40] text-white font-semibold hover:bg-white hover:text-black hover:border-aqua hover:cursor-pointer">
            Install TokenKit
          </button>
        </article>
        <Image src={TokenKitImg} alt="" className="w-[800px]" />
      </div>
      <div className="flex flex-col md:flex-row justify-between  m-5 md:m-20">
        <div className="flex flex-col items-start justify-between rounded-md max-w-[500px] bg-[#ffffff11] font-DM">
          <div className="p-8">
            <Image src={ChipIcon} alt="wallet" className="my-2" />
            <h3 className="text-white text-2xl">An evergrowing collection</h3>
            <p className="text-[#596780] my-5">
              Designed to be seamless and instant. View an Extension and hit  to
              simply install it in milliseconds
            </p>
          </div>
          <Image src={TokenStackBg} alt="wallet" className="" />
        </div>
        <div className="flex flex-col items-start justify-around rounded-md max-w-[100%] bg-[#ffffff11] font-DM mx-2">
          <div className="p-8">
            <Image src={PaintIcon} alt="wallet" className="my-2" />
            <h3 className="text-white text-2xl">An evergrowing collection</h3>
            <p className="text-[#596780] my-5 md:max-w-[700px]">
            Make your Starknet login experience feel right at home on your website. TokenKit allows you to fully customize color, border radius, wallet providers and a lot more. Get a feel for it below!
            </p>
          </div>
          <Image src={ModalImg} alt="wallet" className="" />
        </div>
      </div>
    </div>
  );
};

export default Features;
