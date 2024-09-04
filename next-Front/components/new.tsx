import Image from "next/image";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface NewProps {
  cards: {
    id: number;
    title: string;
    text: string;
    description: string;
    image?: {
      url: string;
      alternativeText: string;
    };
  }[];
  error?: string;
}

const NewCard: React.FC<NewProps> = ({ cards, error }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cards || cards.length === 0) {
    return <div>No cards found</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {cards.map((card) => (
        <div key={card.id}>
          <Card>
            <CardHeader>
              {card.image && (
                <Image
                  className="mx-auto"
                  src={card.image?.url}
                  alt={card.image?.alternativeText}
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
      ))}
    </Slider>
  );
};

export default NewCard;
