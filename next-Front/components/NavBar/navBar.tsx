import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"; // Importer useRouter pour connaître la route actuelle
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import GaucheNav from "./gaucheNav";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // Utiliser useRouter pour connaître la route actuelle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [menuOpen]);

  return (
    <div>
      <nav className="w-[99%] border-t-2 border-b-2 fixed z-50 flex text-sm border-border bg-background md:border-t-0 md:z-0 md:relative md:w-full lg:gap-10 md:text-base">
        {/* Icône du menu burger pour mobile */}
        <div className="z-50 p-[0.5rem] md:hidden bg-background">
          <button onClick={toggleMenu} className="text-3xl">
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mx-auto pr-9 lg:pr-0 lg:border-r-2 border-border md:mx-0">
          <div className="w-[2.5rem] h-12 p-2 md:h-auto md:w-auto md:py-4 md:px-7 border-border z-50 bg-background">
            <Link href="/">
              <Image src="/favicon.ico" alt="Logo" width={35} height={35} />
            </Link>
          </div>
          <h1 className="md:hidden">Nation Sounds</h1>
        </div>

        {/* Menu principal pour les grands écrans */}
        <ul className="items-center hidden gap-5 p-3 md:flex md:p-5">
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

        {/* Menu mobile */}
        {menuOpen && (
          <div
            className={`absolute z-50 h-screen text-center border-l-2 border-border bg-background transition-all duration-300 ease-in-out ${
              router.pathname !== "/"
                ? "left-0 w-full top-[3.35rem]"
                : "left-[2.89rem] w-[88%] top-[3.4rem]"
            }`}>
            <ul className="flex flex-col items-center h-screen gap-6 p-12 text-lg">
              <li>
                <Link href="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/About" onClick={toggleMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/Billetterie" onClick={toggleMenu}>
                  Billetterie
                </Link>
              </li>
              <li>
                <Link href="/Programmation" onClick={toggleMenu}>
                  Programmation
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* GaucheNav reste visible */}
        <GaucheNav />
      </nav>
    </div>
  );
};

export default NavBar;
