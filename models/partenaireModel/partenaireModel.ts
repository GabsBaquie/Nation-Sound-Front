import { Image } from "../imageModel/imageModel";
// Partenaires Block Type
export type PartenaireBlock = {
  __component: "blocks.partenaire";
  id: number;
  partenaires: Partenaire[];
};

export type Partenaire = {
  id: number;
  name: string;
  type: string;
  link: string;
  logo: Image;
};
