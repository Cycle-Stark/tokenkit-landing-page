import {
  BookIcon,
  BuildIcon,
  CodeBlockImg,
  DocumentIcon,
  GitContribution,
} from "@/constants/svg";
import Image from "next/image";
import React from "react";

const Guide = () => {
  return (
    <div className=" bg-[#030014] overflow-hidden">
      <div className="flex flex-col items-center">
        <h2 className="text-white text-center text-3xl xsm:text-[40px] font-bold py-10">
          Your Style. Your Design.
        </h2>
        <h4 className="text-[#596780ab] text-center text-base w-[100%] md:w-[900px]">
          Create your unique styling to fit the design of your application
        </h4>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-start p-5 md:py-10 md:px-20 bg-gradient-to-r from-[#DCF9FF] via-[#621DBA] to-[#04001C] m-5 md:m-20 rounded-xl">
        <Image src={CodeBlockImg} alt="" className="w-[800px]" />
        <article className="text-black flex flex-col justify-center md:justify-center md:h-[500px] min-w-[300px]">
          <Image src={BuildIcon} alt="wallet" className="my-2" />
          <div className="my-[20px] md:my-[0px]">
            <h1 className="text-white font-melodrama text-5xl lg:text-6xl font-semibold md:my-[20px]">
              Build Faster Easier
            </h1>
          </div>
          <h2 className="font-DM mb-[20px] md:my-[30px] max-w-[800px] text-white">
            Make your Starknet login experience feel right at home on your
            website. TokenKit allows you to fully customize color, border
            radius, wallet providers and a lot more. Get a feel for it below!
          </h2>
          <button className=" py-3 px-6 w-max font-DM rounded-md bg-[#ffffff40] text-white font-semibold hover:bg-white hover:text-black hover:border-aqua hover:cursor-pointer">
            Learn More
          </button>
        </article>
      </div>
      <div className="flex flex-col lg:flex-row justify-between  m-5 md:m-20">
        <div className="flex items-start justify-between rounded-md  bg-[#ffffff11] font-DM m-2">
          <div className="p-8">
            <Image src={DocumentIcon} alt="wallet" className="my-2" />
            <h3 className="text-white text-2xl">Open source community</h3>
            <p className="text-[#596780] my-5">
              Build in the open and collaborate with other Developers on yours
              and their projects. Contribute as you’d like, and help others by
              building on top of existing Solutions.
            </p>
          </div>
          <Image src={GitContribution} alt="wallet" className="" />
        </div>
        <div className="flex flex-col items-start justify-around rounded-md max-w-[100%] bg-[#ffffff11] font-DM m-2">
          <div className="p-8">
            <Image src={BookIcon} alt="wallet" className="my-2" />
            <h3 className="text-white text-2xl">Be part of the story</h3>
            <p className="text-[#596780] my-5 md:max-w-[700px]">
              We listen to our community and build TokenKit in collaboration
              with developers, to build the best product and developer
              experience across the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
