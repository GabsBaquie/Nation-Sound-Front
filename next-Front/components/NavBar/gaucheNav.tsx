import { useRouter } from "next/router";
import React from "react";
import InteractiveScroll from "../animation/scrollInfinity";

interface GaucheNavProps {
  className?: string;
}

const GaucheNav: React.FC<GaucheNavProps> = ({ className }) => {
  const router = useRouter();
  const text =
    "keep coming • keep coming • keep coming • keep coming • keep coming ";

  // Condition : Visible uniquement sur mobile (md:hidden) si on est sur la page d'accueil
  const isHomePage = router.pathname === "/";

  return (
    <div
      className={`fixed flex flex-col w-12 gap-10 overflow-hidden border-r-2 md:w-auto md:px-8 border-border ${
        isHomePage ? "block md:block" : "hidden md:block"
      }`}>
      <InteractiveScroll>
        <h2 className="flex flex-col items-center text-sm rotate-180 md:text-xl">
          {text.split("").map((char, index) => (
            <span key={index} className="flex items-center rotate-90">
              {char === " " ? <>&nbsp;</> : char}
            </span>
          ))}
        </h2>
      </InteractiveScroll>
    </div>
  );
};

export default GaucheNav;
