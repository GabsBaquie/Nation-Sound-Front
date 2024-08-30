import React from "react";
import InteractiveSroll from "../animation/scrollInfinity";

const GaucheNav: React.FC = () => {
  const text =
    "keep coming • keep coming • keep coming • keep coming • keep coming ";

  return (
    <div className="absolute flex flex-col w-10 md:w-auto h-[100vh] gap-10 overflow-hidden border-r-2 top-12 md:top-[70px] md:px-8 border-border">
      <InteractiveSroll>
        <h1 className="flex flex-col items-center text-sm rotate-180 md:text-xl">
          {text.split("").map((char, index) => (
            <span key={index} className="flex items-center rotate-90">
              {char === " " ? <>&nbsp;</> : char}
            </span>
          ))}
        </h1>
      </InteractiveSroll>
    </div>
  );
};

export default GaucheNav;

("absolute flex flex-col h-[100vh] gap-10 overflow-hidden border-r-2 top-[70px] md:px-8 border-border");
