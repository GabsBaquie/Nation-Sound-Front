import { Card } from "@/components/ui/card";
import { formatTime } from "@/lib/formatTime";
import Image from "next/image";
import React from "react";

interface ConcertCardProps {
  concert: any;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ concert }) => {
  return (
    <Card className="p-4 shadow-md">
      <h4 className="text-xl font-bold">{concert.title}</h4>
      <p>Heure : {formatTime(concert.heure)}</p>
      <p>Lieu : {concert.lieu}</p>
      {concert.image && (
        <Image
          className="mx-auto"
          width={200}
          height={200}
          src={concert.image.url}
          alt={concert.image.alternativeText || concert.title}
        />
      )}
      <p className="mt-4">{concert.description}</p>
    </Card>
  );
};

export default ConcertCard;
