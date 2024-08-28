import Image from "next/image";
import Link from "next/link";
import React from "react";
import GaucheNav from "./gaucheNav";

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="relative flex items-center w-full gap-10 text-sm border-b-2 md:text-base border-border">
        <div className="border-r-2 md:py-4 px-7 border-border">
          <Link href="/">
            <Image src="/favicon.ico" alt="" width={35} height={35} />
          </Link>
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
        <GaucheNav />
      </nav>
    </>
  );
};

export default NavBar;
