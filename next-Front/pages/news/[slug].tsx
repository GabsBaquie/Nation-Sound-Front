import "@/app/globals.css";
import NavBar from "@/components/NavBar/navBar";
import GenericCard from "@/components/ui/GenericCard"; // Importer GenericCard
import { InfoSlugController } from "@/controller/slugController/InfoSlugController";
import { Card as InfoCard } from "@/models/blocks"; // Utiliser InfoCard depuis models/blocks
import { GetServerSideProps } from "next";

interface CardPageProps {
  news: InfoCard | null; // Utilisation du type InfoCard pour "news"
  error?: string;
}

const CardPage: React.FC<CardPageProps> = ({ news, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!news) {
    return <div>Card not found</div>;
  }

  return (
    <div className="container">
      <NavBar />
      <div className="pt-20 md:ml-20 md:pt-0">
        {/* Utilisation de GenericCard pour afficher les informations */}
        <GenericCard
          title={news.title}
          description={news.description}
          text={news.text}
          image={news.image}
        />
      </div>
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  InfoSlugController.getServerSideProps;

export default CardPage;
