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

// Section Type
export type Section = {
  image?: Image | null;
  title: string;
  text: string;
  button?: Button;
} | null;

// Type générique pour une Card (Carte)
export type Card = {
  id: number;
  title: string;
  description?: string; // Optionnel pour certaines cartes
  text: string;
  image?: Image | null;
  importance?: string;
};

// Hero Block Type
export type HeroBlock = {
  id: number;
  __component: "blocks.hero";
  title: string;
  text: string;
  image?: Image | null;
  BtnLink?: Button[];
  section?: Section;
};

// Programmation Block Type
export type Programmation = {
  id: number;
  __component: "blocks.programmation";
  title: string;
  text: string;
  card: ProgramCard[];
  image?: Image | null;
  image2?: Image | null;
};

export type ProgramCard = {
  id: number;
  title: string;
  description?: string;
  text: string;
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

// Princing Block Type
export type Princing = {
  id: number;
  __component: "blocks.princing";
  title: string;
  text: string;
  plan: PrincingCard[]; // Tableau de cartes de tarification
};

// Princing Card Type
export type PrincingCard = {
  planType: string;
  planPrice: string;
  isFeatured: boolean;
  services: Service[]; // Services sous forme de tableau d'objets Service
  button: Button;
};

// Type Service pour la carte de prix
export type Service = {
  id: number;
  title: string;
  description: string;
};

// Map Block Type
export type Map = {
  id: number;
  __component: "blocks.map";
  title: string;
  text: string;
  POI?: POI[]; // Tableau optionnel de POI
};

// POI Type (Points d'intérêt pour la carte)
export type POI = {
  id: number;
  Name: string;
  Type: string;
  Description?: string; // Optionnel car certaines POI pourraient ne pas avoir de description
  POI: {
    address: string; // Adresse du point d'intérêt
    geohash?: string; // Optionnel, car tous les POI peuvent ne pas avoir de geohash
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

// FAQ Block Type
export type FAQ = {
  id: number;
  __component: "blocks.faq";
  title: string;
  questions: Question[]; // Tableau de questions
};

// Question Type pour les FAQs
export type Question = {
  id: number;
  title: string;
  text: string;
};

// Info Block Type
export type Info = {
  id: number;
  __component: "blocks.infos";
  title: string;
  text: string;
  carrousel: Card[]; // Utilisation du type Card
};

// Bloc Type générique
export type Block = HeroBlock | Programmation | Princing | Map | FAQ | Info;
