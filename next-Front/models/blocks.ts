export type Image = {
  url: string;
  alternativeText: string;
};

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
  title: string;
  description: string;
  image?: {
    url: string;
    alternativeText: string;
  };
  button?: {
    link: string;
    title: string;
    isExternal: boolean;
    type?: string;
  };
};

export type Programmation = {
  id: number;
  __component: "blocks.programmation";
  title: string;
  description: string;
  image: Image[];
};

export type Block = HeroBlock | Programmation;
