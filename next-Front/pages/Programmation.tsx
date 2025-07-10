import "@/app/globals.css";
import DaySection from "@/components/ProgramationPage/DaySection";
import Filter from "@/components/ProgramationPage/Filter";
import { DayAPI, fetchDays } from "@/lib/controllers/programmationController";
import { useEffect, useState } from "react";

const Programmation: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedLieu, setSelectedLieu] = useState<string | null>(null);
  const [days, setDays] = useState<DayAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDays().then((data) => {
      setDays(data);
      setIsLoading(false);
    });
  }, []);

  // Fonction pour filtrer les concerts par jour et lieu
  const filterConcerts = (day: any) => {
    if (!Array.isArray(day.concerts)) return [];
    return day.concerts.filter((concert: any) => {
      const dayMatch = selectedDay ? day.name === selectedDay : true;
      const lieuMatch = selectedLieu ? concert.location === selectedLieu : true;
      return dayMatch && lieuMatch;
    });
  };

  // Gestionnaire de changement pour les filtres (Radix UI envoie directement la valeur)
  const handleDayChange = (value: string | null) => {
    setSelectedDay(value);
  };

  const handleLieuChange = (value: string | null) => {
    setSelectedLieu(value);
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="pt-20 md:pt-0">
        <h1 className="my-2 text-2xl text-center md:text-4xl md:my-6">
          Programmation
        </h1>
        <p className="mb-4 text-lg text-center md:mb-12 md:text-xl">
          Découvrez la programmation du festival jour par jour.
        </p>

        {/* Filtres */}
        <Filter
          days={days}
          selectedDay={selectedDay}
          selectedLieu={selectedLieu}
          onDayChange={handleDayChange}
          onLieuChange={handleLieuChange}
        />

        {/* Affichage des jours et concerts filtrés */}
        <div className="my-6">
          {days.length > 0 ? (
            days.map((day: any, index: number) => {
              const filteredConcerts = filterConcerts(day);

              return (
                filteredConcerts.length > 0 && (
                  <DaySection
                    key={index}
                    day={day}
                    filteredConcerts={filteredConcerts}
                  />
                )
              );
            })
          ) : (
            <p>Aucun jour associé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programmation;
