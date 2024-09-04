import React from "react";
import InteractiveSroll from "../animation/scrollInfinity";

interface GaucheNavProps {
  className?: string;
}

const GaucheNav: React.FC<GaucheNavProps> = ({ className }) => {
  const text =
    "keep coming • keep coming • keep coming • keep coming • keep coming ";

  return (
    <div className="fixed flex flex-col w-10 gap-10 overflow-hidden border-r-2 md:w-auto md:px-8 border-border">
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
