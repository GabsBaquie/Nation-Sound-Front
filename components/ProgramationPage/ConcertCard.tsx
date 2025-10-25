import { Card } from "@/components/ui/card";
import { ASSETS_URL } from "@/controllers/apiConfig";
import React from "react";

// Helper function to get image source
const getImageSrc = (image: string | undefined): string | null => {
  if (image && typeof image === "string" && image.trim() !== "") {
    return `${ASSETS_URL}${image}`;
  }
  return null;
};

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
      {getImageSrc(concert.image) ? (
        <img
          className="object-cover w-full h-48"
          width={200}
          height={200}
          src={getImageSrc(concert.image)!}
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
