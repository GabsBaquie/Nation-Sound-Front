import { Princing as PrincingType } from "@/models/types";
import { DotIcon } from "lucide-react";
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

const Pricing: React.FC<PrincingProps> = ({ block }) => {
  const { title, text, plan } = block;

  return (
    <section className="mx-auto my-16 max-w-4xl" id="princing">
      <div className="mb-10 text-left md:text-justify">
        <h2 className="mb-4 text-xl md:text-2xl">{title}</h2>
        <p className="text-sm md:text-lg">{text}</p>
      </div>

      <div className="flex flex-col gap-8 justify-center items-center md:flex-row">
        {plan.map((card, index) => (
          <Card key={index} className="md:p-4 md:min-w-72 bg-primary">
            <CardHeader>
              <CardTitle>{card.planType}</CardTitle>
              <p>{card.planPrice}</p>
            </CardHeader>
            <CardContent className="mt-2 text-sm">
              <ul>
                {card.services.map((service) => (
                  <li
                    key={service.id}
                    className="flex gap-2 justify-center items-center mb-2"
                  >
                    <DotIcon className="w-12 h-12" />
                    <p>{service.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-4">
              {card.button && (
                <Link href={card.button?.link || "/Billetterie"} passHref>
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

export default Pricing;
