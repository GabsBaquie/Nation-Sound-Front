import { Button } from "../buttonModel/buttonModel";

// Princing Block
export type Princing = {
  id: number;
  __component: "blocks.princing";
  title: string;
  text: string;
  plan: PrincingCard[]; // Tableau de cartes de tarification
};

// Princing Card
export type PrincingCard = {
  planType: string;
  planPrice: string;
  isFeatured: boolean;
  services: Service[]; // Services sous forme de tableau d'objets Service
  button: Button;
};

// Service pour la carte de prix
export type Service = {
  id: number;
  title: string;
  description: string;
};
