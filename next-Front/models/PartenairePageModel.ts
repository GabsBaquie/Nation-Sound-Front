// Type Image
export type Image = {
  url: string;
  alternativeText: string;
} | null;

export type Partenaire = {
  id: number;
  name: string;
  type: string;
  link: string;
  logo: Image;
};
