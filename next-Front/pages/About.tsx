import GenericCard from "@/components/ui/GenericCard";
import { About as AboutModel } from "@/models/aboutModel/aboutModel";
import { GetServerSideProps } from "next";
import React from "react";
import { AboutController } from "../controller/AboutController/AboutController";

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
      <div className="md:ml-20 lg:ml-auto">
        <GenericCard
          className="max-w-full p-4 pt-16 bg-transparent border-none md:border-solid md:bg-primary md:pt-0 md:mx-auto"
          title={about.title}
          description={about.description}
          text={about.text}
        />
      </div>
    </div>
  );
};

// Récupération des données côté serveur
export const getServerSideProps: GetServerSideProps =
  AboutController.getServerSideProps;

export default AboutPage;
