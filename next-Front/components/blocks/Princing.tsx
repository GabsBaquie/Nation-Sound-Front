import { Princing as PrincingType } from "@/models/princingModel/princingModel";
import Link from "next/link";
import React from "react";
import Button from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PrincingProps {
  block: PrincingType;
}

const PrincingBlock: React.FC<PrincingProps> = ({ block }) => {
  const { title, text, plan } = block;

  return (
    <section className="my-16" id="princing">
      <div className="mb-10 text-left md:text-justify">
        <h2 className="mb-4 text-xl md:text-2xl">{title}</h2>
        <p className="text-sm md:text-lg">{text}</p>
      </div>

      <div className="flex flex-col justify-center gap-8 md:flex-row">
        {plan.map((card, index) => (
          <Card key={index} className="md:min-w-72 bg-primary">
            <CardHeader>
              <CardTitle>{card.planType}</CardTitle>
              <p>{card.planPrice}</p>
            </CardHeader>
            <CardContent>
              <ul>
                {card.services.map((service) => (
                  <li key={service.id}>{service.description}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {card.button && (
                <Link href={card.button?.link || "/Programmation"} passHref>
                  <Button btnType={card.button?.type} size={"sm"}>
                    {card.button?.title}
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PrincingBlock;
