import React from "react";
import HeroBlock from "../components/blocks/HeroBlock";
import ProgrammationBlock from "../components/blocks/Programmation";
import { Block } from "../models/blocks";

interface LandingBlocksProps {
  blocks: Block[];
}

const LandingBlocks: React.FC<LandingBlocksProps> = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block) => {
        switch (block.__component) {
          case "blocks.hero":
            return <HeroBlock key={block.id} block={block} />;
          case "blocks.programmation":
            console.log(block);
            return <ProgrammationBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default LandingBlocks;
