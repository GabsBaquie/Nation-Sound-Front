export type MetadataProps = {
  metaTitle: string;
  metaDescription: string | null;
  metaImage?: {
    url: string;
    alternativeText: string | null;
  };
};

export class MetaDataModel {
  metaTitle: string;
  metaDescription: string | null;
  metaImage?: {
    url: string;
    alternativeText: string | null;
  };

  constructor(props: MetadataProps) {
    this.metaTitle = props.metaTitle;
    this.metaDescription = props.metaDescription;
    this.metaImage = props.metaImage;
  }
}
