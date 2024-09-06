import "@/app/globals.css";
import { Image as ImageProps } from "@/models/blocks";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

// Interface pour les props du composant GenericCard
interface GenericCardProps {
  className?: string;
  title: string;
  description?: string;
  text: string | React.ReactNode;
  renderContent?: () => React.ReactNode; // Fonction facultative pour rendre du contenu supplémentaire
  image?: ImageProps | null;
}

const GenericCard: React.FC<GenericCardProps> = ({
  className,
  title,
  description,
  text,
  image,
  renderContent,
}) => {
  return (
    <Card
      className={`mx-auto my-10 text-center card md:max-w-3xl xl:max-w-4xl" ${className}`}>
      <CardHeader>
        {image && (
          <Image
            className="mx-auto"
            src={image.url}
            alt={image.alternativeText || "Image"}
            width={150}
            height={150}
          />
        )}
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="text-center markdown-content">
        {typeof text === "string" ? (
          <Markdown>{text}</Markdown> // Utilisation de Markdown pour afficher du texte formaté
        ) : (
          text // Afficher le texte tel quel s'il n'est pas une chaîne de caractères
        )}
      </CardContent>
      {renderContent && <CardFooter>{renderContent()}</CardFooter>}
    </Card>
  );
};

export default GenericCard;
