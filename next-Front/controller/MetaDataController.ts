import { MetaDataModel, MetadataProps } from "../models/MetaDataModel";

export class MetaDataController {
  private model: MetadataProps | null = null;
  private error: string | null = null;

  constructor(props: MetadataProps) {
    try {
      const baseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

      // Gestion de l'image du Hero
      const image = props.metaImage
        ? {
            url: `${baseURL}${props.metaImage.url}`,
            alternativeText: props.metaImage.alternativeText,
          }
        : { url: "", alternativeText: null };

      this.model = new MetaDataModel({
        ...props,
        metaImage: image,
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
