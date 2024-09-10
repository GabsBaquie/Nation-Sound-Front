import Image from "next/image";
import Link from "next/link";
import React from "react";
import GaucheNav from "./gaucheNav";

const NavBar: React.FC = () => {
  return (
    <div>
      <nav className="flex w-full gap-10 text-sm border-b-2 bg-background md:text-base border-border">
        <div className="w-[2.5rem] h-12 px-1 py-2 md:h-auto md:w-auto border-r-2 md:py-4 md:px-7 border-border z-50 bg-background">
          <Link href="/">
            <Image src="/favicon.ico" alt="" width={35} height={35} />
          </Link>
        </div>
        <ul className="flex items-center gap-5 p-3 md:p-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/About">About</Link>
          </li>
          <li>
            <Link href="/Billetterie">Billetterie</Link>
          </li>
          <li>
            <Link href="/Programmation">Programmation</Link>
          </li>
        </ul>
        <GaucheNav className="absolute" />
      </nav>
    </div>
  );
};

export default NavBar;
