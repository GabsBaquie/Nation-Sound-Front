import "@/app/globals.css";
import NavBar from "@/components/NavBar/navBar";
import NewCard from "@/components/new";
import { GetServerSideProps } from "next";
import { CardController } from "../../controller/CardController";

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
  return (
    <div className="container border-2 border-border">
      <NavBar />
      <NewCard card={card} error={error} />
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
