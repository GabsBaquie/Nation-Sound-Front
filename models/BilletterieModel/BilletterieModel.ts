import { Princing } from "../princingModel/princingModel";

export type LandingPage = {
  id: number;
  title: string;
  description: string;
  slug: string;
  blocks: Array<Princing>;
};

export type Billetterie = {
  id: number;
  title: string;
  description: string;
  slug: string;
  landing_page: LandingPage;
};
