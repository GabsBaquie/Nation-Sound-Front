import { DayAPI, fetchDays } from "@/controllers/programmationController";
import { ASSETS_URL } from "@/controllers/apiConfig";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Card, CardContent, CardHeader } from "../ui/card";

// Helper function to get image for a day or fallback to first concert image
const getImageSrc = (day: DayAPI): string | null => {
  // Day-level image (absolute URL expected)
  if (day.image && typeof day.image === "string" && day.image.trim() !== "") {
    return day.image;
  }

  // Fallback: first concert image
  const firstWithImage = day.concerts?.find((c: any) => !!c?.image);
  const concertImage: unknown = firstWithImage?.image;

  if (typeof concertImage === "string" && concertImage.trim() !== "") {
    // If absolute URL, return as is, else prefix with ASSETS_URL
    return concertImage.startsWith("http")
      ? concertImage
      : `${ASSETS_URL}${concertImage.replace(/^\/+/, "")}`;
  }

  return null;
};

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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
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
      <div className="text-center">
        <h2 className="mb-4 text-xl md:text-2xl">Programmation</h2>
        <p className="text-sm md:text-lg md:mb-4">
          Découvrez les artistes et les temps forts de chaque journée du
          festival.
        </p>
      </div>
      {days.length > 0 ? (
        <div className="mx-auto w-full max-w-4xl">
          <Slider {...settings}>
            {days.map((day) => (
              <div key={day.id} className="px-2">
                <Card
                  className="mx-auto cursor-pointer cardhover"
                  onClick={() => router.push(`/Programmation/${day.id}`)}
                >
                  <CardContent className="p-0 h-40 sm:h-52">
                    {getImageSrc(day) && (
                      <Image
                        src={getImageSrc(day)!}
                        alt={day.name || `Jour ${day.id}`}
                        width={300}
                        height={300}
                        onError={(e) => {
                          console.warn(
                            `Failed to load image for day ${day.id}`
                          );
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </CardContent>
                  <CardHeader className="flex flex-col justify-center items-center p-4 text-center bg-primary min-h-20">
                    {!getImageSrc(day) && (
                      <>
                        <h3 className="mb-2 text-lg font-bold text-white">
                          {day.name || `Jour ${day.id}`}
                        </h3>
                        <p className="text-sm text-white/80">
                          {day.concerts && day.concerts.length > 0
                            ? `${day.concerts.length} concert${
                                day.concerts.length > 1 ? "s" : ""
                              }`
                            : "Aucun concert programmé"}
                        </p>
                      </>
                    )}
                  </CardHeader>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>Aucune journée disponible</p>
      )}
    </section>
  );
};

export default Programmation;
