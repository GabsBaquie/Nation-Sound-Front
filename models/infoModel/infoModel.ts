import { Card } from "../blocks";

// Info Block Type
export type Info = {
  id: number;
  __component: "blocks.infos";
  title: string;
  text: string;
  carrousel: Card[];
};
