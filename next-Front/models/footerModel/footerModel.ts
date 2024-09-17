import { Image } from "../imageModel/imageModel";
// Footer Block Type
export type Footer = {
  id: number;
  __component: "blocks.footer";
  title: string;
  text: string;
  Reseaux: Reseaux[];
};

export type Reseaux = {
  id: number;
  list: string;
  icon: Image;
  link: string;
};
