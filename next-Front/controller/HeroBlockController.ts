import { HeroBlock } from "../models/blocks";

class HeroBlockModel {
  constructor(public props: HeroBlock) {}
}

export class HeroBlockController {
  private model: HeroBlockModel | null = null;
  private error: string | null = null;

  constructor(props: HeroBlock) {
    try {
      this.model = new HeroBlockModel({
        ...props,
        image: this.constructImageURL(props.image),
        section: props.section
          ? {
              ...props.section,
              image: this.constructImageURL(props.section.image),
            }
          : undefined,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  private constructImageURL(image?: { url: string; alternativeText: string }) {
    if (!image) return undefined;
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    return {
      url: `${baseURL}${image.url}`,
      alternativeText: image.alternativeText,
    };
  }

  private handleError(err: unknown) {
    this.error = `Failed to initialize HeroBlockModel: ${
      err instanceof Error ? err.message : String(err)
    }`;
    console.error(this.error);
  }

  getModel() {
    if (this.error) {
      throw new Error(this.error);
    }
    return this.model;
  }
}
