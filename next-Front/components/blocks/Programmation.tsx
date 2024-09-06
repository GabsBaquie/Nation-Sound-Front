import { slugify } from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Programmation as ProgrammationType } from "../../models/blocks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ProgrammationProps {
  block: ProgrammationType;
}

const Programmation: React.FC<ProgrammationProps> = ({ block }) => {
  return (
    <section
      className="flex flex-col items-center gap-8 mt-16"
      id="programmation">
      <div className="text-left">
        <h1 className="mb-4 text-xl md:text-2xl">{block.title}</h1>
        <p className="text-sm md:text-lg md:mb-4">{block.text}</p>
      </div>

      <div className="absolute hidden">
        <h3>Image 1:</h3>
        {block.image ? (
          <Image
            src={block.image.url}
            alt={block.image.alternativeText || ""}
            width={24}
            height={25}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className="absolute hidden">
        <h3>Image 2:</h3>
        {block.image2 ? (
          <Image
            src={block.image2.url}
            alt={block.image2.alternativeText || ""}
            width={24}
            height={25}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className="flex flex-col gap-12 md:flex-row ">
        {block.card && block.card.length > 0 ? (
          block.card.map((card) => (
            <Card key={card.id} className="cardhover">
              <Link href={`/program/${slugify(card.title)}`}>
                <CardContent className="pt-6 h-52">
                  {card.image && card.image.url && (
                    <Image
                      src={card.image.url}
                      alt={card.image.alternativeText || ""}
                      width={150}
                      height={150}
                    />
                  )}
                  <CardTitle className="mt-4">{card.title}</CardTitle>
                </CardContent>
                <CardHeader className="bg-primary min-h-20">
                  {card.description || ""}
                </CardHeader>
              </Link>
            </Card>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </section>
  );
};

export default Programmation;
