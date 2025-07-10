import "@/app/globals.css";
import ConcertCard from "@/components/ProgramationPage/ConcertCard";
import { fetchDayById } from "@/controllers/programmationController";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProgramPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [day, setDay] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!slug || Array.isArray(slug)) return;
    setIsLoading(true);
    fetchDayById(slug)
      .then((data) => {
        setDay(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) return <div>Chargement...</div>;
  if (hasError || !day) return <div>Erreur ou jour non trouvé</div>;

  return (
    <div>
      <div className="pt-20 mx-auto text-center md:pt-0 md:my-12 md:max-w-xl xl:max-w-2xl">
        <h3 className="my-6 text-xl">
          {day.title || day.name} - {new Date(day.date).toLocaleDateString()}
        </h3>
        {day.concerts && day.concerts.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-around">
            {day.concerts.map((concert: any, idx: number) => (
              <ConcertCard
                className="w-[20rem]"
                key={idx}
                concert={concert}
                isPrimary={idx % 2 === 0}
              />
            ))}
          </div>
        ) : (
          <p>Aucun concert pour ce jour.</p>
        )}
      </div>
    </div>
  );
};

export default ProgramPage;
