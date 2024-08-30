import Image from "next/image";
import React from "react";
import { Programmation as ProgrammationType } from "../../models/blocks";
import { Card, CardContent, CardHeader } from "../ui/card";

interface ProgrammationProps {
  block: ProgrammationType;
}

const ProgrammationBlock: React.FC<ProgrammationProps> = ({ block }) => {
  const { title, text, image, image2, card } = block;

  return (
    <section className="flex flex-col items-center gap-8 mt-16">
      <div className="text-left">
        <h1 className="mb-2 text-xl md:text-2xl">{title}</h1>
        <p className="text-sm md:text-lg md:mb-4">{text}</p>
      </div>

      <div className="absolute hidden">
        <h3>Image 1:</h3>
        {image ? (
          <Image
            src={image.url}
            alt={image.alternativeText || ""}
            width={24}
            height={25}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className="absolute hidden">
        <h3>Image 2:</h3>
        {image2 ? (
          <Image
            src={image2.url}
            alt={image2.alternativeText || ""}
            width={24}
            height={25}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className="flex flex-col gap-12 md:flex-row">
        {card && card.length > 0 ? (
          card.map((card) => (
            <Card key={card.id}>
              <CardContent className="h-52">
                {card.image && card.image.url ? (
                  <Image
                    src={card.image.url}
                    alt={card.image.alternativeText || ""}
                    width={50}
                    height={50}
                  />
                ) : (
                  <p className="pt-24">No image for this card</p>
                )}
              </CardContent>
              <CardHeader className="bg-primary">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </section>
  );
};

export default ProgrammationBlock;
