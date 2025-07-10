import { Footer as FooterType } from "@/models/footerModel/footerModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";

interface FooterProps {
  block: FooterType;
}

const Footer: React.FC<FooterProps> = ({ block }) => {
  const { title, text, Reseaux } = block;

  return (
    <footer className="mx-auto my-6">
      <h2 className="mb-2 text-xl md:text-2xl">{title}</h2>
      <p className="mb-8 text-sm md:text-lg">{text}</p>
      <ul className="flex flex-wrap justify-center gap-4 ">
        {Reseaux.map((reseau, index) => (
          <li key={index}>
            <Card
              className={`flex items-center justify-center p-2 cardhover min-w-28 md:min-w-32 md:min-h-24 ${
                index % 2 === 0 ? "bg-primary" : "bg-secondary"
              }`}>
              <Link
                href={reseau.link}
                target="_blank"
                rel="noopener noreferrer">
                {reseau.icon && (
                  <Image
                    className="mx-auto mb-2"
                    src={reseau.icon.url}
                    alt={reseau.icon.alternativeText}
                    width={24}
                    height={24}
                  />
                )}
                <p className="text-xs md:text-base">{reseau.list}</p>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
