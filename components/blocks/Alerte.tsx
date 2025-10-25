import { useAlertes } from "@/controllers/alertesController";
import { useRouter } from "next/router";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Card } from "../ui/card";

const AlerteComponent: React.FC = () => {
  const { alertes, isLoading, hasError } = useAlertes();

  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const settings = {
    dots: alertes.length > 1 && !isLoading && !hasError,
    infinite: alertes.length > 1 && !isLoading && !hasError,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: alertes.length > 1 && !isLoading && !hasError,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="text-center pr-[1rem] xl:ml-14 md:px-24 xl:pr-[5rem] xl:mb-12">
      <Slider {...settings} className="pt-16 -mb-10 md:pt-0 md:mb-6">
        {alertes.map((alerte) => (
          <Card
            key={alerte.id}
            className={`${
              alerte.urgence ? "bg-secondary" : "bg-primary"
            } p-2 max-w-full `}
          >
            <h2 className="mb-2 text-xs font-bold md:text-base pulsating-alert">
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
