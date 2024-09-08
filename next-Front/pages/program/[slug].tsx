import NavBar from "@/components/NavBar/navBar";
import GenericCard from "@/components/ui/GenericCard";
import { ProgramController } from "@/controller/pages/ProgramController";
import { Card as ProgramCard } from "@/models/blocks"; // Import du type Card défini globalement
import { GetServerSideProps } from "next";
import React from "react";

interface ProgramPageProps {
  program: ProgramCard | null; // Utilisation du type global Card (renommé en ProgramCard pour éviter les conflits)
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
      <GenericCard
        title={program.title}
        description={program.description}
        text={program.text}
        image={program.image ?? undefined} // Utilisation de undefined si l'image est null
      />
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  ProgramController.getServerSideProps;

export default ProgramPage;
