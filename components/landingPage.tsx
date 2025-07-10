import React from "react";
import { Block } from "../models/blocks";
import FAQ from "./blocks/FAQ";
import Footer from "./blocks/Footer";
import HeroBlock from "./blocks/HeroBlock";
import Info from "./blocks/Info";
import Map from "./blocks/Map";
import Partenaires from "./blocks/Partenaire";
import PrincingBlock from "./blocks/Princing";
import ProgrammationBlock from "./blocks/Programmation";

interface LandingBlocksProps {
  blocks: Block[];
}

const LandingPage: React.FC<LandingBlocksProps> = ({ blocks }) => {
  return (
    <div className="px-16 pr-[2rem] mb-10 text-center md:ml-14 md:px-24 md:pr-[5rem]">
      {blocks.map((block, index) => {
        // Créez une clé unique en combinant le type de bloc, l'id du bloc et l'index
        const key = `${block.__component}-${block.id}-${index}`;

        try {
          switch (block.__component) {
            case "blocks.hero":
              return <HeroBlock key={key} block={block} />;
            case "blocks.programmation":
              return <ProgrammationBlock key={key} block={block} />;
            case "blocks.princing":
              return <PrincingBlock key={key} block={block} />;
            case "blocks.map":
              return <Map key={key} block={block} />;
            case "blocks.faq":
              return <FAQ key={key} block={block} />;
            case "blocks.infos":
              return <Info key={key} block={block} />;
            case "blocks.partenaire":
              return <Partenaires key={key} block={block} />;
            case "blocks.footer":
              return <Footer key={key} block={block} />;
            default:
              console.log("Bloc non reconnu:", block);
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
