import { DayAPI, fetchDays } from "@/lib/controllers/programmationController";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
        setDays(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDays();
  }, []);

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
      <div className="flex flex-col gap-12 max-w-60 md:gap-20 md:max-w-none lg:flex-row lg:gap-12">
        {days.length > 0 ? (
          days.map((day) => (
            <Card
              key={day.id}
              className="cursor-pointer cardhover"
              onClick={() => router.push(`/program/${day.id}`)}
            >
              <CardContent className="p-0 h-40 sm:h-52">
                {day.image && day.image.url && (
                  <Image
                    src={day.image.url}
                    alt={day.image.alternativeText || day.name}
                    width={350}
                    height={350}
                  />
                )}
              </CardContent>
              <CardHeader className="bg-primary min-h-20">
                <div className="text-center text-white">
                  <div className="text-lg font-bold">{day.name}</div>
                  <div className="text-md">
                    {new Date((day.date || "").toString()).toLocaleDateString(
                      "fr-FR",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </div>
                  <div className="mt-2 text-xs">{day.description}</div>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>Aucune journée disponible</p>
        )}
      </div>
    </section>
  );
};

export default Programmation;
