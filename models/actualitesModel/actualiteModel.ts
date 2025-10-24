export interface Actualite {
  id: string;
  title: string;
  description: string;
  content?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  date?: string;
  importance?: string;
  actif: boolean;
}
