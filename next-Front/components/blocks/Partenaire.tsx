import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PartenaireBlock } from "../../models/blocks";
import InteractiveScrollX from "../animation/ScrollInfinityX";

interface PartnerProps {
  block: PartenaireBlock;
}

const Partenaires: React.FC<PartnerProps> = ({ block }) => {
  // Duplique la liste des partenaires pour assurer le défilement continu
  const duplicatedPartners = [...block.partenaires, ...block.partenaires];

  return (
    <div className="my-6 overflow-hidden md:my-12">
      <h1 className="mb-4 text-2xl">Nos Partenaires</h1>
      <div className="relative">
        {/* Animation infinie */}
        <InteractiveScrollX>
          <Link href="/Partenaires">
            <div className="flex items-center justify-around">
              {duplicatedPartners.map((partenaire, index) => (
                <div key={index}>
                  {partenaire.logo && (
                    <Image
                      src={partenaire.logo.url}
                      alt={partenaire.name}
                      width={95}
                      height={95}
                      className="max-w-md mx-7"
                    />
                  )}
                </div>
              ))}
            </div>
          </Link>
        </InteractiveScrollX>
      </div>
    </div>
  );
};

export default Partenaires;
