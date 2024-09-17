import { Card } from "@/components/ui/card";
import { formatTime } from "@/lib/formatTime";
import Image from "next/image";
import React from "react";

interface ConcertCardProps {
  concert: any;
  isPrimary: boolean;
  className?: string;
}

const ConcertCard: React.FC<ConcertCardProps> = ({
  concert,
  isPrimary,
  className,
}) => {
  return (
    <Card
      className={`p-4 shadow-md ${className} ${isPrimary ? "bg-primary" : "bg-secondary"}`}>
      {concert.image && (
        <Image
          className="object-cover w-full h-48"
          width={200}
          height={200}
          src={concert.image.url}
          alt={concert.image.alternativeText || concert.title}
        />
      )}
      <h4 className="h-12 my-4 mb-6 text-lg">{concert.title}</h4>
      <div className="my-auto">
        <p>Heure : {formatTime(concert.heure)}</p>
        <p>Lieu : {concert.lieu}</p>
      </div>
    </Card>
  );
};

export default ConcertCard;
