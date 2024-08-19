import { SectionModel, SectionProps } from "./HeroSectionModel";

export type HeroBlockProps = {
  title: string;
  text: string;
  BtnLink?: Array<{
    id: number;
    link: string;
    title: string;
    isExternal: boolean;
    type?: string;
  }> | null;
  image?: {
    url: string;
    alternativeText: string;
  };
  section?: SectionProps;
};

export class HeroBlockModel {
  title: string;
  text: string;
  BtnLink?: Array<{
    link: string;
    title: string;
    isExternal: boolean;
    type?: string;
  }> | null;
  image?: {
    url: string;
    alternativeText: string;
  };
  section?: SectionModel;

  constructor(props: HeroBlockProps) {
    this.title = props.title;
    this.text = props.text;
    this.BtnLink = props.BtnLink;
    this.image = props.image;
    this.section = props.section ? new SectionModel(props.section) : undefined;
  }
}
