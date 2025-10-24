// Map Block Type
export type Map = {
  id: number;
  __component: "blocks.map";
  title: string;
  text: string;
  POI?: POI[];
};

// POI Type (Points d'intérêt pour la carte)
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
