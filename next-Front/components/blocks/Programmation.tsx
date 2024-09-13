import { slugify } from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Programmation as ProgrammationType } from "../../models/blocks";
import { Card, CardContent, CardHeader } from "../ui/card";

interface ProgrammationProps {
  block: ProgrammationType;
}

const Programmation: React.FC<ProgrammationProps> = ({ block }) => {
  return (
    <section
      className="flex flex-col items-center gap-8 mt-16"
      id="programmation">
      <div className="text-left">
        <h2 className="mb-4 text-xl md:text-2xl">{block.title}</h2>
        <p className="text-sm md:text-lg md:mb-4">{block.text}</p>
      </div>

      <div className="flex flex-col gap-12 max-w-60 md:gap-20 md:max-w-none lg:flex-row lg:gap-12 ">
        {block.card && block.card.length > 0 ? (
          block.card.map((card) => (
            <Card key={card.id} className="cardhover">
              <Link href={`/program/${slugify(card.title)}`}>
                <CardContent className="h-40 p-0 sm:h-52 ">
                  {card.image && card.image.url && (
                    <Image
                      src={card.image.url}
                      alt={card.image.alternativeText || ""}
                      width={350}
                      height={350}
                    />
                  )}
                </CardContent>
                <CardHeader className="bg-primary min-h-20"></CardHeader>
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
