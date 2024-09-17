import { Button } from "../buttonModel/buttonModel";

export type Plan = {
  planType: string;
  planPrice: string;
  isFeatured: boolean;
  services: Array<{ title: string; description: string }>;
  button: Button;
};

export type PrincingBlock = {
  id: number;
  __component: "blocks.princing";
  title: string;
  text: string;
  plan: Plan[];
};

export type LandingPage = {
  id: number;
  title: string;
  description: string;
  slug: string;
  blocks: Array<PrincingBlock>;
};

export type Billetterie = {
  id: number;
  title: string;
  description: string;
  slug: string;
  landing_page: LandingPage;
};

export type billet = Plan | PrincingBlock | Billetterie;
