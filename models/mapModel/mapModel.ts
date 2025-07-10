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
