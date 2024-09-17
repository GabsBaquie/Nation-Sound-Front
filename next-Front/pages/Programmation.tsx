import "@/app/globals.css";
import DaySection from "@/components/ProgramationPage/DaySection";
import Filter from "@/components/ProgramationPage/Filter";
import { ProgrammationController } from "@/controller/ProgrammationController/ProgrammationController";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface ProgrammationProps {
  programmation: any;
  error?: string;
}

const Programmation: React.FC<ProgrammationProps> = ({
  programmation,
  error,
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedLieu, setSelectedLieu] = useState<string | null>(null);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!programmation) {
    return <div>Programmation non trouvée</div>;
  }

  const { title, description, days } = programmation;

  // Fonction pour filtrer les concerts par jour et lieu
  const filterConcerts = (day: any) => {
    return day.concert.filter((concert: any) => {
      const dayMatch = selectedDay ? day.title === selectedDay : true;
      const lieuMatch = selectedLieu ? concert.lieu === selectedLieu : true;
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

  return (
    <div>
      <div className="pt-20 md:pt-0">
        <h1 className="my-2 text-2xl text-center md:text-4xl md:my-6">
          {title}
        </h1>
        <p className="mb-4 text-lg text-center md:mb-12 md:text-xl">
          {description}
        </p>

        {/* Filtres */}
        <Filter
          days={days}
          selectedDay={selectedDay}
          selectedLieu={selectedLieu}
          onDayChange={handleDayChange} // Envoie directement la valeur
          onLieuChange={handleLieuChange} // Envoie directement la valeur
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

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  ProgrammationController.getServerSideProps;

export default Programmation;
