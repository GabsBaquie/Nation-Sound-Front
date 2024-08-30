export type Image = {
  url: string;
  alternativeText: string;
} | null;

export type Button = {
  link: string;
  title: string;
  isExternal: boolean;
  type?: string;
};

export type HeroBlock = {
  id: number;
  __component: "blocks.hero";
  title: string;
  text: string;
  image?: Image;
  BtnLink?: Button[];
  section?: SectionProps;
};

export type SectionProps = {
  image: {
    url: string;
    alternativeText: string;
  } | null;
  title: string;
  text: string;
  button?: Button;
} | null;

export type Programmation = {
  id: number;
  __component: "blocks.programmation";
  title: string;
  text: string;
  card: Array<{
    id: number;
    title: string;
    text: string;
    image: Image;
  }>;
  image: Image;
  image2: Image;
};

export type Princing = {
  id: number;
  __component: "blocks.princing";
  title: string;
  text: string;
  plan: PrincingCard[];
};

export type PrincingCard = {
  planType: string;
  planPrice: string;
  isFeatured: boolean;
  services: Array<{ id: number; title: string; description: string }>;
  button: Button;
};

export type Block = HeroBlock | Programmation | Princing;
