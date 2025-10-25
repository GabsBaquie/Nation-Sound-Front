import React from "react";
import { Block } from "../models/types";
import Actualites from "./blocks/Actualites";
import FAQ from "./blocks/FAQ";
import Footer from "./blocks/Footer";
import Hero from "./blocks/Hero";
import Map from "./blocks/Map";
import Partenaires from "./blocks/Partenaire";
import Pricing from "./blocks/Pricing";
import Programmation from "./blocks/Programmation";

interface LandingBlocksProps {
  blocks: Block[];
}

const LandingPage: React.FC<LandingBlocksProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block, index) => {
        // Créez une clé unique en combinant le type de bloc, l'id du bloc et l'index
        const key = `${block.__component}-${block.id}-${index}`;

        try {
          switch (block.__component) {
            case "blocks.hero":
              return <Hero key={key} block={block} />;
            case "blocks.programmation":
              return <Programmation key={key} />;
            case "blocks.princing":
              return <Pricing key={key} block={block} />;
            case "blocks.map":
              return <Map key={key} />;
            case "blocks.faq":
              return <FAQ key={key} block={block} />;
            case "blocks.actualites":
              return <Actualites key={key} />;
            case "blocks.partenaire":
              return <Partenaires key={key} />;
            case "blocks.footer":
              return <Footer key={key} block={block} />;
            default:
              return null;
          }
        } catch (error) {
          console.error(
            `Erreur lors du rendu du bloc ${block.__component}:`,
            error
          );
          return null;
        }
      })}
    </div>
  );
};

export default LandingPage;
