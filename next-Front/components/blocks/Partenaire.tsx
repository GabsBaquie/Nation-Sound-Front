import ScrollInfinityX from "@/components/animation/scrollInfinityX";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PartenaireBlock } from "../../models/blocks";

interface PartnerProps {
  block: PartenaireBlock;
}

const Partenaires: React.FC<PartnerProps> = ({ block }) => {
  return (
    <div className="my-6 overflow-hidden md:my-12">
      <h1 className="mb-4 text-2xl">Nos Partenaires</h1>
      <div className="relative">
        {/* Animation infinie */}
        <ScrollInfinityX>
          <Link href="/Partenaires">
            <div className="flex items-center justify-around">
              {block.partenaires.map((partenaire, index) => (
                <div key={index}>
                  {partenaire.logo && (
                    <Image
                      src={partenaire.logo.url}
                      alt={partenaire.name}
                      width={95}
                      height={95}
                      className="max-w-[60px] mx-2 md:max-w-md md:mx-7 "
                    />
                  )}
                </div>
              ))}
            </div>
          </Link>
        </ScrollInfinityX>
      </div>
    </div>
  );
};

export default Partenaires;
