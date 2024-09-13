import "@/app/globals.css";
import NavBar from "@/components/NavBar/navBar";
import { Card } from "@/components/ui/card";
import { ProgramSlugController } from "@/controller/slugController/ProgramSlugController";
import { formatTime } from "@/lib/formatTime";
import { Concert, Day, ProgramCard } from "@/models/blocks"; // Utilisation des types importés
import { GetServerSideProps } from "next";
import Image from "next/image";
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
    <div className="container">
      <NavBar />
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
                <div className="flex flex-wrap justify-around gap-4">
                  {day.concert.map((concert: Concert, concertIndex: number) => (
                    <Card key={concertIndex} className="p-4 mb-6 min-w-80">
                      <h4>{concert.title}</h4>
                      <p>Heure : {formatTime(concert.heure)}</p>
                      <p>Lieu : {concert.lieu}</p>
                      {concert.image && (
                        <Image
                          className="mx-auto"
                          width={200}
                          height={200}
                          src={concert.image.url}
                          alt={concert.image.alternativeText || concert.title}
                        />
                      )}
                      <p>{concert.description}</p>
                    </Card>
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

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  ProgramSlugController.getServerSideProps;

export default ProgramPage;
