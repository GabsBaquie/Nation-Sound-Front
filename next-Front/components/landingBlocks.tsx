import HeroBlock from "@/components/blocks/HeroBlock";
import { Block } from "@/models/blocks";
import React from "react";

const componentMap: { [key: string]: React.FC<any> } = {
  "blocks.hero": HeroBlock,
  // "blocks.programmation": Programmation,
};

interface LandingBlocksProps {
  blocks: Block[];
}

const LandingBlocks: React.FC<LandingBlocksProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block) => {
        const BlockComponent = componentMap[block.__component];
        return BlockComponent ? (
          <BlockComponent key={block.id} block={block} />
        ) : null;
      })}
    </>
  );
};

export default LandingBlocks;
