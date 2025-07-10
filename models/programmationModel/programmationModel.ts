import { Image } from "../imageModel/imageModel";

// Programmation Block Type
export type Programmation = {
  id: number;
  __component: "blocks.programmation";
  title: string;
  text: string;
  card: ProgramCard[];
};

export type ProgramCard = {
  id: number;
  title: string;
  description?: string;
  image?: Image | null;
  days: Day[];
};

export type Day = {
  title: string;
  date: string;
  concert: Concert[];
};

export type Concert = {
  title: string;
  description: string;
  heure: string;
  lieu: string;
  image?: Image | null;
};
