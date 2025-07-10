import { Card } from "@/components/ui/card";
import { ASSETS_URL } from "@/controllers/apiConfig";
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
  // L'API fournit concert.image comme string (ex: /uploads/images/xxx.jpg)
  const imgSrc = concert.image ? `${ASSETS_URL}${concert.image}` : undefined;
  return (
    <Card
      className={`p-4 shadow-md ${className} ${
        isPrimary ? "bg-primary" : "bg-secondary"
      }`}
    >
      {imgSrc ? (
        <img
          className="object-cover w-full h-48"
          width={200}
          height={200}
          src={imgSrc}
          alt={concert.title}
          loading="lazy"
        />
      ) : (
        <div className="flex justify-center items-center w-full h-48 text-xs text-gray-500 bg-gray-200">
          Image manquante
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        <div>{concert.title}</div>
        <div>Heure : {concert.time}</div>
        <div>Lieu : {concert.location}</div>
      </div>
    </Card>
  );
};

export default ConcertCard;
