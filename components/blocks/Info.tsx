import { useAlertes } from "@/controllers/alertesController";
import { Info as InfoType } from "@/models/infoModel/infoModel";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import Button from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";

interface InfoProps {
  block: InfoType;
}

const Info: React.FC<InfoProps> = ({ block }) => {
  const { alertes, isLoading, hasError } = useAlertes();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const importanceOrder = [
    "Très important",
    "Important",
    "Modéré",
    "Peu important",
  ];

  // Utiliser les données de l'API si disponibles, sinon les données statiques
  const carrouselData =
    alertes.length > 0
      ? alertes.map((alerte) => ({
          id: alerte.id,
          title: alerte.title,
          description: alerte.description,
          text: alerte.description,
          image: {
            url: "/images/alert-icon.webp",
            alternativeText: "Alerte de sécurité",
          },
          importance: alerte.urgence ? "Très important" : "Important",
        }))
      : block.carrousel;

  // Trier les éléments du carrousel par importance
  const sortedCarrousel = [...carrouselData].sort(
    (a, b) =>
      importanceOrder.indexOf(a.importance ?? "Peu important") -
      importanceOrder.indexOf(b.importance ?? "Peu important")
  );

  if (isLoading) {
    return (
      <div className="justify-center mx-auto mt-12 max-w-4xl md:mt-24 lg:mt-16">
        <div className="py-8 text-center">
          <div className="inline-block w-8 h-8 rounded-full border-b-2 animate-spin border-primary"></div>
          <p className="mt-2">Chargement des informations...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="justify-center mx-auto mt-12 max-w-4xl md:mt-24 lg:mt-16">
        <div className="py-8 text-center text-red-500">
          <p>Erreur lors du chargement des informations</p>
          <p className="mt-2 text-sm">Affichage des informations par défaut</p>
        </div>
      </div>
    );
  }

  return (
    <div className="justify-center mx-auto mt-12 max-w-4xl md:mt-24 lg:mt-16">
      <h2 className="mb-4 text-xl md:text-2xl">{block.title}</h2>
      <p className="mb-4 text-sm md:text-lg">{block.text}</p>
      <div>
        <Slider {...settings}>
          {sortedCarrousel.map((card) => (
            <Card key={card.id}>
              <CardHeader>
                <Image
                  width={150}
                  height={150}
                  src={card.image?.url || ""}
                  alt={card.image?.alternativeText || ""}
                  className="mx-auto"
                />
                <h2>{card.title}</h2>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>

              <CardFooter>
                <Link href={`/news/${card.id}`} passHref>
                  <Button>Voir plus</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Info;
