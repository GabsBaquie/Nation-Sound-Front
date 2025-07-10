import { FAQ } from "./faqModel/faqModel";
import { Footer } from "./footerModel/footerModel";
import { HeroBlock } from "./heroModel/heroModel";
import { Image } from "./imageModel/imageModel";
import { Info } from "./infoModel/infoModel";
import { Map } from "./mapModel/mapModel";
import { PartenaireBlock } from "./partenaireModel/partenaireModel";
import { Princing } from "./princingModel/princingModel";
import { Programmation } from "./programmationModel/programmationModel";

// Type générique pour une Card (Carte)
export type Card = {
  id: number;
  title: string;
  description?: string; // Optionnel pour certaines cartes
  text: string;
  image?: Image | null;
  importance?: string;
};

// Bloc Type générique
export type Block =
  | HeroBlock
  | Programmation
  | Princing
  | Map
  | FAQ
  | Info
  | PartenaireBlock
  | Footer;
