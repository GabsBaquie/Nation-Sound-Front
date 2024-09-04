import "@/app/globals.css";
import NavBar from "@/components/NavBar/navBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Si tu utilises ces composants dans ta UI
import { CardController } from "@/controller/CardController";
import { GetServerSideProps } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface CardPageProps {
  card: {
    id: number;
    title: string;
    text: string;
    description: string;
    image?: {
      url: string;
      alternativeText: string;
    };
  } | null;
  error?: string;
}

const CardPage: React.FC<CardPageProps> = ({ card, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="container">
      <NavBar />

      {/* Affichage direct de la carte */}
      <Card className="mx-auto my-10 text-center md:max-w-3xl xl:max-w-4xl">
        <CardHeader>
          {card.image && (
            <Image
              className="mx-auto"
              src={card.image.url}
              alt={card.image.alternativeText}
              width={250}
              height={250}
            />
          )}
        </CardHeader>
        <CardTitle className="my-8">{card.title}</CardTitle>
        <CardDescription className="mb-4 text-lg">
          {card.description}
        </CardDescription>
        <CardContent className="markdown-content">
          <ReactMarkdown>{card.text}</ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const controller = new CardController();
  const data = await controller.getCardData(params?.slug as string);

  return {
    props: data,
  };
};

export default CardPage;
