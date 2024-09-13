// next-Front/components/Alerte.tsx
import { Alerte } from "@/models/AlerteModel";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Card } from "./ui/card";

interface AlerteProps {
  alertes: Alerte[];
}

const AlerteComponent: React.FC<AlerteProps> = ({ alertes }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div>
      {/* <h1 className="text-xl md:text-2xl">Alertes</h1> */}
      <Slider {...settings}>
        {alertes.map((alerte) => (
          <Card
            key={alerte.id}
            className={`alert ${alerte.urgence ? "alert-urgence" : ""}`}>
            <h2>{alerte.title}</h2>
            <p>{alerte.description}</p>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default AlerteComponent;
