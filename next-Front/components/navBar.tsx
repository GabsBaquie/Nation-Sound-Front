import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  const text = "keep coming • keep coming ";
  return (
    <>
      <nav className="flex items-center w-full gap-10 text-sm border-b-2 md:text-base border-border">
        <div className="mx-3 p:-3 md:p-7">
          <Link href="/">✖︎</Link>
        </div>
        <ul className="flex gap-5 p-3 md:p-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Texte du côté gauche */}
      <div className="absolute top-0 flex flex-col h-[130vh] gap-10 p-2 border-r-2 md:p-8 border-border">
        <h1 className="flex flex-col items-center mt-10 text-sm rotate-180 md:text-xl">
          {text.split("").map((char, index) => (
            <span key={index} className="flex items-center rotate-90">
              {char === " " ? <>&nbsp;</> : char}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
};

export default NavBar;
