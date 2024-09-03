import React from "react";
import HeroBlock from "../components/blocks/HeroBlock";
import PrincingBlock from "../components/blocks/Princing";
import ProgrammationBlock from "../components/blocks/Programmation";
import { Block } from "../models/blocks";
import FAQ from "./blocks/FAQ";
import Info from "./blocks/Info";
import Map from "./blocks/Map";

interface LandingBlocksProps {
  blocks: Block[];
}

const LandingBlocks: React.FC<LandingBlocksProps> = ({ blocks }) => {
  return (
    <div className="px-12 mb-10 ml-4 text-center md:ml-14 md:px-24">
      {blocks.map((block, index) => {
        // Créez une clé unique en combinant le type de bloc, l'id du bloc et l'index
        const key = `${block.__component}-${block.id}-${index}`;

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
          default:
            console.log("block", block);
            return null;
        }
      })}
    </div>
  );
};

export default LandingBlocks;
