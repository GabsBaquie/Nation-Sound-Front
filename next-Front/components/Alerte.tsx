import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Card } from "./ui/card";

interface Alerte {
  id: string;
  title: string;
  description: string;
  urgence: boolean;
  actif: boolean;
}

interface AlerteProps {
  alertes: Alerte[];
}

const AlerteComponent: React.FC<AlerteProps> = ({ alertes }) => {
  // Filtrer les alertes actives
  const alertesActives = alertes.filter((alerte) => alerte.actif);

  const settings = {
    dots: alertesActives.length > 1,
    infinite: alertesActives.length > 1, // Désactiver le défilement infini si une seule alerte active
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: alertesActives.length > 1, // Masquer les flèches si une seule alerte active
    responsive: [
      {
        breakpoint: 768, // Taille maximale pour les appareils mobiles
        settings: {
          arrows: false, // Masquer les flèches sur les appareils mobiles
        },
      },
    ],
  };

  if (alertesActives.length <= 0) {
    return null; // Masquer toute la page si aucune alerte active n'est disponible
  }

  return (
    <div className="px-12 pr-[1rem] text-center md:ml-14 md:px-24 md:pr-[5rem]">
      <Slider {...settings} className="pt-16 -mb-10 md:pt-0 md:mb-6">
        {alertesActives.map((alerte) => (
          <Card
            key={alerte.id}
            className={`${alerte.urgence ? "bg-secondary" : "bg-primary"} p-2 max-w-full`}>
            <h2 className="mb-2 text-xs font-bold md:text-base">
              {alerte.title}
            </h2>
            <p className="text-[10px] md:text-sm">{alerte.description}</p>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default AlerteComponent;
