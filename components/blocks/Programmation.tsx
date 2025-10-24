import { DayAPI, fetchDays } from "@/controllers/programmationController";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Card, CardContent, CardHeader } from "../ui/card";

const Programmation: React.FC = () => {
  const router = useRouter();
  const [days, setDays] = useState<DayAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getDays = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await fetchDays();
        console.log("DAYS API:", data);
        setDays(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDays();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading)
    return <div className="text-center">Chargement de la programmation...</div>;
  if (hasError)
    return (
      <div className="text-center text-red-500">
        Erreur lors du chargement de la programmation
      </div>
    );

  return (
    <section
      className="flex flex-col gap-8 items-center mt-16"
      id="programmation"
    >
      <div className="text-left">
        <h2 className="mb-4 text-xl md:text-2xl">Programmation</h2>
        <p className="text-sm md:text-lg md:mb-4">
          Découvrez les artistes et les temps forts de chaque journée du
          festival.
        </p>
      </div>
      {days.length > 0 ? (
        days.length > 3 ? (
          <div className="w-full max-w-4xl">
            <Slider {...settings}>
              {days.map((day) => (
                <div key={day.id} className="px-2">
                  <Card
                    className="cursor-pointer cardhover"
                    onClick={() => router.push(`/Programmation/${day.id}`)}
                  >
                    <CardContent className="p-0 h-40 sm:h-52">
                      <Image
                        src={`/image/Jour ${day.id}.png`}
                        alt={day.name || `Jour ${day.id}`}
                        width={300}
                        height={300}
                      />
                    </CardContent>
                    <CardHeader className="bg-primary min-h-20"></CardHeader>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="flex flex-col gap-12 max-w-60 md:gap-20 md:max-w-none lg:flex-row lg:gap-12">
            {days.map((day) => (
              <Card
                key={day.id}
                className="cursor-pointer cardhover"
                onClick={() => router.push(`/Programmation/${day.id}`)}
              >
                <CardContent className="p-0 h-40 sm:h-52">
                  <Image
                    src={`/image/Jour ${day.id}.png`}
                    alt={day.name || `Jour ${day.id}`}
                    width={300}
                    height={300}
                  />
                </CardContent>
                <CardHeader className="bg-primary min-h-20"></CardHeader>
              </Card>
            ))}
          </div>
        )
      ) : (
        <p>Aucune journée disponible</p>
      )}
    </section>
  );
};

export default Programmation;
