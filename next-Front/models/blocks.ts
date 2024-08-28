export type Image = {
  url: string;
  alternativeText: string;
} | null;

export type HeroBlock = {
  id: number;
  __component: "blocks.hero";
  title: string;
  text: string;
  image?: Image;
  BtnLink?: Array<{
    id: number;
    link: string;
    title: string;
    isExternal: boolean;
    type?: string;
  }> | null;
  section?: SectionProps;
};

export type SectionProps = {
  image: {
    url: string;
    alternativeText: string;
  } | null;
  title: string;
  text: string;
  button?: {
    link: string;
    title: string;
    isExternal: boolean;
    type?: string;
  };
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
  services: Array<{ id: number; title: string }>;
  link?: {
    text: string;
    url: string;
  };
};

export type Block = HeroBlock | Programmation | Princing;
