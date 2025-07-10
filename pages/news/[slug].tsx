import "@/app/globals.css";
import GenericCard from "@/components/ui/GenericCard"; // Importer GenericCard
import { Card as InfoCard } from "@/models/blocks"; // Utiliser InfoCard depuis models/blocks

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
    <div>
      <div className="pt-20 md:ml-20 md:pt-0">
        <GenericCard title={news.title} text={news.text} image={news.image} />
      </div>
    </div>
  );
};

export default CardPage;
