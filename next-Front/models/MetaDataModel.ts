export type MetadataProps = {
  id: number;
  metaTitle: string;
  metaDescription: string | null;
  metaImage?: {
    url: string;
    alternativeText: string | null;
  };
};

export class MetaDataModel {
  id: number;
  metaTitle: string;
  metaDescription: string | null;
  metaImage?: {
    url: string;
    alternativeText: string | null;
  };

  constructor(props: MetadataProps) {
    this.id = props.id;
    this.metaTitle = props.metaTitle;
    this.metaDescription = props.metaDescription;
    this.metaImage = props.metaImage;
  }
}
