import "@/app/globals.css";
import ConcertCard from "@/components/ProgramationPage/ConcertCard"; // Importer ConcertCard
import {
  Concert,
  Day,
  ProgramCard,
} from "@/models/programmationModel/programmationModel"; // Utilisation des types importés
import React from "react";

interface ProgramPageProps {
  program: ProgramCard | null; // Utilisation du type global ProgramCard
  error?: string;
}

const ProgramPage: React.FC<ProgramPageProps> = ({ program, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!program) {
    return <div>Program not found</div>;
  }
  console.log(program);
  return (
    <div>
      {/* Affichage des jours associés */}
      <div className="pt-20 mx-auto text-center md:pt-0 md:my-12 md:max-w-xl xl:max-w-2xl">
        {program.days && program.days.length > 0 ? (
          program.days.map((day: Day, index: number) => (
            <div key={index}>
              <h3 className="my-6 text-xl">
                {day.title} - {day.date}
              </h3>

              {/* Affichage des concerts associés pour chaque jour */}
              {day.concert && day.concert.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-around">
                  {day.concert.map((concert: Concert, concertIndex: number) => (
                    <ConcertCard
                      className="w-[20rem]"
                      key={concertIndex}
                      concert={concert}
                      isPrimary={concertIndex % 2 === 0}
                    />
                  ))}
                </div>
              ) : (
                <p>Aucun concert pour ce jour.</p>
              )}
            </div>
          ))
        ) : (
          <p>Aucun jour associé.</p>
        )}
      </div>
    </div>
  );
};

export default ProgramPage;
