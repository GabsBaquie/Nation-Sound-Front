import { Button } from "../buttonModel/buttonModel";
import { Image } from "../imageModel/imageModel";

// Hero Block
export type HeroBlock = {
  id: number;
  __component: "blocks.hero";
  title: string;
  text: string;
  image?: Image | null;
  BtnLink?: Button[];
  section?: Section;
};

// Section
export type Section = {
  image?: Image | null;
  title: string;
  text: string;
  button?: Button;
} | null;
