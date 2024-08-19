import { HeroBlockModel, HeroBlockProps } from "../models/HeroBlockModel";
import { SectionModel } from "../models/HeroSectionModel";

export class HeroBlockController {
  private model: HeroBlockModel | null = null;
  private error: string | null = null;

  constructor(props: HeroBlockProps) {
    try {
      const baseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

      // Gestion de l'image du Hero
      const image = props.image
        ? {
            url: `${baseURL}${props.image.url}`,
            alternativeText: props.image.alternativeText,
          }
        : undefined;

      // Gestion de la section
      let section: SectionModel | undefined;
      if (props.section) {
        // Gestion de l'image de la section
        const sectionImage = props.section.image
          ? {
              url: `${baseURL}${props.section.image.url}`,
              alternativeText: props.section.image.alternativeText,
            }
          : undefined;

        section = new SectionModel({
          ...props.section,
          image: sectionImage,
        });
      }

      this.model = new HeroBlockModel({
        ...props,
        image,
        section,
      });
    } catch (err) {
      this.error = `Failed to initialize HeroBlockModel: ${
        err instanceof Error ? err.message : String(err)
      }`;
      console.error(this.error);
    }
  }

  getModel() {
    if (this.error) {
      throw new Error(this.error);
    }
    return this.model;
  }
}
