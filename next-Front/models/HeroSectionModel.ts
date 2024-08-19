// next-app/models/HeroSectionModel.ts
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

export class SectionModel {
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

  constructor(props: SectionProps) {
    this.title = props.title;
    this.description = props.description;
    this.image = props.image;
    this.button = props.button;
  }
}
