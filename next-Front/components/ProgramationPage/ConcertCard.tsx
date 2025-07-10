import { Card } from "@/components/ui/card";
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
      className={`p-4 shadow-md ${className} ${
        isPrimary ? "bg-primary" : "bg-secondary"
      }`}
    >
      {concert.image && (
        <Image
          className="object-cover w-full h-48"
          width={200}
          height={200}
          src={concert.image.url}
          alt={concert.image.alternativeText || concert.title}
        />
      )}
      <div>
        <div>{concert.title}</div>
        <div>Heure : {concert.time}</div>
        <div>Lieu : {concert.location}</div>
      </div>
    </Card>
  );
};

export default ConcertCard;
