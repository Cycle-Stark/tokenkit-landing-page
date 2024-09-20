import { aboutSource } from "@/helpers/aboutSource";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="flex flex-col items-center font-DM bg-[#030014]">
      <div className="">
        <h2 className="text-white text-center text-3xl xsm:text-[40px] font-bold my-10 ">
          More Functionality, less Code.
        </h2>
        <h4 className="text-[#596780ab] text-center text-base">
          Keep your workspace centralized, clean and tidy. Engineered with
          performance and your privacy in mind.
        </h4>
      </div>
      <div className="flex flex-col md:flex-row items-center p-5 md:py-10 xl:px-20">
        <article className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-around md:justify-around ">
          {aboutSource.map((element, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start justify-around xsm:my-2 rounded-md p-8 max-w-[350px] bg-[#ffffff11]"
              >
                <Image src={element.icon} alt="wallet" className="my-2" />
                <h3 className="text-white font-semibold text-3xl xsm:text-4xl">
                  {element.title}
                </h3>
                <p className="text-[#596780] my-5">{element.subtitle}</p>
                <button>Learn More</button>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
};

export default About;
