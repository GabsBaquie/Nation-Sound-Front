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

  // Trier les éléments du carrousel par importance
  const sortedCarrousel = [...block.carrousel].sort(
    (a, b) =>
      importanceOrder.indexOf(a.importance ?? "Peu important") -
      importanceOrder.indexOf(b.importance ?? "Peu important")
  );

  return (
    <div className="mt-12 md:mt-24 lg:mt-16">
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
