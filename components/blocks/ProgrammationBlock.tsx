import { DayAPI, fetchDays } from "@/controllers/programmationController";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface ProgrammationBlockProps {
  block?: any; // Props du bloc si nécessaire
}

const ProgrammationBlock: React.FC<ProgrammationBlockProps> = ({ block }) => {
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
      } catch (error) {
        console.error("Erreur lors du chargement des jours:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDays();
  }, []);

  if (isLoading)
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2">Chargement de la programmation...</p>
      </div>
    );

  if (hasError)
    return (
      <div className="text-center text-red-500 py-8">
        <p>Erreur lors du chargement de la programmation</p>
        <p className="text-sm mt-2">Veuillez réessayer plus tard</p>
      </div>
    );

  return (
    <section
      className="flex flex-col gap-8 items-center mt-16"
      id="programmation"
    >
      <div className="text-left">
        <h2 className="mb-4 text-xl md:text-2xl">
          {block?.title || "Programmation"}
        </h2>
        <p className="text-sm md:text-lg md:mb-4">
          {block?.text ||
            "Découvrez les artistes et les temps forts de chaque journée du festival."}
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
                <Image
                  src={`/image/Jour ${day.id}.png`}
                  alt={day.name || `Jour ${day.id}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </CardContent>
              <CardHeader className="bg-primary min-h-20">
                <h3 className="text-white font-semibold">
                  {day.name || `Jour ${day.id}`}
                </h3>
                {day.description && (
                  <p className="text-white/80 text-sm">{day.description}</p>
                )}
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune journée disponible</p>
            <p className="text-sm text-gray-400 mt-2">
              La programmation sera bientôt disponible
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgrammationBlock;
