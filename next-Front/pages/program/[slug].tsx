import NavBar from "@/components/NavBar/navBar";
import { Card } from "@/components/ui/card";
import GenericCard from "@/components/ui/GenericCard";
import { ProgramController } from "@/controller/pages/ProgramController";
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

  return (
    <div className="container">
      <NavBar />
      {/* Affichage de la carte de programmation */}
      <GenericCard
        title={program.title}
        description={program.description}
        text={""}
        image={program.image ?? undefined} // Utilisation de undefined si l'image est null
      />

      {/* Affichage des jours associés */}
      <Card className="mx-auto text-center md:max-w-md xl:max-w-lg bg-primary">
        {program.days && program.days.length > 0 ? (
          program.days.map((day: Day, index: number) => (
            <div key={index}>
              <h3>
                {day.title} - {day.date}
              </h3>

              {/* Affichage des concerts associés pour chaque jour */}
              {day.concert && day.concert.length > 0 ? (
                day.concert.map((concert: Concert, concertIndex: number) => (
                  <div key={concertIndex}>
                    <h4>{concert.title}</h4>
                    <p>{concert.description}</p>
                    <p>Heure : {concert.heure}</p>
                    <p>Lieu : {concert.lieu}</p>
                    {concert.image && (
                      <Image
                        width={200}
                        height={200}
                        src={concert.image.url}
                        alt={concert.image.alternativeText || concert.title}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p>Aucun concert pour ce jour.</p>
              )}
            </div>
          ))
        ) : (
          <p>Aucun jour associé.</p>
        )}
      </Card>
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  ProgramController.getServerSideProps;

export default ProgramPage;
