import NavBar from "@/components/NavBar/navBar";
import GenericCard from "@/components/ui/GenericCard";
import { About as AboutModel } from "@/models/AboutModel";
import { GetServerSideProps } from "next";
import React from "react";
import { AboutController } from "../controller/pages/AboutController";

export interface AboutProps {
  about: AboutModel | null;
  error?: string;
}

const AboutPage: React.FC<AboutProps> = ({ about, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!about) {
    return <div>About not found</div>;
  }

  return (
    <div>
      <NavBar />
      <GenericCard
        className="bg-primary"
        title={about.title}
        description={about.description}
        text={about.text}
      />
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  AboutController.getServerSideProps;

export default AboutPage;