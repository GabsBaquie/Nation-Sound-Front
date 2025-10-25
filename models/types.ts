// ===== TYPES DE BASE =====

// Type Image
export type Image = {
  url: string;
  alternativeText: string;
} | null;

// Type Button
export type Button = {
  link: string;
  title: string;
  isExternal: boolean;
  type?: string;
};

// ===== TYPES DE BLOCS =====

// Hero Block
export type HeroBlock = {
  id: number;
  __component: "blocks.hero";
  title: string;
  text: string;
  image?: Image | null;
  BtnLink?: Button[];
  section?: Section;
};

export type Section = {
  image?: Image | null;
  title: string;
  text: string;
  button?: Button;
} | null;

// Programmation Block
export type Programmation = {
  id: number;
  __component: "blocks.programmation";
  title: string;
  text: string;
  card: ProgramCard[];
};

export type ProgramCard = {
  id: number;
  title: string;
  description?: string;
  image?: Image | null;
  days: Day[];
};

export type Day = {
  title: string;
  date: string;
  concert: Concert[];
};

export type Concert = {
  title: string;
  description: string;
  heure: string;
  lieu: string;
  image?: Image | null;
};

// Princing Block
export type Princing = {
  id: number;
  __component: "blocks.princing";
  title: string;
  text: string;
  plan: PrincingCard[];
};

export type PrincingCard = {
  planType: string;
  planPrice: string;
  isFeatured: boolean;
  services: Service[];
  button: Button;
};

export type Service = {
  id: number;
  title: string;
  description: string;
};

// Map Block
export type Map = {
  id: number;
  __component: "blocks.map";
  title: string;
  text: string;
  POI?: POI[];
};

export type POI = {
  id: number;
  Name: string;
  Type: string;
  Description?: string;
  POI: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

// FAQ Block
export type FAQ = {
  id: number;
  __component: "blocks.faq";
  title: string;
  questions: Question[];
};

export type Question = {
  id: number;
  title: string;
  text: string;
};

// Actualites Block
export type ActualitesBlock = {
  id: number;
  __component: "blocks.actualites";
  title: string;
  text: string;
};

// Partenaire Block
export type PartenaireBlock = {
  __component: "blocks.partenaire";
  id: number;
  partenaires: Partenaire[];
};

export type Partenaire = {
  id: number;
  name: string;
  type: string;
  link: string;
  logo_alt: string;
  actif: boolean;
  created_at: string;
  updated_at: string;
  image: string;
};

// Footer Block
export type Footer = {
  id: number;
  __component: "blocks.footer";
  title: string;
  text: string;
  Reseaux: Reseaux[];
};

export type Reseaux = {
  id: number;
  list: string;
  icon: Image;
  link: string;
};

// ===== TYPES DE DONNÉES =====

// Actualite
export interface Actualite {
  id: string;
  title: string;
  description: string;
  text?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  date?: string;
  importance?: string;
  actif: boolean;
}

// Alerte
export interface Alerte {
  id: string;
  title: string;
  description: string;
  urgence: boolean;
  actif: boolean;
}

// ===== TYPES GÉNÉRIQUES =====

// Type générique pour une Card
export type Card = {
  id: number;
  title: string;
  description?: string;
  text: string;
  image?: Image | null;
  importance?: string;
};

// Bloc Type générique
export type Block =
  | HeroBlock
  | Programmation
  | Princing
  | Map
  | FAQ
  | ActualitesBlock
  | PartenaireBlock
  | Footer;

// Landing Page Model
export interface LandingPageModel {
  error?: string;
  blocks: any[];
}
